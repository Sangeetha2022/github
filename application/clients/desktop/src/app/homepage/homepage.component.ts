import { Component, OnInit, Inject } from '@angular/core';
import { HomepageService } from './homepage.service';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { DataService } from '../../shared/data.service';
import { NavigationService } from '../navigation/navigation.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private dataService: DataService,
    private navigationService: NavigationService,
    private router: Router,
    private homepage: HomepageService
    ) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/' || event.url === '/login') {
            this.hideElements = false;
          } else {
            this.hideElements = true;
          }
        }
      });
        
     }

  public href: any;
  language = 'en';
  languages = ['en', 'ta', 'es'];
  hideElements: Boolean = true;
  displayAboutModel: String = 'none';
  versionData: any = {};
  buildVersionData: any = {};
  public lastloggedintime: any;


  ngOnInit() {
    this.lastloggedintime = sessionStorage.getItem('lastloggedintime');

    this.i18NextService.events.initialized.subscribe((e) => {
      console.log('language---->>>>', e)
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    })
    // this.Homescreen();
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
  Homescreen() {
    this.homepage.Home().subscribe(url => {
      this.href = url[0];
    }, error => {
      console.error('error:', error);
    });
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

}
