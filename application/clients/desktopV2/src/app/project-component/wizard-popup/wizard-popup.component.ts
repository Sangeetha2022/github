import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component
({
  selector: 'app-wizard-popup',
  templateUrl: './wizard-popup.component.html',
  styleUrls: ['./wizard-popup.component.scss']
})
export class WizardPopupComponent implements OnInit 
{

  public modelObject: any = 
  {
    wizardName: '',
    wizardDescription: ''
  };
  
  constructor(public dialogRef: MatDialogRef<WizardPopupComponent>) { }

  ngOnInit(): void {  }

  onNoClick(): void 
  {
      this.dialogRef.close();
  }
}
