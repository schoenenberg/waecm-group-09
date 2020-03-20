FROM node:10-alpine AS builder

EXPOSE 8080/tcp

WORKDIR /opt/waecm
COPY . /opt/waecm/

RUN npm install \
 && npm run build

CMD npm run start:prod
