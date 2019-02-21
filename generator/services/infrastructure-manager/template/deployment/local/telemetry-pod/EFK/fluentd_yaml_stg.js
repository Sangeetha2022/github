/*
 * Template group fluentd_yaml
 * Compiled on Thu Feb 21 2019 13:17:05 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "fluentd_yaml"; 

group.name = "fluentd_yaml";





//
// Template /fluentd_yaml
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("apiVersion: v1");
    w.write("\n");
    w.write("kind: ServiceAccount");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: fluentd");
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
    w.write("app: fluentd");
    w.popIndentation();
    w.write("\n");
    w.write("---");
    w.write("\n");
    w.write("apiVersion: rbac.authorization.k8s.io/v1");
    w.write("\n");
    w.write("kind: ClusterRole");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: fluentd");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("labels:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("app: fluentd");
    w.popIndentation();
    w.write("\n");
    w.write("rules:");
    w.write("\n");
    w.write("- apiGroups:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- \"\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("resources:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- pods");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- namespaces");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("verbs:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- get");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- list");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("- watch");
    w.popIndentation();
    w.write("\n");
    w.write("---");
    w.write("\n");
    w.write("kind: ClusterRoleBinding");
    w.write("\n");
    w.write("apiVersion: rbac.authorization.k8s.io/v1");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: fluentd");
    w.popIndentation();
    w.write("\n");
    w.write("roleRef:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("kind: ClusterRole");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: fluentd");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("apiGroup: rbac.authorization.k8s.io");
    w.popIndentation();
    w.write("\n");
    w.write("subjects:");
    w.write("\n");
    w.write("- kind: ServiceAccount");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: fluentd");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("namespace: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-logging");
    w.write("\n");
    w.write("---");
    w.write("\n");
    w.write("apiVersion: apps/v1");
    w.write("\n");
    w.write("kind: DaemonSet");
    w.write("\n");
    w.write("metadata:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("name: fluentd");
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
    w.write("app: fluentd");
    w.popIndentation();
    w.write("\n");
    w.write("spec:");
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
    w.write("app: fluentd");
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
    w.write("app: fluentd");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("spec:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("serviceAccount: fluentd");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("serviceAccountName: fluentd");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("tolerations:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- key: node-role.kubernetes.io/master");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("effect: NoSchedule");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("containers:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- name: fluentd");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("imagePullPolicy: Always");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("image: fluent/fluentd-kubernetes-daemonset:v0.12-debian-elasticsearch");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("env:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("- name:  FLUENT_ELASTICSEARCH_HOST");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("value: \"elasticsearch.");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-logging.svc.cluster.local\"");
    w.write("\n");
    w.pushIndentation("          ");
    w.write("- name:  FLUENT_ELASTICSEARCH_PORT");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("value: \"9200\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("- name: FLUENT_ELASTICSEARCH_SCHEME");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("value: \"http\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("- name: FLUENT_UID");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("value: \"0\"");
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
    w.write("memory: 512Mi");
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
    w.pushIndentation("            ");
    w.write("memory: 200Mi");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- containerPort: 24224    ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("volumeMounts:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- name: varlog");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("mountPath: /var/log");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("- name: varlibdockercontainers");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("mountPath: /var/lib/docker/containers");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("readOnly: true ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("terminationGracePeriodSeconds: 30");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("volumes:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- name: varlog");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("hostPath:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("path: /var/log");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- name: varlibdockercontainers");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("hostPath:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("path: /var/lib/docker/containers");
    w.popIndentation();
    w.write("\n");
    w.write(" ");
};
r.args = [
        { name: "project_name"     }
];
group.addTemplate("/fluentd_yaml", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;