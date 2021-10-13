/*
 * Template group DynamicList
 * Compiled on Mon Jun 15 2020 14:15:44 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "DynamicList"; 

group.name = "DynamicList";





//
// Template /DynamicList
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("<div class=\"");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.dynamicobject, "containerclass", { file: gFile, line: 2, column: 27 }));
    w.write("\">");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<h1>");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.dynamicobject, "listTitle", { file: gFile, line: 3, column: 21 }));
    w.write("</h1>");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<div class=\"row\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("<div class=\"");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.dynamicobject, "gridclass", { file: gFile, line: 5, column: 31 }));
    w.write("\" *ngFor=\"let item of quote; let i = index\">");
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<div *ngIf=\"i < ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.dynamicobject, "maxItem", { file: gFile, line: 6, column: 37 }));
    w.write("\">");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("<h2>{{item.event}}</h2>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("<p>{{item.description}}</p>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("<button type=\"button\" class=\"btn btn-primary\">Know more</button>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("</div>");
    w.popIndentation();
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
        { name: "dynamicobject"     }
];
group.addTemplate("/DynamicList", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;