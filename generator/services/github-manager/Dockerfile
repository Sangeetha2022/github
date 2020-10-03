FROM node:14.11.0-alpine
COPY . /github-manager
WORKDIR /github-manager 
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN npm install
RUN npm i -g ts-node
CMD npm run dev