import { useEffect, useRef, useState } from 'react';
import {
  easeInOut,
  stageView,
  type StageView,
} from '@/context/workbench/utils/stage-motion';

/** The {@link StageView} on screen, and `paint`, which moves it. */
export type StagePaint = {
  view: StageView;
  paint: (progress: number) => void;
};

/**
 * Paints a transition progress on `stageRoot`, starting at `initialProgress`:
 * its eased value goes to the `--stage-ease` CSS variable (read by the
 * `stage-*` utilities) on every frame, while the React view only updates when
 * a layer shows, hides or becomes the current one. A root registered later
 * gets the last painted progress.
 */
export function useStagePaint(
  stageRoot: HTMLElement | null,
  initialProgress: number,
): StagePaint {
  const [view, setView] = useState(() => stageView(initialProgress));
  const painted = useRef(initialProgress);

  useEffect(() => {
    stageRoot?.style.setProperty(
      '--stage-ease',
      String(easeInOut(painted.current)),
    );
  }, [stageRoot]);

  const paint = (progress: number) => {
    painted.current = progress;
    stageRoot?.style.setProperty('--stage-ease', String(easeInOut(progress)));

    const next = stageView(progress);
    setView((current) =>
      current.stage === next.stage &&
      current.heroVisible === next.heroVisible &&
      current.workbenchVisible === next.workbenchVisible
        ? current
        : next,
    );
  };

  return { view, paint };
}
