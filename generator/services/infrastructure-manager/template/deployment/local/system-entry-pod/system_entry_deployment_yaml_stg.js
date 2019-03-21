/*
 * Template group system_entry_deployment_yaml
 * Compiled on Thu Feb 21 2019 13:15:17 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "system_entry_deployment_yaml"; 

group.name = "system_entry_deployment_yaml";





//
// Template /system_entry_deployment_yaml
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
    w.write("-system-entry");
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
    w.write("-system-entry");
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
    w.write("- name: nginx-container");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("imagePullPolicy: IfNotPresent");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("image: ram2010/");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0");
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
    w.write("containerPort: 80");
    w.popIndentation();
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/system_entry_deployment_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;