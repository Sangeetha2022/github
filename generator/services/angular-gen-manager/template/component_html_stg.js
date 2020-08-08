/*
 * Template group component_html
 * Compiled on Sat Aug 08 2020 13:23:22 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component_html"; 

group.name = "component_html";





//
// Template /component_html
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("<h2>");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 2, column: 12 }));
    w.write("</h2>");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "tag", { file: gFile, line: 3, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "tag", { file: gFile, line: 3, column: 24 });
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
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/component_html", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;