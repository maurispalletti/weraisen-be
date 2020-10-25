FROM node:12-alpine

ENV NODE_ENV prod

# Update & install required packages
RUN apk add --update bash git make python g++

# Install app dependencies
COPY package.json /service/package.json
# COPY package-lock.json /service/package-lock.json

RUN cd /service; npm install

# Copy app source
COPY . /service

# Set work directory to /api
WORKDIR /service

# set your port
ENV PORT 2300

# expose the port to outside world
EXPOSE 2300

RUN apk del python make g++

# start command as per package.json
CMD ["node", "bin/www"]
