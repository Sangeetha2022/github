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
import { ScreenDesignerService } from '../screen-designer/screen-designer.service';
import { IMenu } from './interface/Menu';
import { MenuBuilderService } from '../menu-builder/menu-builder.service';
import { TreeDragService } from '../menu-builder/tree-drag/tree-drag.service';
import { ProjectsService } from '../projects/projects.service';
import { ScreenPopupComponent } from './screen-popup/screen-popup.component';
import { ToastrService } from 'ngx-toastr';
import { ValidatorService } from 'src/shared/validator.service';
import { NgxSpinnerService } from "ngx-spinner";

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
    showImportFeature: Boolean;
    showAddFeature: Boolean = true;
    frontFile: any;
    backendFile: any;
    rowSelection: any;
    menuBuilderDetails: any = [];
    apiManFile: any;
    screenName: any = [];
    menuFeatureName: any = [];
    projectName: any;
    allowImport: Boolean = false;
    dataMenu: any;
    featureId: any = [];
    logId = sessionStorage.getItem('LogId');
    featureData: any = [];
    featureConnectProject: any = [];
    menuLanguages: any = [];
    // user: any = [];
    project_id: String;
    public features: IFeature = {
        project_id: '',
        feature_id: '',
        // explanation:'',
    };
    selectedOption: String = 'Create Feature';
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

    public featureInfo: any = {
        name: '',
        description: '',
        project: '',
        type: ''
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
    invalidName: Boolean;
    isReserveWord: Boolean;
    gridColumnApi: any;
    screenId: any = [];
    featureName: any = [];
    screenMenuName: any = [];
    screenTempId: String;
    gridApi: any;
    screenDetails: any = [];
    projectEntity: any = [];
    isFeatureExist: Boolean;
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

    // constant name
    public POPUP_MODAL_VARIABLENAME = 'popupmodal';
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private projectComponentService: ProjectComponentService,
        private projectService: ProjectsService,
        private menuBuilderService: MenuBuilderService,
        private dataService: DataService,
        private screenService: ScreenDesignerService,
        private route: ActivatedRoute,
        private database: TreeDragService,
        private toastr: ToastrService,
        private validatorService: ValidatorService,
        private spinner: NgxSpinnerService


    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.project_id = params.projectId;
        });
        this.getProjectById();
        this.getSelectedProject();
        this.getFeatureByProjectId();
        this.getScreenByProjectId();
        this.getAllEntityByProjectId();
        this.getMenuBuilderByProjectId();
    }


    async generateCode() {
        this.toastr.success('Please wait', 'Generating the code!', {
            closeButton: true,
            disableTimeOut: true
        });
        this.toastr.success('PROJECT: ' + this.projectName, 'Generation Requested!', {
            closeButton: false,
            disableTimeOut: false
        });
        this.projectComponentService.codeGenerate(this.project_id, this.logId).subscribe(data => {
            if (data.body) {
                console.log('body data----------------->>>', data.body);
                // tslint:disable-next-line: max-line-length
                this.toastr.clear();
                this.toastr.success('Github URL: https://github.com/gepinfo/' + this.projectName + '.git', 'Generation Completed!', {
                    closeButton: true,
                    disableTimeOut: true
                }).onTap.subscribe(action => {
                    window.open('https://github.com/gepinfo/' + this.projectName + '.git', '_blank');
                });
            }
        }, error => {
            if (error) {
                this.toastr.error('Failed!', 'Generation Failed', {
                    closeButton: false,
                    disableTimeOut: false
                });
            }
        });
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
        this.spinner.show();
        this.projectService.getProjectById(this.project_id, this.logId).subscribe(response => {
            if (response.body) {
                this.spinner.hide();
                this.projectName = response.body.project_unique_id;
                this.menuLanguages.push(response.default_human_language);
                if (response.other_human_languages !== '') {
                    this.menuLanguages.push(response.other_human_languages);
                }
                this.menuBuilder.project_languages = this.menuLanguages;
                this.menuBuilder.language = this.menuLanguages[0];
            }
        });
    }

    getFeatureByProjectId() {
        this.spinner.show();
        this.projectComponentService.getFeatureByProjectId(this.project_id, this.logId).subscribe(
            response => {
                this.spinner.hide();
                this.projectFeatureData = response.body;
            },
            error => {

            }
        );
    }

    createFeature() {
        this.isFeatureExist = false;
        this.featureInfo.name = this.featureInfo.name.toLowerCase();
        this.featureInfo.project = this.project_id;

        this.validatorService.checkNamingConvention(this.featureInfo.name);
        this.validatorService.checkReserveWords(this.featureInfo.name);
        this.validatorService.currentProjectInfo.subscribe(data => {
            if (data === null) {
                this.invalidName = true;
            } else {
                this.invalidName = false;
            }
        });
        this.validatorService.currentProjectReserveWordInfo.subscribe(reserveWord => {
            this.isReserveWord = reserveWord;
        });

        this.projectComponentService.getFeatureByProjectId(this.project_id, this.logId).subscribe(projFeature => {
            if (projFeature.body.length > 0) {
                projFeature.body.forEach(feature => {
                    if (feature.name === this.featureInfo.name) {
                        this.isFeatureExist = true;
                    }
                });
            }

            if (!this.isFeatureExist && !this.invalidName && !this.isReserveWord) {
                this.featureInfo.description = this.featureInfo.description.replace(/<[^>]+>/g, '');
                this.featureInfo.description.trim();
                console.log("featureData------>", this.featureData);
                this.projectComponentService.saveFeatures(this.featureInfo, this.logId).subscribe(
                    (featureData) => {
                        this.featureInfo = { name: '', description: '', project: '', type: '' };
                        this.displayFeatureModel = 'none';
                        this.menuBuilder = {
                            feature: [], project: '', language: '',
                            menuDetails: [], project_languages: this.menuLanguages, menu_option: true
                        };
                        this.menuBuilderService.getMenuBuilderByProjectId(this.project_id, this.logId).subscribe(menuBuilderData => {
                            if (menuBuilderData.body && menuBuilderData.body.length !== 0) {
                                menuBuilderData.body.forEach(menuData => {
                                    if (menuData.menu_option === true) {
                                        this.menuBuilder.feature = menuData.feature;
                                        this.menuBuilder.project = this.project_id;
                                        this.menuBuilder.language = menuData.language;
                                        this.menuBuilder.feature.push(featureData.body._id);
                                        this.menuBuilder.menuDetails = menuData.menuDetails;
                                        this.menuBuilderService.updateMenuById(menuData._id, this.menuBuilder, this.logId)
                                            .subscribe(fMenu => {
                                            }, error => console.log('cannot able to update the menu details'));
                                    }
                                });
                            }
                        });
                        this.getFeatureByProjectId();
                    },
                    (error) => {

                    }
                );
            }

        });
    }

    importFeature() {
        this.isFeatureExist = false;
        this.featureInfo.name.toLowerCase();
        this.featureInfo.project = this.project_id;

        this.validatorService.checkNamingConvention(this.featureInfo.name);
        this.validatorService.checkReserveWords(this.featureInfo.name);
        this.validatorService.currentProjectInfo.subscribe(data => {
            if (data === null) {
                this.invalidName = true;
            } else {
                this.invalidName = false;
            }
        });
        this.validatorService.currentProjectReserveWordInfo.subscribe(reserveWord => {
            this.isReserveWord = reserveWord;
        });

        this.projectComponentService.getFeatureByProjectId(this.project_id, this.logId).subscribe(projFeature => {
            if (projFeature.body.length > 0) {
                projFeature.body.forEach(feature => {
                    if (feature.name === this.featureInfo.name) {
                        this.isFeatureExist = true;
                    }
                });
            }

            if (!this.isFeatureExist && !this.invalidName && !this.isReserveWord) {
                this.featureInfo.description = this.featureInfo.description.replace(/<[^>]+>/g, '');
                this.featureInfo.description.trim();
                this.featureInfo.type = 'private';
                this.projectComponentService.saveFeatures(this.featureInfo, this.logId).subscribe(
                    (featureData) => {
                        this.displayFeatureModel = 'none';
                    },
                    (error) => {
                    }
                );
                this.getFeatureByProjectId();
            }

        });
    }

    onFeatureChange(event) {
        if (event.length <= 0) {
            this.isFeatureExist = false;
            this.isReserveWord = false;
            this.invalidName = false;

        }
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

    getAllFeatures() {
        this.projectComponentService.getAllFeature(this.logId).subscribe(
            (featureData) => {

            },
            (error) => {

            }
        );
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

    }
    closeFeatureExistingModel() {
        this.displayFeatureModel = 'none';
    }

    getScreenByProjectId() {
        this.spinner.show();
        this.screenDetails = [];
        this.screenService.getScreenByProjectId(this.project_id, this.logId).subscribe(response => {
            if (response.body) {
                this.spinner.hide();
                response.body.forEach(element => {
                    if (!element.isTemplate) {
                        this.screenDetails.push(element);
                    } else {
                        this.screenTempId = element._id;
                    }
                });
            }

        }, (error) => {
            console.log('screenDetails something is not working on backend side');
        });
    }

    editTemplate(screenId) {
        this.router.navigate(['/desktopscreen'], {
            queryParams: {
                projectId: this.project_id, screenId: screenId,
            }
        });
    }
    saveEntity(entityData) {
        this.entity.name = entityData.name;
        this.entity.description = entityData.description;
        this.entity.entity_type = entityData.entityType;
        this.entity.project_id = this.project_id;
        this.projectComponentService.createEntity(this.entity, this.logId).subscribe(
            (data) => {
                this.getAllEntityByProjectId();
            },
            (error) => {

            }
        );
    }
    updateEntity(entityData) {
        entityData.updated_at = new Date();
        this.projectComponentService.updateEntity(entityData, this.logId).subscribe(
            (data) => {
                this.getAllEntityByProjectId();
            },
            (error) => {

            }
        );
    }

    getAllEntityByProjectId() {
        this.spinner.show();
        this.projectComponentService.getEntityByProjectId(this.project_id, this.logId).subscribe(
            (data) => {
                this.spinner.hide();
                console.log('all entity data', data.body);
                this.allEntity = data.body;
                this.projectEntity = this.allEntity;
                this.dataService.setAllEntity(this.allEntity);
            },
            (error) => {
                console.log('cannot able to get all entity based on projectId ---- ', error);
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
    editEntityField(entity: any) {
        this.router.navigate(['/entity-field'], { queryParams: { entityId: entity._id }, });
    }

    editEntity(entity) {
        this.openDialog(false, entity);
    }

    // deleteEntity() {
    //     this.deletePopup = 'none';
    //     this.projectComponentService.deleteEntity(this.selectedEntityId, this.logId).subscribe(
    //         (data) => {
    //             this.getAllEntityByProjectId();
    //         },
    //         (error) => {

    //         }
    //     );
    // }

    deleteEntityById() {
        this.deletePopup = 'none';
        this.projectComponentService.deleteEntityById(this.selectedEntityId, this.logId).subscribe(
            (data) => {
                if (data) {
                    this.getAllEntityByProjectId();
                }
            },
            (error) => {

            }
        );
    }


    getMenuBuilderByProjectId() {
        this.spinner.show();
        this.menuFeatureName = [];
        this.menuBuilderService.getMenuBuilderByProjectId(this.project_id, this.logId).subscribe(menuBuilderData => {
            this.spinner.hide();
            if (menuBuilderData.body && menuBuilderData.body.length !== 0) {
                this.menuBuilderDetails = menuBuilderData.body;
                const array = [];

                this.menuBuilderDetails.forEach(menuData => {
                    if (menuData.menu_option === true) {
                        this.dataMenu = menuData.menuDetails;
                        if (menuData.feature.length > 0) {
                            menuData.feature.forEach(feData => {
                                if (feData !== null) {
                                    this.featureDetailsData = [];
                                    this.projectComponentService.getFeatureById(feData, this.logId).subscribe(
                                        response => {
                                            this.featureDetailsData = response.body;
                                            this.menuFId = this.featureDetailsData._id;
                                            this.menuFName = this.featureDetailsData.name;
                                            const fMenuData = {
                                                feature: this.menuFName,
                                                featureId: this.menuFId,
                                            };
                                            this.screenService.getScreenByFeatureId(feData, this.logId).subscribe(screenResponse => {
                                                if (screenResponse.body && screenResponse.body.length !== 0) {
                                                    this.screenMenuName = [];
                                                    this.screenId = [];
                                                    screenResponse.body.forEach(sData => {
                                                        if (sData.screenOption !== this.POPUP_MODAL_VARIABLENAME) {
                                                            this.screenId.push(sData._id);
                                                            this.screenMenuName.push(sData.screenName);
                                                        }
                                                    });
                                                    const screenData = {
                                                        screen: this.screenMenuName,
                                                        screenId: this.screenId
                                                    };
                                                    const obj = {
                                                        featuremenu: [{ name: fMenuData, description: fMenuData }],
                                                        screenmenu: [{
                                                            name: screenData,
                                                            description: screenData
                                                        }],
                                                    };
                                                    array.push(obj);
                                                    this.menuBuilder = menuData;
                                                    this.menuBuilder.menuDetails = array;
                                                    if (this.dataMenu.length !== 0) {
                                                        this.dataMenu.forEach(meData => {
                                                            this.menuBuilder.menuDetails.forEach(menu => {
                                                                if (meData.featuremenu.length > 0) {
                                                                    // tslint:disable-next-line:max-line-length
                                                                    if (menu.featuremenu[0].name.featureId === meData.featuremenu[0].name.featureId) {
                                                                        menu.featuremenu[0].description = meData.featuremenu[0].description;
                                                                        // tslint:disable-next-line:max-line-length
                                                                        if (menu.screenmenu[0].name.screenId !== undefined && meData.screenmenu[0].name.screenId !== undefined) {
                                                                            // tslint:disable-next-line:max-line-length
                                                                            const intersection = menu.screenmenu[0].name.screenId.filter(x => meData.screenmenu[0].name.screenId.includes(x));
                                                                            if (intersection.length !== 0) {
                                                                                intersection.forEach(sId => {
                                                                                    // tslint:disable-next-line:max-line-length
                                                                                    meData.screenmenu[0].name.screenId.forEach((dSId, index) => {
                                                                                        if (sId === dSId) {
                                                                                            // tslint:disable-next-line:max-line-length
                                                                                            menu.screenmenu[0].description.screen[index] = meData.screenmenu[0].description.screen[index];
                                                                                        }
                                                                                    });
                                                                                });
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                        });
                                                        if (this.menuBuilder.menuDetails[0].featuremenu[0].name.feature !== 'default') {
                                                            this.menuBuilder.menuDetails.splice(0, 0, this.dataMenu[0]);
                                                        }
                                                    }
                                                    this.menuBuilderService.updateMenuById(menuData._id, this.menuBuilder, this.logId)
                                                        .subscribe(menuResponse => {
                                                            if (menuResponse.body) {
                                                                this.dataService.setMenuBuilder(menuResponse.body.menuDetails);
                                                                this.database.initialize(menuResponse.body.menuDetails);
                                                            }
                                                        });
                                                }
                                            });

                                        },
                                        error => {

                                        }
                                    );
                                }
                            });
                        } else {
                            this.database.initialize(this.dataMenu);
                            this.dataService.setMenuBuilder(this.dataMenu);
                        }
                    }
                });
            }
        });
    }

    getSelectedProject() {
        this.spinner.show();
        this.dataService.currentProjectInfo.subscribe(
            (data) => {
                this.spinner.hide();
                this.selectedProject = data;
            }
        );
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
                this.router.navigate(['/desktopscreen'], { queryParams: { projectId: this.project_id, screenType: screenData.name } });
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


    onReady(eventData) {
        eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
        };
    }
    deleteFeature() {
        this.projectComponentService.deleteFeature(this.selectedFeatureId, this.logId).subscribe(data => {
        }, error => console.log('cannot able to delete the feature'));
        this.closeDeleteFModel();
    }

    editScreen(screenId, screenType) {
        this.router.navigate(['/desktopscreen'], {
            queryParams: {
                projectId: this.project_id, screenId: screenId,
                screenType: screenType
            }
        });
    }

    // deleteScreen(screenId) {
    //     this.screenService.deleteScreen(screenId).subscribe(
    //         (data) => {
    //             this.getScreenByProjectId();
    //         },
    //         (error) => {

    //         }
    //     );
    // }

    deleteScreenById(screenId) {
        this.screenService.deleteScreenById(screenId, this.logId).subscribe(
            (data) => {
                if (data) {
                    this.getScreenByProjectId();
                    this.getFeatureByProjectId();
                }
            },
            (error) => {

            }
        );
    }

}
