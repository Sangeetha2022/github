/*
 * Template group Form
 * Compiled on Tue Jun 02 2020 13:32:22 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "Form"; 

group.name = "Form";





//
// Template /Form
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("<h1>");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.formobject, "header", { file: gFile, line: 2, column: 16 }), "value", { file: gFile, line: 2, column: 23 }));
    w.write("</h1>");
    w.write("\n");
    w.write("<form>");
    w.write("\n");
    w.write("    ");
    if (st.test(s.formobject)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.formobject, "input", { file: gFile, line: 4, column: 32 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("<div class=\"form-group\">");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("<label>");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.inputname, "value", { file: gFile, line: 6, column: 26 }));
                     w.write("</label> ");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("<input type=\"");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.inputname, "elementType", { file: gFile, line: 7, column: 32 }));
                     w.write("\" class=\"form-control\">");
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("</div>");
                     w.popIndentation();
                     w.write("\n");
                     w.write("    ");
            }, [
            { name: "inputname"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<button type=\"submit\" class=\"btn btn-primary\">");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.formobject, "button", { file: gFile, line: 10, column: 60 }), "linkText", { file: gFile, line: 10, column: 67 }));
    w.write("</button>");
    w.write("\n");
    w.write("</form>");
};
r.args = [
        { name: "formobject"     }
];
group.addTemplate("/Form", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;