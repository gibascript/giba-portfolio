# Repository Guidelines

## Communication & Commits

- Talk to the user in **pt-BR**.
- **Never commit on your own.** Do not run `git commit` (or `git push`,
  `--amend`, rebase or anything else that writes history). When the work is
  done and the [gate](#definition-of-done) is green, **suggest** the commit:
  the message and the files it should include. The user reviews and commits.
  Only run `git commit` when the user explicitly asks for it in the current
  conversation.
- Suggested messages: Conventional Commits in English, third person present
  tense, e.g. `feat(projects): adds the project card grid`,
  `refactor(hero): moves the typing effect to its own hook`.
- **Never add `Co-Authored-By`** or any other AI attribution to a commit
  message, suggested or not.

## Project Overview

Personal portfolio of Gilberto. Single-page app, client-only, no backend.

- **Stack:** Vite 8, React 19 with the React Compiler
  (`babel-plugin-react-compiler`), TypeScript 6, ESLint 10 flat config,
  Tailwind CSS 4 over the giba-ds tokens (see [Styling](#styling)), Vitest 5 +
  Testing Library.
- **Package manager:** Bun (`bun.lock`). Do not use npm, pnpm or yarn.
- **Language:** product text is bilingual, pt-BR (default) and English. Code,
  comments, JSDoc and test descriptions are in English (see
  [Language](#language)).
- **Design:** the "Workbench" prototype from Claude Design (an editor-like
  shell: hero, explorer, tabs, command palette, status bar). Architecture and
  roadmap: [`docs/arquitetura.md`](docs/arquitetura.md).

## Development Commands

```bash
bun install
bun run dev          # vite dev server
bun run build        # tsc -b && vite build (typechecks)
bun run lint         # eslint .
bun run test         # vitest run
bun run test:watch   # vitest in watch mode
bun run preview      # serves dist/
```

### Definition of done

`bun run lint`, `bun run test` and `bun run build` must all pass. When a
formatter is added, add it to this gate and to this section in the same change.

## Documentation (`docs/`)

When the project grows past what fits in this file, architecture docs go in
`docs/`, in pt-BR, with mermaid or ASCII diagrams, and each gets a row in
`docs/README.md`.

- The code is the source of truth. When a change alters what a doc (or this
  file) describes, update it **in the same change**.

## Architecture

### Directory layout

```
src/
  main.tsx                  # entry: mounts <App />, imports the global styles
  app.tsx                   # composes the providers and the features, nothing else
  features/<feature>/       # one folder per screen part or workbench file (hero, about, contact…)
  components/               # shared UI used by 2+ features
  context/<name>/           # app-wide state read by 2+ features (locale, workbench)
  hooks/                    # hooks with no feature (use-media-query, use-hotkeys…)
  utils/<topic>/            # pure helpers shared by 2+ features
  constants/                # app-wide constants (links, breakpoints, workbench files)
  styles/                   # global.css entry, fonts, raw palette, Tailwind theme, base
  assets/                   # fonts, icons, the CV
  test/                     # Vitest setup, test doubles (matchMedia, <dialog>) and renderWithProviders
```

A feature is self-contained and mirrors the same layout inside its folder:

```
features/projects/
  projects.tsx              # screen root of the section, default export `Projects`
  components/<group>/<component>/
  hooks/use-*/
  utils/<topic>/
  constants/                # product text and data used by 2+ files of the feature
  content/                  # static data (projects, experiences), typed, per locale
  services/<op>/            # only if the feature calls an external API
```

Move code up to `src/components/`, `src/hooks/` or `src/utils/` only when a
second feature needs it. Never import from another feature's folder.

### Layering

Dependencies only point downward. Skipping a layer is fine; importing upward is
not:

- `components → context → hooks → utils`;
- `services → utils`.

Where each type is defined:

- wire contracts (external API): `services/<op>/schema.ts`;
- domain shapes (e.g. `Project`): `utils/<topic>/<topic>.types.ts`;
- the return contract of a hook: in the hook itself.

**Components never import types from `hooks/`.**

### Context

Create a feature `context/` only when props would pass through more than 2
levels, or when the same state is instantiated in two branches of the tree.
State that 2+ features read goes to `src/context/<name>/`, with the same files
and rules.

- Files: `<name>-context.ts`, `<name>-provider.tsx` and
  `use-<name>-context.ts`, which throws outside the provider.
- The provider composes hooks and runs the feature effects.
- **Only orchestrators read the context**; every other component gets props.
- Read it through a parent variable, without destructuring:
  `const projects = useProjectsContext(); projects.filter.active`. No member
  repeats the variable name.
- There is no global store. Use local state, then context; add a library only
  with a concrete need and the user's approval.

### External data (only if needed)

If a feature calls an external API (e.g. GitHub), use one
`services/<op>/` folder per operation:

- `schema.ts`: runtime schema of the args/response and the inferred types;
- `api.ts`: the fetch call, parsing the response with the schema;
- `mock.ts`: fixtures for tests.

Keep the I/O in `api.ts` and the rules in `utils/`. Handle failures where the
data is consumed: show a fallback, never a blank section.

## Styling

Tailwind CSS 4, configured in CSS. `src/styles/global.css` imports, in order:

- `fonts.css`: Iosevka (woff2, Latin subset), the mono and display face;
- `tokens.css`: the raw giba-ds palette (`--gray-*`, `--ink-*`, `--syn-*`);
- `theme.css`: the semantic tokens as `@theme` variables;
- `base.css`: element defaults (focus ring, links, scrollbars, reduced motion);
- `utilities.css`: custom `@utility` classes that need values a token cannot
  express, such as the stage transition driven by `--stage-progress`.

Rules:

- `theme.css` resets every default scale it replaces (`--color-*: initial`,
  `--text-*: initial`…), so only giba-ds tokens exist: `bg-red-500` or
  `text-base` do not compile to anything.
- Colors are split by role: `bg-surface-*`, `text-strong|body|muted|faint`,
  `text-syn-*`, `border-subtle|default|strong`.
- **No arbitrary values** (`w-[13px]`, `text-[#fff]`). A missing value becomes a
  token in `theme.css` first. A token with a custom name also goes into the
  `extendTailwindMerge` config of `src/utils/cn/cn.ts`, or `cn` will drop it
  when merging.
- Merge classes with `cn` (`@/utils/cn`), never with string concatenation.

## Code Conventions

### Naming & imports

- Files and folders are kebab-case; components PascalCase; hooks `useX`.
- Each `use-*` hook lives in its own folder (`use-x/use-x.ts` + `index.ts`).
- Omit `.ts`/`.tsx` extensions in imports. Import across folders with the `@/`
  alias (`@/utils/cn`); use `./` only inside the same component or hook folder.
- Import by **deep path**; barrels exist only as a component's or a hook's own
  `index.ts`. Groups and features have no root barrel.
- Single quotes, semicolons, trailing commas, 2-space indent.
- No `console.*` left in committed code.

### Components

- One folder per component, in kebab-case: `<name>/` with:
  - `<name>.tsx`;
  - `index.ts`, containing only `export * from './<name>';`;
  - `<name>.test.tsx`.
- Feature components live in `components/<group>/<component>/`, two levels at
  most, never loose at the root of `components/`.
- **Compound parts:** one root plus named, exported subparts
  (`Card`/`CardHeader`/`CardTitle`). Each part is its own function.
- Each part forwards native props through `ComponentProps<'tag'>` and merges
  `className` instead of overriding it.
- A component that may render another tag takes `as`, typed with
  `GenericTag<T>` (`@/utils/generic-tag`), e.g. `<Button as="a" href…>`.
- Variant and size class maps live in a sibling `<name>-variants.ts`, never
  loose in the `.tsx`.
- Style state from the semantic attribute that carries it
  (`aria-[current=page]:`, `data-active:`, `disabled:`), not from a parallel
  boolean class switch, when the attribute already exists.
- Icons are passed as a prop (`icon={GithubIcon}`), not as `children`.
- Use design tokens (CSS variables or the styling system's theme), never
  hardcoded colors or spacing scattered in components.
- Accessibility is part of done: semantic HTML (`header`, `nav`, `main`,
  `section`, `footer`), `alt` on every image, visible focus, labelled links and
  buttons, and `prefers-reduced-motion` respected by animations.

### One exported function per `.tsx`

- Each `.tsx` reads top to bottom as a **single exported function**. The top of
  the file holds only imports and the props `type`s.
- Constants, pure functions and type guards never stay loose in the `.tsx`.
  They go to a sibling `.ts`, to `utils/<topic>/` or `constants/`, or to a
  hook.
- Where a hook lives:

  | Used by                             | Location                   |
  | ----------------------------------- | -------------------------- |
  | one component                       | `<component>/hooks/use-*/` |
  | one hook                            | a folder inside that hook  |
  | several components, or the provider | the feature's `hooks/`     |
  | nothing feature-specific            | `src/hooks/`               |

- A JSX subcomponent that repeats, or has its own identity, gets its own
  folder. One used once stays inline in its parent's JSX.
- The React Compiler memoizes for you: do not add `useMemo`, `useCallback` or
  `memo` without a measured reason.

### `utils/<topic>/` and `constants/`

- `utils/<topic>/` holds pure rules and types in up to four files:
  `<topic>.ts`, `<topic>.types.ts` (only when the topic defines types),
  `<topic>.test.ts` and `index.ts`.
- **Pitfall:** a file and a folder with the same name under `utils/` make Vite
  resolve the file, and `tsc` does not catch it.
- `constants/` holds product text used by more than one file, durations and
  breakpoints.

### Locale

- Every product string exists in pt-BR and English. Content is typed once and
  stored as `Record<Locale, T>`, so a missing translation fails `tsc`.
- pt-BR is the default; the chosen locale persists in `localStorage` and sets
  `<html lang>`.

### Complexity limits

- Cyclomatic complexity ≤ 8.
- Functions ≤ 40 lines. Component JSX is exempt; the logic before the `return`
  is not, so move it to a hook when it grows.
- Nesting ≤ 3 levels; use guard clauses.
- At most 3 parameters; pass an options object beyond that.
- No nested ternaries; always use braces on `if`.
- One function, one responsibility. Keep business logic apart from I/O and from
  rendering.

### Language

Code, comments, JSDoc and test descriptions (`describe`/`it`) are in
**English**. pt-BR and English are kept only for product text: UI strings,
labels, `alt` texts and the mocks that reproduce them. When a test description
quotes a screen label, the label stays in the tested locale, in quotes, e.g.
`it('opens the repository when "Ver código" is clicked')`. Docs in `docs/` are
pt-BR.

### Comments and JSDoc

- JSDoc goes **only above a top-level declaration**: a type, function/hook,
  component or constant.
- **Never** put JSDoc on a type property (including `XProps`), a union member,
  an object-literal property or an inner function.
- Non-obvious member details become prose (or `@remarks`) in the doc above,
  with the member in backticks. Obvious members get no doc.
- **TSDoc syntax:** `@param name - Desc.` (no `{Type}`), `@returns`,
  `@typeParam`, `@throws`, `@remarks`; `@example` only on pure functions. Tag
  order: summary, `@remarks`, `@typeParam`, `@param`, `@returns`, `@throws`,
  `@example`, `@see`.
- Document only the non-obvious. UI text and barrels get no doc.
- `//` explains one statement. A `//` that describes the whole declaration
  becomes its JSDoc.
- Use the one-line form `/** Text. */` when it fits in 80 columns with no tags;
  wrap prose by hand at 80 columns.

## Testing

Vitest 5 with jsdom and Testing Library (`src/test/setup.ts` adds the jest-dom
matchers and cleans the DOM after each test).

- Tests sit next to their source as `*.test.ts(x)`.
- Pure `utils/` get unit tests first; components are tested through what the
  user sees (roles, labels), not implementation details.
- Import `describe`, `it` and `expect` from `vitest`; there are no globals.
- Render a feature that reads the app contexts with `renderWithProviders`
  (`@/test/render-with-providers`), choosing the `locale`. The setup clears
  `localStorage` after each test.

## Important Files

| File                                    | Why                                                |
| --------------------------------------- | -------------------------------------------------- |
| `vite.config.ts`                        | React + React Compiler, Tailwind, `@/` alias, Vitest |
| `src/styles/theme.css`                  | giba-ds tokens as the Tailwind theme               |
| `src/utils/cn/cn.ts`                    | Class merging, aware of the custom token names     |
| `eslint.config.js`                      | ESLint flat config (TS, react-hooks, react-refresh) |
| `tsconfig.app.json`                     | Strict-ish app TS config (`noUnused*`, bundler, `@/*`) |
| `docs/arquitetura.md`                   | Architecture, design tokens, implementation roadmap |
| `CLAUDE.md`                             | Points to this file; edit `AGENTS.md`, not it      |
