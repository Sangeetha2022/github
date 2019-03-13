/*
 * Template group telemetry_service_yaml
 * Compiled on Tue Mar 05 2019 11:16:41 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "telemetry_service_yaml"; 

group.name = "telemetry_service_yaml";





//
// Template /telemetry_service_yaml
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
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-telimetry");
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
    w.write("namespace: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("  ");
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
    w.write("- name: vault");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("targetPort: 8200");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("port: 8200");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("app: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-telimetry");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/telemetry_service_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;