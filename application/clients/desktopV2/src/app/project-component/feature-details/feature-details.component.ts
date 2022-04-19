import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Brodcastservice } from 'src/app/broadcast.service';
import { LoggingService } from 'src/app/config/logging.service';
import { ScreenDesignerService } from 'src/app/screen-designer/screen-designer.service';
import { ButtonRendererComponent } from '../entity-field/button-renderer/button-renderer.component';
import { EntitypopUpComponent } from '../entitypop-up/entitypop-up.component';
import { IEntity } from '../interface/Entity';
import { ProjectComponentService } from '../project-component.service';
import { ScreenPopupComponent } from '../screen-popup/screen-popup.component';
import { WizardPopupComponent } from '../wizard-popup/wizard-popup.component';
import { FeatureDetailsService } from './feature-details.service';
import { DeletefeatpopupComponent } from '../deletefeatpopup/deletefeatpopup.component';
import { ShowscreenPopupComponent } from '../showscreen-popup/showscreen-popup.component';


@Component
({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.scss']
})

export class FeatureDetailsComponent implements OnInit 
{
    flowInFeatureColumn:any[]=[];
    featureEntityDetails: any[] = [];
    entitydetails: any[] = [];
    feature_id: any;
    flowInFeatureColDef: any;
    project_id:any;
    entityid: any;
    updateEntityId: any;
    featureFlowGrid:any;
    rowSelectionFlow:string='';
    defaultColDef:any;
    public logId = sessionStorage.getItem('LogId');
    isPrimaryEntityPresent!: Boolean;
    featureInfo: any;
    selectedFeatureName: String='';
    flowInFeatureRowData: any[] = [];
    frameworkComponents: { buttonRenderer: any; };
    rowData: any = [];
    screenDetails:any[]=[];
    wizardDetails:any[]=[];
    selectEntity:any;
    selectedEntityId:any;
    selectedWizardId:any;
    modifyConnectorsId: any;
    columnFlow: any = [];
    displayFeatureFlowModal:string='none';
    deletescreenPopup: string='none';
    selectedScreenId:any;
    gridApi:any;
    gridColumnApi:any;
    deletePopup :string= '';
    public entity: IEntity = 
    {
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
    public modifyFlows: any = 
    {
      flowName: '',
      flowLable: '',
      flowDescription: '',
      flowAction: '',
      flowId: '',
    };
    public selectedFlowObj: any;
    public selectedFlow: any;
    public modifyComponents: any = [];
    quickConnectorName: string='';
    isClick:boolean=false;

    constructor(private spinner:NgxSpinnerService,private projectComponentService:ProjectComponentService,
                private broadcastservice:Brodcastservice,private route:ActivatedRoute,private dialog: MatDialog,
                private router:Router,private logger:LoggingService,private screenService: ScreenDesignerService,
                private featuredetailsservice:FeatureDetailsService) 
    {        
        this.frameworkComponents = 
        {
            buttonRenderer: ButtonRendererComponent,
        };
        this.columnFlow = 
        [
            {
                headerName: 'Name', field: 'name',
                filter: 'agTextColumnFilter',
                checkboxSelection: true
            },
            {
                headerName: 'Label', field: 'label',
                filter: 'agTextColumnFilter'
            },
            {
                headerName: 'Description', field: 'description',
                filter: 'agTextColumnFilter'
            },
            {
                headerName: 'Action', field: 'actionOnData',
                filter: 'agTextColumnFilter'
            },


        ];
        this.rowSelectionFlow = 'multiple';
        this.defaultColDef = 
        {
            enableValue: true,
        };
        this.flowInFeatureColumn = 
        [
            {
                headerName: 'Name', field: 'name',
                filter: 'agTextColumnFilter'
            },
            { headerName: 'Label', field: 'label', filter: 'agTextColumnFilter' },
            { headerName: 'Description', field: 'description', filter: 'agTextColumnFilter' },
            { headerName: 'Action', field: 'actionOnData', filter: 'agTextColumnFilter' },
            {
                headerName: 'Remove',
                width: 100,
                cellRenderer: 'buttonRenderer',
                editable: false,
                sortable: false,
                filter: false,
                cellRendererParams: 
                {
                    onClick: this.removeRow.bind(this),
                    label: 'Remove'
                }
            },
            {
                headerName: 'Modify',
                width: 100,
                cellRenderer: 'buttonRenderer',
                editable: false,
                sortable: false,
                filter: false,
                cellRendererParams: 
                {
                    onClick: this.modify.bind(this),
                    label: 'Modify'
                }
            },
        ];
        this.flowInFeatureColDef = 
        {
            enableValue: true,
            filter: true,
            sortable: true, 
        };
    }
  
    ngOnInit(): void 
    {
      this.route.queryParams.subscribe(params => 
      {
        if (params.featureId !== undefined && params.featureId !== null) 
        {
            this.feature_id = params.featureId;
        }
        if (params.projectId !== undefined && params.projectId !== null) 
        {
            this.project_id = params.projectId;
        }
      });
      this.getFeatureById();
      this.getEntityByFeatureId();
      this.getScreenByFeatureId();
      this.getAllWizard();
  }

  openWizardLibrary()
  {
    this.isClick=!this.isClick;
  }

  //To remove the particular feature flow
  removeRow(e:any) 
  {
        const index = this.featureInfo.flows.findIndex((x: any) => x === e.rowData._id);
        if (index > -1) 
        {
            this.featureInfo.flows.splice(index, 1);
            this.deleteFlowById(e.rowData._id);
            this.saveFlowsInFeature();
        }
  }
  onFeatureFlowGridReady(params:any) 
  {
        this.featureFlowGrid = params.api;
        this.featureFlowGrid.sizeColumnsToFit();
  }
  //To modify the flow and this function will call in modify action click
  modify(e: { rowData: { components: any[]; flowType: string; name: any; label: any; description: any; actionOnData: any; _id: any; }; }) 
  {
        e.rowData.components.map((data: { connector: any[]; }) => 
        {
            data.connector.map((connector: { isCustom: boolean; _id: any; }) => 
            {
                console.log('e---modify->>>', connector);
                if (connector.isCustom === true) 
                {
                    console.log('modify--connectors--', connector._id);
                    this.modifyConnectorsId = connector._id;
                }
            });
        });
        if (e.rowData.flowType === 'GeppettoFlow') 
        {
            this.modifyFlows.flowName = e.rowData.name;
            this.modifyFlows.flowLable = e.rowData.label;
            this.modifyFlows.flowDescription = e.rowData.description;
            this.modifyFlows.flowAction = e.rowData.actionOnData;
            this.modifyFlows.flowId = e.rowData._id;
            this.selectedFlowObj = e.rowData;
            this.modifyComponents = e.rowData.components;
            this.quickConnectorName = 'quickConnectors';        
        }
  }
  //to get the selected row values fron aggrid feature flow popup box
  onRowSelectionChanged(event:any) 
  {
        this.selectedFlow = this.gridApi.getSelectedRows();

  }
  onGridReady(params:any) 
  {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
  }
  //This function will called inside remove row to remove the flow by id
  deleteFlowById(flowId:any) 
  {
        this.spinner.show();
        this.projectComponentService.deleteFlowById(flowId, this.logId).subscribe(data => 
        {
                this.getProjectFeatureFlows();
                this.getAllFlows();
                this.getEntityByFeatureId();
                this.spinner.hide();
        },
        error => 
        {
                console.log('cannot able to delete the projectFlow ', error);
        });
  }
  //To close the featureflow model popup box
  closeFeatureFlowModal() 
  {
        this.displayFeatureFlowModal = 'none';
  }
  //To create the project flow and this function will called in save button in ag grid feature popup box
  createProjectFlow() 
  {
        if (this.selectedFlow.length > 0) 
        {
            // removing _id and store
            const projectFlowList = this.selectedFlow.map(({_id,_v,...rest}:any) => ({ ...rest }));
            console.log('save many project flows--->>', projectFlowList);
            this.saveManyProjectFlow(projectFlowList);
        }
  }
  //Saving multiple project flows and this function will be called in create project flow function
  saveManyProjectFlow(projectFlowList:any) 
  {
        this.spinner.show();
        this.projectComponentService.saveManyProjectFlow(projectFlowList, this.logId).subscribe(response => 
        {
                if (response.body) 
                {
                    this.spinner.hide();
                    const projectFlowsId = response.body.map(({_id}: any) => _id);
                    this.featureInfo.flows = this.featureInfo.flows.concat(projectFlowsId);
                    this.saveFlowsInFeature();
                }
        },
        error => 
        {
                console.log('cannot able to save the many projectFlows');
        });
  }
  //To save the flows
  saveFlowsInFeature() 
  {
        this.projectComponentService.updateFeature(this.featureInfo, this.logId).subscribe(response => 
        {
                console.log('save in flow --in feature -->>', response);
                this.featureInfo = response.body;
                this.displayFeatureFlowModal = 'none';
                this.flowInFeatureRowData = this.featureInfo.flows;
                this.getProjectFeatureFlows();
        },
        error => { });
  }

  //To get the  feature by id
  getFeatureById() 
  {
    this.spinner.show();
    this.projectComponentService.getFeatureById(this.feature_id, this.logId).subscribe(response => 
    {
            this.spinner.hide();
            this.featureInfo = response.body;
            this.selectedFeatureName = response.body.name;
            this.getProjectFeatureFlows();
            this.getAllFlows();
    },
    error => 
    {
            this.logger.log('error',error);
    });
  }

  //To get the Entity feature by id
  getEntityByFeatureId() 
  {
    this.spinner.show();
    //Added secondray entity in feature
    this.projectComponentService.getAllEntityByFeatureId(this.feature_id, this.logId).subscribe((entityData) => 
    {
            this.spinner.hide();
            this.featureEntityDetails = entityData.body.body;
            console.log("featureEntityDetails is",this.featureEntityDetails);
            this.isPrimaryEntityPresent = this.featureEntityDetails.some(x => x.entity_type === 'primary');
    },
    (error) => 
    {
            this.logger.log('error',error);
    });
  }
  //To get the all Project feature flows
  getProjectFeatureFlows() 
  {
    this.spinner.show();
    this.projectComponentService.getProjectFeatureFlows(this.featureInfo.flows, this.logId).subscribe(response => 
    {
        const temp = [];
        if (response.body) 
        {
            this.spinner.hide();
            this.flowInFeatureRowData = response.body;
        }
    }, 
    error => 
    {
        this.logger.log('error',error);
    });
  }

  //To get the all flow data
  getAllFlows() 
  {
    this.spinner.show();
    this.projectComponentService.getAllFlows(this.logId).subscribe(response => 
    {
            const flows = response.body;
            if (flows) 
            {
                this.spinner.hide();
                if (this.flowInFeatureRowData.length === 0) 
                {
                    this.rowData = flows;
                } 
                else 
                {
                    this.flowInFeatureRowData.forEach(flowElement => 
                    {
                        const index = flows.findIndex((x: { name: any; }) => x.name === flowElement.name);
                        if (index > -1) 
                        {
                            flows.splice(index, 1);
                        }
                    });
                    this.rowData = flows;
                }
            }
    },
    error => 
    {
            this.logger.log('error',error);
    });
  }

  goToWizard()
  {
      this.openWizardDialog();
  }

  openWizardDialog()
  {
    const dialogRef = this.dialog.open(WizardPopupComponent, 
    {
            width: '450px',
    });
    dialogRef.afterClosed().subscribe(wizardData => 
    {
        if (wizardData) 
        {
            console.log("WizardData:",wizardData);
            this.featuredetailsservice.createWizard(wizardData).subscribe((response) => 
            {
                console.log("newWizard:",response);
                this.getAllWizard();
            })
        }
    })
  }

  //This function called in button click event in add screen
  GoToDesigner() 
  {
        this.openScreenDialog();
  }

  //To open screen popup Component and get the screen and get the screen types values
  openScreenDialog()
  {
        const dialogRef = this.dialog.open(ScreenPopupComponent, 
        {
            width: '550px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(screenData => 
        {
            console.log('screen data are---------------- ', screenData);
            if (screenData) 
            {
                this.router.navigate(['/desktopscreen'], 
                {
                    queryParams: 
                    {
                        projectId: this.project_id,
                        featureId: this.feature_id,
                        screenType: screenData.name,
                        screenOption: screenData.type
                    }
                });
            }
        });
  }
  //To open add flows feature dialog box
  openFeatureFlowDialog(id:any) 
  {
        this.displayFeatureFlowModal = 'block';
        this.getAllFlows();
  }

  //Function is used to save the entity values if exisisting entity present
  AddEntity(entityData:any) 
  {
        entityData._id = this.entityid;
        this.entitydetails = 
        [
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
        this.projectComponentService.Updatefeaturedetailsentity(this.feature_id, this.entitydetails, this.logId).subscribe(featuredetails => 
        {
                if(featuredetails)
                {
                    this.getFeatureById();
                    this.getEntityByFeatureId();
                }
               
        });
       
  }
  //To edit particular entity
  editEntityField(entity: any) 
  {
        this.router.navigate(['/entity-field'], 
        {
            queryParams: 
            {
                entityId: entity._id,
                featureId: this.feature_id,
                projectId: this.project_id
            }
        });
  }

  //Function is used to save the entity values
  saveEntity(entityData:any) 
  {
        delete entityData._id;
        entityData.project_id = this.project_id;
        this.projectComponentService.createEntity(entityData, this.logId).subscribe((response) => 
        {
                this.updateEntityId = response.body._id;
                this.entitydetails = [];
                this.entitydetails = 
                [
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
                this.projectComponentService.Updatefeaturedetailsentity(this.feature_id, this.entitydetails, this.logId).subscribe(featuredetails => 
                {
                    if (featuredetails.body) 
                    {
                        this.getEntityByFeatureId();
                    }
                });
        },
        (error) => 
        {
                console.log('error cannot able to save the entities ', error);
        });
  }
  //Function is update the entity values
  updateEntity(entityData:any) 
  {
        entityData.updated_at = new Date();
        entityData._id = this.updateEntityId;
        this.projectComponentService.updateEntity(entityData, this.logId).subscribe((data) => 
        {
                this.entitydetails = [];
                this.entitydetails = 
                [
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
                this.projectComponentService.Updatefeaturedetailsentity(this.feature_id, this.entitydetails, this.logId).subscribe(featuredetails => 
                {
                        if (featuredetails) 
                        {
                            this.getEntityByFeatureId();
                        }
                });
        },
        (error) => 
        {
                this.logger.log('error',error);
        });
  }

  //To delete the entity by their id value
  deleteEntityById() 
  {
        this.deletePopup = 'none';
        if (this.selectEntity.feature_id === this.feature_id) 
        {
            this.projectComponentService.deleteEntityById(this.selectedEntityId, this.logId).subscribe((data) => 
            {
                    this.getEntityByFeatureId();
            },
            (error) => {  });
        } 
        else 
        {
            this.projectComponentService.Deletefeaturedetailsentity(this.feature_id , this.selectedEntityId).subscribe(data => 
            {
                this.getEntityByFeatureId();
            });
        }
  }

  //To open the entity model dialog box
  saveEntityModel() 
  {
        this.openDialog(true, null);
  }

  //To open the Confirm delete Popup model
  openDeleteModel(entity:any) 
  {
        this.selectEntity = entity;
        this.selectedEntityId = entity._id;
        this.deletePopup = 'block';
  }

  //To Close the Confirm delete Popup model
  closeDeleteModel() 
  {
        this.deletePopup = 'none';
  }

  //Function used to open Entity popup component and save the value
  openDialog(isSaveOption:any, objectValue:any): void 
  {
        const dialogDataValue = 
        {
            savedEntity: {},
            projectId: this.project_id,
            isPrimaryEntityPresent: this.isPrimaryEntityPresent,
        };
        console.log("dialogDataValue",dialogDataValue);        
        if (isSaveOption) 
        {
            dialogDataValue.savedEntity = {};
        } 
        else 
        {
            dialogDataValue.savedEntity = objectValue;
        }
        this.broadcastservice.changeFeatureId(this.feature_id);
        console.log("FeatureID:",this.feature_id);
        const dialogRef = this.dialog.open(EntitypopUpComponent, 
        {
            width: '350px',
            data: dialogDataValue
        });
        dialogRef.afterClosed().subscribe(entityData => 
        {
            if (entityData) 
            {
                this.entityid = entityData.entity_id;
                this.entity.project_id = this.project_id;
                this.entity.feature_id = this.feature_id;
                this.entity.name = entityData.name;
                this.entity.description = entityData.description;
                this.entity.entity_type = entityData.entityType;
                this.entity.field = entityData.field;
                if (entityData !== undefined) 
                {
                    if (objectValue === null) 
                    {
                        if (entityData.selectentity === 'Existing') 
                        {
                            this.AddEntity(this.entity);
                        } 
                        else 
                        {
                            this.saveEntity(this.entity);
                        }
                    } 
                    else 
                    {
                        const tempObj = 
                        {
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
  getScreenByFeatureId() 
  {
        this.spinner.show();
        this.screenService.getScreenByFeatureId(this.feature_id, this.logId).subscribe((screenData) => 
        {
                console.log("screenData",screenData);
                
                this.spinner.hide();
                this.screenDetails = screenData.body;
        },
        (error) => 
        {
                console.log('cannot able to get the screen based on featureId  ', error);
        });
  }

  getAllWizard()
  {
    this.spinner.show();
    this.featuredetailsservice.getAllWizard().subscribe((wizardData: any) => 
    {
            console.log("WizardData",wizardData);
            
            this.spinner.hide();
            this.wizardDetails = wizardData.body;
    },
    (error) => 
    {
            console.log('cannot able to get the screen based on featureId  ', error);
    });
  }

  editWizard(wizardId:any)
  {
    this.selectedWizardId=wizardId;
    this.showScreensDialog();   
  }

  showScreensDialog()
  {
    const dialogRef = this.dialog.open(ShowscreenPopupComponent, 
    {
            width: '350px',
    });
  }

  deleteWizard(wizardId:any)
  {
     this.selectedWizardId=wizardId;
     this.deleteDialog();
  }

  deleteDialog() 
  {
        const dialogRef = this.dialog.open(DeletefeatpopupComponent, 
        {
            width: '350px',
        });
        dialogRef.afterClosed().subscribe((data)=>
        {
          console.log(data);
          if(data==true)
          {
            console.log('feature id', this.selectedWizardId);
            this.featuredetailsservice.deleteWizardById(this.selectedWizardId).subscribe((data)=>
            {
             console.log("Data after Delete:",data);
             if(data)
             {
               this.getAllWizard();
             }
            })
          }
        })
  }

  editScreen(screenId:any, screenType:any) 
  {
        this.router.navigate(['/desktopscreen'], 
        {
            queryParams: 
            {
                projectId: this.project_id, screenId: screenId,
                featureId: this.feature_id,
                screenType: screenType
            }
        });
  }

  deleteScreen(screenId:any) 
  {
        this.deletescreenPopup = 'block';
        this.selectedScreenId = screenId;
  }
  deleteScreenByIdPopup() 
  {
        this.deletescreenPopup = 'none';
        this.screenService.deleteScreenById(this.selectedScreenId, this.logId).subscribe((data) => 
        {
                this.getScreenByFeatureId();
        },
        (error) => {  });
  }
  closedeleteScreenPopup() 
  {
        this.deletescreenPopup = 'none';
  }
}
