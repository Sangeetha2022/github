/*
 * Template group tsconfig_spec_json
 * Compiled on Fri Mar 15 2019 11:00:30 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "tsconfig_spec_json"; 

group.name = "tsconfig_spec_json";





//
// Template /tsconfig_spec_json
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
    w.write("\"outDir\": \"../out-tsc/spec\",");
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
    w.write("\"node\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("]");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"files\": [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"test.ts\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"polyfills.ts\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"include\": [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"**/*.spec.ts\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"**/*.d.ts\"");
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
group.addTemplate("/tsconfig_spec_json", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;