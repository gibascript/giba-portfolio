import { links } from '@/constants/links';
import { uiText } from '@/constants/ui-text';
import {
  workbenchFileIds,
  workbenchFiles,
  type WorkbenchFileId,
} from '@/constants/workbench-files';
import { commandPaletteText } from '@/features/command-palette/constants/command-palette-text';
import type { PaletteCommand } from '@/features/command-palette/utils/command-search';
import type { Locale } from '@/utils/locale';

/**
 * The locale of the labels, whether the single-key shortcuts are on (their
 * keys only show then), and the app actions the commands run.
 */
export type PaletteCommandsOptions = {
  locale: Locale;
  shortcutsEnabled: boolean;
  openFile: (id: WorkbenchFileId) => void;
  toggleLocale: () => void;
  toggleShortcuts: () => void;
  copyText: (text: string) => void;
  goHome: () => void;
};

/**
 * Every command of the palette, in display order: one per section (opens its
 * file), then the actions (switch language, turn the single-key shortcuts on
 * or off, copy the e-mail, download the CV, go home) and the links (GitHub,
 * LinkedIn, in a new tab).
 */
export function paletteCommands(
  options: PaletteCommandsOptions,
): PaletteCommand[] {
  const sections = workbenchFileIds.map((id, index) => ({
    id: `file-${id}`,
    group: uiText[options.locale].sections,
    label: workbenchFiles[id].title[options.locale],
    hint: workbenchFiles[id].name[options.locale],
    shortcut: options.shortcutsEnabled ? String(index + 1) : undefined,
    run: () => options.openFile(id),
  }));

  return [...sections, ...actionCommands(options), ...linkCommands(options)];
}

function actionCommands(options: PaletteCommandsOptions): PaletteCommand[] {
  const ui = uiText[options.locale];
  const text = commandPaletteText[options.locale];

  return [
    {
      id: 'switch-locale',
      group: text.actions,
      label: text.switchLocale,
      hint: text.otherLocale,
      shortcut: options.shortcutsEnabled ? 'L' : undefined,
      run: options.toggleLocale,
    },
    {
      id: 'toggle-shortcuts',
      group: text.actions,
      label: options.shortcutsEnabled
        ? text.disableShortcuts
        : text.enableShortcuts,
      hint: text.shortcutKeys,
      run: options.toggleShortcuts,
    },
    {
      id: 'copy-email',
      group: text.actions,
      label: ui.copyEmail,
      hint: links.email,
      run: () => options.copyText(links.email),
    },
    {
      id: 'download-cv',
      group: text.actions,
      label: ui.downloadCv,
      hint: 'PDF',
      run: () => download(links.cv.url, links.cv.fileName),
    },
    {
      id: 'home',
      group: text.actions,
      label: ui.home,
      hint: '~',
      run: options.goHome,
    },
  ];
}

function linkCommands(options: PaletteCommandsOptions): PaletteCommand[] {
  const group = uiText[options.locale].links;

  return [
    {
      id: 'github',
      group,
      label: 'GitHub',
      hint: links.github.label,
      run: () => window.open(links.github.url, '_blank', 'noopener'),
    },
    {
      id: 'linkedin',
      group,
      label: 'LinkedIn',
      hint: links.linkedin.label,
      run: () => window.open(links.linkedin.url, '_blank', 'noopener'),
    },
  ];
}

function download(url: string, fileName: string) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
}
