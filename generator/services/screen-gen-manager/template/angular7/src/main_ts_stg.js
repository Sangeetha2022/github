/*
 * Template group main_ts
 * Compiled on Fri Mar 15 2019 11:00:37 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "main_ts"; 

group.name = "main_ts";





//
// Template /main_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { enableProdMode } from '@angular/core';");
    w.write("\n");
    w.write("import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';");
    w.write("\n");
    w.write("\n");
    w.write("import { AppModule } from './app/app.module';");
    w.write("\n");
    w.write("import { environment } from './environments/environment';");
    w.write("\n");
    w.write("\n");
    w.write("if (environment.production) {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("enableProdMode();");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("platformBrowserDynamic().bootstrapModule(AppModule)");
    w.write("\n");
    w.pushIndentation("  ");
    w.write(".catch(err => console.error(err));");
    w.popIndentation();
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/main_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;