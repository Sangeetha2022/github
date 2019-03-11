/*
 * Template group dev_ops_db_service_yaml
 * Compiled on Thu Feb 21 2019 13:12:58 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "dev_ops_db_service_yaml"; 

group.name = "dev_ops_db_service_yaml";





//
// Template /dev_ops_db_service_yaml
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("apiVersion: v1");
    w.write("\n");
    w.write("kind: Service");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("labels:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-dev-ops-db");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-dev-ops-db");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("namespace: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("\n");
    w.write("spec:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("type: NodePort");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("- name: sonar-postgres");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("port: 5432");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("targetPort: 5432");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-dev-ops-db");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/dev_ops_db_service_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;