/*
 * Template group values_yaml
 * Compiled on Tue Jul 09 2019 13:16:13 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "values_yaml"; 

group.name = "values_yaml";





//
// Template /values_yaml
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("# Default values for ");
    st.write(w, s, g, rc, s.project_name);
    w.write(".");
    w.write("\n");
    w.write("# This is a YAML-formatted file.");
    w.write("\n");
    w.write("# Declare variables to be passed into your templates.");
    w.write("\n");
    w.write("\n");
    w.write("app:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("prefix: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("\n");
    w.pushIndentation("  ");
    w.write("namespace: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("service:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("type: NodePort");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("appbuilderType: NodePort");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("deployment:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("defaultImagePullPolicy: IfNotPresent");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("customImagePullPolicy: Always");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("config:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("vault:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("rootToken: vault-");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-2019");
    w.write("\n");
    w.write("\n");
    w.write("ingress:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("enabled: false");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("annotations: {}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("# kubernetes.io/ingress.class: nginx");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("# kubernetes.io/tls-acme: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("hosts:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("- host: chart-example.local");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("paths: []");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("tls: []");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("#  - secretName: chart-example-tls");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("#    hosts:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("#      - chart-example.local");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("resources: {}");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("# We usually recommend not to specify default resources and to leave this as a conscious");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("# choice for the user. This also increases chances charts run on environments with little");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("# resources, such as Minikube. If you do want to specify resources, uncomment the following");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("# lines, adjust them as necessary, and remove the curly braces after 'resources:'.");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("# limits:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("#   cpu: 100m");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("#   memory: 128Mi");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("# requests:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("#   cpu: 100m");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("#   memory: 128Mi");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("nodeSelector: {}");
    w.write("\n");
    w.write("\n");
    w.write("tolerations: []");
    w.write("\n");
    w.write("\n");
    w.write("affinity: {}");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/values_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;