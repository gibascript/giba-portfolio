import type { Localized } from '@/utils/locale';

type UiText = {
  explorer: string;
  sections: string;
  links: string;
  palette: string;
  downloadCv: string;
  copyEmail: string;
  emailCopied: string;
};

/** Interface labels shared by two or more features. */
export const uiText: Localized<UiText> = {
  pt: {
    explorer: 'Explorer',
    sections: 'Seções',
    links: 'Links',
    palette: 'Comandos',
    downloadCv: 'Baixar currículo',
    copyEmail: 'Copiar e-mail',
    emailCopied: 'E-mail copiado',
  },
  en: {
    explorer: 'Explorer',
    sections: 'Sections',
    links: 'Links',
    palette: 'Commands',
    downloadCv: 'Download CV',
    copyEmail: 'Copy email',
    emailCopied: 'Email copied',
  },
};
