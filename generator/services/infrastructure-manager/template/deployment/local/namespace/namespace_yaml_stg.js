/*
 * Template group namespace_yaml
 * Compiled on Tue Mar 05 2019 11:13:19 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "namespace_yaml"; 

group.name = "namespace_yaml";





//
// Template /namespace_yaml
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
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/namespace_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;