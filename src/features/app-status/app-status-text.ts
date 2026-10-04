import type { Localized } from '@/utils/locale';

type AppStatusText = {
  ready: string;
  location: string;
  switchLocale: string;
};

/** Labels of the status bar. */
export const appStatusText: Localized<AppStatusText> = {
  pt: {
    ready: 'Pronto',
    location: 'Brasil',
    switchLocale: 'Mudar idioma para inglês',
  },
  en: {
    ready: 'Ready',
    location: 'Brazil',
    switchLocale: 'Switch language to Portuguese',
  },
};
