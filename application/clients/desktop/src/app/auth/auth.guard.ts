import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Brodcastservice } from '../broadcast.service';
import 'rxjs/add/operator/filter';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  @Output() getpermission = new EventEmitter();
  // @Output() landingpage = new EventEmitter();
  constructor(private router: Router, public broadcast: Brodcastservice) {
    this.broadcast.currentusername.subscribe(authgaurdvalue => {
      console.log('--------authvaluekishan-----', authgaurdvalue);
      // @ts-ignore
      this.accessroutes = authgaurdvalue.Access;
    });
    this.router.events.filter(value => value instanceof NavigationStart).subscribe((value: NavigationStart) => {
      console.log('--------routevalue----', value.url);
      this.routename = value.url.split('/');
    });
  }
  public jwtoken: any;
  public accessroutes: any;
  public developervalue: any;
  public adminvalue: any;
  public uservalue: any;
  public userole: any;
  public viewpermission: any;
  public routename: any;
  public checkadmin: any;
  public landingpageobject: any;
  public projectscreen: any;
  public testarray: any[] = [];
  public consentroute: any;
  public Userid: any;


  canActivate(): boolean {
    this.Userid = sessionStorage.getItem('Id');
    if (this.Userid !== null) {
      this.jwtoken = sessionStorage.getItem('JwtToken');
      const helper = new JwtHelperService();
      const decodedtoken = helper.decodeToken(this.jwtoken);
      this.userole = decodedtoken.role;
      // this.accessroutes = JSON.parse(sessionStorage.getItem('Access'));
      const url = window.location.href;
      // this.routename = url.split('/');
      // this.consentroute = this.routename[3];
      if (this.accessroutes === undefined) {
        this.accessroutes = this.broadcast.gaurdarray;
      }
      if (this.accessroutes) {
        if (this.routename[1].includes('profile?id=')) {
          this.routename = this.routename[1].split('?');
          this.routename[1] = this.routename[0];
        }
        this.accessroutes.forEach(element => {
          const Developer = element['Developer'];
          const Admin = element['Admin'];
          const User = element['Standard User'];
          if (this.userole === 'Admin') {
            const adminaccess = JSON.parse(Admin.value);
            const Adminpage = adminaccess['Admin'];
            this.viewpermission = Adminpage[0].Access.value;
            const Project = adminaccess['Project'];
            const Landing = adminaccess['Landing'];
            Project.forEach(projectaccess => {
              const projectpermission = projectaccess.Access.value;
              this.viewpermission = projectpermission;
              const projectfields = projectaccess.Fields;
              const config = projectfields[0].Configuration;
              const configvalue = config.value;
              this.projectscreen = {
                'Access': projectpermission,
                'Fields': {
                  'config': configvalue
                }
              };
            });
            Landing.forEach(landingaccess => {
              const landingpage = landingaccess.Access.value;
              if (landingpage === 'true') {
                const landingfields = landingaccess.Fields;
                this.landingpageobject = {
                  'Access': landingpage,
                  'Fields': landingfields
                };
              }
            });
            this.broadcast.sendmessage({ 'Landing': this.landingpageobject, 'Project': this.projectscreen });
          }
          if (this.userole === 'Developer') {
            const developeraccess = JSON.parse(Developer.value);
            this.checkadmin = developeraccess.Admin.Access.value;
            if (this.checkadmin === 'false') {
              const Project = developeraccess['Project'];
              const Landing = developeraccess['Landing'];
              Project.forEach(projectaccess => {
                const projectpermission = projectaccess.Access.value;
                this.viewpermission = projectpermission;
                const projectfields = projectaccess.Fields;
                const config = projectfields[0].Configuration;
                const configvalue = config.value;
                this.projectscreen = {
                  'Access': projectpermission,
                  'Fields': {
                    'config': configvalue
                  }
                };
              });
              Landing.forEach(landingaccess => {
                const landingpage = landingaccess.Access.value;
                if (landingpage === 'true') {
                  const landingfields = landingaccess.Fields;
                  this.landingpageobject = {
                    'Access': landingpage,
                    'Fields': landingfields
                  };
                }
              });
              this.broadcast.sendmessage({ 'Landing': this.landingpageobject, 'Project': this.projectscreen });
              // this.broadcast.gaurdarray.push({ 'Landing': this.landingpageobject, 'Project': this.projectscreen});
            } else {
              this.getpermission.emit(developeraccess.Admin.Access.value);
              this.viewpermission = developeraccess.Admin.Access.value;
            }
          }
          if (this.userole === 'Standarduser') {
            const useraccess = JSON.parse(User.value);
            this.projectscreen = {
              'Access': useraccess.Admin.Access.value
            };
            this.broadcast.sendmessage({ 'Project': this.projectscreen });
            // this.getpermission.emit(useraccess.Admin.Access.value);
            this.viewpermission = useraccess.Project[0].Access.value;
          }
          // console.log('---------test--------', Developer, Admin, User);
          // this.developervalue = developeraccess.Admin.Access.value;
          // this.adminvalue = adminaccess.Admin.Access.value;
          // this.uservalue = useraccess.Admin.Access.value;
        });
        if (this.routename[1] === 'landing') {
          // this.router.navigate([]);
          if (this.viewpermission !== 'true') {
            return false;
          } else {
            return true;
          }
        }
        if (this.routename[1] === 'project') {
          if (this.viewpermission !== 'true') {
            return false;
          } else {
            return true;
          }
        }
        if (this.routename[1] === 'profile') {
          if (this.viewpermission !== 'true') {
            return false;
          } else {
            return true;
          }
        }
        if (this.routename[1] === 'admin') {
          if (this.viewpermission !== 'true') {
            return false;
          } else {
            return true;
          }
        }
        if (this.routename[1] === 'usermanagement') {
          if (this.viewpermission !== 'true') {
            return false;
          } else {
            return true;
          }
        }

      }
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
