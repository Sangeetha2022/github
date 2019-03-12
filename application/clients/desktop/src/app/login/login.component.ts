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
    username: '',
    password: '',
    challenge: '',
    csrftoken: ''
  };
  public token: any;
  public href: any;
  ngOnInit() {
    this.Queryparams();
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
    this.user.challenge = this.loginchallenge;
    this.user.csrftoken = this.token;
    this.loginservice.Login(this.user).subscribe(logindetails => {
      const redirecturi = logindetails.redirectUrl;
      window.open(redirecturi, '_self');
    }, error => {
      console.error('error: ', error);
    });

    this.route.navigate(['consent']);
  }
}
