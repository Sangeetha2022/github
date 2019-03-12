import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { Consentservice } from './consentservice.service';
@Component({
  selector: 'app-consentscreen',
  templateUrl: './consentscreen.component.html',
  styleUrls: ['./consentscreen.component.scss']
})
export class ConsentscreenComponent implements OnInit {

  constructor(private router: ActivatedRoute, private consentservice: Consentservice) { }


  public openId: any;
  public offLine: any;
  public challenge: any;
  public consent: any;
  public token: any;
  public consentchallenge: any;
  public consentbody = {
    challenge: '',
    submit: '',
    grant_scope: [],
    csrftoken: ''
  };

  ngOnInit() {
    this.Queryparams();
  }

  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.consentchallenge = params['consent_challenge'];
      this.challenge = window.location.href;
    });
    const splitvalue = this.challenge.split('?');
    this.consent = splitvalue[1];
    this.consentservice.Getconsent(this.consent).subscribe(consentdetails => {
      this.token = consentdetails.csrfToken;
    }, error => {
      console.error('error: ', error);
    });
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
    this.consentbody.challenge = this.consentchallenge;
    this.consentbody.submit = 'Allow access';
    this.consentbody.grant_scope = [this.openId, this.offLine];
    this.consentbody.csrftoken = this.token;
    this.consentservice.Consent(this.consentbody).subscribe(consentvalue => {
      window.open(consentvalue.redirectUrl, '_self');
    }, error => {
      console.error('error: ', error);
    });
  }
}
