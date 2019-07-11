/*
 * Template group index_html
 * Compiled on Fri Jul 05 2019 14:45:16 GMT+0530 (India Standard Time)
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
    if (st.test(s.baseTag)) {
    
        st.write(w, s, g, rc, s.baseTag);
    
    
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
    w.write("  ");
    if (st.test(s.scriptTag)) {
    
        st.write(w, s, g, rc, s.scriptTag);
    
    
    }
    w.write("\n");
    w.write("</body>");
    w.write("\n");
    w.write("</html>");
};
r.args = [
        { name: "baseTag"     },
{ name: "scriptTag"     }
];
group.addTemplate("/index_html", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;