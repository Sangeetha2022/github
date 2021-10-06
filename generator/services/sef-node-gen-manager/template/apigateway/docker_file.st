docker_file(filename) ::= <<
FROM node:14.11.0-alpine
COPY . /$filename$
WORKDIR /$filename$
RUN npm install
RUN npm i -g ts-node
CMD npm run prod
>>