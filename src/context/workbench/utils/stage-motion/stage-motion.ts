import type { Stage, StageView } from './stage-motion.types';

/** Distance below which the progress lands on its target. */
const landingDistance = 0.0015;

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
 * Share of the remaining distance the progress covers on each animation
 * frame: quick when following a scroll (it only smooths wheel notches), calm
 * when animating to a stage from a button or shortcut.
 */
export const followRates = {
  scroll: 0.35,
  animation: 0.12,
};

/**
 * Next animation frame of `progress` toward `target`: `rate` of the distance
 * left, landing exactly on `target` once close enough.
 *
 * @example
 * followTarget(0, 1, 0.12) // 0.12
 * followTarget(0.999, 1, 0.12) // 1
 */
export function followTarget(progress: number, target: number, rate: number) {
  const distance = target - progress;

  return Math.abs(distance) < landingDistance
    ? target
    : progress + distance * rate;
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
