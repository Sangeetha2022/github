/*
 * Template group component
 * Compiled on Fri Jun 14 2019 16:39:45 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component"; 

group.name = "component";





//
// Template /component
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
    w.write("selector: 'app-test',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("templateUrl: './test.component.html',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("styleUrls: ['./test.component.scss']");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class TestComponent implements OnInit {");
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
};
r.args = [
        
];
group.addTemplate("/component", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;