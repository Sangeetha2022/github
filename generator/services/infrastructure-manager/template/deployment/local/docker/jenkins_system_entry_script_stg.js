/*
 * Template group jenkins_system_entry_script
 * Compiled on Mon Apr 29 2019 19:12:13 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "jenkins_system_entry_script"; 

group.name = "jenkins_system_entry_script";





//
// Template /jenkins_system_entry_script
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("<?xml version='1.1' encoding='UTF-8'?>");
    w.write("\n");
    w.write("<project>");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<actions/>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<description>This job will build image for generated applications</description>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<keepDependencies>false</keepDependencies>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<properties/>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<scm class=\"hudson.scm.NullSCM\"/>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<canRoam>true</canRoam>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<disabled>false</disabled>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<triggers/>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<concurrentBuild>false</concurrentBuild>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<builders>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("<hudson.tasks.Shell>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<command>#!/bin/bash");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("sudo su - root");
    w.write("\n");
    w.write("BASEPATH=&apos;");
    st.write(w, s, g, rc, s.base_path);
    w.write("&apos;");
    w.write("\n");
    w.write("\n");
    w.write("SYSTEMENTRYCODE=&apos;");
    st.write(w, s, g, rc, s.system_entry_path);
    w.write("&apos;");
    w.write("\n");
    w.write("SYSTEMENTRYIMAGENAME=&apos;tharanirajan/");
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0&apos;");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("SYSTEMENTRYIMAGE=$(sudo docker images | awk &apos;{ print $1,$2 }&apos; | grep tharanirajan/");
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry | awk &apos;{print $1 }&apos;)");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("echo &quot;Runing.....&quot;");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("update_code () {");
    w.write("\n");
    w.write("\n");
    w.write("cd $BASEPATH");
    w.write("\n");
    w.write("\n");
    w.write("git pull");
    w.write("\n");
    w.write("if [ $? -eq 0 ]; then");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo &quot;Code updated sucessfully.....&quot;");
    w.popIndentation();
    w.write("\n");
    w.write("else");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo &quot;git pull failed!&quot;");
    w.popIndentation();
    w.write("\n");
    w.write("fi");
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("delete_if_existing_system_entry () {");
    w.write("\n");
    w.write("\n");
    w.write("if [ ! &quot;$SYSTEMENTRYIMAGE&quot; ];");
    w.write("\n");
    w.write("then");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("echo &quot;");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0 Image is not available&quot;");
    w.write("\n");
    w.write("else");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("echo &quot;Deleting ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0 Image&quot;");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("sudo docker rmi -f $SYSTEMENTRYIMAGENAME");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("echo &quot;Deleted....&quot;");
    w.popIndentation();
    w.write("\n");
    w.write("fi");
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("build_and_push_image_system_entry () {");
    w.write("\n");
    w.write("\n");
    w.write("cd $SYSTEMENTRYCODE");
    w.write("\n");
    w.write("sudo npm install");
    w.write("\n");
    w.write("sudo npm install --unsafe-perm node-sass");
    w.write("\n");
    w.write("sudo ng build");
    w.write("\n");
    w.write("if [ $? -eq 0 ]; then");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("sudo docker build -t $SYSTEMENTRYIMAGENAME .");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("if [ $? -eq 0 ]; then");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo &quot;image build sucessfully&quot;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("sudo docker push $SYSTEMENTRYIMAGENAME");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if [ $? -eq 0 ]; then");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("echo &quot;image ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0 pushed sucessfully&quot;");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("else");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("echo &quot;image ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0 push failed&quot;");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("fi");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("else");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo &quot;");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0 image build failed&quot;");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("fi");
    w.popIndentation();
    w.write("\n");
    w.write("else");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo &quot;ng build failed!&quot;");
    w.popIndentation();
    w.write("\n");
    w.write("fi");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("#update_code");
    w.write("\n");
    w.write("delete_if_existing_system_entry");
    w.write("\n");
    w.write("build_and_push_image_system_entry</command>");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("</hudson.tasks.Shell>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("</builders>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<publishers/>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<buildWrappers/>");
    w.popIndentation();
    w.write("\n");
    w.write("</project>");
};
r.args = [
        { name: "project_name"     },
{ name: "system_entry_path"     },
{ name: "base_path"     }
];
group.addTemplate("/jenkins_system_entry_script", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;