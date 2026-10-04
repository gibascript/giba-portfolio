# Arquitetura

Portfólio de Gilberto Alves, implementado a partir do protótipo **"Portfolio A -
Workbench"** do Claude Design. O site imita um editor de código: um hero em tela
cheia que, ao rolar, dá lugar a um workbench com explorer, abas, editor, paleta
de comandos e barra de status. Cada seção do portfólio é um "arquivo".

> Este documento descreve o que existe no código e o roteiro das próximas
> etapas. Itens marcados como _planejado_ ainda não foram implementados.

## Composição da tela

```mermaid
flowchart TD
  App["app.tsx"] --> Locale["LocaleProvider (pt-BR | en)"]
  Locale --> Workbench["WorkbenchProvider (arquivo ativo, abas, clipboard)"]
  Workbench --> Hero["features/hero"]
  Workbench --> Shell["features/workbench (barra de título, explorer, abas, editor)"]
  Workbench --> Palette["features/command-palette"]
  Workbench --> Status["features/app-status (barra de status)"]
  Shell --> Files["about · experience · projects · certifications · stack · education · testimonials · contact"]
```

O workbench não importa as features das seções: recebe do `app.tsx` a prop
`files`, um `Record<WorkbenchFileId, ComponentType>`, mantendo a regra de que
uma feature nunca importa outra. O tipo exige as 8 seções.

### Workbench (`features/workbench`)

```
┌ header: ☰ (só < md) · gilberto-alves. · arquivo — portfolio · Baixar currículo ┐
├ nav explorer (260px) ┬ abas (Arquivos abertos) ─────────────────────────────┤
│ PORTFOLIO            │ portfolio › arquivo                                 │
│   arquivos…          ├ main ──────────────────────────────────────────────┤
│ LINKS                │ 1  │ seção do arquivo ativo (até 980px)            │
│   GitHub ↗           │ 2  │ …                                             │
│   LinkedIn ↗         │ …  │ [ ← anterior            próximo → ]           │
│   Baixar currículo ↓ │    │                                               │
└──────────────────────┴────┴───────────────────────────────────────────────┘
```

- Abaixo de `md` (860px) o explorer vira gaveta sobre o editor, aberta pelo ☰
  (`aria-expanded`/`aria-controls`). Abrir qualquer arquivo fecha a gaveta.
- O editor é remontado por arquivo (`key`), então cada arquivo abre no topo e
  com o fade de entrada.
- A numeração de linhas acompanha a altura do conteúdo (`ResizeObserver`, uma
  linha a cada 20px, no mínimo 40) e é `aria-hidden`.
- Fechar a aba ativa ativa a última aba restante; fechar a última reabre
  `sobre.md`.

### Barra de status (`features/app-status`)

Esquerda: arquivo ativo e um `role="status"` com "Pronto" ou "✓ E-mail
copiado" (o feedback do clipboard do contexto, venha a cópia de onde vier).
Direita: "Brasil ·" (só a partir de `md`), a hora de Brasília (`HH:mm:ss`,
atualizada a cada segundo) e o botão `PT-BR | EN`.

### Estágios

```
 hero ──(rolar, Enter, "Abrir workbench")──▶ workbench
   ▲                                             │
   └────────(Esc, "Início", logo, rolar ↑)───────┘
```

A transição acompanha a rolagem (roda do mouse e toque): o progresso vai de 0 a
1 com suavização e encaixa no estágio mais próximo (limiar de 35%). Com
`prefers-reduced-motion`, a troca é imediata.

## Estado compartilhado

| Contexto (`src/context/`) | Responsabilidade | Status |
| --- | --- | --- |
| `locale/` | idioma ativo (`pt` padrão, `en`), persistência em `localStorage` (`gb-portfolio-lang`), `<html lang>`, `toggleLocale` | implementado |
| `workbench/` | arquivo ativo e abas (`openFile`, `closeTab`, `stepFile`), clipboard compartilhado | implementado |
| `workbench/` (próximas etapas) | estágio hero ↔ workbench, paleta aberta | planejado |

O arquivo ativo é sincronizado com o hash da URL pelo `id` do arquivo, que não
muda com o idioma (`#/projects`, `#/contact`), permitindo link direto e o botão
voltar do navegador.

### Infraestrutura compartilhada

| Onde | O quê |
| --- | --- |
| `constants/workbench-files.ts` | os 8 arquivos por `id` (ícone, nome e título por idioma) e a ordem deles (`workbenchFileIds`) |
| `constants/links.ts` | e-mail, GitHub, LinkedIn e o CV (`src/assets/gilberto-alves-cv.pdf`) |
| `constants/ui-text.ts` | rótulos usados por 2+ features (Explorer, Seções, Links, Comandos, Baixar currículo, Copiar e-mail, E-mail copiado) |
| `constants/storage-keys.ts`, `media-queries.ts`, `durations.ts` | chaves de `localStorage`, consultas de mídia (`wide` = 860px, reduced motion), duração do feedback de cópia |
| `hooks/use-media-query` | segue uma media query (`useSyncExternalStore`) |
| `hooks/use-local-storage` | preferência em JSON; valor inválido ou storage bloqueado não quebram |
| `hooks/use-clipboard` | copia e marca `copied` por 2,2 s; cópia recusada não é anunciada |
| `utils/locale` | `Locale`, `Localized<T>`, `isLocale`, `htmlLangs` |
| `utils/cyclic-step` | passo circular para arquivo anterior/próximo |
| `utils/open-files` | regras puras de abrir arquivo e fechar aba |

## Design tokens

Os tokens vêm do **giba-ds** (tema Back to Black + ayu) e ficam em
`src/styles/`:

```
global.css ─┬─ tailwindcss
            ├─ fonts.css    Iosevka (woff2, subset latino, ~220 KB no total)
            ├─ tokens.css   paleta crua: --gray-*, --ink-*, --syn-*, --ayu-*
            ├─ theme.css    @theme: tokens semânticos do Tailwind
            └─ base.css     padrões de elementos (foco, links, scrollbar, reduced motion)
```

Princípios do giba-ds aplicados no tema:

- **Fundo preto puro**; contraste vem da opacidade do branco, não do matiz:
  `text-strong` (100%), `text-body` (62%), `text-muted` (44%), `text-faint`
  (23%), `text-ghost` (8%).
- **Cor só como sintaxe esmaecida** (`text-syn-keyword`, `text-syn-tag`…) e um
  único acento dourado (`bg-accent`, `text-accent`).
- **Bordas em vez de sombras**: `border-subtle`, `border-default`,
  `border-strong`; sombras só em sobreposições (`shadow-popup`, `shadow-lift`).
- **Tipografia**: Iosevka para display e código; sans do sistema para a
  interface. Escala de UI 10/11/12/13/18px (`text-xs` … `text-xl`), prosa
  14/15px (`text-prose`, `text-prose-lg`) e títulos fluidos
  (`text-display-xs` … `text-display-hero`), cada um com sua altura de linha e
  tracking.
- **Medidas do editor**: `h-title-bar` (38px), `h-tab-bar` (36px),
  `h-status-bar` (24px), `w-sidebar` (260px), `w-gutter` (64px, numeração de
  linhas).
- **Movimento** curto e ease-out: `animate-reveal` (200ms), `animate-blink`
  (cursor do hero).

As escalas padrão do Tailwind substituídas são zeradas, então classes fora do
design system (`bg-red-500`, `text-base`) não geram CSS.

## Componentes globais

Ficam em `src/components/`, um por pasta, todos com teste. Os do giba-ds foram
reescritos com Tailwind e HTML semântico (o protótipo usava `div` clicável e
estado de hover em JavaScript).

| Componente | Partes | Uso |
| --- | --- | --- |
| `Button` | — | `primary`, `secondary`, `ghost`; `md`, `sm`; `as="a"` para links |
| `Kbd` | — | teclas: `⌘`, `K`, `esc`, `[`, `]` |
| `FileIcon` | — | ícones de tipo de arquivo (`markdown`, `typescript`, `react`, `json`, `yaml`, `shell`, `folder-open`), decorativos |
| `ListItem` | — | linhas do explorer: `icon`, `nested`, `chevron`; selecionada via `aria-current="page"` |
| `Tabs` | `Tab`, `TabTrigger`, `TabClose` | abas de arquivos abertos (`icon` no `TabTrigger`); fechar e selecionar são botões separados |
| `StatusBar` | `StatusBarGroup`, `StatusBarItem`, `StatusBarButton` | rodapé (`contentinfo`) com textos e ações |
| `Code` | `CodeToken` | linhas de código em Iosevka; `CodeToken` colore por `kind` (`comment`, `keyword`, `function`, `property`, `string`, `punctuation`) |
| `Section` | `SectionTitle` | cada arquivo do portfólio; a seção é rotulada pelo título automaticamente |
| `Timeline` | `TimelineItem`, `TimelinePeriod`, `TimelineBody`, `TimelineTitle` | experiência e formação |
| `Overline` | — | rótulo de painel em caixa alta, 10px ("EXPLORER", "LINKS"); polimórfico (`as="h2"`) |

`Button`, `ListItem`, `Code` e `Overline` são polimórficos (`as`), tipados por
`GenericTag` (`src/utils/generic-tag`). O `EmptyState` do giba-ds ficou de
fora: o único uso no protótipo era em depoimentos, que agora tem um depoimento mock.

## Seções

Cada arquivo do workbench é uma feature com `content/` tipado por idioma,
tipos em `utils/<tema>/<tema>.types.ts` e o visual de "código" do protótipo.
Todas usam `Section` + `SectionTitle`, então cada uma é uma região nomeada pelo
título; as linhas de código decorativas (`export const experience = [`) são
`aria-hidden`.

| Feature | Arquivo | Forma |
| --- | --- | --- |
| `about` | `sobre.md` | frase de abertura como título, parágrafos e fatos em `dl` |
| `experience` | `experiencia.ts` | `Timeline` de empregos, com selo "Atual" no atual |
| `projects` | `projetos.tsx` | grade `grid-cols-cards` de `ProjectCard` numerados |
| `certifications` | `certificacoes.json` | lista `"name"`/`"issuer"`; nomes iguais nos dois idiomas |
| `stack` | `stack.yaml` | grade `grid-cols-stack` de grupos (`h3`) e itens |
| `education` | `formacao.md` | `Timeline` de cursos |
| `testimonials` | `depoimentos.md` | citação (`figure`/`blockquote`); **conteúdo mock** em `content/testimonials.ts`, a substituir pelas recomendações reais |
| `contact` | `contato.sh` | `ContactRow`s: `$ mail` copia o e-mail, `$ open` abre LinkedIn/GitHub em nova aba, `$ curl -O` baixa o CV |

## Idiomas

Todo texto de produto existe em pt-BR (padrão) e inglês. O conteúdo de cada
feature fica em `content/` como `Record<Locale, T>`; uma tradução faltando
quebra o `tsc`.

## Teclado e acessibilidade

| Atalho | Ação | Onde |
| --- | --- | --- |
| `⌘K` / `Ctrl K` | abre e fecha a paleta de comandos | sempre |
| `Enter` | abre o workbench | hero |
| `1`–`8` | abre o arquivo correspondente | hero e workbench |
| `[` / `]` | arquivo anterior / próximo | workbench |
| `Esc` | volta ao hero (ou fecha a paleta) | workbench |
| `L` | alterna o idioma | sempre |

Os atalhos de uma tecla só podem ser desativados pela paleta ("Desativar
atalhos"), com a escolha salva em `localStorage`, atendendo ao critério WCAG
2.1.4. A paleta segue o padrão combobox (`aria-activedescendant`) e prende o
foco; ao trocar de estágio, o foco vai para o estágio visível.

## Roteiro

| # | Etapa | Status |
| --- | --- | --- |
| 1 | Fundação: Tailwind + tokens, fontes, `cn`, alias `@/`, Vitest | concluída |
| 2 | Componentes globais: `Button`, `Kbd`, `FileIcon`, `ListItem`, `Tabs`, `StatusBar`, `Code`, `Section`, `Timeline` | concluída |
| 3 | Infraestrutura: contexto de idioma, tipos de conteúdo, `constants/`, hooks globais | concluída |
| 4 | Shell do workbench: navegação, barra de título, explorer, abas, trilha, numeração de linhas, paginação, barra de status | concluída |
| 5 | Seções (depoimentos com um mock por enquanto) e composição no `app.tsx` | concluída |
| 6 | Hero e transição por rolagem (o logo e o arquivo da barra de status passam a voltar ao hero) | pendente |
| 7 | Paleta de comandos | pendente |
| 8 | Atalhos globais, hash da URL e acabamento (a11y, SEO, Lighthouse) | pendente |
| 9 | Deploy | a definir |

## Referência do protótipo

O pacote exportado do Claude Design fica em `developer-portfolio-design/`
(ignorado pelo git). O arquivo principal é
`project/Portfolio A - Workbench.dc.html`; o conteúdo bilíngue está em
`project/portfolio-content.js` e o design system em `project/_ds/`.
