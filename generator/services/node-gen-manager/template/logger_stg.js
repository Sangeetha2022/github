/*
 * Template group logger
 * Compiled on Thu Jan 07 2021 17:39:09 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "logger"; 

group.name = "logger";





//
// Template /logger
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { createLogger, format, transports } from 'winston';");
    w.write("\n");
    w.write("import * as DailyRotateFile from \"winston-daily-rotate-file\";");
    w.write("\n");
    w.write("import * as  fs from 'fs';");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("export class CustomLogger {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public logger = createLogger({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("level: 'info',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("format: format.combine(");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("format.label({ label: 'gep-dev-node-api' }),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("format.colorize(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("format.json(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("format.timestamp({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("format: 'YYYY-MM-DD HH:mm:ss'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("}),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("transports: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("new transports.Console({level: 'debug'}),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("new DailyRotateFile({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("filename: `log/flow-%DATE%.log`,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("datePattern: 'YYYY-MM-DD'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("]");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("showLogger(level, log) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("const logDir = 'log';");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("if (!fs.existsSync(logDir)) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("fs.mkdirSync(logDir);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("if (level === 'info') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("return this.logger.info(log);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("} else if (level === 'error') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("return this.logger.error(log);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("} else if (level === 'warn') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("return this.logger.warn(log);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("} else if (level === 'silly') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("return this.logger.silly(log);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("} else if (level === 'debug') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("return this.logger.debug(log);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("}");
};
r.args = [
        
];
group.addTemplate("/logger", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;