import { useEffect, useRef } from 'react';
import type { WorkbenchFileId } from '@/constants/workbench-files';
import { fileFromHash, screenHash } from '@/context/workbench/utils/file-hash';
import type { Stage } from '@/context/workbench/utils/stage-motion';

/** What is on screen, and how to show what a URL names. */
export type HashSyncOptions = {
  stage: Stage;
  activeFile: WorkbenchFileId;
  openFile: (id: WorkbenchFileId) => void;
  showHero: () => void;
};

/**
 * Keeps the URL hash in step with the screen: `#/<file>` on the workbench,
 * no hash on the hero. Each change becomes a history entry, so the browser
 * back and forward buttons walk through the files and the hero; the first
 * sync only replaces the entry, dropping an unknown hash.
 */
export function useHashSync({
  stage,
  activeFile,
  openFile,
  showHero,
}: HashSyncOptions) {
  const firstSync = useRef(true);

  useEffect(() => {
    const showUrl = () => {
      const file = fileFromHash(window.location.hash);

      if (file) {
        openFile(file);
      } else {
        showHero();
      }
    };

    window.addEventListener('popstate', showUrl);
    window.addEventListener('hashchange', showUrl);

    return () => {
      window.removeEventListener('popstate', showUrl);
      window.removeEventListener('hashchange', showUrl);
    };
  }, [openFile, showHero]);

  useEffect(() => {
    const hash = screenHash(stage, activeFile);

    if (window.location.hash !== hash) {
      const url = hash || window.location.pathname + window.location.search;
      const method = firstSync.current ? 'replaceState' : 'pushState';
      window.history[method](null, '', url);
    }
    firstSync.current = false;
  }, [stage, activeFile]);
}
