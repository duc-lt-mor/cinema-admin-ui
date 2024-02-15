FROM node:lts-alpine3.19 as cinema-admin-ui
WORKDIR /var/www/html
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
CMD [ "pnpm", "dev" ]
