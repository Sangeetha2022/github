From node:10.14.2
COPY . /templatemanager
WORKDIR /templatemanager
Run rm -rf node_modules
RUN npm install
RUN npm i -g ts-node
CMD npm run prod