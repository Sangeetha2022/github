/*
 * Template group seed
 * Compiled on Tue Jul 16 2019 13:32:03 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "seed"; 

group.name = "seed";





//
// Template /seed
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("export const resourcetypes = ");
    w.write("\n");
    w.write("    ");
    if (st.test(s.object)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.object;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("[{\"resources\":\"");
                     st.write(w, s, g, rc, s.value);
                     w.write("\"],}");
                     w.write("\n");
                     w.write("    ");
            }, [
            { name: "value"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/seed", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;