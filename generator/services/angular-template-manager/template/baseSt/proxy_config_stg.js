/*
 * Template group proxy_config
 * Compiled on Thu Jan 06 2022 17:54:32 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "proxy_config"; 

group.name = "proxy_config";





//
// Template /proxy_config
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("const BACKEND_URL = process.env.BACKEND_URL || 'localhost';");
    w.write("\n");
    w.write("const BACKEND_PORT = process.env.BACKEND_PORT || '8000';");
    w.write("\n");
    w.write("\n");
    w.write("const PROXY_CONFIG = {");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("'/api/*': {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("target: `http://${BACKEND_URL}:${BACKEND_PORT}`,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("secure: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("pathRewrite: {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("'^/api/web': '/web',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("'^/api/mobile': '/mobile'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("changeOrigin: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("logLevel: 'debug'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("};");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("module.exports = PROXY_CONFIG;");
};
r.args = [
        
];
group.addTemplate("/proxy_config", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;