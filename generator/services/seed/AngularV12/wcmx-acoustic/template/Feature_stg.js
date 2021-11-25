/*
 * Template group Feature
 * Compiled on Mon Jun 22 2020 23:39:29 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "Feature"; 

group.name = "Feature";





//
// Template /Feature
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("<div class=\"row\">");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<div class=\"");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.featureobject, "gridclass", { file: gFile, line: 3, column: 29 }));
    w.write("\">");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("<div class=\"");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.featureobject, "blockclass", { file: gFile, line: 4, column: 31 }));
    w.write("\">");
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<h1 class=\"");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.featureobject, "headerclass", { file: gFile, line: 5, column: 32 }));
    w.write("\">");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.featureobject, "header", { file: gFile, line: 5, column: 61 }));
    w.write("</h1>");
    w.write("\n");
    w.pushIndentation("      ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.featureobject, "description", { file: gFile, line: 6, column: 21 }));
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<button type=\"button\" class=\"");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.featureobject, "buttonclass", { file: gFile, line: 7, column: 50 }));
    w.write("\"> ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.featureobject, "button", { file: gFile, line: 7, column: 80 }));
    w.write(" </button>");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<div class=\"");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.featureobject, "gridclass", { file: gFile, line: 10, column: 29 }));
    w.write("\">");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("<p>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<img class=\"");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.featureobject, "imageclass", { file: gFile, line: 12, column: 33 }));
    w.write("\" src=\"assets/img/");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.featureobject, "image", { file: gFile, line: 12, column: 77 }));
    w.write("\">");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("</p>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.write("</div>");
};
r.args = [
        { name: "featureobject"     }
];
group.addTemplate("/Feature", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;