/*
 * Template group dao
 * Compiled on Mon Sep 27 2021 19:40:16 GMT+0530 (India Standard Time)
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
    w.write("import { SystemEntryService } from '../config/SystemEntryService';");
    w.write("\n");
    w.write("import fetch from 'node-fetch';");
    w.write("\n");
    w.write("const faker = require('faker');");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 7, column: 11 }), "outsideClass", { file: gFile, line: 7, column: 20 }))) {
    
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 9, column: 21 }));
    w.write("Dao {");
    w.write("\n");
    w.write("    ");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 10, column: 15 }), "insideClass", { file: gFile, line: 10, column: 24 }))) {
    
        w.write("\n");
        w.pushIndentation("    ");
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 11, column: 12 }), "insideClass", { file: gFile, line: 11, column: 21 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("private ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "variableName", { file: gFile, line: 11, column: 69 }));
                     w.write(" = ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "parentName", { file: gFile, line: 11, column: 98 }));
                     w.write(";");
            }, [
            { name: "variableObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
        w.popIndentation();
    
    
    }
    w.write("\n");
    w.pushIndentation("    ");
    w.write("constructor() { }");
    w.popIndentation();
    w.write("\n");
    w.write("    ");
    if (st.test(st.prop(s, g, rc, s.object, "flowAction", { file: gFile, line: 13, column: 15 }))) {
    
        w.write("\n");
        w.pushIndentation("    ");
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "flowAction", { file: gFile, line: 14, column: 12 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("public ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 14, column: 50 }));
                     w.write("(");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "parameter", { file: gFile, line: 14, column: 71 }));
                     w.write("){");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\nnew CustomLogger().showLogger('info', 'Enter into ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 15, column: 66 }));
                     w.write("Dao.ts: ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 15, column: 98 }));
                     w.write("')\n");
                     w.write("\n");
                     w.write("    ");
                     if (st.test(st.prop(s, g, rc, s.flowObj, "variable", { file: gFile, line: 16, column: 16 }))) {
                     
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "variable", { file: gFile, line: 16, column: 35 }));
                         w.write(";");
                         if (st.test(st.prop(s, g, rc, s.flowObj, "objectiteration", { file: gFile, line: 16, column: 57 }))) {
                         
                             st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "objectiteration", { file: gFile, line: 16, column: 83 }));
                             w.write(";");
                         
                         
                         }
                         w.write("\n;");
                     
                     
                     }
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\n");
                     w.popIndentation();
                     if (st.test(st.prop(s, g, rc, s.flowObj, "verbs", { file: gFile, line: 17, column: 20 }))) {
                     
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "verbs", { file: gFile, line: 17, column: 36 }));
                         if (st.test(st.prop(s, g, rc, s.flowObj, "query", { file: gFile, line: 17, column: 54 }))) {
                         
                             st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "query", { file: gFile, line: 17, column: 70 }));
                         
                         
                         }
                         w.write(".then(res => res.json().then(data\t=>\t({ data \n}))).then(obj=> callback(obj.data));");
                     
                     
                     }
                     w.write("}");
            }, [
            { name: "flowObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
        w.popIndentation();
    
    
    }
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
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