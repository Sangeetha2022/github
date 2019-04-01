import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../login/loginservice.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hideElement: boolean;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private logoutservice: LoginService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/consent' || event.url === '/') {
          this.hideElement = true;
        } else {
          this.hideElement = false;
        }
      }
    });
  }

  public user: any;

  ngOnInit() {

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  Logout() {
    this.user = {
      userid: JSON.parse(sessionStorage.getItem('Userid'))
    };
    this.logoutservice.Logout(this.user).subscribe(data => {
      this.router.navigate(['']);
    }, error => {
      console.error('error:', error);
    });
  }

}
