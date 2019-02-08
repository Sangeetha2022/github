import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-language',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.language.component.html',
  styleUrls: ['./header.language.component.scss']
})
export class HeaderLanguageComponent implements OnInit {

  language = 'en';
  languages = ['en', 'ta', 'es'];

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
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
  }

}
