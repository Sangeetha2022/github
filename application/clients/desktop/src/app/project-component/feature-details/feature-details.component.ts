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
import { element, template } from '@angular/core/src/render3';
import { FlowTreeService } from './flow-tree/flow-tree.service';
import { DataService } from 'src/shared/data.service';

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
    displayModelTree: String = 'none';
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
    public customConnector: Boolean;
    public isAddConnector: Boolean;
    public selectedHeaders: String;
    public isbackEndService: boolean;
    public isFrontEndService: boolean;

    public quickConnectors: any = {
        name: '',
        description: '',
        endPointUrl: '',
        api_key: {
            key: '',
            value: ''
        },
        apiMethods: '',
        pathVariable: false,
        queryParams: false,
        properties: []
    };
    public propertiesKey: any = [];
    public propertiesValue: any = [];
    public quickConnectorsURL: any;
    public apiMethodArray: any = ['select Apis', 'post', 'get', 'put', 'delete'];
    public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
    // This is the default title property created by the angular cli. Its responsible for the app works
    isPrimaryEntityPresent: boolean;
    deletePopup: string;
    deletescreenPopup: string;
    deleteConnectorPopup: string;
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
    public properties: any[] = [];
    flowEntityId: any;
    public connectorsType: String;
    modifyConnectorsId: any;
    public showTreePopup: boolean;
    modifyEntityId: any;



    constructor(
        private projectComponentService: ProjectComponentService,
        private screenService: ScreenDesignerService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private flowTreeService: FlowTreeService,
        private dataService: DataService,
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


        });
        this.route.queryParams.subscribe(params => {
            if (params.featureId !== undefined && params.featureId !== null) {
                this.feature_id = params.featureId;
            }
            if (params.projectId !== undefined && params.projectId !== null) {
                this.project_id = params.projectId;
            }

        });
        this.dataService.currentFlowEntitySource.subscribe(data => {
            if (data) {
                this.flowEntityId = data;
                this.displayModelTree = 'none';
                this.displayModel = 'block';
            }
        });
        this.isbackEndService = false,
        this.isFrontEndService = false,

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
                const flows = response.body;
                if (flows) {
                    if (this.flowInFeatureRowData.length === 0) {
                        this.rowData = flows;
                    } else {
                        this.flowInFeatureRowData.forEach(flowElement => {
                            const index = flows.findIndex(x => x.name === flowElement.name);
                            if (index > -1) {
                                flows.splice(index, 1);
                            }
                        });
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


    deleteFlowById(flowId) {
        this.projectComponentService.deleteFlowById(flowId).subscribe(
            data => {
                this.deleteConnectorPopup = 'none';
                this.getProjectFeatureFlows();
                this.getAllFlows();
                this.getEntityByFeatureId();
            },
            error => {
                console.log('cannot able to delete the projectFlow ', error);
            });
    }


    removeRow(e) {
        const index = this.featureInfo.flows.findIndex(x => x === e.rowData._id);
        if (index > -1) {
            this.featureInfo.flows.splice(index, 1);
            // this.deleteProjectFlow(e.rowData._id);
            this.deleteFlowById(e.rowData._id);
            this.saveFlowsInFeature();
        }
    }
    modify(e) {
        e.rowData.components.map(data => {
            data.connector.map(connector => {
                console.log('modify--id-->>', connector.isCustom);
                if (connector.isCustom === true) {
                    console.log('connctors---->>', connector.isCustom)
                    this.modifyConnectorsId = connector._id;
                }
            });
        });
        if (e.rowData.flowType === 'GeppettoFlow') {
            this.modifyFlows.flowName = e.rowData.name;
            this.modifyFlows.flowLable = e.rowData.label;
            this.modifyFlows.flowDescription = e.rowData.description;
            this.modifyFlows.flowAction = e.rowData.actionOnData;
            this.modifyFlows.flowId = e.rowData._id;
            this.modifyComponents = e.rowData.components;
            this.quickConnectorName = 'quickConnectors';
            this.displayModel = 'block';
        }
    }

    PathVariableMethod(event) {
        console.log('event');
        this.selectedHeaders = event;
        this.isAddConnector = true;
        this.quickConnectors.queryParams = false;
        this.quickConnectors.pathVariable = true;
    }

    queryParamsMethod(event) {
        console.log('query params-->', event);
        this.selectedHeaders = event;
        this.isAddConnector = true;
        this.quickConnectors.pathVariable = false;
        this.quickConnectors.queryParams = true;
    }

    addProperties(): void {
        this.properties.push({
            key: '',
            value: ''
        });

    }

    quickTest() {
        this.propertiesKey.map((e, index) => {
            const tempArray = {
                key: '',
                value: ''
            }
            tempArray.key = e;
            tempArray.value = this.propertiesValue[index]
            this.quickConnectors.properties.push(tempArray);
        });
        const tempArrykeyValue = [];
        this.quickConnectors.properties.map(({ key, value }) => {
            const queryKeyValue = `${key}=${value}`;
            tempArrykeyValue.push(queryKeyValue);
        });
        const convertStr = tempArrykeyValue.toString();
        const keyAndValue = convertStr.replace(/,/g, '&')
        console.log('urll-->>', keyAndValue);

        console.log('this.properties-->>', this.quickConnectors)
        // tslint:disable-next-line: max-line-length
        this.quickConnectorsURL = `${this.quickConnectors.endPointUrl}?${this.quickConnectors.api_key.key}=${this.quickConnectors.api_key.value}&${keyAndValue}`;
        this.projectComponentService.quickTestFred(this.quickConnectors).subscribe(response => {
            if (response) {
                this.showTreePopup = true;
                console.log('i am inside of response', response.body);
                this.displayModelTree = 'block';
                this.displayModel = 'none';
                const allResponse = JSON.parse(response.body);
                this.getEntityByFeatureId();
                this.flowTreeService.quickTest(allResponse);
            }
        });
    }


    removeProperties(i) {
        this.properties.splice(i, 1);
    }

    // selectApis(event) {
    //     this.quickConnectors.apiMethods = event;
    // }

    backendService(event) {
        if (this.modifyConnectorsId !== undefined) {
            this.showAlert();
        } else if (this.modifyConnectorsId === undefined) {
            this.quickConnectors.service = event;
        }
    }
    frontEndService(event) {
        if (this.modifyConnectorsId !== undefined) {
            this.showAlert();
        } else if (this.modifyConnectorsId === undefined) {
            this.quickConnectors.service = event;
        }
    }

    showAlert() {
        this.submitted = false;
        this.displayModel = 'none';
        this.customConnector = false;
        this.deleteConnectorPopup = 'block';
    }

    quickConnectorsMethod(event) {
        console.log('aruldass--->>', event);
        this.connectorsType = event;
    }
    defaultConnectorsMethod(event) {
        console.log('aruldass--->>', event);
        this.connectorsType = event;
    }
    customConnectorsMethod(event) {
        console.log('aruldass--->>', event);
        this.connectorsType = event;
    }

    addExternalConnector() {
        console.log('Add externel--connector-id-->', this.modifyConnectorsId);
        if (this.modifyConnectorsId !== undefined && this.modifyConnectorsId !== null) {
            this.getQuickConnectorId(this.modifyConnectorsId);
        } else {
            this.customConnector = true;
        }
    }
    getQuickConnectorId(connector_id) {
        console.log('quick conntors --->', connector_id);
        this.projectComponentService.getConnectorById(connector_id).subscribe(response => {
            if (response) {
                console.log('getQuickConnectorId--->>', response);
                this.quickConnectors = response.body;
                if (response.body.params === 'queryParams') {
                    this.quickConnectors.queryParams = true;
                }
                if (response.body.params === 'pathvarible') {
                    this.quickConnectors.pathVariable = true;
                }
                if (response.body.service === 'backEnd') {
                    this.isbackEndService = true;
                }
                if (response.body.service === 'frontEnd') {
                    this.isFrontEndService = true;

                }

                this.modifyEntityId = response.body.entity_id;
                this.customConnector = true;
            }
        });
    }

    closedeleteConntorPopUp() {
        this.deleteConnectorPopup = 'none';
        this.customConnector = true;
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
        if (this.connectorsType === 'quickConnectors') {
            this.quickConnectorsType();
        }
    }

    quickConnectorsType() {
        console.log('temb--obj=--->>', this.quickConnectors)
        const tempObj = {
            url: this.quickConnectorsURL,
            isCustom: true,
            properties: [],
            name: this.quickConnectors.name,
            description: this.quickConnectors.description,
            entity_id: this.flowEntityId,
            connectors: this.quickConnectorName,
            apiMethods: this.quickConnectors.apiMethods,
            service: this.quickConnectors.service,
            api_key: this.quickConnectors.api_key,
            endPointUrl: this.quickConnectors.endPointUrl,
            params: this.selectedHeaders,
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
        tempObj.properties.push(this.quickConnectors.properties);

        console.log('i am properties-->>', tempObj);

        this.projectComponentService.quickConnectors(tempObj).subscribe(response => {
            this.quickConnectorId = response.body._id;
            const tempData = {
                connectorId: this.quickConnectorId,
                flowComponentId: '',
            };
            if (response.body.service === 'backEnd') {
                this.modifyComponents.map(backEnd => {
                    if (backEnd.name === 'GpExpressDao') {
                        tempData.flowComponentId = backEnd._id;
                        this.updateFlowCompConnectorById(tempData);
                    }
                });
            } else if (response.body.service === 'frontEnd') {
                this.modifyComponents.map(frontEnd => {
                    if (frontEnd.name === 'GpAngularService' || frontEnd.name === 'GpIonicAngularService') {
                        tempData.flowComponentId = frontEnd._id;
                        this.updateFlowCompConnectorById(tempData);
                    }

                });
            }
        });
    }

    updateFlowCompConnectorById(data) {
        this.projectComponentService.updateFlowCompConnectorById(data).subscribe(response => {
            console.log('update--response- updateFlowCompConnectorById->>', response);
            if (response) {
                this.submitted = false;
                this.quickConnectors = {};
                this.displayModel = 'none';
                this.customConnector = false;
                this.dataService.FlowSaveEntity('');
                this.quickConnectors = '',
                this.isAddConnector = false;
                this.getEntityByFeatureId();
            }
        });
    }



    flowCancel() {
        this.quickConnectors = {};
        this.modifyConnectorsId = undefined;
        this.submitted = false;
        this.displayModel = 'none';
        this.customConnector = false;
        this.isAddConnector = false;


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
    deleteConnector() {
        console.log('delete--Id--->>', this.modifyFlows.flowId);
        this.deleteFlowById(this.modifyFlows.flowId)

    }



    openDialog(isSaveOption, objectValue): void {
        // this.displayModel = 'block';
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

    // deleteEntity() {
    //     this.deletePopup = 'none';
    //     this.projectComponentService.deleteEntity(this.selectedEntityId).subscribe(
    //         (data) => {
    //             this.getEntityByFeatureId();
    //         },
    //         (error) => {

    //         }
    //     );
    // }

    deleteEntityById() {
        this.deletePopup = 'none';
        this.projectComponentService.deleteEntityById(this.selectedEntityId).subscribe(
            (data) => {
                this.getEntityByFeatureId();
            },
            (error) => {

            }
        );
    }


    // deleteScreenPopup() {
    //     this.deletescreenPopup = 'none';
    //     this.screenService.deleteScreen(this.selectedScreenId).subscribe(
    //         (data) => {
    //             this.getScreenByFeatureId();

    //         },
    //         (error) => {

    //         }
    //     );
    // }

    deleteScreenByIdPopup() {
        this.deletescreenPopup = 'none';
        this.screenService.deleteScreenById(this.selectedScreenId).subscribe(
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
