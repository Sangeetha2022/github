import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupModelComponent } from './popup-model/popup-model.component';
import { ProjectComponentService } from './project-component.service';
import { DataService } from '../../shared/data.service';
import { IEntity } from './interface/Entity';
import { IFeature } from './interface/Feature';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IFeatureDetails } from './interface/FeatureDetails';
import { FeatureDetailsService } from './feature-details/feature-details.service';
import { ScreenDesignerService } from '../screen-designer/screen-designer.service';
import { IMenu } from './interface/Menu';
import { MenuBuilderService } from '../menu-builder/menu-builder.service';
import { TreeDragService } from '../menu-builder/tree-drag/tree-drag.service';
import { ProjectsService } from '../projects/projects.service';
import { IFlow } from '../flow-manager/interface/flow';
import { ScreenPopupComponent } from './screen-popup/screen-popup.component';

@Component({
    selector: 'app-project-component',
    templateUrl: './project-component.component.html',
    styleUrls: ['./project-component.component.scss']
})

export class EntityManagerComponent implements OnInit {
    @ViewChild('uiFile') uiFile: ElementRef;
    @ViewChild('serviceFile') serviceFile: ElementRef;
    @ViewChild('apiGatewayFile') apiGatewayFile: ElementRef;
    public Editor = ClassicEditor;
    showUploadFeature: Boolean;
    showImportFeature: Boolean = true;
    showAddFeature: Boolean;
    frontFile: any;
    backendFile: any;
    rowSelection: any;
    menuBuilderDetails: any;
    apiManFile: any;
    showUpdateFeature: Boolean;
    screenFeature: any = [];
    screenName: any = [];
    menuFeatureName: any = [];
    featureScreen: any = [];
    allowImport: Boolean = false;
    selectedExistingFeature: String;
    featureNameandDesc: any = [];
    dataMenu: any;
    featureId: any = [];
    featureData: any = [];
    featureConnectProject: any = [];
    constructedMenu: any = [];
    menuLanguages: any = [];
    // user: any = [];
    project_id: String;
    public features: IFeature = {
        project_id: '',
        feature_id: '',
        // explanation:'',
    };
    selectedOption: string;
    options: string[] = ['Import Feature', 'Upload Feature', 'Create Feature'];
    public featureDetails: IFeatureDetails = {
        id: '',
        name: '',
        description: '',
        api_mang_file: '',
        backed_mang_file: '',
        front_mang_file: '',
        // explanation:'',
    };

    public menuBuilder: IMenu = {
        language: '',
        feature: [],
        project: '',
        menuDetails: [],
        project_languages: [],
        menu_option: false,
    };

    displayModel: any;

    public featureEntityDetails: IFeatureDetails = {
        id: '',
        name: '',
        description: '',
        api_mang_file: '',
        backed_mang_file: '',
        front_mang_file: '',
        // explanation:'',
    };
    panelOpenState = false;
    featureEntityData: any = [];
    featureEntityField: any = [];
    displayFeatureModel = 'none';
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
    createFeatureData: any = [];
    gridColumnApi: any;
    screenId: any = [];
    featureName: any = [];
    menusJson: any = [];
    screenMenuName: any = [];
    gridApi: any;
    screenDetails: any = [];
    projectEntity: any = [];
    selectedFlow: any = [];
    public allEntity: IEntity[] = [];
    public FeatureEntity: any = [];
    public deletePopup: String = 'none';
    deleteFPopup: String = 'none';
    public formData: FormData = new FormData();
    public selectedEntityId: any;
    selectedFeatureId: any;
    projectFeatureData: any = [];
    selectedProject: any;
    selecteddefaultEntity: any;
    featureDetailsData: any = [];
    uniqueScreen: any = [];
    menuFId: String;
    menuFName: String;
    screenMenu: any;
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private projectComponentService: ProjectComponentService,
        private projectService: ProjectsService,
        private menuBuilderService: MenuBuilderService,
        private featureDetailsService: FeatureDetailsService,
        private dataService: DataService,
        private screenService: ScreenDesignerService,
        private route: ActivatedRoute,
        private database: TreeDragService,

    ) {

        // if (this.selectFeature === true) {
        // this.features = { id: '', description: '', name: '', connectProject: this.features.connectProject };
        // }
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.project_id = params.projectId;
        });
        if (this.showImportFeature === true) {
            this.selectedOption = 'Import Feature';
        }
        this.getProjectById();
        this.getSelectedProject();
        this.getProjectDetails();
        this.getScreenByProjectId();
        this.getAllEntityByProjectId();
        // this.getDefaultEntityByProjectId();
        // this.getAllFeature();
        this.getAllFeatureDetails();
        this.getMenuBuilderByProjectId();
    }


    fileSelected(event) {
        this.frontFile = event.target.files;
    }

    fileSelectedBack(event) {
        this.backendFile = event.target.files;

    }
    fileSelectedApi(event) {
        this.apiManFile = event.target.files;
    }

    saveEntityModel() {
        this.openDialog(true, null);
    }

    radioChange(event) {
        if (event.value === 'Import Feature') {
            this.showImportFeature = true;
            this.showAddFeature = false;
            this.showUploadFeature = false;
        }
        if (event.value === 'Upload Feature') {
            this.formData = new FormData();
            this.showImportFeature = false;
            this.showAddFeature = false;
            this.showUploadFeature = true;

        }
        if (event.value === 'Create Feature') {
            this.showImportFeature = false;
            this.showAddFeature = true;
            this.showUploadFeature = false;
        }
    }

    openDialog(isSaveOption, objectValue): void {
        alert('cxcc');
        let dialogDataValue;
        if (isSaveOption) {
            dialogDataValue = {};
        } else {
            dialogDataValue = objectValue;
        }
        const dialogRef = this.dialog.open(PopupModelComponent, {
            width: '550px',
            data: dialogDataValue
        });


        dialogRef.afterClosed().subscribe(entityData => {
            if (entityData !== undefined) {
                if (objectValue === null) {
                    this.saveEntity(entityData);
                } else {
                    dialogDataValue.name = entityData.name;
                    dialogDataValue.description = entityData.description;
                    this.updateEntity(dialogDataValue);
                }
            }
        });
    }

    getProjectById() {
        this.projectService.getProjectById(this.project_id).subscribe(proj => {

            this.menuLanguages.push(proj.default_human_language);
            if (proj.other_human_languages !== '') {
                this.menuLanguages.push(proj.other_human_languages)
            }
            this.menuBuilder.project_languages = this.menuLanguages;
        });
    }

    getProjectDetails() {
        this.projectComponentService.getAllFeatureByProjectId(this.project_id).subscribe(data => {
            this.projectFeatureData = [];
            if (data !== null) {
                this.featureId = [];
                data.map(fdata => {
                    this.featureId.push(fdata.feature_id);
                    // this.getScreenDetails(fdata.feature_id._id);
                });
            }
            if (this.featureId !== null) {
                this.featureId.map(fdata => {
                    this.projectComponentService.getFeatureDetailsById(fdata._id).subscribe(fedata => {
                        if (data !== undefined) {
                            this.projectFeatureData.push(fedata);
                            this.dataService.setProjectFeatureInfo(this.projectFeatureData);
                            if (this.projectFeatureData !== undefined) {
                                this.projectFeatureData.map((featuredata, index) => {
                                    this.projectFeatureData[index].description = featuredata.description.replace(/<[^>]*>/g, '');
                                });
                            }
                        }
                    });
                });
            }
        });
    }

    onChange(selected) {
        if (selected) {
            this.featureData.map((data, index) => {
                if (data.name === selected) {
                    this.features.feature_id = data._id;
                    this.features.project_id = this.project_id;
                    this.featureDetails.id = data._id;
                    this.featureDetails.name = data.name;
                    this.featureDetails.description = data.description;
                    return;
                }
            });
        }
    }
    onChangeFeature(selected) {
        if (selected) {
            this.featureData.map((data, index) => {
                if (data.name === selected) {
                    this.featureEntityDetails.id = data._id;
                    return;
                }
            });
        }
    }

    createFeature() {
        if (this.selectedOption === 'Upload Feature') {
            this.formData.append('front_mang_file', this.frontFile[0]);
            this.formData.append('backed_mang_file', this.backendFile[0]);
            this.formData.append('api_mang_file', this.apiManFile[0]);
            this.formData.append('name', this.featureDetails.name);
            this.formData.append('description', this.featureDetails.description);

            this.projectComponentService.addFeatureDetailsWithFile(this.formData).subscribe((data) => {

                if (data) {
                    this.frontFile = '',
                        this.backendFile = '',
                        this.apiManFile = '',
                        this.featureDetails.name = '',
                        this.featureDetails.description = '',
                        this.createFeatureData = data;
                    this.closeFeatureCreateModel();
                    this.getAllFeatureDetails();
                }
            }, (error) => {
                console.log('something happens in feature microservice');
            });
        } else if (this.selectedOption === 'Create Feature') {
            this.projectComponentService.addFeatureDetails(this.featureDetails).subscribe((data) => {
                if (data) {
                    this.createFeatureData = data;
                    this.features.feature_id = this.createFeatureData._id;
                    this.features.project_id = this.project_id;
                    this.projectComponentService.addFeature(this.features).subscribe(featureData => {
                        if (featureData) {
                            this.menuBuilder = { feature: [], project: '', language: this.menuLanguages[0], menuDetails: [], project_languages: this.menuLanguages, menu_option: true };
                            this.menuBuilder.project = this.project_id;
                            this.menuBuilder.feature.push(this.createFeatureData._id);
                            this.menuBuilderService.getMenuBuilderByProjectId(this.project_id).subscribe(menuBuilderData => {
                                if (menuBuilderData.length !== 0) {
                                    this.menuBuilder.feature = menuBuilderData[0].feature;
                                    this.menuBuilder.feature.push(featureData.feature_id);
                                    this.menuBuilderService.updateMenuById(menuBuilderData[0]._id, this.menuBuilder)
                                        .subscribe(fMenu => {
                                            console.log('=========', fMenu);
                                        });
                                } else {
                                    this.menuBuilderService.createMenu(this.menuBuilder).subscribe(menuData => {
                                    });
                                }
                            });

                            this.getProjectDetails();
                            this.closeFeatureExistingModel();
                            this.getMenuBuilderByProjectId();
                        }
                    });
                    this.featureDetails.name = '',
                        this.featureDetails.description = '',
                        this.closeFeatureCreateModel();
                    this.getAllFeatureDetails();
                }
            }, (error) => {
                console.log('something happens in feature microservice');
            });
        }
    }

    openFeatureDialog(): void {
        if (this.uiFile) {
            this.uiFile.nativeElement.value = '';
        }
        if (this.serviceFile) {
            this.serviceFile.nativeElement.value = '';
        }
        if (this.apiGatewayFile) {
            this.apiGatewayFile.nativeElement.value = '';
        }
        this.formData = new FormData();

        this.frontFile = undefined;
        this.backendFile = undefined;
        this.apiManFile = undefined;
        this.displayFeatureModel = 'block';
    }

    closeFeatureCreateModel() {
        this.frontFile = '',
            this.backendFile = '',
            this.apiManFile = '',
            this.featureDetails.name = '',
            this.featureDetails.description = '',
            this.displayFeatureModel = 'none';

        // this.features = { id: '', description: '', name: '', connectProject: this.features.connectProject };
    }
    closeFeatureExistingModel() {
        this.displayFeatureModel = 'none';
    }





    getScreenByProjectId() {
        this.screenService.getScreenByProjectId(this.project_id).subscribe(sData => {
            this.screenDetails = sData;
            console.log('screenDetails are ----- ', this.screenDetails);
        }, (error) => {
            console.log('screenDetails something is not working on backend side');
        });
    }

    saveEntity(entityData) {
        this.entity.name = entityData.name;
        this.entity.description = entityData.description;
        this.entity.entity_type = entityData.entityType;
        this.entity.project_id = this.project_id;
        this.projectComponentService.createEntity(this.entity).subscribe(
            (data) => {
                this.getAllEntityByProjectId();
            },
            (error) => {

            }
        );
    }
    updateEntity(entityData) {
        entityData.updated_at = new Date();
        this.projectComponentService.updateEntity(entityData).subscribe(
            (data) => {
                this.getAllEntityByProjectId();
            },
            (error) => {

            }
        );
    }

    getAllEntityByProjectId() {
        this.projectComponentService.getEntityByProjectId(this.project_id).subscribe(
            (data) => {
                this.allEntity = data;
                this.projectEntity = [];
                console.log('ProjectEntity data are ------ ', this.allEntity);
                this.allEntity.map(entityData => {
                    if (entityData.feature_id === undefined && entityData.project_id === null) {
                        this.projectEntity.push(entityData);
                    }
                });
                console.log('ProjectEntity 22333 ---- ', this.projectEntity);
                this.dataService.setAllEntity(this.allEntity);
            },
            (error) => {
                console.log('error in ProjectEntity ---- ', error);
            }
        );
    }
    openDeleteModel(entity) {
        this.selectedEntityId = entity._id;
        this.deletePopup = 'block';
    }

    closeDeleteModel() {
        this.deletePopup = 'none';
    }
    editEntityField(entity: IEntity) {
        this.dataService.setEntity(entity);
        this.router.navigate(['/entity-field']);
    }

    editEntity(entity) {
        this.openDialog(false, entity);
    }

    deleteEntity() {
        this.deletePopup = 'none';
        this.projectComponentService.deleteEntity(this.selectedEntityId).subscribe(
            (data) => {
                this.getAllEntityByProjectId();
            },
            (error) => {

            }
        );
    }



    getMenuBuilderByProjectId() {
        this.menuFeatureName = [];
        this.menuBuilderService.getMenuBuilderByProjectId(this.project_id).subscribe(menuBuilderData => {
            if (menuBuilderData.length !== 0) {
                this.menuBuilderDetails = menuBuilderData;

                let array = [];
                this.menuBuilderDetails.forEach(menuData => {
                    if (menuData.menu_option === true) {
                        this.dataMenu = menuData.menuDetails;
                        menuData.feature.forEach(feData => {
                            this.screenService.getScreenByFeature(feData).subscribe(data => {
                                if (data.length !== 0) {
                                    this.screenMenuName = [];
                                    this.screenId = [];
                                    data.forEach(sData => {
                                        this.menuFId = sData.feature._id;
                                        this.menuFName = sData.feature.name;
                                        this.screenId.push(sData._id);
                                        this.screenMenuName.push(sData.foldername);
                                    });
                                    let screenData = {
                                        screen: this.screenMenuName,
                                        screenId: this.screenId
                                    }
                                    let fMenuData = {
                                        feature: this.menuFName,
                                        featureId: this.menuFId,
                                    }
                                    let obj = {
                                        featuremenu: [{ name: fMenuData, description: fMenuData }],
                                        screenmenu: [{
                                            name: screenData,
                                            description: screenData
                                        }],
                                    };
                                    array.push(obj);
                                    this.menuBuilder = menuData;
                                    this.menuBuilder.menuDetails = array;
                                    this.dataMenu.forEach(meData => {
                                        this.menuBuilder.menuDetails.forEach(menu => {
                                            if (menu.featuremenu[0].name.featureId === meData.featuremenu[0].name.featureId) {
                                                menu.featuremenu[0].description = meData.featuremenu[0].description;
                                                let intersection = menu.screenmenu[0].name.screenId.filter(x => meData.screenmenu[0].name.screenId.includes(x));
                                                if (intersection.length !== 0) {
                                                    intersection.forEach(sId => {
                                                        meData.screenmenu[0].name.screenId.forEach((dSId, index) => {
                                                            if (sId === dSId) {
                                                                menu.screenmenu[0].description.screen[index] = meData.screenmenu[0].description.screen[index]
                                                            }
                                                        });
                                                    });
                                                }
                                            }
                                        });
                                    });
                                    this.menuBuilderService.updateMenuById(menuData._id, this.menuBuilder)
                                        .subscribe(fMenu => {
                                            if (fMenu) {
                                                this.database.initialize(fMenu.menuDetails);

                                            }
                                        });
                                }
                            });
                        });
                    }
                });
            }
        });
    }

    getSelectedProject() {
        this.dataService.currentProjectInfo.subscribe(
            (data) => {
                this.selectedProject = data;
            }
        );
    }

    // getDefaultEntityByProjectId() {
    // this.projectComponentService.getDefaultEntityByProjectId(this.selectedProject._id).subscribe(data => {
    // // data.map((data,index)=>{
    // this.selecteddefaultEntity = [data];


    // // let defaultEntity = Object.values(this.selecteddefaultEntity);
    // });
    // }

    GoToDesigner() {
        this.openScreenDialog();
        // this.router.navigate(['/desktopscreen'], { queryParams: { projectId: this.project_id } });
    }

    openScreenDialog(): void {
        const dialogRef = this.dialog.open(ScreenPopupComponent, {
            width: '550px',
            data: {}
        });


        dialogRef.afterClosed().subscribe(screenData => {
            if (screenData) {
                this.router.navigate(['/desktopscreen'], { queryParams: { projectId: this.project_id, screenType: screenData } });
            }
        });
    }

    // Feature

    openDeleteFModel(feature) {
        this.selectedFeatureId = feature._id;
        this.deleteFPopup = 'block';
    }

    closeDeleteFModel() {
        this.deleteFPopup = 'none';
    }

    updateFeature() {
        // this.projectComponentService.getFeatureById(this.features.id).subscribe(data => {
        // if (data.connectProject === true) {
        // alert("Already Imported");
        // this.closeFeatureExistingModel();
        // } else {
        // console.log("Asadadffaffdf", this.features)
        // this.projectComponentService.updateFeature(this.features).subscribe(data => {
        // console.log(data);
        // if (data) {
        // this.closeFeatureExistingModel();
        // }
        // });

        // }
        // });
    }

    addFeature() {
        this.projectComponentService.getAllFeatureByProjectId(this.features.project_id).subscribe(data => {
            data.map(pfdata => {
                if (pfdata.feature_id._id === this.features.feature_id) {
                    this.allowImport = true;
                }
            });
            if (this.allowImport) {
                alert('Already Imported');
                this.closeFeatureExistingModel();
            }
            if (!this.allowImport) {
                this.projectComponentService.addFeature(this.features).subscribe(featureData => {
                    if (featureData) {
                        this.menuBuilder.feature.push(featureData.feature_id);
                        this.menuBuilder.project = this.project_id;
                        this.menuBuilderService.createMenu(this.menuBuilder).subscribe(menuData => {
                            if (menuData) {
                                this.getMenuBuilderByProjectId();
                            }
                        });
                        this.getProjectDetails();
                        this.closeFeatureExistingModel();
                    }
                });
                this.featureDetailsService.getFeatureEntityByFeatureId(this.features.feature_id).subscribe(entityFeatureData => {
                    this.featureEntityData = entityFeatureData;
                    this.featureEntityData.map((entityData, index) => {
                        this.featureEntityField.push(entityData);
                    });
                    this.featureEntityField.map(fieldElement => {
                        this.entity.name = fieldElement.name;
                        this.entity.feature_id = this.features.feature_id;
                        this.entity.description = fieldElement.description;
                        this.entity.project_id = this.features.project_id;
                        this.entity.field = fieldElement.field;
                        this.projectComponentService.createEntity(this.entity).subscribe(
                            (entityData) => {
                            },
                            (error) => {

                            }
                        );
                    });

                });


            }
        });
    }

    addFeatureDetails() {
        this.projectComponentService.addFeatureDetails(this.features).subscribe(data => {
            // if (data) {
            // this.getAllFeature();
            // }
        });
    }

    getAllFeatureDetails() {
        this.projectComponentService.getAllFeatureDetails().subscribe(data => {
            this.featureData = data;
            this.featureData.forEach((featureElement, index) => {
                if (featureElement.description !== undefined) {
                    this.featureData[index].description = featureElement.description.replace(/<[^>]*>/g, '');
                }
            });
        });
    }
    // getAllFeature() {
    // this.projectComponentService.getAllFeature().subscribe(data => {
    // this.featureData = data;
    // this.featureConnectProject = [];
    // data.map(data => {
    // if (data.connectProject === true) {
    // this.featureConnectProject.push(data);

    // }
    // })
    // // tslint:disable-next-line:no-shadowed-variable
    // this.featureData.map((data, index) => {
    // this.featureData[index].description = data.description.replace(/<[^>]*>/g, '');
    // });
    // });
    // }

    onReady(eventData) {
        eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
            // console.log("aiosaohofhodaofdfdf>>>>>>>>>>++++++++",btoa(loader.file));
            // return new UploadAdapter(loader);
        };
    }
    // getAllFeature() {
    // this.projectComponentService.getAllFeature().subscribe(data => {
    // this.featureData = data;
    // this.featureConnectProject = [];
    // data.map(data => {
    // if (data.connectProject === true) {
    // this.featureConnectProject.push(data);

    deleteFeature() {
        this.projectComponentService.deleteFeature(this.selectedFeatureId).subscribe(data => {
        });
        this.closeDeleteFModel();
        // this.getAllFeature();
    }

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
                this.getScreenByProjectId();
            },
            (error) => {

            }
        );
    }
}


// image uploader for ckeditor

// export class UploadAdapter {
// private loader;
// constructor(loader: any) {
// this.loader = loader;
// console.log(this.readThis(loader.file));
// }

// public upload(): Promise<any> {
// //"data:image/png;base64,"+ btoa(binaryString)
// return this.readThis(this.loader.file);
// }

// readThis(file: File): Promise<any> {
// console.log(file)
// let imagePromise: Promise<any> = new Promise((resolve, reject) => {
// var myReader: FileReader = new FileReader();
// myReader.onloadend = (e) => {
// let image = myReader.result;
// console.log(image);
// return { default: "data:image/png;base64," + image };
// resolve();
// }
// myReader.readAsDataURL(file);
// });
// return imagePromise;
// }

