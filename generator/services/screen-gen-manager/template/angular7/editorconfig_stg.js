/*
 * Template group editorconfig
 * Compiled on Thu Mar 14 2019 15:11:05 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "editorconfig"; 

group.name = "editorconfig";





//
// Template /editorconfig
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("# Editor configuration, see https://editorconfig.org");
    w.write("\n");
    w.write("root = true");
    w.write("\n");
    w.write("\n");
    w.write("[*]");
    w.write("\n");
    w.write("charset = utf-8");
    w.write("\n");
    w.write("indent_style = space");
    w.write("\n");
    w.write("indent_size = 2");
    w.write("\n");
    w.write("insert_final_newline = true");
    w.write("\n");
    w.write("trim_trailing_whitespace = true");
    w.write("\n");
    w.write("\n");
    w.write("[*.md]");
    w.write("\n");
    w.write("max_line_length = off");
    w.write("\n");
    w.write("trim_trailing_whitespace = false");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/editorconfig", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;