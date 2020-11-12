import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/loginservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public displayGoogleModel = 'none';
  public displayFacebookModel = 'none';
  public googleInfo = {
    socialNetwork: 'Google',
    appId: ''
  };
  public faceBookInfo = {
    socialNetwork: 'FaceBook',
    appId: ''
  };
  public requiredError = false;
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {

  }

  openGoogleDialog() {
    this.displayGoogleModel = 'block';
  }

  closeGoogleDialog() {
    this.displayGoogleModel = 'none';
    this.requiredError = false;
  }

  openFacebookDialog() {
    this.displayFacebookModel = 'block';
  }

  closeFacebookDialog() {
    this.displayFacebookModel = 'none';
    this.requiredError = false;
  }

  addGoogleConfigs() {
    if (this.googleInfo.appId) {
      this.requiredError = false;
      this.loginService.addConfigurations(this.googleInfo).subscribe(response => {
        this.displayGoogleModel = 'none';
      });
    } else {
      this.requiredError = true;
    }
  }

  addFaceBookConfigs() {
    if (this.faceBookInfo.appId) {
      this.requiredError = false;
      this.loginService.addConfigurations(this.faceBookInfo).subscribe(response => {
        this.displayFacebookModel = 'none';
      });
    } else {
      this.requiredError = true;
    }
  }

}
