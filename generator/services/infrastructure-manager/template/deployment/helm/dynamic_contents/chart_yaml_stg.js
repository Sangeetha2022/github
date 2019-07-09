/*
 * Template group chart_yaml
 * Compiled on Tue Jul 09 2019 13:07:49 GMT+0530 (India Standard Time)
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
    st.write(w, s, g, rc, s.project_name);
    w.write("\n");
    w.write("version: 0.1.0");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/chart_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;