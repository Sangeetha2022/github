
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
    public static CSS_DATA = `
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
    }
    
    body {
      font-family: Roboto, sans-serif;
      color: rgb(68, 68, 68);
    }
    
    a {
      color: rgb(71, 178, 228);
    }
    
    a:hover {
      color: rgb(115, 197, 235);
      text-decoration-line: none;
      text-decoration-style: initial;
      text-decoration-color: initial;
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: Roboto, sans-serif;
    }
    
    .nav-menu a {
      color: unset !important;
    }
    
    #header {
      transition-duration: 0.5s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
      z-index: 997;
      background-color: rgb(255, 255, 255);
    }
    
    #header.header-scrolled,
    #header.header-inner-pages {
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(255, 255, 255);
    }
    
    #header .logo {
      font-size: 30px;
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 0px;
      margin-left: 0px;
      padding-top: 0px;
      padding-right: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      line-height: 1;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    
    #header .logo a {
      color: rgb(255, 255, 255);
    }
    
    #header .logo img {
      max-height: 60px;
      margin-top: 20px;
      margin-right: 20px;
      margin-bottom: 20px;
      margin-left: 20px;
    }
    
    #header .navbar {
      background-color: rgb(0, 125, 189);
    }
    
    .nav-menu {
      float: right;
      margin-right: 5%;
    }
    
    .nav-menu ul {
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 0px;
      margin-left: 0px;
      padding-top: 0px;
      padding-right: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      list-style-position: initial;
      list-style-image: initial;
      list-style-type: none;
    }
    
    .nav-menu>ul {
      display: flex;
    }
    
    .nav-menu>ul>li {
      position: relative;
      white-space: nowrap;
      padding-top: 10px;
      padding-right: 0px;
      padding-bottom: 10px;
      padding-left: 28px;
    }
    
    .nav-menu a {
      display: block;
      position: relative;
      color: rgb(255, 255, 255);
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
      font-size: 15px;
      letter-spacing: 0.5px;
      font-weight: 500;
      font-family: Roboto, sans-serif;
    }
    
    .nav-menu a:hover,
    .nav-menu .active>a,
    .nav-menu li:hover>a {
      color: rgb(71, 178, 228);
    }
    
    .nav-menu .drop-down ul {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      display: block;
      position: absolute;
      left: 14px;
      top: calc(100% + 30px);
      z-index: 99;
      opacity: 0;
      visibility: hidden;
      padding-top: 10px;
      padding-right: 0px;
      padding-bottom: 10px;
      padding-left: 0px;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(255, 255, 255);
      box-shadow: rgba(127, 137, 161, 0.25) 0px 0px 30px;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
    }
    
    .nav-menu .drop-down:hover>ul {
      opacity: 1;
      top: 100%;
      visibility: visible;
    }
    
    .nav-menu .drop-down li {
      min-width: 180px;
      position: relative;
    }
    
    .nav-menu .drop-down ul a {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
      font-size: 14px;
      font-weight: 500;
      text-transform: none;
      color: rgb(12, 60, 83);
    }
    
    .nav-menu .drop-down ul a:hover,
    .nav-menu .drop-down ul .active>a,
    .nav-menu .drop-down ul li:hover>a {
      color: rgb(71, 178, 228);
    }
    
    .nav-menu .drop-down>a::after {
      content: "";
      font-family: IcoFont;
      padding-left: 5px;
    }
    
    .nav-menu .drop-down .drop-down ul {
      top: 0px;
      left: calc(100% - 30px);
    }
    
    .nav-menu .drop-down .drop-down:hover>ul {
      opacity: 1;
      top: 0px;
      left: 100%;
    }
    
    .nav-menu .drop-down .drop-down>a {
      padding-right: 35px;
    }
    
    .nav-menu .drop-down .drop-down>a::after {
      content: "";
      font-family: IcoFont;
      position: absolute;
      right: 15px;
    }
    
    .mobile-nav-toggle i {
      color: rgb(0, 150, 214);
    }
    
    .mobile-nav * {
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 0px;
      margin-left: 0px;
      padding-top: 0px;
      padding-right: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      list-style-position: initial;
      list-style-image: initial;
      list-style-type: none;
    }
    
    .mobile-nav a {
      display: block;
      position: relative;
      color: rgb(55, 81, 126);
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
      font-weight: 500;
      outline-color: initial;
      outline-style: none;
      outline-width: initial;
    }
    
    .mobile-nav a:hover,
    .mobile-nav .active>a,
    .mobile-nav li:hover>a {
      color: rgb(71, 178, 228);
      text-decoration-line: none;
      text-decoration-style: initial;
      text-decoration-color: initial;
    }
    
    .mobile-nav .drop-down>a::after {
      content: "";
      font-family: IcoFont;
      padding-left: 10px;
      position: absolute;
      right: 15px;
    }
    
    .mobile-nav .active.drop-down>a::after {
      content: "";
    }
    
    .mobile-nav .drop-down>a {
      padding-right: 35px;
    }
    
    .mobile-nav .drop-down ul {
      display: none;
      overflow-x: hidden;
      overflow-y: hidden;
    }
    
    .mobile-nav .drop-down li {
      padding-left: 20px;
    }
    
    .mobile-nav-active .mobile-nav {
      opacity: 1;
      visibility: visible;
    }
    
    .mobile-nav-active .mobile-nav-toggle i {
      color: rgb(255, 255, 255);
    }
    
    .bannermar {
      margin-top: 10%;
    }
    
    #hero {
      width: 100%;
      height: 80vh;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(255, 255, 255);
    }
    
    #hero .container {
      padding-top: 72px;
    }
    
    #hero h1 {
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 10px;
      margin-left: 0px;
      font-size: 48px;
      font-weight: 700;
      line-height: 56px;
      color: rgb(0, 0, 0);
    }
    
    #hero h2 {
      color: rgb(0, 0, 0);
      font-size: 24px;
    }
    
    #hero p {
      color: rgb(0, 0, 0);
    }
    
    #hero .btn-get-started {
      font-family: Roboto, sans-serif;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 1px;
      display: inline-block;
      padding-top: 10px;
      padding-right: 28px;
      padding-bottom: 11px;
      padding-left: 28px;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
      border-bottom-left-radius: 50px;
      transition-duration: 0.5s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
      margin-top: 10px;
      margin-right: 0px;
      margin-bottom: 0px;
      margin-left: 0px;
      color: rgb(255, 255, 255);
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(71, 178, 228);
    }
    
    #hero .btn-get-started:hover {
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(32, 157, 216);
    }
    
    #hero .btn-watch-video {
      font-size: 16px;
      display: inline-block;
      padding-top: 10px;
      padding-right: 0px;
      padding-bottom: 8px;
      padding-left: 40px;
      transition-duration: 0.5s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
      margin-top: 10px;
      margin-right: 0px;
      margin-bottom: 0px;
      margin-left: 25px;
      color: rgb(255, 255, 255);
      position: relative;
    }
    
    #hero .btn-watch-video i {
      color: rgb(255, 255, 255);
      font-size: 32px;
      position: absolute;
      left: 0px;
      top: 7px;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
    }
    
    #hero .btn-watch-video:hover i {
      color: rgb(71, 178, 228);
    }
    
    section {
      padding-top: 60px;
      padding-right: 0px;
      padding-bottom: 60px;
      padding-left: 0px;
      overflow-x: hidden;
      overflow-y: hidden;
    }
    
    .section-bg {
      background-color: rgb(239, 240, 241);
    }
    
    .section-title {
      text-align: center;
      padding-bottom: 30px;
    }
    
    .section-title h2 {
      font-size: 32px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 20px;
      padding-bottom: 20px;
      position: relative;
      color: rgb(0, 0, 0);
    }
    
    .section-title h2::before {
      content: "";
      position: absolute;
      display: block;
      width: 120px;
      height: 1px;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(221, 221, 221);
      bottom: 1px;
      left: calc(50% - 60px);
    }
    
    .section-title h2::after {
      content: "";
      position: absolute;
      display: block;
      width: 40px;
      height: 3px;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(71, 178, 228);
      bottom: 0px;
      left: calc(50% - 20px);
    }
    
    .section-title p {
      margin-bottom: 0px;
    }
    
    .services .icon-box {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 25px 0px;
      padding-top: 50px;
      padding-right: 75px;
      padding-bottom: 50px;
      padding-left: 75px;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
      transition-property: all;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(255, 255, 255);
    }
    
    .services .icon-box .icon {
      margin-bottom: 10px;
    }
    
    .services .icon-box .icon i {
      color: rgb(71, 178, 228);
      font-size: 36px;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
    }
    
    .services .icon-box h4 {
      margin-bottom: 15px;
      font-size: 18px;
      text-align: center;
      margin-top: 20%;
      font-weight: bold;
    }
    
    .services .icon-box h4 a {
      color: rgb(0, 0, 0);
      transition-duration: 0.3s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
      transition-property: all;
    }
    
    .services .icon-box p {
      line-height: 24px;
      font-size: 14px;
      margin-bottom: 0px;
    }
    
    .services .icon-box:hover {
      transform: translateY(-10px);
    }
    
    .services .icon-box:hover h4 a {
      color: rgb(71, 178, 228);
    }
    
    .about {
      background-image: initial;
      background-position-x: 0%;
      background-position-y: 0%;
      background-size: initial;
      background-repeat-x: no-repeat;
      background-repeat-y: no-repeat;
      background-attachment: initial;
      background-origin: padding-box;
      background-clip: padding-box;
      background-color: rgb(245, 245, 245);
    }
    
    .about-col {
      flex-direction: column;
    }
    
    .about-box {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
      transition-property: all;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(255, 255, 255);
      text-align: center;
      padding-top: 15px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      margin-bottom: 20%;
      width: 50%;
      margin-left: 40%;
    }
    
    .about-box i {
      font-size: 30px;
    }
    
    .about-box:hover {
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(0, 125, 189);
      color: rgb(255, 255, 255);
    }
    
    .img-box img {
      margin-top: 18%;
      margin-left: -5%;
    }
    
    .about-pad {
      padding-left: unset;
      padding-right: unset;
    }
    
    .about-secpad {
      display: flex;
    }
    
    .about-secbox {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
      transition-property: all;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(255, 255, 255);
      text-align: center;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      margin-bottom: 20%;
      margin-left: 40%;
      padding-top: 30px;
      padding-right: 30px;
      padding-bottom: 30px;
      padding-left: 30px;
      height: 30%;
    }
    
    .about-secbox i {
      font-size: 30px;
    }
    
    .about-secbox:hover {
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(0, 125, 189);
      color: rgb(255, 255, 255);
    }
    
    #footer {
      font-size: 14px;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(55, 81, 126);
    }
    
    #footer .footer-newsletter {
      padding-top: 50px;
      padding-right: 0px;
      padding-bottom: 50px;
      padding-left: 0px;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(255, 255, 255);
      text-align: center;
      font-size: 15px;
      color: rgb(68, 68, 68);
    }
    
    #footer .footer-newsletter h4 {
      font-size: 24px;
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 20px;
      margin-left: 0px;
      padding-top: 0px;
      padding-right: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      line-height: 1;
      font-weight: 600;
      color: rgb(55, 81, 126);
    }
    
    #footer .footer-newsletter form {
      margin-top: 30px;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(255, 255, 255);
      padding-top: 6px;
      padding-right: 10px;
      padding-bottom: 6px;
      padding-left: 10px;
      position: relative;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
      border-bottom-left-radius: 50px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 15px;
      text-align: left;
    }
    
    #footer .footer-newsletter form input[type="email"] {
      border-top-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 0px;
      border-left-width: 0px;
      border-top-style: initial;
      border-right-style: initial;
      border-bottom-style: initial;
      border-left-style: initial;
      border-top-color: initial;
      border-right-color: initial;
      border-bottom-color: initial;
      border-left-color: initial;
      border-image-source: initial;
      border-image-slice: initial;
      border-image-width: initial;
      border-image-outset: initial;
      border-image-repeat: initial;
      padding-top: 4px;
      padding-right: 8px;
      padding-bottom: 4px;
      padding-left: 8px;
      width: calc(100% - 100px);
    }
    
    #footer .footer-newsletter form input[type="submit"] {
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      border-top-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 0px;
      border-left-width: 0px;
      border-top-style: initial;
      border-right-style: initial;
      border-bottom-style: initial;
      border-left-style: initial;
      border-top-color: initial;
      border-right-color: initial;
      border-bottom-color: initial;
      border-left-color: initial;
      border-image-source: initial;
      border-image-slice: initial;
      border-image-width: initial;
      border-image-outset: initial;
      border-image-repeat: initial;
      font-size: 16px;
      padding-top: 0px;
      padding-right: 20px;
      padding-bottom: 0px;
      padding-left: 20px;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(71, 178, 228);
      color: rgb(255, 255, 255);
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
      border-bottom-left-radius: 50px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 15px;
    }
    
    #footer .footer-newsletter form input[type="submit"]:hover {
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(32, 157, 216);
    }
    
    #footer .footer-top {
      padding-top: 60px;
      padding-right: 0px;
      padding-bottom: 30px;
      padding-left: 0px;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(90, 90, 90);
    }
    
    #footer .footer-top .footer-contact {
      margin-bottom: 30px;
    }
    
    #footer .footer-top .footer-contact h3 {
      font-size: 28px;
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 10px;
      margin-left: 0px;
      padding-top: 2px;
      padding-right: 0px;
      padding-bottom: 2px;
      padding-left: 0px;
      line-height: 1;
      text-transform: uppercase;
      font-weight: 600;
      color: rgb(255, 255, 255);
    }
    
    #footer .footer-top .footer-contact p {
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 0px;
      font-family: Roboto, sans-serif;
      color: rgb(255, 255, 255);
    }
    
    #footer .footer-top h4 {
      font-size: 16px;
      font-weight: bold;
      color: rgb(255, 255, 255);
      position: relative;
      padding-bottom: 12px;
    }
    
    #footer .footer-top .footer-links {
      margin-bottom: 30px;
    }
    
    #footer .footer-top .footer-links ul {
      list-style-position: initial;
      list-style-image: initial;
      list-style-type: none;
      padding-top: 0px;
      padding-right: 0px;
      padding-bottom: 0px;
      padding-left: 0px;
      margin-top: 0px;
      margin-right: 0px;
      margin-bottom: 0px;
      margin-left: 0px;
    }
    
    #footer .footer-top .footer-links ul i {
      padding-right: 2px;
      color: rgb(71, 178, 228);
      font-size: 18px;
      line-height: 1;
    }
    
    #footer .footer-top .footer-links ul li {
      padding-top: 10px;
      padding-right: 0px;
      padding-bottom: 10px;
      padding-left: 0px;
      display: flex;
      align-items: center;
    }
    
    #footer .footer-top .footer-links ul li:first-child {
      padding-top: 0px;
    }
    
    #footer .footer-top .footer-links ul a {
      color: rgb(255, 255, 255);
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
      display: inline-block;
      line-height: 1;
    }
    
    #footer .footer-top .footer-links ul a:hover {
      text-decoration-line: none;
      text-decoration-style: initial;
      text-decoration-color: initial;
      color: rgb(71, 178, 228);
    }
    
    #footer .footer-top .footer-links p {
      color: rgb(255, 255, 255);
    }
    
    #footer .footer-top .social-links a {
      font-size: 18px;
      display: inline-block;
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(71, 178, 228);
      color: rgb(255, 255, 255);
      line-height: 1;
      padding-top: 8px;
      padding-right: 0px;
      padding-bottom: 8px;
      padding-left: 0px;
      margin-right: 4px;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      border-bottom-left-radius: 50%;
      text-align: center;
      width: 36px;
      height: 36px;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
    }
    
    #footer .footer-top .social-links a:hover {
      background-image: initial;
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: rgb(32, 157, 216);
      color: rgb(255, 255, 255);
      text-decoration-line: none;
      text-decoration-style: initial;
      text-decoration-color: initial;
    }
    
    #footer .footer-bottom {
      padding-top: 30px;
      padding-bottom: 30px;
      color: rgb(255, 255, 255);
    }
    
    #footer .copyright {
      float: left;
    }
    
    #footer .credits {
      float: right;
      font-size: 13px;
    }
    
    #footer .credits a {
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
      transition-property: all;
    }
    
    @keyframes up-down {
      0% {
        transform: translateY(10px);
      }
    
      100% {
        transform: translateY(-10px);
      }
    }
    
    @media (max-width: 1366px) {
      .nav-menu .drop-down .drop-down ul {
        left: -90%;
      }
    
      .nav-menu .drop-down .drop-down:hover>ul {
        left: -100%;
      }
    
      .nav-menu .drop-down .drop-down>a::after {
        content: "";
      }
    }
    
    @media (max-width: 991px) {
      #hero {
        height: 140vh;
        text-align: center;
      }
    
      #hero .animated {
        animation-duration: 0s;
        animation-timing-function: ease;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: none;
        animation-play-state: running;
        animation-name: none;
      }
    
      #hero .hero-img {
        text-align: center;
      }
    
      #hero .hero-img img {
        width: 50%;
      }
    }
    
    @media (max-width: 768px) {
      #hero h1 {
        font-size: 28px;
        line-height: 36px;
      }
    
      #hero h2 {
        font-size: 18px;
        line-height: 24px;
        margin-bottom: 30px;
      }
    
      #hero .hero-img img {
        width: 70%;
      }
    
      .bannermar {
        margin-bottom: 10%;
        margin-top: 10%;
      }
    
      .img-fluid {
        max-width: 83%;
        height: auto;
      }
    
      .img-box img {
        margin-top: 11%;
        margin-left: -5%;
      }
    
      .about-secbox {
        margin-left: 8%;
      }
    
      #footer .footer-bottom {
        padding-top: 20px;
        padding-bottom: 20px;
      }
    
      #footer .copyright,
      #footer .credits {
        text-align: center;
        float: none;
      }
    
      #footer .credits {
        padding-top: 4px;
      }
    }
    
    @media only screen and (max-width: 768px) {
      #hero {
        margin-top: 10%;
      }
    }
    
    @media (max-width: 575px) {
      #hero .hero-img img {
        width: 80%;
      }
    
      #hero .btn-get-started {
        font-size: 16px;
        padding-top: 10px;
        padding-right: 24px;
        padding-bottom: 11px;
        padding-left: 24px;
      }
    
      #hero .btn-watch-video {
        font-size: 16px;
        padding-top: 10px;
        padding-right: 0px;
        padding-bottom: 8px;
        padding-left: 40px;
        margin-left: 20px;
      }
    
      #hero .btn-watch-video i {
        font-size: 32px;
        top: 7px;
      }
    }
    
    @media (max-width: 425px) {
      .hideabout {
        display: none !important;
      }
    
      .about-secbox {
        height: 35%;
      }
    }
    
    .sign-up-css {
      margin-left: -9px;
    }
    
    .group-img {
      height: 100vh;
      width: 57vw;
    }
    `;

}