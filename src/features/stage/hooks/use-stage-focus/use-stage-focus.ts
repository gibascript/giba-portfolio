import { useEffect, useRef } from 'react';
import type { Stage } from '@/context/workbench/utils/stage-motion';

/**
 * Moves focus to the layer of the new `stage` when the switch strands it:
 * focus left in the layer that just turned `inert`, or already dropped to the
 * page body. Focus placed elsewhere (e.g. the status bar) stays put, and
 * nothing moves on the first render.
 *
 * @param stage - The current stage.
 * @param layers - The layer element of each stage.
 */
export function useStageFocus(
  stage: Stage,
  layers: Record<Stage, HTMLElement | null>,
) {
  const previous = useRef(stage);
  const layer = layers[stage];
  const leftLayer = layers[stage === 'hero' ? 'workbench' : 'hero'];

  useEffect(() => {
    if (previous.current === stage) {
      return;
    }
    previous.current = stage;

    const focused = document.activeElement;
    const stranded =
      focused === null ||
      focused === document.body ||
      Boolean(leftLayer?.contains(focused));

    if (stranded) {
      layer?.focus({ preventScroll: true });
    }
  }, [stage, layer, leftLayer]);
}
