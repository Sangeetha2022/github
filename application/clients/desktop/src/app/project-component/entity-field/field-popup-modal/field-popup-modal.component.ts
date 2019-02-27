import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-field-popup-modal',
  templateUrl: './field-popup-modal.component.html',
  styleUrls: ['./field-popup-modal.component.scss']
})
export class FieldPopupModalComponent implements OnInit {
  public popupData: any = {
    entity: undefined,
    standard: undefined
  };
  public passedValue: any;
  options: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FieldPopupModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.passedValue = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // get() {
  //   console.log('field get values are ---- ', this.popupData);
  // }
  ngOnInit() {
  }

}
