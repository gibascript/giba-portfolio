import type { FileIconType } from '@/components/file-icon/file-icons';
import type { Localized } from '@/utils/locale';

/** Id of a workbench file, stable across locales (used in the URL hash). */
export type WorkbenchFileId =
  | 'about'
  | 'experience'
  | 'projects'
  | 'certifications'
  | 'stack'
  | 'education'
  | 'testimonials'
  | 'contact';

/**
 * A portfolio section shown as a file: `name` is the file name on the explorer
 * and tabs, `title` the section name on the palette and headlines.
 */
export type WorkbenchFile = {
  id: WorkbenchFileId;
  icon: FileIconType;
  name: Localized<string>;
  title: Localized<string>;
};

/** Order of the workbench files: explorer, pager and `1`–`8` shortcuts. */
export const workbenchFileIds: readonly WorkbenchFileId[] = [
  'about',
  'experience',
  'projects',
  'certifications',
  'stack',
  'education',
  'testimonials',
  'contact',
];

/** Every workbench file, by id. */
export const workbenchFiles: Record<WorkbenchFileId, WorkbenchFile> = {
  about: {
    id: 'about',
    icon: 'markdown',
    name: { pt: 'sobre.md', en: 'about.md' },
    title: { pt: 'Sobre', en: 'About' },
  },
  experience: {
    id: 'experience',
    icon: 'typescript',
    name: { pt: 'experiencia.ts', en: 'experience.ts' },
    title: { pt: 'Experiência', en: 'Experience' },
  },
  projects: {
    id: 'projects',
    icon: 'react',
    name: { pt: 'projetos.tsx', en: 'projects.tsx' },
    title: { pt: 'Projetos', en: 'Projects' },
  },
  certifications: {
    id: 'certifications',
    icon: 'json',
    name: { pt: 'certificacoes.json', en: 'certifications.json' },
    title: { pt: 'Certificações', en: 'Certifications' },
  },
  stack: {
    id: 'stack',
    icon: 'yaml',
    name: { pt: 'stack.yaml', en: 'stack.yaml' },
    title: { pt: 'Stack', en: 'Stack' },
  },
  education: {
    id: 'education',
    icon: 'markdown',
    name: { pt: 'formacao.md', en: 'education.md' },
    title: { pt: 'Formação', en: 'Education' },
  },
  testimonials: {
    id: 'testimonials',
    icon: 'markdown',
    name: { pt: 'depoimentos.md', en: 'testimonials.md' },
    title: { pt: 'Depoimentos', en: 'Testimonials' },
  },
  contact: {
    id: 'contact',
    icon: 'shell',
    name: { pt: 'contato.sh', en: 'contact.sh' },
    title: { pt: 'Contato', en: 'Contact' },
  },
};
