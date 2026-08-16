FROM node:22 AS generate

ARG VITE_YANDEX_METRICA
ARG VITE_YANDEX_VERIFICATION
ARG NUXT_PUBLIC_SITE_URL
ARG SITE

ENV VITE_YANDEX_METRICA=$VITE_YANDEX_METRICA
ENV VITE_YANDEX_VERIFICATION=$VITE_YANDEX_VERIFICATION
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL
ENV SITE=$SITE
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
# better-sqlite3 (@nuxt/content) is compiled here; it is allow-listed via
# `pnpm.onlyBuiltDependencies` in package.json, which pnpm 10 requires.
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run generate

FROM nginx
COPY --from=generate /app/.output/public /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
