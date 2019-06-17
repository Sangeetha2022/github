/*
 * Template group winston
 * Compiled on Mon Jun 17 2019 11:58:12 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "winston"; 

group.name = "winston";





//
// Template /winston
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import * as fs from 'fs';");
    w.write("\n");
    w.write("import * as expressWinston from 'express-winston';");
    w.write("\n");
    w.write("\n");
    w.write("const winston = require('winston');");
    w.write("\n");
    w.write("require('winston-daily-rotate-file');");
    w.write("\n");
    w.write("\n");
    w.write("const logDir = 'log';");
    w.write("\n");
    w.write("\n");
    w.write("export class WinstonLogger {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public setupLogger(): void {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (!fs.existsSync(logDir)) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("fs.mkdirSync(logDir);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("expressWinston.requestWhitelist.push('body');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("expressWinston.responseWhitelist.push('body');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public configureWinston(app): void {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("app.use(expressWinston.logger({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("format: winston.format.combine(");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("winston.format.label({ label: 'gep-dev-node-api' }),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("winston.format.colorize(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("winston.format.json()");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("transports: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("new winston.transports.Console(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("new (winston.transports.DailyRotateFile)({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("level: 'info',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("dirname: logDir,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("filename: logDir + 'api-%DATE%.log',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("datePattern: 'YYYY-MM-DD',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("zippedArchive: false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("prepend: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("json: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("colorize: false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("statusLevels: false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("level: function (req, res) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("var level = '';");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("if (res.statusCode >= 100) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("level = 'info';");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("if (res.statusCode >= 400) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("level = 'warn';");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("if (res.statusCode >= 500) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("level = 'error';");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("return level;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("exitOnError: false");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}))");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("app.use(expressWinston.errorLogger({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("format: winston.format.combine(");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("winston.format.label({ label: 'gep-dev-node-api' }),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("winston.format.colorize(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("winston.format.json()");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("),");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("            ");
    w.write("transports: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("new winston.transports.Console(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("new (winston.transports.DailyRotateFile)({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("level: 'info',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("dirname: logDir,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("filename: logDir + '/error/api-%DATE%.log',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("datePattern: 'YYYY-MM-DD',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("zippedArchive: false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("prepend: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("json: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("colorize: false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("statusLevels: false, // default value");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("level: function (req, res) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("var level = '';");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("if (res.statusCode >= 100) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("level = 'info';");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("if (res.statusCode >= 400) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("level = 'warn';");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("if (res.statusCode >= 500) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("level = 'error';");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("return level;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("exitOnError: false,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}));");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/winston", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;