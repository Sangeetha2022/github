import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-entitypop-up',
  templateUrl: './entitypop-up.component.html',
  styleUrls: ['./entitypop-up.component.scss']
})
export class EntitypopUpComponent implements OnInit {

  options: string[] = ['Create Entity', 'Select Existing Entity'];
  create:boolean=false;
  existing:boolean=false;
  hide:boolean=true;
  projectId:string='';
  isPrimaryEntityPresent: boolean=true;
  public modelObject: any = {
    name: '',
    description: '',
    entityType: '',
    selectentity: '',
    entity_id: '',
};
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EntitypopUpComponent>) { 
    this.projectId = data.projectId;
    //Storing the values of Entity component when user add new entity
    if (data.savedEntity !== undefined && Object.keys(data.savedEntity).length > 0) {
      this.modelObject.name = data.savedEntity.name;
      this.modelObject.description = data.savedEntity.description;
      this.modelObject.entityType = data.savedEntity.entity_type;
      if (this.modelObject.entityType === 'primary') {
          this.isPrimaryEntityPresent = false;
      } else {
          if (data.isPrimaryEntityPresent) {
              this.isPrimaryEntityPresent = true;
          } else {
              this.isPrimaryEntityPresent = false;
          }
      }
  } else {
      this.isPrimaryEntityPresent = data.isPrimaryEntityPresent;
      if (this.isPrimaryEntityPresent) {
          this.modelObject.entityType = 'secondary';
      } else {
          this.modelObject.entityType = 'primary';
      }
  }
  }

  ngOnInit(): void {
  }

  //Change event for th radio button for Create Entity or Select Existing Entity
  radioChange(event:any) {
    if (event.value === 'Create Entity') {
        this.create = true;
         this.hide = false;
    }
    if (event.value === 'Select Existing Entity') {
        this.existing = true;
         this.hide = false;
    }
}
    //Used in back button functionality
    showOptions() {
      this.hide = true;
      this.create = this.existing = false;
      this.dialogRef.updateSize('400px', '200px');
    }

}
