/*
 * Template group docker_compose
 * Compiled on Fri Feb 19 2021 23:17:16 GMT+0530 (India Standard Time)
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
    w.write("container_name: mongo-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("restart: unless-stopped");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("environment:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- MONGO_INITDB_ROOT_USERNAME=admin");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- MONGO_INITDB_ROOT_PASSWORD=password");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("volumes:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 12, column: 24 }));
    w.write("-volume:/data/db");
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
    w.write("image: geppettodistribution/camunda-local:Jan2021");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: camunda-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"0000:8080\"");
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
    w.write("image: authproxy-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: authproxy-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"0000:8001\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("env_file: .env");
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
    w.write("image: camundaservice-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: camundasvc-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"8002:8002\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("env_file: .env");
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
    w.write("image: securitymanager-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: securitymanager-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"8003:8003\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("env_file: .env");
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
    w.write("image: apigateway-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: apigateway-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"8000:8000\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("env_file: .env");
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
    if (st.test(st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 73, column: 19 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 73, column: 48 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("      - ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 74, column: 39 }));
                     w.write("\n");
            }, [
            { name: "custom_node"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ""});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 78, column: 19 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 78, column: 48 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("  ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 79, column: 21 }));
                     w.write(": ");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("build: ../../../application/services/custom_services/");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 80, column: 70 }));
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("image: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 81, column: 24 }));
                     w.write("-");
                     st.write(w, s, g, rc, s.uuid);
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("container_name: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 82, column: 33 }));
                     w.write("-");
                     st.write(w, s, g, rc, s.uuid);
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("ports: ");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("- ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 84, column: 21 }));
                     w.write(":");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 84, column: 40 }));
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("env_file: .env");
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
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 91, column: 18 }));
    w.popIndentation();
    w.write("-volume:");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("driver: local");
    w.popIndentation();
    w.write("\n");
};
r.args = [
        { name: "projectdetails"     },
{ name: "uuid"     }
];
group.addTemplate("/docker_compose", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;