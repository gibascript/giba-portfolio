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

/** The locale of the labels, and the app actions the commands run. */
export type PaletteCommandsOptions = {
  locale: Locale;
  openFile: (id: WorkbenchFileId) => void;
  toggleLocale: () => void;
  copyText: (text: string) => void;
  goHome: () => void;
};

/**
 * Every command of the palette, in display order: one per section (opens its
 * file), then the actions (switch language, copy the e-mail, download the CV,
 * go home) and the links (GitHub, LinkedIn, in a new tab).
 */
export function paletteCommands(
  options: PaletteCommandsOptions,
): PaletteCommand[] {
  const sections = workbenchFileIds.map((id) => ({
    id: `file-${id}`,
    group: uiText[options.locale].sections,
    label: workbenchFiles[id].title[options.locale],
    hint: workbenchFiles[id].name[options.locale],
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
      run: options.toggleLocale,
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
