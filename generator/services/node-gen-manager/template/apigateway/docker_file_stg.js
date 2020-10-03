/*
 * Template group docker_file
 * Compiled on Wed Jul 10 2019 12:39:44 GMT+0530 (India Standard Time)
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
        w.write("COPY . /");
        st.write(w, s, g, rc, s.filename);
        w.write("\n");
        w.write("WORKDIR /");
        st.write(w, s, g, rc, s.filename);
        w.write("\n");
        w.write("RUN npm install");
        w.write("\n");
        w.write("RUN npm i -g ts-node");
        w.write("\n");
        w.write("CMD npm run prod");
    };
    r.args = [
        { name: "filename" }
    ];
    group.addTemplate("/docker_file", r);


    return group;
}
getInstance.base = base;

module.exports = getInstance;