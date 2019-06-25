import { Component, Inject, OnInit } from '@angular/core';
import { detect } from 'detect-browser';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { AppComponentService } from '../app/app.component.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = true;
  start = 0;
  headerFooter: boolean;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private router: Router) { }

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
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const temp = event.url.split('?');
          this.headerFooter = (temp[0] !== '/desktopscreen');
        }
      });
  }

}
