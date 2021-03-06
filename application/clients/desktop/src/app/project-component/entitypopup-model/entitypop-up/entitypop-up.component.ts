import { Component, Inject, OnInit } from '@angular/core';
import { ButtonRendererComponent } from '../../entity-field/rendered/button-renderer/button-renderer.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectComponentService } from '../../project-component.service';
import { Brodcastservice } from '../../../broadcast.service';

@Component({
    selector: 'app-entitypop-up',
    templateUrl: './entitypop-up.component.html',
    styleUrls: ['./entitypop-up.component.scss']
})
export class EntityModelComponent implements OnInit {

    public create: boolean;
    public existing: boolean;
    public show: boolean;
    public hide: boolean;
    public modelObject: any = {
        name: '',
        description: '',
        entityType: '',
        selectentity: '',
        entity_id: '',
    };
    public projectId: any;
    public selectedentity: any = [];
    public entityselected: any;
    public isPrimaryEntityPresent: boolean;
    public rowData = [];
    public rowSelection;
    public columnDefs;
    public gridApi;
    public logId = sessionStorage.getItem('LogId');
    public gridColumnApi;
    public defaultColDef;
    public entitytype: any;
    public featureId: String;
    frameworkComponents: { buttonRenderer: any; };
    options: string[] = ['Create Entity', 'Select Existing Entity'];

    constructor(
        public dialogRef: MatDialogRef<EntityModelComponent>, private projectservice: ProjectComponentService,
        @Inject(MAT_DIALOG_DATA) public data: any, private brodcastservice: Brodcastservice) {
        this.projectId = data.projectId;
            console.log('-------------KISHAN--->>>', data.savedEntity);
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

        this.frameworkComponents = {
            buttonRenderer: ButtonRendererComponent,
        };
    }

    ngOnInit() {
        let featureEntityId: any = [];
        this.hide = true;
        this.brodcastservice.currentFeatureId.subscribe((featureId: String) => {
            this.featureId = featureId;
        });
        this.projectservice.getFeatureById(this.featureId, this.projectId).subscribe((fatureEntity) => {
            if (fatureEntity.body && fatureEntity.body.entities && fatureEntity.body.entities.length > 0) {
                featureEntityId = fatureEntity.body.entities.map(({ entityId }) => entityId);
            }
        });
        this.projectservice.getGlobalEntityByProjectId(this.projectId, this.logId).subscribe(data => {
            if (featureEntityId.length > 0 && data.body && data.body.length > 0) {
                const existingEntites = data.body.filter(x => x.is_default !== true && !featureEntityId.includes(x._id));
                this.rowData = existingEntites;
            } else if (data.body && data.body.length > 0) {
                const existEntities: any = data.body.filter(x => x.is_default !== true && x.feature_id !== this.featureId);
                this.rowData = existEntities;
            }
        }, error => {
            console.error('error:', error);
        });
        this.agGridInitialization();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
    onAdd(): void {
        this.dialogRef.close();
    }

    radioChange(event) {
        if (event.value === 'Create Entity') {
            this.create = true;
            this.hide = false;
            this.dialogRef.updateSize('400px', 'auto');
        }

        if (event.value === 'Select Existing Entity') {
            this.dialogRef.updateSize('550px', '320px');
            this.existing = true;
            this.hide = false;
        }
    }

    typechange(event) {
        if (event.value === 'primary') {
            this.entitytype = 'Primary';
        }
        if (event.value === 'secondary') {
            this.entitytype = 'Secondary';
        }
    }

    agGridInitialization() {

        this.columnDefs = [
            {
                width: 100,
                checkboxSelection: true,
            },
            {
                headerName: 'Name',
                field: 'name',
                width: 250,
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 250,
            }
        ];
        this.rowSelection = 'single';
        this.defaultColDef = {
            enableValue: true,
        };

    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridColumnApi = params.columnApi;
    }

    showOptions() {
        this.hide = true;
        this.create = this.existing = false;
        this.dialogRef.updateSize('400px', '200px');
    }

    onSelectionChanged() {
        this.selectedentity = this.gridApi.getSelectedRows();
        if (this.selectedentity.length > 0) {
            this.modelObject.name = this.selectedentity[0].name;
            this.modelObject.description = this.selectedentity[0].description;
            this.modelObject.selectentity = 'Existing';
            this.modelObject.entity_id = this.selectedentity[0]._id;
        }
    }
}
