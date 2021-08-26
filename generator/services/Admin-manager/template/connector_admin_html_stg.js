/*
 * Template group connector_admin_html
 * Compiled on Mon May 24 2021 21:40:14 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "connector_admin_html"; 

group.name = "connector_admin_html";





//
// Template /connector_admin_html
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.pushIndentation("    ");
    w.write("<form>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("<div>");
    w.popIndentation();
    w.write("\n");
    w.write("        ");
    if (st.test(st.prop(s, g, rc, s.connector_admin_html, "connectors", { file: gFile, line: 4, column: 33 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.connector_admin_html, "connectors", { file: gFile, line: 4, column: 67 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("        ");
    w.write("<div id=\"template-iba4\" class=\"row\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("<div id=\"template-iiohv\" class=\"cell form-group\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("<button id=\"template-ibfdk\" class=\"button btn\" (click)=\"create()\">Create</button>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("<button id=\"template-i8s2n\" class=\"button btn\" (click)=\"cancel()\">Cancel</button>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("</form>");
};
r.args = [
        { name: "connector_admin_html"     }
];
group.addTemplate("/connector_admin_html", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;