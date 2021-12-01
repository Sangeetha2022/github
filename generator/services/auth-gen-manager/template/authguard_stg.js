/*
 * Template group authguard
 * Compiled on Wed Dec 01 2021 15:56:50 GMT+0530 (India Standard Time)
 */
var path = require("path");
var base = path.dirname(module.filename);

function getInstance(st, group) {
    "use strict";
var r;
var gFile = "authguard"; 

group.name = "authguard";





//
// Template /authguard
//
r = function(w, rc) {
    var g = this.owningGroup,
        s = this.scope;
    
    w.pushIndentation(" ");
    w.write("import { Injectable, Output, EventEmitter, Input, ElementRef } from '@angular/core';");
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
    w.write("import { Observable } from 'rxjs';");
    w.write("\n");
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
    w.pushIndentation(" ");
    w.write("\n");
    w.popIndentation();
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
    w.write("public samplescreen: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public adminscreen: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public userscreen: any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public sefscreen: any;");
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
    w.write("public user_scr_permissions: any[] = [];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("public admin_scr_permissions: any[] = [];");
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
    w.pushIndentation("      ");
    w.write("console.log('access routes', this.accessRoutes);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("});");
    w.popIndentation();
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
    w.pushIndentation("  ");
    w.write("canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("console.log('------loggedvalue----', state.url);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("     ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("     ");
    w.write("return this.checkLoogedIn1(state.url);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("sefscreen:any;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("checkLoogedIn1(url: String ) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("this.routeName = url.split('/');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("console.log('checkLoogedIn', url);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("    ");
    w.write("console.log('this.routeName checkLoogedIn', this.routeName);");
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
    w.write("console.log(\"inside if user id\");");
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
    w.write("console.log('decodedToken', decodedToken);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("this.userRole = decodedToken.role;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("console.log('this.userRole', this.userRole);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("this.accessRoutes = JSON.parse(sessionStorage.getItem('Access') || '{}');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("console.log('this.accessRoutes', this.accessRoutes);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("      ");
    w.write("this.accessRoutes[0].access.forEach((element:any) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.userRole === 'User' && element['user']) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("const User = element['user'];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("const useraccess = User['value'];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("console.log(\"useraccess\",useraccess);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("const sef_screen = useraccess['sefscreen'];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("          ");
    w.write("sef_screen.forEach((access: { access: { value: any; }; components: any; }) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("this.sefscreen={");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("               ");
    w.write("'Components': access.components");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("};");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("          ");
    w.write("for(let i = 0; i < User['screens'].length; i++) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("this.user_scr_permissions.push(User['screens'][i].screenname);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("this.user_scr_permissions = this.user_scr_permissions.filter((item, index) => this.user_scr_permissions.indexOf(item) === index);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("           ");
    w.write("this.broadcastService.sendMessage({ 'sef_screen': this.sefscreen, 'screens': this.user_scr_permissions });");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("if (this.userRole === 'Admin' && element['admin']) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("const Admin = element['admin'];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("const adminaccess = Admin['value'];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("console.log(\"useraccess\",adminaccess);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("const sef_screen = adminaccess['sefscreen'];");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("          ");
    w.write("sef_screen.forEach((access: { access: { value: any; }; components: any; }) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("this.sefscreen={");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("'Components': access.components");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("};");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("          ");
    w.write("for(let i = 0; i < Admin['screens'].length; i++) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("this.admin_scr_permissions.push(Admin['screens'][i].screenname);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("this.admin_scr_permissions = this.admin_scr_permissions.filter((item, index) => this.admin_scr_permissions.indexOf(item) === index);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("this.broadcastService.sendMessage({ 'sef_screen': this.sefscreen,'screens': this.admin_scr_permissions });");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("       ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("       ");
    w.write("});");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("      ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("      ");
    w.write("return true;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("    ");
    w.write("else{");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("if(this.accessRoutes) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.permissions = []");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.accessRoutes.forEach((route: any) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("console.log(\"kk\",route);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("          ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("        ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.write("\n");
    w.pushIndentation("    ");
    w.write("return false;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("\n");
    w.popIndentation();
    w.pushIndentation("  ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("  ");
    w.write("checkLoogedIn(url: String ) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("this.routeName = url.split('/');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("console.log('checkLoogedIn', url);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("    ");
    w.write("console.log('this.routeName checkLoogedIn', this.routeName);");
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
    w.write("console.log('decodedToken', decodedToken);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("this.userRole = decodedToken.role;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("console.log('this.userRole', this.userRole);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("this.accessRoutes = JSON.parse(sessionStorage.getItem('Access') || '{}');");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("console.log('this.accessRoutes', this.accessRoutes);");
    w.popIndentation();
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
    w.write("this.accessRoutes.forEach((element: any) => {");
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
    w.write("console.log('this.userRole', this.userRole);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("console.log('element', element);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("if(element.role === this.userRole) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("console.log('You are login with role', this.userRole);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("for(let i = 0; i < element.screens.length; i++) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.permissions.push(element.screens[i].screenname);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.routearray.push(element.screens[i].screenname);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.routearray = this.routearray.filter((item, index) => this.routearray.indexOf(item) === index)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("                ");
    w.write("this.permissions = this.permissions.filter((item, index) => this.permissions.indexOf(item) === index)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("this.broadcastService.sendMessage({ role: this.permissions })");
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
    w.write("if (this.routeName[1] == 'sefscreen') {");
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
    w.pushIndentation("    ");
    w.write("} else {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("if(this.accessRoutes) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.permissions = []");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.accessRoutes.forEach((route: any) => {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("if(route.role === 'Guest') {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("for(let i = 0; i < route.screens.length; i++) {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("this.permissions.push(route.screens[i].screenname);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("this.routearray.push(route.screens[i].screenname);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("this.routearray = this.routearray.filter((item, index) => this.routearray.indexOf(item) === index)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("              ");
    w.write("this.permissions = this.permissions.filter((item, index) => this.permissions.indexOf(item) === index)");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("            ");
    w.write("this.broadcastService.sendMessage({ role: this.permissions })");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("          ");
    w.write("}");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("})");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("console.log('this.routeName', this.routeName);");
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
    w.write("else {");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("this.route.navigate(['/sefscreen']);");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("        ");
    w.write("return false;");
    w.popIndentation();
    w.write("\n");
    w.pushIndentation("      ");
    w.write("}");
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
    w.write("\n");
    w.write("\n");
};
r.args = [
        { name: "object"     }
];
group.addTemplate("/authguard", r); 


return group;
}
getInstance.base = base;

module.exports = getInstance;