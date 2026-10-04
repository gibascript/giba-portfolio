import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useWorkbenchContext } from './use-workbench-context';
import { WorkbenchProvider } from './workbench-provider';

function renderWorkbench() {
  return renderHook(() => useWorkbenchContext(), {
    wrapper: WorkbenchProvider,
  });
}

describe('WorkbenchProvider', () => {
  it('starts with the about file open alone', () => {
    const { result } = renderWorkbench();

    expect(result.current.activeFile).toBe('about');
    expect(result.current.openTabs).toEqual(['about']);
  });

  it('opens the next and previous files in explorer order, wrapping around', () => {
    const { result } = renderWorkbench();

    act(() => result.current.stepFile(-1));
    expect(result.current.activeFile).toBe('contact');

    act(() => result.current.stepFile(1));
    expect(result.current.activeFile).toBe('about');
    expect(result.current.openTabs).toEqual(['about', 'contact']);
  });

  it('reopens about after the last tab is closed', () => {
    const { result } = renderWorkbench();

    act(() => result.current.openFile('stack'));
    act(() => result.current.closeTab('about'));
    act(() => result.current.closeTab('stack'));

    expect(result.current.activeFile).toBe('about');
    expect(result.current.openTabs).toEqual(['about']);
  });
});

describe('useWorkbenchContext', () => {
  it('throws outside a WorkbenchProvider', () => {
    expect(() => renderHook(() => useWorkbenchContext())).toThrow(
      'useWorkbenchContext must be used inside a WorkbenchProvider',
    );
  });
});
