import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { Consentservice } from './consentservice.service';
@Component({
  selector: 'app-consentscreen',
  templateUrl: './consentscreen.component.html',
  styleUrls: ['./consentscreen.component.scss']
})
export class ConsentscreenComponent implements OnInit {

  constructor(private router: ActivatedRoute, private consentservice: Consentservice, private route: Router) { }


  public openId: any;
  public offLine: any;
  public challenge: any;
  public consent: any;
  public token: any;
  public consentchallenge: any;
  public id: any;
  public Userdetails: any;
  public lastloggedintime: any;
  public Accesslevel: any;
  public permission: any[] = [];
  // public consentbody = {
  //   challenge: '',
  //   submit: '',
  //   grant_scope: [],
  //   csrftoken: ''
  // };

  ngOnInit() {
    // this.Queryparams();
    this.router.queryParams.subscribe(params => {
      this.id = params['id'];
    });

  }

  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.consentchallenge = params['consent_challenge'];
      this.challenge = window.location.href;
    });
    const splitvalue = this.challenge.split('?');
    this.consent = splitvalue[1];
    // this.consentservice.Getconsent(this.consent).subscribe(consentdetails => {
    //   this.token = consentdetails.csrfToken;
    // }, error => {
    //   console.error('error: ', error);
    // });
  }

  openid(value) {
    if (value.checked === true) {
      this.openId = 'openid';
    }
  }

  offline(value) {
    if (value.checked === true) {
      this.offLine = 'offline';
    }
  }

  Consent() {
    // this.consentbody.challenge = this.consentchallenge;
    // this.consentbody.submit = 'Allow access';
    // this.consentbody.grant_scope = [this.openId, this.offLine];
    // this.consentbody.csrftoken = this.token;
    const consentbody = {
      submit: 'Allow access',
      scope: this.openId,
      id: this.id,
    };
    this.consentservice.Consent(consentbody).subscribe(consentvalue => {
      // window.open(consentvalue.redirectUrl, '_self');
      if (consentvalue.Access !== undefined) {
        console.log('-------ahdbakjvjakjak--------');
        this.Accesslevel = consentvalue.Access[0];
        this.permission.push(this.Accesslevel);
        console.log('------------loginresponse-----', this.permission);
        sessionStorage.setItem('Access', JSON.stringify(this.permission));
      }
      this.Userdetails = consentvalue.Userdetails;
      this.id = this.Userdetails.body._id;
      this.lastloggedintime = this.Userdetails.body.loggedinDate;
      this.route.navigate(['callback']);
      console.log('--------idtoken------>>>', this.Userdetails);
      sessionStorage.setItem('Id', this.id);
      sessionStorage.setItem('lastloggedintime', this.lastloggedintime);
      sessionStorage.setItem('email', this.Userdetails.body.email);
      sessionStorage.setItem('JwtToken', this.Userdetails.body.Idtoken);
    }, error => {
      console.error('error: ', error);
    });

  }
}
