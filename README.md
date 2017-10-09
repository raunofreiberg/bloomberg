## Bloomfield

 - React:   15.x
 - Redux    3.6.0
 - DB:      Firebase
 - NPM:     8.x

### Setup

- `npm i` under `src`
- `npm run dev` for development

### Live deploy
Build the Docker image by

`docker build .`

then run it

`docker run -it --rm -p 3000:3000 --name CONTAINER_NAME IMAGE_NAME`
