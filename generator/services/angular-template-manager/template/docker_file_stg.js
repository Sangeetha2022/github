/*
 * Template group docker_file
 * Compiled on Fri Sep 11 2020 15:47:23 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
    var r;
    var gFile = "docker_file";

    group.name = "docker_file";





    //
    // Template /docker_file
    //
    r = function(w, rc) {
        var g = this.owningGroup,
            s = this.scope;

        w.write("FROM node:14.11.0-alpine");
        w.write("\n");
        w.write("COPY . /app");
        w.write("\n");
        w.write("WORKDIR /app");
        w.write("\n");
        w.write("RUN npm install --save @ng-select/ng-select")
        w.write("\n");
        w.write("RUN npm install");
        w.write("\n");
        w.write("RUN npm install -g @angular/cli");
        w.write("\n");
        w.write("RUN npm install -g serve");
        w.write("\n");
        w.write("RUN npm install -g concurrently");
        w.write("\n");
        w.write("RUN npm upgrade -g @angular/cli");
        w.write("\n");
        w.write("CMD ng build  && concurrently \"ng build --watch\" \"serve dist/");
        st.write(w, s, g, rc, s.filename);
        w.write("\"");
        w.write("\n");
        w.write("EXPOSE 5000");
        w.write("\n");
    };
    r.args = [
        { name: "filename" }
    ];
    group.addTemplate("/docker_file", r);


    return group;
}
getInstance.base = base;

module.exports = getInstance;