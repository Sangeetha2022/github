/*
 * Template group app_component
 * Compiled on Tue Aug 27 2019 11:31:32 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_component"; 

group.name = "app_component";





//
// Template /app_component
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { Component, OnInit } from '@angular/core';");
    w.write("\n");
    w.write("import { Router, NavigationEnd } from '@angular/router';");
    w.write("\n");
    w.write("\n");
    w.write("@Component({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector: 'app-root',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("templateUrl: './app.component.html',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("styleUrls: ['./app.component.scss']");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class AppComponent implements OnInit {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("headerFooter: boolean;");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("constructor(");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("private router: Router");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write(") { }");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("ngOnInit() {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("this.router.events");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write(".subscribe((event) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("if (event instanceof NavigationEnd) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("const temp = event.url.split('?');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.headerFooter = (temp[0] !== '/signup' && temp[0] !== '/login');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/app_component", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;