/*
 * Template group packageJson
 * Compiled on Fri Sep 25 2020 15:20:59 GMT+0530 (India Standard Time)
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
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "name", { file: gFile, line: 3, column: 19 }));
    w.write("\",");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"version\": \"1.0.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"description\": \"");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "description", { file: gFile, line: 5, column: 26 }));
    w.write("\",");
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
    w.write("\"nodemon\": \"^1.18.9\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"node-fetch\": \"^2.6.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"request\": \"^2.88.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"request-promise-native\": \"^1.0.5\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"typescript\": \"^3.2.4\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"winston\": \"^3.2.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"winston-daily-rotate-file\": \"^3.6.0\"");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.object, "dependencies", { file: gFile, line: 28, column: 52 }))) {
    
        w.write(",\n");
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "dependencies", { file: gFile, line: 28, column: 79 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("\t\t \"");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "name", { file: gFile, line: 28, column: 127 }));
                     w.write("\": \"");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "version", { file: gFile, line: 28, column: 148 }));
                     w.write("\" ");
            }, [
            { name: "dependency"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ",\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/packageJson", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;