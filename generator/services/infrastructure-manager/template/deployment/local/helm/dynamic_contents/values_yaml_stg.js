/*
 * Template group values_yaml
 * Compiled on Mon Dec 28 2020 18:41:11 GMT+0530 (India Standard Time)
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
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "project_name", { file: gFile, line: 2, column: 29 }));
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
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "project_name", { file: gFile, line: 7, column: 18 }));
    w.write("\n");
    w.pushIndentation("  ");
    w.write("namespace: ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "project_name", { file: gFile, line: 8, column: 21 }));
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
    w.pushIndentation("  ");
    w.write("apigateway:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: apigateway");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("type: NodePort");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 8000  ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 8000");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("nodePort: 31234");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("camunda:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: camunda");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("type: NodePort");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 8002");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 8002");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("authproxy:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: authproxy");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("type: NodePort");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 8001");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 8001");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("security:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: securitymanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("type: NodePort");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 8003");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 8003");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("admin:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: adminmanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("type: NodePort");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 8004");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 8004");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("mongo:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: mongo");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("type: NodePort");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 27017");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 27017");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("desktop:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: desktop");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("type: NodePort");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 5000");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: 5000");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("camundapod:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: camundapod");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("type: NodePort");
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
    if (st.test(st.prop(s, g, rc, s.object, "custom_node", { file: gFile, line: 55, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "custom_node", { file: gFile, line: 55, column: 32 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("  ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 56, column: 21 }));
                     w.write(": ");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("name: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 57, column: 23 }));
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("type: NodePort");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("port: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 59, column: 23 }));
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("targetPort: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 60, column: 29 }));
                     w.write("\n");
            }, [
            { name: "custom_node"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
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
    w.pushIndentation("  ");
    w.write("apigateway:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("name: apigateway");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("image: geppettotest/");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "project_name", { file: gFile, line: 68, column: 33 }));
    w.write("-apigateway:1.0");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("mongo:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("name: mongo");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("image: mongo:3.2   ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("camunda:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("name: camunda");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("image: geppettodistribution/default-camunda:2.0");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("authproxy:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("name: authproxy");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("image: geppettodistribution/default-authproxy:2.0");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("security:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("name: securitymanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("image: geppettodistribution/default-securitymanager:2.0");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("admin:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("name: adminmanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("image: geppettodistribution/default-adminmanager:2.0");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("desktop:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("name: desktop");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("image: geppettotest/");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "project_name", { file: gFile, line: 86, column: 33 }));
    w.write("-desktop:1.0");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "custom_node", { file: gFile, line: 87, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "custom_node", { file: gFile, line: 87, column: 32 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("  ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 88, column: 21 }));
                     w.write(": ");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("name: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 89, column: 23 }));
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("image: geppettotest/");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "project_name", { file: gFile, line: 90, column: 32 }));
                     w.write("-");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 90, column: 59 }));
                     w.write(":1.0");
                     w.write("\n");
            }, [
            { name: "custom_node"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write("camundapod:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("name: camundapod");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("image: geppettodistribution/camunda-local:Jan2021");
    w.popIndentation();
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
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "project_name", { file: gFile, line: 98, column: 29 }));
    w.write("-2021");
    w.write("\n");
    w.write("\n");
    w.write("persistentVolume:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("mongo:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("storage: 5Gi  ");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("persistentVolumeClaim:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("mongo:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("storage: 5Gi");
    w.popIndentation();
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
        { name: "object"     }
];
group.addTemplate("/values_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;