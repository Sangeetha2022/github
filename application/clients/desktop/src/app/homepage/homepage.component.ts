import { Component, OnInit, Inject } from '@angular/core';
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

  hideElements: Boolean = true;
  public lastloggedintime: any;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private dataService: DataService,
    private navigationService: NavigationService,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/' || event.url === '/login') {
          this.hideElements = true;
        } else {
          this.hideElements = false;
        }
      }
    });
  }


  ngOnInit() {
    this.lastloggedintime = sessionStorage.getItem('lastloggedintime');
  }

}
