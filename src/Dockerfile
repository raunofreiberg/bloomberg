FROM node:8.6.0

ENV NPM_CONFIG_LGOLEVEL warn

RUN mkdir -p /usr/src/app
ADD . /usr/src/app

COPY package.json package.json
COPY npm-shrinkwrap.json npm-shrinkwrap.jso

RUN npm install

COPY . .

RUN npm run build:prod

CMD npm run serve:static

EXPOSE 3000

