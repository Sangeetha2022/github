import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../login/loginservice.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Brodcastservice } from '../../broadcast.service';
import { AuthGuard } from '../../auth.guard';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hideElement: boolean;
  public headergaurd: any;
  public permission: any;

  @Output() public sidenavToggle = new EventEmitter();

  // tslint:disable-next-line:max-line-length
  constructor(private logoutservice: LoginService, private router: Router, public brodcast: Brodcastservice, private gaurdservice: AuthGuard) {
    // gaurdservice.getpermission.subscribe(response => this.Accesspermission(response));
    this.brodcast.currentusername.subscribe(headerpermission => {
      console.log('----------behavioursubject---->>>', headerpermission);
      if (headerpermission !== undefined) {
        this.headergaurd = headerpermission;
        console.log('-------this.permission----->>', this.headergaurd.Project);
        if (this.headergaurd.Project !== undefined) {
          this.permission = this.headergaurd.Project.Access;
          if (this.headergaurd.Project.Fields !== undefined) {
            const fields = this.headergaurd.Project.Fields;
            this.configfields = fields.config;
          }
        }
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/consent' || event.url === '/') {
          this.hideElement = true;
        } else {
          this.hideElement = false;
        }
      }
    });

  }

  public user: any;
  public view: any;
  public configfields: any;

  Accesspermission(response) {
    console.log('-------------->>>>', response);
    if (response.Project.Access !== undefined) {
      this.permission = response.Project.Access;
      if (this.permission === 'true') {
        const fields = response.Project.Fields;
        this.configfields = fields.config;
        console.log('------fields-->>>', fields.config);
      }
    } else {
      this.permission = response.Admin;
      this.configfields = 'true';
    }
    // console.log('--------permission----->>>', this.permission);
  }

  ngOnInit() {
    // this.Accesspermission(this.brodcast.gaurdarray);
  }


  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  Logout() {
    this.user = {
      userid: JSON.parse(sessionStorage.getItem('Userid'))
    };
    this.logoutservice.Logout(this.user).subscribe(data => {
      sessionStorage.clear();
      this.router.navigate(['']);
    }, error => {
      console.error('error:', error);
    });
  }

}
