/*
 * Template group elasticsearch_pv_yaml
 * Compiled on Thu Mar 21 2019 12:46:27 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "elasticsearch_pv_yaml"; 

group.name = "elasticsearch_pv_yaml";





//
// Template /elasticsearch_pv_yaml
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("kind: PersistentVolume");
    w.write("\n");
    w.write("apiVersion: v1");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-elasticsearch-data-pv");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("labels:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("type: local");
    w.popIndentation();
    w.write("\n");
    w.write("spec:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("capacity:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("storage: 50Gi");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("accessModes:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("- ReadWriteOnce");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("hostPath:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("path: /data/elasticsearch/");
    w.popIndentation();
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/elasticsearch_pv_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;