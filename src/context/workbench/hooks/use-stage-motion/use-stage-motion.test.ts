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
    vi.useFakeTimers({ toFake: ['requestAnimationFrame'] });
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

  it('animates to the workbench through the stage root variable', () => {
    mockMatchMedia(false);
    const { result, root } = renderStage();

    act(() => result.current.showStage('workbench'));
    act(() => vi.advanceTimersByTime(100));

    const midway = Number(root.style.getPropertyValue('--stage-progress'));
    expect(midway).toBeGreaterThan(0);
    expect(midway).toBeLessThan(1);
    expect(result.current.workbenchVisible).toBe(true);

    act(() => vi.advanceTimersByTime(2000));

    expect(root.style.getPropertyValue('--stage-progress')).toBe('1');
    expect(result.current.stage).toBe('workbench');
    expect(result.current.heroVisible).toBe(false);
  });

  it('stays wherever scrolling stops, however short the scroll', () => {
    mockMatchMedia(false);
    const { result, root } = renderStage();

    act(() => result.current.moveStageBy(0.2));
    act(() => vi.advanceTimersByTime(3000));

    expect(result.current.stageTarget()).toBeCloseTo(0.2);
    expect(Number(root.style.getPropertyValue('--stage-progress'))).toBeCloseTo(
      0.2,
    );
    expect(result.current.stage).toBe('hero');
    expect(result.current.workbenchVisible).toBe(true);

    act(() => result.current.moveStageBy(0.4));
    act(() => vi.advanceTimersByTime(3000));

    expect(result.current.stageTarget()).toBeCloseTo(0.6);
    expect(result.current.stage).toBe('workbench');
  });

  it('never scrolls past either end', () => {
    mockMatchMedia(false);
    const { result } = renderStage();

    act(() => result.current.moveStageBy(-0.5));
    expect(result.current.stageTarget()).toBe(0);

    act(() => result.current.moveStageBy(3));
    expect(result.current.stageTarget()).toBe(1);
  });

  it('jumps straight to a stage with reduced motion', () => {
    mockMatchMedia(true);
    const { result, root } = renderStage();

    act(() => result.current.moveStageBy(0.01));

    expect(result.current.stage).toBe('workbench');
    expect(root.style.getPropertyValue('--stage-progress')).toBe('1');
  });
});
