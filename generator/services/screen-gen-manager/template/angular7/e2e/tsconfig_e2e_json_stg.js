/*
 * Template group tsconfig_e2e_json
 * Compiled on Thu Mar 14 2019 14:41:57 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "tsconfig_e2e_json"; 

group.name = "tsconfig_e2e_json";





//
// Template /tsconfig_e2e_json
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("{");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"extends\": \"../tsconfig.json\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"compilerOptions\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"outDir\": \"../out-tsc/app\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"module\": \"commonjs\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"target\": \"es5\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"types\": [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\"jasmine\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\"jasminewd2\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\"node\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("]");
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
group.addTemplate("/tsconfig_e2e_json", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;