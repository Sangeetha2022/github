import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/shared/shared.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit ,OnChanges{
  BrowserLang:any;
  message:any='';
  @Input() lang:any;
  constructor(public translate:TranslateService,public shared:SharedService){
   
  //   this.BrowserLang=translate.getBrowserLang(); 
   
    
  //   if(this.BrowserLang=='en'){
  //     alert()
  //     translate.use('en');
  //   }
  //  else if(this.BrowserLang=='ta'){
  //     translate.use('ta');
  //   }
  //  else if(this.BrowserLang=='es'){
  //     translate.use('es');
  //   }
  //   else{
  //       translate.use('en');
  //   }
  }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.lang);
  }
}
