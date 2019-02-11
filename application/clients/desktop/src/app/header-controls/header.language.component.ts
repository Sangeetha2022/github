import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-header-language',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.language.component.html',
  styleUrls: ['./header.language.component.scss']
})
export class HeaderLanguageComponent implements OnInit {

  language = 'en';
  languages = ['en', 'ta', 'es'];
  private subscription: any = <any> {
    name: '',
    label: '',
    appContext: '',
    description: '',
    defaultLanguage: 'en',
    primaryLanguage: '',
    secondaryLanguage: '',
};

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private dataService: DataService
  ) {}

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
    this.subscription.defaultLanguage = lang;
    this.dataService.changeProjectInfo(this.subscription);
  }

}
