import type { StackGroup } from '@/features/stack/utils/stack';
import type { Localized } from '@/utils/locale';

/** Technologies from the CV, by group. */
export const stackContent: Localized<StackGroup[]> = {
  pt: [
    {
      group: 'front-end',
      items: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Module Federation',
      ],
    },
    {
      group: 'back-end',
      items: ['PHP', 'Laravel', 'MySQL', 'PostgreSQL', 'Kotlin'],
    },
    { group: 'auth e apis', items: ['Keycloak', 'RBAC', 'Apigee'] },
    {
      group: 'qualidade',
      items: ['Jest', 'React Testing Library', 'Playwright', 'Sonar'],
    },
    { group: 'acessibilidade', items: ['WCAG', 'WAI-ARIA', 'Lighthouse'] },
    { group: 'ferramentas', items: ['Turborepo', 'Payload CMS', 'Figma'] },
  ],
  en: [
    {
      group: 'front-end',
      items: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Module Federation',
      ],
    },
    {
      group: 'back-end',
      items: ['PHP', 'Laravel', 'MySQL', 'PostgreSQL', 'Kotlin'],
    },
    { group: 'auth & apis', items: ['Keycloak', 'RBAC', 'Apigee'] },
    {
      group: 'quality',
      items: ['Jest', 'React Testing Library', 'Playwright', 'Sonar'],
    },
    { group: 'accessibility', items: ['WCAG', 'WAI-ARIA', 'Lighthouse'] },
    { group: 'tooling', items: ['Turborepo', 'Payload CMS', 'Figma'] },
  ],
};
