/*
 * Template group modify_app_routing
 * Compiled on Tue Jul 16 2019 12:39:03 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "modify_app_routing"; 

group.name = "modify_app_routing";





//
// Template /modify_app_routing
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(st.prop(s, g, rc, s.routing, "importDependency", { file: gFile, line: 2, column: 12 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.routing, "importDependency", { file: gFile, line: 2, column: 39 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
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
    if (st.test(st.prop(s, g, rc, s.routing, "path", { file: gFile, line: 5, column: 14 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.routing, "path", { file: gFile, line: 5, column: 29 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ",\n"});
        w.write("\n");
    
    
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
group.addTemplate("/modify_app_routing", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;