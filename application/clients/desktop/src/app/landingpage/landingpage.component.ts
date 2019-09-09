import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandingService } from './landingservice.service';
import { AuthGuard } from '../auth/auth.guard';
import { Brodcastservice } from '../broadcast.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private router: ActivatedRoute, private landingservice: LandingService, private gaurdservice: AuthGuard, private broadcast: Brodcastservice) {
    this.broadcast.currentusername.subscribe(landingresponse => {
      console.log('----somethinghappeninghere----', landingresponse);
      if (landingresponse !== undefined) {
        this.landinggaurd = landingresponse;
        this.landingpermission = this.landinggaurd.Landing;
        this.fields = this.landingpermission.Fields;
        console.log('--------landingfields---->>>', this.fields);
        this.field1 = this.fields[0].Field1.value;
        this.field2 = this.fields[0].Field2.value;
        this.field3 = this.fields[0].Field3.value;
        this.field4 = this.fields[0].Field4.value;
      }
    });
  }

  public params = {
    code: '',
    scope: '',
    state: ''
  };
  public tokens: any;
  public codes: any;
  public scopes: any;
  public states: any;
  public landinggaurd: any;
  public landingpermission: any;
  public fields: any;
  public field1: any;
  public field2: any;
  public field3: any;
  public field4: any;


  ngOnInit() {
  }


  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.codes = params['code'];
      this.scopes = params['scope'];
      this.states = params['state'];
    });

    this.params.code = this.codes;
    this.params.scope = this.scopes;
    this.params.state = this.states;
  }
}
