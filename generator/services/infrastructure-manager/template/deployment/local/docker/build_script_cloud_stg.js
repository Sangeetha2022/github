/*
 * Template group build_script_cloud
 * Compiled on Fri Jan 07 2022 14:15:14 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "build_script_cloud"; 

group.name = "build_script_cloud";





//
// Template /build_script_cloud
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("#!bin/bash");
    w.write("\n");
    w.write("\n");
    w.write("APPLICATION='/");
    st.write(w, s, g, rc, s.project_name);
    w.write("'");
    w.write("\n");
    w.write("\n");
    w.write("CUSTOMSERVICEPATH='../../../services/custom_services'");
    w.write("\n");
    w.write("\n");
    w.write("HELMPATH='../devops/cloud'");
    w.write("\n");
    w.write("\n");
    w.write("WEBCODE='../../../application/client/web/");
    st.write(w, s, g, rc, s.project_name);
    w.write("'");
    w.write("\n");
    w.write("WEBIMAGENAME='geppettotest/");
    st.write(w, s, g, rc, s.project_name);
    w.write("-web:1.0'");
    w.write("\n");
    w.write("\n");
    w.write("echo \"Started to build docker images for pod....\"");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("build_appbuilder_image () {");
    w.write("\n");
    w.write("\n");
    w.write("cd $WEBCODE");
    w.write("\n");
    w.write("npm install");
    w.write("\n");
    w.write("npm rebuild node-sass");
    w.write("\n");
    w.write("npm uninstall @angular-devkit/build-angular");
    w.write("\n");
    w.write("npm install @angular-devkit/build-angular");
    w.write("\n");
    w.write("# if directory is exist");
    w.write("\n");
    w.write("[ -d \"$(pwd)/dist\" ] && rm -rf dist");
    w.write("\n");
    w.write("ng build");
    w.write("\n");
    w.write("docker build -t $WEBIMAGENAME .");
    w.write("\n");
    w.write("if [ $? -eq 0 ]; then");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("docker push $WEBIMAGENAME");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"$WEBIMAGENAME is successfully pushed\"");
    w.popIndentation();
    w.write("\n");
    w.write("else");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"Image $WEBIMAGENAME-web:1.0 build failed\"");
    w.popIndentation();
    w.write("\n");
    w.write("fi");
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("build_microservices(){");
    w.write("\n");
    w.write("\n");
    w.write("cd $CUSTOMSERVICEPATH");
    w.write("\n");
    w.write("\n");
    w.write("for d in * ; do");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("    ");
    w.write("echo \"building : $d\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("cd $d");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("if [ $? -eq 0 ]; then");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("docker build -t geppettotest$APPLICATION-$d:1.0 .");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if [ $? -eq 0 ]; then");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("echo \"geppettotest$APPLICATION-$d:1.0 build succesfully\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("docker push geppettotest$APPLICATION-$d:1.0 ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("sleep 2");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("cd ..");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("else");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("echo \"geppettotest$APPLICATION-$d:1.0 build failed\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fi        ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("else");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"$d is not a folder!\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("fi");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\n");
    w.popIndentation();
    w.write("done");
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("clean_images(){");
    w.write("\n");
    w.write("\n");
    w.write("docker rmi -f $WEBIMAGENAME");
    w.write("\n");
    w.write("\n");
    w.write("for d in * ; do");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("docker rmi -f geppettotest$APPLICATION-$d:1.0");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("if [ $? -eq 0 ]; then");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"geppettotest$APPLICATION-$d:1.0 deleted\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("cd ..");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("else");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"error in deleting geppettotest$APPLICATION-$d:1.0\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("fi");
    w.popIndentation();
    w.write("\n");
    w.write("done");
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("helm_install () {");
    w.write("\n");
    w.write("\n");
    w.write("cd $HELMPATH");
    w.write("\n");
    w.write("helm install --dry-run --debug ./helm");
    w.write("\n");
    w.write("helm install --name ");
    st.write(w, s, g, rc, s.project_name);
    w.write(" ./helm");
    w.write("\n");
    w.write("if [ $? -eq 0 ]; then");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"App Deployment is Done\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("export NODE_PORT=$(kubectl get --namespace ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write(" -o jsonpath=\"{.spec.ports[0].nodePort}\" services ");
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry)");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath=\"{.items[0].status.addresses[1].address}\")");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("export LOGGING_PORT=$(kubectl get --namespace ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-logging -o jsonpath=\"{.spec.ports[0].nodePort}\" services kibana)");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"------------------------\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"App Url : http://$NODE_IP:$NODE_PORT\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"------------------------\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"Logging Url : http://$NODE_IP:$LOGGING_PORT\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"------------------------\"");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("else");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"App deployment is Failed, there is a problem with helm charts\"");
    w.popIndentation();
    w.write("\n");
    w.write("fi");
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("build_appbuilder_image");
    w.write("\n");
    w.write("build_microservices");
    w.write("\n");
    w.write("clean_images");
    w.write("\n");
    w.write("helm_install");
    w.write("\n");
};
r.args = [
        { name: "project_name"     },
{ name: "base_path"     }
];
group.addTemplate("/build_script_cloud", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;