/*
 * Template group constants
 * Compiled on Fri Oct 09 2020 22:41:45 GMT+0530 (India Standard Time)
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
    
    w.write("export const camundaUrl = process.env.CAMUNDAURL;");
};
r.args = [
        
];
group.addTemplate("/constants", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;