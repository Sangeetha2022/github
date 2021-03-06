/*
 * Template group service
 * Compiled on Fri Apr 02 2021 20:14:58 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "service"; 

group.name = "service";





//
// Template /service
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
    w.write("import { CustomLogger } from '../config/Logger';");
    w.write("\n");
    w.write("import * as jwt from 'jsonwebtoken';");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 5, column: 11 }), "outsideClass", { file: gFile, line: 5, column: 20 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 5, column: 42 }), "outsideClass", { file: gFile, line: 5, column: 51 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("let ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "variableName", { file: gFile, line: 5, column: 96 }));
                     w.write(" = ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "parentName", { file: gFile, line: 5, column: 125 }));
                     w.write(";");
            }, [
            { name: "variableObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 7, column: 21 }));
    w.write("Service {");
    w.write("\n");
    w.write("    ");
    if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 8, column: 15 }), "insideClass", { file: gFile, line: 8, column: 24 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, st.prop(s, g, rc, s.object, "variable", { file: gFile, line: 8, column: 45 }), "insideClass", { file: gFile, line: 8, column: 54 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("private ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "variableName", { file: gFile, line: 8, column: 102 }));
                     w.write(" = ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.variableObj, "parentName", { file: gFile, line: 8, column: 131 }));
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
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.object, "flowAction", { file: gFile, line: 11, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "flowAction", { file: gFile, line: 11, column: 31 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("public ");
                     if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.flowObj, "modifiersObject", { file: gFile, line: 11, column: 72 }), "modifiers", { file: gFile, line: 11, column: 88 }))) {
                     
                         w.write("async");
                     
                     
                     }
                     w.write(" ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 11, column: 121 }));
                     w.write("(req: Request, callback){");
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("new CustomLogger().showLogger('info', 'Enter into ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 12, column: 62 }));
                     w.write("Service.ts: ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 12, column: 98 }));
                     w.write("')");
                     w.write("\n");
                     w.write("     ");
                     if (st.test(st.prop(s, g, rc, s.flowObj, "variable", { file: gFile, line: 13, column: 17 }))) {
                     
                         w.write("let ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "variable", { file: gFile, line: 13, column: 40 }));
                     
                     
                     }
                     if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.flowObj, "modifiersObject", { file: gFile, line: 13, column: 68 }), "modifiers", { file: gFile, line: 13, column: 84 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("     ");
                         st.write(w, s, g, rc, (function() {
                         var tp = [],
                         attr = st.prop(s, g, rc, st.prop(s, g, rc, s.flowObj, "modifiersObject", { file: gFile, line: 14, column: 14 }), "variable_object", { file: gFile, line: 14, column: 30 });
                         tp.push(st.makeSubTemplate(g, function(w, rc) {
                             var g = this.owningGroup,
                             s = this.scope;
                             
                                      st.write(w, s, g, rc, s.variableObject);
                                      w.write("\n");
                                      w.write("     ");
                             }, [
                             { name: "variableObject"     }
                             ])); 
                         return st.map(attr, tp);
                         })(), {separator: "\n"});
                         w.popIndentation();
                         w.write("\n");
                         w.pushIndentation("     ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.flowObj, "modifiersObject", { file: gFile, line: 17, column: 14 }), "jwt_token_variable", { file: gFile, line: 17, column: 30 }));
                         w.popIndentation();
                         w.write("\n");
                         w.pushIndentation("     ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.flowObj, "modifiersObject", { file: gFile, line: 18, column: 14 }), "encoded_varibale", { file: gFile, line: 18, column: 30 }));
                         w.popIndentation();
                         w.write("\n");
                         w.pushIndentation("     ");
                         st.write(w, s, g, rc, (function() {
                         var tp = [],
                         attr = st.prop(s, g, rc, st.prop(s, g, rc, s.flowObj, "modifiersObject", { file: gFile, line: 19, column: 14 }), "modifiers", { file: gFile, line: 19, column: 30 });
                         tp.push(st.makeSubTemplate(g, function(w, rc) {
                             var g = this.owningGroup,
                             s = this.scope;
                             
                                      if (st.test(st.prop(s, g, rc, s.modifier, "modifier_variable", { file: gFile, line: 20, column: 21 }))) {
                                      
                                          st.write(w, s, g, rc, st.prop(s, g, rc, s.modifier, "modifier_variable", { file: gFile, line: 20, column: 50 }));
                                      
                                      
                                      }
                                      w.write("\n");
                                      w.write("     ");
                             }, [
                             { name: "modifier"     }
                             ])); 
                         return st.map(attr, tp);
                         })(), {separator: "\n"});
                         w.popIndentation();
                     
                     
                     }
                     w.write("\n");
                     w.pushIndentation("     ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 22, column: 13 }));
                     w.popIndentation();
                     w.write(".");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 22, column: 38 }));
                     w.write("(");
                     if (st.test(st.prop(s, g, rc, s.flowObj, "requestParameter", { file: gFile, line: 22, column: 62 }))) {
                     
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "requestParameter", { file: gFile, line: 22, column: 89 }));
                         w.write(",");
                     
                     
                     }
                     w.write("(");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "responseVariable", { file: gFile, line: 22, column: 124 }));
                     w.write(")=>{");
                     w.write("\n");
                     w.pushIndentation("             ");
                     w.write("new CustomLogger().showLogger('info', 'Exit from ");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "entityFileName", { file: gFile, line: 23, column: 70 }));
                     w.write("Service.ts: ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "methodName", { file: gFile, line: 23, column: 106 }));
                     w.write("')");
                     w.write("\n");
                     w.pushIndentation("         ");
                     w.write("callback(");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.flowObj, "responseVariable", { file: gFile, line: 24, column: 27 }));
                     w.write(");");
                     w.write("\n");
                     w.pushIndentation("         ");
                     w.write("});");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}");
                     w.popIndentation();
                     if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.flowObj, "modifiersObject", { file: gFile, line: 26, column: 18 }), "modifiers", { file: gFile, line: 26, column: 34 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("    ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.flowObj, "modifiersObject", { file: gFile, line: 27, column: 13 }), "jwt_verify", { file: gFile, line: 27, column: 29 }));
                         w.popIndentation();
                         w.write("\n");
                     
                     
                     }
                     w.write("\n");
                     w.write("    ");
            }, [
            { name: "flowObj"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.write("\n");
    w.write("}");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/service", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;