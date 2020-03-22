# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /usr/src/waecm

# install and cache app dependencies
COPY . /usr/src/waecm/
RUN npm install

#expose port
EXPOSE 3000/tcp

# start app
CMD ["npm", "start"]


