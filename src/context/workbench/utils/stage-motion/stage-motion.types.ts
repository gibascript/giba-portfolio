/** The two screens of the page: the hero, and the workbench below it. */
export type Stage = 'hero' | 'workbench';

/**
 * What the page shows at a transition progress: the current `stage` (the one
 * past the middle) and which layers are still visible.
 */
export type StageView = {
  stage: Stage;
  heroVisible: boolean;
  workbenchVisible: boolean;
};
