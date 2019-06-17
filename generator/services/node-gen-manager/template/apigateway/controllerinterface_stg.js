/*
 * Template group controllerinterface
 * Compiled on Fri Jun 14 2019 15:30:46 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "controllerinterface"; 

group.name = "controllerinterface";





//
// Template /controllerinterface
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { Router } from 'express';");
    w.write("\n");
    w.pushIndentation(" ");
    w.write("\n");
    w.popIndentation();
    w.write("interface Controller {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("router: Router;");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.pushIndentation(" ");
    w.write("\n");
    w.popIndentation();
    w.write("export default Controller;");
};
r.args = [
        
];
group.addTemplate("/controllerinterface", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;