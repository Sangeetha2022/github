/*
 * Template group route
 * Compiled on Wed Jul 31 2019 17:58:39 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "route"; 

group.name = "route";





//
// Template /route
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { NgModule } from '@angular/core';");
    w.write("\n");
    w.write("import { Routes, RouterModule } from '@angular/router';");
    w.write("\n");
    w.write("import { HomepageComponent } from './homepage/homepage.component';");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.routeObj, "description", { file: gFile, line: 5, column: 13 }), "screen", { file: gFile, line: 5, column: 25 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.routeObj, "description", { file: gFile, line: 5, column: 43 }), "screen", { file: gFile, line: 5, column: 55 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import  ");
                     st.write(w, s, g, rc, s.robj);
                     w.write(" from './");
                     st.write(w, s, g, rc, s.robj);
                     w.write("/");
                     st.write(w, s, g, rc, s.robj);
                     w.write(".component';");
                     st.write(w, s, g, rc, "\n");
            }, [
            { name: "robj"     }
            ])); 
        return st.map(attr, tp);
        })());
    
    
    }
    w.write("\n");
    w.write("const routes: Routes = [");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("{ path: '', component: HomepageComponent },");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("{ path: '', redirectTo: '', pathMatch: 'full' },");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("{ path: '**', redirectTo: '', pathMatch: 'full' },");
    w.popIndentation();
    w.write("\n");
    w.write("  ");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.routeObj, "description", { file: gFile, line: 10, column: 15 }), "screen", { file: gFile, line: 10, column: 27 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.routeObj, "description", { file: gFile, line: 10, column: 45 }), "screen", { file: gFile, line: 10, column: 57 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("{ path: '");
                     st.write(w, s, g, rc, s.robj);
                     w.write("', component: ");
                     st.write(w, s, g, rc, s.robj);
                     w.write("Component },");
                     st.write(w, s, g, rc, "\n");
            }, [
            { name: "robj"     }
            ])); 
        return st.map(attr, tp);
        })());
    
    
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
    w.write("\n");
    w.write("export class AppRoutingModule {");
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        { name: "routeObj"     }
];
group.addTemplate("/route", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;