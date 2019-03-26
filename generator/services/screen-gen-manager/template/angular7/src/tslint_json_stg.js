/*
 * Template group tslint_json
 * Compiled on Fri Mar 15 2019 11:00:49 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "tslint_json"; 

group.name = "tslint_json";





//
// Template /tslint_json
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("{");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"extends\": \"../tslint.json\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"rules\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"directive-selector\": [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("\"attribute\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("\"app\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("\"camelCase\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"component-selector\": [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("\"element\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("\"app\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("\"kebab-case\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("]");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/tslint_json", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;