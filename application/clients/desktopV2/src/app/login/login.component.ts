import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { nanoid } from "nanoid";
import { LoggingService } from '../config/logging.service';
import { LoginService } from './login.service';
import { Brodcastservice } from '../broadcast.service';
import { Router } from '@angular/router';
import { SignupService } from '../signup/signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginform:any;
  public logId: any;
  public Accesslevel: any;
  public permission: any[] = [];
  public Userdetails:any;
  public id: any;
  public lastloggedintime: any;
  public tokenerror: any;
  public submitted:boolean = false;
  public errormessage:string='';
  public openId: String = 'openid';
  constructor(public route: Router ,public loginservice:LoginService,public logger:LoggingService,public broadcast: Brodcastservice,public SignupService:SignupService) { }
 
  ngOnInit(): void {
    this.loginform = new FormGroup({
      'logindata': new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z\d].{8,}')])
      })
    });
  }
  get f() { return this.loginform.controls; }
  Consent() {
    const consentbody = {
      submit: 'Allow access',
      scope: this.openId,
      id: this.id,
    };
    this.SignupService.Consent(consentbody).subscribe(consentvalue => {
      
      if (consentvalue.Access !== undefined) {
        this.Accesslevel = consentvalue.Access[0];
        this.permission.push(this.Accesslevel);
        this.broadcast.sendmessage({ 'Access': this.permission });
        sessionStorage.setItem('Access', JSON.stringify(this.permission));
      }
      this.Userdetails = consentvalue.Userdetails;
      this.id = this.Userdetails.body._id;
      this.lastloggedintime = this.Userdetails.body.loggedinDate;
      this.route.navigate(['project']);
      this.logger.log('log',this.Userdetails)
      sessionStorage.setItem('Id', this.id);
      sessionStorage.setItem('lastloggedintime', this.lastloggedintime);
      sessionStorage.setItem('email', this.Userdetails.body.email);
      sessionStorage.setItem('JwtToken', this.Userdetails.body.Idtoken);
      sessionStorage.setItem('LogId', this.logId + '_' + this.id);
    }, error => {
      this.logger.log('error',error)
    });
  }
  login(){
    this.submitted = true;
    const { invalid, value } = this.loginform;
    if (invalid) {
      return;
    }
    const logininfo = {
      email: this.loginform.value.logindata.email,
      password: this.loginform.value.logindata.password
    };
    this.loginservice.Login(logininfo).subscribe(logindetails=>{
      
      if (logindetails.Access !== undefined) {
        this.Accesslevel = logindetails.Access[0];
        this.permission.push(this.Accesslevel);
        this.broadcast.sendmessage({ 'Access': this.permission });
        this.broadcast.gaurdarray = [];
        this.broadcast.gaurdarray = this.permission;
        sessionStorage.setItem('Access', JSON.stringify(this.permission));
      }
      this.Userdetails = logindetails.Userdetails;
      this.tokenerror = logindetails.error;
      this.id = this.Userdetails.body._id;
      this.lastloggedintime = this.Userdetails.body.loggedinDate;
      if (this.Userdetails.body === 'Incorrect Username or Password') {
        this.errormessage = this.Userdetails.body;
      }
      else {
        this.logId = nanoid(12);
        if (this.tokenerror !== undefined) {
          if (this.tokenerror.name === 'TokenExpiredError') {
            this.Consent();
          }
        } else {
          sessionStorage.setItem('Id', this.id);
          sessionStorage.setItem('lastloggedintime', this.lastloggedintime);
          sessionStorage.setItem('email', this.Userdetails.body.email);
          sessionStorage.setItem('JwtToken', this.Userdetails.body.Idtoken);
          sessionStorage.setItem('LogId', this.logId + '_' + this.id);
          if (this.Userdetails.body.Idtoken === null || this.Userdetails.body.Idtoken === '') {
            this.Consent();
          } else {
            this.route.navigate(['project']);
          }
        }
      }
    },error=>{
      this.logger.log('error',error);
    });
  }
}
