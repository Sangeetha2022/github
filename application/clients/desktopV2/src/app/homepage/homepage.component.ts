import { Component, OnInit } from '@angular/core';
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
