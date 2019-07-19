/*
 * Template group modify_app_module
 * Compiled on Thu Jul 18 2019 20:15:55 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "modify_app_module"; 

group.name = "modify_app_module";





//
// Template /modify_app_module
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
            
                     st.write(w, s, g, rc, s.name);
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
    w.write("declarations: [\n");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "declarations", { file: gFile, line: 5, column: 33 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.modules, "declarations", { file: gFile, line: 5, column: 56 });
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
    w.write("imports: [\n");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "imports", { file: gFile, line: 6, column: 28 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.modules, "imports", { file: gFile, line: 6, column: 46 });
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
    w.write("providers: [\n");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "providers", { file: gFile, line: 7, column: 30 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.modules, "providers", { file: gFile, line: 7, column: 50 });
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
    w.write("bootstrap: [\n");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "boostrap", { file: gFile, line: 8, column: 30 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.modules, "boostrap", { file: gFile, line: 8, column: 49 });
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
group.addTemplate("/modify_app_module", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;