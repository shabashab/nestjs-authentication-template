FROM node:16 as build-stage

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm 

WORKDIR /build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY ./ .
RUN pnpm run build

FROM node:16 as production-stage

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm 

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

WORKDIR /app
COPY --chown=node:node --from=build-stage /build/package.json /app/
RUN pnpm install -P

ENV NODE_ENV production
USER node

COPY --chown=node:node --from=build-stage /build/dist /app/dist/
CMD ["dumb-init", "node", "/app/dist/main"]
