import { Component, OnInit } from '@angular/core';
//@ts-ignore
import opensource from './opensource.json';

@Component({
  selector: 'app-opensource',
  templateUrl: './opensource.component.html',
  styleUrls: ['./opensource.component.scss']
})
export class OpensourceComponent implements OnInit {

  public openSourceList:{imageLocation:string, name:string, link: string}[] = opensource;
  constructor() { }

  ngOnInit(): void {
  }

}
