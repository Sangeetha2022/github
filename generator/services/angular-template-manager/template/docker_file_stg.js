/*
 * Template group docker_file
 * Compiled on Wed Jul 10 2019 11:39:16 GMT+0530 (India Standard Time)
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
    
    w.write("FROM nginx");
    w.write("\n");
    w.write("RUN rm -rf /usr/share/nginx/html/*");
    w.write("\n");
    w.write("COPY /dist/");
    st.write(w, s, g, rc, s.filename);
    w.write(" /usr/share/nginx/html");
    w.write("\n");
    w.write("COPY /nginx /etc/nginx/conf.d/");
    w.write("\n");
    w.write("CMD [\"nginx\", \"-g\", \"daemon off;\"]");
    w.write("\n");
};
r.args = [
        { name: "filename"     }
];
group.addTemplate("/docker_file", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;