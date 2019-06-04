/*
 * Template group packageJson
 * Compiled on Tue Jun 04 2019 12:07:58 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "packageJson"; 

group.name = "packageJson";





//
// Template /packageJson
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("{");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"name\": \"");
    w.popIndentation();
    st.write(w, s, g, rc, s.name);
    w.write("\",");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"version\": \"1.0.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"description\": \"\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"main\": \"dist/server.js\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"scripts\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"test\": \"ng test\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"build\": \"tsc\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"dev\": \"ts-node ./src/server.ts\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"start\": \"nodemon ./dist/server.js\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"prod\": \"npm run build && npm run start\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"author\": \"Dan Castillo <dan.castillo@geppettosoftware.com>\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"license\": \"ISC\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"dependencies\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@types/express\": \"^4.16.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"body-parser\": \"^1.18.3\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"cors\": \"^2.8.5\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"express\": \"^4.16.4\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"express-winston\": \"^3.0.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"mongoose\": \"^5.4.9\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"node-async-loop\": \"^1.2.2\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"node-vault\": \"^0.9.5\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"nodemon\": \"^1.18.9\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"stringtemplate-js\": \"^0.1.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"typescript\": \"^3.3.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"util\": \"^0.11.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"winston\": \"^3.2.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"winston-daily-rotate-file\": \"^3.6.0\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        { name: "name"     },
{ name: "description"     }
];
group.addTemplate("/packageJson", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;