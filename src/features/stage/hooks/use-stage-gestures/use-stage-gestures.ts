import { useEffect } from 'react';
import { shouldMoveStage } from '@/features/stage/utils/stage-gestures';

/**
 * The stage `root` to listen on, where the transition is heading
 * (`stageTarget`) and how to move it (`moveStageBy`, in transition share).
 */
export type StageGesturesOptions = {
  root: HTMLElement | null;
  stageTarget: () => number;
  moveStageBy: (delta: number) => void;
};

/** Pixels per wheel "line", for wheels that scroll by lines (Firefox). */
const lineHeight = 30;

/**
 * Turns wheel and touch scrolling over the stage into the hero ↔ workbench
 * transition, whenever `shouldMoveStage` says the content has no room left.
 * One stage height of scrolling is the whole transition, so the workbench
 * moves with the wheel or the finger as page content would, and stops where
 * the scrolling stops. The listeners are not passive, so a scroll that drives
 * the transition does not also scroll the page.
 */
export function useStageGestures({
  root,
  stageTarget,
  moveStageBy,
}: StageGesturesOptions) {
  useEffect(() => {
    if (!root) {
      return;
    }

    let touchY = 0;

    const drive = (delta: number, event: Event) => {
      if (
        !shouldMoveStage({
          target: stageTarget(),
          delta,
          from: event.target,
          root,
        })
      ) {
        return;
      }

      if (event.cancelable) {
        event.preventDefault();
      }
      moveStageBy(delta / root.clientHeight);
    };

    const onWheel = (event: WheelEvent) =>
      drive(
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaY * lineHeight
          : event.deltaY,
        event,
      );
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0].clientY;
    };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0].clientY;
      drive(touchY - y, event);
      touchY = y;
    };

    root.addEventListener('wheel', onWheel, { passive: false });
    root.addEventListener('touchstart', onTouchStart, { passive: true });
    root.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      root.removeEventListener('wheel', onWheel);
      root.removeEventListener('touchstart', onTouchStart);
      root.removeEventListener('touchmove', onTouchMove);
    };
  }, [root, stageTarget, moveStageBy]);
}
