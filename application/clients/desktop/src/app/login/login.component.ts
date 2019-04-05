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
  public errormessage: any;
  public id: any;
  public Userdetails: any;
  public tokenerror: any;

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
      // this.loginservice.Getlogin(this.login).subscribe(token => {
      //   this.token = token.csrftoken;
      // }, error => {
      //   console.error('error: ', error);
      // });
    });
  }

  Login() {
    // this.user.challenge = this.loginchallenge;
    // this.user.csrftoken = this.token;
    this.loginservice.Login(this.user).subscribe(logindetails => {
      this.Userdetails = logindetails.Userdetails;
      this.tokenerror = logindetails.error;
      console.log('------------loginresponse-----', this.Userdetails, this.tokenerror);
      this.id = this.Userdetails._id;
      this.lastloggedintime = this.Userdetails.loggedinDate;
      // const redirecturi = logindetails.redirectUrl;
      // window.open(redirecturi, '_self');
      if (this.tokenerror !== undefined) {
        if (this.tokenerror.name === 'TokenExpiredError') {
          sessionStorage.clear();
          // this.loginservice.Logout(this.id).subscribe(data => {
          this.route.navigate(['consent'], { queryParams: { id: this.Userdetails._id } });        // }, error => {
          //   console.error('error:', error);
          // });
        }
      }
      if (this.Userdetails === 'Incorrect Username or Password') {
        this.errormessage = this.Userdetails;
      } else {
        sessionStorage.setItem('Id', this.id);
        sessionStorage.setItem('lastloggedintime', this.lastloggedintime);
        sessionStorage.setItem('email', this.Userdetails.email);
        sessionStorage.setItem('JwtToken', this.Userdetails.Idtoken);
        if (this.Userdetails.Idtoken === null || this.Userdetails.Idtoken === '') {
          this.route.navigate(['consent'], { queryParams: { id: this.Userdetails._id } });
        } else {
          this.route.navigate(['callback']);
        }

      }

    }, error => {
      console.error('error---------->>>>>', error);
    });

  }
}
