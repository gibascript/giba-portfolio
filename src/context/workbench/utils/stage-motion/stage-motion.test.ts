import { describe, expect, it } from 'vitest';
import {
  easeInOut,
  followTarget,
  settleTarget,
  stageView,
} from './stage-motion';

describe('easeInOut', () => {
  it('starts and ends slow, symmetric around the middle', () => {
    expect(easeInOut(0)).toBe(0);
    expect(easeInOut(0.25)).toBe(0.125);
    expect(easeInOut(0.5)).toBe(0.5);
    expect(easeInOut(0.75)).toBe(0.875);
    expect(easeInOut(1)).toBe(1);
  });
});

describe('followTarget', () => {
  it('covers 12% of the distance left per frame, both ways', () => {
    expect(followTarget(0, 1)).toBeCloseTo(0.12);
    expect(followTarget(1, 0)).toBeCloseTo(0.88);
  });

  it('lands exactly on the target once close enough', () => {
    expect(followTarget(0.999, 1)).toBe(1);
    expect(followTarget(0.001, 0)).toBe(0);
  });
});

describe('settleTarget', () => {
  it('completes a transition released past 35%, and reverts one before', () => {
    expect(settleTarget(0.36)).toBe(1);
    expect(settleTarget(0.35)).toBe(0);
    expect(settleTarget(0.9)).toBe(1);
  });
});

describe('stageView', () => {
  it('shows only the hero at rest on it', () => {
    expect(stageView(0)).toEqual({
      stage: 'hero',
      heroVisible: true,
      workbenchVisible: false,
    });
  });

  it('shows both layers mid-way, the current one past the middle', () => {
    expect(stageView(0.49).stage).toBe('hero');
    expect(stageView(0.5)).toEqual({
      stage: 'workbench',
      heroVisible: true,
      workbenchVisible: true,
    });
  });

  it('hides the hero once the workbench covers it', () => {
    expect(stageView(1).heroVisible).toBe(false);
  });
});
