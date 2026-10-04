import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { WorkbenchFileId } from '@/constants/workbench-files';
import { useExplorerDrawer } from './use-explorer-drawer';

describe('useExplorerDrawer', () => {
  it('toggles open and closed over the same file', () => {
    const { result } = renderHook(() => useExplorerDrawer('about'));

    act(() => result.current.toggle());
    expect(result.current.open).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.open).toBe(false);
  });

  it('closes when another file is opened', () => {
    const { result, rerender } = renderHook(
      ({ file }: { file: WorkbenchFileId }) => useExplorerDrawer(file),
      { initialProps: { file: 'about' } },
    );

    act(() => result.current.toggle());
    rerender({ file: 'contact' });

    expect(result.current.open).toBe(false);
  });
});
