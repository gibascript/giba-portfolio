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
  (`babel-plugin-react-compiler`), TypeScript 6, ESLint 10 flat config.
- **Package manager:** Bun (`bun.lock`). Do not use npm, pnpm or yarn.
- **Language:** UI text is pt-BR. Code, comments, JSDoc and test descriptions
  are in English (see [Language](#language)).
- `README.md` is still the Vite template; do not trust it as project docs.

## Development Commands

```bash
bun install
bun run dev       # vite dev server
bun run build     # tsc -b && vite build (typechecks)
bun run lint      # eslint .
bun run preview   # serves dist/
```

### Definition of done

`bun run lint` and `bun run build` must both pass. When a test runner or a
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
  main.tsx                  # entry: mounts <App />
  app.tsx                   # composes the page sections, nothing else
  features/<feature>/       # one folder per page section (hero, about, projects, contact…)
  components/               # shared UI used by 2+ features
  hooks/                    # hooks with no feature (use-media-query, use-scroll-spy…)
  utils/<topic>/            # pure helpers shared by 2+ features
  constants/                # app-wide constants (links, breakpoints)
  assets/                   # images, svgs
```

A feature is self-contained and mirrors the same layout inside its folder:

```
features/projects/
  projects.tsx              # screen root of the section, default export `Projects`
  components/<group>/<component>/
  hooks/use-*/
  utils/<topic>/
  constants/                # pt-BR text and data used by 2+ files of the feature
  content/                  # static data (project list, experiences), typed
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

- Files: `<feature>-context.ts`, `<feature>-provider.tsx` and
  `use-<feature>-context.ts`, which throws outside the provider.
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

## Code Conventions

### Naming & imports

- Files and folders are kebab-case; components PascalCase; hooks `useX`.
- Each `use-*` hook lives in its own folder (`use-x/use-x.ts` + `index.ts`).
- Omit `.ts`/`.tsx` extensions in imports.
- Import by **deep path**; barrels exist only as a component's or a hook's own
  `index.ts`. Groups and features have no root barrel.
- No `console.*` left in committed code.

### Components

- One folder per component, in kebab-case: `<name>/` with:
  - `<name>.tsx`;
  - `index.ts`, containing only `export * from './<name>';`;
  - `<name>.test.tsx`, once a test runner exists.
- Feature components live in `components/<group>/<component>/`, two levels at
  most, never loose at the root of `components/`.
- **Compound parts:** one root plus named, exported subparts
  (`Card`/`CardHeader`/`CardTitle`). Each part is its own function.
- Each part forwards native props through `ComponentProps<'tag'>` and merges
  `className` instead of overriding it.
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

- `utils/<topic>/` holds pure rules and types in four files: `<topic>.ts`,
  `<topic>.types.ts`, `<topic>.test.ts` and `index.ts`.
- **Pitfall:** a file and a folder with the same name under `utils/` make Vite
  resolve the file, and `tsc` does not catch it.
- `constants/` holds pt-BR text used by more than one file, durations and
  breakpoints.

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
**English**. pt-BR is kept only for product text: UI strings, labels, `alt`
texts and the mocks that reproduce them. When a test description quotes a
screen label, the label stays in pt-BR, in quotes, e.g.
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

There is no test runner yet. When one is added (Vitest + Testing Library is the
default choice for Vite):

- tests sit next to their source as `*.test.ts(x)`;
- pure `utils/` get unit tests first; components are tested through what the
  user sees (roles, labels), not implementation details;
- add the test command to the [definition of done](#definition-of-done).

## Important Files

| File                                    | Why                                                |
| --------------------------------------- | -------------------------------------------------- |
| `vite.config.ts`                        | React plugin + React Compiler via Babel preset     |
| `eslint.config.js`                      | ESLint flat config (TS, react-hooks, react-refresh) |
| `tsconfig.app.json`                     | Strict-ish app TS config (`noUnused*`, bundler)    |
| `CLAUDE.md`                             | Points to this file; edit `AGENTS.md`, not it      |
