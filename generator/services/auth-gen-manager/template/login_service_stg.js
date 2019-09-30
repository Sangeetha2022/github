/*
 * Template group login_service
 * Compiled on Tue Sep 24 2019 19:14:30 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "login_service"; 

group.name = "login_service";





//
// Template /login_service
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { Injectable } from '@angular/core';");
    w.write("\n");
    w.write("import { HttpClient } from '@angular/common/http';");
    w.write("\n");
    w.write("import { Observable } from 'rxjs';");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 5, column: 11 }))) {
    
        w.write("\n");
        w.write("import { SharedService } from '../../shared/shared.service';");
        w.write("\n");
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("@Injectable({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("providedIn: 'root'");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 12, column: 21 }));
    w.write("Service {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("constructor(private http: HttpClient, private ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 14, column: 56 }), "objectName", { file: gFile, line: 14, column: 63 }));
    w.write(": ");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 14, column: 84 }), "className", { file: gFile, line: 14, column: 91 }));
    w.write(") { }");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("signup(user: any): Observable<any> {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.http.post(this.");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 17, column: 39 }), "objectName", { file: gFile, line: 17, column: 46 }));
    w.write(".");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 17, column: 66 }), "variableName", { file: gFile, line: 17, column: 73 }));
    w.write(" + '/signup', user);");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("googlelogin(user: any): Observable<any> {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.http.post(this.");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 21, column: 39 }), "objectName", { file: gFile, line: 21, column: 46 }));
    w.write(".");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 21, column: 66 }), "variableName", { file: gFile, line: 21, column: 73 }));
    w.write(" + '/googlesignin', user);");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("Login(user: any): Observable<any> {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.http.post(this.");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 24, column: 39 }), "objectName", { file: gFile, line: 24, column: 46 }));
    w.write(".");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 24, column: 66 }), "variableName", { file: gFile, line: 24, column: 73 }));
    w.write(" + '/login', user);");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("Logout(user: any): Observable<any> {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.http.put(this.");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 28, column: 38 }), "objectName", { file: gFile, line: 28, column: 45 }));
    w.write(".");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 28, column: 65 }), "variableName", { file: gFile, line: 28, column: 72 }));
    w.write(" + '/logout', user);");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("Consent(consent: any): Observable<any> {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.http.put(this.");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 32, column: 38 }), "objectName", { file: gFile, line: 32, column: 45 }));
    w.write(".");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 32, column: 65 }), "variableName", { file: gFile, line: 32, column: 72 }));
    w.write(" + '/consent', consent);");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/login_service", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;