/*
 * Template group sonar_pv_postgres_yaml
 * Compiled on Mon Mar 11 2019 12:26:01 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "sonar_pv_postgres_yaml"; 

group.name = "sonar_pv_postgres_yaml";





//
// Template /sonar_pv_postgres_yaml
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("kind: PersistentVolumeClaim");
    w.write("\n");
    w.write("apiVersion: v1");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-dev-ops-postgres-pvc");
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
    w.pushIndentation("    ");
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
    w.write("\n");
    w.write("  ");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/sonar_pv_postgres_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;