/*
 * Template group index_html
 * Compiled on Thu Mar 21 2019 12:08:29 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "index_html"; 

group.name = "index_html";





//
// Template /index_html
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("<!doctype html>");
    w.write("\n");
    w.write("<html lang=\"en\">");
    w.write("\n");
    w.write("<head>");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<meta charset=\"utf-8\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<title>");
    w.popIndentation();
    st.write(w, s, g, rc, s.title);
    w.write("</title>");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<base href=\"/\">");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<link rel=\"icon\" type=\"image/x-icon\" href=\"favicon.ico\">");
    w.popIndentation();
    w.write("\n");
    w.write("  ");
    if (st.test(s.stylesheet)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.stylesheet;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("<link rel=\"stylesheet\" href=\"");
                     st.write(w, s, g, rc, s.name);
                     w.write("\" />");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("</head>");
    w.write("\n");
    w.write("<body>");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<app-root></app-root>");
    w.popIndentation();
    w.write("\n");
    w.write("</body>");
    w.write("\n");
    if (st.test(s.script)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.script;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("<script src=\"");
                     st.write(w, s, g, rc, s.name);
                     w.write("\"></script>");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("</html>");
    w.write("\n");
};
r.args = [
        { name: "title"     },
{ name: "script"     },
{ name: "stylesheet"     }
];
group.addTemplate("/index_html", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;