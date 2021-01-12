
export class HpLanding {
    public static HTML_TAG = `<div class="row login-row">
    <div class="login-form">
      <div class="card login-card">
        <div class="card-body">
          <div class="welcome-division">
            <span class="welcome mr-1">Welcome</span><span class="back">Back</span>
          </div>
          <div class="please-login-text">Please login to your account</div>
          <div *ngIf="socialLogin!=false" class="login-with-text mt-5">Login with</div>
          <div *ngIf="socialLogin!=false">
            <button type="button" class="btn btn-primary btn-lg google-btn mr-3 animate"><img class="mr-2"
                src="../../assets/img/google-symbol.png" height="20" alt="google" />{{'source.google' | i18next}}</button>
            <button type="button" class="btn btn-secondary btn-lg facebook-btn ml-3"><img class="mr-2"
                src="../../assets/img/facebook-logo.png" height="20" alt="fb" />{{'source.facebook' | i18next}}</button>
          </div>
          <div *ngIf="socialLogin!=false" class="or-section mt-3 mb-3">
            <p>OR</p>
          </div>
  
          <div>
            <form class="login-input-divison">
              <div class="form-body">
                <div class="col-auto mb-4">
                  <label class="sr-only" for="inlineFormInputGroup">Email</label>
                  <div class="input-group mb-2 user-input">
                    <div class="input-group-prepend">
                      <div class="input-group-text generaldemoprojec-input"><img src="../../assets/img/user.png"
                          height="20" alt="user" /></div>
                    </div>
                    <input type="text" [(ngModel)]='user.email' name="user" class="form-control general-input"
                      id="inlineFormInputGroup" placeholder="Username">
                  </div>
                </div>
                <div class="col-auto mb-1">
                  <label class="sr-only" for="inlineFormInputGroup">Password</label>
                  <div class="input-group password-input">
                    <div class="input-group-prepend">
                      <div class="input-group-text general-input"><img src="../../assets/img/iconfinder_lock_1814107.png"
                          height="20" alt="password" /></div>
                    </div>
                    <input [type]="show ? 'text': 'password'" [(ngModel)]='user.password' name="user"
                      class="form-control general-input general-input-border" id="inlineFormInputGroup"
                      placeholder="Password">
                    <div class="input-group-append">
                      <span class="input-group-text general-input"><img
                          [src]="show ? '../../assets/img/eyeopen.png' : '../../assets/img/eyeslash.png'" height="20"
                          (click)="hideEye()" alt="eye" /></span>
                    </div>
                  </div>
                </div>
                <div class="col-auto row">
                  <div class="form-check mb-2 remember-section">
                    <input class="form-check-input" type="checkbox" id="autoSizingCheck">
                    <label class="form-check-label remember-me">
                      Remember Me
                    </label>
                  </div>
                  <div class="form-check mb-2 forgot-password">
                    <span class="mt-1"> Forgot Password?</span>
                  </div>
                </div>
                <div class="col-auto mt-3">
                  <button type="submit" (click)="Login()" class="btn btn-primary mb-2 login-btn">
                    {{'source.login' | i18next}}</button>
                </div>
                <div class="col-auto mt-2">
                  <p class="signup-section text-center">Don't have an account? <span class="signup-link underline"><a
                        class="signup-link underline" [routerLink]="['/signup']">{{'source.signup' | i18next}}</a></span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-7 sample-form">
      <div class="geppetto-image-division col"><img class="login-geppetto-image" src="../../assets/img/Group 2704.png"
          alt="geppetto" /></div>
      <div class="group-img-section"><img class="group-img" src="../../assets//img//Group 2846.png" alt="group" /></div>
    </div>
  </div>`;
    public static CSS_DATA = ``;

}