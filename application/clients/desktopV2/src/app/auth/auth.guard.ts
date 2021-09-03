import { Injectable, Output,EventEmitter } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,GuardsCheckEnd} from '@angular/router';
import { Brodcastservice } from '../broadcast.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public routename: any;
  public Userid: any;
  public jwtoken: any;
  public userole:any;
  public accessroutes:any[]=[];
  public viewpermission: any;
  public projectscreen: any;
  public landingpageobject: any;
  public checkadmin: any;
  @Output() getpermission = new EventEmitter();
  
  constructor(private router:Router, private broadcast: Brodcastservice){
    this.broadcast.currentusername.subscribe(authgaurdvalue => {
      console.log('--------AuthValue is-----', authgaurdvalue);
      // @ts-ignore
      this.accessroutes = authgaurdvalue.Access;
    });
    this.router.events.pipe(filter((value: any) => value instanceof GuardsCheckEnd)).subscribe((value: GuardsCheckEnd) => {
      console.log('--------Route Value----', value.url);
      this.routename = value.url.split('/');
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean   {
      return this.checkLoogedIn(state.url);
  }
  checkLoogedIn(url: String) {
    this.routename = url.split('/');
    this.Userid = sessionStorage.getItem('Id');
    
    if (this.Userid !== null) {
      this.jwtoken = sessionStorage.getItem('JwtToken');
      const helper = new JwtHelperService();
      const decodedtoken = helper.decodeToken(this.jwtoken);
      console.log("decode token",decodedtoken);
      this.userole = decodedtoken.role;
      if (this.accessroutes === undefined) {
        this.accessroutes = JSON.parse(sessionStorage.getItem('Access')  || '{}');
      }
      if (this.accessroutes.length > 0) {
        if (this.routename && this.routename[1].includes('profile?id=')) {
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
             Project.filter((data:any)=>{
              console.log("data",data);
              console.log("projectfields",data.Access.value);
              const projectpermission = data.Access.value;
              this.viewpermission = projectpermission;
              const projectfields = data.Fields;
              const config = projectfields[0].Configuration;
              const configvalue = config.value;
              this.projectscreen = {
                'Access': projectpermission,
                'Fields': {
                'config': configvalue
                }
              };
            });
            Landing.filter((data:any)=>{
            const landingpage =data.Access.value;
              if (landingpage === 'true') {
                const landingfields = data.Fields;
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
              Project.filter((data:any)=>{
                console.log("projectfields",data.Access.value);
                const projectpermission = data.Access.value;
                this.viewpermission = projectpermission;
                const projectfields = data.Fields;
                const config = projectfields[0].Configuration;
                const configvalue = config.value;
                this.projectscreen = {
                  'Access': projectpermission,
                  'Fields': {
                  'config': configvalue
                  }
                };
              });
              Landing.filter((data:any)=>{
                const landingpage =data.Access.value;
                  if (landingpage === 'true') {
                    const landingfields = data.Fields;
                    this.landingpageobject = {
                      'Access': landingpage,
                      'Fields': landingfields
                    };
                  }
                });
                this.broadcast.sendmessage({ 'Landing': this.landingpageobject, 'Project': this.projectscreen });
            }
            else {
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
            this.viewpermission = useraccess.Project[0].Access.value;
          }
        });
        if(this.routename && this.routename[1] === 'project'){
          if (this.viewpermission !== 'true') {
            return false;
          }
          else{
            return true;
          }
        }
      }
      return false;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
