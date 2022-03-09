import { Component, OnInit } from '@angular/core';
//@ts-ignore
import about from './about.json';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  title = 'json-file-read-angluar';
  public aboutList: { name: string, code: string, value: number | string, link: string }[] = about;
  constructor(public dialogRef: MatDialogRef<AboutComponent>) { }

  ngOnInit(): void {
  }
  closeFunction(): void 
  {
    this.dialogRef.close();
  }

}
