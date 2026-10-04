import type { Localized } from '@/utils/locale';

type HeroContent = {
  roles: string[];
  headline: string;
};

/**
 * Hero text: the `roles` typed one after the other under the name (the first
 * is the one screen readers get), and the LinkedIn headline.
 */
export const heroContent: Localized<HeroContent> = {
  pt: {
    roles: [
      'engenheiro de software sênior',
      'front-end & full stack',
      'microfrontends & design systems',
      'acessibilidade digital',
    ],
    headline:
      'Engenheiro de Software Sênior | Desenvolvedor Front-end & Full Stack | React, Next.js, TypeScript & Laravel | Microfrontends & Design Systems | Acessibilidade Digital',
  },
  en: {
    roles: [
      'senior software engineer',
      'front-end & full stack',
      'microfrontends & design systems',
      'web accessibility',
    ],
    headline:
      'Senior Software Engineer | Full Stack | React, Next.js, TypeScript & Laravel | Microfrontends & Design Systems | Web Accessibility',
  },
};
