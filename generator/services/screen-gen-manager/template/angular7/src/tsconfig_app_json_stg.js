/*
 * Template group tsconfig_app_json
 * Compiled on Fri Mar 15 2019 11:00:45 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "tsconfig_app_json"; 

group.name = "tsconfig_app_json";





//
// Template /tsconfig_app_json
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
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
    w.write("\"types\": []");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"exclude\": [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"test.ts\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"**/*.spec.ts\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("]");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/tsconfig_app_json", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;