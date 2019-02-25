import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { DataService } from 'src/shared/data.service';

import {NavigationService } from '../navigation.service'

@Component({
  selector: 'app-header-language',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.language.component.html',
  styleUrls: ['./header.language.component.scss']
})
export class HeaderLanguageComponent implements OnInit {

  language = 'en';
  languages = ['en', 'ta', 'es'];

  displayAboutModel: String = 'none';

  versionData: any ={};
  buildVersionData: any ={};

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private dataService: DataService,
    private navigationService: NavigationService
  ) { }

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

    this.navigationService.getVersion("version").subscribe(data => {
      this.versionData = data;
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });

      this.navigationService.getBuildVersion("build_version").subscribe(data => {
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