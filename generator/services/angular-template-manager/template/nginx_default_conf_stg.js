/*
 * Template group nginx_default_conf
 * Compiled on Fri Oct 11 2019 12:39:44 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "nginx_default_conf"; 

group.name = "nginx_default_conf";





//
// Template /nginx_default_conf
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
    w.write("try_files $uri $uri/ /index.html;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "proxy", { file: gFile, line: 26, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "proxy", { file: gFile, line: 26, column: 26 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("    location ^~ ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.proxy, "locationUrl", { file: gFile, line: 26, column: 76 }));
                     w.write(" {\n    proxy_pass http://");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.proxy, "projectName", { file: gFile, line: 26, column: 123 }));
                     w.write("-system-entry.");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.proxy, "projectName", { file: gFile, line: 26, column: 156 }));
                     w.write(".svc.cluster.local:");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.proxy, "portNumber", { file: gFile, line: 26, column: 194 }));
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.proxy, "additionalUrl", { file: gFile, line: 26, column: 212 }));
                     w.write(";\n    }");
            }, [
            { name: "proxy"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/nginx_default_conf", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;