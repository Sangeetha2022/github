FROM node:14.11.0-alpine
COPY . /aws-deployment-manager
WORKDIR /aws-deployment-manager
RUN npm install
RUN npm i -g ts-node
CMD npm run dev