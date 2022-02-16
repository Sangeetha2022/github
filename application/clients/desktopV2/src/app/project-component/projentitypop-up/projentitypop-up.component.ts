import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component
({
  selector: 'app-projentitypop-up',
  templateUrl: './projentitypop-up.component.html',
  styleUrls: ['./projentitypop-up.component.scss']
})

export class ProjentitypopUpComponent implements OnInit 
{

  public modelObject: any = 
  {
    name: '',
    description: '',
    entity_id: ''
  };

  constructor(public dialogRef: MatDialogRef<ProjentitypopUpComponent>) { }

  ngOnInit(): void { }

  onNoClick(): void 
  {
        this.dialogRef.close();
  }

}
