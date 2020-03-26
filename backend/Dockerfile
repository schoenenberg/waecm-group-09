FROM node:10-alpine

EXPOSE 8080/tcp

WORKDIR /opt/waecm
COPY . /opt/waecm/

RUN npm install \
 && npm run build

CMD npm run start:prod
