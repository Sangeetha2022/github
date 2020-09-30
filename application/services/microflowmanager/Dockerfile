FROM node:14.11.0-alpine
COPY . /microflowmanager
WORKDIR /microflowmanager 
RUN npm install
RUN npm i -g ts-node
CMD npm run dev
