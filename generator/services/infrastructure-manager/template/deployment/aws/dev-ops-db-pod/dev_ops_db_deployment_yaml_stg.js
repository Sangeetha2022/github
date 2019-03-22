/*
 * Template group dev_ops_db_deployment_yaml
 * Compiled on Wed Mar 20 2019 14:51:08 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "dev_ops_db_deployment_yaml"; 

group.name = "dev_ops_db_deployment_yaml";





//
// Template /dev_ops_db_deployment_yaml
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("apiVersion: extensions/v1beta1");
    w.write("\n");
    w.write("kind: Deployment");
    w.write("\n");
    w.write("metadata:");
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
    w.write("replicas: 1");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("template:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("metadata:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-dev-ops-db");
    w.write("\n");
    w.pushIndentation("      ");
    w.write("labels:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-dev-ops-db");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("spec:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("containers:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- name: sonar-postgres-container");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("imagePullPolicy: Always");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("image: postgres:latest");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("env:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: POSTGRES_PASSWORD");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: POSTGRES_USER");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: sonar");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: POSTGRES_DB");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: sonar  ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- containerPort: 5432");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("name: postgres-port");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("volumeMounts:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("# This name must match the volumes.name below.");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: sonar-postgres-data");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("mountPath: /var/postgresData");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("volumes:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- name: sonar-postgres-data");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("persistentVolumeClaim:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("claimName: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-dev-ops-postgres-pvc");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/dev_ops_db_deployment_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;