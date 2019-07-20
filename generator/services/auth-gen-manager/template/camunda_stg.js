/*
 * Template group camunda
 * Compiled on Sun Jul 21 2019 01:00:51 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "camunda"; 

group.name = "camunda";





//
// Template /camunda
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("export class camundaService {");
    w.write("\n");
    w.write("public static camundaUrl = 'http://");
    st.write(w, s, g, rc, (function() {
    var tp = [],
    attr = s.object;
    tp.push(st.makeSubTemplate(g, function(w, rc) {
        var g = this.owningGroup,
        s = this.scope;
        
                 st.write(w, s, g, rc, s.projectName);
                 w.write("-camunda-pod.");
                 st.write(w, s, g, rc, s.projectName);
        }, [
        { name: "projectName"     }
        ])); 
    return st.map(attr, tp);
    })(), {separator: ",\n"});
    w.write(".svc.cluster.local:8080';");
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/camunda", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;