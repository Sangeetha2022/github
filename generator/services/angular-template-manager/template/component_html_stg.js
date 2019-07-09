/*
 * Template group component_html
 * Compiled on Fri Jul 05 2019 11:21:54 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component_html"; 

group.name = "component_html";





//
// Template /component_html
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    st.write(w, s, g, rc, s.htmlCode);
};
r.args = [
        { name: "htmlCode"     }
];
group.addTemplate("/component_html", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;