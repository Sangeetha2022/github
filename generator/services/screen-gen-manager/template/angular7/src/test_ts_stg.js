/*
 * Template group test_ts
 * Compiled on Fri Mar 15 2019 11:00:23 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "test_ts"; 

group.name = "test_ts";





//
// Template /test_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("// This file is required by karma.conf.js and loads recursively all the .spec and framework files");
    w.write("\n");
    w.write("\n");
    w.write("import 'zone.js/dist/zone-testing';");
    w.write("\n");
    w.write("import { getTestBed } from '@angular/core/testing';");
    w.write("\n");
    w.write("import {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("BrowserDynamicTestingModule,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("platformBrowserDynamicTesting");
    w.popIndentation();
    w.write("\n");
    w.write("} from '@angular/platform-browser-dynamic/testing';");
    w.write("\n");
    w.write("\n");
    w.write("declare const require: any;");
    w.write("\n");
    w.write("\n");
    w.write("// First, initialize the Angular testing environment.");
    w.write("\n");
    w.write("getTestBed().initTestEnvironment(");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("BrowserDynamicTestingModule,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("platformBrowserDynamicTesting()");
    w.popIndentation();
    w.write("\n");
    w.write(");");
    w.write("\n");
    w.write("// Then we find all the tests.");
    w.write("\n");
    w.write("const context = require.context('./', true, /\\.spec\\.ts$/);");
    w.write("\n");
    w.write("// And load the modules.");
    w.write("\n");
    w.write("context.keys().map(context);");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/test_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;