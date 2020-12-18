/*
 * Template group admin_html
 * Compiled on Fri Dec 18 2020 18:28:02 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "admin_html"; 

group.name = "admin_html";





//
// Template /admin_html
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.pushIndentation("    ");
    w.write("<div class=\"card cardmobile\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<div class=\"card-header\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("<h2>");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.html, "externalfeaturename", { file: gFile, line: 4, column: 18 }));
    w.write("</h2>");
    w.write("\n");
    w.pushIndentation("      ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<div class=\"card-body\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("<img class=\"adminimg\" src=\"assets/img/");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.html, "imagename", { file: gFile, line: 7, column: 52 }));
    w.write("\" routerLink=\"/");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.html, "routevalue", { file: gFile, line: 7, column: 83 }));
    w.write("\">");
    w.write("\n");
    w.pushIndentation("      ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("</div>");
    w.popIndentation();
};
r.args = [
        { name: "html"     }
];
group.addTemplate("/admin_html", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;