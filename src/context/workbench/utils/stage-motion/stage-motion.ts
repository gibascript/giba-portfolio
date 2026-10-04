import type { Stage, StageView } from './stage-motion.types';

/** Share of the remaining distance covered on each animation frame. */
const followRate = 0.12;

/** Distance below which the progress lands on its target. */
const landingDistance = 0.0015;

/** Progress past which a released transition completes instead of reverting. */
const snapThreshold = 0.35;

/**
 * Progress of each stage: 0 is the hero, 1 the workbench.
 *
 * @example
 * stageProgress.workbench // 1
 */
export const stageProgress: Record<Stage, number> = {
  hero: 0,
  workbench: 1,
};

/**
 * Ease-in-out (quadratic) of a 0–1 progress: slow at both ends.
 *
 * @example
 * easeInOut(0.5) // 0.5
 * easeInOut(0.25) // 0.125
 */
export function easeInOut(progress: number) {
  return progress < 0.5
    ? 2 * progress * progress
    : 1 - (-2 * progress + 2) ** 2 / 2;
}

/**
 * Next animation frame of `progress` toward `target`: a fixed share of the
 * distance left, landing exactly on `target` once close enough.
 *
 * @example
 * followTarget(0, 1) // 0.12
 * followTarget(0.999, 1) // 1
 */
export function followTarget(progress: number, target: number) {
  const distance = target - progress;

  return Math.abs(distance) < landingDistance
    ? target
    : progress + distance * followRate;
}

/**
 * Where a transition released halfway settles: the workbench past 35%, the
 * hero otherwise.
 *
 * @example
 * settleTarget(0.4) // 1
 * settleTarget(0.2) // 0
 */
export function settleTarget(target: number) {
  return target > snapThreshold ? 1 : 0;
}

/**
 * What shows at `progress`: the stage past the middle is the current one, and
 * each layer stays visible until the other fully covers it.
 *
 * @example
 * stageView(0.6) // { stage: 'workbench', heroVisible: true, workbenchVisible: true }
 */
export function stageView(progress: number): StageView {
  return {
    stage: progress >= 0.5 ? 'workbench' : 'hero',
    heroVisible: progress <= 0.999,
    workbenchVisible: progress >= 0.001,
  };
}
