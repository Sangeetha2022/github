import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { LoggingService } from '../config/logging.service';
import { SignupService } from './signup.service';
import { nanoid } from "nanoid";
import { Brodcastservice } from '../broadcast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public registerform:any;
  public Userdetails:any;
  public logId:any;
  public id: any;
  public errormessage: any;
  public openId: String = 'openid';
  public Accesslevel: any;
  public permission: any[] = [];
  public lastloggedintime: any;
  public submitted:boolean = false;
  constructor(private route: Router,public SignupService:SignupService,public logger:LoggingService,public broadcast:Brodcastservice) { }

  ngOnInit(): void {
    this.registerform = new FormGroup({
      'registerdata': new FormGroup({
        'firstname': new FormControl(null, [Validators.required]),
        'lastname': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z\d].{8,}')])
      })
    });
  }
  get f() { return this.registerform.controls; }

  register(){
    const { invalid, value } = this.registerform;
    this.submitted=true;
    if (invalid) {
      return;
    }
    const signupdetails = {
      firstName: this.registerform.value.registerdata.firstname,
      lastName: this.registerform.value.registerdata.lastname,
      email: this.registerform.value.registerdata.email,
      password: this.registerform.value.registerdata.password
    };
    this.SignupService.signup(signupdetails).subscribe(data => {
      this.Userdetails = data.Userdetails;
      this.logId = nanoid(12);
      this.id = this.Userdetails.body._id;
      if (this.Userdetails.body === 'Email is already exists') {
        this.errormessage = this.Userdetails.body;
      } else {
        if (this.Userdetails.body.Idtoken === null || this.Userdetails.body.Idtoken === '' || this.Userdetails.body.Idtoken === undefined) {
          this.Consent();
          this.route.navigate(['login']);
        }

      }
    });
  }
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
}
