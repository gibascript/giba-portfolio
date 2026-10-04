import { useEffect, useState, type ReactNode } from 'react';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { useStageFocus } from '@/features/stage/hooks/use-stage-focus';
import { useStageGestures } from '@/features/stage/hooks/use-stage-gestures';
import { cn } from '@/utils/cn';

type StageProps = {
  heroScreen: ReactNode;
  workbenchScreen: ReactNode;
};

/**
 * The two stacked screens of the page: the hero, and the workbench, which
 * rises over it as the visitor scrolls (or opens it). The screen not current
 * is `inert`, and hidden once covered. Both screens are given by the app, so
 * this feature imports neither.
 */
export default function Stage({ heroScreen, workbenchScreen }: StageProps) {
  const workbench = useWorkbenchContext();
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [heroLayer, setHeroLayer] = useState<HTMLElement | null>(null);
  const [workbenchLayer, setWorkbenchLayer] = useState<HTMLElement | null>(
    null,
  );
  const setStageRoot = workbench.setStageRoot;

  useEffect(() => {
    setStageRoot(root);
  }, [root, setStageRoot]);
  useStageGestures({
    root,
    stageTarget: workbench.stageTarget,
    moveStageBy: workbench.moveStageBy,
  });
  useStageFocus(workbench.stage, {
    hero: heroLayer,
    workbench: workbenchLayer,
  });

  return (
    <div ref={setRoot} className="relative min-h-0 flex-1 overflow-hidden">
      <div
        ref={setHeroLayer}
        tabIndex={-1}
        inert={workbench.stage !== 'hero'}
        className={cn(
          'absolute inset-0 stage-hero overflow-x-hidden overflow-y-auto focus-visible:shadow-none',
          !workbench.heroVisible && 'invisible',
        )}
      >
        {heroScreen}
      </div>
      <div
        ref={setWorkbenchLayer}
        tabIndex={-1}
        inert={workbench.stage !== 'workbench'}
        className={cn(
          'absolute inset-0 flex stage-workbench flex-col border-t border-subtle bg-surface focus-visible:shadow-none',
          !workbench.workbenchVisible && 'invisible',
          workbench.heroVisible && workbench.workbenchVisible && 'shadow-lift',
        )}
      >
        {workbenchScreen}
      </div>
    </div>
  );
}
