/*
 * Template group constants
 * Compiled on Thu Nov 25 2021 12:42:04 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "constants"; 

group.name = "constants";





//
// Template /constants
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("export const gcamUrl = process.env.GCAMURL;");
};
r.args = [
        
];
group.addTemplate("/constants", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;