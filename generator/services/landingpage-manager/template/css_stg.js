/*
 * Template group css
 * Compiled on Fri Jun 14 2019 16:39:58 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "css"; 

group.name = "css";





//
// Template /css
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;

};
r.args = [
        
];
group.addTemplate("/css", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;