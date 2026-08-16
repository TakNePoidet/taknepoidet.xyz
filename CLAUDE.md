# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

`taknepoidet.xyz` — a personal portfolio site for Никита Якин (TakNePoidet), built with **Nuxt 3**
and statically generated (`nuxt generate`) into an nginx image. Content is in **Russian**; keep
user-facing copy in Russian.

Stack: Nuxt 3 · Vue 3 (`<script setup lang="ts">`) · TypeScript · Pinia · `@nuxt/content` (v2) ·
SCSS · pnpm.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`, `.npmrc` sets `shamefully-hoist=true`). The Docker
build enables it via `corepack`. Node 20+ is expected.

```bash
pnpm install         # also runs `nuxt prepare` (postinstall) and installs husky hooks
pnpm dev             # dev server on http://localhost:3000
pnpm test            # lint + typecheck — run this before committing
pnpm lint            # stylelint + eslint + prettier -c (check only)
pnpm lint:fix        # same, with --fix / -w
pnpm test:types      # nuxi typecheck (vue-tsc)
pnpm generate        # typecheck + static prerender to .output/public
pnpm build           # typecheck + nuxt build
pnpm preview         # preview a production build
```

`build`/`generate` run `test:types` first and set `NODE_ENV=production` via `cross-env` — production
mode also pulls in `assets/style/production.scss` and the `postcss-preset-env` autoprefixer, so a
type error or a production-only style regression fails the build, not the dev server.

`.editorconfig` is a **symlink into `node_modules/@poidet/editorconfig`** — it is broken until
`pnpm install` has run. Don't "fix" it by replacing it with a real file.

A husky `pre-commit` hook runs `lint-staged` (stylelint → eslint → prettier, `--concurrent false`),
so staged files are auto-fixed on commit.

## Critical convention: nothing is auto-imported

`nuxt.config.ts` sets `components: false` and `imports.autoImport: false`. **Every** symbol must be
imported explicitly. This is the single most common source of mistakes in this repo.

```ts
// Nuxt/Vue/VueUse runtime + project composables → '#imports'
import { computed, definePageMeta, useAsyncData, useRoute, useColorMode } from '#imports';
// components → explicit relative-to-root path, PascalCase file name
import BaseSection from '~/components/BaseSection.vue';
import BaseIcon from '~/components/elements/BaseIcon.vue';
// stores / utils → '~/...'
import { usePortfolioStore } from '~/stores/portfolio';
import { Page } from '~/utils/page';
```

Notes on the import style actually used in the codebase:

- `#imports` re-exports Vue, Nuxt, `@vueuse/nuxt`, `@nuxtjs/color-mode` and **the project's own
  `composables/`** — both `import { useNamespace } from '#imports'` and
  `import { useNamespace } from '~/composables/useNamespace'` appear and both work. Prefer whichever
  the neighbouring file already uses.
- Types come straight from the package: `import type { PropType } from 'vue';`.
- `#sprite` exports the `Icons` enum from `@poidet/svg-sprite`.
- The only globally available components are Nuxt built-ins (`<nuxt-page>`, `<nuxt-link>`, `<Head>`,
  `<Meta>`, `<Link>`, `<Html>`, `<Body>`, `<Title>`) and `<svg-icon>` from the sprite module.
  Everything else needs an import.

In templates, components are referenced in **kebab-case** (`<base-section>`, `<section-hero>`,
`<motion-scroll>`) even though they are imported PascalCase.

## Layout

```
app/router.options.ts   custom routes (the /portfolio/:tag route) + smooth scrollBehavior
app.vue                 <Html lang="ru">, favicons/manifest, --height CSS var on resize
layouts/                default.vue (header + main + footer), error.vue (bare)
pages/                  index.vue, portfolio.vue, fallback.vue (catch-all 404)
components/             Base*.vue at root; elements/ sections/ portfolios/ utils/ subfolders
composables/            useX.ts, one named export per file
stores/                 Pinia setup stores
utils/                  framework-free helpers (page.ts enum, throttle.ts)
content/portfolios/     @nuxt/content markdown, NN-slug/index.md
assets/style/           SCSS entrypoint + utility/breakpoints/variables partials
assets/sprite/svg/      SVG sprite sources (icon name == file name)
public/                 static images, icons, manifest
```

Component naming is inconsistent by design/history: root and `elements/`, `sections/`, `utils/`
components are `PascalCase.vue`; `components/portfolios/` uses `kebab-case.vue`
(`portfolios-years-group.vue`). Match the folder you are editing.

## Routing

Routes are named through the `Page` const enum in `utils/page.ts`, set via `definePageMeta({ name })`
and referenced as `:to="{ name: Page.PortfolioListingTag, params: { tag } }"`. Add new routes to that
enum rather than hardcoding path strings.

`/portfolio/:tag([a-z-]+)` is **not** a file-based route — it is appended in `app/router.options.ts`
and reuses `pages/portfolio.vue`. `pages/fallback.vue` claims `alias: ['/:pathMatch(.*)*']` as the
404 page and is excluded from the sitemap and `robots` via `routeRules`/`sitemap.exclude`.

`scrollBehavior` offsets anchor scrolling by 1.5× the live `#header` height and waits for the
`page:finish` hook on cross-page navigation — be careful editing it, it is load-order sensitive.

## Content

Portfolio entries are `content/portfolios/<NN>-<slug>/index.md` — frontmatter only, no body. The
numeric prefix controls nothing at runtime (sorting is by `date` in the store); it just keeps the
directory readable.

```yaml
---
title: Сайт лизинговой компании “Простые решения”  # required
date: 2023-05-31                                    # required, parsed with new Date()
slug: pr-liz                                        # required, used for anchors + favourites list
permalink: https://pr-liz.ru                        # optional, renders the “Посмотреть” link
cover: /images/content/portfolio/pr-liz.jpg         # optional, path under public/
thumbhash: 8fcJBIDIqIiPdXaGeHZLd/BbRw==             # optional, blurhash placeholder for BasePicture
tags: [nuxt, laravel, scss]                         # required, values must exist in the Tag enum
---
```

`stores/portfolio.ts` owns the tag vocabulary: the `Tag` const enum plus a `tags` Map giving each tag
a display `title` and `aliases` (aliases widen tag-filtered listings — e.g. filtering by `vue` also
matches `nuxt`). **A tag used in markdown but missing from that Map resolves to `undefined` and will
crash rendering** — add the enum member and the `tags.set(...)` entry together. Icons for tags come
from `assets/sprite/svg/<tag>.svg`.

Generate `thumbhash` values with the author's own `TakNePoidet/thumbhash-cli`.

## Styling

- SCSS with **`@use`, not `@import`**, in component blocks:
  `@use 'assets/style/utility'; @use 'assets/style/breakpoints';`
- Sizes go through `utility.rem(32)` interpolated as `#{utility.rem(32)}` — do not hand-write `rem`.
- Breakpoints are `breakpoints.media-down('xl')` / `media-up('xl')` over `md: 800px`, `xl: 1360px`,
  `xxl: 1920px`. There is no `sm`/`lg`.
- Hover states use `@include utility.has-hover { … }` (handles `hover: none` via `:active`).
- Colors are CSS custom properties from `assets/style/variables.scss`, themed under `:root.light-mode`
  / `:root.dark-mode` (`@nuxtjs/color-mode`), with P3/`oklch` overrides behind
  `@media (color-gamut: p3)` + `@supports`. Never hardcode a hex in a component — add a variable.
- Class names follow BEM via the `useNamespace('block')` composable: `base()` → `block`,
  `component('title')` → `block__title`, `modifier('x')`, `is('open', bool)`. Styles are `scoped` and
  written as `& &__title { … }` with `$self: &` for nesting; cross-component reach-in uses `:deep()`.
- Stylelint extends `@poidet/stylelint`, which enforces property order — run `pnpm lint:fix` rather
  than reordering by hand.

## Components & patterns worth knowing

- `components/utils/Seo.vue` — every page renders one. It appends `| TakNePoidet` to the title unless
  `:template="false"`, and emits OG/Twitter/VK meta. `Canonical.vue` additionally sets a `Link:
  rel=canonical` **response header** server-side via `h3`.
- `components/elements/BasePicture.vue` — the image primitive. `width`/`height` are required (its
  prop defaults `throw`), it builds `srcset` through `@nuxt/image` + `useNuxtImage()`, lazies via
  `useVisible` (IntersectionObserver) and paints a `thumbhash` placeholder via `unlazy`. Use it
  instead of raw `<img>`; pass `preload` for above-the-fold images.
- `components/elements/ThemeSwitcher.vue` — theme toggle animated with the View Transitions API
  (circular clip-path reveal) and `::view-transition-*` rules in `variables.scss`.
- `useBodyScrollLock()` — **stack-counted** module-level lock toggling `html.overflow-hidden`. Always
  pair `lock()` with `unlock()`; unbalanced calls leak the lock across the app.
- `useCollapse()` — animates `<details>` height with the Web Animations API; expects
  `$container`/`$summary`/`$content` template refs named exactly that.
- `useSignal(init)` returns a React-style `[state, setState]` tuple; `useFocusTrap` wraps `focus-trap`;
  `MotionScroll.vue` wraps `motion` scroll-linked reveal animations.
- Data loading uses `useAsyncData` around `portfolioStore.fetch()`. `SectionInventory.vue` fetches
  GitHub stars from `https://ungh.cc` with `{ server: false }` so prerendering stays offline-safe —
  keep client-only for third-party fetches.
- Accessibility is linted (`eslint-plugin-vuejs-accessibility`); `SrOnly.vue` exists for visually
  hidden text, and `:focus-visible` styling comes from `assets/style/focus-visible.scss`.

## Props style

Props use the options object with explicit `PropType`, not the type-only `defineProps<T>()` generic:

```ts
defineProps({
  title: { type: String as PropType<string>, required: true },
  items: { type: Array as PropType<ModelPortfolio[]>, required: true },
  open:  { type: Boolean as PropType<boolean>, default: false }
});
```

## Formatting & lint

Shared configs from the author's `@poidet/*` packages: `@poidet/eslint-config-nuxt`,
`@poidet/prettier`, `@poidet/stylelint`, `@poidet/editorconfig`. Concretely: **tabs** for
indentation, single quotes, semicolons, LF endings (enforced by `.gitattributes`). ESLint enforces
import ordering/grouping — the blank-line-separated groups you see at the top of every file are
generated by the linter, so let `pnpm lint:fix` sort them.

`nuxt.config.ts` is in `.eslintignore`. Prefer `// eslint-disable-next-line <rule>` with the specific
rule name over blanket disables — that is the existing practice.

## Environment & deployment

Env vars (see `Dockerfile` and `.gitlab-ci.yml`):

| Variable | Purpose |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | canonical site URL — feeds `site.url`, `useHost()`, sitemap, OG tags |
| `SITE` | passed through the build |
| `VITE_YANDEX_METRICA` | Yandex Metrika counter id |
| `VITE_YANDEX_VERIFICATION` | Yandex verification token |

`.env` is gitignored and there is no committed example file. Without `NUXT_PUBLIC_SITE_URL`, absolute
URLs (canonical, cover images) resolve to `undefined` — set it when testing SEO output.

CI is **GitLab** (`.gitlab-ci.yml`), not GitHub Actions: a Kaniko job builds the `Dockerfile`
(multi-stage — `node:20.11` runs `pnpm generate`, output copied into `nginx`) and pushes to the
registry. `gh-pages` is also a devDependency for manual publishing. The repo has no test suite —
`pnpm test` means lint + typecheck.

## Git conventions

Conventional Commits, lowercase, occasionally scoped: `feat: scrollTop`, `fix: types`,
`chore(portfolio): add iCalendar`, `build: update scripts`, `refactor: scroll lock`, `ci: …`,
`perf: …`, `style: …`. Keep subjects short; the history has no bodies.

Run `pnpm test` before committing — the pre-commit hook fixes formatting but does **not** typecheck.
