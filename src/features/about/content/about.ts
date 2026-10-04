import type { AboutContent } from '@/features/about/utils/about';
import type { Localized } from '@/utils/locale';

/** Text of the about file, from the CV. */
export const aboutContent: Localized<AboutContent> = {
  pt: {
    lead: 'Construo soluções escaláveis e acessíveis para plataformas críticas e de governo.',
    paragraphs: [
      'Engenheiro de Software Sênior e desenvolvedor front-end com 8 anos de experiência e background full stack em PHP, Laravel e SQL. Tenho sólida experiência com React, Next.js e TypeScript, além de arquitetura de microfrontends, integração segura de APIs por meio de gateways como o Apigee e fluxos complexos de autenticação e autorização com Keycloak, incluindo controle de acesso baseado em papéis (RBAC).',
      'Como Web Accessibility Specialist certificado pela Wix, aplico os padrões WCAG e WAI-ARIA em acessibilidade digital, entregando sites de governo com ótimas pontuações no Lighthouse em performance e acessibilidade.',
      'Uma das conquistas de que mais me orgulho foi liderar o discovery e a implementação dos primeiros microfrontends da empresa com Module Federation, viabilizando deploys independentes e mais autonomia para os times.',
      'Atualmente, estou aprofundando meus conhecimentos em IA e DevOps, enquanto sigo me especializando em front-end e novas tecnologias.',
    ],
    facts: [
      { key: 'experiência', value: '8 anos' },
      { key: 'base', value: 'Brasil' },
      {
        key: 'idiomas',
        value: 'Português (nativo) · Inglês (profissional completo)',
      },
      { key: 'foco atual', value: 'IA e DevOps' },
    ],
  },
  en: {
    lead: 'I build scalable, accessible software for critical and government platforms.',
    paragraphs: [
      'Senior Software Engineer and front-end developer with 8 years of experience and a full stack background in PHP, Laravel and SQL. I work with React, Next.js and TypeScript, microfrontend architecture, secure API integration through gateways like Apigee, and complex authentication and authorization flows with Keycloak, including role-based access control (RBAC).',
      'As a Web Accessibility Specialist certified by Wix, I apply WCAG and WAI-ARIA standards, delivering government websites with strong Lighthouse scores for performance and accessibility.',
      'One of the achievements I am proudest of is leading the discovery and rollout of the company’s first microfrontends with Module Federation, enabling independent deploys and more autonomy for teams.',
      'I am currently deepening my knowledge of AI and DevOps while continuing to specialize in front-end and new technologies.',
    ],
    facts: [
      { key: 'experience', value: '8 years' },
      { key: 'based in', value: 'Brazil' },
      {
        key: 'languages',
        value: 'Portuguese (native) · English (full professional)',
      },
      { key: 'learning', value: 'AI and DevOps' },
    ],
  },
};
