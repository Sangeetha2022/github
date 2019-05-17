/*
 * Template group server
 * Compiled on Wed Apr 24 2019 19:21:08 GMT+0530 (IST)
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
    
    w.write("\n");
    w.write("import * as mongoose from 'mongoose';");
    w.write("\n");
    w.write("import * as express from \"express\";");
    w.write("\n");
    w.write("import * as bodyParser from \"body-parser\";");
    w.write("\n");
    w.write("import { Routes } from \"./routes/routes\";");
    w.write("\n");
    w.write("import * as cors from 'cors';");
    w.write("\n");
    w.write("import { MongoConfig } from './config/MongoConfig'");
    w.write("\n");
    w.write("import { WinstonLogger } from './config/WinstonLogger';");
    w.write("\n");
    w.write("\n");
    w.write("const PORT = ");
    st.write(w, s, g, rc, s.Port, {separator: ",\n"});
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
    w.pushIndentation("    ");
    w.write("public logger: WinstonLogger = new WinstonLogger();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("    ");
    w.write("public mongoUrl: string = 'mongodb://127.0.0.1/GeppettoDev';");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("constructor() { ");
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
    w.pushIndentation("        ");
    w.write("// let mConfig = new MongoConfig();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("// mConfig.mongoConfig();");
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
    w.write("new App().app.listen(PORT, () => {");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("console.log('Express server listening on port ' + PORT);");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
};
r.args = [
        { name: "Port"     }
];
group.addTemplate("/server", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;