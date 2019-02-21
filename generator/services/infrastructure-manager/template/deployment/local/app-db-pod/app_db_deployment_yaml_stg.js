/*
 * Template group app_db_deployment_yaml
 * Compiled on Thu Feb 21 2019 13:11:41 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_db_deployment_yaml"; 

group.name = "app_db_deployment_yaml";





//
// Template /app_db_deployment_yaml
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
    w.write("-app-db");
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
    w.write("labels:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-app-db");
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
    w.write("- name: mongo-container");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("imagePullPolicy: Always");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("image: mongo:3.2");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: http-port");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("containerPort: 27017");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("volumeMounts:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: mongo");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("mountPath: /data/db");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("volumes:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- name: mongo");
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
    w.write("-app-mongo-data");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/app_db_deployment_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;