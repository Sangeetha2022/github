/*
 * Template group component_factory
 * Compiled on Mon Nov 04 2019 18:18:42 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component_factory"; 

group.name = "component_factory";





//
// Template /component_factory
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(s.object)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.object;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("this.dynamicComponentLoader");
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write(".getComponentFactory<HeaderComponent>('");
                     w.popIndentation();
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.component, "value", { file: gFile, line: 3, column: 56 }));
                     w.write("')");
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write(".subscribe({");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("next: componentFactory => {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("if (!this.testOutlet) {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("            ");
                     w.write("return;");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("         ");
                     w.write("const ref = this.testOutlet.createComponent(componentFactory);");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("ref.changeDetectorRef.detectChanges();");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("error: err => {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("console.warn(err);");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("});");
                     w.popIndentation();
            }, [
            { name: "component"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/component_factory", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;