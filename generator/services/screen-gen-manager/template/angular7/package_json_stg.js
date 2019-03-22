/*
 * Template group package_json
 * Compiled on Tue Mar 19 2019 11:32:23 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "package_json"; 

group.name = "package_json";





//
// Template /package_json
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("{");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"name\": \"");
    w.popIndentation();
    st.write(w, s, g, rc, s.projectname);
    w.write("\",");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"version\": \"0.0.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"scripts\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"ng\": \"ng\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"start\": \"ng serve\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"build\": \"ng build\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"test\": \"ng test\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"lint\": \"ng lint\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"e2e\": \"ng e2e\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"private\": true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"dependencies\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/animations\": \"~7.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/common\": \"~7.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/compiler\": \"~7.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/core\": \"~7.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/forms\": \"~7.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/platform-browser\": \"~7.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/platform-browser-dynamic\": \"~7.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/router\": \"~7.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"core-js\": \"^2.5.4\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"rxjs\": \"~6.3.3\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"tslib\": \"^1.9.0\",");
    w.popIndentation();
    w.write("\n");
    w.write("     ");
    if (st.test(s.dependency)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.dependency;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("\"");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyname", { file: gFile, line: 27, column: 47 }));
                     w.write("\": \"");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyversion", { file: gFile, line: 27, column: 72 }));
                     w.write("\",");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"zone.js\": \"~0.8.26\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\"devDependencies\": {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular-devkit/build-angular\": \"~0.12.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/cli\": \"~7.2.2\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/compiler-cli\": \"~7.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@angular/language-service\": \"~7.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@types/node\": \"~8.9.4\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@types/jasmine\": \"~2.8.8\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"@types/jasminewd2\": \"~2.0.3\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"codelyzer\": \"~4.5.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"jasmine-core\": \"~2.99.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"jasmine-spec-reporter\": \"~4.2.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"karma\": \"~3.1.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"karma-chrome-launcher\": \"~2.2.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"karma-coverage-istanbul-reporter\": \"~2.0.1\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"karma-jasmine\": \"~1.1.2\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"karma-jasmine-html-reporter\": \"^0.2.2\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"protractor\": \"~5.4.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"ts-node\": \"~7.0.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"tslint\": \"~5.11.0\",");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\"typescript\": \"~3.2.2\"");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("}");
    w.write("\n");
    w.write("\n");
};
r.args = [
        { name: "projectname"     },
{ name: "dependency"     }
];
group.addTemplate("/package_json", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;