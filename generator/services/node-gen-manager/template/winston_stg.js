/*
 * Template group winston
 * Compiled on Wed Jul 10 2019 12:38:59 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
    var r;
    var gFile = "winston";

    group.name = "winston";





    //
    // Template /apiadapter
    //
    r = function(w, rc) {
        var g = this.owningGroup,
            s = this.scope;

        w.write("import * as request from \"request-promise-native\";");
        w.write("\n");
        w.write("\n");
        w.write("export class ApiAdapter {");
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("post = (url, body) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("return new Promise((resolve, reject) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("request.post({ url: url, json: body }, (error, response, body) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("this.sendResponse(resolve, reject, error, response, body);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("get = (url) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("return new Promise((resolve, reject) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("request.get(url, (error, response, body) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("if (body !== undefined) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("this.sendResponse(resolve, reject, error, response, JSON.parse(body));");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("} else if (body === undefined) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("this.sendResponse(resolve, reject, error, response, null);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("put = (url, body) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("return new Promise((resolve, reject) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("request.put({ url: url, json: body }, (error, response, body) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("this.sendResponse(resolve, reject, error, response, body);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("delete = (url) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("return new Promise((resolve, reject) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("request.delete(url, (error, response, body) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("this.sendResponse(resolve, reject, error, response, body);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("private sendResponse = (resolve, reject, error, response, body) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("if (body !== null) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("if (response.statusCode === 200) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("resolve({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("body,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \" request has succeeded\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 201) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("resolve({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("body,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"request has succeeded and a new resource has been created\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 202) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("resolve({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("body,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"request has been received but not yet acted upon\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 203) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("resolve({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("body,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"non authoritative info\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 204) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("resolve({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("body,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"no conent\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 205) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("resolve({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("body,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"reset content\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 206) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("resolve({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("body,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"partial content\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 400) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"bad request\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 401) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"unauthorized\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 402) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"Payment Required\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 403) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"forbidden\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 404) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"not found\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 405) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"method not allowed\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 406) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"not acceptable\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 407) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"proxy authentication required\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 408) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"request timeout\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 500) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"internal server error\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 501) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"request method is not supported by the server and cannot be handled\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 502) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"bad request\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 503) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"service available\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 504) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"gateway timeout\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else if (response.statusCode === 505) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("code: response.statusCode,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("message: \"HTTP version used in the request is not supported by the server\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("} else {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject(error);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("} else {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("if (error.port !== undefined && error.port !== null) {");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("                ");
        w.write("let errormsg = {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("error: \"Microservice Down\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("service_port: error.port,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("};");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("console.error(errormsg)");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("reject(errormsg);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.write("}");
    };
    r.args = [

    ];
    group.addTemplate("/apiadapter", r);
    //
    // Template /apicontroller
    //
    r = function(w, rc) {
        var g = this.owningGroup,
            s = this.scope;

        if (st.test(st.prop(s, g, rc, s.object, "import", { file: gFile, line: 2, column: 11 }))) {

            st.write(w, s, g, rc, (function() {
                var tp = [],
                    attr = st.prop(s, g, rc, s.object, "import", { file: gFile, line: 2, column: 27 });
                tp.push(st.makeSubTemplate(g, function(w, rc) {
                    var g = this.owningGroup,
                        s = this.scope;

                    w.write("import ");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "name", { file: gFile, line: 2, column: 67 }));
                    w.write(" from '");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "path", { file: gFile, line: 2, column: 91 }));
                    w.write("';");
                }, [
                    { name: "dependency" }
                ]));
                return st.map(attr, tp);
            })(), { separator: "\n" });


        }
        w.write("\n");
        w.write("\n");
        w.write("export class ");
        st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "className", { file: gFile, line: 4, column: 21 }));
        w.write("Controller ");
        if (st.test(st.prop(s, g, rc, s.object, "implementName", { file: gFile, line: 4, column: 53 }))) {

            w.write("implements ");
            st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "implementName", { file: gFile, line: 4, column: 87 }));


        }
        w.write(" {");
        w.write("\n");
        w.pushIndentation("      ");
        w.write("public router = express.Router();");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("constructor() {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("this.initializeRoutes();");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("private initializeRoutes() {");
        w.popIndentation();
        w.write("\n");
        w.write("        ");
        if (st.test(st.prop(s, g, rc, s.object, "router", { file: gFile, line: 12, column: 19 }))) {

            st.write(w, s, g, rc, (function() {
                var tp = [],
                    attr = st.prop(s, g, rc, s.object, "router", { file: gFile, line: 12, column: 35 });
                tp.push(st.makeSubTemplate(g, function(w, rc) {
                    var g = this.owningGroup,
                        s = this.scope;

                    w.write("this.router.");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.router, "apiAction", { file: gFile, line: 12, column: 72 }));
                    w.write("('");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.router, "routeUrl", { file: gFile, line: 12, column: 92 }));
                    w.write("', this.");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.router, "methodName", { file: gFile, line: 12, column: 117 }));
                    w.write(");");
                }, [
                    { name: "router" }
                ]));
                return st.map(attr, tp);
            })(), { separator: "\n" });


        }
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        if (st.test(st.prop(s, g, rc, s.object, "methods", { file: gFile, line: 15, column: 11 }))) {

            st.write(w, s, g, rc, (function() {
                var tp = [],
                    attr = st.prop(s, g, rc, s.object, "methods", { file: gFile, line: 15, column: 28 });
                tp.push(st.makeSubTemplate(g, function(w, rc) {
                    var g = this.owningGroup,
                        s = this.scope;

                    w.write("public ");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "methodName", { file: gFile, line: 15, column: 64 }));
                    w.write("(req: Request, res: Response) {");
                    w.write("\n");
                    w.pushIndentation("        ");
                    w.write("new ApiAdapter().");
                    w.popIndentation();
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "apiAction", { file: gFile, line: 16, column: 34 }));
                    w.write("(");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "constantName", { file: gFile, line: 16, column: 54 }));
                    w.write(".");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "nodeName", { file: gFile, line: 16, column: 77 }));
                    w.write(" + `");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "methodUrl", { file: gFile, line: 16, column: 99 }));
                    w.write("` ");
                    if (st.test(st.prop(s, g, rc, s.methods, "requestParameter", { file: gFile, line: 16, column: 123 }))) {

                        w.write(", ");
                        st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "requestParameter", { file: gFile, line: 16, column: 152 }));


                    }
                    w.write(").then(");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "responseParameter", { file: gFile, line: 16, column: 192 }));
                    w.write(" => {");
                    w.write("\n");
                    w.pushIndentation("              ");
                    w.write("req.baseUrl === '/mobile' ? res.send(");
                    w.popIndentation();
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "responseParameter", { file: gFile, line: 17, column: 60 }));
                    w.write(") :");
                    w.write("\n");
                    w.pushIndentation("              ");
                    w.write("req.baseUrl === '/desktop' ? res.send(");
                    w.popIndentation();
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.methods, "responseParameter", { file: gFile, line: 18, column: 61 }));
                    w.write(") : res.send(null)");
                    w.write("\n");
                    w.pushIndentation("        ");
                    w.write("}).catch(err => {");
                    w.popIndentation();
                    w.write("\n");
                    w.pushIndentation("            ");
                    w.write("res.send(err);");
                    w.popIndentation();
                    w.write("\n");
                    w.pushIndentation("        ");
                    w.write("});");
                    w.popIndentation();
                    w.write("\n");
                    w.pushIndentation("    ");
                    w.write("}");
                    w.popIndentation();
                }, [
                    { name: "methods" }
                ]));
                return st.map(attr, tp);
            })(), { separator: "\n" });


        }
        w.write("\n");
        w.write("\n");
        w.write("}");
        w.write("\n");
    };
    r.args = [
        { name: "object" }
    ];
    group.addTemplate("/apicontroller", r);
    //
    // Template /apigatewayserver
    //
    r = function(w, rc) {
        var g = this.owningGroup,
            s = this.scope;

        if (st.test(st.prop(s, g, rc, s.object, "import", { file: gFile, line: 2, column: 11 }))) {

            st.write(w, s, g, rc, (function() {
                var tp = [],
                    attr = st.prop(s, g, rc, s.object, "import", { file: gFile, line: 2, column: 27 });
                tp.push(st.makeSubTemplate(g, function(w, rc) {
                    var g = this.owningGroup,
                        s = this.scope;

                    w.write("import ");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "name", { file: gFile, line: 2, column: 67 }));
                    w.write(" from '");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "path", { file: gFile, line: 2, column: 91 }));
                    w.write("';");
                }, [
                    { name: "dependency" }
                ]));
                return st.map(attr, tp);
            })(), { separator: "\n" });


        }
        w.write("\n");
        if (st.test(st.prop(s, g, rc, s.object, "classNames", { file: gFile, line: 3, column: 11 }))) {

            w.write("import {");
            w.write("\n");
            w.pushIndentation("    ");
            st.write(w, s, g, rc, (function() {
                var tp = [],
                    attr = st.prop(s, g, rc, s.object, "classNames", { file: gFile, line: 4, column: 12 });
                tp.push(st.makeSubTemplate(g, function(w, rc) {
                    var g = this.owningGroup,
                        s = this.scope;

                    st.write(w, s, g, rc, st.prop(s, g, rc, s.classes, "className", { file: gFile, line: 4, column: 43 }));
                    w.write("Controller");
                }, [
                    { name: "classes" }
                ]));
                return st.map(attr, tp);
            })(), { separator: ",\n" });
            w.popIndentation();
            w.write("\n");
            w.pushIndentation("    ");
            w.write("} from './apicontroller';");
            w.popIndentation();


        }
        w.write("\n");
        w.write("\n");
        if (st.test(st.prop(s, g, rc, s.object, "serverPort", { file: gFile, line: 7, column: 11 }))) {

            w.write("const PORT = ");
            st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "serverPort", { file: gFile, line: 7, column: 44 }));


        }
        w.write("\n");
        if (st.test(st.prop(s, g, rc, s.object, "classNames", { file: gFile, line: 8, column: 11 }))) {

            w.write("let apisController = [ ");
            w.write("\n");
            w.pushIndentation("    ");
            st.write(w, s, g, rc, (function() {
                var tp = [],
                    attr = st.prop(s, g, rc, s.object, "classNames", { file: gFile, line: 9, column: 12 });
                tp.push(st.makeSubTemplate(g, function(w, rc) {
                    var g = this.owningGroup,
                        s = this.scope;

                    w.write("new ");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.classes, "className", { file: gFile, line: 9, column: 47 }));
                    w.write("Controller()");
                }, [
                    { name: "classes" }
                ]));
                return st.map(attr, tp);
            })(), { separator: ",\n" });
            w.popIndentation();
            w.write("\n");
            w.pushIndentation("    ");
            w.write("]");
            w.popIndentation();


        }
        w.write("\n");
        w.write("class App {");
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("public app: express.Application = express();");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("public logger: WinstonLogger = new WinstonLogger();");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("   ");
        w.write("constructor(controllers: Controller[]) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("this.logger.setupLogger();");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("this.logger.configureWinston(this.app);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("this.initializeMiddlewares();");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("this.initializeControllers(controllers);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("private initializeMiddlewares() {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("this.app.use(bodyParser.json());");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("this.app.use(bodyParser.urlencoded({ extended: false }));");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("this.app.use(cors({ credentials: true, origin: true }))");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("private initializeControllers(controllers: Controller[]) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("controllers.forEach((controller) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("this.app.route('/health/apigateway').get((req: express.Request, res: express.Response) => {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("res.status(200).send({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("status: 'up'");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("})");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("})");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("this.app.use('/mobile', controller.router);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("this.app.use('/desktop', controller.router);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("});");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.write("}");
        w.write("\n");
        w.write("\n");
        w.write("new App(apisController).app.listen(PORT, () => {");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("console.log('Express server listening on port ' + PORT);");
        w.popIndentation();
        w.write("\n");
        w.write("})");
        w.write("\n");
    };
    r.args = [
        { name: "object" }
    ];
    group.addTemplate("/apigatewayserver", r);
    //
    // Template /config_constant
    //
    r = function(w, rc) {
        var g = this.owningGroup,
            s = this.scope;

        if (st.test(st.prop(s, g, rc, s.object, "constantArray", { file: gFile, line: 2, column: 11 }))) {

            st.write(w, s, g, rc, (function() {
                var tp = [],
                    attr = st.prop(s, g, rc, s.object, "constantArray", { file: gFile, line: 2, column: 34 });
                tp.push(st.makeSubTemplate(g, function(w, rc) {
                    var g = this.owningGroup,
                        s = this.scope;

                    w.write("export const ");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "nodeName", { file: gFile, line: 2, column: 87 }));
                    w.write(" = '");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "httpProxy", { file: gFile, line: 2, column: 112 }));
                    w.write("://");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "httpUrl", { file: gFile, line: 2, column: 137 }));
                    w.write(":");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "httpPort", { file: gFile, line: 2, column: 158 }));
                    w.write("';");
                }, [
                    { name: "dependency" }
                ]));
                return st.map(attr, tp);
            })(), { separator: "\n" });


        }
    };
    r.args = [
        { name: "object" }
    ];
    group.addTemplate("/config_constant", r);
    //
    // Template /controllerindex
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

                    w.write("export * from \"./");
                    st.write(w, s, g, rc, st.prop(s, g, rc, s.dependency, "className", { file: gFile, line: 2, column: 63 }));
                    w.write("Controller\";");
                }, [
                    { name: "dependency" }
                ]));
                return st.map(attr, tp);
            })(), { separator: "\n" });


        }
    };
    r.args = [
        { name: "object" }
    ];
    group.addTemplate("/controllerindex", r);
    //
    // Template /controllerinterface
    //
    r = function(w, rc) {
        var g = this.owningGroup,
            s = this.scope;

        w.write("import { Router } from 'express';");
        w.write("\n");
        w.pushIndentation(" ");
        w.write("\n");
        w.popIndentation();
        w.write("interface Controller {");
        w.write("\n");
        w.pushIndentation("  ");
        w.write("router: Router;");
        w.popIndentation();
        w.write("\n");
        w.write("}");
        w.write("\n");
        w.pushIndentation(" ");
        w.write("\n");
        w.popIndentation();
        w.write("export default Controller;");
    };
    r.args = [

    ];
    group.addTemplate("/controllerinterface", r);
    //
    // Template /docker_file
    //
    r = function(w, rc) {
        var g = this.owningGroup,
            s = this.scope;

        w.write("From node:10.14.2");
        w.write("\n");
        w.write("COPY . /");
        st.write(w, s, g, rc, s.filename);
        w.write("\n");
        w.write("WORKDIR /");
        st.write(w, s, g, rc, s.filename);
        w.write("\n");
        w.write("RUN npm install");
        w.write("\n");
        w.write("RUN npm i -g ts-node");
        w.write("\n");
        w.write("CMD npm run prod");
    };
    r.args = [
        { name: "filename" }
    ];
    group.addTemplate("/docker_file", r);
    //
    // Template /packageJson
    //
    r = function(w, rc) {
        var g = this.owningGroup,
            s = this.scope;

        w.write("{");
        w.write("\n");
        w.pushIndentation("  ");
        w.write("\"name\": \"");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "name", { file: gFile, line: 3, column: 19 }));
        w.write("\",");
        w.write("\n");
        w.pushIndentation("  ");
        w.write("\"version\": \"1.0.0\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("  ");
        w.write("\"description\": \"");
        w.popIndentation();
        st.write(w, s, g, rc, st.prop(s, g, rc, s.object, "description", { file: gFile, line: 5, column: 26 }));
        w.write("\",");
        w.write("\n");
        w.pushIndentation("  ");
        w.write("\"main\": \"dist/server.js\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("  ");
        w.write("\"scripts\": {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"test\": \"ng test\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"build\": \"tsc\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"dev\": \"ts-node ./src/server.ts\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"start\": \"nodemon ./dist/server.js\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"prod\": \"npm run build && npm run start\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("  ");
        w.write("},");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("  ");
        w.write("\"author\": \"Dan Castillo <dan.castillo@geppettosoftware.com>\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("  ");
        w.write("\"license\": \"ISC\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("  ");
        w.write("\"dependencies\": {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"@types/express\": \"^4.16.1\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"body-parser\": \"^1.18.3\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"cors\": \"^2.8.5\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"express\": \"^4.16.4\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"express-winston\": \"^3.0.1\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"node-vault\": \"^0.9.5\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"nodemon\": \"^1.18.9\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"request\": \"^2.88.0\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"request-promise-native\": \"^1.0.5\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"typescript\": \"^3.2.4\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"winston\": \"^3.2.1\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"winston-daily-rotate-file\": \"^3.6.0\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("  ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("}");
        w.write("\n");
    };
    r.args = [
        { name: "object" }
    ];
    group.addTemplate("/packageJson", r);
    //
    // Template /tsconfig
    //
    r = function(w, rc) {
        var g = this.owningGroup,
            s = this.scope;

        w.write("{");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"compilerOptions\": {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("\"module\": \"commonjs\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("\"moduleResolution\": \"node\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("\"pretty\": true,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("\"sourceMap\": true,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("\"resolveJsonModule\": true,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("\"target\": \"es6\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("\"outDir\": \"./dist\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("\"baseUrl\": \"./lib\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("},");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"include\": [");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("\"src/**/*.ts\", \"src/models/NodeModels.ts\",");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("],");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("\"exclude\": [");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("\"node_modules\"");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("]");
        w.popIndentation();
        w.write("\n");
        w.write("}");
    };
    r.args = [

    ];
    group.addTemplate("/tsconfig", r);
    //
    // Template /winston
    //
    r = function(w, rc) {
        var g = this.owningGroup,
            s = this.scope;

        w.write("import * as fs from 'fs';");
        w.write("\n");
        w.write("import * as expressWinston from 'express-winston';");
        w.write("\n");
        w.write("\n");
        w.write("const winston = require('winston');");
        w.write("\n");
        w.write("require('winston-daily-rotate-file');");
        w.write("\n");
        w.write("\n");
        w.write("const logDir = 'log';");
        w.write("\n");
        w.write("\n");
        w.write("export class WinstonLogger {");
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("public setupLogger(): void {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("if (!fs.existsSync(logDir)) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("fs.mkdirSync(logDir);");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("expressWinston.requestWhitelist.push('body');");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("expressWinston.responseWhitelist.push('body');");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("    ");
        w.write("public configureWinston(app): void {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("app.use(expressWinston.logger({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("format: winston.format.combine(");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("winston.format.label({ label: 'gep-dev-node-api' }),");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("winston.format.colorize(),");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("winston.format.json()");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("),");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("transports: [");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("new winston.transports.Console(),");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("new (winston.transports.DailyRotateFile)({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("level: 'info',");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("dirname: logDir,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("filename: logDir + 'api-%DATE%.log',");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("datePattern: 'YYYY-MM-DD',");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("zippedArchive: false,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("prepend: true,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("json: true,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("colorize: false,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("}),");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("],");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("statusLevels: false,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("level: function (req, res) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("var level = '';");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("if (res.statusCode >= 100) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("level = 'info';");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("if (res.statusCode >= 400) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("level = 'warn';");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("if (res.statusCode >= 500) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("level = 'error';");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("return level;");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("},");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("exitOnError: false");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("}))");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("app.use(expressWinston.errorLogger({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("format: winston.format.combine(");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("winston.format.label({ label: 'gep-dev-node-api' }),");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("winston.format.colorize(),");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("winston.format.json()");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("),");
        w.popIndentation();
        w.write("\n");
        w.write("\n");
        w.pushIndentation("            ");
        w.write("transports: [");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("new winston.transports.Console(),");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("new (winston.transports.DailyRotateFile)({");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("level: 'info',");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("dirname: logDir,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("filename: logDir + '/error/api-%DATE%.log',");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("datePattern: 'YYYY-MM-DD',");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("zippedArchive: false,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("prepend: true,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("json: true,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("colorize: false,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("}),");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("],");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("statusLevels: false, // default value");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("level: function (req, res) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("var level = '';");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("if (res.statusCode >= 100) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("level = 'info';");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("if (res.statusCode >= 400) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("level = 'warn';");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("if (res.statusCode >= 500) {");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                    ");
        w.write("level = 'error';");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("                ");
        w.write("return level;");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("},");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("            ");
        w.write("exitOnError: false,");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("        ");
        w.write("}));");
        w.popIndentation();
        w.write("\n");
        w.pushIndentation("    ");
        w.write("}");
        w.popIndentation();
        w.write("\n");
        w.write("}");
        w.write("\n");
    };
    r.args = [

    ];
    group.addTemplate("/winston", r);


    return group;
}
getInstance.base = base;

module.exports = getInstance;