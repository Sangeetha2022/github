/*
 * Template group constants
 * Compiled on Sat Jul 27 2019 12:52:47 GMT+0530 (India Standard Time)
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
    
    w.write("export const camundaUrl = process.env.CAMUNDA_URL;");
};
r.args = [
        
];
group.addTemplate("/constants", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;