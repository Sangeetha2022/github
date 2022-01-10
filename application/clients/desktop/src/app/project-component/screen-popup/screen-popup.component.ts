import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-screen-popup',
    templateUrl: './screen-popup.component.html',
    styleUrls: ['./screen-popup.component.scss']
})
export class ScreenPopupComponent {
    public screen: any = {
        name: ''
    };
    public image1: Boolean;
    public image2: Boolean;
    constructor(
        public dialogRef: MatDialogRef<ScreenPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.image1 = true;
        this.image2 = false;
        this.screen.name = 'web';
    }

    type(name) {
        this.screen.name = name;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
