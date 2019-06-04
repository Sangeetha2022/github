/*
 * Template group route
 * Compiled on Mon Jun 03 2019 16:04:26 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "route"; 

group.name = "route";





//
// Template /route
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { Request, Response, NextFunction } from \"express\";");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "import", { file: gFile, line: 3, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "import", { file: gFile, line: 3, column: 27 }), "dependencies", { file: gFile, line: 3, column: 34 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "name", { file: gFile, line: 3, column: 80 }));
                     w.write(" from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "path", { file: gFile, line: 3, column: 104 }));
                     w.write("';");
            }, [
            { name: "dependency"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 4, column: 11 }), "outsideClass", { file: gFile, line: 4, column: 20 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 4, column: 42 }), "outsideClass", { file: gFile, line: 4, column: 51 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("let ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "variableName", { file: gFile, line: 4, column: 96 }));
                     w.write(" = ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "parentName", { file: gFile, line: 4, column: 125 }));
                     w.write(";");
            }, [
            { name: "variableObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("export class Routes {");
    w.write("\n");
    w.write("    ");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 7, column: 15 }), "insideClass", { file: gFile, line: 7, column: 24 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 7, column: 45 }), "insideClass", { file: gFile, line: 7, column: 54 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("private ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "variableName", { file: gFile, line: 7, column: 102 }));
                     w.write(" = ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "parentName", { file: gFile, line: 7, column: 131 }));
                     w.write(";");
            }, [
            { name: "variableObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("    ");
    w.write("public routes(app): void {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("app.route('/health/entity-service').get((req: Request, res: Response) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("res.status(200).send({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("status: 'up'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.write("        ");
    if (st.test(st.prop(s, g, rc, s.object, "flowAction", { file: gFile, line: 15, column: 19 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "flowAction", { file: gFile, line: 15, column: 39 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("app.route('");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "routeUrl", { file: gFile, line: 15, column: 81 }));
                     w.write("').");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "apiAction", { file: gFile, line: 15, column: 102 }));
                     w.write("(this.");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "variableName", { file: gFile, line: 15, column: 127 }));
                     w.write(".");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 15, column: 150 }));
                     w.write(");");
            }, [
            { name: "flowObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("     ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("}");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/route", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;