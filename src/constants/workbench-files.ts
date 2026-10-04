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

/** The workbench files, in explorer order (also the `1`–`8` shortcuts). */
export const workbenchFiles: readonly WorkbenchFile[] = [
  {
    id: 'about',
    icon: 'markdown',
    name: { pt: 'sobre.md', en: 'about.md' },
    title: { pt: 'Sobre', en: 'About' },
  },
  {
    id: 'experience',
    icon: 'typescript',
    name: { pt: 'experiencia.ts', en: 'experience.ts' },
    title: { pt: 'Experiência', en: 'Experience' },
  },
  {
    id: 'projects',
    icon: 'react',
    name: { pt: 'projetos.tsx', en: 'projects.tsx' },
    title: { pt: 'Projetos', en: 'Projects' },
  },
  {
    id: 'certifications',
    icon: 'json',
    name: { pt: 'certificacoes.json', en: 'certifications.json' },
    title: { pt: 'Certificações', en: 'Certifications' },
  },
  {
    id: 'stack',
    icon: 'yaml',
    name: { pt: 'stack.yaml', en: 'stack.yaml' },
    title: { pt: 'Stack', en: 'Stack' },
  },
  {
    id: 'education',
    icon: 'markdown',
    name: { pt: 'formacao.md', en: 'education.md' },
    title: { pt: 'Formação', en: 'Education' },
  },
  {
    id: 'testimonials',
    icon: 'markdown',
    name: { pt: 'depoimentos.md', en: 'testimonials.md' },
    title: { pt: 'Depoimentos', en: 'Testimonials' },
  },
  {
    id: 'contact',
    icon: 'shell',
    name: { pt: 'contato.sh', en: 'contact.sh' },
    title: { pt: 'Contato', en: 'Contact' },
  },
];
