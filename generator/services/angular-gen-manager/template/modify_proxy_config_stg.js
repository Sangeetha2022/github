/*
 * Template group modify_proxy_config
 * Compiled on Tue Sep 24 2019 17:52:57 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "modify_proxy_config"; 

group.name = "modify_proxy_config";





//
// Template /modify_proxy_config
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.pushIndentation("   ");
    w.write("'/");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "baseName", { file: gFile, line: 2, column: 13 }));
    w.write("/*': {");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("target: '");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "baseUrl", { file: gFile, line: 3, column: 25 }));
    w.write("',");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("secure: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("pathRewrite: {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("'^/");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "baseName", { file: gFile, line: 6, column: 23 }));
    w.write("': ''");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("changeOrigin: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("logLevel: 'debug'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/modify_proxy_config", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;