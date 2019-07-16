/*
 * Template group seed
 * Compiled on Mon Jul 15 2019 19:29:18 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "seed"; 

group.name = "seed";





//
// Template /camunda
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("export class camundaService {");
    w.write("\n");
    w.write("public static camundaUrl = \"http://gep-dev-camunda.gep-dev-201902.svc.cluster.local:8080\"");
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/camunda", r); 
//
// Template /component_module
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    if (st.test(st.prop(s, g, rc, s.modules, "importDependency", { file: gFile, line: 2, column: 12 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.modules, "importDependency", { file: gFile, line: 2, column: 39 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyname", { file: gFile, line: 2, column: 79 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyPath", { file: gFile, line: 2, column: 110 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("@NgModule({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("imports: [");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "imports", { file: gFile, line: 5, column: 24 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "imports", { file: gFile, line: 5, column: 46 }));
        w.write("\n");
    
    
    }
    w.write("],");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("declarations: [");
    w.popIndentation();
    if (st.test(st.prop(s, g, rc, s.modules, "declarations", { file: gFile, line: 6, column: 29 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "declarations", { file: gFile, line: 6, column: 56 }));
        w.write("\n");
    
    
    }
    w.write("]");
    if (st.test(st.prop(s, g, rc, s.modules, "exports", { file: gFile, line: 6, column: 93 }))) {
    
        w.write(",");
    
    
    }
    w.write("\n");
    w.write("  ");
    if (st.test(st.prop(s, g, rc, s.modules, "exports", { file: gFile, line: 7, column: 14 }))) {
    
        w.write("exports: [\n");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "exports", { file: gFile, line: 7, column: 46 }));
        w.write("\n]");
    
    
    }
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.modules, "className", { file: gFile, line: 9, column: 22 }));
    w.write("Module { }");
};
r.args = [
        { name: "modules"     }
];
group.addTemplate("/component_module", r); 
//
// Template /dmnfile
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    w.write("\n");
    w.write("<definitions xmlns=\"http://www.omg.org/spec/DMN/20151101/dmn.xsd\" xmlns:biodi=\"http://bpmn.io/schema/dmn/biodi/1.0\" id=\"Definitions_0fnw5vs\" name=\"DRD\" namespace=\"http://camunda.org/schema/1.0/dmn\">");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("<decision id=\"Accesslevel\" name=\"Authorize\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("<extensionElements>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<biodi:bounds x=\"150\" y=\"150\" width=\"180\" height=\"80\" />");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("</extensionElements>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("<decisionTable id=\"decisionTable_1\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<input id=\"input_1\" label=\"resources\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("<inputExpression id=\"inputExpression_1\" typeRef=\"string\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("<text>resources</text>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("</inputExpression>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("</input>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<input id=\"InputClause_1rqn79m\" label=\"resourcetype\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("<inputExpression id=\"LiteralExpression_016sarj\" typeRef=\"string\">");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("<text>resourcetype</text>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("</inputExpression>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("</input>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<output id=\"output_1\" label=\"admin\" name=\"Admin\" typeRef=\"string\" />");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<output id=\"OutputClause_0vdltyr\" label=\"developer\" name=\"Developer\" typeRef=\"string\" />");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("<output id=\"OutputClause_16m831c\" label=\"user\" name=\"Standard User\" typeRef=\"string\" />");
    w.popIndentation();
    w.write("\n");
    w.write("      ");
    if (st.test(s.object)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.object;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("<rule id=\"DecisionRule_0113tl1\">");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("<inputEntry id=\"UnaryTests_0gp33r0\">");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("<text>\"");
                     w.popIndentation();
                     st.write(w, s, g, rc, s.value);
                     w.write("\"</text>");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("</inputEntry>");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("<inputEntry id=\"UnaryTests_1wy6o8k\">");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("<text>\"Screen\"</text>");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("</inputEntry>");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("<outputEntry id=\"LiteralExpression_1pjblha\">");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("<text>'{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Admin\": [{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Access\": {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"value\": \"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Fields\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Organisation\": {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"value\": \"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Userrole\": {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"value\": \"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Addrole\": {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"value\": \"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}]");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("}],");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Landing\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Access\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"value\":\"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Fields\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Field1\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Field2\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Field3\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Field4\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}]");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("}],");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Project\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Access\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"value\":\"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Fields\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Configuration\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}]");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("}]");
                     w.popIndentation();
                     w.write("\n");
                     w.write("}'</text>");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("</outputEntry>");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("<outputEntry id=\"LiteralExpression_1wrsfdb\">");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("<text>'{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Admin\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Access\":{\"value\":\"false\"}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Landing\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Access\":{\"value\":\"true\"},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Fields\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Field1\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Field2\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"false\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Field3\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Field4\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"false\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}]");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("}],");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Project\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Access\":{\"value\":\"true\"},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Fields\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Configuration\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"false\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}]");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("}],");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Feature\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Access\":{\"value\":\"true\"},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Fields\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"AddFeature\":{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\":\"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}]");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("}]");
                     w.popIndentation();
                     w.write("\n");
                     w.write("}'</text>");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("</outputEntry>");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("<outputEntry id=\"LiteralExpression_1pfp1gh\">");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("<text>'{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Admin\": {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Access\": {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"value\": \"false\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Landing\":[{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Access\":{\"value\":\"false\"}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("}],");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Project\": [");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Access\": {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("\"value\": \"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("},");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"Fields\": [");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("{");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("\"AddProject\": {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("            ");
                     w.write("\"value\": \"true\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("          ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("]");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("],");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("\"Feature\": {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("\"Access\": {");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("\"value\": \"false\"");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("    ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("  ");
                     w.write("}");
                     w.popIndentation();
                     w.write("\n");
                     w.write("}'</text>");
                     w.write("\n");
                     w.pushIndentation("        ");
                     w.write("</outputEntry>");
                     w.popIndentation();
                     w.write("\n");
                     w.pushIndentation("      ");
                     w.write("</rule>");
                     w.popIndentation();
                     w.write("\n");
                     w.write("       ");
            }, [
            { name: "value"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("           ");
    w.write("</decisionTable>");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("</decision>");
    w.popIndentation();
    w.write("\n");
    w.write("</definitions>");
    w.write("\n");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/dmnfile", r); 
//
// Template /login_service
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { Injectable } from '@angular/core';");
    w.write("\n");
    w.write("import { HttpClient } from '@angular/common/http';");
    w.write("\n");
    w.write("import { Observable } from 'rxjs';");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 5, column: 11 }))) {
    
        w.write("\n");
        w.write("import { SharedService } from '../../shared/shared.service';");
        w.write("\n");
    
    
    }
    w.write("\n");
    w.write("\n");
    w.write("@Injectable({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("providedIn: 'root'");
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 12, column: 21 }));
    w.write("Service {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("constructor(private http: HttpClient, private ");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 14, column: 56 }), "objectName", { file: gFile, line: 14, column: 63 }));
    w.write(": ");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 14, column: 84 }), "className", { file: gFile, line: 14, column: 91 }));
    w.write(") { }");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("signup(user: any): Observable<any> {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.http.post(this.");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 17, column: 39 }), "objectName", { file: gFile, line: 17, column: 46 }));
    w.write(".");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 17, column: 66 }), "variableName", { file: gFile, line: 17, column: 73 }));
    w.write(" + '/desktop/signup', user);");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("googlelogin(user: any): Observable<any> {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.http.post(this.");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 21, column: 39 }), "objectName", { file: gFile, line: 21, column: 46 }));
    w.write(".");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 21, column: 66 }), "variableName", { file: gFile, line: 21, column: 73 }));
    w.write(" + '/desktop/googlesignin', user);");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("Login(user: any): Observable<any> {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.http.post(this.");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 24, column: 39 }), "objectName", { file: gFile, line: 24, column: 46 }));
    w.write(".");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 24, column: 66 }), "variableName", { file: gFile, line: 24, column: 73 }));
    w.write(" + '/desktop/login', user);");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("Logout(user: any): Observable<any> {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.http.post(this.");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 28, column: 39 }), "objectName", { file: gFile, line: 28, column: 46 }));
    w.write(".");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 28, column: 66 }), "variableName", { file: gFile, line: 28, column: 73 }));
    w.write(" + '/desktop/logout', user);");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("Consent(consent: any): Observable<any> {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.http.put(this.");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 32, column: 38 }), "objectName", { file: gFile, line: 32, column: 45 }));
    w.write(".");
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "shared", { file: gFile, line: 32, column: 65 }), "variableName", { file: gFile, line: 32, column: 72 }));
    w.write(" + '/desktop/consent', consent);");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("}");
    w.write("\n");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/login_service", r); 
//
// Template /model
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("\n");
    w.write("import * as mongoose from 'mongoose';");
    w.write("\n");
    w.write("\n");
    w.write("const Schema = mongoose.Schema;");
    w.write("\n");
    w.write("\n");
    w.write("export const ");
    st.write(w, s, g, rc, s.ModelName);
    w.write("Schema = new Schema({");
    w.write("\n");
    w.pushIndentation("   ");
    st.write(w, s, g, rc, (function() {
    var tp = [],
    attr = s.fields;
    tp.push(st.makeSubTemplate(g, function(w, rc) {
        var g = this.owningGroup,
        s = this.scope;
        
                 st.write(w, s, g, rc, s.name);
        }, [
        { name: "name"     }
        ])); 
    return st.map(attr, tp);
    })(), {separator: ",\n"});
    w.popIndentation();
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("\n");
    w.write("const ");
    st.write(w, s, g, rc, s.ModelName);
    w.write("Model = mongoose.model('");
    st.write(w, s, g, rc, s.ModelName);
    w.write("', ");
    st.write(w, s, g, rc, s.ModelName);
    w.write("Schema, '");
    st.write(w, s, g, rc, s.ModelName);
    w.write("');");
    w.write("\n");
    w.write("export default ");
    st.write(w, s, g, rc, s.ModelName);
    w.write("Model;");
    w.write("\n");
};
r.args = [
        { name: "ModelName"     },
{ name: "fields"     }
];
group.addTemplate("/model", r); 
//
// Template /seed
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("    ");
    if (st.test(s.object)) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = s.object;
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("export const resources = [{\"resources\":\"");
                     st.write(w, s, g, rc, s.value);
                     w.write("\"],}");
                     w.write("\n");
                     w.write("    ");
            }, [
            { name: "value"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/seed", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;