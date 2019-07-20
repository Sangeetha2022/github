/*
 * Template group constants
 * Compiled on Sat Jul 20 2019 12:39:53 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "constants"; 

group.name = "constants";





//
// Template /constants
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("export const camundaUrl = 'http://");
    st.write(w, s, g, rc, (function() {
    var tp = [],
    attr = s.object;
    tp.push(st.makeSubTemplate(g, function(w, rc) {
        var g = this.owningGroup,
        s = this.scope;
        
                 st.write(w, s, g, rc, s.projectName);
                 w.write("-app.");
                 st.write(w, s, g, rc, s.projectName);
        }, [
        { name: "projectName"     }
        ])); 
    return st.map(attr, tp);
    })(), {separator: ",\n"});
    w.write(".svc.cluster.local:3008';");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/constants", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;