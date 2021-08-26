 
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import  *  as  global_lang_json  from  'src/assets/i18n/languages.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public usrlang=navigator.languages;
  public BrowserLang:any;
  public Global_Languages:any;
  display_langs:any=[];
 
  constructor(public translate:TranslateService) { 
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
}
