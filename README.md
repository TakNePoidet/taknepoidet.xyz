# taknepoidet.xyz

Персональный сайт Якина Никиты. Nuxt 4 + Vue 3 + TypeScript, статическая генерация в nginx-образ.

## Требования

- Node.js >= 20.19
- pnpm 10 (`corepack enable`)

## Установка

```bash
pnpm install
```

## Разработка

```bash
pnpm dev          # http://localhost:3000
```

## Проверки

```bash
pnpm test         # линтеры + проверка типов
pnpm lint         # stylelint + eslint + prettier (только проверка)
pnpm lint:fix     # то же самое с автоисправлением
pnpm test:types   # nuxt typecheck (vue-tsc)
```

## Сборка

```bash
pnpm generate     # статическая генерация в .output/public
pnpm preview      # предпросмотр сборки
```

Переменные окружения: `NUXT_PUBLIC_SITE_URL`, `SITE`, `VITE_YANDEX_METRICA`, `VITE_YANDEX_VERIFICATION`.
