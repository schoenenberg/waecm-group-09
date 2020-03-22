# Using node image as build-stage
FROM node:12.2.0-alpine AS build-stage

# set working directory
WORKDIR /usr/src/waecm

# Copy sources and build app
COPY . /usr/src/waecm/
RUN npm install \
 && npm run build


FROM nginx:1.17.9

COPY --from=build-stage /usr/src/waecm/build/ /usr/share/nginx/html/
