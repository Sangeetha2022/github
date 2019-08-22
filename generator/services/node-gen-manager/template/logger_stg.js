/*
 * Template group logger
 * Compiled on Wed Aug 21 2019 22:34:41 GMT+0530 (IST)
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
    
    w.write("const { createLogger, format, transports } = require('winston');");
    w.write("\n");
    w.write("require('winston-daily-rotate-file');");
    w.write("\n");
    w.write("const fs = require('fs');");
    w.write("\n");
    w.write("const path = require('path');");
    w.write("\n");
    w.write("\n");
    w.write("const env = process.env.NODE_ENV || 'development';");
    w.write("\n");
    w.write("const logDir = 'log';");
    w.write("\n");
    w.write("\n");
    w.write("if (!fs.existsSync(logDir)) {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("fs.mkdirSync(logDir);");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("const dailyRotateFileTransport = new transports.DailyRotateFile({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("filename: `${logDir}/flow-%DATE%.log`,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("datePattern: 'YYYY-MM-DD'");
    w.popIndentation();
    w.write("\n");
    w.write("});");
    w.write("\n");
    w.write("\n");
    w.write("const logger = createLogger({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("// change level if in dev environment versus production");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("level: env === 'development' ? 'verbose' : 'info',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("format: format.combine(");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("format.label({ label: 'gep-dev-node-api' }),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("format.colorize(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("format.json(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("format.timestamp({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("format: 'YYYY-MM-DD HH:mm:ss'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("transports: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("new transports.Console({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("level: 'info',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("zippedArchive: false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("prepend: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("json: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("colorize: false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("format: format.combine(");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("format.colorize(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("format.printf(");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("info => `${info.timestamp} ${info.level}: ${info.message}`");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write(")");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write(")");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("dailyRotateFileTransport");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("]");
    w.popIndentation();
    w.write("\n");
    w.write("});");
    w.write("\n");
    w.write("\n");
    w.write("module.exports = logger;");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/logger", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;