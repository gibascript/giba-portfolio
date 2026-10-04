import type { Project } from '@/features/projects/utils/projects';
import type { Localized } from '@/utils/locale';

/** Highlighted projects, in display order (numbered 01, 02…). */
export const projectsContent: Localized<Project[]> = {
  pt: [
    {
      name: 'Microfrontends com Module Federation',
      context: 'Valid · 2023 — 2026',
      description:
        'Discovery e implementação dos primeiros microfrontends da empresa: 4 MFEs entre 3 times, com deploys independentes e isolamento de código. O projeto base foi reaproveitado via fork por outros times.',
      tags: ['Module Federation', 'React', 'TypeScript'],
    },
    {
      name: 'Plataforma de interoperabilidade',
      context: 'Valid · Governo',
      description:
        'Plataforma que gera APIs a partir de uma base SQL, inspirada no modelo UXP da Estônia. Em produção e reutilizada por outros times e por clientes governamentais externos.',
      tags: ['SQL', 'APIs', 'Governo'],
    },
    {
      name: 'Design System entre times',
      context: 'Valid · com especialistas de UX',
      description:
        'Biblioteca de componentes unificada com design tokens globais em Tailwind CSS, hoje amplamente adotada na empresa.',
      tags: ['Tailwind CSS', 'Design Tokens', 'React'],
    },
    {
      name: 'Dashboard operacional em tempo real',
      context: 'Valid · Operações',
      description:
        'Dados do Zabbix exibidos em telas de clientes, em funcionamento contínuo no horário comercial, protegido com Keycloak e Apigee, sem back-end dedicado.',
      tags: ['Zabbix', 'Keycloak', 'Apigee'],
    },
  ],
  en: [
    {
      name: 'Microfrontends with Module Federation',
      context: 'Valid · 2023 — 2026',
      description:
        'Discovery and rollout of the company’s first microfrontends: 4 MFEs across 3 teams, with independent deploys and code isolation. Other teams later forked the base project for new initiatives.',
      tags: ['Module Federation', 'React', 'TypeScript'],
    },
    {
      name: 'Interoperability platform',
      context: 'Valid · Government',
      description:
        'A platform that generates APIs from a SQL database, inspired by Estonia’s UXP model. In production and reused by other teams and by external government clients.',
      tags: ['SQL', 'APIs', 'Government'],
    },
    {
      name: 'Cross-team Design System',
      context: 'Valid · with UX specialists',
      description:
        'A unified component library with global design tokens in Tailwind CSS, now widely adopted across the company.',
      tags: ['Tailwind CSS', 'Design Tokens', 'React'],
    },
    {
      name: 'Real-time operations dashboard',
      context: 'Valid · Operations',
      description:
        'Zabbix data on client screens, running continuously during business hours, secured with Keycloak and Apigee and no dedicated back-end.',
      tags: ['Zabbix', 'Keycloak', 'Apigee'],
    },
  ],
};
