/*
 * Template group component_scss
 * Compiled on Mon Mar 18 2019 19:38:00 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component_scss"; 

group.name = "component_scss";





//
// Template /component_scss
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("  ");
    if (st.test(s.style)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.style;
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
        { name: "style"     }
];
group.addTemplate("/component_scss", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;