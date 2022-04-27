import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component
({
  selector: 'app-editposition',
  templateUrl: './editposition.component.html',
  styleUrls: ['./editposition.component.scss']
})

export class EditpositionComponent implements OnInit 
{
  screenName:any;
  index:any;
  toIndex:any;

  constructor(public dialogRef: MatDialogRef<EditpositionComponent>,@Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void 
  {
    this.screenName=this.dialogData.screenName;
    console.log("ScreenName:",this.screenName);
    this.index=this.dialogData.fromIndex;
  }

  onNoClick()
  {
    this.dialogRef.close();
  }
}
