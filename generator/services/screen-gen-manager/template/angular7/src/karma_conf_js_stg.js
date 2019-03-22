/*
 * Template group karma_conf_js
 * Compiled on Fri Mar 15 2019 10:59:47 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "karma_conf_js"; 

group.name = "karma_conf_js";





//
// Template /karma_conf_js
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("// Karma configuration file, see link for more information");
    w.write("\n");
    w.write("// https://karma-runner.github.io/1.0/config/configuration-file.html");
    w.write("\n");
    w.write("\n");
    w.write("module.exports = function (config) {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("config.set({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("basePath: '',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("frameworks: ['jasmine', '@angular-devkit/build-angular'],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("plugins: [");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("require('karma-jasmine'),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("require('karma-chrome-launcher'),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("require('karma-jasmine-html-reporter'),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("require('karma-coverage-istanbul-reporter'),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("require('@angular-devkit/build-angular/plugins/karma')");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("client: {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("clearContext: false // leave Jasmine Spec Runner output visible in browser");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("coverageIstanbulReporter: {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("dir: require('path').join(__dirname, '../coverage'),");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("reports: ['html', 'lcovonly', 'text-summary'],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("fixWebpackSourcePaths: true");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("},");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("reporters: ['progress', 'kjhtml'],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("port: 9876,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("colors: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("logLevel: config.LOG_INFO,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("autoWatch: true,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("browsers: ['Chrome'],");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("singleRun: false");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.write("};");
};
r.args = [
        
];
group.addTemplate("/karma_conf_js", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;