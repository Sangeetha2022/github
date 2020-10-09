/*
 * Template group env
 * Compiled on Fri Oct 09 2020 22:42:40 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "env"; 

group.name = "env";





//
// Template /env
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("CAMUNDAPOD_URL=http://camunda:8080");
    w.write("\n");
    w.write("SECURITYURL=http://securitymanager:8003");
    w.write("\n");
    w.write("AUTHPROXYURL=http://authproxy:8001");
    w.write("\n");
    w.write("ADMINURL=http://adminmanager:8004");
    w.write("\n");
    w.write("CAMUNDAURL=http://camundasvc:8002");
    w.write("\n");
    w.write("APIGATEWAY=http://apigateway:8000");
    w.write("\n");
    w.write("MONGO_DB_URL=mongodb://admin:password@mongo:27017/");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.projectdetails, "project_name", { file: gFile, line: 8, column: 66 }));
    w.write("?authSource=admin");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 9, column: 19 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.projectdetails, "custom_node", { file: gFile, line: 9, column: 48 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "uppername", { file: gFile, line: 10, column: 13 }));
                     w.write("=http://");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "name", { file: gFile, line: 10, column: 44 }));
                     w.write(":");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.custom_node, "port", { file: gFile, line: 10, column: 63 }));
                     w.write("\n");
            }, [
            { name: "custom_node"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ""});
    
    
    }
};
r.args = [
        { name: "projectdetails"     }
];
group.addTemplate("/env", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;