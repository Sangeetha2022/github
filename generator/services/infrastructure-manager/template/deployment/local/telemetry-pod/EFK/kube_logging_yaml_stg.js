/*
 * Template group kube_logging_yaml
 * Compiled on Thu Feb 21 2019 13:17:16 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "kube_logging_yaml"; 

group.name = "kube_logging_yaml";





//
// Template /kube_logging_yaml
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("kind: Namespace");
    w.write("\n");
    w.write("apiVersion: v1");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-logging");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/kube_logging_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;