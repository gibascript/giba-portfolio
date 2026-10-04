import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useClipboard } from './use-clipboard';

const writeText = vi.fn<(text: string) => Promise<void>>();

describe('useClipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    writeText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    writeText.mockReset();
  });

  it('copies the text and flags it as copied for a moment', async () => {
    const { result } = renderHook(() => useClipboard(2200));

    await act(() => result.current.copy('alvesgilberto84@gmail.com'));

    expect(writeText).toHaveBeenCalledWith('alvesgilberto84@gmail.com');
    expect(result.current.copied).toBe(true);

    act(() => vi.advanceTimersByTime(2200));

    expect(result.current.copied).toBe(false);
  });

  it('restarts the moment when copying again', async () => {
    const { result } = renderHook(() => useClipboard(2200));

    await act(() => result.current.copy('a'));
    act(() => vi.advanceTimersByTime(2000));
    await act(() => result.current.copy('a'));
    act(() => vi.advanceTimersByTime(2000));

    expect(result.current.copied).toBe(true);
  });

  it('does not claim a refused copy', async () => {
    writeText.mockRejectedValue(new DOMException('denied', 'NotAllowedError'));
    const { result } = renderHook(() => useClipboard(2200));

    let worked = true;
    await act(async () => {
      worked = await result.current.copy('a');
    });

    expect(worked).toBe(false);
    expect(result.current.copied).toBe(false);
  });
});
