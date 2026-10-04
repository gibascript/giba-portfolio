import type { Job } from '@/features/experience/utils/experience';
import type { Localized } from '@/utils/locale';

/** Jobs from the CV, latest first. */
export const experienceContent: Localized<Job[]> = {
  pt: [
    {
      company: 'Valid',
      role: 'Engenheiro de Software Sênior',
      period: 'abr 2026 — atual',
      current: true,
      summary:
        'Orquestro demandas paralelas entre múltiplos times e projetos, contribuindo com discussões arquiteturais e tomadas de decisão técnicas.',
      highlights: [
        'Liderei o discovery e a prova de conceito (POC) da primeira adoção do Payload CMS na empresa.',
        'Implementei um monorepo com Turborepo para uma squad com múltiplos projetos, reduzindo duplicação de código e infraestrutura desnecessária.',
        'Impulsionei a cobertura de testes com Jest, React Testing Library e Playwright, e promovi boas práticas de Sonar na empresa.',
        'Defino padrões de código e compartilho boas práticas com outros times, incluindo desenvolvimento assistido por IA.',
      ],
    },
    {
      company: 'Valid',
      role: 'Engenheiro de Software Pleno',
      period: 'out 2023 — mar 2026',
      summary:
        'Liderei de forma independente iniciativas web de ponta a ponta, do design arquitetural ao deploy, para sistemas de gestão operacional, dashboards avançados e plataformas de governo.',
      highlights: [
        'Liderei os primeiros microfrontends da empresa com Module Federation: 4 MFEs entre 3 times, com deploys independentes e isolamento de código.',
        'Conduzi uma iniciativa de Design System entre times, com design tokens globais em Tailwind CSS, hoje amplamente adotada na empresa.',
        'Implementei fluxos complexos de autenticação com Keycloak, incluindo RBAC dinâmico e client scopes, e integrações seguras via Apigee.',
        'Atuei como mentor de uma desenvolvedora júnior, que hoje contribui de forma autônoma na plataforma.',
      ],
    },
    {
      company: 'Valid',
      role: 'Engenheiro de Software Júnior',
      period: 'jun 2022 — set 2023',
      summary:
        'Liderei o desenvolvimento front-end em projetos-chave, conduzindo a criação, manutenção e evolução de interfaces.',
      highlights: [
        'Liderei a re-arquitetura da interface de um sistema de grande porte, reconstruindo um portal de assinatura digital junto ao time de UX.',
        'Desenvolvi interfaces responsivas seguindo os padrões WCAG e as especificações WAI-ARIA.',
        'Escrevi queries SQL avançadas, functions e otimizações em MySQL e PostgreSQL.',
      ],
    },
    {
      company: 'mazzatech',
      role: 'Engenheiro de Software Júnior',
      period: 'ago 2021 — mai 2022',
      summary:
        'Alocado na Valid, atuando em projetos de front-end e back-end para sistemas de certificação digital, assinatura eletrônica e registro de imóveis.',
      highlights: [
        'Desenvolvi interfaces web escaláveis e responsivas com HTML, CSS, Sass e JavaScript.',
        'Apoiei as primeiras iniciativas de adoção de React.js e Vue.js.',
        'Desenvolvi funcionalidades back-end com PHP e Laravel, aplicando Domain-Driven Design (DDD).',
      ],
    },
    {
      company: 'Freelancer',
      role: 'Desenvolvedor Web',
      period: 'jan 2018 — jan 2021',
      summary:
        'Entreguei sites, blogs e landing pages para clientes de topografia, estética e educação, do levantamento de requisitos ao lançamento.',
      highlights: [
        'Desenvolvi e customizei sites em WordPress e Wix, permitindo que os clientes gerenciassem o próprio conteúdo.',
        'Apliquei boas práticas de SEO e configurei domínios e hospedagem, incluindo o Registro.br.',
      ],
    },
  ],
  en: [
    {
      company: 'Valid',
      role: 'Senior Software Engineer',
      period: 'Apr 2026 — present',
      current: true,
      summary:
        'I coordinate parallel work across multiple teams and projects, contributing to architecture discussions and technical decisions.',
      highlights: [
        'Led the discovery and proof of concept for the company’s first adoption of Payload CMS.',
        'Set up a Turborepo monorepo for a squad with projects spread across many repositories, reducing duplicated code and infrastructure.',
        'Raised test coverage across whole projects with Jest, React Testing Library and Playwright, and promoted Sonar best practices company-wide.',
        'Define code standards and share good practices with other teams, including AI-assisted development.',
      ],
    },
    {
      company: 'Valid',
      role: 'Mid-level Software Engineer',
      period: 'Oct 2023 — Mar 2026',
      summary:
        'Independently led end-to-end web initiatives, from architecture to deploy, for operations management systems, advanced dashboards and government platforms.',
      highlights: [
        'Led the company’s first microfrontends with Module Federation: 4 MFEs across 3 teams, with independent deploys and code isolation.',
        'Drove a cross-team Design System with UX specialists, built on global design tokens in Tailwind CSS and now widely adopted.',
        'Implemented complex Keycloak authentication flows, including dynamic RBAC and client scopes, and secure API integrations via Apigee.',
        'Mentored a junior developer who now contributes to the platform on her own.',
      ],
    },
    {
      company: 'Valid',
      role: 'Junior Software Engineer',
      period: 'Jun 2022 — Sep 2023',
      summary:
        'Led front-end development on key projects, building, maintaining and evolving interfaces.',
      highlights: [
        'Led the UI re-architecture of a large system, rebuilding a digital signature portal with the UX team.',
        'Built responsive interfaces following WCAG standards and WAI-ARIA specifications.',
        'Wrote advanced SQL queries, functions and optimizations in MySQL and PostgreSQL.',
      ],
    },
    {
      company: 'mazzatech',
      role: 'Junior Software Engineer',
      period: 'Aug 2021 — May 2022',
      summary:
        'Placed at Valid, working on front-end and back-end for digital certification, e-signature and property registry systems.',
      highlights: [
        'Built scalable, responsive web interfaces with HTML, CSS, Sass and JavaScript.',
        'Supported the first initiatives to adopt React.js and Vue.js.',
        'Built back-end features with PHP and Laravel using Domain-Driven Design (DDD).',
      ],
    },
    {
      company: 'Freelance',
      role: 'Web Developer',
      period: 'Jan 2018 — Jan 2021',
      summary:
        'Delivered websites, blogs and landing pages for clients in surveying, aesthetics and education, from requirements to launch.',
      highlights: [
        'Built and customized WordPress and Wix sites so clients could manage their own content.',
        'Applied SEO best practices and set up domains and hosting, including Registro.br.',
      ],
    },
  ],
};
