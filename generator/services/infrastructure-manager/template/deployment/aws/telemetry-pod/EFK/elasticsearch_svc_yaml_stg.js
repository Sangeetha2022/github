/*
 * Template group elasticsearch_svc_yaml
 * Compiled on Thu Feb 21 2019 13:16:58 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "elasticsearch_svc_yaml"; 

group.name = "elasticsearch_svc_yaml";





//
// Template /elasticsearch_svc_yaml
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("kind: Service");
    w.write("\n");
    w.write("apiVersion: v1");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: elasticsearch");
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
    w.write("app: elasticsearch");
    w.popIndentation();
    w.write("\n");
    w.write("spec:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("type: LoadBalancer");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("app: elasticsearch");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("- port: 9200");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("name: rest");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("- port: 9300");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("name: inter-node");
    w.popIndentation();
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/elasticsearch_svc_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;