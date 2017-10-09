FROM node:8.6.0-alpine

ENV NPM_CONFIG_LGOLEVEL warn

COPY package.json package.json
COPY npm-shrinkwrap.json npm-shrinkwrap.jso

RUN npm install

COPY . .

RUN npm run build:prod

RUN npm install -g serve

CMD serve -s build

EXPOSE 5000

