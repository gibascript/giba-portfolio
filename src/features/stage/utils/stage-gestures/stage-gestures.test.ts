import { afterEach, describe, expect, it } from 'vitest';
import { shouldMoveStage } from './stage-gestures';

function scroller({ top, room }: { top: number; room: number }) {
  const element = document.createElement('div');
  element.style.overflowY = 'auto';
  Object.defineProperties(element, {
    clientHeight: { value: 500 },
    scrollHeight: { value: 500 + top + room },
    scrollTop: { value: top },
  });

  return element;
}

function stageWith(content: HTMLElement) {
  const root = document.createElement('div');
  const inner = document.createElement('p');
  content.append(inner);
  root.append(content);
  document.body.append(root);

  return { root, inner };
}

describe('shouldMoveStage', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('scrolls the hero down before leaving it', () => {
    const { root, inner } = stageWith(scroller({ top: 0, room: 300 }));

    expect(shouldMoveStage({ target: 0, delta: 40, from: inner, root })).toBe(
      false,
    );
  });

  it('leaves the hero once it is scrolled to the end', () => {
    const { root, inner } = stageWith(scroller({ top: 300, room: 0 }));

    expect(shouldMoveStage({ target: 0, delta: 40, from: inner, root })).toBe(
      true,
    );
  });

  it('never goes above the hero', () => {
    const { root, inner } = stageWith(scroller({ top: 0, room: 0 }));

    expect(shouldMoveStage({ target: 0, delta: -40, from: inner, root })).toBe(
      false,
    );
  });

  it('scrolls the open file up before going back to the hero', () => {
    const scrolled = stageWith(scroller({ top: 120, room: 0 }));
    const atTop = stageWith(scroller({ top: 0, room: 200 }));

    expect(
      shouldMoveStage({
        target: 1,
        delta: -40,
        from: scrolled.inner,
        root: scrolled.root,
      }),
    ).toBe(false);
    expect(
      shouldMoveStage({
        target: 1,
        delta: -40,
        from: atTop.inner,
        root: atTop.root,
      }),
    ).toBe(true);
  });

  it('only scrolls content when scrolling down on the workbench', () => {
    const { root, inner } = stageWith(scroller({ top: 0, room: 0 }));

    expect(shouldMoveStage({ target: 1, delta: 40, from: inner, root })).toBe(
      false,
    );
  });

  it('keeps driving a transition in progress, whatever is under the pointer', () => {
    const { root, inner } = stageWith(scroller({ top: 0, room: 300 }));

    expect(shouldMoveStage({ target: 0.4, delta: 40, from: inner, root })).toBe(
      true,
    );
  });
});
