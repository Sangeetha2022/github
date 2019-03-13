/*
 * Template group aws_terraform
 * Compiled on Wed Mar 06 2019 16:26:31 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "aws_terraform"; 

group.name = "aws_terraform";





//
// Template /aws_terraform
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("# Amazon AWS Access Key");
    w.write("\n");
    w.write("aws_access_key = \"");
    st.write(w, s, g, rc, s.aws_access_key);
    w.write("\"");
    w.write("\n");
    w.write("\n");
    w.write("# Amazon AWS Secret Key");
    w.write("\n");
    w.write("aws_secret_key = \"");
    st.write(w, s, g, rc, s.aws_secret_key);
    w.write("\"");
    w.write("\n");
    w.write("\n");
    w.write("# Amazon AWS Key Pair Name");
    w.write("\n");
    w.write("ssh_key_name = \"");
    st.write(w, s, g, rc, s.ssh_key_name);
    w.write("\"");
    w.write("\n");
    w.write("\n");
    w.write("# Region where resources should be created");
    w.write("\n");
    w.write("region = \"us-east-1\"");
    w.write("\n");
    w.write("\n");
    w.write("# Resources will be prefixed with this to avoid clashing names");
    w.write("\n");
    w.write("prefix = \"");
    st.write(w, s, g, rc, s.project_name);
    w.write("\"");
    w.write("\n");
    w.write("\n");
    w.write("# Admin password to access Rancher");
    w.write("\n");
    w.write("admin_password = \"admin\"");
    w.write("\n");
    w.write("\n");
    w.write("# rancher/rancher image tag to use");
    w.write("\n");
    w.write("rancher_version = \"latest\"");
    w.write("\n");
    w.write("\n");
    w.write("# Count of agent nodes with role all");
    w.write("\n");
    w.write("count_agent_all_nodes = \"1\"");
    w.write("\n");
    w.write("\n");
    w.write("# Count of agent nodes with role etcd");
    w.write("\n");
    w.write("count_agent_etcd_nodes = \"1\"");
    w.write("\n");
    w.write("\n");
    w.write("# Count of agent nodes with role controlplane");
    w.write("\n");
    w.write("count_agent_controlplane_nodes = \"0\"");
    w.write("\n");
    w.write("\n");
    w.write("# Count of agent nodes with role worker");
    w.write("\n");
    w.write("count_agent_worker_nodes = \"1\"");
    w.write("\n");
    w.write("\n");
    w.write("# Docker version of host running `rancher/rancher`");
    w.write("\n");
    w.write("docker_version_server = \"17.03\"");
    w.write("\n");
    w.write("\n");
    w.write("# Docker version of host being added to a cluster (running `rancher/rancher-agent`)");
    w.write("\n");
    w.write("docker_version_agent = \"17.03\"");
    w.write("\n");
    w.write("\n");
    w.write("# AWS Instance Type");
    w.write("\n");
    w.write("type = \"t2.micro\"");
};
r.args = [
        { name: "project_name"     },
{ name: "aws_access_key"     },
{ name: "aws_secret_key"     },
{ name: "ssh_key_name"     }
];
group.addTemplate("/aws_terraform", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;