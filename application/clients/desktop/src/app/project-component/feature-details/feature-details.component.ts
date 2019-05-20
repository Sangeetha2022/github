import { Component, OnInit } from '@angular/core';
import { FeatureDetailsService } from './feature-details.service';
import { DataService } from 'src/shared/data.service';
import { Iscreen } from './interface/screen';
import { Route, ActivatedRoute, Router } from '@angular/router';
import yaml from 'js-yaml';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { PopupModelComponent } from '../popup-model/popup-model.component';
import { MatDialog } from '@angular/material';
import { ProjectComponentService } from '../project-component.service';
import { IEntity } from '../interface/Entity';
import { ScreenDesignerService } from 'src/app/screen-designer/screen-designer.service';
import { ComponentFlowsService } from 'src/app/component-flows/component-flows.service';
import { IFlow } from 'src/app/flow-manager/interface/flow';
import { FlowManagerService } from 'src/app/flow-manager/flow-manager.service';
import { IFeatureFLow } from '../interface/FeatureFlow';
import { ButtonRendererComponent } from '../entity-field/rendered/button-renderer/button-renderer.component';
import { IFeatureFlowComp } from './interface/FeatureFlowComponents';
import { ScreenPopupComponent } from '../screen-popup/screen-popup.component';

const URL = 'http://localhost:3006/feature/details/addfile';

@Component({
    selector: 'app-feature-details',
    templateUrl: './feature-details.component.html',
    styleUrls: ['./feature-details.component.scss']
})
export class FeatureDetailsComponent implements OnInit {

    // new flow var
    flowList: any[] = [];
    featureInfo: any;

    // old
    screens: any = [];
    columnDefs: any = [];
    featureName: any;
    feature_id: String;
    project_id: String;
    gridColumnApi;
    screenName: String;
    description: String;
    showFeatureFlowComp: boolean;
    displayFeatureFlowModal: String = 'none';
    featureDetailsData: any = [];
    featureEntityData: any = [];
    featureEntity: any = [];
    frameworkComponents: { buttonRenderer: any; };
    displayModel: String = 'none';
    featureScreenName: any = [];
    columnFeatureDefs: any = [];
    selectedProject: any = [];
    columnFeatureEntityData: any = [];
    columnFeatureEntity: any = [];
    featureEntityDetails: any = [];
    rowFlowCompData: any = [];
    selectedFlowCmpnt: any = [];
    featureFlowRowData: any = [];
    rowData: any = [];
    distinctFeatureDetails: any = [];
    columnFlow: any = [];
    featureFlowId: String;
    selectedFeatureName: String;
    fcompColDefs;
    flowCompGrid;
    gridApi;
    rowSelectionFlow;
    featureId: any;
    featureData: any = [];
    rowSelection: String;
    defaultColDef: any;
    defaultColFlow: any;
    screenDetails: any = [];
    flow_comp: any = [];
    showFeatureFlow: boolean;
    featureFlow: any = [];
    public screenData: Iscreen = {
        screenName: '',
        description: '',
        featureName: '',

    };
    public featureFlows: IFeatureFLow = {
        name: '',
        label: '',
        description: '',
        type: '',
        components: [],
        actionOnData: '',
        createWithDefaultActivity: 0
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
    public featureFlowComp: IFeatureFlowComp = {
        feature_id: '',
        flow: '',
        flow_comp_seq: []
    };
    showFeatureFlowComponent: boolean;
    allFeatureFlows: any = [];
    selectedFlow: any = [];
    selectedFeatureEntity: any = [];
    showFeatureEntity: boolean;
    featureFlowGrid;
    featureFlowCompGrid;
    featureEntityDataGrid;
    featureEntityGrid;
    fName: any;
    screenArray: any = [];
    finalArray: any = [];

    public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
    // This is the default title property created by the angular cli. Its responsible for the app works
    isPrimaryEntityPresent: boolean;
    deletePopup: string;
    selectedEntityId: any;
    flowInFeatureColumn: any[];

    constructor(
        private featureDetailsService: FeatureDetailsService,
        private projectComponentService: ProjectComponentService,
        private dataService: DataService,
        private screenService: ScreenDesignerService,
        private componentFlowsService: ComponentFlowsService,
        private route: ActivatedRoute,
        private flowManagerService: FlowManagerService,
        private router: Router,
        private dialog: MatDialog
    ) {

        this.frameworkComponents = {
            buttonRenderer: ButtonRendererComponent,
        };

        this.columnFlow = [
            {
                headerName: 'Name', field: 'name',
                checkboxSelection: true
            },
            { headerName: 'Label', field: 'label' },
            { headerName: 'Description', field: 'description' },
            { headerName: 'Action', field: 'actionOnData' },


        ];
        this.rowSelectionFlow = 'multiple';
        this.defaultColFlow = {
            sortable: true,
            filter: true
        };
        this.flowInFeatureColumn = [
            {
                headerName: 'Name', field: 'name',
                checkboxSelection: true
            },
            { headerName: 'Label', field: 'label' },
            { headerName: 'Description', field: 'description' },
            { headerName: 'Action', field: 'actionOnData' },
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
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            console.log('project and featureId are 111 ----- ', params);
            if (params.featureId !== undefined && params.featureId !== null) {
                this.feature_id = params.featureId;
            }
            if (params.projectId !== undefined && params.projectId !== null) {
                this.project_id = params.projectId;
            }
        });
        // new
        this.getFeatureById();

        // old
        // this.getSelectedProject();
        // this.getScreenDetailsByFeatureId();
        // this.getFeatureEntityByFeatureId();
        // this.getEntityByFeatureAndprojectId();
        // this.getProjectFeature();
        // this.getAllFlows();
        // this.getScreenByProjectAndFeatureId();
        // this.getAllFeature();
        // this.getAllScreen();
        // this.getAllFeatureFlows();
        // this.getAllEntity();
        // var doc = yaml.safeLoad(this.readTextFile('assets/files/ticketing-system.yaml'))
        // this.formDatafromYAML(doc);
    }

    getFeatureById() {
        this.projectComponentService.getFeatureById(this.feature_id).subscribe(
            feature => {
                console.log('@@@@ getfeatureBy id --------  ', feature);
                this.featureInfo = feature;
                this.getAllFlows();
                // this.featureFlowRowData = feature.flows;
            },
            error => {

            }
        );
    }

    getAllFlows() {
        this.projectComponentService.getAllFlows().subscribe(
            flows => {
                console.log('all flows are ------ ', flows);
                console.log('flows definec in featuers are --- ', this.featureInfo.flows);
                const flowsInFeature = [];
                if (flows) {
                    if (this.featureInfo.flows.length === 0) {
                        this.rowData = flows;
                    } else {
                        this.featureInfo.flows.forEach(flowElement => {
                            console.log('feature flows are ---- ', flowElement);
                            const index = flows.findIndex(x => x._id === flowElement);
                            if (index > -1) {
                                // alert('splice the exist flwos');
                                flowsInFeature.push(flows[index]);
                                flows.splice(index, 1);
                            }
                        });
                        this.rowData = flows;
                        console.log('after dsf esfds=====  ', flowsInFeature);
                        this.featureFlowRowData = flowsInFeature;
                    }
                }
            },
            error => {
                console.log('all flows error are ----- ', error);
            }
        );
    }


    onFlowGridReady(params) {
        console.log('onFlowGridReady', params);
        this.featureFlowGrid = params.api;
        this.featureFlowGrid.sizeColumnsToFit();
    }

    onFlowCompGridReady(params) {
        this.featureFlowCompGrid = params.api;
        this.featureFlowCompGrid.sizeColumnsToFit();
    }

    onFeatureEntityDataGridReady(params) {
        this.featureEntityDataGrid = params.api;
        this.featureEntityDataGrid.sizeColumnsToFit();
    }
    onFeatureEntityGridReady(params) {
        this.featureEntityGrid = params.api;
        this.featureEntityGrid.sizeColumnsToFit();
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    }
    // upload = () => {

    //     this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //     // overide the onCompleteItem property of the uploader so we are
    //     // able to deal with the server response.
    //     this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //     };
    // }

    removeRow(e) {
        console.log('remove rows in flows are  ', e);
        // console.log('adajdgiyfgsaiyfgdsa', e);
        // this.featureDetailsService.deleteFlowId(e.rowData._id).subscribe(delData => {
        //     if (delData) {
        //         // this.getProjectFeature();
        //         this.showFeatureFlowComp = false;
        //     }
        // });
        // const rows = e.rowData;

    }
    getSelectedProject() {
        this.dataService.currentProjectInfo.subscribe(
            (data) => {
                this.selectedProject = data;
            }
        );
    }
    // getAllFlows() {
    //     this.flowManagerService.getAllFlows().subscribe((flowData) => {
    //         //   this.dataFlow = flowData;
    //         //   console.log('dataFlow', this.dataFlow);
    //         this.rowData = flowData;
    //     });
    // }

    editScreen(screenId, screenType) {
        console.log('screen id are ----- ', screenId, screenType);
        this.router.navigate(['/desktopscreen'], {
            queryParams: {
                projectId: this.project_id, screenId: screenId,
                screenType: screenType
            }
        });
    }

    deleteScreen(screenId) {
        this.screenService.deleteScreen(screenId).subscribe(
            (data) => {
                this.getScreenByProjectAndFeatureId();
            },
            (error) => {

            }
        );
    }

    // getProjectFeature() {
    //     this.dataService.currentProjectFeatureInfo.subscribe(feature => {
    //         this.featureData = feature;
    //         const isMyObjectEmpty = Object.keys(this.featureData).length;
    //         console.log('i am the data', this.featureData, isMyObjectEmpty);
    //         if (Object.keys(this.featureData).length > 0) {
    //             this.featureData.forEach(fData => {
    //                 this.selectedFeatureName = fData.name;
    //                 console.log('i am the feature data', fData.name);
    //                 if (fData.api_mang_file === null && fData.backed_mang_file === null && fData.front_mang_file === null) {
    //                     this.featureDetailsService.getAllFeatureFlowByFeatureId(this.feature_id).subscribe(feData => {
    //                         this.featureFlowRowData = feData;
    //                     });
    //                 } else {

    //                     this.featureDetailsService.getAllFeatureDetailsByFeatureId(this.feature_id).subscribe(data => {
    //                         this.featureDetailsData = data;
    //                         this.featureDetailsData.map((featureData) => {
    //                             this.allFeatureFlows.push(featureData.flow);
    //                         });
    //                         this.featureFlowRowData = this.allFeatureFlows;
    //                     });
    //                 }
    //             });
    //         }
    //     });

    // }

    selectFlowComponent() {
        this.selectedFlowCmpnt = this.flowCompGrid.getSelectedRows();
        if (this.selectedFlowCmpnt[0].component_name !== null) {
        }
    }


    openFeatureFlowDialog(id): void {
        // this.featureFlows. = id;
        console.log('open feature flow');
        this.displayFeatureFlowModal = 'block';
    }

    closeFeatureFlowModal() {
        this.displayFeatureFlowModal = 'none';
    }

    saveFlowsInFeature() {
        console.log('save flows ---- ', this.selectedFlow);
        this.selectedFlow.forEach(flow => {
            this.featureInfo.flows.push(flow._id);
        });
        this.projectComponentService.updateFeature(this.featureInfo).subscribe(
            feature => {
                this.featureInfo = feature;
                this.displayFeatureFlowModal = 'none';
                this.featureFlowRowData = this.featureInfo.flows;
                this.getAllFlows();
            },
            error => {

            }
        );
    }


    // saveFeatureFlow() {
    //     console.log('selected featureflow are ------ ', this.featureFlow);
    //     this.featureFlow = this.selectedFlow;
    //     console.log('=======', this.selectedFlow);
    //     this.featureFlow.forEach(featureData => {
    //         // this.featureFlows.flow = featureData._id;
    //         // this.featureFlows.name = featureData.name;
    //         // this.featureFlows.description = featureData.description;
    //         // this.featureFlows.label = featureData.label;
    //         // this.featureFlows.actionOnData = featureData.actionOnData;
    //         this.projectComponentService.addFeatureFlow(this.featureFlows).subscribe(flowData => {
    //             if (flowData) {
    //                 this.componentFlowsService.getFlowSequence(flowData.flow).subscribe((data) => {
    //                     this.featureFlowComp.feature_id = this.feature_id;
    //                     this.featureFlowComp.flow = flowData._id;
    //                     this.featureFlowComp.flow_comp_seq = data.flow_comp_seq;
    //                     this.featureFlowComp.flow_comp_seq.forEach(feData => {
    //                         delete feData._id;
    //                         delete feData.created_date;
    //                         delete feData.updated_date;
    //                     });
    //                     this.featureDetailsService.saveFeatureFlowComponent(this.featureFlowComp).subscribe(fData => {
    //                         console.log('=======', fData);
    //                     })
    //                 });


    //                 this.closeFeatureFlowModal();
    //                 this.getProjectFeature();
    //             }
    //         });
    //     });
    // }

    onSelectionChanged() {
        this.selectedFlow = this.gridApi.getSelectedRows();
    }
    // formDatafromYAML = (doc) => {
    // console.log("== >> am coming here ---======>>>> ", doc);
    // let allSchema = []
    // let allFlows = []
    // let flowArray = Object.keys(doc).map((data, index) => {
    // if (data !== "dns" && data !== "db") {
    // let flowArray1 = Object.keys(doc[data]).map((data1, i) => {
    // if (data1 !== "schema" && data1 !== "handler") {
    // console.log("====>>>data needed ----->>>>>", doc[data][data1]);
    // let dataTopush = {
    // actionOnData: data1,
    // create_with_default_activity: 1,
    // description: doc[data][data1]["description"],
    // label: data1,
    // name: doc[data][data1]["flow"],
    // screenName: "Ticket Creation",
    // type: "basic"
    // }
    // this.allFeatureFlows.push(dataTopush)
    // return data1
    // }
    // })
    // allSchema.push({ name: data, model: doc[data]["schema"] })

    // console.log("== >> am coming here flowArray1---=ffffffffffff=====>>>> ", allSchema);
    // console.log("== >> am coming here allFlows---=ffffffffffff=====>>>> ", this.allFeatureFlows);
    // return data
    // } else {
    // return false
    // }
    // })
    // console.log(" flow array 0pp p- -- - = = = > ", flowArray)
    // }

    getEntityByFeatureAndprojectId() {
        this.projectComponentService.getEntityByFeatureAndprojectId(this.project_id, this.feature_id).subscribe(data => {
            this.featureEntityDetails = data;
            this.isPrimaryEntityPresent = this.featureEntityDetails.some(x => x.entity_type === 'primary');
            console.log('get all entities are ---- ', this.featureEntityDetails, '  ', this.isPrimaryEntityPresent);
        });

    }
    // getAllFeature() {
    //     this.projectComponentService.getAllFeatureByProjectId(this.project_id).subscribe(data => {
    //         data.forEach(fData => {
    //             this.screenService.getScreenByFeature(fData.feature_id._id).subscribe(data => {
    //                 console.log('======', data);
    //                 if (data.length !== 0) {
    //                     this.fName = fData.feature_id.name;
    //                     data.forEach(screen => {
    //                         this.screenArray.push(screen.foldername);
    //                         console.log('======', this.screenArray);
    //                     });
    //                     this.finalArray[this.fName] = this.screenArray;
    //                 }
    //             });

    //         });
    //         console.log('====== final', this.finalArray);
    //     });
    // }
    getScreenByProjectAndFeatureId() {
        console.log('asojdnaojdso');
        this.screenService.getScreenByProjectAndFeatureId(this.project_id, this.feature_id).subscribe(sData => {
            console.log('asojdnaojdso', sData);
            this.screenDetails = sData;
        }, (error) => {
            console.log('something is not working on backend side');
        });
    }

    onFCGridReady(params) {
        this.flowCompGrid = params.api;
        this.flowCompGrid.sizeColumnsToFit();
    }

    editEntityField(entity: IEntity) {
        this.dataService.setEntity(entity);
        this.router.navigate(['/entity-field']);
    }

    saveEntityModel() {
        this.openDialog(true, null);
    }

    readTextFile = (file) => {
        const rawFile = new XMLHttpRequest();
        let allText = null;
        rawFile.open('GET', file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    allText = rawFile.responseText;
                }
            }
        };
        rawFile.send(null);
        return allText;
    }


    saveEntity(entityData) {
        this.entity.name = entityData.name;
        this.entity.description = entityData.description;
        this.entity.project_id = this.project_id;
        this.projectComponentService.createEntity(this.entity).subscribe(
            (data) => {
                if (data) {
                    this.getEntityByFeatureAndprojectId();
                }
                // this.getAllEntityByProjectId();
            },
            (error) => {

            }
        );
    }


    updateEntity(entityData) {
        entityData.updated_at = new Date();
        this.projectComponentService.updateEntity(entityData).subscribe(
            (data) => {
                // this.getAllEntityByProjectId();
                if (data) {
                    this.getEntityByFeatureAndprojectId();
                }
            },
            (error) => {

            }
        );
    }


    openDialog(isSaveOption, objectValue): void {
        const dialogDataValue = {
            savedEntity: {},
            isPrimaryEntityPresent: this.isPrimaryEntityPresent,
        };
        if (isSaveOption) {
            dialogDataValue.savedEntity = {};
        } else {
            dialogDataValue.savedEntity = objectValue;
        }
        const dialogRef = this.dialog.open(PopupModelComponent, {
            width: '350px',
            data: dialogDataValue
        });

        dialogRef.afterClosed().subscribe(entityData => {
            console.log('entity details rae --- ', entityData);
            if (entityData) {
                this.entity.project_id = this.project_id;
                this.entity.feature_id = this.feature_id;
                this.entity.name = entityData.name;
                this.entity.description = entityData.description;
                this.entity.entity_type = entityData.entityType;
                if (entityData !== undefined) {
                    if (objectValue === null) {
                        this.projectComponentService.saveFeatureEntity(this.entity).subscribe(feature_entity => {
                            console.log(feature_entity);
                        });
                        this.saveEntity(this.entity);
                    } else {
                        const tempObj = {
                            name: '',
                            description: '',
                            entity_type: ''
                        };
                        tempObj.name = entityData.name;
                        tempObj.description = entityData.description;
                        tempObj.entity_type = entityData.entityType;
                        this.updateEntity(tempObj);
                    }
                }
            }
        });

    }

    editEntity(entity) {
        this.openDialog(false, entity);
    }

    GoToDesigner() {
        // this.router.navigate(['/desktopscreen'], { queryParams: { projectId: this.project_id, featureId: this.feature_id } });
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


    getFeatureEntityByFeatureId() {
        this.featureDetailsService.getFeatureEntityByFeatureId(this.feature_id).subscribe(data => {
            this.featureEntityData = data;
        });
    }

    getScreenDetailsByFeatureId() {
        this.featureDetailsService.getAllFeatureDetailsByFeatureId(this.feature_id).subscribe(data => {
            this.featureDetailsData = data;
            this.featureDetailsData.map(featureData => {
                this.featureScreenName.push(featureData.flow.screenName);
            });
            const distinct = (value, index, self) => {
                return self.indexOf(value) === index;
            };

            this.distinctFeatureDetails = this.featureScreenName.filter(distinct);

        });
        // this.getAllFeature();
    }

    getAllEntity() {
        this.featureDetailsService.getAllEntity().subscribe(data => {
            this.featureEntityData = data;
        });
    }

    // getFeatureFlowDetails() {

    // this.dataService.currentFeatureFlowIdInfoSource.subscribe(data => {
    // this.featureFlowId = data._id;
    // if (data) {
    // // this.featureDetailsService.getFeatureFlowDetails(this.featureFlowId).subscribe(data => {
    // // this.rowFlowCompData = data.flow_comp_seq;
    // // });
    // }
    // });

    // }

    createScreen() {
        this.featureDetailsService.addScreen(this.screenData).subscribe(data => {
            if (data) {
                this.onCloseHandled();
                // this.getAllScreen();
            }
        });
    }
    // getAllScreen() {
    // this.featureDetailsService.getAllScreen().subscribe(data => {
    // this.screens = data;
    // });
    // }

    openScreenModal() {
        this.displayModel = 'block';
    }
    onCloseHandled() {
        this.displayModel = 'none';
    }

    // selectedFeatureFlow(event) {
    //     this.selectedFlow = this.featureFlowGrid.getSelectedRows();
    //     console.log('=======', this.selectedFlow);
    //     if (this.selectedFlow.length === 0) {
    //         this.showFeatureFlowComponent = false;

    //     }
    //     if (this.selectedFlow.length !== 0) {
    //         console.log('=======', this.selectedFlow[0]._id);
    //         this.featureDetailsService.getFeatureFlowCompByFlowId(this.selectedFlow[0]._id).subscribe(data => {
    //             this.showFeatureFlowComponent = true;
    //             this.rowFlowCompData = data.flow_comp_seq;

    //         });
    //     }
    // }




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
                this.getEntityByFeatureAndprojectId();
            },
            (error) => {

            }
        );
    }
}
