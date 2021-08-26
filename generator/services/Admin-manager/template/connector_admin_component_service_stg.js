/*
 * Template group connector_admin_component_service
 * Compiled on Fri May 28 2021 18:11:37 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "connector_admin_component_service"; 

group.name = "connector_admin_component_service";





//
// Template /connector_admin_component_service
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { Injectable } from '@angular/core';");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "importDependency", { file: gFile, line: 3, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "importDependency", { file: gFile, line: 3, column: 37 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyName", { file: gFile, line: 3, column: 77 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyPath", { file: gFile, line: 3, column: 108 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "importComponent", { file: gFile, line: 4, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "importComponent", { file: gFile, line: 4, column: 36 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "classname", { file: gFile, line: 4, column: 75 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "path", { file: gFile, line: 4, column: 101 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("@Injectable({");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("providedIn: 'root'");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 9, column: 21 }));
    w.write("Service {");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "serviceVariable", { file: gFile, line: 10, column: 11 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "serviceVariable", { file: gFile, line: 11, column: 8 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("public ");
                     st.write(w, s, g, rc, s.name);
                     w.write(";");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
        w.write("\n");
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write("constructor(");
    w.popIndentation();
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "serviceConstructorParams", { file: gFile, line: 14, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "serviceConstructorParams", { file: gFile, line: 14, column: 45 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ",\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write(") { }");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "serviceMethod", { file: gFile, line: 17, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "serviceMethod", { file: gFile, line: 17, column: 34 });
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
    w.write("}");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/connector_admin_component_service", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;