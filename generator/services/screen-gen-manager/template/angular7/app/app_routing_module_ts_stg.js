/*
 * Template group app_routing_module_ts
 * Compiled on Tue Mar 19 2019 11:32:41 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_routing_module_ts"; 

group.name = "app_routing_module_ts";





//
// Template /app_routing_module_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { NgModule } from '@angular/core';");
    w.write("\n");
    w.write("import { Routes, RouterModule } from '@angular/router';");
    w.write("\n");
    w.write("\n");
    if (st.test(s.importComponent)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.importComponent;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "classname", { file: gFile, line: 5, column: 59 }));
                     w.write("Component } from './");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "foldername", { file: gFile, line: 5, column: 96 }));
                     w.write("/");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "foldername", { file: gFile, line: 5, column: 114 }));
                     w.write(".component';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("const routes: Routes = [");
    w.write("\n");
    w.write("  ");
    if (st.test(s.componentPath)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.componentPath;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("{ path: '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "path", { file: gFile, line: 8, column: 59 }));
                     w.write("', component: ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "component", { file: gFile, line: 8, column: 84 }));
                     w.write("Component },");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("];");
    w.write("\n");
    w.write("\n");
    w.write("@NgModule({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("imports: [RouterModule.forRoot(routes)],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("exports: [RouterModule]");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class AppRoutingModule { }");
    w.write("\n");
};
r.args = [
        { name: "importComponent"     },
{ name: "componentPath"     }
];
group.addTemplate("/app_routing_module_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;