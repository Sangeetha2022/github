/*
 * Template group system_entry_deployment
 * Compiled on Wed Dec 09 2020 23:43:44 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "system_entry_deployment"; 

group.name = "system_entry_deployment";





//
// Template /system_entry_deployment
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("apiVersion: apps/v1");
    w.write("\n");
    w.write("kind: Deployment");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: {{ .Values.app.prefix }}-system-entry");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("namespace: {{ .Values.app.namespace }}");
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
    w.write("name: {{ .Values.app.prefix }}-system-entry");
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
    w.write("name: {{ .Values.app.prefix }}-system-entry");
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
    w.pushIndentation("        ");
    w.write("- name: {{ .Values.deployment.desktop.name }}-container");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("imagePullPolicy: {{ .Values.deployment.defaultImagePullPolicy }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("image: {{ .Values.deployment.desktop.image }}");
    w.popIndentation();
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
    w.write("containerPort: 5000     ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- name: {{ .Values.deployment.apigateway.name }}-container");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("imagePullPolicy: {{ .Values.deployment.defaultImagePullPolicy }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("image: {{ .Values.deployment.apigateway.image }}");
    w.popIndentation();
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
    w.write("containerPort: 8000");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("env:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: SECURITYURL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"http://{{ .Values.app.prefix }}-app.{{ .Values.app.namespace }}.svc.cluster.local:8003\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: CAMUNDAPOD_URL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"http://{{ .Values.app.prefix }}-camunda-pod.{{ .Values.app.namespace }}.svc.cluster.local:8080\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: AUTHPROXYURL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"http://{{ .Values.app.prefix }}-app.{{ .Values.app.namespace }}.svc.cluster.local:8001\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: ADMINURL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"http://{{ .Values.app.prefix }}-app.{{ .Values.app.namespace }}.svc.cluster.local:8004\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: CAMUNDAURL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"http://{{ .Values.app.prefix }}-app.{{ .Values.app.namespace }}.svc.cluster.local:8002\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: APIGATEWAY");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"http://{{ .Values.app.prefix }}-system-entry.{{ .Values.app.namespace }}.svc.cluster.local:8000\"  ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: MONGO_DB_URL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"mongodb://{{ .Values.app.prefix }}-app-db.{{ .Values.app.namespace }}.svc.cluster.local:27017/{{ .Values.app.prefix }}\"");
    w.popIndentation();
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "custom_node", { file: gFile, line: 45, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "custom_node", { file: gFile, line: 45, column: 32 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("            - name: ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "uppername", { file: gFile, line: 46, column: 69 }));
                     w.write("URL");
                     w.write("\n");
                     w.pushIndentation("              ");
                     w.write("value: \"http://{{ .Values.app.prefix }}-app.{{ .Values.app.namespace }}.svc.cluster.local:");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 47, column: 121 }));
                     w.write("\"");
                     w.write("\n");
            }, [
            { name: "custom_node"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/system_entry_deployment", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;