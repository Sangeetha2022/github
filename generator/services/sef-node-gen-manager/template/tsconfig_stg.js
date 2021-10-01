/*
 * Template group tsconfig
 * Compiled on Tue Jun 04 2019 12:07:55 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "tsconfig"; 

group.name = "tsconfig";





//
// Template /tsconfig
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("{");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"compilerOptions\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"module\": \"commonjs\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"moduleResolution\": \"node\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"pretty\": true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"sourceMap\": true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"resolveJsonModule\": true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"target\": \"es6\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"outDir\": \"./dist\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"baseUrl\": \"./lib\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"include\": [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"src/**/*.ts\", \"src/models/NodeModels.ts\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"exclude\": [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"node_modules\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("]");
    w.popIndentation();
    w.write("\n");
    w.write("}");
};
r.args = [
        
];
group.addTemplate("/tsconfig", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;