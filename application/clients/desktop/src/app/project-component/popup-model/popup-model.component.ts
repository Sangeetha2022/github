import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectComponentService } from '../project-component.service';
import { ActivatedRoute } from '@angular/router';



@Component({
    selector: 'app-popup-model',
    templateUrl: 'popup-model.component.html'
})
export class PopupModelComponent implements OnInit {
    public modelObject: any = {
        name: '',
        description: '',
        entityType: ''
    };
    public project_id: String;
    public isPrimaryEntityPresent: boolean;
    public entityIsExist: Boolean = false;
    public projectEntityData: any;
    constructor(
        private projectComponentService: ProjectComponentService,
        private route: ActivatedRoute,
        public dialogRef: MatDialogRef<PopupModelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log('popup --- ', data);
        if (data.savedEntity !== undefined && Object.keys(data.savedEntity).length > 0) {
            // alert('entered ');
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

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.project_id = params.projectId;
        });
        this.getProjectEntity();
    }

    getProjectEntity() {
        this.projectComponentService.getEntityByProjectId(this.project_id).subscribe(projectEntity => {
            this.projectEntityData = projectEntity;
        });
    }

    isEntityExist() {
        const index = this.projectEntityData.findIndex(x =>
            x.name === this.modelObject.name);
        if (index > -1) {
            this.entityIsExist = true;
        } else {
            this.entityIsExist = false;
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
