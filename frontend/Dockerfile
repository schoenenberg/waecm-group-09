# ========= BUILD =========
# Using node image as build-stage
FROM node:12.2.0-alpine AS build-stage

ENV CI=true

# set working directory
WORKDIR /usr/src/waecm

# Copy sources and build app
COPY package.json package-lock.json tsconfig.json /usr/src/waecm/
COPY public/ /usr/src/waecm/public/
RUN npm ci
COPY src/ /usr/src/waecm/src/
RUN npm cit\
 && npm run build

# ========= RUN =========
# Using nginx as serving image
FROM nginx:1.17.9

EXPOSE 3000/tcp

COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/waecm/build/ /usr/share/nginx/html/
