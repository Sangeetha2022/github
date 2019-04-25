/*
 * Template group docker_image_script
 * Compiled on Thu Apr 04 2019 13:35:27 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "docker_image_script"; 

group.name = "docker_image_script";





//
// Template /docker_image_script
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("#!/bin/bash");
    w.write("\n");
    w.write("\n");
    w.write("SYSTEMENTRYIMAGENAME='tharanirajan/");
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0'");
    w.write("\n");
    w.write("# PORT='8000'");
    w.write("\n");
    w.write("SYSTEMENTRYCODE='system_entry_path'");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("SYSTEMENTRYIMAGE=$(docker images | awk '{ print $1,$2 }' | grep $SYSTEMENTRYIMAGENAME | awk '{print $1 }')");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("echo \"Runing.....\"");
    w.write("\n");
    w.write("\n");
    w.write("cd $SYSTEMENTRYCODE");
    w.write("\n");
    w.write("\n");
    w.write("updating_code () {");
    w.write("\n");
    w.write("\n");
    w.write("git pull");
    w.write("\n");
    w.write("\n");
    w.write("echo \"Code updated sucessfully.....\"");
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("delete_if_existing () {");
    w.write("\n");
    w.write("\n");
    w.write("if [ ! \"$SYSTEMENTRYIMAGE\" ];");
    w.write("\n");
    w.write("then");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("echo \"");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0 Image is not available\"");
    w.write("\n");
    w.write("else");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("echo \"Deleting ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0 Image\"");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("docker rmi -f $SYSTEMENTRYIMAGENAME");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("echo \"Deleted....\"");
    w.popIndentation();
    w.write("\n");
    w.write("fi");
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("build_and_push_image () {");
    w.write("\n");
    w.write("\n");
    w.write("docker build -t $SYSTEMENTRYIMAGENAME .");
    w.write("\n");
    w.write("if [ $? -eq 0 ]; then");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"image build sucessfully\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("docker push $SYSTEMENTRYIMAGENAME");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("if [ $? -eq 0 ]; then");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"image ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0 pushed sucessfully\"");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("else");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"image ");
    w.popIndentation();
    st.write(w, s, g, rc, s.project_name);
    w.write("-system-entry:1.0 push failed\"");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("fi");
    w.popIndentation();
    w.write("\n");
    w.write("else");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"image build failed\"");
    w.popIndentation();
    w.write("\n");
    w.write("fi");
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("# updating_code");
    w.write("\n");
    w.write("delete_if_existing");
    w.write("\n");
    w.write("build_and_push_image");
};
r.args = [
        { name: "project_name"     },
{ name: "system_entry_path"     }
];
group.addTemplate("/docker_image_script", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;