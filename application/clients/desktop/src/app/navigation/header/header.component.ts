import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { LoginService } from '../../login/loginservice.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Brodcastservice } from '../../broadcast.service';
import { AuthGuard } from '../../auth.guard';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { DataService } from '../../../shared/data.service';
import { NavigationService } from '../navigation.service';
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
    private navigationService: NavigationService,

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
    this.i18NextService.events.initialized.subscribe((e) => {
      console.log('language---->>>>', e)
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    })

    // this.Accesspermission(this.brodcast.gaurdarray);
  }

  changeLanguage(lang: string) {
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(x => {
        this.updateState(lang);
        // localStorage.setItem('i18nextLng',lang)
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

    this.navigationService.getVersion('version').subscribe(data => {
      this.versionData = data;
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });

    this.navigationService.getBuildVersion('build_version').subscribe(data => {
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
