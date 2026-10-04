import { useEffect } from 'react';
import type { WorkbenchFileId } from '@/constants/workbench-files';
import {
  shortcutAction,
  type ShortcutAction,
} from '@/context/workbench/utils/single-key-shortcuts';
import type { Stage } from '@/context/workbench/utils/stage-motion';

/** What the single-key shortcuts can do. */
export type ShortcutHandlers = {
  toggleLocale: () => void;
  openWorkbench: () => void;
  openFile: (id: WorkbenchFileId) => void;
  stepFile: (delta: number) => void;
  goHome: () => void;
};

/**
 * Whether the shortcuts listen (`enabled`), the current `stage` and the
 * `handlers` they call.
 */
export type SingleKeyShortcutsOptions = {
  enabled: boolean;
  stage: Stage;
  handlers: ShortcutHandlers;
};

/** Text fields, where a key types instead of triggering a shortcut. */
const fieldSelector = 'input, textarea, select, [contenteditable="true"]';

/** Elements that Enter already activates. */
const controlSelector = 'button, a[href], summary';

/**
 * Listens for the single-key shortcuts of `shortcutAction` anywhere on the
 * page while `enabled`, and runs the matching handler instead of the key's
 * default.
 */
export function useSingleKeyShortcuts({
  enabled,
  stage,
  handlers,
}: SingleKeyShortcutsOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const action = shortcutAction(
        {
          key: event.key,
          modified: event.metaKey || event.ctrlKey || event.altKey,
          inField: Boolean(target?.closest(fieldSelector)),
          onControl: Boolean(target?.closest(controlSelector)),
        },
        stage,
      );

      if (action && !event.defaultPrevented) {
        event.preventDefault();
        runShortcut(action, handlers);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled, stage, handlers]);
}

function runShortcut(action: ShortcutAction, handlers: ShortcutHandlers) {
  switch (action.type) {
    case 'toggle-locale':
      return handlers.toggleLocale();
    case 'open-workbench':
      return handlers.openWorkbench();
    case 'open-file':
      return handlers.openFile(action.file);
    case 'step-file':
      return handlers.stepFile(action.delta);
    case 'go-home':
      return handlers.goHome();
  }
}
