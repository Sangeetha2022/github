import { Component, OnInit } from '@angular/core';
import { Iscreen } from './interface/screen';
import { ActivatedRoute, Router } from '@angular/router';
import yaml from 'js-yaml';

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
import { NgxSpinnerService } from 'ngx-spinner';
import { Brodcastservice } from '../../broadcast.service';
import { ProjectsService } from  '../../projects/projects.service'
import { Observable } from 'rxjs';
import { ApiService } from '../../config/api.service';

// import { FormBuilder , FormGroup ,Validators} from `@angular/forms`;



@Component({
    selector: 'app-feature-details',
    templateUrl: './feature-details.component.html',
    styleUrls: ['./feature-details.component.scss']
})
export class FeatureDetailsComponent implements OnInit {

    public connectorsForm: FormGroup;
    public submitted = false;
    public isService = false;

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
    public logId = sessionStorage.getItem('LogId');
    public quickConnectorsFlows: any = [];
    public customConnector: Boolean;
    public isAddConnector: Boolean;
    public selectedHeaders: String;

    public quickConnectors: any = {
        name: '',
        description: '',
        endPointUrl: '',
        api_key: {
            key: '',
            value: '',
        },
        apiMethods: '',
        isQueryParams: '',
        service: '',
        dataBaseName: '',
        connectorsType: '',
        properties: [{
            key: '',
            value: '',
            isDynamicParams: false,
        }]
    };
    public paramsType: any;
    public isStaticOrDynamic: any = [];
    public quickConnectorsURL: any;
    public apiMethodArray: any = ['select Apis', 'post', 'get', 'put', 'delete'];
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
    public selectedFlowObj: any;
    quickConnectorName: string;
    public quickConnectorId: any;
    public quickConnectorsService: any;
    public modifyComponents: any = [];
    public pushProperties: any[] = [];
    flowEntityId: any;
    public connectorsType: String;
    modifyConnectorsId: any;
    public showTreePopup: boolean;
    modifyEntityId: any;
    flowEntityName: any;
    public dynamicParamsValue: any;
    public staticParamsValue: any;
    public selectEntity: any;
    public selectedFiles: any;
    public currentFileUpload:any;
    public originalFileData: any;

    constructor(
        private projectComponentService: ProjectComponentService,
        private screenService: ScreenDesignerService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private flowTreeService: FlowTreeService,
        private dataService: DataService,
        private dialog: MatDialog,
        private spinner: NgxSpinnerService,
        private brodcastservice: Brodcastservice,
        private projectService: ProjectsService,
        private api: ApiService,
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
                console.log('dataservice--response --->>', Object.keys(data).length);
                if (Object.values(data).length !== 0) {
                    console.log('i am data---response --<>>', data);
                    this.flowEntityId = data._id;
                    this.flowEntityName = data.name;
                    this.displayModelTree = 'none';
                    this.displayModel = 'block';
                }
            }
        });
        this.getFeatureById();
        this.getScreenByFeatureId();
        this.getEntityByFeatureId();
    }

    get f() { return this.connectorsForm.controls; }


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

            }
        );
    }

    getScreenByFeatureId() {
        this.spinner.show();
        this.screenService.getScreenByFeatureId(this.feature_id, this.logId).subscribe(
            (screenData) => {
                this.spinner.hide();
                this.screenDetails = screenData.body;
            },
            (error) => {
                console.log('cannot able to get the screen based on featureId  ', error);
            }
        );
    }

    getEntityByFeatureId() {
        this.spinner.show();
        // this.projectComponentService.getEntityByFeatureId(this.feature_id, this.logId).subscribe(
        //     (entityData) => {
        //         this.spinner.hide();
        //         this.featureEntityDetails = entityData.body;
        //         this.isPrimaryEntityPresent = this.featureEntityDetails.some(x => x.entity_type === 'primary');
        //     },
        //     (error) => {

        //     }
        // );
        //Added secondray entity in feature
        this.projectComponentService.getAllEntityByFeatureId(this.feature_id, this.logId).subscribe(
            (entityData) => {
                this.spinner.hide();
                this.featureEntityDetails = entityData.body.body;
                this.isPrimaryEntityPresent = this.featureEntityDetails.some(x => x.entity_type === 'primary');
            },
            (error) => {

            }
        );
    }

    getProjectFeatureFlows() {
        this.spinner.show();
        this.projectComponentService.getProjectFeatureFlows(this.featureInfo.flows, this.logId).subscribe(response => {
            const temp = [];
            if (response.body) {
                this.spinner.hide();
                this.flowInFeatureRowData = response.body;
            }
        }, error => {
            console.error(error);
        });
    }

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
        this.spinner.show();
        this.projectComponentService.saveManyProjectFlow(projectFlowList, this.logId).subscribe(
            response => {
                if (response.body) {
                    // get only the specific values
                    this.spinner.hide();
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
        this.projectComponentService.updateFeature(this.featureInfo, this.logId).subscribe(
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
        this.spinner.show();
        this.projectComponentService.deleteProjectFlow(projectFlow, this.logId).subscribe(
            data => {
                this.getProjectFeatureFlows();
                this.getAllFlows();
                this.spinner.hide();
            },
            error => {
                console.log('cannot able to delete the projectFlow ', error);
            });
    }


    deleteFlowById(flowId) {
        this.spinner.show();
        this.projectComponentService.deleteFlowById(flowId, this.logId).subscribe(
            data => {
                this.deleteConnectorPopup = 'none';
                this.getProjectFeatureFlows();
                this.getAllFlows();
                this.getEntityByFeatureId();
                this.spinner.hide();
            },
            error => {
                console.log('cannot able to delete the projectFlow ', error);
            });
    }

    staticParams(index) {
        console.log('this..-->');
        // this.isValueParams = false;

    }

    dynamicParams(index) {
        delete this.quickConnectors.properties[index].value;
        console.log('delete-->', this.quickConnectors.properties);
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
                console.log('e---modify->>>', connector);
                if (connector.isCustom === true) {
                    console.log('modify--connectors--', connector._id);
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
            this.selectedFlowObj = e.rowData;
            this.modifyComponents = e.rowData.components;
            this.quickConnectorName = 'quickConnectors';
            this.displayModel = 'block';
        }
    }

    queryParamsMethod() {
        this.isAddConnector = true;
    }

    addProperties(): void {
        console.log('this.quic', this.quickConnectors.properties);
        this.quickConnectors.properties.push({
            key: '',
            value: '',
            isDynamicParams: false
        });
    }

    quickTest() {
        console.log('this--is --selected-->', this.quickConnectors);
        const tempArrykeyValue = [];
        this.quickConnectors.properties.map(({ key, value }) => {
            const queryKeyValue = `${key}=${value}`;
            tempArrykeyValue.push(queryKeyValue);
        });
        const convertStr = tempArrykeyValue.toString();
        const keyAndValue = convertStr.replace(/,/g, '&');
        // tslint:disable-next-line: max-line-length
        this.quickConnectorsURL = `${this.quickConnectors.endPointUrl}?${this.quickConnectors.api_key.key}=${this.quickConnectors.api_key.value}&${keyAndValue}&file_type=json`;
        this.projectComponentService.quickTestcustomConnectors(this.quickConnectors, this.logId).subscribe(response => {
            if (response) {
                console.log('result000=--', response)
                this.showTreePopup = true;
                this.displayModelTree = 'block';
                this.displayModel = 'none';
                const allResponse = JSON.parse(response.body);
                this.getEntityByFeatureId();
                this.flowTreeService.quickTest(allResponse, this.quickConnectors.dataBaseName);
            }
        });
    }


    removeProperties(i) {
        this.quickConnectors.properties.splice(i, 1);
    }

    connectorServices() {
        if (this.modifyConnectorsId !== undefined && this.modifyConnectorsId !== null) {
            this.showAlert();
        }
    }

    showAlert() {
        this.submitted = false;
        this.displayModel = 'none';
        this.customConnector = false;
        this.deleteConnectorPopup = 'block';
    }

    // quickConnectorsMethod(event) {
    //     this.connectorsType = event;
    // }
    // defaultConnectorsMethod(event) {
    //     this.connectorsType = event;
    // }
    // customConnectorsMethod(event) {
    //     this.connectorsType = event;
    // }F

    addExternalConnector() {
        console.log('Add externel--connector-id-->', this.modifyConnectorsId);
        if (this.modifyConnectorsId !== undefined && this.modifyConnectorsId !== null) {
            this.getQuickConnectorId(this.modifyConnectorsId);
        } else {
            this.quickConnectors.name = '';
            this.quickConnectors.description = '';
            this.quickConnectors.endPointUrl = '';
            this.quickConnectors.api_key.key = '';
            this.quickConnectors.api_key.value = '';
            this.quickConnectors.apiMethods = '';
            this.quickConnectors.properties[0].key = '';
            this.quickConnectors.properties[0].value = '';
            this.quickConnectors.properties[0].isDynamicParams = false;
            this.quickConnectors.isQueryParams = '';
            this.quickConnectors.dataBaseName = '';
            this.quickConnectors.service = '';
            this.quickConnectors.connectorsType = '';
            this.customConnector = true;
            this.quickConnectors.connectorsType = '';
        }
    }
    getQuickConnectorId(connector_id) {
        console.log('quick conntors --->', connector_id);
        this.projectComponentService.getConnectorById(connector_id, this.logId).subscribe(response => {
            console.log('quick connectoes--->', response.body)

            if (response) {
                this.quickConnectors = response.body;
                this.quickConnectors.dataBaseName = response.body.entityName;
                this.modifyEntityId = response.body.entity_id;
                this.customConnector = true;
                this.isAddConnector = true;
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
            this.quickConnectorsType();
        }
    }

    //gepfiledatasend
    selectFile(event: any) {
        this.selectedFiles = event.target.files;
    }
    public filesave = false;
    uploadFile() {
        this.currentFileUpload = this.selectedFiles.item(0);
        this.gepfileToUpload(this.currentFileUpload);
        setTimeout(() => {
            this.filesave = true;
        },100)
    }
    //gepfilemanager
    public resultId: any;
    gepfileToUpload(fileToUpload: File){
    //    this.projectComponentService.upload(fileToUpload).subscribe((res) => {
    //        console.log("resposne to file upload",res);
    //    })
        const endpoint = this.projectComponentService.gepfileToUpload();
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        console.log('fileToUpload +++', formData);
        fetch(endpoint, {
            method: 'POST',
            body: formData
        }).then( res => res.json()
        ).then((resultData) => {
            console.log("response send data from file upload ",resultData.resp);
            console.log("response send data from file upload ",resultData.resp._id);
            this.resultId = resultData.resp._id;
            this.originalFileData = resultData.originalFileData;
        })
        // return this.api.post(endpoint, formData)

    }
    
    quickConnectorsType() {
        const tempObj = {
            url: this.quickConnectorsURL,
            isCustom: true,
            properties: this.quickConnectors.properties,
            name: this.quickConnectors.name,
            description: this.quickConnectors.description,
            entity_id: this.flowEntityId,
            entityName: this.flowEntityName,
            connectors: this.quickConnectorName,
            endPointUrl: this.quickConnectors.endPointUrl,
            apiMethods: this.quickConnectors.apiMethods,
            service: this.quickConnectors.service,
            api_key: this.quickConnectors.api_key,
            // isQueryParams: this.quickConnectors.isQueryParams,
            connectorsType: this.quickConnectors.connectorsType,
            externalConnector: [this.resultId],
            project_id: this.project_id,
            original_file_data: this.originalFileData,
            feature_id: this.feature_id,
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
        // tempObj.properties.push(this.quickConnectors.properties);
        console.log('temp==obj--', tempObj);
        this.projectComponentService.quickConnectors(tempObj, this.logId).subscribe(response => {
            console.log("response body",response.body,response.body._id);
            this.quickConnectorId = response.body._id;
            const tempData = {
                connectorId: this.quickConnectorId,
                flowComponentId: '',
            };
            let isConnectorPresent = false;
            const adminsObject = {
                admin_need_object: {
                    administration_type: 'connector',
                    name: response.body.name,
                    id: this.quickConnectorId
                }
            }
            this.getEntityByFeatureId();
            this.projectService.updateProjectById(this.project_id, adminsObject, this.logId).subscribe(res => {

            })
            if (response.body.service === 'backEnd') {
                this.modifyComponents.map(async (backEnd) => {
                    if (backEnd.name === 'GpExpressService') {
                        tempData.flowComponentId = backEnd._id;
                        this.updateFlowCompMicroFlowConnectorById(tempData);
                    }
                });
            } else if (response.body.service === 'frontEnd') {
                this.modifyComponents.map(frontEnd => {
                    if (frontEnd.name === 'GpAngularService' || frontEnd.name === 'GpIonicAngularService') {
                        isConnectorPresent = true;
                        tempData.flowComponentId = frontEnd._id;
                        this.updateFlowCompMicroFlowConnectorById(tempData);
                    }

                });
            } else {
                this.dataService.FlowSaveEntity('');
                this.submitted = false;
                this.displayModel = 'none';
                this.customConnector = false;
            }
            if (isConnectorPresent && this.selectedFlowObj) {
                // tslint:disable-next-line:max-line-length
                console.log('selectedFlowObject details are ------------   ', this.selectedFlowObj, ' ---id---  ', this.selectedFlowObj._id);
                const componentList = this.modifyComponents.filter(x => x.type === 'client');
                console.log('selected componnetList are ----  ', componentList);
                if (componentList && componentList.length > 0) {
                    const componentIDs = componentList.map(({ _id }) => _id);
                    console.log('fitered id only infos are ---  ', componentIDs);
                    this.updateProjectFlowComponents(this.selectedFlowObj._id, componentIDs);
                }
            }
        });
    }

    updateProjectFlowComponents(projectFlowID, projectFlowComponents) {
        this.projectComponentService.updateProjectFlowComponents(projectFlowID, projectFlowComponents, this.logId)
            .subscribe(
                data => { },
                error => {
                    console.error('cannot able to update the project flow components details');
                });
    }


    updateFlowCompMicroFlowConnectorById(data) {
        this.projectComponentService.updateFlowCompConnectorById(data, this.logId).subscribe(response => {
            if (response) {
                console.log('may i coming----')
                this.submitted = false;
                this.modifyConnectorsId = null;
                this.displayModel = 'none';
                this.customConnector = false;
                this.dataService.FlowSaveEntity('');
                this.isAddConnector = false;
                this.getProjectFeatureFlows();
                this.getEntityByFeatureId();
                this.getModifyConnector();
                this.getAllFlows();
            }
        }, (error) => {
            console.log('error--->>', error);
        }
        );
    }

    getModifyConnector() {
        this.projectComponentService.getModifyConnectors(this.logId).subscribe(result => {
            console.log('gettt---', result);
        }, (error) => {
            console.log('error---', error);
        }
        );
    }

    updateModifyConnectors() {
        if (this.quickConnectors !== undefined) {
            if (this.quickConnectors.properties[0].isDynamicParams === true) {
                const tempArrykeyValue = [];
                this.quickConnectors.properties.map(({ key, value }) => {
                    console.log('keyy--', key);
                    console.log('value =--', value);
                    const queryKeyValue = `${key}=$\{${key}}`;
                    tempArrykeyValue.push(queryKeyValue);
                });
                const convertStr = tempArrykeyValue.toString();
                const keyAndValue = convertStr.replace(/,/g, '&');
                // tslint:disable-next-line: max-line-length
                this.quickConnectors.url = `${this.quickConnectors.endPointUrl}?${this.quickConnectors.api_key.key}=${this.quickConnectors.api_key.value}&${keyAndValue}&file_type=json`;
                this.modifyFlowUpdate();
            } else {
                this.modifyFlowUpdate();
            }
        }
    }

    public modifyFlowUpdate() {
        this.projectComponentService.updateQuickConnectorsById(this.quickConnectors, this.logId).subscribe(result => {
            if (result) {
                this.flowCancel();
            }
            console.log('result---update--', result);
        }, (error) => {
            console.log('error --', error);
        }
        );
    }


    flowCancel() {
        this.submitted = false;
        this.displayModel = 'none';
        this.customConnector = false;
        this.isAddConnector = false;
        this.modifyConnectorsId = null;
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
        this.router.navigate(['/entity-field'], {
            queryParams: {
                entityId: entity._id,
                featureId: this.feature_id,
                projectId: this.project_id
            }
        });
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
        this.projectComponentService.Updatefeaturedetailsentity(this.feature_id, this.entitydetails, this.logId)
            .subscribe(featuredetails => {
            });
        this.getFeatureById();
        this.getEntityByFeatureId();


        // this.projectComponentService.updateEntity(entityData, this.logId).subscribe((data) => {
        //     this.getEntityByFeatureId();
        // }, (error) => {
        // });
    }

    saveEntity(entityData) {
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

    updateEntity(entityData) {
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

            }
        );
    }
    deleteConnector() {
        this.deleteFlowById(this.modifyFlows.flowId);

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
        this.brodcastservice.changeFeatureId(this.feature_id);
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
        this.projectComponentService.getAllFeatureDetailsByFeatureId(this.feature_id, this.logId).subscribe(data => {
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
        this.projectComponentService.getAllEntity(this.logId).subscribe(data => {
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
        this.selectEntity = entity;
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
        this.screenService.deleteScreenById(this.selectedScreenId, this.logId).subscribe(
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
