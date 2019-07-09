/*
 * Template group app_module
 * Compiled on Fri Jul 05 2019 18:43:22 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_module"; 

group.name = "app_module";





//
// Template /app_module
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(st.prop(s, g, rc, s.modules, "importDependency", { file: gFile, line: 2, column: 12 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.modules, "importDependency", { file: gFile, line: 2, column: 39 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyname", { file: gFile, line: 2, column: 79 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyPath", { file: gFile, line: 2, column: 110 }));
                     w.write("';");
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
    if (st.test(st.prop(s, g, rc, s.modules, "declarations", { file: gFile, line: 5, column: 29 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "declarations", { file: gFile, line: 5, column: 56 }));
        w.write("\n");
    
    
    }
    w.write("],");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("imports: [");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "imports", { file: gFile, line: 6, column: 24 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "imports", { file: gFile, line: 6, column: 46 }));
        w.write("\n");
    
    
    }
    w.write("],");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("providers: [");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "providers", { file: gFile, line: 7, column: 26 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "providers", { file: gFile, line: 7, column: 50 }));
        w.write("\n");
    
    
    }
    w.write("],");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("bootstrap: [");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "bootstrap", { file: gFile, line: 8, column: 26 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "bootstrap", { file: gFile, line: 8, column: 50 }));
        w.write("\n");
    
    
    }
    w.write("]");
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "className", { file: gFile, line: 10, column: 22 }));
    w.write("Module { }");
    w.write("\n");
};
r.args = [
        { name: "modules"     }
];
group.addTemplate("/app_module", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;