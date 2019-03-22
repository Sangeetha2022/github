/*
 * Template group app_module_ts
 * Compiled on Fri Mar 22 2019 12:48:51 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_module_ts"; 

group.name = "app_module_ts";





//
// Template /app_module_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { BrowserModule } from '@angular/platform-browser';");
    w.write("\n");
    w.write("import { NgModule } from '@angular/core';");
    w.write("\n");
    w.write("\n");
    w.write("import { AppRoutingModule } from './app-routing.module';");
    w.write("\n");
    w.write("import { AppComponent } from './app.component';");
    w.write("\n");
    if (st.test(s.importDependency)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.importDependency;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyname", { file: gFile, line: 7, column: 63 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencypath", { file: gFile, line: 7, column: 94 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    if (st.test(s.importComponent)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.importComponent;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "classname", { file: gFile, line: 8, column: 61 }));
                     w.write("Component } from './");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "foldername", { file: gFile, line: 8, column: 98 }));
                     w.write("/");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "foldername", { file: gFile, line: 8, column: 116 }));
                     w.write(".component';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("@NgModule({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("declarations: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("AppComponent,");
    w.popIndentation();
    w.write("\n");
    w.write("    ");
    if (st.test(s.importComponent)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.importComponent;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "classname", { file: gFile, line: 13, column: 54 }));
                     w.write("Component,");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("imports: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("BrowserModule,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("AppRoutingModule,");
    w.popIndentation();
    w.write("\n");
    w.write("    ");
    if (st.test(s.importDependency)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.importDependency;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "modulename", { file: gFile, line: 18, column: 56 }));
                     w.write(",");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("providers: [],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("bootstrap: [AppComponent]");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class AppModule { }");
    w.write("\n");
};
r.args = [
        { name: "importComponent"     },
{ name: "importDependency"     }
];
group.addTemplate("/app_module_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;