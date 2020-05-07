FROM node:12.2-alpine AS builder

WORKDIR /opt/waecm

COPY package.json package-lock.json tsconfig.json nest-cli.json tsconfig.build.json tsconfig.json schema.graphql /opt/waecm/
RUN npm ci
COPY test/ /opt/waecm/test/
COPY src/ /opt/waecm/src/
RUN npm run build

# ========= RUN =========
# Using a fresh node image as serving image
FROM node:12.2-alpine

ENV REDDIT_USERNAME=unset REDDIT_PASSWORD=unset REDDIT_CLIENT_ID=unset REDDIT_CLIENT_SECRET=unset
EXPOSE 8080/tcp

COPY --from=builder /opt/waecm /opt
WORKDIR /opt/waecm

CMD npm run start:prod
