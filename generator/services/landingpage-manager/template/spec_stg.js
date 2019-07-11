/*
 * Template group spec
 * Compiled on Mon Jul 01 2019 15:13:27 GMT+0530 (IST)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "spec"; 

group.name = "spec";





//
// Template /spec
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { async, ComponentFixture, TestBed } from '@angular/core/testing';");
    w.write("\n");
    w.write("\n");
    w.write("import { TestComponent } from './test.component';");
    w.write("\n");
    w.write("\n");
    w.write("describe('TestComponent', () => {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("let component: TestComponent;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("let fixture: ComponentFixture<TestComponent>;");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("beforeEach(async(() => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("TestBed.configureTestingModule({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("declarations: [ TestComponent ]");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write(".compileComponents();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}));");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("beforeEach(() => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("fixture = TestBed.createComponent(TestComponent);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("component = fixture.componentInstance;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("fixture.detectChanges();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("it('should create', () => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("expect(component).toBeTruthy();");
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
        { name: "sObject"     }
];
group.addTemplate("/spec", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;