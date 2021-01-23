import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  public show: boolean;
  public signupform: FormGroup;
  public socialSignup: Boolean = false;


  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.show = false;

  }

  ngOnInit() {
    this.signupform = new FormGroup({
      'signupdata' : new FormGroup({
        'firstname': new FormControl(null, [Validators.required]),
        'lastname': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        // tslint:disable-next-line:max-line-length
        'password': new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ])
      })
    });
  }

  signup() {
    const singupinfo = {
      firstName: this.signupform.value.signupdata.firstname,
      lastName: this.signupform.value.signupdata.lastname,
      email: this.signupform.value.signupdata.email,
      password: this.signupform.value.signupdata.password
    };
    this.loginService.signup(singupinfo).subscribe(data => {
      this.router.navigate(['login']);
    });
  }

  hideEye() {
    this.show = !this.show;
  }

}
