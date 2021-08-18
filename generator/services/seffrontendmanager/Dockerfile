FROM node:14.11.0-alpine
COPY . /sef-frontend-manager
WORKDIR /sef-frontend-manager
RUN npm install
RUN npm i -g ts-node
CMD npm run dev
