docker_file(filename) ::= <<
FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY /dist/$filename$ /usr/share/nginx/html
COPY /nginx /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]

>>