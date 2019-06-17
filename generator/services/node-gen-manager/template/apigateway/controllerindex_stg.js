/*
 * Template group controllerindex
 * Compiled on Mon Jun 17 2019 11:17:41 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "controllerindex"; 

group.name = "controllerindex";





//
// Template /controllerindex
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(s.object)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.object;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("export * from \"./");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "className", { file: gFile, line: 2, column: 63 }));
                     w.write("Controller\";");
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
group.addTemplate("/controllerindex", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;