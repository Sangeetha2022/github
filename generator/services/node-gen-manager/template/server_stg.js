/*
 * Template group server
 * Compiled on Tue Jun 04 2019 15:10:33 GMT+0530 (India Standard Time)
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
    
    if (st.test(st.prop(s, g, rc, s.object, "GpStart", { file: gFile, line: 2, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "GpStart", { file: gFile, line: 2, column: 28 }), "dependencies", { file: gFile, line: 2, column: 36 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "name", { file: gFile, line: 2, column: 82 }));
                     w.write(" from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "path", { file: gFile, line: 2, column: 106 }));
                     w.write("';");
            }, [
            { name: "dependency"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("const winston = require('winston');");
    w.write("\n");
    w.write("require('winston-daily-rotate-file')");
    w.write("\n");
    w.write("\n");
    w.write("const PORT = ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "port", { file: gFile, line: 6, column: 21 }));
    w.write(";");
    w.write("\n");
    w.write("const logDir = 'log';");
    w.write("\n");
    w.write("\n");
    w.write("class App {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public app: express.Application = express();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public routePrv: Routes = new Routes();");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public mongoUrl: string = '");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "dbConnectionUrl", { file: gFile, line: 14, column: 39 }));
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
    w.pushIndentation("        ");
    w.write("this.routePrv.routes(this.app);");
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
    w.write("this.app.use(bodyParser.json());");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.app.use(bodyParser.urlencoded({ extended: false }));");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.app.use(express.static('public'));");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("// Enable CORS");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.app.use(cors({ credentials: true, origin: true }))");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("private mongoSetup(): void {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("mongoose.Promise = global.Promise;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("mongoose.connect(this.mongoUrl, { useNewUrlParser: true });");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
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
        { name: "object"     }
];
group.addTemplate("/server", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;