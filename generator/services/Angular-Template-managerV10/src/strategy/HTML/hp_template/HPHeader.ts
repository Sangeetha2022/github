export class HPHeader {

  public static HTML_TAG = `<header class="" id='header'>
  <div class="row">
    <div class="col-sm-2">
      <a class='logo' href='index.html' id='template-im3f'>
        <img class='img-fluid' src='assets/img/logo.png' alt='' id='template-i810i'>
      </a>
    </div>
    <div class="navbar mainmenu col-sm-9 flex">
      <nav class="mainmenu-menu nav-menu d-none d-lg-block">
      </nav>
      <div class="dropdown">
        <img class="cursor-pointer" src="../../assets/img/hp-user.png" width="40" />
        <div class="dropdown-content">
          <a class="nav-link" *ngIf='userId==null' [routerLink]="['/login']">{{'source.login' | i18next}}</a>
          <a class="nav-link" *ngIf='userId!=null' (click)="logout()">{{'source.logout' | i18next}}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="navbar">
    <nav class="nav-menu1 d-none d-lg-block">
      <ul>
        <li><a href="">24/7 VIRTUAL SUPPORT ></a></li>
        <li><a href="">COVID-19: HELPING YOU ADAPT ></a></li>
      </ul>
    </nav>
  </div>
</header>
<div class="modal" tabindex="-1" role="dialog" [ngStyle]="{'top': '100px','display': confirmLangChangeModal}">
  <div class="modal-dialog modal-sm" role="dialog">
    <div class="modal-content">
      <div class="modal-body">
        <p>language change cause you to re-login</p>
      </div>
      <div class="modal-footer" style="padding: 5px">
        <button type="button" (click)="confirmLangChange()" class="btn btn-default">Confirm</button>
        <button type="button" (click)="onCloseHandled()" class="btn btn-default">Cancel</button>
      </div>
    </div>
  </div>
</div>
  `;
    public static CSS_DATA = `#header .mainmenu {
      background-color: #fff;
      float: right;
      margin-right: 20px;
    }
    .row {
      margin-right: 0px;
    }
    li.imgtag {
      padding-top: 0px !important;
    }
    
    #header .mainmenu ul li a {
      color: black;
    }
    
    .mainmenu-menu a:hover,
    .mainmenu-menu .active > a,
    .mainmenu-menu li:hover > a {
      color: #47b2e4 !important;
    }
    
    .nav-menu1 {
      margin: auto;
    }
    
    .nav-menu1 ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    
    .nav-menu1 > ul {
      display: flex;
    }
    
    .nav-menu1 > ul > li {
      position: relative;
      white-space: nowrap;
      padding: 10px 0 10px 60px;
    }
    
    .nav-menu1 a {
      display: block;
      position: relative;
      color: #fff;
      transition: 0.3s;
      font-size: 15px;
      letter-spacing: 0.5px;
      font-weight: 500;
      font-family: "Roboto", sans-serif;
    }
    
    .nav-menu1 a:hover,
    .nav-menu1 .active > a,
    .nav-menu1 li:hover > a {
      color: #47b2e4;
    }
    
    .nav-menu1 .drop-down ul {
      border-radius: 8px;
      display: block;
      position: absolute;
      left: 14px;
      top: calc(100% + 30px);
      z-index: 99;
      opacity: 0;
      visibility: hidden;
      padding: 10px 0;
      background: #fff;
      box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
      transition: 0.3s;
    }
    
    @media only screen and (max-width: 1282px) {
      .nav-menu1 > ul > li {
        padding: 10px 0 10px 28px;
      }
    }
    
    .flex {
      flex: 0 0 81%;
      max-width: 81%;
    }
    
    .dropbtn {
      background-color: #4caf50;
      color: white;
      padding: 16px;
      font-size: 16px;
      border: none;
    }
    
    .dropdown {
      position: relative;
      display: inline-block;
    }
    
    .dropdown-content {
      display: none;
      position: fixed;
      background-color: #fff;
      min-width: 100px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
      right: 4px;
      text-align: center
    }
    
    .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
    
    .dropdown-content a:hover {
      background-color: #ddd;
    }
    
    .dropdown:hover .dropdown-content {
      display: block;
    }

    .cursor-pointer {
      cursor: pointer;
    }
    `;
}