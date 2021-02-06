/*
 * Template group seed
 * Compiled on Sat Feb 06 2021 19:38:53 GMT+0530 (India Standard Time)
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
    
    w.write("    ");
    if (st.test(s.object)) {
    
        w.write("\n");
        w.pushIndentation("    ");
        w.write("export const resourcetypes = [\n");
        w.popIndentation();
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.object;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("{\"resources\":\"");
                     st.write(w, s, g, rc, s.value);
                     w.write("\", \"role\":\"Guest\"}");
                     w.write("\n");
                     w.write("    ");
            }, [
            { name: "value"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ",\n"});
        w.write("\n]");
    
    
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