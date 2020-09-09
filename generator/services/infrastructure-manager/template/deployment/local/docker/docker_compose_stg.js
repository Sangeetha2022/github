/*
 * Template group docker_compose
 * Compiled on Thu Aug 27 2020 23:04:00 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "docker_compose"; 

group.name = "docker_compose";





//
// Template /docker_compose
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("version: \"3.8\"");
    w.write("\n");
    w.write("services:");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("mongo:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: geppettotest/mongo-local:april2020");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: mongo");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("restart: unless-stopped");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("volumes:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- quotematic-volume:/data/db");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"27018:27017\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("healthcheck:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("test: echo 'db.runCommand({serverStatus:1}).ok' | mongo admin -u root -p root --quiet | grep 1");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("interval: 10s");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("timeout: 10s");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("retries: 5");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("start_period: 40s");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("camunda:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: geppettotest/camunda-local:april2020");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: camunda");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"8080:8080\"");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("authproxy:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("build: ../../../application/services/default_services/authproxy");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: authproxy");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: authproxy");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"3009:3009\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("env_file: ../../../application/services/.env");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("depends_on:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- mongo");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- camunda");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("camundaservice:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("build: ../../../application/services/default_services/camunda");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: camundaservice");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: camundasvc");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"3008:3008\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("env_file: ../../../application/services/.env");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("depends_on:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- mongo");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- camunda");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("securitymanager:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("build: ../../../application/services/default_services/securitymanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: securitymanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: securitymanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"3007:3007\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("env_file: ../../../application/services/.env");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("depends_on:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- mongo");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- camunda");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("apigateway:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("build: ../../../application/services/custom_services/apigateway");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: apigateway");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: apigateway");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"3000:3000\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("env_file: ../../../application/services/.env");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("depends_on:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- camunda");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- camundaservice");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- authproxy");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- securitymanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- adminmanager");
    w.popIndentation();
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 71, column: 19 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 71, column: 48 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("      - ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 72, column: 39 }));
                     w.write("\n");
            }, [
            { name: "custom_node"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ""});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("adminmanager:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("build: ../../../application/services/custom_services/adminmanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: adminmanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: adminmanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"3010:3010\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("env_file: ../../../application/services/.env");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 83, column: 19 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 83, column: 48 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("  ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 84, column: 21 }));
                     w.write(": ");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("build: ../../../application/services/custom_services/");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 85, column: 70 }));
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("image: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 86, column: 24 }));
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("container_name: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 87, column: 33 }));
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("ports: ");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("- ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 89, column: 21 }));
                     w.write(":");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 89, column: 40 }));
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("env_file: ../../../application/services/.env");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("depends_on:");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("- mongo");
                     w.popIndentation();
                     w.write("\n");
            }, [
            { name: "custom_node"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("volumes:");
    w.write("\n");
    w.pushIndentation("  ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 96, column: 18 }));
    w.popIndentation();
    w.write("-volume:");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("driver: local");
    w.popIndentation();
    w.write("\n");
};
r.args = [
        { name: "projectdetails"     }
];
group.addTemplate("/docker_compose", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;