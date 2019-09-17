import { Component, OnInit } from '@angular/core';
import { Iscreen } from './interface/screen';
import { ActivatedRoute, Router } from '@angular/router';
import yaml from 'js-yaml';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { MatDialog } from '@angular/material';
import { ProjectComponentService } from '../project-component.service';
import { IEntity } from '../interface/Entity';
import { ScreenDesignerService } from 'src/app/screen-designer/screen-designer.service';
import { ButtonRendererComponent } from '../entity-field/rendered/button-renderer/button-renderer.component';
import { ScreenPopupComponent } from '../screen-popup/screen-popup.component';
import { EntityModelComponent } from '../entitypopup-model/entitypop-up/entitypop-up.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { importExpr } from '@angular/compiler/src/output/output_ast';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { element } from '@angular/core/src/render3';

// import { FormBuilder , FormGroup ,Validators} from `@angular/forms`;


const URL = 'http://localhost:3006/feature/details/addfile';

@Component({
    selector: 'app-feature-details',
    templateUrl: './feature-details.component.html',
    styleUrls: ['./feature-details.component.scss']
})
export class FeatureDetailsComponent implements OnInit {

    public connectorsForm: FormGroup;
    public submitted = false;
    public isService: boolean;

    // new flow var
    flowList: any[] = [];
    featureInfo: any;
    projectFlowDetails: any;


    // old
    feature_id: String;
    project_id: String;
    gridColumnApi;
    displayFeatureFlowModal: String = 'none';
    featureDetailsData: any = [];
    featureEntityData: any = [];
    featureEntity: any = [];
    frameworkComponents: { buttonRenderer: any; };
    displayModel: String = 'none';
    public isReadOnly: Boolean = false;
    featureScreenName: any = [];
    columnFeatureDefs: any = [];
    columnFeatureEntityData: any = [];
    columnFeatureEntity: any[] = [];
    featureEntityDetails: any[] = [];
    flowInFeatureRowData: any[] = [];
    rowData: any = [];
    distinctFeatureDetails: any = [];
    columnFlow: any = [];
    featureFlowId: String;
    selectedFeatureName: String;
    fcompColDefs;
    gridApi;
    rowSelectionFlow;
    rowSelection: String;
    defaultColDef: any;
    flowInFeatureColDef: any;
    defaultColFlow: any;
    screenDetails: any = [];
    public screenData: Iscreen = {
        screenName: '',
        description: '',
        featureName: '',

    };
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
    selectedFlow: any = [];
    selectedFeatureEntity: any = [];
    showFeatureEntity: boolean;
    featureFlowGrid;
    featureEntityDataGrid;
    public quickConnectorsFlows: any = [];
    public customeConncetor: Boolean;

    public quickConnectors: any = {
        name: '',
        description: '',
        endPointUrl: '',
        api_key: '',
        params: '',
        apiMethods: '',
        service: '',

    };
    public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
    // This is the default title property created by the angular cli. Its responsible for the app works
    isPrimaryEntityPresent: boolean;
    deletePopup: string;
    deletescreenPopup: string;
    selectedEntityId: any;
    selectedScreenId: any;
    flowInFeatureColumn: any[];
    entitydetails: { 'entities': { 'entityType': any; 'entityId': any; }; 'name': any; 'description': any; 'updated_date': number; }[];
    updateEntityId: any;
    entityid: any;
    public modifyFlows: any = {
        flowName: '',
        flowLable: '',
        flowDescription: '',
        flowAction: '',
        flowId: '',
    };
    quickConnectorName: string;
    public quickConnectorId: any;
    public quickConnectorsService: any;
    public modifyComponents: any = [];



    constructor(
        private projectComponentService: ProjectComponentService,
        private screenService: ScreenDesignerService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private dialog: MatDialog
    ) {

        this.frameworkComponents = {
            buttonRenderer: ButtonRendererComponent,
        };

        this.columnFlow = [
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
        this.defaultColFlow = {
            sortable: true,
            filter: true
        };
        this.flowInFeatureColumn = [
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
                cellRendererParams: {
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
                cellRendererParams: {
                    onClick: this.modify.bind(this),
                    label: 'Modify'
                }
            }
        ];

        this.fcompColDefs = [
            { headerName: 'Component Name', field: 'component_name', checkboxSelection: true },
            { headerName: 'FrameWork', field: 'dev_framework' },
            { headerName: 'Type', field: 'type' },
            { headerName: 'Sequence', field: 'sequence_id' },
            { headerName: 'Language', field: 'dev_language' },
            { headerName: 'Label', field: 'label' },
            { headerName: 'Description', field: 'description' },
        ];
        this.columnFeatureDefs = [
            {
                headerName: 'Label', field: 'label', checkboxSelection: true
            },

            {
                headerName: 'Dev Framework', field: 'dev_framework',
            },
            {
                headerName: 'Dev Lang', field: 'dev_language',
            },
            { headerName: 'Description', field: 'description' },
        ];

        this.columnFeatureEntityData = [
            {
                headerName: 'Collection Name', field: 'name', checkboxSelection: true
            },

            {
                headerName: 'Description', field: 'description',
            }
        ];

        this.columnFeatureEntity = [
            {
                headerName: 'Document Name', field: 'name', checkboxSelection: true
            },
            {
                headerName: 'Data Type', field: 'data_type'
            }
        ];
        this.rowSelection = 'single';
        this.defaultColDef = {
            enableValue: true,
        };
        this.flowInFeatureColDef = {
            enableValue: true,
            filter: true,
            sortable: true
        };
    }

    ngOnInit() {
        this.connectorsForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            description: ['', Validators.required],
            endPoint: ['', Validators.required],
            api_key: ['', Validators.required],
            params: ['', Validators.required]
        });
        this.route.queryParams.subscribe(params => {
            if (params.featureId !== undefined && params.featureId !== null) {
                this.feature_id = params.featureId;
            }
            if (params.projectId !== undefined && params.projectId !== null) {
                this.project_id = params.projectId;
            }
        });
        this.getFeatureById();
        this.getScreenByFeatureId();
        this.getEntityByFeatureId();
    }

    get f() { return this.connectorsForm.controls; }


    getFeatureById() {
        this.projectComponentService.getFeatureById(this.feature_id).subscribe(
            response => {
                this.featureInfo = response.body;
                this.selectedFeatureName = response.body.name;
                this.getProjectFeatureFlows();
                this.getAllFlows();
            },
            error => {

            }
        );
    }

    getScreenByFeatureId() {
        this.screenService.getScreenByFeatureId(this.feature_id).subscribe(
            (screenData) => {
                this.screenDetails = screenData.body;
            },
            (error) => {
                console.log('cannot able to get the screen based on featureId  ', error);
            }
        );
    }

    getEntityByFeatureId() {
        this.projectComponentService.getEntityByFeatureId(this.feature_id).subscribe(
            (entityData) => {
                this.featureEntityDetails = entityData.body;
                this.isPrimaryEntityPresent = this.featureEntityDetails.some(x => x.entity_type === 'primary');
            },
            (error) => {

            }
        );
    }

    getProjectFeatureFlows() {
        this.projectComponentService.getProjectFeatureFlows(this.featureInfo.flows).subscribe(response => {
            console.log('floq---->>>project00flow--feature-->>', response)
            const temp = [];
            if (response.body) {
                this.flowInFeatureRowData = response.body;
            }
        }, error => {
            console.error(error);
        });
    }

    getAllFlows() {
        this.projectComponentService.getAllFlows().subscribe(
            response => {
                console.log('flowsss---11111>>>', response.body)

                const flows = response.body;
                if (flows) {
                    if (this.flowInFeatureRowData.length === 0) {
                        this.rowData = flows;
                    } else {
                        this.flowInFeatureRowData.forEach(flowElement => {
                            const index = flows.findIndex(x => x.name === flowElement.name);
                            if (index > -1) {
                                flows.splice(index);
                            }
                        });
                        console.log('flowsss--->>>', flows)
                        this.rowData = flows;
                    }
                }
            },
            error => {
            }
        );
    }


    editScreen(screenId, screenType) {
        this.router.navigate(['/desktopscreen'], {
            queryParams: {
                projectId: this.project_id, screenId: screenId,
                featureId: this.feature_id,
                screenType: screenType
            }
        });
    }

    deleteScreen(screenId) {
        this.deletescreenPopup = 'block';
        this.selectedScreenId = screenId;

    }


    openFeatureFlowDialog(id): void {
        // this.featureFlows. = id;
        this.displayFeatureFlowModal = 'block';
        this.getAllFlows();
    }

    closeFeatureFlowModal() {
        this.displayFeatureFlowModal = 'none';
    }

    createProjectFlow() {
        if (this.selectedFlow.length > 0) {
            // removing _id and store
            const projectFlowList = this.selectedFlow.map(({ _id, ...rest }) => ({ ...rest }));
            console.log('save many project flows--->>', projectFlowList);
            this.saveManyProjectFlow(projectFlowList);
        }
    }
    saveManyProjectFlow(projectFlowList) {
        this.projectComponentService.saveManyProjectFlow(projectFlowList).subscribe(
            response => {
                if (response.body) {
                    // get only the specific values
                    const projectFlowsId = response.body.map(({ _id }) => _id);
                    this.featureInfo.flows = this.featureInfo.flows.concat(projectFlowsId);
                    this.saveFlowsInFeature();
                }
            },
            error => {
                console.log('cannot able to save the many projectFlows');
            });
    }
    saveFlowsInFeature() {
        this.projectComponentService.updateFeature(this.featureInfo).subscribe(
            response => {
                console.log('save in flow --in feature -->>', response);
                this.featureInfo = response.body;
                this.displayFeatureFlowModal = 'none';
                this.flowInFeatureRowData = this.featureInfo.flows;
                this.getProjectFeatureFlows();
            },
            error => { });
    }

    deleteProjectFlow(projectFlow) {
        this.projectComponentService.deleteProjectFlow(projectFlow).subscribe(
            data => {
                this.getProjectFeatureFlows();
                this.getAllFlows();
            },
            error => {
                console.log('cannot able to delete the projectFlow ', error);
            });
    }


    removeRow(e) {
        const index = this.featureInfo.flows.findIndex(x => x === e.rowData._id);
        if (index > -1) {
            this.featureInfo.flows.splice(index, 1);
            this.deleteProjectFlow(e.rowData._id);
            this.saveFlowsInFeature();
        }
    }
    modify(e) {
        console.log('modifyyyy---->>>', e.rowData.components);
        if (e.rowData.flowType === 'GeppettoFlow') {
            this.modifyFlows.flowName = e.rowData.name;
            this.modifyFlows.flowLable = e.rowData.label;
            this.modifyFlows.flowDescription = e.rowData.description;
            this.modifyFlows.flowAction = e.rowData.actionOnData;
            this.modifyFlows.flowId = e.rowData._id;
            this.modifyComponents = e.rowData.components;
            this.quickConnectorName = 'quickConnectors';
            console.log('modifyy--componect--->>', this.modifyComponents);
            this.displayModel = 'block';

        }
    }

    selectApis(event) {
        this.quickConnectors.apiMethods = event;
    }

    backendSerice(event) {
        console.log('event--<<>>', event);
        this.quickConnectors.service = event;
    }
    frontEndService(event) {
        console.log('event--<<>>', event);
        this.quickConnectors.service = event;
    }

    addCustomeConnector() {
        this.customeConncetor = true;

    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.connectorsForm.invalid) {
            return;
        }
        if (!this.connectorsForm.invalid) {
            this.isService = true;
        }
        const tempObject = {
            projectId: this.project_id,
            feature_id: this.feature_id,
            endPointUrl: this.quickConnectors.endPointUrl,
            api_key: this.quickConnectors.api_key,
            params: this.quickConnectors.params,
            // apiMethods: this.quickConnectors.apiMethods
        };
        console.log('i am tempobject---->>>', tempObject);
        // `${data.endPointUrl}?${data.params}&api_key=${data.api_key}&file_type=json`
        console.log('url =--->>', `${tempObject.endPointUrl}?${tempObject.params}&api_key=${tempObject.api_key}&file_type=json`);
        this.projectComponentService.fred(tempObject).subscribe(data => {
            if (data) {
                const tempObj = {
                    url: `${tempObject.endPointUrl}?${tempObject.params}&api_key=${tempObject.api_key}&file_type=json`,
                    isDefault: true,
                    isDisabled: false,
                    properties: [],
                    name: this.quickConnectors.name,
                    description: this.quickConnectors.description,
                    entity_id: data.body._id,
                    connectors: this.quickConnectorName,
                    apiMethods: this.quickConnectors.apiMethods,
                    service: this.quickConnectors.service,
                    api_key: this.quickConnectors.api_key,
                    params: this.quickConnectors.params,
                    availableApi: [
                        {
                            'name': 'availble',
                            'description': 'des',
                            'type': 'api',
                            'properties': [],
                            '_id': '5d722bb54aaed85b03cc809e'
                        }
                    ],
                    fromComponentName: null,
                    toComponentName: null,
                };

                console.log('i am resonse quick connectors 123-->>', tempObj);


                this.projectComponentService.quickConnectors(tempObj).subscribe(response => {
                    this.quickConnectorId = response.body._id;
                    const tempData = {
                        connectorsId : this.quickConnectorId,
                        flowComponentId: [],
                    };

                    if (response.body.service === 'backEnd') {
                        this.modifyComponents.map(backEnd => {
                            if (backEnd.name === 'GpExpressDao') {
                                tempData.flowComponentId = backEnd._id;
                            }
                        });
                    } else if (response.body.service === 'frontEnd') {
                        this.modifyComponents.map(frontEnd => {
                            
                           
                        });

                    }
                    // this.projectComponentService.updateProjectFlowComponent(tempData).subscribe(response => {
                    //     console.log('response --->>', response);
                    // })
                    // this.updateProjectF)lowComponent
                    console.log('flow -component--id --->>', tempData);
                    // else if (response.body.service === 'frontEnd') {
                    //     this.modifyComponents.map(frontEnd => {

                    //     });

                    // }

                });
            }
        });
    }

    flowCancle() {
        this.displayModel = 'none';
        this.customeConncetor = false;

    }

    onRowSelectionChanged(event) {
        this.selectedFlow = this.gridApi.getSelectedRows();

    }

    onFeatureFlowGridReady(params) {
        this.featureFlowGrid = params.api;
        this.featureFlowGrid.sizeColumnsToFit();
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    }



    editEntityField(entity: any) {
        this.router.navigate(['/entity-field'], { queryParams: { entityId: entity._id, featureId: this.feature_id } });
    }

    saveEntityModel() {
        this.openDialog(true, null);
    }

    AddEntity(entityData) {
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
        this.projectComponentService.Updatefeaturedetailsentity(this.feature_id, this.entitydetails).subscribe(featuredetails => {
        });
        this.getFeatureById();

        this.projectComponentService.updateEntity(entityData).subscribe((data) => {
            this.getEntityByFeatureId();
        }, (error) => {
        });
    }

    saveEntity(entityData) {
        this.entity.name = entityData.name;
        this.entity.description = entityData.description;
        this.entity.project_id = this.project_id;
        this.projectComponentService.createEntity(this.entity).subscribe(
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
                this.projectComponentService.Updatefeaturedetailsentity(this.feature_id, this.entitydetails).subscribe(featuredetails => {
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

    updateEntity(entityData) {
        entityData.updated_at = new Date();
        entityData._id = this.updateEntityId;
        this.projectComponentService.updateEntity(entityData).subscribe(
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

                this.projectComponentService.Updatefeaturedetailsentity(this.feature_id, this.entitydetails).subscribe(featuredetails => {
                    if (featuredetails) {
                        this.getEntityByFeatureId();
                    }
                });
            },
            (error) => {

            }
        );
    }



    openDialog(isSaveOption, objectValue): void {
        const dialogDataValue = {
            savedEntity: {},
            projectId: this.project_id,
            isPrimaryEntityPresent: this.isPrimaryEntityPresent,
        };
        if (isSaveOption) {
            dialogDataValue.savedEntity = {};
        } else {
            dialogDataValue.savedEntity = objectValue;
        }
        const dialogRef = this.dialog.open(EntityModelComponent, {
            width: '350px',
            data: dialogDataValue
        });

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

    editDialog(isSaveOption, objectValue): void {
        this.updateEntityId = objectValue._id;
        const dialogDataValue = {
            savedEntity: {},
            isPrimaryEntityPresent: this.isPrimaryEntityPresent,
        };
        if (isSaveOption) {
            dialogDataValue.savedEntity = {};
        } else {
            dialogDataValue.savedEntity = objectValue;
        }
        const dialogRef = this.dialog.open(EditPopupComponent, {
            width: '350px',
            data: dialogDataValue
        });

        dialogRef.afterClosed().subscribe(entityData => {
            const tempObj = {
                _id: '',
                name: '',
                description: '',
                entity_type: ''
            };
            tempObj._id = this.updateEntityId;
            tempObj.name = entityData.name;
            tempObj.description = entityData.description;
            tempObj.entity_type = entityData.entityType;
            this.updateEntity(tempObj);
        });

    }


    editEntity(entity) {
        // tslint:disable-next-line:quotemark
        this.editDialog(false, entity);
    }

    GoToDesigner() {
        this.openScreenDialog();
    }
    openScreenDialog(): void {
        const dialogRef = this.dialog.open(ScreenPopupComponent, {
            width: '550px',
            data: {}
        });


        dialogRef.afterClosed().subscribe(screenData => {
            if (screenData) {
                this.router.navigate(['/desktopscreen'], {
                    queryParams: {
                        projectId: this.project_id,
                        featureId: this.feature_id,
                        screenType: screenData
                    }
                });
            }
        });
    }


    getScreenDetailsByFeatureId() {
        this.projectComponentService.getAllFeatureDetailsByFeatureId(this.feature_id).subscribe(data => {
            this.featureDetailsData = data.body;
            this.featureDetailsData.map(featureData => {
                this.featureScreenName.push(featureData.flow.screenName);
            });
            const distinct = (value, index, self) => {
                return self.indexOf(value) === index;
            };

            this.distinctFeatureDetails = this.featureScreenName.filter(distinct);

        });
    }

    getAllEntity() {
        this.projectComponentService.getAllEntity().subscribe(data => {
            this.featureEntityData = data.body;
        });
    }

    openScreenModal() {
        this.displayModel = 'block';
    }
    onCloseHandled() {
        this.displayModel = 'none';
    }

    selectedFeatureEntityData() {
        this.selectedFeatureEntity = this.featureEntityDataGrid.getSelectedRows();
        if (this.selectedFeatureEntity.length !== 0) {
            const id = this.selectedFeatureEntity[0]._id;
            this.featureEntity = this.selectedFeatureEntity[0].field;
            this.showFeatureEntity = true;
        }

    }

    openDeleteModel(entity) {
        this.selectedEntityId = entity._id;
        this.deletePopup = 'block';
    }

    closeDeleteModel() {
        this.deletePopup = 'none';
    }

    deleteEntity() {
        this.deletePopup = 'none';
        this.projectComponentService.deleteEntity(this.selectedEntityId).subscribe(
            (data) => {
                this.getEntityByFeatureId();
            },
            (error) => {

            }
        );
    }


    deleteScreenPopup() {
        this.deletescreenPopup = 'none';
        this.screenService.deleteScreen(this.selectedScreenId).subscribe(
            (data) => {
                this.getScreenByFeatureId();

            },
            (error) => {

            }
        );
    }
    closedeleteScreenPopup() {
        this.deletescreenPopup = 'none';
    }
}
