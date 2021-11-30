/*
 * Template group authguardv13
 * Compiled on Tue Nov 30 2021 19:58:42 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "authguardv13"; 

group.name = "authguardv13";





//
// Template /authguardv13
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.pushIndentation(" ");
    w.write("import { Injectable, Output, EventEmitter, Input } from '@angular/core';");
    w.popIndentation();
    w.write("\n");
    w.write("import {");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, GuardsCheckStart, GuardsCheckEnd");
    w.popIndentation();
    w.write("\n");
    w.write("} from '@angular/router';");
    w.write("\n");
    w.write("import { Router } from '@angular/router';");
    w.write("\n");
    w.write("import { JwtHelperService } from '@auth0/angular-jwt';");
    w.write("\n");
    w.write("import { BroadcastService } from './broadcast.service';");
    w.write("\n");
    w.write("import { filter } from 'rxjs/operators';");
    w.write("\n");
    w.write("//import 'rxjs/add/operator/filter';");
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
    w.write("export class AuthGuard implements CanActivate {");
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("@Output() getPermission = new EventEmitter();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public jwtToken: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public accessRoutes: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public userRole: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public viewPermission: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public routeName: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public checkAdmin: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public landingPageObject: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public projectScreen: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public userId: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public permissions: any[] = [];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public adminpermission: any = [];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public userpermission: any = [];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public devpermission: any = [];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public guestpermission: any = [];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public routearray: any[] = [];");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("  ");
    w.write("constructor(");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("private route: Router,");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("public broadcastService: BroadcastService");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write(") {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("this.broadcastService.currentUserName.subscribe(authGuardValue => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("// @ts-ignore");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("this.accessRoutes = authGuardValue.Access;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("this.route.events.pipe(filter((value: any) => value instanceof GuardsCheckStart)).subscribe((value: GuardsCheckStart) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("this.routeName = value.url.split('/');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.write("\n");
    w.pushIndentation(" ");
    w.write("canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("// console.log('------loggedvalue----', state.url);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return this.checkLoogedIn(state.url);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("checkLoogedIn(url: String) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("this.routeName = url.split('/');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("this.userId = sessionStorage.getItem('Id');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("if (this.userId !== null) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("this.jwtToken = sessionStorage.getItem('JwtToken');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("const helper = new JwtHelperService();");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("const decodedToken = helper.decodeToken(this.jwtToken);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("this.userRole = decodedToken.role;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("this.accessRoutes = JSON.parse(sessionStorage.getItem('Access') || '{}');");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("      ");
    w.write("if (this.accessRoutes) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.routeName && this.routeName[1].includes('?')) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("this.routeName = this.routeName[1].split('?');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("this.routeName[1] = this.routeName[0];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.accessRoutes.forEach((element:any) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("this.permissions = [];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("if (this.userRole) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("const permissionlevel = JSON.parse(element[this.userRole].value);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("for (let key in permissionlevel) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("const accessvalue = permissionlevel[key];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("for (let role in accessvalue[0]) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("if (role == this.userRole) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                  ");
    w.write("if (accessvalue[0][role].value == 'true') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("for (let i = 0; i < this.route.config.length; i++) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                      ");
    w.write("this.viewPermission = accessvalue[0][role].value;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                      ");
    w.write("this.permissions.push(key);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                      ");
    w.write("this.routearray.push(key);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                      ");
    w.write("this.routearray = this.routearray.filter((item, index) => this.routearray.indexOf(item) === index)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                      ");
    w.write("this.permissions = this.permissions.filter((item, index) => this.permissions.indexOf(item) === index)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                    ");
    w.write("this.broadcastService.sendMessage({ role: this.permissions });");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.routeName[1] == 'home') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("return true");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("return this.routearray.filter(routevalue => routevalue === this.routeName[1]).length > 0;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("    ");
    w.write("} else {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("this.route.navigate(['/home']);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("return false;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return false;");
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
group.addTemplate("/authguardv13", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;