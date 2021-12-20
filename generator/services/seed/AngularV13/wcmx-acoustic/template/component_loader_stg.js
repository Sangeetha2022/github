/*
 * Template group component_loader
 * Compiled on Mon Nov 04 2019 18:55:57 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component_loader"; 

group.name = "component_loader";





//
// Template /component_loader
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(s.object)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.object;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("{");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("componentId: '");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.component, "value", { file: gFile, line: 3, column: 29 }));
                     w.write("',");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("path: '");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.component, "value", { file: gFile, line: 4, column: 22 }));
                     w.write("', // some globally-unique identifier, used internally by the router");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("loadChildren: () => import('./");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.component, "value", { file: gFile, line: 5, column: 45 }));
                     w.write("/");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.component, "value", { file: gFile, line: 5, column: 63 }));
                     w.write(".module').then(m => m.");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.component, "componentName", { file: gFile, line: 5, column: 102 }));
                     w.write("Module)");
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("},");
                     w.popIndentation();
            }, [
            { name: "component"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/component_loader", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;