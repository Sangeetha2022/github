import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from '../../login/loginservice.service';
import { Router, NavigationEnd } from '@angular/router';
import { Brodcastservice } from '../../broadcast.service';
import { AuthGuard } from '../../auth/auth.guard';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { DataService } from '../../../shared/data.service';
import { ConfigManagerService } from 'src/app/config-manager/config-manager.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hideElement: boolean;
  public headergaurd: any;
  public permission: any;
  public currentLanguage: String;
  public confirmLangChangeModal: String = 'none';
  language = 'en';
  languages = ['en', 'ta', 'es'];
  displayAboutModel: String = 'none';
  versionData: any = {};
  buildVersionData: any = {};

  // tslint:disable-next-line:max-line-length
  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private configurationService: ConfigManagerService,
    private dataService: DataService,
    private logoutservice: LoginService,
    private authService: AuthService,
    private router: Router,
    public brodcast: Brodcastservice
  ) {
    this.brodcast.currentusername.subscribe(headerpermission => {
      if (headerpermission !== undefined) {
        this.headergaurd = headerpermission;
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

  public user: any = {
    id: ''
  };
  public view: any;
  public configfields: any;

  Accesspermission(response) {
    if (response.Project.Access !== undefined) {
      this.permission = response.Project.Access;
      if (this.permission === 'true') {
        const fields = response.Project.Fields;
        this.configfields = fields.config;
      }
    } else {
      this.permission = response.Admin;
      this.configfields = 'true';
    }
  }

  ngOnInit() {
    this.i18NextService.events.initialized.subscribe((e) => {
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    });

  }

  confirmLangModel(lang) {
    this.user.id = sessionStorage.getItem('Id');
    if (this.user.id !== null) {
      this.confirmLangChangeModal = 'block';
      this.currentLanguage = lang;
    } else {
      this.changeLanguage(lang);
      this.onCloseHandled();
    }
  }

  confirmLangChange() {
    this.changeLanguage(this.currentLanguage);
    this.onCloseHandled();
  }

  onCloseHandled() {
    this.confirmLangChangeModal = 'none';
  }

  changeLanguage(lang) {
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(x => {
        this.updateState(lang);
      });
    }
    this.user.id = sessionStorage.getItem('Id');
    if (this.user.id !== null) {
      this.Logout();
    } else {
      document.location.reload();
    }
  }

  private updateState(lang: string) {
    this.language = lang;
    this.dataService.setDefaultLanguage(lang);
  }
  showAbout() {
    this.displayAboutModel = 'block';

    this.configurationService.getVersion('version').subscribe(data => {
      this.versionData = data.body;
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });

    this.configurationService.getBuildVersion('build_version').subscribe(data => {
      this.buildVersionData = data.body;
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });

  }
  hideAbout() {
    this.displayAboutModel = 'none';
  }

  Logout() {
    this.user.id = sessionStorage.getItem('Id');
    this.logoutservice.Logout(this.user).subscribe(data => {
      console.log('logout -response-->>' , data)
      if (data.body.signintype === 'google') {
          this.authService.signOut();
      }
      sessionStorage.clear();
      localStorage.clear();
      this.permission = false;
      this.router.navigate(['']);
    }, error => {
      console.error('error:', error);
    });
    this.closeNav();
  }

  openNav() {
    document.getElementById('myNav').style.height = '50%';
  }
  closeNav() {
    document.getElementById('myNav').style.height = '0%';
  }
}
