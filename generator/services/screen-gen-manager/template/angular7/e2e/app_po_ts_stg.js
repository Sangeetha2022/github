/*
 * Template group app_po_ts
 * Compiled on Thu Mar 14 2019 14:41:49 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_po_ts"; 

group.name = "app_po_ts";





//
// Template /app_po_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { browser, by, element } from 'protractor';");
    w.write("\n");
    w.write("\n");
    w.write("export class AppPage {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("navigateTo() {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return browser.get('/');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("getTitleText() {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return element(by.css('app-root h1')).getText();");
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
group.addTemplate("/app_po_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;