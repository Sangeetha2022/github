/*
 * Template group app_deployment_yaml
 * Compiled on Thu Feb 21 2019 13:08:17 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
    var r;
    var gFile = "app_deployment_yaml";

    group.name = "app_deployment_yaml";





    //
    // Template /app_deployment_yaml
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
        w.write("name: ");
        w.popIndentation();
        st.write(w, s, g, rc, s.project_name);
        w.write("-app");
        w.write("\n");
        w.pushIndentation("  ");
        w.write("namespace: ");
        w.popIndentation();
        st.write(w, s, g, rc, s.project_name);
        w.write("\n");
        w.write("spec:");
        w.write("\n");
        w.pushIndentation("  ");
        w.write("replicas: 1");
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
        w.write("app: ");
        w.popIndentation();
        st.write(w, s, g, rc, s.project_name);
        w.write("-app");
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
        w.write("- name: node-container");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("          ");
        w.write("imagePullPolicy: Always");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("          ");
        w.write("image: tharanirajan/");
        w.popIndentation();
        st.write(w, s, g, rc, s.project_name);
        w.write("-app:2.0");
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
        w.write("containerPort: 3000");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("          ");
        w.write("env:");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("- name: ");
        w.popIndentation();
        st.write(w, s, g, rc, s.project_name);
        w.write("-app-db");
        w.write("\n");
        w.pushIndentation("              ");
        w.write("value: ");
        w.popIndentation();
        st.write(w, s, g, rc, s.project_name);
        w.write("-app-db");
        w.write("\n");
        w.pushIndentation("            ");
        w.write("- name: VAULT_API");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("              ");
        w.write("value: \"http://vault.");
        w.popIndentation();
        st.write(w, s, g, rc, s.project_name);
        w.write(".svc.cluster.local:8200\"  ");
    };
    r.args = [
        { name: "project_name" }
    ];
    group.addTemplate("/app_deployment_yaml", r);


    return group;
}
getInstance.base = base;

module.exports = getInstance;