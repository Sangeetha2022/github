/*
 * Template group connector_admin_component_module
 * Compiled on Mon May 31 2021 20:02:13 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "connector_admin_component_module"; 

group.name = "connector_admin_component_module";





//
// Template /connector_admin_component_module
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
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyName", { file: gFile, line: 2, column: 79 }));
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
    w.write("imports: [\n");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "imports", { file: gFile, line: 5, column: 28 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.modules, "imports", { file: gFile, line: 5, column: 46 });
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
    w.write("],");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("declarations: [\n");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "declarations", { file: gFile, line: 6, column: 33 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.modules, "declarations", { file: gFile, line: 6, column: 56 });
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
    w.write("]");
    if (st.test(st.prop(s, g, rc, s.modules, "exports", { file: gFile, line: 6, column: 125 }))) {
    
        w.write(",");
    
    
    }
    w.write("\n");
    w.write("  ");
    if (st.test(st.prop(s, g, rc, s.modules, "exports", { file: gFile, line: 7, column: 14 }))) {
    
        w.write("exports: [\n");
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.modules, "exports", { file: gFile, line: 7, column: 46 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ",\n"});
        w.write("\n]");
    
    
    }
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "className", { file: gFile, line: 9, column: 22 }));
    w.write("Module { }");
};
r.args = [
        { name: "modules"     }
];
group.addTemplate("/connector_admin_component_module", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;