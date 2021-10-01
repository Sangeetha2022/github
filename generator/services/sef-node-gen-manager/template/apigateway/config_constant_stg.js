/*
 * Template group config_constant
 * Compiled on Thu Sep 17 2020 18:30:14 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "config_constant"; 

group.name = "config_constant";





//
// Template /config_constant
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(st.prop(s, g, rc, s.object, "constantArray", { file: gFile, line: 2, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "constantArray", { file: gFile, line: 2, column: 34 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("export const ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "nodeName", { file: gFile, line: 2, column: 87 }));
                     w.write(" = process.env.");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "nodeName", { file: gFile, line: 2, column: 123 }));
                     w.write(";");
            }, [
            { name: "dependency"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/config_constant", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;