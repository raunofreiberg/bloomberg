FROM node:8.6.0

WORKDIR /usr/src/app
ADD . /usr/src/app

COPY package.json package.json
COPY npm-shrinkwrap.json npm-shrinkwrap.json

RUN npm install

EXPOSE 3000
