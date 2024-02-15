FROM node:20.11 as generate

ARG VITE_YANDEX_VERIFICATION
ARG VITE_YANDEX_VERIFICATION
ARG NUXT_PUBLIC_SITE_URL
ARG SITE

ENV VITE_YANDEX_VERIFICATION=$VITE_YANDEX_VERIFICATION
ENV VITE_YANDEX_METRICA=$VITE_YANDEX_METRICA
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL
ENV SITE=$SITE
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run generate

FROM nginx
COPY --from=generate /app/.output/public /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


