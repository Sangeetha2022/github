/*
 * Template group readme_md
 * Compiled on Thu Mar 14 2019 15:11:56 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "readme_md"; 

group.name = "readme_md";





//
// Template /readme_md
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("# AngularNew");
    w.write("\n");
    w.write("\n");
    w.write("This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2.");
    w.write("\n");
    w.write("\n");
    w.write("## Development server");
    w.write("\n");
    w.write("\n");
    w.write("Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.");
    w.write("\n");
    w.write("\n");
    w.write("## Code scaffolding");
    w.write("\n");
    w.write("\n");
    w.write("Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.");
    w.write("\n");
    w.write("\n");
    w.write("## Build");
    w.write("\n");
    w.write("\n");
    w.write("Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.");
    w.write("\n");
    w.write("\n");
    w.write("## Running unit tests");
    w.write("\n");
    w.write("\n");
    w.write("Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).");
    w.write("\n");
    w.write("\n");
    w.write("## Running end-to-end tests");
    w.write("\n");
    w.write("\n");
    w.write("Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).");
    w.write("\n");
    w.write("\n");
    w.write("## Further help");
    w.write("\n");
    w.write("\n");
    w.write("To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).");
    w.write("\n");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/readme_md", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;