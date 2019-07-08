/*
 * Template group camunda
 * Compiled on Mon Jul 08 2019 12:56:21 GMT+0530 (IST)
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
    w.write("public static camundaUrl = \"http://gep-dev-camunda.gep-dev-201902.svc.cluster.local:8080\"");
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