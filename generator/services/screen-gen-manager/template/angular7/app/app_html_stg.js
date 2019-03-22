/*
 * Template group app_html
 * Compiled on Fri Mar 22 2019 11:01:44 GMT+0530 (India Standard Time)
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
                     st.write(w, s, g, rc, s.name);
                     w.write("></");
                     st.write(w, s, g, rc, s.name);
                     w.write(">");
            }, [
            { name: "name"     }
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