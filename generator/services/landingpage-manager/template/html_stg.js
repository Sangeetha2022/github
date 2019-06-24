/*
 * Template group html
 * Compiled on Fri Jun 14 2019 16:09:06 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "html"; 

group.name = "html";





//
// Template /html
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(s.object)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "html", { file: gFile, line: 2, column: 20 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.obj);
            }, [
            { name: "obj"     }
            ])); 
        return st.map(attr, tp);
        })());
    
    
    }
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/html", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;