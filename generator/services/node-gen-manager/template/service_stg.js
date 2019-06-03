/*
 * Template group service
 * Compiled on Thu May 30 2019 10:58:23 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "service"; 

group.name = "service";





//
// Template /service
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { Request } from 'express';");
    w.write("\n");
    w.write("import {  ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.serviceData, "toComponentName", { file: gFile, line: 3, column: 23 }));
    w.write(" } from '");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.serviceData, "daoPath", { file: gFile, line: 3, column: 61 }));
    w.write("';");
    w.write("\n");
    w.write("\n");
    w.write("let gpdao = new  ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.serviceData, "toComponentName", { file: gFile, line: 5, column: 30 }));
    w.write("()");
    w.write("\n");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.serviceData, "componentName", { file: gFile, line: 7, column: 26 }));
    w.write(" {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public gpcreate(req: Request, callback: CallableFunction) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("gpdao.gpcreate(req, (data) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("callback(data)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        { name: "serviceData"     }
];
group.addTemplate("/service", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;