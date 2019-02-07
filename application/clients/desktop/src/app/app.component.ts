import { Component, Inject, OnInit } from '@angular/core';
import { detect } from 'detect-browser';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import {AppComponentService} from '../app/app.component.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // title = 'GeppettoBuilder';
  message = "hello";
  loading = true;
  start = 0;
  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) { }
  ngOnInit() {
    const browser = detect();
    if (browser.name !== 'chrome') {
      if (this.i18NextService.language === 'en') {
        alert('your browser not a chrome,so it cause to miss some features in application');
      } else if (this.i18NextService.language === 'ta') {
        alert('உங்கள் உலாவி குரோம் அல்ல, எனவே இது பயன்பாட்டில் சில அம்சங்களை இழக்கச் செய்யும்');
      } else {
        alert('su navegador no es un chrome, por lo que puede faltar algunas características en la aplicación');
      }
    }
  }
}
