FROM node:14.11.0-alpine
COPY . /code-generation-manager
WORKDIR /code-generation-manager
RUN npm i -g ts-node
RUN npm install
CMD npm run dev
