import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupModelComponent } from './popup-model/popup-model.component';
import { ProjectComponentService } from './project-component.service';
import { DataService } from '../../shared/data.service';
import { IEntity } from './interface/Entity';
import { IFeature } from './interface/Feature';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SharedService } from '../../shared/shared.service';
import { IFeatureDetails } from './interface/FeatureDetails';
import { FeatureDetailsService } from './feature-details/feature-details.service';
import { HttpClient, HttpBackend } from '@angular/common/http';


@Component({
    selector: 'app-project-component',
    templateUrl: './project-component.component.html',
    styleUrls: ['./project-component.component.scss']
})

export class EntityManagerComponent implements OnInit {
    public Editor = ClassicEditor;
    showUploadFeature: Boolean;
    showImportFeature: Boolean;
    showAddFeature: Boolean = true;

    frontFile: any;
    backendFile: any;
    apiManFile: any;
    showUpdateFeature: Boolean;
    allowImport: Boolean;
    selectedExistingFeature: String;
    featureNameandDesc: any = [];
    featureId: any = [];
    featureData: any = [];
    featureConnectProject: any = [];
    // user: any = [];
    project_id: String;
    public features: IFeature = {
        project_id: '',
        feature_id: '',
        // explanation:'',
    };
    selectedOption: string;
    options: string[] = ['Import Feature', 'Upload Feature', 'Add Feature'];
    public featureDetails: IFeatureDetails = {
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
        project_id: '',
        feature_id: '',
        created_by: '',
        last_modified_by: '',
        updated_at: new Date(),
        field: []
    };
    http: HttpClient;
    projectEntity: any = [];
    public allEntity: IEntity[] = [];
    public deletePopup: String = 'none';
    deleteFPopup: String = 'none';
    public formData: FormData = new FormData();
    public selectedEntityId: any;
    selectedFeatureId: any;
    projectFeatureData: any = [];
    selectedProject: any;
    selecteddefaultEntity: any;
    featureDetailsData: any = [];
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private projectComponentService: ProjectComponentService,
        private featureDetailsService: FeatureDetailsService,
        private dataService: DataService,
        private restApi: SharedService,
        private route: ActivatedRoute,
        private handler: HttpBackend,

    ) {
        this.http = new HttpClient(handler);

        // if (this.selectFeature === true) {
        // this.features = { id: '', description: '', name: '', connectProject: this.features.connectProject };
        // }
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.project_id = params.projectId;
        });
        if (this.showAddFeature === true) {
            this.selectedOption = 'Add Feature';
        }
        this.getSelectedProject();
        this.getProjectDetails();
        this.getAllEntityByProjectId();
        // this.getDefaultEntityByProjectId();
        // this.getAllFeature();
        console.log(this.projectFeatureData);
        this.getAllFeatureDetails();
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
            this.showImportFeature = false;
            this.showAddFeature = false;
            this.showUploadFeature = true;

        }
        if (event.value === 'Add Feature') {
            this.showImportFeature = false;
            this.showAddFeature = true;
            this.showUploadFeature = false;
        }
        console.log(event);
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
            console.log('after close dialogRef ---- ', entityData);
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

    getProjectDetails() {
        this.projectComponentService.getAllFeatureByProjectId(this.project_id).subscribe(data => {
            this.projectFeatureData = [];
            if (data !== null) {
                this.featureId = [];
                data.map(fdata => {
                    this.featureId.push(fdata.feature_id);
                });
            }
            if (this.featureId !== null) {
                this.featureId.map(fdata => {
                    this.projectComponentService.getFeatureDetailsById(fdata._id).subscribe(fedata => {
                        console.log('asadafdsfd', fedata);
                        if (data !== undefined) {
                            this.projectFeatureData.push(fedata);
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

    // onChangeRadio(selected) {

    // if (selected === 'on') {
    // if (!this.selectFeature) {
    // this.showUpdateFeature = true;
    // }
    // if (this.selectFeature) {
    // this.showUpdateFeature = false;
    // }
    // // this.features = { id: '', description: '', name: '', connectProject: this.features.connectProject };
    // }
    // }

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

    createFeature() {
        if (this.selectedOption === 'Upload Feature') {
            this.formData.append('front_mang_file', this.frontFile[0]);
            this.formData.append('backed_mang_file', this.backendFile[0]);
            this.formData.append('api_mang_file', this.apiManFile[0]);
            this.formData.append('name', this.featureDetails.name);
            this.formData.append('description', this.featureDetails.description);
        }
        console.log(this.featureDetails);
        return this.http.post('http://localhost:3006/feature/details/addfile', this.formData).subscribe((data) => {
            if (data) {
                this.frontFile = '',
                    this.backendFile = '',
                    this.apiManFile = '',
                    this.featureDetails.name = '',
                    this.featureDetails.description = '',
                    this.closeFeatureCreateModel();
                this.getAllFeatureDetails();
            }
        });
    }

    openFeatureDialog(): void {
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

    saveEntity(entityData) {
        this.entity.name = entityData.name;
        this.entity.description = entityData.description;
        this.entity.project_id = this.project_id;
        this.projectComponentService.createEntity(this.entity).subscribe(
            (data) => {
                this.getAllEntityByProjectId();
            },
            (error) => {

            }
        );
    }
    // handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
    // console.log(this.fileToUpload);
    // this.projectComponentService.uploadeFeaturefile(this.fileToUpload).subscribe(data => {
    // })
    // }
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
                this.allEntity.map(entityData => {
                    if (entityData.feature_id === undefined) {
                        this.projectEntity.push(entityData);
                    }
                });
                this.dataService.setAllEntity(this.allEntity);
            },
            (error) => {

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

    getSelectedProject() {
        this.dataService.currentProjectInfo.subscribe(
            (data) => {
                this.selectedProject = data;
            }
        );
    }

    // getDefaultEntityByProjectId() {
    // this.projectComponentService.getDefaultEntityByProjectId(this.project_id).subscribe(data => {
    // // data.map((data,index)=>{
    // this.selecteddefaultEntity = [data];


    // // let defaultEntity = Object.values(this.selecteddefaultEntity);
    // });
    // }

    GoToDesigner() {
        this.router.navigate(['/desktopscreen'], { queryParams: { projectId: this.project_id } });
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
                if (pfdata.feature_id === this.features.feature_id) {
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
            console.log(data);
            // if (data) {
            // this.getAllFeature();
            // }
        });
    }

    getAllFeatureDetails() {
        this.projectComponentService.getAllFeatureDetails().subscribe(data => {
            this.featureData = data;
            this.featureData.forEach((featureElement, index) => {
                this.featureData[index].description = featureElement.description.replace(/<[^>]*>/g, '');
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

    deleteFeature() {
        this.projectComponentService.deleteFeature(this.selectedFeatureId).subscribe(data => {
            console.log(data);
        });
        this.closeDeleteFModel();
        // this.getAllFeature();
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

