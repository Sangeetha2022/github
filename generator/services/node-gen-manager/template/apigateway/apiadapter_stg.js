/*
 * Template group apiadapter
 * Compiled on Thu Oct 08 2020 23:18:18 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "apiadapter"; 

group.name = "apiadapter";





//
// Template /apiadapter
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.write("import * as fetch from 'node-fetch';");
    w.write("\n");
    w.write("\n");
    w.write("export class ApiAdaptar {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("post = (url, data) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("return new Promise((resolve, reject) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("fetch(url, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then((response) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.sendResponse(resolve, reject, response, null);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("}).catch(error => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.sendResponse(resolve, reject, null, error);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("})");
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
    w.write("fetch(url).then((response) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.sendResponse(resolve, reject, response, null);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("}).catch(error => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.sendResponse(resolve, reject, null, error);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("})");
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
    w.write("put = (url, data) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("return new Promise((resolve, reject) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("fetch(url, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then((response) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.sendResponse(resolve, reject, response, null);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("}).catch(error => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.sendResponse(resolve, reject, null, error);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("})");
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
    w.write("fetch(url, {method: 'DELETE'}).then((response) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.sendResponse(resolve, reject, response, null);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("}).catch(error => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.sendResponse(resolve, reject, null, error);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("})");
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
    w.write("private sendResponse = (resolve, reject, response, error) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (response !== null) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("if (response.status === 200) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("resolve({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("response,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 201) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("resolve({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("response,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 202) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("resolve({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("response,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("response,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 204) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("resolve({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("response,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 205) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("resolve({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("response,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 206) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("resolve({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("response,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 400) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 401) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 402) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 403) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 404) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 405) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 406) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 407) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 408) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 500) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 501) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 502) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 503) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 504) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("} else if (response.status === 505) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("reject({");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("code: response.status,");
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
    w.write("if (error.port !== undefined && response.port !== null) {");
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
    w.write("\n");
};
r.args = [
        
];
group.addTemplate("/apiadapter", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;