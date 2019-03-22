/*
 * Template group tsconfig_json
 * Compiled on Thu Mar 14 2019 15:12:02 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "tsconfig_json"; 

group.name = "tsconfig_json";





//
// Template /tsconfig_json
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("{");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"compileOnSave\": false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"compilerOptions\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"baseUrl\": \"./\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"outDir\": \"./dist/out-tsc\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"sourceMap\": true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"declaration\": false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"module\": \"es2015\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"moduleResolution\": \"node\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"emitDecoratorMetadata\": true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"experimentalDecorators\": true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"importHelpers\": true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"target\": \"es5\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"typeRoots\": [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\"node_modules/@types\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"lib\": [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\"es2018\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\"dom\"");
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
group.addTemplate("/tsconfig_json", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;