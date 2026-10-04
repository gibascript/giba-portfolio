# Portfólio

Portfólio pessoal de **Gilberto Alves**, Engenheiro de Software Sênior
(front-end e full stack, microfrontends, design systems e acessibilidade
digital).

O site imita um editor de código. Ele abre num **hero** em tela cheia, com o
nome, os papéis digitados um após o outro e um explorer de arquivos. Ao rolar,
o hero dá lugar a um **workbench** no estilo VS Code, com explorer, abas,
editor com numeração de linhas, paleta de comandos e barra de status. Cada
seção do portfólio é um "arquivo" com a cara do seu tipo (`.md`, `.ts`,
`.tsx`, `.json`, `.yaml`, `.sh`).

É uma single-page app só no cliente, sem backend, em **pt-BR** (padrão) e
**inglês**.

## Seções

| #   | Arquivo              | Seção         | Conteúdo                                                                              |
| --- | -------------------- | ------------- | ------------------------------------------------------------------------------------- |
| 1   | `sobre.md`           | Sobre         | frase de abertura, parágrafos e fatos rápidos                                         |
| 2   | `experiencia.ts`     | Experiência   | linha do tempo dos empregos, com selo "Atual"                                         |
| 3   | `projetos.tsx`       | Projetos      | grade de cards numerados, com tecnologias                                             |
| 4   | `certificacoes.json` | Certificações | lista no formato de um array JSON                                                     |
| 5   | `stack.yaml`         | Stack         | tecnologias agrupadas (front-end, back-end, qualidade…)                               |
| 6   | `formacao.md`        | Formação      | linha do tempo dos cursos                                                             |
| 7   | `depoimentos.md`     | Depoimentos   | recomendações (por enquanto, um depoimento de exemplo)                                |
| 8   | `contato.sh`         | Contato       | `$ mail` copia o e-mail, `$ open` abre LinkedIn/GitHub, `$ curl -O` baixa o currículo |

## Funcionalidades

- **Transição por rolagem:** a roda do mouse ou o toque levam do hero ao
  workbench e de volta, e a transição para onde a rolagem parar. Também dá para
  entrar pelo botão "Abrir workbench" ou pelo explorer do hero.
- **Workbench:** explorer com os 8 arquivos e links (GitHub, LinkedIn,
  currículo), abas que podem ser fechadas, trilha `portfolio › arquivo` e
  paginação anterior/próximo. Abaixo de 860px, o explorer vira uma gaveta.
- **Paleta de comandos** (`⌘K` / `Ctrl K`): busca que ignora acentos e
  maiúsculas e reúne seções, ações (trocar idioma, copiar e-mail, baixar o
  currículo, voltar ao início, ligar/desligar atalhos) e links.
- **Barra de status:** arquivo aberto, avisos ("✓ E-mail copiado"), hora de
  Brasília e o botão `PT-BR | EN`.
- **URL:** cada arquivo tem um hash (`#/projects`, `#/contact`…). Isso permite
  link direto para uma seção e faz o voltar/avançar do navegador funcionar.
- **Bilíngue:** a escolha de idioma fica salva no navegador e atualiza o
  `<html lang>`.

### Atalhos de teclado

| Atalho          | Ação                              | Onde             |
| --------------- | --------------------------------- | ---------------- |
| `⌘K` / `Ctrl K` | abre e fecha a paleta de comandos | sempre           |
| `Enter`         | abre o workbench                  | hero             |
| `1`–`8`         | abre o arquivo correspondente     | hero e workbench |
| `[` / `]`       | arquivo anterior / próximo        | workbench        |
| `Esc`           | volta ao hero (ou fecha a paleta) | workbench        |
| `L`             | alterna o idioma                  | sempre           |

Os atalhos de uma tecla podem ser desligados pela paleta (WCAG 2.1.4), e a
escolha fica salva no navegador.

### Acessibilidade

- HTML semântico, foco visível, rótulos em todos os botões e links, e
  `aria-keyshortcuts` nos controles que têm atalho.
- A paleta segue o padrão combobox do ARIA e prende o foco. Ao trocar entre
  hero e workbench, o foco vai para a tela visível, e a outra fica `inert`.
- Elementos decorativos ("código", numeração de linhas) ficam escondidos dos
  leitores de tela.
- Com `prefers-reduced-motion`, a transição vira um corte direto e o texto
  digitado aparece inteiro.
- Lighthouse (desktop, build de produção): 100 em performance, boas práticas e
  SEO, e 96 em acessibilidade.

## Tecnologias

| Área                   | Ferramenta                                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Build e dev server     | [Vite 8](https://vite.dev)                                                                                                         |
| UI                     | [React 19](https://react.dev) com o [React Compiler](https://react.dev/learn/react-compiler)                                       |
| Linguagem              | [TypeScript 6](https://www.typescriptlang.org)                                                                                     |
| Estilo                 | [Tailwind CSS 4](https://tailwindcss.com) sobre os tokens do **giba-ds** (tema Back to Black + ayu), com `clsx` + `tailwind-merge` |
| Fonte                  | [Iosevka](https://typeof.net/Iosevka/) (woff2, subset latino)                                                                      |
| Testes                 | [Vitest 5](https://vitest.dev) + [Testing Library](https://testing-library.com) + jsdom                                            |
| Lint                   | [ESLint 10](https://eslint.org) (flat config, `typescript-eslint`, `react-hooks`)                                                  |
| Gerenciador de pacotes | [Bun](https://bun.sh)                                                                                                              |

Não há bibliotecas de estado global, de animação nem de ícones: o estado
compartilhado usa contextos do React, as animações são CSS e os ícones de tipo
de arquivo são assets próprios.

## Como rodar

Pré-requisito: [Bun](https://bun.sh).

```bash
bun install
bun run dev         # servidor de desenvolvimento
bun run build       # typecheck (tsc -b) + build de produção em dist/
bun run preview     # serve o dist/
bun run lint        # ESLint
bun run test        # Vitest (uma vez)
bun run test:watch  # Vitest em modo watch
```

Uma mudança só está pronta quando `bun run lint`, `bun run test` e
`bun run build` passam.

## Estrutura

```
src/
  main.tsx            # entrada: monta o <App />
  app.tsx             # compõe providers, hero, workbench, barra de status e paleta
  features/           # uma pasta por seção ou parte da tela
    hero/  stage/  workbench/  app-status/  command-palette/
    about/  experience/  projects/  certifications/
    stack/  education/  testimonials/  contact/
  context/            # locale (idioma) e workbench (arquivos, estágio, paleta, atalhos)
  components/         # UI compartilhada: Button, Kbd, Tabs, ListItem, Code, Section, Timeline…
  hooks/              # use-media-query, use-local-storage, use-clipboard
  utils/              # funções puras: cn, locale, open-files, cyclic-step, platform
  constants/          # arquivos do workbench, links, textos de interface, atalhos
  styles/             # fontes, paleta crua, tokens do @theme, base e utilitários
  assets/             # fontes, ícones e o currículo em PDF
  test/               # setup do Vitest e helpers de teste
```

Cada feature é autocontida (`components/`, `hooks/`, `utils/`, `constants/`,
`content/`) e nunca importa outra. O conteúdo de cada seção fica tipado em
`content/`, nos dois idiomas, e uma tradução faltando quebra o `tsc`. Os testes
ficam ao lado do código, como `*.test.ts(x)`.

## Documentação

- [`docs/arquitetura.md`](docs/arquitetura.md): composição da tela, estado
  compartilhado, transição entre hero e workbench, design tokens, idiomas,
  teclado e acessibilidade, e o roteiro de implementação.
- [`AGENTS.md`](AGENTS.md): convenções do projeto (estrutura, componentes,
  nomes, limites de complexidade, comentários, testes e commits).

O design partiu de um protótipo feito no Claude Design ("Portfolio A -
Workbench").

## Contato

- E-mail: [alvesgilberto84@gmail.com](mailto:alvesgilberto84@gmail.com)
- GitHub: [github.com/gibascript](https://github.com/gibascript)
- LinkedIn: [linkedin.com/in/gilberto-developer](https://www.linkedin.com/in/gilberto-developer)
