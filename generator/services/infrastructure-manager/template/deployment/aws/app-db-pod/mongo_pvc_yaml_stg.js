/*
 * Template group mongo_pvc_yaml
 * Compiled on Thu Feb 21 2019 13:11:57 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "mongo_pvc_yaml"; 

group.name = "mongo_pvc_yaml";





//
// Template /mongo_pvc_yaml
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("apiVersion: v1");
    w.write("\n");
    w.write("kind: PersistentVolumeClaim");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-app-mongo-data");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("namespace: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("\n");
    w.write("spec:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("accessModes:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- ReadWriteOnce");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("resources:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("requests:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("storage: 5Gi");
    w.popIndentation();
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/mongo_pvc_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;