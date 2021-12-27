/*
 * Template group apicontroller
 * Compiled on Fri Oct 09 2020 21:26:11 GMT+0530 (India Standard Time)
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
                    { name: "dependency" }
                ]));
                return st.map(attr, tp);
            })(), { separator: "\n" });


        }
        w.write("\n");
        w.write("import { CustomLogger } from '../config/Logger'");
        w.write("\n");
        w.write("\n");
        w.write("export class ");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 5, column: 21 }));
        w.write("Controller ");
        if (st.test(st.prop(s, g, rc, s.object, "implementName", { file: gFile, line: 5, column: 53 }))) {

            w.write("implements ");
            st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "implementName", { file: gFile, line: 5, column: 87 }));


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
        if (st.test(st.prop(s, g, rc, s.object, "router", { file: gFile, line: 13, column: 19 }))) {

            st.write(w, s, g, rc, (function() {
                var tp = [],
                    attr = st.prop(s, g, rc, s.object, "router", { file: gFile, line: 13, column: 35 });
                tp.push(st.makeSubTemplate(g, function(w, rc) {
                    var g = this.owningGroup,
                        s = this.scope;

                    w.write("this.router.");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.router, "apiAction", { file: gFile, line: 13, column: 72 }));
                    w.write("('");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.router, "routeUrl", { file: gFile, line: 13, column: 92 }));
                    w.write("', this.");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.router, "methodName", { file: gFile, line: 13, column: 117 }));
                    w.write(");");
                }, [
                    { name: "router" }
                ]));
                return st.map(attr, tp);
            })(), { separator: "\n" });


        }
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        if (st.test(st.prop(s, g, rc, s.object, "methods", { file: gFile, line: 16, column: 11 }))) {

            st.write(w, s, g, rc, (function() {
                var tp = [],
                    attr = st.prop(s, g, rc, s.object, "methods", { file: gFile, line: 16, column: 28 });
                tp.push(st.makeSubTemplate(g, function(w, rc) {
                    var g = this.owningGroup,
                        s = this.scope;

                    w.write("public ");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "methodName", { file: gFile, line: 16, column: 64 }));
                    w.write("(req: Request, res: Response) {");
                    w.write("\n");
                    w.pushIndentation("            ");
                    w.write("new CustomLogger().showLogger('info', 'Enter into ");
                    w.popIndentation();
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 17, column: 70 }));
                    w.write("Controller.ts: ");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "methodName", { file: gFile, line: 17, column: 104 }));
                    w.write("');");
                    w.write("\n");
                    w.pushIndentation("        ");
                    w.write("new ApiAdapter().");
                    w.popIndentation();
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "apiAction", { file: gFile, line: 18, column: 34 }));
                    w.write("(");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "constantName", { file: gFile, line: 18, column: 54 }));
                    w.write(".");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "nodeName", { file: gFile, line: 18, column: 77 }));
                    w.write(" + `");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "methodUrl", { file: gFile, line: 18, column: 99 }));
                    w.write("` ");
                    if (st.test(st.prop(s, g, rc, s.methods, "requestParameter", { file: gFile, line: 18, column: 123 }))) {

                        w.write(", ");
                        st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "requestParameter", { file: gFile, line: 18, column: 152 }));


                    }
                    w.write(")");
                    w.write("\n");
                    w.pushIndentation("        ");
                    w.write(".then((res: any) => res.response.json()).then(");
                    w.popIndentation();
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "responseParameter", { file: gFile, line: 19, column: 63 }));
                    w.write(" => {");
                    w.write("\n");
                    w.pushIndentation("              ");
                    w.write("req.baseUrl === '/mobile' ? res.send(");
                    w.popIndentation();
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "responseParameter", { file: gFile, line: 20, column: 60 }));
                    w.write(") :");
                    w.write("\n");
                    w.pushIndentation("              ");
                    w.write("req.baseUrl === '/desktop' ? res.send(");
                    w.popIndentation();
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "responseParameter", { file: gFile, line: 21, column: 61 }));
                    w.write(") : res.send(null)");
                    w.write("\n");
                    w.pushIndentation("            ");
                    w.write("new CustomLogger().showLogger('info', 'Exit from ");
                    w.popIndentation();
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 22, column: 69 }));
                    w.write("Controller.ts: ");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "methodName", { file: gFile, line: 22, column: 103 }));
                    w.write("');");
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
                    { name: "methods" }
                ]));
                return st.map(attr, tp);
            })(), { separator: "\n" });


        }
        w.write("\n");
        w.write("\n");
        if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 28, column: 11 }), "camunda", { file: gFile, line: 28, column: 22 }), "login", { file: gFile, line: 28, column: 30 }))) {

            w.write("\n");
            w.pushIndentation("  ");
            w.write("public ");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 29, column: 17 }), "camunda", { file: gFile, line: 29, column: 28 }), "login", { file: gFile, line: 29, column: 36 }), "methodName", { file: gFile, line: 29, column: 42 }));
            w.write("(req: Request, res: Response) {");
            w.write("\n");
            w.pushIndentation("                  ");
            w.write("new CustomLogger().showLogger('info', 'Enter into ");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 30, column: 76 }));
            w.write("Controller.ts: ");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 30, column: 109 }), "camunda", { file: gFile, line: 30, column: 120 }), "login", { file: gFile, line: 30, column: 128 }), "methodName", { file: gFile, line: 30, column: 134 }));
            w.write("');");
            w.write("\n");
            w.pushIndentation("        ");
            w.write("new ApiAdapter().");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 31, column: 33 }), "camunda", { file: gFile, line: 31, column: 44 }), "login", { file: gFile, line: 31, column: 52 }), "apiAction", { file: gFile, line: 31, column: 58 }));
            w.write("(");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 31, column: 77 }), "camunda", { file: gFile, line: 31, column: 88 }), "login", { file: gFile, line: 31, column: 96 }), "constantName", { file: gFile, line: 31, column: 102 }));
            w.write(".");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 31, column: 124 }), "camunda", { file: gFile, line: 31, column: 135 }), "login", { file: gFile, line: 31, column: 143 }), "nodeName", { file: gFile, line: 31, column: 149 }));
            w.write(" + `");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 31, column: 170 }), "camunda", { file: gFile, line: 31, column: 181 }), "login", { file: gFile, line: 31, column: 189 }), "methodUrl", { file: gFile, line: 31, column: 195 }));
            w.write("` ");
            if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 31, column: 218 }), "camunda", { file: gFile, line: 31, column: 229 }), "login", { file: gFile, line: 31, column: 237 }), "requestParameter", { file: gFile, line: 31, column: 243 }))) {

                w.write(", ");
                st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 31, column: 271 }), "camunda", { file: gFile, line: 31, column: 282 }), "login", { file: gFile, line: 31, column: 290 }), "requestParameter", { file: gFile, line: 31, column: 296 }));


            }
            w.write(")");
            w.write("\n");
            w.pushIndentation("        ");
            w.write(".then((res: any) => res.response.json())");
            w.popIndentation();
            w.write("\n");
            w.pushIndentation("        ");
            w.write(".then(async (");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 33, column: 29 }), "camunda", { file: gFile, line: 33, column: 40 }), "login", { file: gFile, line: 33, column: 48 }), "responseParameter", { file: gFile, line: 33, column: 54 }));
            w.write(") => {");
            w.write("\n");
            w.pushIndentation("            ");
            w.write("// @ts-ignore");
            w.popIndentation();
            w.write("\n");
            w.pushIndentation("            ");
            w.write("const token = ");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 35, column: 34 }), "camunda", { file: gFile, line: 35, column: 45 }), "login", { file: gFile, line: 35, column: 53 }), "responseParameter", { file: gFile, line: 35, column: 59 }));
            w.write(".Idtoken;");
            w.write("\n");
            w.pushIndentation("            ");
            w.write("// @ts-ignore");
            w.popIndentation();
            w.write("\n");
            w.pushIndentation("            ");
            w.write("if (");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 37, column: 24 }), "camunda", { file: gFile, line: 37, column: 35 }), "login", { file: gFile, line: 37, column: 43 }), "responseParameter", { file: gFile, line: 37, column: 49 }));
            w.write(".Idtoken === null || ");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 37, column: 96 }), "camunda", { file: gFile, line: 37, column: 107 }), "login", { file: gFile, line: 37, column: 115 }), "responseParameter", { file: gFile, line: 37, column: 121 }));
            w.write(".Idtoken === '' || ");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 37, column: 166 }), "camunda", { file: gFile, line: 37, column: 177 }), "login", { file: gFile, line: 37, column: 185 }), "responseParameter", { file: gFile, line: 37, column: 191 }));
            w.write(".Idtoken === undefined) {");
            w.write("\n");
            w.pushIndentation("                ");
            w.write("req.baseUrl === '/mobile' ? res.send({\"Userdetails\": ");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 38, column: 77 }), "camunda", { file: gFile, line: 38, column: 88 }), "login", { file: gFile, line: 38, column: 96 }), "responseParameter", { file: gFile, line: 38, column: 102 }));
            w.write("}) :");
            w.write("\n");
            w.pushIndentation("                    ");
            w.write("req.baseUrl === '/desktop' ? res.send({\"Userdetails\": ");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 39, column: 82 }), "camunda", { file: gFile, line: 39, column: 93 }), "login", { file: gFile, line: 39, column: 101 }), "responseParameter", { file: gFile, line: 39, column: 107 }));
            w.write("}) : res.send(null)");
            w.write("\n");
            w.pushIndentation("            ");
            w.write("} else {");
            w.popIndentation();
            w.write("\n");
            w.write("                          ");
            if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 41, column: 37 }), "camunda", { file: gFile, line: 41, column: 48 }), "isVerify", { file: gFile, line: 41, column: 56 }))) {

                w.write("\n");
                w.pushIndentation("            ");
                w.write("jwt.verify(token, 'geppettosecret', (err, decoded) => {");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                ");
                w.write("if (err) {");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                    ");
                w.write("res.send ({ 'status': 'Unauthorized', 'error': err, 'Userdetails': result });");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                ");
                w.write("} else {");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                    ");
                w.write("new ApiAdapter().post(Constant.AUTHPROXYURL + `/proxy`, decoded)");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                    ");
                w.write(".then((res: any) => res.response.json()).then((response) => {");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                        ");
                w.write("const temp = {");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                            ");
                w.write("\"Access\": JSON.parse(JSON.stringify(response)),");
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
                w.pushIndentation("                ");
                w.write("req.baseUrl === '/mobile' ? res.send(temp) :");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                ");
                w.write("req.baseUrl === '/desktop' ? res.send(temp) : res.send(null)");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                  ");
                w.write("new CustomLogger().showLogger('info', 'Exit from ");
                w.popIndentation();
                st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 54, column: 75 }));
                w.write("Controller.ts: ");
                st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 54, column: 108 }), "camunda", { file: gFile, line: 54, column: 119 }), "login", { file: gFile, line: 54, column: 127 }), "methodName", { file: gFile, line: 54, column: 133 }));
                w.write("');");
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


            }
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
        if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 66, column: 11 }), "camunda", { file: gFile, line: 66, column: 22 }), "consent", { file: gFile, line: 66, column: 30 }))) {

            w.write("\n");
            w.pushIndentation("   ");
            w.write("public ");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 67, column: 18 }), "camunda", { file: gFile, line: 67, column: 29 }), "consent", { file: gFile, line: 67, column: 37 }), "methodName", { file: gFile, line: 67, column: 45 }));
            w.write("(req: Request, res: Response) {");
            w.write("\n");
            w.pushIndentation("                         ");
            w.write("new CustomLogger().showLogger('info', 'Enter into ");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 68, column: 83 }));
            w.write("Controller.ts: ");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 68, column: 116 }), "camunda", { file: gFile, line: 68, column: 127 }), "consent", { file: gFile, line: 68, column: 135 }), "methodName", { file: gFile, line: 68, column: 143 }));
            w.write("');");
            w.write("\n");
            w.pushIndentation("        ");
            w.write("new ApiAdapter().");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 69, column: 33 }), "camunda", { file: gFile, line: 69, column: 44 }), "consent", { file: gFile, line: 69, column: 52 }), "apiAction", { file: gFile, line: 69, column: 60 }));
            w.write("(");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 69, column: 79 }), "camunda", { file: gFile, line: 69, column: 90 }), "consent", { file: gFile, line: 69, column: 98 }), "constantName", { file: gFile, line: 69, column: 106 }));
            w.write(".");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 69, column: 128 }), "camunda", { file: gFile, line: 69, column: 139 }), "consent", { file: gFile, line: 69, column: 147 }), "nodeName", { file: gFile, line: 69, column: 155 }));
            w.write(" + `");
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 69, column: 176 }), "camunda", { file: gFile, line: 69, column: 187 }), "consent", { file: gFile, line: 69, column: 195 }), "methodUrl", { file: gFile, line: 69, column: 203 }));
            w.write("` ");
            if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 69, column: 226 }), "camunda", { file: gFile, line: 69, column: 237 }), "consent", { file: gFile, line: 69, column: 245 }), "requestParameter", { file: gFile, line: 69, column: 253 }))) {

                w.write(", ");
                st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 69, column: 281 }), "camunda", { file: gFile, line: 69, column: 292 }), "consent", { file: gFile, line: 69, column: 300 }), "requestParameter", { file: gFile, line: 69, column: 308 }));


            }
            w.write(")");
            w.write("\n");
            w.pushIndentation("        ");
            w.write(".then((res: any) => res.response.json())");
            w.popIndentation();
            w.write("\n");
            w.pushIndentation("        ");
            w.write(".then(async (");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 71, column: 29 }), "camunda", { file: gFile, line: 71, column: 40 }), "consent", { file: gFile, line: 71, column: 48 }), "responseParameter", { file: gFile, line: 71, column: 56 }));
            w.write(") => {");
            w.write("\n");
            w.pushIndentation("            ");
            w.write("// @ts-ignore");
            w.popIndentation();
            w.write("\n");
            w.pushIndentation("            ");
            w.write("const token = ");
            w.popIndentation();
            st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 73, column: 34 }), "camunda", { file: gFile, line: 73, column: 45 }), "consent", { file: gFile, line: 73, column: 53 }), "responseParameter", { file: gFile, line: 73, column: 61 }));
            w.write(".Idtoken;");
            w.write("\n");
            w.write("            ");
            if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 74, column: 23 }), "camunda", { file: gFile, line: 74, column: 34 }), "isVerify", { file: gFile, line: 74, column: 42 }))) {

                w.write("\n");
                w.pushIndentation("            ");
                w.write("jwt.verify(token, 'geppettosecret', (err, decoded) => {");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                ");
                w.write("if (err) {");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                    ");
                w.write("res.send ({ 'status': 'Unauthorized', 'error': err, 'Userdetails': result });");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                ");
                w.write("} else {");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                    ");
                w.write("new ApiAdapter().post(Constant.AUTHPROXYURL + `/proxy`, decoded)");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                    ");
                w.write(".then((res: any) => res.response.json()).then((response) => {");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                        ");
                w.write("const temp = {");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                            ");
                w.write("\"Access\": JSON.parse(JSON.stringify(response)),");
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
                w.pushIndentation("                ");
                w.write("req.baseUrl === '/mobile' ? res.send(temp) :");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                ");
                w.write("req.baseUrl === '/desktop' ? res.send(temp) :");
                w.popIndentation();
                w.write("\n");
                w.pushIndentation("                         ");
                w.write("new CustomLogger().showLogger('info', 'Exit from ");
                w.popIndentation();
                st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 87, column: 82 }));
                w.write("Controller.ts: ");
                st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "additional", { file: gFile, line: 87, column: 115 }), "camunda", { file: gFile, line: 87, column: 126 }), "consent", { file: gFile, line: 87, column: 134 }), "methodName", { file: gFile, line: 87, column: 142 }));
                w.write("');");
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


            }
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
        w.write("}");
        w.write("\n");
    };
    r.args = [
        { name: "object" }
    ];
    group.addTemplate("/apicontroller", r);


    return group;
}
getInstance.base = base;

module.exports = getInstance;