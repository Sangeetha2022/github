/*
 * Template group kibana_yaml
 * Compiled on Thu Feb 21 2019 13:17:11 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "kibana_yaml"; 

group.name = "kibana_yaml";





//
// Template /kibana_yaml
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
    w.write("name: kibana");
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
    w.write("app: kibana");
    w.popIndentation();
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
    w.write("- port: 5601");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("app: kibana");
    w.popIndentation();
    w.write("\n");
    w.write("---");
    w.write("\n");
    w.write("apiVersion: apps/v1");
    w.write("\n");
    w.write("kind: Deployment");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: kibana");
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
    w.write("app: kibana");
    w.popIndentation();
    w.write("\n");
    w.write("spec:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("replicas: 1");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("matchLabels:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("app: kibana");
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
    w.write("app: kibana");
    w.popIndentation();
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
    w.write("- name: kibana");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("image: docker.elastic.co/kibana/kibana-oss:6.4.3");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("resources:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("limits:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("cpu: 1000m");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("requests:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("cpu: 100m");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("env:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("- name: ELASTICSEARCH_URL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("value: http://elasticsearch.");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-logging.svc.cluster.local:9200/");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- containerPort: 5601");
    w.popIndentation();
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/kibana_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;