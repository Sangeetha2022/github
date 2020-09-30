FROM node:14.11.0-alpine
COPY . /auth-gen-manager
WORKDIR /auth-gen-manager
RUN npm i -g ts-node
RUN npm install
CMD npm run dev
