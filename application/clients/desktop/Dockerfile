FROM node:14.11.0-alpine
COPY . /app
WORKDIR /app
RUN npm install --save node-sass@4.14.1 --unsafe-perm=true --allow-root
RUN npm install
RUN npm install --save @ng-select/ng-select
RUN npm install -g @angular/cli@7.3.9
RUN npm install -g serve
CMD ng serve