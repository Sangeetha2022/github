nginx_default_conf(object) ::= <<
server {

  listen 80;

  sendfile on;

  default_type application/octet-stream;


  gzip on;
  gzip_http_version 1.1;
  gzip_disable      "MSIE [1-6]\.";
  gzip_min_length   256;
  gzip_vary         on;
  gzip_proxied      expired no-cache no-store private auth;
  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  gzip_comp_level   9;

    root /usr/share/nginx/html;
    index  index.html index.htm;
    
    location / {
    try_files $uri $uri/ /index.html;
    }
$if(object.proxy)$$object.proxy:{proxy | $\ $$\ $$\ $$\ $location ^~ $proxy.locationUrl$ {$\n$ proxy_pass http://$proxy.projectName$-system-entry.$proxy.projectName$.svc.cluster.local:$proxy.portNumber$$proxy.additionalUrl$;$\n$$\t$ \}};separator="\n"$$endif$

}

>>