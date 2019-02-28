/*
 * Template group model
 * Compiled on Mon Feb 25 2019 20:08:30 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "model"; 

group.name = "model";





//
// Template /model
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("import * as mongoose from 'mongoose';");
    w.write("\n");
    w.write("\n");
    w.write("const Schema = mongoose.Schema;");
    w.write("\n");
    w.write("\n");
    w.write("export const ");
    st.write(w, s, g, rc, s.ModelName);
    w.write("Schema = new Schema({");
    w.write("\n");
    w.pushIndentation("   ");
    st.write(w, s, g, rc, (function() {
    var tp = [],
    attr = s.fields;
    tp.push(st.makeSubTemplate(g, function(w, rc) {
        var g = this.owningGroup,
        s = this.scope;
        
                 st.write(w, s, g, rc, s.name);
        }, [
        { name: "name"     }
        ])); 
    return st.map(attr, tp);
    })(), {separator: ",\n"});
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
};
r.args = [
        { name: "ModelName"     },
{ name: "fields"     }
];
group.addTemplate("/model", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;