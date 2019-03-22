/*
 * Template group assets
 * Compiled on Wed Mar 20 2019 16:30:27 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "assets"; 

group.name = "assets";





//
// Template /assets
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(s.asset)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.asset;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
                     w.write(";");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
};
r.args = [
        { name: "asset"     }
];
group.addTemplate("/assets", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;