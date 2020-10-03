FROM node:14.11.0-alpine
COPY . /ionicmanager
WORKDIR /ionicmanager
RUN npm install
RUN npm install -g @angular/cli
RUN npm install -g cordova ionic
RUN npm i -g cordova-res --unsafe-perm
RUN npm i -g ts-node
CMD npm run dev
