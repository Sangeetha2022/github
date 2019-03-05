/*
 * Template group system_entry_service_yaml
 * Compiled on Thu Feb 21 2019 13:15:22 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "system_entry_service_yaml"; 

group.name = "system_entry_service_yaml";





//
// Template /system_entry_service_yaml
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
    w.write("type: LoadBalancer");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- name: nginx-app");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 80");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 80");
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
    w.write("-system-entry");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/system_entry_service_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;