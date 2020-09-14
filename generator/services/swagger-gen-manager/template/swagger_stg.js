/*
 * Template group swagger
 * Compiled on Mon Sep 14 2020 18:27:23 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "swagger"; 

group.name = "swagger";





//
// Template /swagger
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("---");
    w.write("\n");
    w.write("openapi: 3.0.0");
    w.write("\n");
    w.write("info:");
    if (st.test(st.prop(s, g, rc, s.details, "version", { file: gFile, line: 4, column: 17 }))) {
    
        w.write("\n");
        w.pushIndentation("   ");
        w.write("version: ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.details, "version", { file: gFile, line: 5, column: 21 }));
    
    
    }
    if (st.test(st.prop(s, g, rc, s.details, "projectName", { file: gFile, line: 5, column: 48 }))) {
    
        w.write("\n");
        w.pushIndentation("   ");
        w.write("title: ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.details, "projectName", { file: gFile, line: 6, column: 19 }));
        w.write(" open api specification");
    
    
    }
    if (st.test(st.prop(s, g, rc, s.details, "featureName", { file: gFile, line: 6, column: 73 }))) {
    
        w.write("\n");
        w.pushIndentation("   ");
        w.write("description: ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.details, "featureName", { file: gFile, line: 7, column: 25 }));
        w.write(" API");
    
    
    }
    if (st.test(st.prop(s, g, rc, s.details, "termsOfService", { file: gFile, line: 7, column: 60 }))) {
    
        w.write("\n");
        w.pushIndentation("   ");
        w.write("termsOfService: ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.details, "termsOfService", { file: gFile, line: 8, column: 28 }));
    
    
    }
    if (st.test(st.prop(s, g, rc, s.details, "contactName", { file: gFile, line: 8, column: 62 }))) {
    
        w.write("\n");
        w.pushIndentation("   ");
        w.write("contact:");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("      ");
        w.write("name: ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.details, "contactName", { file: gFile, line: 10, column: 21 }));
    
    
    }
    if (st.test(st.prop(s, g, rc, s.details, "contactEmail", { file: gFile, line: 10, column: 52 }))) {
    
        w.write("\n");
        w.pushIndentation("      ");
        w.write("email: ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.details, "contactEmail", { file: gFile, line: 11, column: 22 }));
    
    
    }
    if (st.test(st.prop(s, g, rc, s.details, "contactUrl", { file: gFile, line: 11, column: 54 }))) {
    
        w.write("\n");
        w.pushIndentation("      ");
        w.write("url: ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.details, "contactUrl", { file: gFile, line: 12, column: 20 }));
    
    
    }
    if (st.test(st.prop(s, g, rc, s.details, "licenseName", { file: gFile, line: 12, column: 50 }))) {
    
        w.write("\n");
        w.pushIndentation("   ");
        w.write("license:");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("      ");
        w.write("name: ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.details, "licenseName", { file: gFile, line: 14, column: 21 }));
    
    
    }
    if (st.test(st.prop(s, g, rc, s.details, "licenseUrl", { file: gFile, line: 14, column: 52 }))) {
    
        w.write("\n");
        w.pushIndentation("      ");
        w.write("url: ");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.details, "licenseUrl", { file: gFile, line: 15, column: 20 }));
    
    
    }
    w.write("\n");
    w.write("servers:");
    w.write("\n");
    w.write("   ");
    if (st.test(s.servers)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.servers;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     if (st.test(st.prop(s, g, rc, s.name, "url", { file: gFile, line: 17, column: 41 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("   ");
                         w.write("- url: ");
                         w.popIndentation();
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "url", { file: gFile, line: 18, column: 16 }));
                     
                     
                     }
                     if (st.test(st.prop(s, g, rc, s.name, "description", { file: gFile, line: 18, column: 36 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("     ");
                         w.write("description: ");
                         w.popIndentation();
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "description", { file: gFile, line: 19, column: 24 }));
                     
                     
                     }
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("tags:");
    w.write("\n");
    if (st.test(s.tags)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.tags;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     if (st.test(st.prop(s, g, rc, s.tag, "name", { file: gFile, line: 21, column: 30 }))) {
                     
                         w.write("\n");
                         w.write("- name: ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.tag, "name", { file: gFile, line: 22, column: 13 }));
                     
                     
                     }
                     if (st.test(st.prop(s, g, rc, s.tag, "description", { file: gFile, line: 22, column: 33 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("  ");
                         w.write("description: ");
                         w.popIndentation();
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.tag, "description", { file: gFile, line: 23, column: 20 }));
                     
                     
                     }
                     if (st.test(st.prop(s, g, rc, s.tag, "externalDocs", { file: gFile, line: 23, column: 47 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("  ");
                         w.write("externalDocs:");
                         w.popIndentation();
                         if (st.test(st.prop(s, g, rc, st.prop(s, g, rc, s.tag, "externalDocs", { file: gFile, line: 24, column: 23 }), "url", { file: gFile, line: 24, column: 36 }))) {
                         
                             w.write("\n");
                             w.pushIndentation("   ");
                             w.write("- url: ");
                             w.popIndentation();
                             st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.tag, "externalDocs", { file: gFile, line: 25, column: 15 }), "url", { file: gFile, line: 25, column: 28 }));
                         
                         
                         }
                         st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.tag, "externalDocs", { file: gFile, line: 25, column: 44 }), "description", { file: gFile, line: 25, column: 57 }));
                         w.write("\n");
                         w.pushIndentation("     ");
                         w.write("description: ");
                         w.popIndentation();
                         st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.tag, "externalDocs", { file: gFile, line: 26, column: 23 }), "description", { file: gFile, line: 26, column: 36 }));
                     
                     
                     }
            }, [
            { name: "tag"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("paths:");
    w.write("\n");
    w.write("   ");
    if (st.test(s.paths)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.paths;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     if (st.test(st.prop(s, g, rc, s.path, "endpoint", { file: gFile, line: 28, column: 37 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("   ");
                         w.write("\"");
                         w.popIndentation();
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.path, "endpoint", { file: gFile, line: 29, column: 10 }));
                         w.write("\":");
                     
                     
                     }
                     if (st.test(st.prop(s, g, rc, s.path, "method", { file: gFile, line: 29, column: 37 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("      ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.path, "method", { file: gFile, line: 30, column: 12 }));
                         w.popIndentation();
                         w.write(":");
                     
                     
                     }
                     w.write("\n");
                     w.pushIndentation("         ");
                     w.write("tags:");
                     w.popIndentation();
                     if (st.test(st.prop(s, g, rc, s.path, "tags", { file: gFile, line: 31, column: 23 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("         ");
                         w.write("- ");
                         w.popIndentation();
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.path, "tags", { file: gFile, line: 32, column: 17 }));
                     
                     
                     }
                     if (st.test(st.prop(s, g, rc, s.path, "description", { file: gFile, line: 32, column: 38 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("         ");
                         w.write("description: ");
                         w.popIndentation();
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.path, "description", { file: gFile, line: 33, column: 28 }));
                     
                     
                     }
                     if (st.test(st.prop(s, g, rc, s.path, "operationId", { file: gFile, line: 33, column: 56 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("         ");
                         w.write("operationId: ");
                         w.popIndentation();
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.path, "operationId", { file: gFile, line: 34, column: 28 }));
                     
                     
                     }
                     w.write("\n");
                     w.write("         ");
                     if (st.test(st.prop(s, g, rc, s.path, "parameters", { file: gFile, line: 35, column: 18 }))) {
                     
                         st.write(w, s, g, rc, (function() {
                         var tp = [],
                         attr = st.prop(s, g, rc, s.path, "parameters", { file: gFile, line: 35, column: 36 });
                         tp.push(st.makeSubTemplate(g, function(w, rc) {
                             var g = this.owningGroup,
                             s = this.scope;
                             
                                      if (st.test(st.prop(s, g, rc, s.param, "requestBody", { file: gFile, line: 35, column: 65 }))) {
                                      
                                          w.write("\n");
                                          w.pushIndentation("         ");
                                          w.write("requestBody:");
                                          w.popIndentation();
                                          if (st.test(st.prop(s, g, rc, s.param, "content", { file: gFile, line: 36, column: 31 }))) {
                                          
                                              w.write("\n");
                                              w.pushIndentation("            ");
                                              w.write("content:");
                                              w.popIndentation();
                                              w.write("\n");
                                              w.pushIndentation("               ");
                                              st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "content", { file: gFile, line: 38, column: 22 }));
                                              w.popIndentation();
                                              w.write(":");
                                          
                                          
                                          }
                                          if (st.test(st.prop(s, g, rc, s.param, "schema", { file: gFile, line: 38, column: 48 }))) {
                                          
                                              w.write("\n");
                                              w.pushIndentation("                  ");
                                              st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "schema", { file: gFile, line: 39, column: 25 }));
                                              w.popIndentation();
                                              w.write(":");
                                          
                                          
                                          }
                                          if (st.test(st.prop(s, g, rc, s.param, "ref", { file: gFile, line: 39, column: 50 }))) {
                                          
                                              w.write("\n");
                                              w.pushIndentation("                     ");
                                              st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "ref", { file: gFile, line: 40, column: 28 }));
                                              w.popIndentation();
                                              w.write(": \"");
                                              st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "reference", { file: gFile, line: 40, column: 42 }));
                                              w.write("\"");
                                          
                                          
                                          }
                                      
                                      
                                      }
                                      if (st.test(st.prop(s, g, rc, s.param, "in", { file: gFile, line: 40, column: 77 }))) {
                                      
                                          w.write("\n");
                                          w.write("         ");
                                          if (st.test(st.prop(s, g, rc, s.path, "parameters", { file: gFile, line: 41, column: 18 }))) {
                                          
                                              w.write("\n");
                                              w.pushIndentation("         ");
                                              w.write("parameters:");
                                              w.popIndentation();
                                          
                                          
                                          }
                                          w.write("\n");
                                          w.pushIndentation("         ");
                                          w.write("- in: \"");
                                          w.popIndentation();
                                          st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "in", { file: gFile, line: 43, column: 23 }));
                                          w.write("\"");
                                          if (st.test(st.prop(s, g, rc, s.param, "description", { file: gFile, line: 43, column: 37 }))) {
                                          
                                              w.write("\n");
                                              w.pushIndentation("           ");
                                              w.write("description: \"");
                                              w.popIndentation();
                                              st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "description", { file: gFile, line: 44, column: 32 }));
                                              w.write("\"");
                                          
                                          
                                          }
                                          if (st.test(st.prop(s, g, rc, s.param, "name", { file: gFile, line: 44, column: 62 }))) {
                                          
                                              w.write("\n");
                                              w.pushIndentation("           ");
                                              w.write("name: \"");
                                              w.popIndentation();
                                              st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "name", { file: gFile, line: 45, column: 25 }));
                                              w.write("\"");
                                          
                                          
                                          }
                                          if (st.test(st.prop(s, g, rc, s.param, "required", { file: gFile, line: 45, column: 48 }))) {
                                          
                                              w.write("\n");
                                              w.pushIndentation("           ");
                                              w.write("required: ");
                                              w.popIndentation();
                                              st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "required", { file: gFile, line: 46, column: 28 }));
                                          
                                          
                                          }
                                          if (st.test(st.prop(s, g, rc, s.param, "schema", { file: gFile, line: 46, column: 54 }))) {
                                          
                                              w.write("\n");
                                              w.pushIndentation("           ");
                                              st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "schema", { file: gFile, line: 47, column: 18 }));
                                              w.popIndentation();
                                              w.write(":");
                                          
                                          
                                          }
                                          if (st.test(st.prop(s, g, rc, s.param, "ref", { file: gFile, line: 47, column: 43 }))) {
                                          
                                              w.write("\n");
                                              w.pushIndentation("            ");
                                              st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "ref", { file: gFile, line: 48, column: 19 }));
                                              w.popIndentation();
                                              w.write(": \"");
                                              st.write(w, s, g, rc, st.prop(s, g, rc, s.param, "reference", { file: gFile, line: 48, column: 33 }));
                                              w.write("\"");
                                          
                                          
                                          }
                                      
                                      
                                      }
                             }, [
                             { name: "param"     }
                             ])); 
                         return st.map(attr, tp);
                         })(), {separator: "\n"});
                     
                     
                     }
                     w.write("\n");
                     w.write("         ");
                     if (st.test(st.prop(s, g, rc, s.path, "responses", { file: gFile, line: 49, column: 18 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("         ");
                         w.write("responses:");
                         w.popIndentation();
                     
                     
                     }
                     w.write("\n");
                     w.write("            ");
                     if (st.test(st.prop(s, g, rc, s.path, "responses", { file: gFile, line: 51, column: 21 }))) {
                     
                         st.write(w, s, g, rc, (function() {
                         var tp = [],
                         attr = st.prop(s, g, rc, s.path, "responses", { file: gFile, line: 51, column: 38 });
                         tp.push(st.makeSubTemplate(g, function(w, rc) {
                             var g = this.owningGroup,
                             s = this.scope;
                             
                                      if (st.test(st.prop(s, g, rc, s.response, "statuscode", { file: gFile, line: 51, column: 72 }))) {
                                      
                                          w.write("\n");
                                          w.pushIndentation("            ");
                                          w.write("'");
                                          w.popIndentation();
                                          st.write(w, s, g, rc, st.prop(s, g, rc, s.response, "statuscode", { file: gFile, line: 52, column: 23 }));
                                          w.write("':");
                                      
                                      
                                      }
                                      if (st.test(st.prop(s, g, rc, s.response, "description", { file: gFile, line: 52, column: 56 }))) {
                                      
                                          w.write("\n");
                                          w.pushIndentation("               ");
                                          w.write("description: ");
                                          w.popIndentation();
                                          st.write(w, s, g, rc, st.prop(s, g, rc, s.response, "description", { file: gFile, line: 53, column: 38 }));
                                      
                                      
                                      }
                                      if (st.test(st.prop(s, g, rc, s.response, "content", { file: gFile, line: 53, column: 70 }))) {
                                      
                                          w.write("\n");
                                          w.pushIndentation("               ");
                                          w.write("content:");
                                          w.popIndentation();
                                          w.write("\n");
                                          w.pushIndentation("                  ");
                                          st.write(w, s, g, rc, st.prop(s, g, rc, s.response, "content", { file: gFile, line: 55, column: 28 }));
                                          w.popIndentation();
                                          w.write(":");
                                      
                                      
                                      }
                             }, [
                             { name: "response"     }
                             ])); 
                         return st.map(attr, tp);
                         })(), {separator: "\n"});
                     
                     
                     }
            }, [
            { name: "path"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("components:");
    w.write("\n");
    w.pushIndentation("   ");
    w.write("schemas:");
    w.popIndentation();
    w.write("\n");
    w.write("      ");
    if (st.test(s.components)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.components;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     if (st.test(st.prop(s, g, rc, s.component, "name", { file: gFile, line: 58, column: 60 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("      ");
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.component, "name", { file: gFile, line: 59, column: 17 }));
                         w.popIndentation();
                         w.write(":");
                     
                     
                     }
                     if (st.test(st.prop(s, g, rc, s.component, "type", { file: gFile, line: 59, column: 44 }))) {
                     
                         w.write("\n");
                         w.pushIndentation("         ");
                         w.write("type: ");
                         w.popIndentation();
                         st.write(w, s, g, rc, st.prop(s, g, rc, s.component, "type", { file: gFile, line: 60, column: 26 }));
                     
                     
                     }
                     w.write("\n");
                     w.pushIndentation("         ");
                     w.write("properties:");
                     w.popIndentation();
                     w.write("\n");
                     w.write("            ");
                     if (st.test(st.prop(s, g, rc, s.component, "field", { file: gFile, line: 62, column: 26 }))) {
                     
                         st.write(w, s, g, rc, (function() {
                         var tp = [],
                         attr = st.prop(s, g, rc, s.component, "field", { file: gFile, line: 62, column: 44 });
                         tp.push(st.makeSubTemplate(g, function(w, rc) {
                             var g = this.owningGroup,
                             s = this.scope;
                             
                                      if (st.test(st.prop(s, g, rc, s.field, "name", { file: gFile, line: 62, column: 69 }))) {
                                      
                                          w.write("\n");
                                          w.pushIndentation("            ");
                                          st.write(w, s, g, rc, st.prop(s, g, rc, s.field, "name", { file: gFile, line: 63, column: 19 }));
                                          w.popIndentation();
                                          w.write(":");
                                      
                                      
                                      }
                                      if (st.test(st.prop(s, g, rc, s.field, "data_type", { file: gFile, line: 63, column: 42 }))) {
                                      
                                          w.write("\n");
                                          w.pushIndentation("               ");
                                          w.write("type: \"");
                                          w.popIndentation();
                                          st.write(w, s, g, rc, st.prop(s, g, rc, s.field, "data_type", { file: gFile, line: 64, column: 29 }));
                                          w.write("\"");
                                      
                                      
                                      }
                                      if (st.test(st.prop(s, g, rc, s.field, "description", { file: gFile, line: 64, column: 57 }))) {
                                      
                                          w.write("\n");
                                          w.pushIndentation("               ");
                                          w.write("description: ");
                                          w.popIndentation();
                                          st.write(w, s, g, rc, st.prop(s, g, rc, s.field, "description", { file: gFile, line: 65, column: 35 }));
                                      
                                      
                                      }
                             }, [
                             { name: "field"     }
                             ])); 
                         return st.map(attr, tp);
                         })(), {separator: "\n"});
                     
                     
                     }
            }, [
            { name: "component"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
};
r.args = [
        { name: "details"     },
{ name: "servers"     },
{ name: "tags"     },
{ name: "paths"     },
{ name: "components"     }
];
group.addTemplate("/swagger", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;