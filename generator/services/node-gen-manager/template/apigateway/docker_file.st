docker_file(filename) ::= <<
From node:10.14.2
COPY . /$filename$
WORKDIR /$filename$
RUN npm install
RUN npm i -g ts-node
CMD npm run prod
>>