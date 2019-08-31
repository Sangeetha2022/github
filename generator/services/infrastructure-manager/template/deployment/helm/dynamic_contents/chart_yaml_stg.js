/*
 * Template group chart_yaml
 * Compiled on Fri Aug 30 2019 12:01:01 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "chart_yaml"; 

group.name = "chart_yaml";





//
// Template /chart_yaml
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("apiVersion: v1");
    w.write("\n");
    w.write("appVersion: \"1.0\"");
    w.write("\n");
    w.write("description: A Helm chart for Kubernetes");
    w.write("\n");
    w.write("name: ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "project_name", { file: gFile, line: 5, column: 14 }));
    w.write("\n");
    w.write("version: 0.1.0");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/chart_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;