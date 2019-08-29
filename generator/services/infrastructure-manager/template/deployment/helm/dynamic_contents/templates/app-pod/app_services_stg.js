/*
 * Template group app_services
 * Compiled on Thu Aug 29 2019 20:41:05 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_services"; 

group.name = "app_services";





//
// Template /app_services
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
    w.write("type: NodePort");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- name: {{ .Values.service.authproxy.name }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: {{ .Values.service.authproxy.port }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: {{ .Values.service.authproxy.targetPort }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- name: {{ .Values.service.camunda.name }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: {{ .Values.service.camunda.port }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: {{ .Values.service.camunda.targetPort }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- name: {{ .Values.service.security.name }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: {{ .Values.service.security.port }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: {{ .Values.service.security.targetPort }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- name: {{ .Values.service.admin.name }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: {{ .Values.service.admin.port }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: {{ .Values.service.admin.targetPort }}");
    w.popIndentation();
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "custom_node", { file: gFile, line: 22, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "custom_node", { file: gFile, line: 22, column: 32 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("  - name: {{ .Values.service.");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 23, column: 48 }));
                     w.write(".name }}");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("port: {{ .Values.service.");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 24, column: 42 }));
                     w.write(".port }}");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("targetPort: {{ .Values.service.");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 25, column: 48 }));
                     w.write(".targetPort }}");
                     w.write("\n");
            }, [
            { name: "custom_node"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("app: {{ .Values.app.prefix }}-app");
    w.popIndentation();
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/app_services", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;