import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './loginservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private router: ActivatedRoute, private loginservice: LoginService) { }

  public challenge: any;
  public loginchallenge: any;
  public login: any;
  public user = {
    email: '',
    password: '',
  };
  public token: any;
  public href: any;
  public lastloggedintime: any;
  public userdetails: any;

  ngOnInit() {
    // this.Queryparams();
  }


  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.loginchallenge = params['login_challenge'];
      this.challenge = window.location.href;
      this.login = {
        'login_challenge': this.challenge
      };
      const splitvalue = this.challenge.split('?');
      this.login = splitvalue[1];
      this.loginservice.Getlogin(this.login).subscribe(token => {
        this.token = token.csrftoken;
      }, error => {
        console.error('error: ', error);
      });
    });
  }

  Login(value) {
    // this.user.challenge = this.loginchallenge;
    // this.user.csrftoken = this.token;
    this.loginservice.Login(this.user).subscribe(logindetails => {
      // const redirecturi = logindetails.redirectUrl;
      // window.open(redirecturi, '_self');
      this.lastloggedintime = logindetails.loggedinDate;
      sessionStorage.setItem('lastloggedintime', logindetails.loggedinDate );
      sessionStorage.setItem('email', logindetails.email);
      if (logindetails.Idtoken === null || logindetails.Idtoken === '') {
        this.route.navigate(['consent'], { queryParams: { id: logindetails._id } });
      } else {
        this.route.navigate(['callback']);
      }

    }, error => {
      console.error('error: ', error);
    });

    this.route.navigate(['consent']);
  }
}
