import type { Localized } from '@/utils/locale';

type ContactContent = {
  lead: string;
  invitation: string;
};

/** Headline and invitation of the contact file. */
export const contactContent: Localized<ContactContent> = {
  pt: {
    lead: 'Vamos conversar.',
    invitation: 'Aberto a novos projetos e oportunidades.',
  },
  en: {
    lead: 'Let’s talk.',
    invitation: 'Open to new projects and opportunities.',
  },
};
