/*
 * Template group component_ts
 * Compiled on Thu Jun 11 2020 20:47:59 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "component_ts"; 

group.name = "component_ts";





//
// Template /component_ts
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import { Component, OnInit } from '@angular/core';");
    w.write("\n");
    w.write("import * as moment from 'moment';");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "importDependency", { file: gFile, line: 4, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "importDependency", { file: gFile, line: 4, column: 37 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyName", { file: gFile, line: 4, column: 77 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyPath", { file: gFile, line: 4, column: 108 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "importComponent", { file: gFile, line: 5, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "importComponent", { file: gFile, line: 5, column: 36 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import { ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "classname", { file: gFile, line: 5, column: 75 }));
                     w.write(" } from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "path", { file: gFile, line: 5, column: 101 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "importAsteriskDependency", { file: gFile, line: 6, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "importAsteriskDependency", { file: gFile, line: 6, column: 45 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("import ");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyName", { file: gFile, line: 6, column: 91 }));
                     w.write(" from '");
                     st.write(w, s, g, rc, st.prop(s, g, rc, s.name, "dependencyPath", { file: gFile, line: 6, column: 119 }));
                     w.write("';");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "scriptVariable", { file: gFile, line: 8, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "scriptVariable", { file: gFile, line: 8, column: 35 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     w.write("declare var ");
                     st.write(w, s, g, rc, s.name);
                     w.write(": any;");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("@Component({");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("selector: 'app-");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "folderName", { file: gFile, line: 10, column: 25 }));
    w.write("',");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("templateUrl: './");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "folderName", { file: gFile, line: 11, column: 26 }));
    w.write(".component.html',");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("styleUrls: ['./");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "folderName", { file: gFile, line: 12, column: 25 }));
    w.write(".component.scss']");
    w.write("\n");
    w.write("})");
    w.write("\n");
    w.write("export class ");
    st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 14, column: 21 }));
    w.write("Component implements OnInit {");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "componentVariable", { file: gFile, line: 15, column: 11 }))) {
    
        w.write("\n");
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "componentVariable", { file: gFile, line: 16, column: 8 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
                     w.write(";");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
        w.write("\n");
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write("constructor(");
    w.popIndentation();
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "componentConstructorParams", { file: gFile, line: 19, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "componentConstructorParams", { file: gFile, line: 19, column: 47 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: ",\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("  ");
    w.write(") { }");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("sortorder: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("sortDate: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public quote: any[] = [];");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("public events = [");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("{");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("event: 'Advancing global trade with blockchain',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("date: '2020-06-10',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("description: `This session looks beyond the initial blockchain use ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("case and pilot project to the real value to be gained from participating in blockchain ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("networks spanning industries and geographies`");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}, {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("event: 'Analytics-driven Storage Management',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("date: '2020-01-31',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("description: `As data volumes grow and grow in companies, the role of storage ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("experts has evolved into a generalist`");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}, {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("event: 'Journey to the Cloud Virtual Summit',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("date: '2020-08-14',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("description: `As data volumes grow and grow in companies, the role of storage ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("experts has evolved into a generalist`");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}, {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("event: 'Taking Your Work Virtual',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("date: '2020-09-04',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("description: `An urgent need to slow the spread of COVID-19 and protect employees forced ");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("state and local agencies to rapidly implement remote work`");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}, {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("event: 'Cloud Strategy: Modernizing with Open Cloud Frameworks',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("date: '2021-06-09',");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("description: `Join us in each of our 5-part education webinar series to hear about solutions of cloud strategy`");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("]");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("ngOnInit() {");
    w.popIndentation();
    w.write("\n");
    w.write("    ");
    if (st.test(st.prop(s, g, rc, s.object, "componentOnInit", { file: gFile, line: 56, column: 15 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "componentOnInit", { file: gFile, line: 56, column: 40 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
                     w.write(";");
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.GpGetAllvalues();");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    if (st.test(st.prop(s, g, rc, s.object, "componentMethod", { file: gFile, line: 61, column: 11 }))) {
    
        st.write(w, s, g, rc, (function() {
        var tp = [],
        attr = st.prop(s, g, rc, s.object, "componentMethod", { file: gFile, line: 61, column: 36 });
        tp.push(st.makeSubTemplate(g, function(w, rc) {
            var g = this.owningGroup,
            s = this.scope;
            
                     st.write(w, s, g, rc, s.name);
            }, [
            { name: "name"     }
            ])); 
        return st.map(attr, tp);
        })(), {separator: "\n"});
    
    
    }
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("GpGetAllvalues(){");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.quote = this.events;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("let sortarray = [];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.sortorder = '");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "queryvalues", { file: gFile, line: 66, column: 34 }), "sortOrder", { file: gFile, line: 66, column: 46 }), "value", { file: gFile, line: 66, column: 56 }));
    w.write("';");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.sortDate = '");
    w.popIndentation();
    st.write(w, s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, st.prop(s, g, rc, s.object, "queryvalues", { file: gFile, line: 67, column: 33 }), "datesToInclude", { file: gFile, line: 67, column: 45 }), "days", { file: gFile, line: 67, column: 60 }));
    w.write("';");
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.sortDate == \"last 7 days\") {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("let diff = 7;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("let datediff = this.Datedifference(diff);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("let currentdate  = moment().format('YYYY-MM-DD');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("this.events.forEach(element=>{");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("if(datediff < element.date && currentdate > element.date){");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                  ");
    w.write("console.log('--------7-datediff----',element);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                  ");
    w.write("sortarray.push(element);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.sortDate == \"last 30 days\") {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("let diff = 30;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("let datediff = this.Datedifference(diff);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("let currentdate  = moment().format('YYYY-MM-DD');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("this.events.forEach(element=>{");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("if(currentdate > element.date){");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("sortarray.push(element);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("console.log('--------30-datediff----',sortarray);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("             ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.sortDate == \"Future days\") {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("let currentdate  = moment().format('YYYY-MM-DD');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("this.events.forEach(element=>{");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("if(currentdate < element.date){");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                  ");
    w.write("sortarray.push(element);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.sortorder == 'Alphabetical ascending') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("sortarray.sort((a, b) => a.event > b.event ? 1 : -1);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.sortorder == 'Alphabetical deascending') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("sortarray.sort((a, b) => a.event > b.event ? -1 : 1);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.sortorder == \"date ascending\") {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("sortarray.sort((val1, val2) => { return <any>new Date(val1.date) - <any>new Date(val2.date) });");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.sortorder == \"date deascending\") {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("sortarray.sort((val1, val2) => { return <any>new Date(val2.date) - <any>new Date(val1.date) });");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.quote = sortarray;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("  ");
    w.write("Datedifference(value){");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("let dateFrom = moment().subtract(value,'d').format('YYYY-MM-DD');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return dateFrom");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("}");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/component_ts", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;