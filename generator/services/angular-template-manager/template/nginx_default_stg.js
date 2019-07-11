/*
 * Template group nginx_default
 * Compiled on Wed Jul 10 2019 11:39:14 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "nginx_default"; 

group.name = "nginx_default";





//
// Template /nginx_default
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("server {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("listen 80;");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("sendfile on;");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("default_type application/octet-stream;");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("gzip on;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("gzip_http_version 1.1;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("gzip_disable      \"MSIE [1-6]\\.\";");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("gzip_min_length   256;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("gzip_vary         on;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("gzip_proxied      expired no-cache no-store private auth;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("gzip_comp_level   9;");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("root /usr/share/nginx/html;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("index  index.html index.htm;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("    ");
    w.write("location / {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("try_files ");
    w.popIndentation();
    st.write(w, s, g, rc, s.uri);
    w.write("uri/ /index.html;");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/nginx_default", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;