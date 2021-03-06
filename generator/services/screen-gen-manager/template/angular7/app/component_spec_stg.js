/*
 * Template group component_spec
 * Compiled on Mon Mar 18 2019 19:38:04 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component_spec"; 

group.name = "component_spec";





//
// Template /component_spec
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { async, ComponentFixture, TestBed } from '@angular/core/testing';");
    w.write("\n");
    w.write("\n");
    w.write("import { ");
    st.write(w, s, g, rc, s.className);
    w.write("Component } from './");
    st.write(w, s, g, rc, s.folderName);
    w.write(".component';");
    w.write("\n");
    w.write("\n");
    w.write("describe('");
    st.write(w, s, g, rc, s.className);
    w.write("Component', () => {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("let component: ");
    w.popIndentation();
    st.write(w, s, g, rc, s.className);
    w.write("Component;");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("let fixture: ComponentFixture<");
    w.popIndentation();
    st.write(w, s, g, rc, s.className);
    w.write("Component>;");
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
    w.write("declarations: [ ");
    w.popIndentation();
    st.write(w, s, g, rc, s.className);
    w.write("Component ]");
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
    w.write("fixture = TestBed.createComponent(");
    w.popIndentation();
    st.write(w, s, g, rc, s.className);
    w.write("Component);");
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
};
r.args = [
        { name: "className"     },
{ name: "folderName"     }
];
group.addTemplate("/component_spec", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;