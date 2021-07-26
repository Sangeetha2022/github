import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public usrlang=navigator.languages;
  public languages=['English','Tamil','Spanish'];
  tt:any[]=[];
  constructor(public translate:TranslateService) { 
    translate.setDefaultLang('English');
    const BrowserLang=translate.getBrowserLang(); 
    if(BrowserLang=='en'){
      translate.use('en');
    }
    if(BrowserLang=='ta'){
      translate.use('ta');
    }
    if(BrowserLang=='es'){
      translate.use('es');
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
