/*
 * Template group component
 * Compiled on Tue Jul 02 2019 15:47:20 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component"; 

group.name = "component";





//
// Template /component
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("    ");
    if (st.test(s.object)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "name", { file: gFile, line: 2, column: 24 }), "lower", { file: gFile, line: 2, column: 29 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import{Component, Inject, OnInit}from '@angular/core';");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("import{ Router, NavigationEnd } from '@angular/router';");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("@Component({");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("selector: 'app-");
                     w.popIndentation();
                     st.write(w, s, g, rc, s.value);
                     w.write("',");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("templateUrl: './");
                     w.popIndentation();
                     st.write(w, s, g, rc, s.value);
                     w.write(".component.html',");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("styleUrls: ['./");
                     w.popIndentation();
                     st.write(w, s, g, rc, s.value);
                     w.write(".component.css']");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}\\)");
                     w.popIndentation();
                     w.write("\n");
                     w.write("     ");
            }, [
            { name: "value"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("     ");
    if (st.test(s.object)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "name", { file: gFile, line: 11, column: 25 }), "upper", { file: gFile, line: 11, column: 30 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("export class ");
                     st.write(w, s, g, rc, s.value);
                     w.write(" implements OnInit{");
                     w.write("\n");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.write("    ");
            }, [
            { name: "value"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("   ");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/component", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;