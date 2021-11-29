/*
 * Template group gcam
 * Compiled on Fri Nov 19 2021 12:14:28 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "gcam"; 

group.name = "gcam";





//
// Template /gcam
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("export class gcamService {");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public static gcamUrl = process.env.GCAMPOD_URL;");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/gcam", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;