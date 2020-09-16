/*
 * Template group shared_service
 * Compiled on Fri Sep 11 2020 16:12:57 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "shared_service"; 

group.name = "shared_service";





//
// Template /shared_service
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(s.object)) {
    
        w.write("\n");
        w.write("import { Injectable } from '@angular/core';");
        w.write("\n");
        w.write("\n");
        w.write("@Injectable({");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("providedIn: 'root'");
        w.popIndentation();
        w.write("\n");
        w.write("})");
        w.write("\n");
        w.write("export class ");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 8, column: 21 }));
        w.write("Service {");
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("public DESKTOP_API = 'http://'+window.location.hostname+':3000/desktop';");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("public MOBILE_API = '/api/mobile';");
        w.popIndentation();
        w.write("\n");
        w.write("}");
        w.write("\n");
    
    
    }
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/shared_service", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;