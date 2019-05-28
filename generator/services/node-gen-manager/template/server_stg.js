/*
 * Template group server
 * Compiled on Tue May 28 2019 12:59:57 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "server"; 

group.name = "server";





//
// Template /server
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import * as ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "express", { file: gFile, line: 2, column: 19 }));
    w.write(" from 'express';");
    w.write("\n");
    w.write("import * as ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "bodyParser", { file: gFile, line: 3, column: 19 }));
    w.write(" from 'body-parser';");
    w.write("\n");
    w.write("import * as ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "orm", { file: gFile, line: 4, column: 19 }));
    w.write(" from 'mongoose';");
    w.write("\n");
    w.write("import * as ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "cors", { file: gFile, line: 5, column: 19 }));
    w.write(" from 'cors';");
    w.write("\n");
    w.write("\n");
    w.write("const PORT = ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "PORT", { file: gFile, line: 7, column: 20 }));
    w.write(";");
    w.write("\n");
    w.write("\n");
    w.write("class App {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public app: ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "express", { file: gFile, line: 11, column: 23 }));
    w.write(".Application = ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "express", { file: gFile, line: 11, column: 53 }));
    w.write("();");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public mongoUrl = '");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "DbConnection", { file: gFile, line: 12, column: 30 }));
    w.write("';");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("constructor() {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.config();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.mongoSetup();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("private config(): void {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.app.use(");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "bodyParser", { file: gFile, line: 20, column: 28 }));
    w.write(".json());");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.app.use(");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "bodyParser", { file: gFile, line: 21, column: 28 }));
    w.write(".urlencoded({ extended: false }));");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.app.use(");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "express", { file: gFile, line: 22, column: 28 }));
    w.write(".static('public'));");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("// Enable CORS");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.app.use(");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "cors", { file: gFile, line: 25, column: 28 }));
    w.write("({ credentials: true, origin: true }))");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("private mongoSetup(): void {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "orm", { file: gFile, line: 28, column: 15 }));
    w.popIndentation();
    w.write(".Promise = global.Promise;");
    w.write("\n");
    w.pushIndentation("        ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.model, "orm", { file: gFile, line: 29, column: 15 }));
    w.popIndentation();
    w.write(".connect(this.mongoUrl, { useNewUrlParser: true });");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("new App().app.listen(PORT, () => {");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("console.log('Express server listening on port  ' + PORT);");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("\n");
    w.write("\n");
};
r.args = [
        { name: "model"     }
];
group.addTemplate("/server", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;