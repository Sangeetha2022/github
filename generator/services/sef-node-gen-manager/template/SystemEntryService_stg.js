/*
 * Template group SystemEntryService
 * Compiled on Sat Sep 25 2021 20:03:26 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "SystemEntryService"; 

group.name = "SystemEntryService";





//
// Template /SystemEntryService
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("export class SystemEntryService {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("//local");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("//public static systementryBaseUrl = \"http://localhost\";");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public static apigatewayUrl = process.env.APIGATEWAY;");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public static apiGatewayURL: String = SystemEntryService.apigatewayUrl;");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("}");
};
r.args = [
        
];
group.addTemplate("/SystemEntryService", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;