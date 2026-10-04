import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLineCount } from './use-line-count';

let notifyResize = () => {};

function contentOf(height: number) {
  const element = document.createElement('div');
  Object.defineProperty(element, 'offsetHeight', {
    configurable: true,
    value: height,
  });

  return element;
}

describe('useLineCount', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          notifyResize = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows 40 lines for short content', () => {
    const { result } = renderHook(() => useLineCount());

    act(() => result.current[0](contentOf(300)));
    act(() => notifyResize());

    expect(result.current[1]).toBe(40);
  });

  it('adds a line per started 20px row of long content', () => {
    const { result } = renderHook(() => useLineCount());
    const content = contentOf(1010);

    act(() => result.current[0](content));
    act(() => notifyResize());

    expect(result.current[1]).toBe(51);
  });
});
