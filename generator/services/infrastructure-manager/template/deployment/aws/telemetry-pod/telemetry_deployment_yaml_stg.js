/*
 * Template group telemetry_deployment_yaml
 * Compiled on Thu Feb 21 2019 13:16:27 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "telemetry_deployment_yaml"; 

group.name = "telemetry_deployment_yaml";





//
// Template /telemetry_deployment_yaml
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
    w.write("labels:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("app: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-telimetry");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-telimetry");
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
    w.write("app: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-telimetry");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("spec:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("containers:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- name: vault-container");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("image: vault");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- containerPort: 8200");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("name: vaultport");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("protocol: TCP");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("securityContext:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("capabilities:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("           ");
    w.write("add:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("             ");
    w.write("- IPC_LOCK");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("env:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- name: VAULT_DEV_ROOT_TOKEN_ID");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("value: vault-");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-2019");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/telemetry_deployment_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;