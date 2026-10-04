import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockMatchMedia } from '@/test/match-media';
import { useStageMotion } from './use-stage-motion';

function renderStage() {
  const root = document.createElement('div');
  const hook = renderHook(() => useStageMotion('hero'));
  act(() => hook.result.current.setStageRoot(root));

  return { ...hook, root };
}

describe('useStageMotion', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ['setTimeout', 'clearTimeout', 'requestAnimationFrame'],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('starts on the hero, with only the hero visible', () => {
    mockMatchMedia(false);
    const { result } = renderStage();

    expect(result.current.stage).toBe('hero');
    expect(result.current.heroVisible).toBe(true);
    expect(result.current.workbenchVisible).toBe(false);
  });

  it('animates to the workbench, easing the stage root variable', () => {
    mockMatchMedia(false);
    const { result, root } = renderStage();

    act(() => result.current.showStage('workbench'));
    act(() => vi.advanceTimersByTime(100));

    const midway = Number(root.style.getPropertyValue('--stage-ease'));
    expect(midway).toBeGreaterThan(0);
    expect(midway).toBeLessThan(1);
    expect(result.current.workbenchVisible).toBe(true);

    act(() => vi.advanceTimersByTime(2000));

    expect(root.style.getPropertyValue('--stage-ease')).toBe('1');
    expect(result.current.stage).toBe('workbench');
    expect(result.current.heroVisible).toBe(false);
  });

  it('settles a short scroll back on the hero and a long one on the workbench', () => {
    mockMatchMedia(false);
    const { result } = renderStage();

    act(() => result.current.moveStageBy(0.2));
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.stageTarget()).toBe(0);
    expect(result.current.stage).toBe('hero');

    act(() => result.current.moveStageBy(0.4));
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.stageTarget()).toBe(1);
    expect(result.current.stage).toBe('workbench');
  });

  it('jumps straight to a stage with reduced motion', () => {
    mockMatchMedia(true);
    const { result, root } = renderStage();

    act(() => result.current.moveStageBy(0.01));

    expect(result.current.stage).toBe('workbench');
    expect(root.style.getPropertyValue('--stage-ease')).toBe('1');
  });
});
