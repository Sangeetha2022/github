/*
 * Template group app_ts
 * Compiled on Mon Mar 18 2019 19:37:53 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_ts"; 

group.name = "app_ts";





//
// Template /app_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { Component, OnInit } from '@angular/core';");
    w.write("\n");
    w.write("\n");
    w.write("@Component({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector: 'app-root',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("templateUrl: './");
    w.popIndentation();
    st.write(w, s, g, rc, s.folderName);
    w.write(".component.html',");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("styleUrls: ['./");
    w.popIndentation();
    st.write(w, s, g, rc, s.folderName);
    w.write(".component.scss']");
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, s.className);
    w.write("Component implements OnInit {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("constructor() { }");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("ngOnInit() {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        { name: "className"     },
{ name: "folderName"     }
];
group.addTemplate("/app_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;