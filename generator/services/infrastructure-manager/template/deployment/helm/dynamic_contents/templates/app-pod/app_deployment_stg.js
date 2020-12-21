/*
 * Template group app_deployment
 * Compiled on Sat Dec 05 2020 18:17:05 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_deployment"; 

group.name = "app_deployment";





//
// Template /app_deployment
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
    w.write("name: {{ .Values.app.prefix }}-app");
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
    w.write("name: {{ .Values.app.prefix }}-app");
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
    w.write("name: {{ .Values.app.prefix }}-app");
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
    w.write("- name: {{ .Values.deployment.authproxy.name }}-container");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("imagePullPolicy: {{ .Values.deployment.defaultImagePullPolicy }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("image: {{ .Values.deployment.authproxy.image }}");
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
    w.write("containerPort: 8001");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("env:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: {{ .Values.app.prefix }}-app-db");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: {{ .Values.app.prefix }}-app-db");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: MONGO_DB_URL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"mongodb://{{ .Values.app.prefix }}-app-db.{{ .Values.app.prefix }}.svc.cluster.local:27017/{{ .Values.app.prefix }}\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: CAMUNDAURL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"http://{{ .Values.app.prefix }}-app.{{ .Values.app.prefix }}.svc.cluster.local:8002\"          ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- name: {{ .Values.deployment.camunda.name }}-container");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("imagePullPolicy: {{ .Values.deployment.defaultImagePullPolicy }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("image: {{ .Values.deployment.camunda.image }}");
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
    w.write("containerPort: 8080");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("env:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: {{ .Values.app.prefix }}-app-db");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: {{ .Values.app.prefix }}-app-db");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: MONGO_DB_URL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"mongodb://{{ .Values.app.prefix }}-app-db.{{ .Values.app.prefix }}.svc.cluster.local:27017/{{ .Values.app.prefix }}\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: CAMUNDAPOD_URL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"http://{{ .Values.app.prefix }}-camunda-pod.{{ .Values.app.prefix }}.svc.cluster.local:8080\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("# - name: VAULT_API");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("#   value: \"http://vault.{{ .Values.app.namespace }}.svc.cluster.local:8200\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- name: {{ .Values.deployment.admin.name }}-container");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("imagePullPolicy: {{ .Values.deployment.defaultImagePullPolicy }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("image: {{ .Values.deployment.admin.image }}");
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
    w.write("containerPort: 8004");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("env:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: {{ .Values.app.prefix }}-app-db");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: {{ .Values.app.prefix }}-app-db");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("# - name: VAULT_API");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("#   value: \"http://vault.{{ .Values.app.namespace }}.svc.cluster.local:8200\"    ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- name: {{ .Values.deployment.security.name }}-container");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("imagePullPolicy: {{ .Values.deployment.defaultImagePullPolicy }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("image: {{ .Values.deployment.security.image }}");
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
    w.write("containerPort: 8003");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("env:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: {{ .Values.app.prefix }}-app-db");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: {{ .Values.app.prefix }}-app-db");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("- name: MONGO_DB_URL");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("value: \"mongodb://{{ .Values.app.prefix }}-app-db.{{ .Values.app.prefix }}.svc.cluster.local:27017/{{ .Values.app.prefix }}\"");
    w.popIndentation();
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "custom_node", { file: gFile, line: 68, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "custom_node", { file: gFile, line: 68, column: 32 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("        - name: {{ .Values.deployment.");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 69, column: 75 }));
                     w.write(".name }}-container");
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("imagePullPolicy: {{ .Values.deployment.customImagePullPolicy }}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("image: {{ .Values.deployment.");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 71, column: 52 }));
                     w.write(".image }}");
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
                     w.write("containerPort: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 74, column: 42 }));
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("env:");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("            ");
                     w.write("- name: {{ .Values.app.prefix }}-app-db");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("              ");
                     w.write("value: {{ .Values.app.prefix }}-app-db");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("            ");
                     w.write("- name: MONGO_DB_URL");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("              ");
                     w.write("value: \"mongodb://{{ .Values.app.prefix }}-app-db.{{ .Values.app.prefix }}.svc.cluster.local:27017/{{ .Values.app.prefix }}\"");
                     w.popIndentation();
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
group.addTemplate("/app_deployment", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;