/*
 * Template group service
 * Compiled on Wed Jun 05 2019 12:13:26 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "service"; 

group.name = "service";





//
// Template /service
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(st.prop(s, g, rc, s.object, "import", { file: gFile, line: 2, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "import", { file: gFile, line: 2, column: 27 }), "dependencies", { file: gFile, line: 2, column: 34 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "name", { file: gFile, line: 2, column: 80 }));
                     w.write(" from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "path", { file: gFile, line: 2, column: 104 }));
                     w.write("';");
            }, [
            { name: "dependency"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 3, column: 11 }), "outsideClass", { file: gFile, line: 3, column: 20 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 3, column: 42 }), "outsideClass", { file: gFile, line: 3, column: 51 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("let ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "variableName", { file: gFile, line: 3, column: 96 }));
                     w.write(" = ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "parentName", { file: gFile, line: 3, column: 125 }));
                     w.write(";");
            }, [
            { name: "variableObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 5, column: 21 }));
    w.write("Service {");
    w.write("\n");
    w.write("    ");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 6, column: 15 }), "insideClass", { file: gFile, line: 6, column: 24 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 6, column: 45 }), "insideClass", { file: gFile, line: 6, column: 54 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("private ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "variableName", { file: gFile, line: 6, column: 102 }));
                     w.write(" = ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "parentName", { file: gFile, line: 6, column: 131 }));
                     w.write(";");
            }, [
            { name: "variableObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("    ");
    w.write("constructor() { }");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.object, "flowAction", { file: gFile, line: 9, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "flowAction", { file: gFile, line: 9, column: 31 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("public ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 9, column: 69 }));
                     w.write("(req: Request, callback){");
                     w.write("\n");
                     w.write("     ");
                     if (st.test(st.prop(s, g, rc, s.flowObj, "variable", { file: gFile, line: 10, column: 17 }))) {
                     
                         w.write("const ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "variable", { file: gFile, line: 10, column: 42 }));
                     
                     
                     }
                     w.write("\n");
                     w.pushIndentation("     ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 11, column: 13 }));
                     w.popIndentation();
                     w.write(".");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 11, column: 38 }));
                     w.write("(");
                     if (st.test(st.prop(s, g, rc, s.flowObj, "requestParameter", { file: gFile, line: 11, column: 62 }))) {
                     
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "requestParameter", { file: gFile, line: 11, column: 89 }));
                         w.write(",");
                     
                     
                     }
                     w.write("(");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "responseVariable", { file: gFile, line: 11, column: 124 }));
                     w.write(")=>{");
                     w.write("\n");
                     w.pushIndentation("         ");
                     w.write("callback(");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "responseVariable", { file: gFile, line: 12, column: 27 }));
                     w.write(");");
                     w.write("\n");
                     w.pushIndentation("         ");
                     w.write("});");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}");
                     w.popIndentation();
            }, [
            { name: "flowObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("}");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/service", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;