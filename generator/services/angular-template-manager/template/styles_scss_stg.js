/*
 * Template group styles_scss
 * Compiled on Fri Jul 05 2019 15:20:17 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "styles_scss"; 

group.name = "styles_scss";





//
// Template /styles_scss
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("/* You can add global styles to this file, and also import other style files */");
    w.write("\n");
    st.write(w, s, g, rc, s.styles);
};
r.args = [
        { name: "styles"     }
];
group.addTemplate("/styles_scss", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;