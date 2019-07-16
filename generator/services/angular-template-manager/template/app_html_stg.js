/*
 * Template group app_html
 * Compiled on Tue Jul 16 2019 18:14:25 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_html"; 

group.name = "app_html";





//
// Template /app_html
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(s.apphtmlCode)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.apphtmlCode;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("<");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "name", { file: gFile, line: 2, column: 49 }));
                     if (st.test(st.prop(s, g, rc, s.object, "isHeaderFooter", { file: gFile, line: 2, column: 65 }))) {
                     
                         w.write(" *ngIf=\"headerFooter\"");
                     
                     
                     }
                     w.write("></");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "name", { file: gFile, line: 2, column: 120 }));
                     w.write(">");
            }, [
            { name: "object"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
};
r.args = [
        { name: "apphtmlCode"     }
];
group.addTemplate("/app_html", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;