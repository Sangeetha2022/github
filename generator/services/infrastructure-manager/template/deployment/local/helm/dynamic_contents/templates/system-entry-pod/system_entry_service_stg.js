/*
 * Template group system_entry_service
 * Compiled on Wed Dec 09 2020 21:45:16 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "system_entry_service"; 

group.name = "system_entry_service";





//
// Template /system_entry_service
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
    w.write("labels:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: {{ .Values.app.prefix }}-system-entry");
    w.popIndentation();
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
    w.write("type: NodePort");
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
    w.write("port: {{ .Values.service.desktop.port }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: {{ .Values.service.desktop.targetPort }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- name: {{ .Values.service.apigateway.name }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: {{ .Values.service.apigateway.port }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("targetPort: {{ .Values.service.apigateway.targetPort }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("nodePort: {{ .Values.service.apigateway.nodePort }}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("name: {{ .Values.app.prefix }}-system-entry");
    w.popIndentation();
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/system_entry_service", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;