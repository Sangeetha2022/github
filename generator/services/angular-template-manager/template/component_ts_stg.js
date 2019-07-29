/*
 * Template group component_ts
 * Compiled on Mon Jul 29 2019 11:18:24 GMT+0530 (India Standard Time)
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
    
    if (st.test(st.prop(s, g, rc, s.object, "importDependency", { file: gFile, line: 2, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "importDependency", { file: gFile, line: 2, column: 37 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyname", { file: gFile, line: 2, column: 77 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyPath", { file: gFile, line: 2, column: 108 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "importComponent", { file: gFile, line: 3, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "importComponent", { file: gFile, line: 3, column: 36 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "classname", { file: gFile, line: 3, column: 75 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "path", { file: gFile, line: 3, column: 101 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "scriptVariable", { file: gFile, line: 5, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "scriptVariable", { file: gFile, line: 5, column: 35 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("declare var ");
                     st.write(w, s, g, rc, s.name);
                     w.write(": any;");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("@Component({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector: 'app-");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "folderName", { file: gFile, line: 7, column: 25 }));
    w.write("',");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("templateUrl: './");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "folderName", { file: gFile, line: 8, column: 26 }));
    w.write(".component.html',");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("styleUrls: ['./");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "folderName", { file: gFile, line: 9, column: 25 }));
    w.write(".component.scss']");
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, s.className);
    w.write("Component implements OnInit {");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "componentVariable", { file: gFile, line: 12, column: 11 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "componentVariable", { file: gFile, line: 13, column: 8 });
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
    if (st.test(st.prop(s, g, rc, s.object, "componentConstructorParams", { file: gFile, line: 16, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "componentConstructorParams", { file: gFile, line: 16, column: 47 });
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
    if (st.test(st.prop(s, g, rc, s.object, "componentOnInit", { file: gFile, line: 20, column: 15 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "componentOnInit", { file: gFile, line: 20, column: 40 });
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
    if (st.test(st.prop(s, g, rc, s.object, "componentMethod", { file: gFile, line: 23, column: 16 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "componentMethod", { file: gFile, line: 23, column: 41 });
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
{ name: "object"     }
];
group.addTemplate("/component_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;