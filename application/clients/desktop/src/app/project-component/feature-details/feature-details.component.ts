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

const URL = 'http://localhost:3006/feature/details/addfile';

@Component({
    selector: 'app-feature-details',
    templateUrl: './feature-details.component.html',
    styleUrls: ['./feature-details.component.scss']
})
export class FeatureDetailsComponent implements OnInit {
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
        id: '',
        flow: '',
        action_on_data: '',
        description: '',
        feature_id: '',
        label: '',
        name: '',
        type: 'basic',
        create_with_default_activity: 1,
    };
    public entity: IEntity = {
        name: '',
        description: '',
        project_id: '',
        feature_id: '',
        created_by: '',
        last_modified_by: '',
        updated_at: new Date(),
        field: []
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

    public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
    // This is the default title property created by the angular cli. Its responsible for the app works
    title = 'app works!';

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
            { headerName: 'Action', field: 'action_on_data' },


        ];
        this.rowSelectionFlow = 'multiple';
        this.defaultColFlow = {
            sortable: true,
            filter: true
        };
        this.columnDefs = [
            {
                headerName: 'Name', field: 'name',
                checkboxSelection: true
            },
            { headerName: 'Label', field: 'label' },
            { headerName: 'Description', field: 'description' },
            { headerName: 'Action', field: 'action_on_data' },
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
        this.getSelectedProject();
        this.getScreenDetailsByFeatureId();
        this.getFeatureEntityByFeatureId();
        this.getEntityByFeatureAndprojectId();
        this.getProjectFeature();
        this.getAllFlows();
        this.getScreenByProjectAndFeatureId();
        // this.getAllScreen();
        // this.getAllFeatureFlows();
        // this.getAllEntity();
        // var doc = yaml.safeLoad(this.readTextFile('assets/files/ticketing-system.yaml'))
        // this.formDatafromYAML(doc);
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
    upload = () => {

        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        // overide the onCompleteItem property of the uploader so we are
        // able to deal with the server response.
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        };
    }

    removeRow(e) {
        console.log('adajdgiyfgsaiyfgdsa', e)
        this.featureDetailsService.deleteFlowId(e.rowData._id).subscribe(delData => {
            if (delData) {
                this.getProjectFeature();
                this.showFeatureFlowComp = false;
            }
        });
        const rows = e.rowData;

    }
    getSelectedProject() {
        this.dataService.currentProjectInfo.subscribe(
            (data) => {
                this.selectedProject = data;
            }
        );
    }
    getAllFlows() {
        this.flowManagerService.getAllFlows().subscribe((flowData) => {
            //   this.dataFlow = flowData;
            //   console.log('dataFlow', this.dataFlow);
            this.rowData = flowData;
        });
    }

    editScreen(screenId) {
        console.log('screen id are ----- ', screenId);
        this.router.navigate(['/desktopscreen'], { queryParams: { projectId: this.project_id, screenId: screenId } });
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

    getProjectFeature() {
        this.dataService.currentProjectFeatureInfo.subscribe(feature => {
            this.featureData = feature;
            console.log('i am the data', this.featureData);
            this.featureData.forEach(fData => {
                this.selectedFeatureName = fData.name
                console.log('i am the feature data', fData.name);
                if (fData.api_mang_file === null && fData.backed_mang_file === null && fData.front_mang_file === null) {
                    this.featureDetailsService.getAllFeatureFlowByFeatureId(this.feature_id).subscribe(feData => {
                        this.featureFlowRowData = feData;
                    });
                } else {

                    this.featureDetailsService.getAllFeatureDetailsByFeatureId(this.feature_id).subscribe(data => {
                        this.featureDetailsData = data;
                        this.featureDetailsData.map((featureData) => {
                            this.allFeatureFlows.push(featureData.flow);
                        });
                        this.featureFlowRowData = this.allFeatureFlows;
                    });
                }

            });
        });
    }

    selectFlowComponent() {
        this.selectedFlowCmpnt = this.flowCompGrid.getSelectedRows();
        if (this.selectedFlowCmpnt[0].component_name !== null) {
        }
    }


    openFeatureFlowDialog(id): void {
        this.featureFlows.feature_id = id;
        this.displayFeatureFlowModal = 'block';
    }

    closeFeatureFlowModal() {
        this.displayFeatureFlowModal = 'none';
    }


    saveFeatureFlow() {
        this.featureFlow = this.selectedFlow;
        this.featureFlow.forEach(featureData => {
            this.featureFlows.flow = featureData._id;
            this.featureFlows.name = featureData.name;
            this.featureFlows.description = featureData.description;
            this.featureFlows.label = featureData.label;
            this.featureFlows.action_on_data = featureData.action_on_data;
            this.projectComponentService.addFeatureFlow(this.featureFlows).subscribe(flowData => {
                if (flowData) {
                    this.closeFeatureFlowModal();
                    this.getProjectFeature();
                }
            });
        });
    }

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
    // action_on_data: data1,
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
        });

    }

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

    // getAllFeatureFlows() {
    // this.showFeatureFlow = true;
    // this.showFeatureFlowComponent = false;
    // this.featureDetailsService.getAllFeatureFlowByFeatureId(this.featureId).subscribe(data => {
    // this.allFeatureFlows = data;
    // });
    // }

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
            },
            (error) => {

            }
        );
    }


    openDialog(isSaveOption, objectValue): void {
        let dialogDataValue;
        if (isSaveOption) {
            dialogDataValue = {};
        } else {
            dialogDataValue = objectValue;
        }
        const dialogRef = this.dialog.open(PopupModelComponent, {
            width: '250px',
            data: dialogDataValue
        });

        dialogRef.afterClosed().subscribe(entityData => {
            this.entity.project_id = this.project_id;
            this.entity.feature_id = this.feature_id;
            this.entity.name = entityData.name;
            this.entity.description = entityData.description;
            if (entityData !== undefined) {
                if (objectValue === null) {
                    this.projectComponentService.saveFeatureEntity(this.entity).subscribe(feature_entity => {
                        console.log(feature_entity);
                    });
                    this.saveEntity(this.entity);
                } else {
                    dialogDataValue.name = entityData.name;
                    dialogDataValue.description = entityData.description;
                    this.updateEntity(dialogDataValue);
                }
            }
        });

    }

    editEntity(entity) {
        this.openDialog(false, entity);
    }

    GoToDesigner() {
        this.router.navigate(['/desktopscreen'], { queryParams: { projectId: this.project_id, featureId: this.feature_id } });
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

    selectedFeatureFlow(event) {
        this.selectedFlow = this.featureFlowGrid.getSelectedRows();
        console.log(this.selectedFlow)
        if (this.selectedFlow.length === 0) {
            this.showFeatureFlowComp = false;
            this.showFeatureFlowComponent = false;

        }
        if (this.selectedFlow.length !== 0) {
            if (this.selectedFlow[0].flow === undefined) {
                this.featureDetailsService.getFeatureFlowCompByFlowId(this.selectedFlow[0]._id).subscribe(data => {
                    this.showFeatureFlowComponent = true;
                    this.rowFlowCompData = data.flow_comp_seq;

                });
            }

            if (this.selectedFlow[0].flow !== undefined) {
                this.componentFlowsService.getFlowSequence(this.selectedFlow[0].flow).subscribe((data) => {
                    if (data) {
                        console.log('dlsoudhoidshifhdi');
                        if (data.flow_comp_seq !== null) {
                            this.showFeatureFlowComp = true;
                            this.flow_comp = data.flow_comp_seq;
                        }
                    }
                });
            }
        }
    }




    selectedFeatureEntityData() {
        this.selectedFeatureEntity = this.featureEntityDataGrid.getSelectedRows();
        if (this.selectedFeatureEntity.length !== 0) {
            const id = this.selectedFeatureEntity[0]._id;
            this.featureEntity = this.selectedFeatureEntity[0].field;
            this.showFeatureEntity = true;
        }

    }
}
