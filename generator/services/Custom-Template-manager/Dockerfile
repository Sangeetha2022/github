FROM node:14.15.0-alpine
COPY . /customtemplatemanager
WORKDIR /customtemplatemanager
RUN npm install
RUN npm install -g @angular/cli@13.2.0
RUN npm i -g ts-node
CMD npm run dev
