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
  headerFooter: any;
  //@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
  constructor(
    
    private router: Router) { }

  ngOnInit() {

    // this.router.events
    //   .subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //       const temp = event.url.split('?');
    //       this.headerFooter = (temp[0] !== '/desktopscreen');
    //     }
    //   });
  }

}
