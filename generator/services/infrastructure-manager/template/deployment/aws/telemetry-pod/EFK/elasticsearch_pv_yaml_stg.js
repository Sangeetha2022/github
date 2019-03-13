/*
 * Template group elasticsearch_pv_yaml
 * Compiled on Thu Feb 21 2019 13:16:47 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "elasticsearch_pv_yaml"; 

group.name = "elasticsearch_pv_yaml";





//
// Template /elasticsearch_pv_yaml
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
    w.write("name: data");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("namespace: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-logging");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("labels:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("app: elasticsearch");
    w.popIndentation();
    w.write("\n");
    w.write("spec:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("accessModes: [ \"ReadWriteOnce\" ]");
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
    w.write("storage: 100Gi");
    w.popIndentation();
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/elasticsearch_pv_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;