/*
 * Template group ipa_build
 * Compiled on Mon Aug 26 2019 13:03:52 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "ipa_build"; 

group.name = "ipa_build";





//
// Template /ipa_build
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("#!/bin/bash");
    w.write("\n");
    w.write("\n");
    w.write("PROJECTPATH='../../../application/client/mobile/ios/'");
    w.write("\n");
    w.write("CRTLOCATION='/Users/administrator/Documents/IonicTest/output/363e98b5-8a62-4070-9d18-b18dbb5cb7bf.mobileprovision'");
    w.write("\n");
    w.write("\n");
    w.write("PROJECTNAME='");
    st.write(w, s, g, rc, s.project_name);
    w.write("'");
    w.write("\n");
    w.write("\n");
    w.write("#installr");
    w.write("\n");
    w.write("APITOKEN='4G66wZx1EqiPc8FFZsBlWoR0vHeztFOj'");
    w.write("\n");
    w.write("EMAIL='youremail@gmail.com'");
    w.write("\n");
    w.write("\n");
    w.write("build_code(){");
    w.write("\n");
    w.write("\n");
    w.write("cd \"$PROJECTPATH$PROJECTNAME\"");
    w.write("\n");
    w.write("\n");
    w.write("ionic cordova platform add ios");
    w.write("\n");
    w.write("if [ $? -eq 0 ]; then");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"ios platform added sucessfully!\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("npm i -D -E @ionic/app-scripts");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("ionic cordova build ios");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("if [ $? -eq 0 ]; then");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"ios build success!\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("else");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"ios build failed!\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("fi");
    w.popIndentation();
    w.write("\n");
    w.write("else");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"add ios platform failed!\"");
    w.popIndentation();
    w.write("\n");
    w.write("fi");
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("build_ipa(){");
    w.write("\n");
    w.write("cd platforms/ios/build/emulator/");
    w.write("\n");
    w.write("\n");
    w.write("mkdir ./Payload");
    w.write("\n");
    w.write("\n");
    w.write("cp -R \"$PROJECTNAME.app\" ./Payload");
    w.write("\n");
    w.write("\n");
    w.write("cp $CRTLOCATION Payload/$PROJECTNAME.app/embedded.mobileprovision");
    w.write("\n");
    w.write("\n");
    w.write("zip -qr \"$PROJECTNAME.ipa\" Payload/");
    w.write("\n");
    w.write("\n");
    w.write("rm -rf ./Payload");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("upload_ipa(){");
    w.write("\n");
    w.write("\n");
    w.write("echo \"uploading app file to installr..\"");
    w.write("\n");
    w.write("\n");
    w.write("UPLOADRESPONSE=`curl -H \"X-InstallrAppToken: $APITOKEN\"  https://www.installrapp.com/apps.json -F \"qqfile=@$PROJECTNAME.ipa\" -F 'releaseNotes=These are the release notes for first app'`");
    w.write("\n");
    w.write("APPID=`echo $UPLOADRESPONSE | jq -r .appData.id`");
    w.write("\n");
    w.write("\n");
    w.write("echo \"app file uploaded appId : $APPID\"");
    w.write("\n");
    w.write("\n");
    w.write("echo \"sending email notification..\"");
    w.write("\n");
    w.write("\n");
    w.write("EMAILRESPONSE=`curl -H \"X-InstallrAppToken: $APITOKEN\" https://www.installrapp.com/apps/$APPID/builds/latest/team.json -F \"notify=$EMAIL\"`");
    w.write("\n");
    w.write("EMAILSTATUS=`echo $EMAILRESPONSE | jq -r .result`");
    w.write("\n");
    w.write("\n");
    w.write("echo \"email status:$EMAILSTATUS\"");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("build_code");
    w.write("\n");
    w.write("build_ipa");
    w.write("\n");
    w.write("upload_ipa");
    w.write("\n");
};
r.args = [
        { name: "project_name"     },
{ name: "base_path"     }
];
group.addTemplate("/ipa_build", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;