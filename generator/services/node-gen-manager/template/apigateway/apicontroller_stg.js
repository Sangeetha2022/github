/*
 * Template group apicontroller
 * Compiled on Fri Jul 12 2019 12:05:17 GMT+0530 (India Standard Time)
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
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 24, column: 11 }), "camunda", { file: gFile, line: 24, column: 22 }), "login", { file: gFile, line: 24, column: 30 }))) {
    
        w.write("\n");
        w.pushIndentation("  ");
        w.write("public ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 25, column: 17 }), "camunda", { file: gFile, line: 25, column: 28 }), "login", { file: gFile, line: 25, column: 36 }), "methodName", { file: gFile, line: 25, column: 42 }));
        w.write("(req: Request, res: Response) {");
        w.write("\n");
        w.pushIndentation("        ");
        w.write("new ApiAdaptar().");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 26, column: 33 }), "camunda", { file: gFile, line: 26, column: 44 }), "login", { file: gFile, line: 26, column: 52 }), "apiAction", { file: gFile, line: 26, column: 58 }));
        w.write("(");
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 26, column: 77 }), "camunda", { file: gFile, line: 26, column: 88 }), "login", { file: gFile, line: 26, column: 96 }), "constantName", { file: gFile, line: 26, column: 102 }));
        w.write(".");
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 26, column: 124 }), "camunda", { file: gFile, line: 26, column: 135 }), "login", { file: gFile, line: 26, column: 143 }), "nodeName", { file: gFile, line: 26, column: 149 }));
        w.write(" + `");
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 26, column: 170 }), "camunda", { file: gFile, line: 26, column: 181 }), "login", { file: gFile, line: 26, column: 189 }), "methodUrl", { file: gFile, line: 26, column: 195 }));
        w.write("` ");
        if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 26, column: 218 }), "camunda", { file: gFile, line: 26, column: 229 }), "login", { file: gFile, line: 26, column: 237 }), "requestParameter", { file: gFile, line: 26, column: 243 }))) {
        
            w.write(", ");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 26, column: 271 }), "camunda", { file: gFile, line: 26, column: 282 }), "login", { file: gFile, line: 26, column: 290 }), "requestParameter", { file: gFile, line: 26, column: 296 }));
        
        
        }
        w.write(").then(async (");
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 26, column: 342 }), "camunda", { file: gFile, line: 26, column: 353 }), "login", { file: gFile, line: 26, column: 361 }), "responseParameter", { file: gFile, line: 26, column: 367 }));
        w.write(") => {");
        w.write("\n");
        w.pushIndentation("            ");
        w.write("// @ts-ignore");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("const token = ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 28, column: 34 }), "camunda", { file: gFile, line: 28, column: 45 }), "login", { file: gFile, line: 28, column: 53 }), "responseParameter", { file: gFile, line: 28, column: 59 }));
        w.write(".body.Idtoken;");
        w.write("\n");
        w.pushIndentation("            ");
        w.write("// @ts-ignore");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("if (");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 30, column: 24 }), "camunda", { file: gFile, line: 30, column: 35 }), "login", { file: gFile, line: 30, column: 43 }), "responseParameter", { file: gFile, line: 30, column: 49 }));
        w.write(".body.Idtoken === null || ");
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 30, column: 101 }), "camunda", { file: gFile, line: 30, column: 112 }), "login", { file: gFile, line: 30, column: 120 }), "responseParameter", { file: gFile, line: 30, column: 126 }));
        w.write(".body.Idtoken === '' || ");
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 30, column: 176 }), "camunda", { file: gFile, line: 30, column: 187 }), "login", { file: gFile, line: 30, column: 195 }), "responseParameter", { file: gFile, line: 30, column: 201 }));
        w.write(".body.Idtoken === undefined) {");
        w.write("\n");
        w.pushIndentation("                ");
        w.write("req.baseUrl === '/mobile' ? res.send({\"Userdetails\": ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 31, column: 77 }), "camunda", { file: gFile, line: 31, column: 88 }), "login", { file: gFile, line: 31, column: 96 }), "responseParameter", { file: gFile, line: 31, column: 102 }));
        w.write("}) :");
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("req.baseUrl === '/desktop' ? res.send({\"Userdetails\": ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 32, column: 82 }), "camunda", { file: gFile, line: 32, column: 93 }), "login", { file: gFile, line: 32, column: 101 }), "responseParameter", { file: gFile, line: 32, column: 107 }));
        w.write("}) : res.send(null)");
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("const authVerification = await this.Jwtverify(token, ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 34, column: 77 }), "camunda", { file: gFile, line: 34, column: 88 }), "login", { file: gFile, line: 34, column: 96 }), "responseParameter", { file: gFile, line: 34, column: 102 }));
        w.write(");");
        w.write("\n");
        w.pushIndentation("                ");
        w.write("req.baseUrl === '/mobile' ? res.send(authVerification) :");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("req.baseUrl === '/desktop' ? res.send(authVerification) : res.send(null)");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("}");
        w.popIndentation();
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
        w.write("\n");
    
    
    }
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 44, column: 11 }), "camunda", { file: gFile, line: 44, column: 22 }), "consent", { file: gFile, line: 44, column: 30 }))) {
    
        w.write("\n");
        w.pushIndentation("   ");
        w.write("public ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 45, column: 18 }), "camunda", { file: gFile, line: 45, column: 29 }), "consent", { file: gFile, line: 45, column: 37 }), "methodName", { file: gFile, line: 45, column: 45 }));
        w.write("(req: Request, res: Response) {");
        w.write("\n");
        w.pushIndentation("        ");
        w.write("new ApiAdaptar().");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 46, column: 33 }), "camunda", { file: gFile, line: 46, column: 44 }), "consent", { file: gFile, line: 46, column: 52 }), "apiAction", { file: gFile, line: 46, column: 60 }));
        w.write("(");
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 46, column: 79 }), "camunda", { file: gFile, line: 46, column: 90 }), "consent", { file: gFile, line: 46, column: 98 }), "constantName", { file: gFile, line: 46, column: 106 }));
        w.write(".");
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 46, column: 128 }), "camunda", { file: gFile, line: 46, column: 139 }), "consent", { file: gFile, line: 46, column: 147 }), "nodeName", { file: gFile, line: 46, column: 155 }));
        w.write(" + `");
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 46, column: 176 }), "camunda", { file: gFile, line: 46, column: 187 }), "consent", { file: gFile, line: 46, column: 195 }), "methodUrl", { file: gFile, line: 46, column: 203 }));
        w.write("` ");
        if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 46, column: 226 }), "camunda", { file: gFile, line: 46, column: 237 }), "consent", { file: gFile, line: 46, column: 245 }), "requestParameter", { file: gFile, line: 46, column: 253 }))) {
        
            w.write(", ");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 46, column: 281 }), "camunda", { file: gFile, line: 46, column: 292 }), "consent", { file: gFile, line: 46, column: 300 }), "requestParameter", { file: gFile, line: 46, column: 308 }));
        
        
        }
        w.write(").then(async (");
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 46, column: 354 }), "camunda", { file: gFile, line: 46, column: 365 }), "consent", { file: gFile, line: 46, column: 373 }), "responseParameter", { file: gFile, line: 46, column: 381 }));
        w.write(") => {");
        w.write("\n");
        w.pushIndentation("            ");
        w.write("// @ts-ignore");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("const token = ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 48, column: 34 }), "camunda", { file: gFile, line: 48, column: 45 }), "consent", { file: gFile, line: 48, column: 53 }), "responseParameter", { file: gFile, line: 48, column: 61 }));
        w.write(".body.Idtoken;");
        w.write("\n");
        w.pushIndentation("            ");
        w.write("const authVerification = await this.Jwtverify(token, ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 49, column: 73 }), "camunda", { file: gFile, line: 49, column: 84 }), "consent", { file: gFile, line: 49, column: 92 }), "responseParameter", { file: gFile, line: 49, column: 100 }));
        w.write(");");
        w.write("\n");
        w.pushIndentation("            ");
        w.write("req.baseUrl === '/mobile' ? res.send(authVerification) :");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("req.baseUrl === '/desktop' ? res.send(authVerification) : res.send(null)");
        w.popIndentation();
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
        w.write("\n");
    
    
    }
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 58, column: 11 }), "camunda", { file: gFile, line: 58, column: 22 }), "isVerify", { file: gFile, line: 58, column: 30 }))) {
    
        w.write("\n");
        w.write("public Jwtverify(Idtoken, result) {");
        w.write("\n");
        w.pushIndentation("        ");
        w.write("return new Promise(resolve => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("jwt.verify(Idtoken, 'geppettosecret', (err, decoded) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("if (err) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("return ({ 'status': 'Unauthorized', 'error': err, 'Userdetails': result });");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("} else {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("new ApiAdaptar().post(Constant.AUTHPROXYURL + `/proxy`, decoded).then((response) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                        ");
        w.write("const temp = {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                            ");
        w.write("\"Access\": JSON.parse(JSON.stringify(response)).body,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                            ");
        w.write("\"Userdetails\": result");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                        ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                        ");
        w.write("resolve(temp);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("})");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("}");
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
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
    
    
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