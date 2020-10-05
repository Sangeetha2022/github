/*
 * Template group dao
 * Compiled on Mon Oct 05 2020 17:03:27 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "dao"; 

group.name = "dao";





//
// Template /dao
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(st.prop(s, g, rc, s.object, "import", { file: gFile, line: 2, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "import", { file: gFile, line: 2, column: 27 }), "dependencies", { file: gFile, line: 2, column: 34 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "name", { file: gFile, line: 2, column: 80 }));
                     w.write(" from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "path", { file: gFile, line: 2, column: 104 }));
                     w.write("';");
            }, [
            { name: "dependency"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("import { CustomLogger } from '../config/Logger'");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 4, column: 11 }), "outsideClass", { file: gFile, line: 4, column: 20 }))) {
    
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 6, column: 21 }));
    w.write("Dao {");
    w.write("\n");
    w.write("    ");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 7, column: 15 }), "insideClass", { file: gFile, line: 7, column: 24 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 7, column: 45 }), "insideClass", { file: gFile, line: 7, column: 54 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("private ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "variableName", { file: gFile, line: 7, column: 102 }));
                     w.write(" = ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "parentName", { file: gFile, line: 7, column: 131 }));
                     w.write(";");
            }, [
            { name: "variableObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("    ");
    w.write("constructor() { }");
    w.popIndentation();
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "flowAction", { file: gFile, line: 9, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "flowAction", { file: gFile, line: 9, column: 31 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("public ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 9, column: 69 }));
                     w.write("(");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "parameter", { file: gFile, line: 9, column: 90 }));
                     w.write("){\nnew CustomLogger().showLogger('info', 'Enter into ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 9, column: 164 }));
                     w.write("Dao.ts: ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 9, column: 196 }));
                     w.write("')\n");
                     if (st.test(st.prop(s, g, rc, s.flowObj, "variable", { file: gFile, line: 9, column: 225 }))) {
                     
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "variable", { file: gFile, line: 9, column: 244 }));
                         w.write(";");
                         if (st.test(st.prop(s, g, rc, s.flowObj, "objectiteration", { file: gFile, line: 9, column: 266 }))) {
                         
                             st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "objectiteration", { file: gFile, line: 9, column: 292 }));
                             w.write(";");
                         
                         
                         }
                         w.write("\n;");
                     
                     
                     }
                     w.write("\n");
                     if (st.test(st.prop(s, g, rc, s.flowObj, "verbs", { file: gFile, line: 9, column: 344 }))) {
                     
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "verbs", { file: gFile, line: 9, column: 360 }));
                         w.write("(");
                         if (st.test(st.prop(s, g, rc, s.flowObj, "query", { file: gFile, line: 9, column: 379 }))) {
                         
                             st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "query", { file: gFile, line: 9, column: 395 }));
                         
                         
                         }
                         w.write(").then((result)\t=>\t{\nnew CustomLogger().showLogger('info', 'Exit from ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 9, column: 495 }));
                         w.write("Dao.ts: ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 9, column: 527 }));
                         w.write("');\n");
                         if (st.test(! st.test(st.prop(s, g, rc, s.flowObj, "isJsonFormat", { file: gFile, line: 9, column: 558 })))) {
                         
                             w.write("callback(result);");
                         
                         
                         }
                         if (st.test(st.prop(s, g, rc, s.flowObj, "isJsonFormat", { file: gFile, line: 9, column: 608 }))) {
                         
                             w.write("callback(JSON.parse(result).");
                             st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "connectorEntityName", { file: gFile, line: 9, column: 659 }));
                             w.write(");");
                         
                         
                         }
                         w.write("\n}).catch((error)=>{\ncallback(error);\n});");
                     
                     
                     }
                     w.write("}");
            }, [
            { name: "flowObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.write("}");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/dao", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;