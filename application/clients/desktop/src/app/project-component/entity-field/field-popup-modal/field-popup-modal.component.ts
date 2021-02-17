import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import {ProjectComponentService} from '../../project-component.service'

@Component({
  selector: 'app-field-popup-modal',
  templateUrl: './field-popup-modal.component.html',
  styleUrls: ['./field-popup-modal.component.scss']
})
export class FieldPopupModalComponent implements OnInit {
  public popupData: any = {
    entity: undefined,
    standard: undefined,
    field: undefined
  };
  public passedValue: any;
  public fieldsValue: any;
  public selectFieldModal: Boolean;
  public logId = sessionStorage.getItem('LogId');
  options: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FieldPopupModalComponent>,
    public projectComponentService: ProjectComponentService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.passedValue = data;
    this.selectFieldModal = false;
  }

  onSelectionChanged() {
    let entityId = this.popupData.entity;
    this.projectComponentService.getByIdEntity(entityId, this.logId).subscribe((data) => {
      console.log('entity details for mapping =============>>>', data.body.field);
      this.fieldsValue = data.body.field;
      this.selectFieldModal = true;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
