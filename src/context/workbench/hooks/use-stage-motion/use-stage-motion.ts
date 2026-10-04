import { useEffect, useRef, useState } from 'react';
import { mediaQueries } from '@/constants/media-queries';
import {
  followRates,
  followTarget,
  stageProgress,
  type Stage,
  type StageView,
} from '@/context/workbench/utils/stage-motion';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useStagePaint } from './use-stage-paint';

/**
 * The hero ↔ workbench transition. `setStageRoot` registers the element that
 * holds both layers, where the progress is painted; `showStage` animates to a
 * stage; `moveStageBy` follows scrolling, by a share of the whole transition,
 * and stays wherever the scrolling stops; `stageTarget` reads where the
 * transition is heading (0 hero, 1 workbench).
 */
export type StageMotion = StageView & {
  setStageRoot: (element: HTMLElement | null) => void;
  showStage: (stage: Stage) => void;
  moveStageBy: (delta: number) => void;
  stageTarget: () => number;
};

/**
 * Moves the page between the hero and the workbench, starting on
 * `initialStage` (the workbench when the URL names a file). Scrolling drives
 * the progress freely, like a page scroll; buttons and shortcuts animate it to
 * a stage. With reduced motion, every move jumps straight to a stage.
 */
export function useStageMotion(initialStage: Stage): StageMotion {
  const reducedMotion = useMediaQuery(mediaQueries.reducedMotion);
  const [stageRoot, setStageRoot] = useState<HTMLElement | null>(null);
  const initialProgress = stageProgress[initialStage];
  const stagePaint = useStagePaint(stageRoot, initialProgress);
  const motion = useRef({
    progress: initialProgress,
    target: initialProgress,
    rate: followRates.animation,
    frame: 0,
  });

  useEffect(() => {
    const current = motion.current;

    return () => cancelAnimationFrame(current.frame);
  }, []);

  const animate = () => {
    const current = motion.current;
    current.progress = followTarget(
      current.progress,
      current.target,
      current.rate,
    );
    stagePaint.paint(current.progress);
    current.frame =
      current.progress === current.target ? 0 : requestAnimationFrame(animate);
  };

  const moveTo = (target: number, rate: number) => {
    const current = motion.current;
    current.target = Math.min(1, Math.max(0, target));
    current.rate = rate;

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
    showStage: (stage) => moveTo(stageProgress[stage], followRates.animation),
    moveStageBy: (delta) =>
      reducedMotion
        ? moveTo(delta > 0 ? 1 : 0, followRates.animation)
        : moveTo(motion.current.target + delta, followRates.scroll),
    stageTarget: () => motion.current.target,
  };
}
