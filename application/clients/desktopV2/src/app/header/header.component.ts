import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import  *  as  global_lang_json  from  'src/assets/i18n/languages.json';
import { LoginService } from '../login/login.service';
import { LoggingService } from '../config/logging.service';
import { ConfigManagerService } from '../config-manager/config-manager.service';
import { SharedService } from 'src/shared/shared.service';
import { AboutComponent } from '../about/about.component';
import { MatDialog } from '@angular/material/dialog';

@Component
({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit 
{
  public usrlang=navigator.languages;
  public BrowserLang:any;
  public Global_Languages:any;
  project_id:string='';
  hideElement:boolean=false;
  backButtonElement:boolean=false;
  permission: boolean=false;
  versionData: any = {};
  buildVersionData: any = {};
  buildVersionDate: any = {};
  logId:any = sessionStorage.getItem('LogId');
  display_langs:any=[];
  public user: any = 
  {
    id: ''
  };
   
  constructor(public translate:TranslateService,
    public router:Router,
    private configurationService: ConfigManagerService,
    private logoutservice: LoginService,
    private location: Location,
    public shared:SharedService,
    private logger:LoggingService,
    private dialog: MatDialog,
    private _location: Location) 
    { 
    
      this.Global_Languages=global_lang_json;
    var arr = [];
    for (var j in this.Global_Languages['default']) 
    {
        arr.push([j, this.Global_Languages['default'][j]]);
    }
    var langs=navigator.languages;
    console.log("langs",langs);    
    for(var i=0;i<langs.length;i++)
    {
      arr.forEach(element => 
      {
        if(langs[i]==element[0])
        {
          this.display_langs.push(element[1]['nativeName']);
        }
      });
    }
    translate.setDefaultLang('en');
    this.BrowserLang=translate.getBrowserLang(); 
    console.log(this.BrowserLang);    
    if(this.BrowserLang=='en')
    {
      translate.use('en');
    }
    else if(this.BrowserLang=='ta')
    {
      translate.use('ta');
    }
    else if(this.BrowserLang=='es')
    {
      translate.use('es');
    }
    else
    {
        translate.use('en');
    }
    this.router.events.subscribe((event) => 
    {
      if (event instanceof NavigationEnd) 
      {
        if (event.url === '/login' || event.url === '/consent' || event.url === '/signup' || event.url === '/') 
        {
          this.hideElement = true;
        } 
        else 
        {
          this.hideElement = false;
        }
        if(event.url === '/project' || event.url === '/' || event.url === '/login' || event.url === '/consent' || event.url === '/signup') 
        {
          this.backButtonElement = true;
        }
        else 
        {
          this.backButtonElement = false;
        }
      }
    });
  }

  back()
  {
    this._location.back();
  }
  ngOnInit() {  }

  //To open the Navbar content in mobile view
  openNav() 
  {
     document.getElementById('myNav')!.style.height = '50%';
  }

  //To close the Navbar content in mobile view
  closeNav() 
  {
    document.getElementById('myNav')!.style.height = '0%';
  }
  
  //To change the browser language 
  onChange(val:any) 
  {
    if(val=='English')
    {
      this.translate.use('en');
      return true;
    }
    if(val=='???????????????')
    {
      this.translate.use('ta');
      return true;
    }
    if(val=='espa??ol')
    {
      this.translate.use('es');
      return true;
    }
    else
    { 
      this.translate.use('en');
      return false;
    }
}

//To open the About popup and get build and version details
showAbout() {
 this.openDialog();
}

openDialog()
{
  const dialogRef = this.dialog.open(AboutComponent,
    {
      height:'350px',
      width:'500px',
  });
    
}

  //To Hide the About popup
  hideAbout() 
  {
     document.getElementById('model1')!.style.display = 'none';
  }

  //To Logout from application
  Logout()
  {
      this.user.id = sessionStorage.getItem('Id');
      this.logoutservice.Logout(this.user).subscribe(data => 
      {
         sessionStorage.clear();
         localStorage.clear();
         this.permission = false;
         this.router.navigate(['']);
      }, 
      error => 
      {
         this.logger.log('error',error);
      });
      this.closeNav();
  }
}
