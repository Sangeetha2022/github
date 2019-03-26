/*
 * Template group gitignore
 * Compiled on Thu Mar 14 2019 15:11:08 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "gitignore"; 

group.name = "gitignore";





//
// Template /gitignore
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("# See http://help.github.com/ignore-files/ for more about ignoring files.");
    w.write("\n");
    w.write("\n");
    w.write("# compiled output");
    w.write("\n");
    w.write("/dist");
    w.write("\n");
    w.write("/tmp");
    w.write("\n");
    w.write("/out-tsc");
    w.write("\n");
    w.write("\n");
    w.write("# dependencies");
    w.write("\n");
    w.write("/node_modules");
    w.write("\n");
    w.write("\n");
    w.write("# profiling files");
    w.write("\n");
    w.write("chrome-profiler-events.json");
    w.write("\n");
    w.write("speed-measure-plugin.json");
    w.write("\n");
    w.write("\n");
    w.write("# IDEs and editors");
    w.write("\n");
    w.write("/.idea");
    w.write("\n");
    w.write(".project");
    w.write("\n");
    w.write(".classpath");
    w.write("\n");
    w.write(".c9/");
    w.write("\n");
    w.write("*.launch");
    w.write("\n");
    w.write(".settings/");
    w.write("\n");
    w.write("*.sublime-workspace");
    w.write("\n");
    w.write("\n");
    w.write("# IDE - VSCode");
    w.write("\n");
    w.write(".vscode/*");
    w.write("\n");
    w.write("!.vscode/settings.json");
    w.write("\n");
    w.write("!.vscode/tasks.json");
    w.write("\n");
    w.write("!.vscode/launch.json");
    w.write("\n");
    w.write("!.vscode/extensions.json");
    w.write("\n");
    w.write(".history/*");
    w.write("\n");
    w.write("\n");
    w.write("# misc");
    w.write("\n");
    w.write("/.sass-cache");
    w.write("\n");
    w.write("/connect.lock");
    w.write("\n");
    w.write("/coverage");
    w.write("\n");
    w.write("/libpeerconnection.log");
    w.write("\n");
    w.write("npm-debug.log");
    w.write("\n");
    w.write("yarn-error.log");
    w.write("\n");
    w.write("testem.log");
    w.write("\n");
    w.write("/typings");
    w.write("\n");
    w.write("\n");
    w.write("# System Files");
    w.write("\n");
    w.write(".DS_Store");
    w.write("\n");
    w.write("Thumbs.db");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/gitignore", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;