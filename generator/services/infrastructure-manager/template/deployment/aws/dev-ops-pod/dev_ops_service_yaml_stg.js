/*
 * Template group dev_ops_service_yaml
 * Compiled on Thu Feb 21 2019 13:13:44 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "dev_ops_service_yaml"; 

group.name = "dev_ops_service_yaml";





//
// Template /dev_ops_service_yaml
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
    w.write("-dev-ops");
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
    w.pushIndentation("  ");
    w.write("- name: jenkins");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 8080");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 8080");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- name: nexus");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 8081");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 8081");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- name: sonarqube");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 9000");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 9000");
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
    w.write("-dev-ops");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/dev_ops_service_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;