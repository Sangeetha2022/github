/*
 * Template group environment_ts
 * Compiled on Fri Mar 15 2019 11:17:17 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "environment_ts"; 

group.name = "environment_ts";





//
// Template /environment_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("// This file can be replaced during build by using the `fileReplacements` array.");
    w.write("\n");
    w.write("// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.");
    w.write("\n");
    w.write("// The list of file replacements can be found in `angular.json`.");
    w.write("\n");
    w.write("\n");
    w.write("export const environment = {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("production: false");
    w.popIndentation();
    w.write("\n");
    w.write("};");
    w.write("\n");
    w.write("\n");
    w.write("/*");
    w.write("\n");
    w.pushIndentation(" ");
    w.write("* For easier debugging in development mode, you can import the following file");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation(" ");
    w.write("* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation(" ");
    w.write("*");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation(" ");
    w.write("* This import should be commented out in production mode because it will have a negative impact");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation(" ");
    w.write("* on performance if an error is thrown.");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation(" ");
    w.write("*/");
    w.popIndentation();
    w.write("\n");
    w.write("// import 'zone.js/dist/zone-error';  // Included with Angular CLI.");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/environment_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;