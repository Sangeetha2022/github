import { Component,OnInit} from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Footer:boolean=false;
  constructor(public router: Router) { }
  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const temp = event.url.split('?');
        this.Footer = (temp[0] !== '/desktopscreen');
      }
    });
  }
}
