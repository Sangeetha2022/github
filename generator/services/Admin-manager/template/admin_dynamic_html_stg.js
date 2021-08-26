/*
 * Template group admin_dynamic_html
 * Compiled on Tue May 18 2021 22:25:12 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "admin_dynamic_html"; 

group.name = "admin_dynamic_html";





//
// Template /admin_dynamic_html
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("<div class=\"dashboardcard\">");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<h2><label>Admin DashBoard</label></h2>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<div class=\"accordion indicator-plus-before round-indicator\" id=\"accordionH\" aria-multiselectable=\"true\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("<div class=\"card m-b-0\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<div class=\"card-header collapsed\" role=\"tab\" id=\"headingOneH\" href=\"#userManagement\" data-toggle=\"collapse\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("data-parent=\"#accordionH\" aria-expanded=\"false\" aria-controls=\"collapseOneH\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("<a class=\"card-title\">{{'source.userManagement' | i18next}}</a>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<div class=\"collapse\" id=\"userManagement\" role=\"tabpanel\" aria-labelledby=\"headingOneH\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("<div class=\"card-body\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("<a routerLink=\"/usermanagement\" class=\"btn btn-primary\">{{'source.userManagement' | i18next}}</a>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.write("      ");
    if (st.test(st.prop(s, g, rc, s.dynamic_html, "connectors", { file: gFile, line: 15, column: 23 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.dynamic_html, "connectors", { file: gFile, line: 15, column: 49 });
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
    w.pushIndentation("    ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.write("</div>");
};
r.args = [
        { name: "dynamic_html"     }
];
group.addTemplate("/admin_dynamic_html", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;