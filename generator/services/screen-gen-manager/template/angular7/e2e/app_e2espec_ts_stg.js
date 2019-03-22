/*
 * Template group app_e2espec_ts
 * Compiled on Thu Mar 14 2019 14:41:38 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "app_e2espec_ts"; 

group.name = "app_e2espec_ts";





//
// Template /app_e2espec_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { AppPage } from './app.po';");
    w.write("\n");
    w.write("import { browser, logging } from 'protractor';");
    w.write("\n");
    w.write("\n");
    w.write("describe('workspace-project App', () => {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("let page: AppPage;");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("beforeEach(() => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("page = new AppPage();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("it('should display welcome message', () => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("page.navigateTo();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("expect(page.getTitleText()).toEqual('Welcome to angularNew!');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("afterEach(async () => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("// Assert that there are no errors emitted from the browser");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("const logs = await browser.manage().logs().get(logging.Type.BROWSER);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("expect(logs).not.toContain(jasmine.objectContaining({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("level: logging.Level.SEVERE,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}));");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.write("});");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/app_e2espec_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;