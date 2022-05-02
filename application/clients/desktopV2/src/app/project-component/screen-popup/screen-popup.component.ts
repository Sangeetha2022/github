import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component
({
  selector: 'app-screen-popup',
  templateUrl: './screen-popup.component.html',
  styleUrls: ['./screen-popup.component.scss']
})

export class ScreenPopupComponent implements OnInit 
{
  public screen: any = 
  {
    name: ''
  };
  public image1: Boolean=false;
  public image2: Boolean=false;

  constructor(public dialogRef: MatDialogRef<ScreenPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) 
  {
      this.image1 = true;
      this.image2 = false;
      this.screen.name = 'web';
  }

  ngOnInit(): void {  }

  type(name:any) 
  {
    this.screen.name = name;
  }

  onNoClick(): void 
  {
    this.dialogRef.close();
  }
}
