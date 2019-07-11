/*
 * Template group css
 * Compiled on Mon Jul 01 2019 15:34:21 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "css"; 

group.name = "css";





//
// Template /css
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(s.cObject)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.cObject, "css", { file: gFile, line: 2, column: 22 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.cobj);
            }, [
            { name: "cobj"     }
            ])); 
        return st.map(attr, tp);
        })());
    
    
    }
};
r.args = [
        { name: "cObject"     }
];
group.addTemplate("/css", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;