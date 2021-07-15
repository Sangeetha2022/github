import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public usrlang=navigator.languages;
  
  tt:any[]=[];
  constructor(public translate:TranslateService) { 
    // translate.addLangs(['English','Tamil','Spanish']);
    // translate.setDefaultLang('English');
    // const BrowserLang=translate.getBrowserLang();
    // console.log("BrowserLang ---- ",BrowserLang);
    // translate.use(BrowserLang.match(/en|ta/) ? BrowserLang:'English');

    //translate.addLangs(['en','ta']);

    console.log(this.usrlang);
    
    translate.setDefaultLang('English');
    const BrowserLang=translate.getBrowserLang();
    console.log("Using i18n Translate service api BrowserLanguage ---- ",BrowserLang);
    console.log("Using Navigator location service get all choosen BrowserLanguage---- ",this.usrlang);
    
    if(BrowserLang=='en'){
      translate.use('en');
    }

  }

  ngOnInit(){
   
  }
  openNav() {

   document.getElementById('myNav')!.style.height = '50%';
  }
  closeNav() {
    document.getElementById('myNav')!.style.height = '0%';
  }

}
