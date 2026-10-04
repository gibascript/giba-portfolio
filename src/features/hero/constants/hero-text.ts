import type { Localized } from '@/utils/locale';

type HeroText = {
  openWorkbench: string;
  or: string;
  toNavigate: string;
};

/** Labels of the hero call to action and of its keyboard hint. */
export const heroText: Localized<HeroText> = {
  pt: {
    openWorkbench: 'Abrir workbench',
    or: 'ou',
    toNavigate: 'para navegar',
  },
  en: {
    openWorkbench: 'Open workbench',
    or: 'or',
    toNavigate: 'to navigate',
  },
};
