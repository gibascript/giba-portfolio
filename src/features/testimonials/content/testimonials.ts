import type { Testimonial } from '@/features/testimonials/utils/testimonials';
import type { Localized } from '@/utils/locale';

/**
 * Recommendations, as on LinkedIn.
 *
 * @remarks
 * Mock: a placeholder until the real recommendations are collected. Replace
 * the entry, keeping the author's own words in both locales.
 */
export const testimonialsContent: Localized<Testimonial[]> = {
  pt: [
    {
      quote:
        'Trabalhar com o Gilberto é ter alguém que pensa no produto inteiro: ele cuida da arquitetura, da acessibilidade e do time com o mesmo cuidado.',
      author: 'Nome Sobrenome',
      role: 'Cargo @ Empresa',
    },
  ],
  en: [
    {
      quote:
        'Working with Gilberto means having someone who thinks about the whole product: he cares for the architecture, the accessibility and the team alike.',
      author: 'Full Name',
      role: 'Role @ Company',
    },
  ],
};
