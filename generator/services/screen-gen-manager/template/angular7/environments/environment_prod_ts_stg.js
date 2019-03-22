/*
 * Template group environment_prod_ts
 * Compiled on Fri Mar 15 2019 11:17:12 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "environment_prod_ts"; 

group.name = "environment_prod_ts";





//
// Template /environment_prod_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("export const environment = {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("production: true");
    w.popIndentation();
    w.write("\n");
    w.write("};");
};
r.args = [
        
];
group.addTemplate("/environment_prod_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;