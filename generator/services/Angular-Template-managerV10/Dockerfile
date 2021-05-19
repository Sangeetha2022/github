FROM node:14.11.0-alpine
COPY . /angulartemplatemanager
WORKDIR /angulartemplatemanager
RUN npm install
RUN npm install -g @angular/cli@7.3.9
RUN npm i -g ts-node
CMD npm run dev
