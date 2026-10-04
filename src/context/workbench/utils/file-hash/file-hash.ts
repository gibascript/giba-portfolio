import {
  workbenchFileIds,
  type WorkbenchFileId,
} from '@/constants/workbench-files';
import type { Stage } from '@/context/workbench/utils/stage-motion';

/**
 * The workbench file a URL hash points to (`#/projects`), or `null` for no
 * hash or an unknown one.
 *
 * @example
 * fileFromHash('#/contact') // 'contact'
 * fileFromHash('#/contato') // null
 */
export function fileFromHash(hash: string): WorkbenchFileId | null {
  const id = hash.startsWith('#/') ? hash.slice(2) : '';

  return workbenchFileIds.find((fileId) => fileId === id) ?? null;
}

/**
 * The URL hash of what is on screen: the open file on the workbench, nothing
 * on the hero.
 *
 * @example
 * screenHash('workbench', 'stack') // '#/stack'
 * screenHash('hero', 'stack') // ''
 */
export function screenHash(stage: Stage, activeFile: WorkbenchFileId) {
  return stage === 'workbench' ? `#/${activeFile}` : '';
}
