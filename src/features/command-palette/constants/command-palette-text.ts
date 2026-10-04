import type { Localized } from '@/utils/locale';

type CommandPaletteText = {
  placeholder: string;
  noResults: string;
  actions: string;
  switchLocale: string;
  otherLocale: string;
  disableShortcuts: string;
  enableShortcuts: string;
  shortcutKeys: string;
};

/**
 * Labels of the command palette. `switchLocale` is written in the language it
 * switches to, so a visitor who cannot read the current one still finds it.
 */
export const commandPaletteText: Localized<CommandPaletteText> = {
  pt: {
    placeholder: 'Ir para seção ou executar comando…',
    noResults: 'Nenhum comando encontrado',
    actions: 'Ações',
    switchLocale: 'Switch to English',
    otherLocale: 'EN',
    disableShortcuts: 'Desativar atalhos de uma tecla',
    enableShortcuts: 'Ativar atalhos de uma tecla',
    shortcutKeys: 'L · 1–8 · [ ] · ↵ · esc',
  },
  en: {
    placeholder: 'Go to a section or run a command…',
    noResults: 'No matching commands',
    actions: 'Actions',
    switchLocale: 'Mudar para português',
    otherLocale: 'PT-BR',
    disableShortcuts: 'Turn off single-key shortcuts',
    enableShortcuts: 'Turn on single-key shortcuts',
    shortcutKeys: 'L · 1–8 · [ ] · ↵ · esc',
  },
};
