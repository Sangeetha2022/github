import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/shared/shared.service';
import { LoggingService } from '../config/logging.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  BrowserLang:any;
  message:any='nknkkn';
  @Input() lang:any;
  constructor(public translate:TranslateService,public shared:SharedService,private logger:LoggingService){
  }
  ngOnInit() {
  }
}
