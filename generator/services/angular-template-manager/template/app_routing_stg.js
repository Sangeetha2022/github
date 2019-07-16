/*
 * Template group app_routing
 * Compiled on Tue Jul 16 2019 17:46:50 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_routing"; 

group.name = "app_routing";





//
// Template /app_routing
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { NgModule } from '@angular/core';");
    w.write("\n");
    w.write("import { Routes, RouterModule } from '@angular/router';");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.routing, "isAuthImport", { file: gFile, line: 4, column: 12 }))) {
    
        w.write("import { AuthGuard } from './auth.guard';");
    
    
    }
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.routing, "importComponent", { file: gFile, line: 5, column: 12 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.routing, "importComponent", { file: gFile, line: 5, column: 38 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "classname", { file: gFile, line: 5, column: 75 }));
                     w.write("Component } from './");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "foldername", { file: gFile, line: 5, column: 112 }));
                     w.write("/");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "foldername", { file: gFile, line: 5, column: 130 }));
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
    if (st.test(st.prop(s, g, rc, s.routing, "componentPath", { file: gFile, line: 8, column: 14 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.routing, "componentPath", { file: gFile, line: 8, column: 38 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("{ path: '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "path", { file: gFile, line: 8, column: 75 }));
                     w.write("', component: ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "component", { file: gFile, line: 8, column: 100 }));
                     w.write("Component");
                     if (st.test(st.prop(s, g, rc, s.name, "isAuthProtected", { file: gFile, line: 8, column: 128 }))) {
                     
                         w.write(", canActivate: [AuthGuard]");
                     
                     
                     }
                     w.write(" },");
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
        { name: "routing"     }
];
group.addTemplate("/app_routing", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;