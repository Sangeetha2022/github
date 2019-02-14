import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
    selector: 'app-popup-model',
    templateUrl: 'popup-model.component.html',
})
export class PopupModelComponent {

    constructor(
        public dialogRef: MatDialogRef<PopupModelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
