import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockMatchMedia } from '@/test/match-media';
import { useMediaQuery } from './use-media-query';

describe('useMediaQuery', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('follows the query as the viewport changes', () => {
    const media = mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 860px)'));

    expect(result.current).toBe(true);

    act(() => media.setMatches(false));

    expect(result.current).toBe(false);
  });
});
