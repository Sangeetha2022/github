/*
 * Template group react_modify_routing
 * Compiled on Mon Nov 15 2021 19:05:34 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "react_modify_routing"; 

group.name = "react_modify_routing";





//
// Template /react_modify_routing
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(st.prop(s, g, rc, s.routing, "importDependency", { file: gFile, line: 2, column: 12 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.routing, "importDependency", { file: gFile, line: 2, column: 39 });
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
    w.write("\n");
    w.write("\n");
    w.write("let routes: any = [");
    w.write("\n");
    w.write("  ");
    if (st.test(st.prop(s, g, rc, s.routing, "path", { file: gFile, line: 5, column: 14 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.routing, "path", { file: gFile, line: 5, column: 29 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ",\n"});
        w.write("\n");
    
    
    }
    w.write("\n");
    w.write("];");
    w.write("\n");
    w.write("\n");
    w.write("export default routes;");
    w.write("\n");
};
r.args = [
        { name: "routing"     }
];
group.addTemplate("/react_modify_routing", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;