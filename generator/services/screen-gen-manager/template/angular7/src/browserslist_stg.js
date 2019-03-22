/*
 * Template group browserslist
 * Compiled on Fri Mar 15 2019 10:59:42 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "browserslist"; 

group.name = "browserslist";





//
// Template /browserslist
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("# This file is currently used by autoprefixer to adjust CSS to support the below specified browsers");
    w.write("\n");
    w.write("# For additional information regarding the format and rule options, please see:");
    w.write("\n");
    w.write("# https://github.com/browserslist/browserslist#queries");
    w.write("\n");
    w.write("#");
    w.write("\n");
    w.write("# For IE 9-11 support, please remove 'not' from the last line of the file and adjust as needed");
    w.write("\n");
    w.write("\n");
    w.write("> 0.5%");
    w.write("\n");
    w.write("last 2 versions");
    w.write("\n");
    w.write("Firefox ESR");
    w.write("\n");
    w.write("not dead");
    w.write("\n");
    w.write("not IE 9-11");
};
r.args = [
        
];
group.addTemplate("/browserslist", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;