# base image
FROM node:12.2.0-alpine

# set working directory
RUN mkdir -p /usr/src/waecm
WORKDIR /usr/src/waecm
COPY . /usr/src/waecm

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/waecm/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/waecm/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

#expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]

# docker build -t waecm/test7 .
# docker run -d -p 3000:3000 waecm/test7
