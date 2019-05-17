import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
    selector: 'app-popup-model',
    templateUrl: 'popup-model.component.html'
})
export class PopupModelComponent {
    public modelObject: any = {
        name: '',
        description: '',
        entityType: ''
    };
    public isPrimaryEntityPresent: boolean;
    constructor(
        public dialogRef: MatDialogRef<PopupModelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log('popup --- ', data);
        if (data.savedEntity !== undefined && Object.keys(data.savedEntity).length > 0) {
            alert('entered ');
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
            }
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
