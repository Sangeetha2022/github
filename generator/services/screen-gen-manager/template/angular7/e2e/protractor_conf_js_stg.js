/*
 * Template group protractor_conf_js
 * Compiled on Thu Mar 14 2019 14:41:53 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "protractor_conf_js"; 

group.name = "protractor_conf_js";





//
// Template /protractor_conf_js
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("// Protractor configuration file, see link for more information");
    w.write("\n");
    w.write("// https://github.com/angular/protractor/blob/master/lib/config.ts");
    w.write("\n");
    w.write("\n");
    w.write("const { SpecReporter } = require('jasmine-spec-reporter');");
    w.write("\n");
    w.write("\n");
    w.write("exports.config = {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("allScriptsTimeout: 11000,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("specs: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("'./src/**/*.e2e-spec.ts'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("capabilities: {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("'browserName': 'chrome'");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("directConnect: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("baseUrl: 'http://localhost:4200/',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("framework: 'jasmine',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("jasmineNodeOpts: {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("showColors: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("defaultTimeoutInterval: 30000,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("print: function() {}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("onPrepare() {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("require('ts-node').register({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("project: require('path').join(__dirname, './tsconfig.e2e.json')");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("};");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/protractor_conf_js", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;