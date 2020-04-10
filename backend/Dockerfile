FROM node:10-alpine

ENV REDDIT_USERNAME=unset REDDIT_PASSWORD=unset REDDIT_CLIENT_ID=unset REDDIT_CLIENT_SECRET=unset

EXPOSE 8080/tcp

WORKDIR /opt/waecm
COPY . /opt/waecm/

RUN npm install \
 && npm run build

CMD npm run start:prod
