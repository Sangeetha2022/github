/*
 * Template group apigatewayserver
 * Compiled on Fri Jan 07 2022 14:03:25 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "apigatewayserver"; 

group.name = "apigatewayserver";





//
// Template /apigatewayserver
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
    if (st.test(st.prop(s, g, rc, s.object, "classNames", { file: gFile, line: 3, column: 11 }))) {
    
        w.write("import {");
        w.write("\n");
        w.pushIndentation("    ");
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "classNames", { file: gFile, line: 4, column: 12 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.classes, "className", { file: gFile, line: 4, column: 43 }));
                     w.write("Controller");
            }, [
            { name: "classes"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ",\n"});
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("} from './apicontroller';");
        w.popIndentation();
    
    
    }
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "serverPort", { file: gFile, line: 7, column: 11 }))) {
    
        w.write("const PORT = ");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "serverPort", { file: gFile, line: 7, column: 44 }));
    
    
    }
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "classNames", { file: gFile, line: 8, column: 11 }))) {
    
        w.write("let apisController = [ ");
        w.write("\n");
        w.pushIndentation("    ");
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "classNames", { file: gFile, line: 9, column: 12 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("new ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.classes, "className", { file: gFile, line: 9, column: 47 }));
                     w.write("Controller()");
            }, [
            { name: "classes"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ",\n"});
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("]");
        w.popIndentation();
    
    
    }
    w.write("\n");
    w.write("class App {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public app: express.Application = express();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public logger: WinstonLogger = new WinstonLogger();");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("   ");
    w.write("constructor(controllers: Controller[]) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.logger.setupLogger();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.logger.configureWinston(this.app);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.initializeMiddlewares();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.initializeControllers(controllers);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("private initializeMiddlewares() {");
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
    w.write("this.app.use(cors({ credentials: true, origin: true }))");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("private initializeControllers(controllers: Controller[]) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("controllers.forEach((controller) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("this.app.route('/health/apigateway').get((req: express.Request, res: express.Response) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("res.status(200).send({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("status: 'up'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("this.app.use('/mobile', controller.router);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("this.app.use('/web', controller.router);");
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
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("new App(apisController).app.listen(PORT, () => {");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("console.log('Express server listening on port ' + PORT);");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/apigatewayserver", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;