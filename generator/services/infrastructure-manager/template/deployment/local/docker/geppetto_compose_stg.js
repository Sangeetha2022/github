/*
 * Template group geppetto_compose
 * Compiled on Tue Feb 15 2022 19:20:56 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "geppetto_compose"; 

group.name = "geppetto_compose";





//
// Template /geppetto_compose
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("#!bin/bash");
    w.write("\n");
    w.write("\n");
    w.write("WEBCODE='../../../application/client/web/");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 4, column: 57 }));
    w.write("'");
    w.write("\n");
    w.write("\n");
    w.write("COMPOSEPATH='../../../../devops/local/docker/'");
    w.write("\n");
    w.write("\n");
    w.write("ENVPATH='../../.env'");
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("while getopts :cdrs option");
    w.write("\n");
    w.write("do");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("case \"$option\" in");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("c)  ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \"Creating new docker images and containers\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("cd $WEBCODE");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker build -t ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 17, column: 41 }));
    w.write("ui-");
    st.write(w, s, g, rc, s.uuid);
    w.write(" .");
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker run --name ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 18, column: 43 }));
    w.write("ui-");
    st.write(w, s, g, rc, s.uuid);
    w.write(" --restart=unless-stopped -d -p 5055:80 ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 18, column: 121 }));
    w.write("ui-");
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("         ");
    w.write("sleep 15");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \"UI build is done...\"");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("         ");
    w.write("cd $COMPOSEPATH");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker-compose up -d --build");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \"uploading the mongo script...\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("sleep 80");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker cp mongo.js mongo-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write(":/data/db/");
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker exec -ti mongo-");
    w.popIndentation();
    st.write(w, s, g, rc, s.uuid);
    w.write(" mongo -u admin -p 'password' --authenticationDatabase 'admin' ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 27, column: 116 }));
    w.write("_");
    st.write(w, s, g, rc, s.uuid);
    w.write(" /data/db/mongo.js");
    w.write("\n");
    w.pushIndentation("         ");
    w.write("sleep 10");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \"Process completed\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \" Your application is deployed here the link, http://localhost:5055 \"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write(";;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("d)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \"Now Deleting all containers and images\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker-compose down -v --rmi all ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker rm -f ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 35, column: 38 }));
    w.write("ui-");
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker rmi ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 36, column: 36 }));
    w.write("ui-");
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \"Process completed\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write(";;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("r)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \"Now Re-starting the stopped containers\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker-compose start");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker restart ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 42, column: 40 }));
    w.write("ui-");
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("         ");
    w.write("sleep 35");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \"Process completed\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write(";;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("s)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \"Now stopping the running containers\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker-compose stop");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write("docker stop ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 49, column: 37 }));
    w.write("ui-");
    st.write(w, s, g, rc, s.uuid);
    w.write("\n");
    w.pushIndentation("         ");
    w.write("echo \"Process completed\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("         ");
    w.write(";;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("*)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"Hmm, an invalid option was received. the valid option are.\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"Flag c - To Create new containers and images.\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"Flag d - To Delete all the containers and images.\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"Flag r - To Restart the stopped containers.\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"Flag s - To Stop the running containers.\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"Here's the usage statement:\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("echo \"bash geppetto_compose.sh -c (or) bash geppetto_compose.sh -d (or) bash geppetto_compose.sh -r (or) bash geppetto_compose.sh -s\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("       ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("        ");
    w.write(";;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("esac");
    w.popIndentation();
    w.write("\n");
    w.write("done");
    w.write("\n");
    w.write("\n");
    w.write("echo \"\"");
    w.write("\n");
    w.write("echo \"These are the usage options for help.\"");
    w.write("\n");
    w.write("echo \"Flag c - To Create new containers and images.\"");
    w.write("\n");
    w.write("echo \"Flag d - To Delete all the containers and images.\"");
    w.write("\n");
    w.write("echo \"Flag r - To Restart the stopped containers.\"");
    w.write("\n");
    w.write("echo \"Flag s - To Stop the running containers.\"");
    w.write("\n");
    w.write("echo \"Here's the usage statement:\"");
    w.write("\n");
    w.write("echo \"\"");
    w.write("\n");
    w.write("echo \"bash geppetto_compose.sh -c (or) bash geppetto_compose.sh -d (or) bash geppetto_compose.sh -r (or) bash geppetto_compose.sh -s\"");
    w.write("\n");
};
r.args = [
        { name: "projectdetails"     },
{ name: "uuid"     }
];
group.addTemplate("/geppetto_compose", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;