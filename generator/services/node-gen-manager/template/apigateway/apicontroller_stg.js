/*
 * Template group apicontroller
 * Compiled on Mon Jun 17 2019 13:20:13 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "apicontroller"; 

group.name = "apicontroller";





//
// Template /apicontroller
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(st.prop(s, g, rc, s.object, "import", { file: gFile, line: 2, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "import", { file: gFile, line: 2, column: 27 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "name", { file: gFile, line: 2, column: 67 }));
                     w.write(" from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "path", { file: gFile, line: 2, column: 91 }));
                     w.write("';");
            }, [
            { name: "dependency"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 4, column: 21 }));
    w.write("Controller ");
    if (st.test(st.prop(s, g, rc, s.object, "implementName", { file: gFile, line: 4, column: 53 }))) {
    
        w.write("implements ");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "implementName", { file: gFile, line: 4, column: 87 }));
    
    
    }
    w.write(" {");
    w.write("\n");
    w.pushIndentation("      ");
    w.write("public router = express.Router();");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("constructor() {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.initializeRoutes();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("private initializeRoutes() {");
    w.popIndentation();
    w.write("\n");
    w.write("        ");
    if (st.test(st.prop(s, g, rc, s.object, "router", { file: gFile, line: 12, column: 19 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "router", { file: gFile, line: 12, column: 35 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("this.router.");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.router, "apiAction", { file: gFile, line: 12, column: 72 }));
                     w.write("('");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.router, "routeUrl", { file: gFile, line: 12, column: 92 }));
                     w.write("', this.");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.router, "methodName", { file: gFile, line: 12, column: 117 }));
                     w.write(");");
            }, [
            { name: "router"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "methods", { file: gFile, line: 15, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "methods", { file: gFile, line: 15, column: 28 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("public ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "methodName", { file: gFile, line: 15, column: 64 }));
                     w.write("(req: Request, res: Response) {");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("new ApiAdaptar().");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "apiAction", { file: gFile, line: 16, column: 34 }));
                     w.write("(");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "constantName", { file: gFile, line: 16, column: 54 }));
                     w.write(".");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "nodeName", { file: gFile, line: 16, column: 77 }));
                     w.write(" + `");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "methodUrl", { file: gFile, line: 16, column: 99 }));
                     w.write("` ");
                     if (st.test(st.prop(s, g, rc, s.methods, "requestParameter", { file: gFile, line: 16, column: 123 }))) {
                     
                         w.write(", ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "requestParameter", { file: gFile, line: 16, column: 152 }));
                     
                     
                     }
                     w.write(").then(");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "responseParameter", { file: gFile, line: 16, column: 192 }));
                     w.write(" => {");
                     w.write("\n");
                     w.pushIndentation("              ");
                     w.write("req.baseUrl === '/mobile' ? res.send(");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "responseParameter", { file: gFile, line: 17, column: 60 }));
                     w.write(") :");
                     w.write("\n");
                     w.pushIndentation("              ");
                     w.write("req.baseUrl === '/desktop' ? res.send(");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "responseParameter", { file: gFile, line: 18, column: 61 }));
                     w.write(") : res.send(null)");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("}).catch(err => {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("            ");
                     w.write("res.send(err);");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("});");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}");
                     w.popIndentation();
            }, [
            { name: "methods"     }
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
        { name: "object"     }
];
group.addTemplate("/apicontroller", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;