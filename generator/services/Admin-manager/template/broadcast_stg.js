/*
 * Template group broadcast
 * Compiled on Fri Jul 12 2019 16:16:01 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "broadcast"; 

group.name = "broadcast";





//
// Template /broadcast
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import{ Injectable } from '@angular/core';");
    w.write("\n");
    w.write("import { Subject, BehaviourSubject } from 'rxjs;");
    w.write("\n");
    w.write("\n");
    w.write("@Injectable({");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("providedIn:'root'");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("\n");
    w.write("export class BroadcastService {");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("constructor(){");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public guardarray: any[] = [];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("private currentUserNamestore = new BehaviourSubject<{}>({});");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("private currentusername = this.currentUserNamestore.asObservable();");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("sendmessage(message:{}){");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.currentUserNamestore.next(message);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("}");
};
r.args = [
        
];
group.addTemplate("/broadcast", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;