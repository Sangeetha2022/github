/*
 * Template group component_module
 * Compiled on Wed Sep 11 2019 17:17:32 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component_module"; 

group.name = "component_module";





//
// Template /component_module
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
    w.write("imports: [");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "imports", { file: gFile, line: 5, column: 24 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "imports", { file: gFile, line: 5, column: 46 }));
        w.write("\n");
    
    
    }
    w.write("],");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("declarations: [");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "declarations", { file: gFile, line: 6, column: 29 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "declarations", { file: gFile, line: 6, column: 56 }));
        w.write("\n");
    
    
    }
    w.write("]");
    if (st.test(st.prop(s, g, rc, s.modules, "exports", { file: gFile, line: 6, column: 93 }))) {
    
        w.write(",");
    
    
    }
    w.write(",");
    w.write("\n");
    w.write("  ");
    if (st.test(st.prop(s, g, rc, s.modules, "exports", { file: gFile, line: 7, column: 14 }))) {
    
        w.write("exports: [\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "exports", { file: gFile, line: 7, column: 46 }));
        w.write("\n],");
    
    
    }
    w.write("\n");
    w.write("  ");
    if (st.test(st.prop(s, g, rc, s.modules, "entryComponents", { file: gFile, line: 8, column: 14 }))) {
    
        w.write("entryComponents: [\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "entryComponents", { file: gFile, line: 8, column: 62 }));
        w.write("\n],");
    
    
    }
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "className", { file: gFile, line: 10, column: 22 }));
    w.write("Module { }");
};
r.args = [
        { name: "modules"     }
];
group.addTemplate("/component_module", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;