import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useExplorerDrawer } from './use-explorer-drawer';

describe('useExplorerDrawer', () => {
  it('toggles open and closed within the same scope', () => {
    const { result } = renderHook(() => useExplorerDrawer('workbench/about'));

    act(() => result.current.toggle());
    expect(result.current.open).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.open).toBe(false);
  });

  it('closes when the scope changes and stays closed on return', () => {
    const { result, rerender } = renderHook(
      ({ scope }: { scope: string }) => useExplorerDrawer(scope),
      { initialProps: { scope: 'workbench/about' } },
    );

    act(() => result.current.toggle());
    rerender({ scope: 'workbench/contact' });
    expect(result.current.open).toBe(false);

    rerender({ scope: 'workbench/about' });
    expect(result.current.open).toBe(false);
  });
});
