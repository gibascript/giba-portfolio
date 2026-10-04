import { act, fireEvent, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { storageKeys } from '@/constants/storage-keys';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { AppProviders } from '@/test/app-providers';
import { mockMatchMedia } from '@/test/match-media';
import { useWorkbenchContext } from './use-workbench-context';

function renderWorkbench(reducedMotion = true) {
  mockMatchMedia(reducedMotion);

  return renderHook(
    () => ({ workbench: useWorkbenchContext(), locale: useLocaleContext() }),
    { wrapper: AppProviders },
  );
}

describe('WorkbenchProvider', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('starts on the hero with the about file open alone', () => {
    const { result } = renderWorkbench();

    expect(result.current.workbench.stage).toBe('hero');
    expect(result.current.workbench.activeFile).toBe('about');
    expect(result.current.workbench.openTabs).toEqual(['about']);
  });

  it('opens the next and previous files in explorer order, wrapping around', () => {
    const { result } = renderWorkbench();

    act(() => result.current.workbench.stepFile(-1));
    expect(result.current.workbench.activeFile).toBe('contact');

    act(() => result.current.workbench.stepFile(1));
    expect(result.current.workbench.activeFile).toBe('about');
    expect(result.current.workbench.openTabs).toEqual(['about', 'contact']);
  });

  it('reopens about after the last tab is closed', () => {
    const { result } = renderWorkbench();

    act(() => result.current.workbench.openFile('stack'));
    act(() => result.current.workbench.closeTab('about'));
    act(() => result.current.workbench.closeTab('stack'));

    expect(result.current.workbench.activeFile).toBe('about');
    expect(result.current.workbench.openTabs).toEqual(['about']);
  });

  describe('URL hash', () => {
    it('opens straight on the file a link names', () => {
      window.history.replaceState(null, '', '/#/projects');

      const { result } = renderWorkbench();

      expect(result.current.workbench.stage).toBe('workbench');
      expect(result.current.workbench.activeFile).toBe('projects');
    });

    it('follows the screen and walks back through the history', () => {
      const { result } = renderWorkbench();

      act(() => result.current.workbench.openFile('stack'));
      expect(window.location.hash).toBe('#/stack');

      act(() => result.current.workbench.openFile('contact'));
      expect(window.location.hash).toBe('#/contact');

      act(() => {
        window.history.replaceState(null, '', '/#/stack');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      expect(result.current.workbench.activeFile).toBe('stack');

      act(() => {
        window.history.replaceState(null, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      expect(result.current.workbench.stage).toBe('hero');
    });

    it('drops an unknown hash', () => {
      window.history.replaceState(null, '', '/#/nope');

      renderWorkbench();

      expect(window.location.hash).toBe('');
    });

    it('keeps the hash until a scroll comes to rest on a stage', () => {
      vi.useFakeTimers({ toFake: ['requestAnimationFrame'] });
      const { result } = renderWorkbench(false);

      act(() => result.current.workbench.moveStageBy(0.7));
      act(() => vi.advanceTimersByTime(1000));
      expect(result.current.workbench.stage).toBe('workbench');
      expect(window.location.hash).toBe('');

      act(() => result.current.workbench.moveStageBy(0.3));
      act(() => vi.advanceTimersByTime(1000));
      expect(window.location.hash).toBe('#/about');
    });
  });

  describe('single-key shortcuts', () => {
    it('opens files, steps through them and goes home', () => {
      const { result } = renderWorkbench();

      fireEvent.keyDown(document.body, { key: '3' });
      expect(result.current.workbench.activeFile).toBe('projects');
      expect(result.current.workbench.stage).toBe('workbench');

      fireEvent.keyDown(document.body, { key: ']' });
      expect(result.current.workbench.activeFile).toBe('certifications');

      fireEvent.keyDown(document.body, { key: 'Escape' });
      expect(result.current.workbench.stage).toBe('hero');
    });

    it('switches the language with L', () => {
      const { result } = renderWorkbench();

      fireEvent.keyDown(document.body, { key: 'l' });

      expect(result.current.locale.locale).toBe('en');
    });

    it('stays quiet once turned off, and remembers it', () => {
      const { result } = renderWorkbench();

      act(() => result.current.workbench.toggleShortcuts());
      fireEvent.keyDown(document.body, { key: '3' });

      expect(result.current.workbench.activeFile).toBe('about');
      expect(localStorage.getItem(storageKeys.shortcuts)).toBe('false');
    });
  });
});
