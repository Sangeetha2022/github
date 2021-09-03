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
  constructor() { 
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

}
