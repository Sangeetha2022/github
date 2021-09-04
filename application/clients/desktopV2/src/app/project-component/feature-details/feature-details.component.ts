import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Brodcastservice } from 'src/app/broadcast.service';
import { LoggingService } from 'src/app/config/logging.service';
import { EntitypopUpComponent } from '../entitypop-up/entitypop-up.component';
import { IEntity } from '../interface/Entity';
import { ProjectComponentService } from '../project-component.service';
import { ScreenPopupComponent } from '../screen-popup/screen-popup.component';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.scss']
})
export class FeatureDetailsComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService,
    private projectComponentService:ProjectComponentService,
    private broadcastservice:Brodcastservice,
    private route:ActivatedRoute,
    private dialog: MatDialog,
    private router:Router,
    private logger:LoggingService) { }

  featureEntityDetails: any[] = [];
  entitydetails: any[] = [];
  feature_id: any;
  project_id:any;
  entityid: any;
  updateEntityId: any;
  public logId = sessionStorage.getItem('LogId');
  isPrimaryEntityPresent!: Boolean;
  featureInfo: any;
  selectedFeatureName: String='';
  flowInFeatureRowData: any[] = [];
  rowData: any = [];
  selectEntity:any;
  selectedEntityId:any;
  deletePopup :string= '';
  public entity: IEntity = {
    name: '',
    description: '',
    entity_type: '',
    project_id: '',
    feature_id: '',
    created_by: '',
    last_modified_by: '',
    updated_at: new Date(),
    field: []
};
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        if (params.featureId !== undefined && params.featureId !== null) {
            this.feature_id = params.featureId;
        }
        if (params.projectId !== undefined && params.projectId !== null) {
            this.project_id = params.projectId;
        }

    });
    this.getFeatureById();
    this.getEntityByFeatureId();
  }

  //To get the  feature by id
  getFeatureById() {
    this.spinner.show();
    this.projectComponentService.getFeatureById(this.feature_id, this.logId).subscribe(
        response => {
            this.spinner.hide();
            this.featureInfo = response.body;
            this.selectedFeatureName = response.body.name;
            this.getProjectFeatureFlows();
            this.getAllFlows();
        },
        error => {
            this.logger.log('error',error);
        }
    );
}

  //To get the Entity feature by id
  getEntityByFeatureId() {
    this.spinner.show();
    //Added secondray entity in feature
    this.projectComponentService.getAllEntityByFeatureId(this.feature_id, this.logId).subscribe(
        (entityData) => {
            this.spinner.hide();
            this.featureEntityDetails = entityData.body.body;
            console.log("featureEntityDetails is",this.featureEntityDetails);
            this.isPrimaryEntityPresent = this.featureEntityDetails.some(x => x.entity_type === 'primary');
        },
        (error) => {
            this.logger.log('error',error);
        }
    );
}
    //To get the all Project feature flows
    getProjectFeatureFlows() {
    this.spinner.show();
    this.projectComponentService.getProjectFeatureFlows(this.featureInfo.flows, this.logId).subscribe(response => {
        const temp = [];
        if (response.body) {
            this.spinner.hide();
            this.flowInFeatureRowData = response.body;
        }
    }, error => {
        this.logger.log('error',error);
    });
    }

    //To get the all flow data
    getAllFlows() {
    this.spinner.show();
    this.projectComponentService.getAllFlows(this.logId).subscribe(
        response => {
            const flows = response.body;
            if (flows) {
                this.spinner.hide();
                if (this.flowInFeatureRowData.length === 0) {
                    this.rowData = flows;
                } else {
                    this.flowInFeatureRowData.forEach(flowElement => {
                        const index = flows.findIndex((x: { name: any; }) => x.name === flowElement.name);
                        if (index > -1) {
                            flows.splice(index, 1);
                        }
                    });
                    this.rowData = flows;
                }
            }
        },
        error => {
            this.logger.log('error',error);
        }
    );
    }

    //This function called in button click event in add screen
    GoToDesigner() {
        this.openScreenDialog();
    }

    //To open screen popup Component and get the screen and get the screen types values
    openScreenDialog(){
        const dialogRef = this.dialog.open(ScreenPopupComponent, {
            width: '550px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(screenData => {
            console.log('screen data ar e---------------- ', screenData);
            if (screenData) {
                this.router.navigate(['/desktopscreen'], {
                    queryParams: {
                        projectId: this.project_id,
                        featureId: this.feature_id,
                        screenType: screenData.name,
                        screenOption: screenData.type
                    }
                });
            }
        });
    }

    //Function is used to save the entity values if exisisting entity present
    AddEntity(entityData:any) {
        entityData._id = this.entityid;
        this.entitydetails = [
            {
                'entities':
                {
                    'entityType': entityData.entity_type,
                    'entityId': this.entityid
                },
                'name': entityData.name,
                'description': entityData.description,
                'updated_date': Date.now()
            }
        ];
        this.projectComponentService.Updatefeaturedetailsentity(this.feature_id, this.entitydetails, this.logId)
            .subscribe(featuredetails => {
            });
        this.getFeatureById();
        this.getEntityByFeatureId();
    }

    //Function is used to save the entity values
    saveEntity(entityData:any) {
        delete entityData._id;
        entityData.project_id = this.project_id;
        this.projectComponentService.createEntity(entityData, this.logId).subscribe(
            (response) => {
                this.updateEntityId = response.body._id;
                this.entitydetails = [];
                this.entitydetails = [
                    {
                        'entities':
                        {
                            'entityType': entityData.entity_type,
                            'entityId': response.body._id
                        },
                        'name': entityData.name,
                        'description': entityData.description,
                        'updated_date': Date.now()
                    }
                ];
                // tslint:disable-next-line:max-line-length
                this.projectComponentService.Updatefeaturedetailsentity(this.feature_id, this.entitydetails, this.logId).subscribe(featuredetails => {
                    if (featuredetails.body) {
                        this.getEntityByFeatureId();
                    }
                });
            },
            (error) => {
                console.log('error cannot able to save the entities ', error);
            }
        );
    }
     //Function is update the entity values
    updateEntity(entityData:any) {
        entityData.updated_at = new Date();
        entityData._id = this.updateEntityId;
        this.projectComponentService.updateEntity(entityData, this.logId).subscribe(
            (data) => {
                this.entitydetails = [];
                this.entitydetails = [
                    {
                        'entities':
                        {
                            'entityType': entityData.entity_type,
                            'entityId': this.updateEntityId
                        },
                        'name': entityData.name,
                        'description': entityData.description,
                        'updated_date': Date.now()
                    }
                ];

                this.projectComponentService.Updatefeaturedetailsentity(this.feature_id, this.entitydetails, this.logId)
                    .subscribe(featuredetails => {
                        if (featuredetails) {
                            this.getEntityByFeatureId();
                        }
                    });
            },
            (error) => {
                this.logger.log('error',error);
            }
        );
    }

    //To delete the entity by their id value
    deleteEntityById() {
        this.deletePopup = 'none';
        if (this.selectEntity.feature_id === this.feature_id) {
            this.projectComponentService.deleteEntityById(this.selectedEntityId, this.logId).subscribe(
                (data) => {
                    this.getEntityByFeatureId();
                },
                (error) => {
                });
        } else {
            this.projectComponentService.Deletefeaturedetailsentity(this.feature_id , this.selectedEntityId).subscribe(data => {
                this.getEntityByFeatureId();
            });
        }
    }

    //To open the entity model dialog box
    saveEntityModel() {
        this.openDialog(true, null);
    }

    //To open the Confirm delete Popup model
    openDeleteModel(entity:any) {
        this.selectEntity = entity;
        this.selectedEntityId = entity._id;
        this.deletePopup = 'block';
    }

    //To Close the Confirm delete Popup model
    closeDeleteModel() {
        this.deletePopup = 'none';
    }

    //Function used to open Entity popup component and save the value
    openDialog(isSaveOption:any, objectValue:any): void {
        const dialogDataValue = {
            savedEntity: {},
            projectId: this.project_id,
            isPrimaryEntityPresent: this.isPrimaryEntityPresent,
        };
        console.log("dialogDataValue",dialogDataValue);
        
        if (isSaveOption) {
            dialogDataValue.savedEntity = {};
        } else {
            dialogDataValue.savedEntity = objectValue;
        }
        this.broadcastservice.changeFeatureId(this.feature_id);
        const dialogRef = this.dialog.open(EntitypopUpComponent, {
            width: '350px',
            data: dialogDataValue
        });
        console.log("dialogDataValue 1",dialogDataValue);
        dialogRef.afterClosed().subscribe(entityData => {
            if (entityData) {
                this.entityid = entityData.entity_id;
                this.entity.project_id = this.project_id;
                this.entity.feature_id = this.feature_id;
                this.entity.name = entityData.name;
                this.entity.description = entityData.description;
                this.entity.entity_type = entityData.entityType;
                this.entity.field = entityData.field;
                if (entityData !== undefined) {
                    if (objectValue === null) {
                        if (entityData.selectentity === 'Existing') {
                            this.AddEntity(this.entity);
                        } else {
                            this.saveEntity(this.entity);
                        }
                    } else {
                        const tempObj = {
                            id: '',
                            name: '',
                            description: '',
                            entity_type: ''
                        };
                        tempObj.id = this.updateEntityId;
                        tempObj.name = entityData.name;
                        tempObj.description = entityData.description;
                        tempObj.entity_type = entityData.entityType;
                        this.updateEntity(tempObj);
                    }
                }
            }
        });
    }

}
