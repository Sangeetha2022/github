import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import  *  as  global_lang_json  from  'src/assets/i18n/languages.json';
import { LoginService } from '../login/login.service';
import { LoggingService } from '../config/logging.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public usrlang=navigator.languages;
  public BrowserLang:any;
  public Global_Languages:any;
  hideElement:boolean=false;
  backButtonElement:boolean=false;
  permission: boolean=false;
  
  display_langs:any=[];
  public user: any = {
    id: ''
  };
 
  constructor(public translate:TranslateService,public router:Router, private logoutservice: LoginService,private location: Location,private logger:LoggingService) { 
    this.Global_Languages=global_lang_json;
    var arr = [];
    for (var j in this.Global_Languages['default']) {
        arr.push([j, this.Global_Languages['default'][j]]);
    }
    var langs=navigator.languages;
    for(var i=0;i<langs.length;i++){
      arr.forEach(element => {
        if(langs[i]==element[0]){
          this.display_langs.push(element[1]['nativeName']);
        }
      });
    }
    translate.setDefaultLang('en');
     this.BrowserLang=translate.getBrowserLang(); 
    console.log(this.BrowserLang);
    
    if(this.BrowserLang=='en'){
      translate.use('en');
    }
   else if(this.BrowserLang=='ta'){
      translate.use('ta');
    }
   else if(this.BrowserLang=='es'){
      translate.use('es');
    }
    else{
        translate.use('en');
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/consent' || event.url === '/') {
          this.hideElement = true;
        } else {
          this.hideElement = false;
        }
        if(event.url === '/project') {
          this.backButtonElement = true;
        }
        else {
          this.backButtonElement = false;
        }
      }
    });
  }
  ngOnInit(){
  }
  openNav() {
   document.getElementById('myNav')!.style.height = '50%';
  }
  closeNav() {
    document.getElementById('myNav')!.style.height = '0%';
  }
  onChange(val:any) {

    if(val=='English'){
      this.translate.use('en');
      return true;
    }
    if(val=='தமிழ்'){
      this.translate.use('ta');
      return true;
    }
    if(val=='español'){
      this.translate.use('es');
      return true;
    }
    else{ 
      this.translate.use('en');
      return false;
    }
}
showAbout() {
 document.getElementById('model1')!.style.display = 'block';
}
hideAbout() {
  document.getElementById('model1')!.style.display = 'none';
}
goBack(){
  this.location.back();
}
Logout(){
  this.user.id = sessionStorage.getItem('Id');
  this.logoutservice.Logout(this.user).subscribe(data => {
    sessionStorage.clear();
    localStorage.clear();
    this.permission = false;
    this.router.navigate(['']);
  }, error => {
    this.logger.log('error',error);
  });
  this.closeNav();
}
}
