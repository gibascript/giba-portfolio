import { describe, expect, it } from 'vitest';
import { followTarget, stageView } from './stage-motion';

describe('followTarget', () => {
  it('covers the given share of the distance left per frame, both ways', () => {
    expect(followTarget(0, 1, 0.12)).toBeCloseTo(0.12);
    expect(followTarget(1, 0, 0.35)).toBeCloseTo(0.65);
  });

  it('lands exactly on the target once close enough', () => {
    expect(followTarget(0.999, 1, 0.12)).toBe(1);
    expect(followTarget(0.001, 0, 0.12)).toBe(0);
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
