/*
 * Template group header
 * Compiled on Thu Jun 13 2019 15:04:53 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "header"; 

group.name = "header";





//
// Template /header
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(s.headerObj)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.headerObj;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.hobj);
            }, [
            { name: "hobj"     }
            ])); 
        return st.map(attr, tp);
        })());
    
    
    }
};
r.args = [
        { name: "headerObj"     }
];
group.addTemplate("/header", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;