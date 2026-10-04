/**
 * A scroll over the stage: where the transition is heading (`target`, 0 hero
 * to 1 workbench), the scrolled `delta` in pixels (positive scrolls down), the
 * element under the pointer (`from`) and the stage `root`.
 */
export type StageScroll = {
  target: number;
  delta: number;
  from: EventTarget | null;
  root: HTMLElement;
};
