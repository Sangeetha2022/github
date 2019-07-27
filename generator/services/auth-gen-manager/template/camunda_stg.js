/*
 * Template group camunda
 * Compiled on Sat Jul 27 2019 12:52:32 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "camunda"; 

group.name = "camunda";





//
// Template /camunda
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("export class camundaService {");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public static camundaUrl = process.env.CAMUNDAPOD_URL;");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/camunda", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;