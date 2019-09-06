import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from '../../login/loginservice.service';
import { Router, NavigationEnd } from '@angular/router';
import { Brodcastservice } from '../../broadcast.service';
import { AuthGuard } from '../../auth/auth.guard';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { DataService } from '../../../shared/data.service';
import { ConfigManagerService } from 'src/app/config-manager/config-manager.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hideElement: boolean;
  public headergaurd: any;
  public permission: any;
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
    private logoutservice: LoginService, private router: Router, public brodcast: Brodcastservice, private gaurdservice: AuthGuard) {
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

  changeLanguage(lang: string) {
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(x => {
        this.updateState(lang);
        document.location.reload();
      });
    }
  }

  private updateState(lang: string) {
    this.language = lang;
    this.dataService.setDefaultLanguage(lang);
  }
  showAbout() {
    this.displayAboutModel = 'block';

    this.configurationService.getVersion('version').subscribe(data => {
      this.versionData = data;
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });

    this.configurationService.getBuildVersion('build_version').subscribe(data => {
      this.buildVersionData = data;
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
      sessionStorage.clear();
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
