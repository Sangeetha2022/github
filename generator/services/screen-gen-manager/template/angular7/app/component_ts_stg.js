/*
 * Template group component_ts
 * Compiled on Thu Mar 21 2019 12:08:19 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component_ts"; 

group.name = "component_ts";





//
// Template /component_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { Component, OnInit } from '@angular/core';");
    w.write("\n");
    if (st.test(s.importDependency)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.importDependency;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyname", { file: gFile, line: 3, column: 63 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyPath", { file: gFile, line: 3, column: 94 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    if (st.test(s.importComponent)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.importComponent;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "classname", { file: gFile, line: 4, column: 61 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "path", { file: gFile, line: 4, column: 87 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("@Component({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector: 'app-");
    w.popIndentation();
    st.write(w, s, g, rc, s.folderName);
    w.write("',");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("templateUrl: './");
    w.popIndentation();
    st.write(w, s, g, rc, s.folderName);
    w.write(".component.html',");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("styleUrls: ['./");
    w.popIndentation();
    st.write(w, s, g, rc, s.folderName);
    w.write(".component.scss']");
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, s.className);
    w.write("Component implements OnInit {");
    w.write("\n");
    if (st.test(s.componentVariable)) {
    
        w.write("\n");
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.componentVariable;
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
    if (st.test(s.componentConstructorParams)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.componentConstructorParams;
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
    w.pushIndentation("  ");
    w.write(") { }");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("ngOnInit() {");
    w.popIndentation();
    w.write("\n");
    w.write("    ");
    if (st.test(s.componentOnInit)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.componentOnInit;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
                     w.write(";");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("     ");
    if (st.test(s.componentMethod)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.componentMethod;
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
    w.write("\n");
};
r.args = [
        { name: "className"     },
{ name: "folderName"     },
{ name: "importDependency"     },
{ name: "importComponent"     },
{ name: "componentVariable"     },
{ name: "componentConstructorParams"     },
{ name: "componentOnInit"     },
{ name: "componentMethod"     }
];
group.addTemplate("/component_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;