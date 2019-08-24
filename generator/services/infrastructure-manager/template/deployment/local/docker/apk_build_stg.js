/*
 * Template group apk_build
 * Compiled on Sat Aug 24 2019 15:57:15 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "apk_build"; 

group.name = "apk_build";





//
// Template /apk_build
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("#!bin/bash");
    w.write("\n");
    w.write("\n");
    w.write("PROJECTPATH='../../../application/client/mobile/android/'");
    w.write("\n");
    w.write("APKPATH='platforms/android/app/build/outputs/apk/debug'");
    w.write("\n");
    w.write("\n");
    w.write("PROJECTNAME='");
    st.write(w, s, g, rc, s.project_name);
    w.write("'");
    w.write("\n");
    w.write("\n");
    w.write("APITOKEN='4G66wZx1EqiPc8FFZsBlWoR0vHeztFOj'");
    w.write("\n");
    w.write("EMAIL='youremail@gmail.com'");
    w.write("\n");
    w.write("\n");
    w.write("build_apk(){");
    w.write("\n");
    w.write("\n");
    w.write("cd \"$PROJECTPATH$PROJECTNAME\"");
    w.write("\n");
    w.write("\n");
    w.write("ionic cordova platform add android");
    w.write("\n");
    w.write("if [ $? -eq 0 ]; then");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"android platform added sucessfully..!!\"");
    w.popIndentation();
    w.write("\n");
    w.write("else");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("echo \"add android platform failed ..!!\"");
    w.popIndentation();
    w.write("\n");
    w.write("fi");
    w.write("\n");
    w.write("\n");
    w.write("npm i -D -E @ionic/app-scripts");
    w.write("\n");
    w.write("npm i");
    w.write("\n");
    w.write("ionic cordova build android --device");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("if [ $? -eq 0 ]; then");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"android build success..!!\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("else");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"android build failed..!!\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("fi");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("upload_apk(){");
    w.write("\n");
    w.write("\n");
    w.write("echo \"uploading app file to installr..!!\"");
    w.write("\n");
    w.write("\n");
    w.write("cd $APKPATH");
    w.write("\n");
    w.write("\n");
    w.write("UPLOADRESPONSE=`curl -H \"X-InstallrAppToken: $APITOKEN\"  https://www.installrapp.com/apps.json -F \"qqfile=@app-debug.apk\" -F 'releaseNotes=These are the release notes for apk app'`");
    w.write("\n");
    w.write("APPID=`echo $UPLOADRESPONSE | jq -r .appData.id`");
    w.write("\n");
    w.write("\n");
    w.write("echo \"app file uploaded appId : $APPID\"");
    w.write("\n");
    w.write("\n");
    w.write("echo \"sending email notification..!!\"");
    w.write("\n");
    w.write("\n");
    w.write("EMAILRESPONSE=`curl -H \"X-InstallrAppToken: $APITOKEN\" https://www.installrapp.com/apps/$APPID/builds/latest/team.json -F \"notify=$EMAIL\"`");
    w.write("\n");
    w.write("EMAILSTATUS=`echo $EMAILRESPONSE | jq -r .result`");
    w.write("\n");
    w.write("\n");
    w.write("echo \"email status:$EMAILSTATUS\"");
    w.write("\n");
    w.write("echo \"Check your e-mail for apk from installr...!\"");
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
    w.write("build_apk");
    w.write("\n");
    w.write("upload_apk");
    w.write("\n");
};
r.args = [
        { name: "project_name"     },
{ name: "base_path"     }
];
group.addTemplate("/apk_build", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;