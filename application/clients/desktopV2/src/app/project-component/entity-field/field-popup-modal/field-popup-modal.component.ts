import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectComponentService } from '../../project-component.service';

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
  public selectFieldModal: Boolean=false;
  public logId = sessionStorage.getItem('LogId');
  options: FormGroup | undefined;
  constructor( public dialogRef: MatDialogRef<FieldPopupModalComponent>,
    public projectComponentService: ProjectComponentService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.passedValue = data;
      this.selectFieldModal = false;
     }
     //To detect the selection dropdown value
     onSelectionChanged() {
      let entityId = this.popupData.entity;
      this.projectComponentService.getByIdEntity(entityId, this.logId).subscribe((data) => {
        console.log('entity details for mapping =============>>>', data.body.field);
        this.fieldsValue = data.body.field;
        this.selectFieldModal = true;
      })
    }
    
    //To close the dialog box
    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit(): void {
  }

}
