import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletefeatpopup',
  templateUrl: './deletefeatpopup.component.html',
  styleUrls: ['./deletefeatpopup.component.scss']
})
export class DeletefeatpopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletefeatpopupComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void 
  {
        this.dialogRef.close();
  }
}
