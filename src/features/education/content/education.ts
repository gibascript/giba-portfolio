import type { Course } from '@/features/education/utils/education';
import type { Localized } from '@/utils/locale';

/** Education from the CV, latest first. */
export const educationContent: Localized<Course[]> = {
  pt: [
    {
      school: 'Universidade Católica de Brasília',
      course: 'Pós-graduação Lato Sensu, Engenharia de Software',
      period: 'mai 2024 — jun 2025',
    },
    {
      school: 'UDF Centro Universitário',
      course:
        'Curso Superior de Tecnologia (CST), Análise e Desenvolvimento de Sistemas',
      period: 'jan 2022 — abr 2024',
    },
    {
      school: 'Rocketseat',
      course: 'Formação Profissional em ReactJS (Programa Ignite)',
      period: '2023 — 2024',
    },
  ],
  en: [
    {
      school: 'Universidade Católica de Brasília',
      course: 'Postgraduate degree (Lato Sensu), Software Engineering',
      period: 'May 2024 — Jun 2025',
    },
    {
      school: 'UDF Centro Universitário',
      course: 'Associate degree (CST), Systems Analysis and Development',
      period: 'Jan 2022 — Apr 2024',
    },
    {
      school: 'Rocketseat',
      course: 'Professional ReactJS program (Ignite)',
      period: '2023 — 2024',
    },
  ],
};
