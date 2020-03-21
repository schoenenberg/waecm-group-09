# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /usr/src/waecm

# add node modules to $PATH
ENV PATH /usr/src/waecm/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/waecm/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

#expose port
EXPOSE 3000/tcp

#copy everything to workdirectory
COPY . /usr/src/waecm

# start app
CMD ["npm", "start"]


