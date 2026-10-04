import type { StageScroll } from './stage-gestures.types';

/** Slack, in pixels, when checking whether an element is at its scroll end. */
const scrollSlack = 2;

/**
 * Whether a scroll drives the hero ↔ workbench transition instead of
 * scrolling the page content.
 *
 * @remarks
 * At either end, scrolling first scrolls the content that still has room:
 * the hero going down, the open file (or any scrollable panel under the
 * pointer) going up. Scrolling up on the hero or down on the workbench never
 * moves the transition. Stopped anywhere in between, every scroll moves it.
 */
export function shouldMoveStage({ target, delta, from, root }: StageScroll) {
  if (delta === 0) {
    return false;
  }

  if ((target === 0 && delta < 0) || (target === 1 && delta > 0)) {
    return false;
  }

  const atRest = target === 0 || target === 1;

  return !(atRest && canScrollFurther(from, delta, root));
}

function canScrollFurther(
  from: EventTarget | null,
  delta: number,
  root: HTMLElement,
) {
  for (
    let element = from instanceof Element ? from : null;
    element && element !== root;
    element = element.parentElement
  ) {
    if (isScrollable(element) && hasRoomToScroll(element, delta)) {
      return true;
    }
  }

  return false;
}

function isScrollable(element: Element) {
  const { overflowY } = getComputedStyle(element);

  return (
    (overflowY === 'auto' || overflowY === 'scroll') &&
    element.scrollHeight > element.clientHeight
  );
}

function hasRoomToScroll(element: Element, delta: number) {
  return delta > 0
    ? element.scrollTop + element.clientHeight <
        element.scrollHeight - scrollSlack
    : element.scrollTop > 0;
}
