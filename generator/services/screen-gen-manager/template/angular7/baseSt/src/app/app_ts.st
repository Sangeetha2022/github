app_ts(className,folderName) ::= <<
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './$folderName$.component.html',
  styleUrls: ['./$folderName$.component.scss']
})
export class $className$Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

>>