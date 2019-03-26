import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../login/loginservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private logoutservice: LoginService, private router: Router) { }

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
