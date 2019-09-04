/*
 * Template group mongoscript
 * Compiled on Wed Sep 04 2019 16:17:23 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "mongoscript"; 

group.name = "mongoscript";





//
// Template /mongoscript
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("db.roles.find(");
    w.write("\n");
    w.write("{");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("$or: [{");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\"role\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"$in\": [\"Admin\", \"_id\"]");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("{");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\"role\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\"$in\": [\"Standarduser\", \"_id\"]");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("]");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write(").forEach(function (i) {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("var temp = {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"firstname\": \"gep\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"lastname\": \"user\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"username\": \"gepUser\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"password\": \"gepUser\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"email\": \"gepUser@gmail.com\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"role\": i._id,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"Idtoken\": \"\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"loggedinDate\": Date.now(),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"loggedoutDate\": Date.now()");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("if (i.role === \"Admin\") {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("temp.firstname = \"gep\";");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("temp.lastname = \"admin\";");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("temp.username = \"gepAdmin\";");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("temp.password = \"gepAdmin\";");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("temp.email = \"gepAdmin@gmail.com\";");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("temp.role = i._id;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("temp.Idtoken = \"\";");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("temp.loggedinDate = Date.now();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("temp.loggedoutDate = Date.now();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("db.User.insert(temp);");
    w.popIndentation();
    w.write("\n");
    w.write("});");
};
r.args = [
        
];
group.addTemplate("/mongoscript", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;