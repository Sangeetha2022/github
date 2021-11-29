/*
 * Template group server_file
 * Compiled on Fri Nov 26 2021 16:59:48 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "server_file"; 

group.name = "server_file";





//
// Template /server_file
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import * as express from 'express';");
    w.write("\n");
    w.write("import * as bodyParser from 'body-parser';");
    w.write("\n");
    w.write("import * as cors from 'cors';");
    w.write("\n");
    w.write("import { WinstonLogger } from './config/Winstonlogger';");
    w.write("\n");
    w.write("import { Routes } from './routes/routes'");
    w.write("\n");
    w.write("import mongoose = require('mongoose');");
    w.write("\n");
    if (st.test(st.test(st.prop(s, g, rc, s.object, "isSeed", { file: gFile, line: 8, column: 11 })) || st.test(st.prop(s, g, rc, s.object, "GCAM", { file: gFile, line: 8, column: 28 })))) {
    
        w.write("import { SeedService } from './seed';");
    
    
    }
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "isDmnFile", { file: gFile, line: 9, column: 11 }))) {
    
        w.write("import { DmnFile } from './dmnDeploye/dmnFile';");
    
    
    }
    w.write("\n");
    w.write("const PORT = ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "port", { file: gFile, line: 10, column: 21 }));
    w.write(";");
    w.write("\n");
    w.write("\n");
    w.write("class App {");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public app = express();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public routerPrv: Routes = new Routes();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public logger: WinstonLogger = new WinstonLogger();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public mongoUrl: string = process.env.MONGO_DB_URL;");
    w.popIndentation();
    w.write("\n");
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
    w.write("this.routerPrv.routes(this.app);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.mongoSetup();");
    w.popIndentation();
    w.write("\n");
    w.write("        ");
    if (st.test(st.prop(s, g, rc, s.object, "isSeed", { file: gFile, line: 23, column: 19 }))) {
    
        w.write("this.mongoSeedData();");
    
    
    }
    w.write("\n");
    w.write("         ");
    if (st.test(st.prop(s, g, rc, s.object, "GCAM", { file: gFile, line: 24, column: 20 }))) {
    
        w.write("this.SeedData();");
    
    
    }
    w.write("\n");
    w.write("        ");
    if (st.test(st.prop(s, g, rc, s.object, "isDmnFile", { file: gFile, line: 25, column: 19 }))) {
    
        w.write("this.DeployDMNfile();");
    
    
    }
    w.write("\n");
    w.pushIndentation("       ");
    w.write("\n");
    w.popIndentation();
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
    w.write("this.app.use(express.static(\"public\"));");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.app.use(cors({ credentials: true, origin: true }));");
    w.popIndentation();
    w.write("\n");
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
    w.write("mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "isSeed", { file: gFile, line: 42, column: 11 }))) {
    
        w.write("\n");
        w.pushIndentation("    ");
        w.write("private mongoSeedData(): void {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("let seedData = new SeedService();");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("seedData.create();");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
    
    
    }
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "GCAM", { file: gFile, line: 49, column: 11 }))) {
    
        w.write(" ");
        w.write("\n");
        w.write("private SeedData(): void {");
        w.write("\n");
        w.pushIndentation("        ");
        w.write("console.log('route a file into seed create');");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("let seedData = new SeedService();");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("seedData.post();");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
    
    
    }
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "isDmnFile", { file: gFile, line: 57, column: 11 }))) {
    
        w.write("\n");
        w.pushIndentation("    ");
        w.write("private DeployDMNfile(): void {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("let dmnfile = new DmnFile();");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("dmnfile.dmnFileDeploye();");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
    
    
    }
    w.write("\n");
    w.write("\n");
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
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/server_file", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;