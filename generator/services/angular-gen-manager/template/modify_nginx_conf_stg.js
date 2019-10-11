/*
 * Template group modify_nginx_conf
 * Compiled on Fri Oct 11 2019 12:43:13 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "modify_nginx_conf"; 

group.name = "modify_nginx_conf";





//
// Template /modify_nginx_conf
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.pushIndentation("    ");
    w.write("location ^~ /");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "url", { file: gFile, line: 2, column: 25 }));
    w.write(" {");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("rewrite /");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "url", { file: gFile, line: 3, column: 21 }));
    w.write("/(.*) /$1  break;");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("proxy_pass https://");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "url", { file: gFile, line: 4, column: 31 }));
    w.write(";");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/modify_nginx_conf", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;