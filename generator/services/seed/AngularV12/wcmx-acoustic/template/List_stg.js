/*
 * Template group List
 * Compiled on Mon Jun 15 2020 14:16:40 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "List"; 

group.name = "List";





//
// Template /List
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("<div class=\"");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.listobject, "listcss", { file: gFile, line: 2, column: 24 }));
    w.write("\">");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("<h2 class=\"align\">");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.listobject, "listheading", { file: gFile, line: 3, column: 34 }));
    w.write("</h2>");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("<div class=\"row\">");
    w.popIndentation();
    w.write("\n");
    w.write("        ");
    if (st.test(s.listobject)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.listobject, "listtype", { file: gFile, line: 5, column: 36 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("<div class=\"");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.value, "gridclass", { file: gFile, line: 6, column: 31 }));
                     w.write("\">");
                     w.write("\n");
                     w.pushIndentation("                ");
                     w.write("<div>");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("                    ");
                     w.write("<h2>");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.value, "header", { file: gFile, line: 8, column: 31 }));
                     w.write("</h2>");
                     w.write("\n");
                     w.pushIndentation("                    ");
                     w.write("<img class=\"");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.value, "imageclass", { file: gFile, line: 9, column: 39 }));
                     w.write("\" src=\"assets/img/");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.value, "image", { file: gFile, line: 9, column: 75 }));
                     w.write("\" >");
                     w.write("\n");
                     w.pushIndentation("                    ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.value, "description", { file: gFile, line: 10, column: 27 }));
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("                    ");
                     w.write("<button type=\"button\" class=\"btn btn-primary\">");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.value, "button", { file: gFile, line: 11, column: 73 }));
                     w.write("</button>");
                     w.write("\n");
                     w.pushIndentation("                ");
                     w.write("</div>");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("            ");
                     w.write("</div> ");
                     w.popIndentation();
                     w.write("\n");
                     w.write("        ");
            }, [
            { name: "value"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("    ");
    w.write("</div>");
    w.popIndentation();
    w.write("\n");
    w.write("</div>");
};
r.args = [
        { name: "listobject"     }
];
group.addTemplate("/List", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;