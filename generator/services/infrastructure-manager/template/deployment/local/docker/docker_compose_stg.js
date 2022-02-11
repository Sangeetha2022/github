/*
 * Template group docker_compose
 * Compiled on Wed Feb 09 2022 15:46:46 GMT+0530 (India Standard Time)
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
    w.write("image: geppettotest/mongo-local:sept2021");
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
    w.pushIndentation("    ");
    w.write("logging:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("driver: \"fluentd\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("options:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-address: 0.0.0.0:24224");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-async-connect: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("tag: fluent");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("vault:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: vault");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: vault-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"8200:8200\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("environment:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("VAULT_SERVER: \"http://127.0.0.1:8200\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("VAULT_DEV_ROOT_TOKEN_ID: vault-geppetto-2021");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("cap_add:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- IPC_LOCK");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("logging:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("driver: \"fluentd\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("options:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-address: 0.0.0.0:24224");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-async-connect: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("tag: fluent");
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
    w.pushIndentation("    ");
    w.write("logging:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("driver: \"fluentd\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("options:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-address: 0.0.0.0:24224");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-async-connect: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("tag: fluent");
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
    w.write("- gcam");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- camunda");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("logging:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("driver: \"fluentd\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("options:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-address: 0.0.0.0:24224");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-async-connect: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("tag: fluent");
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
    w.pushIndentation("    ");
    w.write("logging:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("driver: \"fluentd\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("options:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-address: 0.0.0.0:24224");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-async-connect: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("tag: fluent");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("systemcredentialmanager:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("build: ../../../application/services/default_services/systemcredentialmanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: systemcredentialmanager-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: systemcredentialmanager-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"8005:8005\"");
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
    w.write("- vault");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("logging:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("driver: \"fluentd\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("options:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-address: 0.0.0.0:24224");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-async-connect: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("tag: fluent");
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
    w.pushIndentation("      ");
    w.write("- securitymanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("logging:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("driver: \"fluentd\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("options:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-address: 0.0.0.0:24224");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-async-connect: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("tag: fluent");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("gepfilemanager:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("build: ../../../application/services/default_services/gepfilemanager");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: gepfilemanager-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: gepfilemanager-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"3015:3015\"");
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
    w.pushIndentation("    ");
    w.write("logging:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("driver: \"fluentd\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("options:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-address: 0.0.0.0:24224");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-async-connect: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("tag: fluent");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("gcam:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("build: ../../../application/services/default_services/gcam");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: gcam-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: gcam-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"8007:8007\"");
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
    w.write("- vault");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("logging:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("driver: \"fluentd\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("options:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-address: 0.0.0.0:24224");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-async-connect: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("tag: fluent");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("\n");
    w.popIndentation();
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
    w.pushIndentation("      ");
    w.write("- systemcredentialmanager");
    w.popIndentation();
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 173, column: 19 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 173, column: 48 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("      - ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 174, column: 39 }));
                     w.write("\n");
            }, [
            { name: "custom_node"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ""});
    
    
    }
    w.write("\n");
    w.pushIndentation("    ");
    w.write("logging:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("driver: \"fluentd\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("options:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-address: 0.0.0.0:24224");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fluentd-async-connect: \"true\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("tag: fluent");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("elasticsearch:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: elasticsearch:7.16.2");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: elasticsearch-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("restart: always");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("environment:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- cluster.name=elasticsearch");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- node.name=elasticsearch");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- discovery.seed_hosts=elasticsearch");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- cluster.initial_master_nodes=elasticsearch");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- bootstrap.memory_lock=true # along with the memlock settings below, disables swapping");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"ES_JAVA_OPTS=-Xms512m -Xmx512m\" # minimum and maximum Java heap size, recommend setting both to 50% of system RAM");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ulimits:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("memlock:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("soft: -1");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("hard: -1");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("nofile:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("soft: 262144 # maximum number of open files for the Elasticsearch user, set to at least 65536 on modern systems");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("hard: 262144");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("volumes:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- elasticsearch:/usr/share/elasticsearch/data");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("expose:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- 9200");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- 9200:9200");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- 9600:9600 # required for Performance Analyzer");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("kibana:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: kibana:7.16.2");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: kibana-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("restart: always");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- 5601:5601");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("expose:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"5601\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("environment:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("ELASTICSEARCH_URL: http://elasticsearch:9200");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("ELASTICSEARCH_HOSTS: http://elasticsearch:9200");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("fluentd:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("image: fluentd-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("build: ../../../application/services/default_services/fluentd/fluend");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("volumes:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- ../../../application/services/default_services/fluentd/conf:/fluentd/etc");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("links:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"elasticsearch\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("restart: always");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("container_name: fluentd-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ports:");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"24224:24224\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("- \"24224:24224/udp\"");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 235, column: 19 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 235, column: 48 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("  ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 236, column: 21 }));
                     w.write(": ");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("build: ../../../application/services/custom_services/");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 237, column: 70 }));
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("image: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 238, column: 24 }));
                     w.write("-");
                     st.write(w, s, g, rc, s.uuid);
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("container_name: ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 239, column: 33 }));
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
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 241, column: 21 }));
                     w.write(":");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 241, column: 40 }));
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
                     w.pushIndentation("    ");
                     w.write("logging:");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("driver: \"fluentd\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("options:");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("fluentd-address: 0.0.0.0:24224");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("fluentd-async-connect: \"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("tag: fluent");
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
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 254, column: 18 }));
    w.popIndentation();
    w.write("-volume:");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("driver: local");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("elasticsearch:");
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