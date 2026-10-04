import { useEffect, useRef, useState } from 'react';
import { mediaQueries } from '@/constants/media-queries';
import {
  followTarget,
  settleTarget,
  stageProgress,
  type Stage,
  type StageView,
} from '@/context/workbench/utils/stage-motion';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useStagePaint } from './use-stage-paint';

/** Wait after the last scroll before a halfway transition settles. */
const settleDelay = 220;

/**
 * The hero ↔ workbench transition. `setStageRoot` registers the element that
 * holds both layers, where the progress is painted; `showStage` animates to a
 * stage; `moveStageBy` follows scrolling, settling 220ms after it stops; and
 * `stageTarget` reads where the transition is heading (0 hero, 1 workbench).
 */
export type StageMotion = StageView & {
  setStageRoot: (element: HTMLElement | null) => void;
  showStage: (stage: Stage) => void;
  moveStageBy: (delta: number) => void;
  stageTarget: () => number;
};

/**
 * Animates the transition between the hero and the workbench, starting on
 * the hero. The progress eases toward its target on each animation frame;
 * with reduced motion, every move jumps straight to a stage.
 */
export function useStageMotion(): StageMotion {
  const reducedMotion = useMediaQuery(mediaQueries.reducedMotion);
  const [stageRoot, setStageRoot] = useState<HTMLElement | null>(null);
  const stagePaint = useStagePaint(stageRoot);
  const motion = useRef({ progress: 0, target: 0, frame: 0, settleTimer: 0 });

  useEffect(() => {
    const current = motion.current;

    return () => {
      cancelAnimationFrame(current.frame);
      window.clearTimeout(current.settleTimer);
    };
  }, []);

  const animate = () => {
    const current = motion.current;
    current.progress = followTarget(current.progress, current.target);
    stagePaint.paint(current.progress);
    current.frame =
      current.progress === current.target ? 0 : requestAnimationFrame(animate);
  };

  const moveTo = (target: number, settled: boolean) => {
    const current = motion.current;
    current.target = Math.min(1, Math.max(0, target));
    window.clearTimeout(current.settleTimer);

    if (!settled && current.target > 0 && current.target < 1) {
      current.settleTimer = window.setTimeout(
        () => moveTo(settleTarget(current.target), true),
        settleDelay,
      );
    }

    if (reducedMotion) {
      current.progress = current.target;
      stagePaint.paint(current.progress);
    } else if (!current.frame) {
      current.frame = requestAnimationFrame(animate);
    }
  };

  return {
    ...stagePaint.view,
    setStageRoot,
    showStage: (stage) => moveTo(stageProgress[stage], true),
    moveStageBy: (delta) =>
      reducedMotion
        ? moveTo(delta > 0 ? 1 : 0, true)
        : moveTo(motion.current.target + delta, false),
    stageTarget: () => motion.current.target,
  };
}
