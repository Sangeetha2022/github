import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { MatDialog, MatGridTileHeaderCssMatStyler } from '@angular/material';
import { PopupModelComponent } from './popup-model/popup-model.component';
import { ProjectComponentService } from './project-component.service';
import { DataService } from '../../shared/data.service';
import { IEntity } from './interface/Entity';
import { IFeature } from './interface/Feature';
import { Router } from '@angular/router';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { Constants } from '../config/Constant';
import { SharedService } from '../../shared/shared.service';


@Component({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.scss']
})

export class EntityManagerComponent implements OnInit {
  public Editor = ClassicEditor;
  selectFeature: Boolean = true;
  showUpdateFeature: Boolean;
  selectedExistingFeature: String;
  featureData: any = [];
  featureConnectProject: any = [];
  // user: any = [];
  public features: IFeature = {
    id: '',
    name: '',
    description: '',
    connectProject: false,
    // explanation:'',
  };
  panelOpenState = false;
  fileToUpload: File = null;
  displayFeatureModel = 'none';
  public entity: IEntity = {
    name: '',
    description: '',
    project_id: '',
    created_by: '',
    last_modified_by: '',
    updated_at: new Date(),
    field: []
  };
  public allEntity: IEntity[] = [];
  public deletePopup: String = 'none';
  deleteFPopup: String = 'none';
  public selectedEntityId: any;
  selectedFeatureId: any;
  selectedProject: any;
  selecteddefaultEntity: any;
  public uploader: FileUploader = new FileUploader({
    url: '',
  });
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private projectComponentService: ProjectComponentService,
    private dataService: DataService,
    private restApi: SharedService,
  ) {

    if (this.selectFeature === true) {
      this.features = { id: '', description: '', name: '', connectProject: this.features.connectProject };
    }
  }

  ngOnInit() {
    this.getSelectedProject();
    this.getAllEntityByProjectId();
    // this.getDefaultEntityByProjectId();
    this.getAllFeature();
    const URL = this.restApi.featureUrl + Constants.feature + Constants.detailsUrl + Constants.addFilesUrl;
    this.uploader.onBeforeUploadItem = (item) => {
      item.url = URL + '';
    };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    //   alert('File uploaded successfully');
    // };
  }

  saveEntityModel() {
    this.openDialog(true, null);
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
  onChangeRadio(selected) {
    if (selected === 'on') {
      if (!this.selectFeature) {
        this.showUpdateFeature = true;
      }
      this.features = { id: '', description: '', name: '', connectProject: this.features.connectProject };
    }
  }

  onChange(selected) {
    if (selected) {
      this.featureData.map((data, index) => {
        if (data.name === selected) {
          this.features.id = data._id;
          this.features.name = data.name;
          this.features.description = data.description;
          return;
        }
      });
    }
  }

  createFeature() {
    this.uploader.uploadAll();
    this.addFeature();
    this.closeFeatureCreateModel();
    console.log(this.features);

  }
  openFeatureDialog(create): void {
    if (create === 'create') {
      this.features = { id: '', description: '', name: '', connectProject: this.features.connectProject };
    }
    this.displayFeatureModel = 'block';
  }

  closeFeatureCreateModel() {
    this.displayFeatureModel = 'none';
    this.features = { id: '', description: '', name: '', connectProject: this.features.connectProject };
  }
  closeFeatureExistingModel() {
    this.displayFeatureModel = 'none';
  }

  saveEntity(entityData) {
    this.entity.name = entityData.name;
    this.entity.description = entityData.description;
    this.entity.project_id = this.selectedProject._id;
    this.projectComponentService.createEntity(this.entity).subscribe(
      (data) => {
        this.getAllEntityByProjectId();
      },
      (error) => {

      }
    );
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    this.projectComponentService.uploadeFeaturefile(this.fileToUpload).subscribe(data => {
    })
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
    this.projectComponentService.getEntityByProjectId(this.selectedProject._id).subscribe(
      (data) => {
        this.allEntity = data;
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
  //   this.projectComponentService.getDefaultEntityByProjectId(this.selectedProject._id).subscribe(data => {
  //     // data.map((data,index)=>{
  //       this.selecteddefaultEntity = [data];


  //     // let defaultEntity = Object.values(this.selecteddefaultEntity);
  //   });
  // }

  GoToDesigner() {
    this.dataService.setAllEntity(this.allEntity);
    this.router.navigate(['/desktopscreen']);
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
    this.features.connectProject = true;
    this.projectComponentService.updateFeature(this.features).subscribe(data => {
      console.log(data);
    });
    this.closeFeatureExistingModel();
    this.getAllFeature();
  }

  addFeature() {
    this.uploader.uploadAll();
    this.projectComponentService.addFeature(this.features).subscribe(data => {
      console.log(data);
      // if(data){

      // }
    });
  }

  getAllFeature() {
    this.projectComponentService.getAllFeature().subscribe(data => {
      this.featureData = data;
      data.map(data => {
        if (!this.features.connectProject) {
          this.featureConnectProject.push(data);

        }
      })
      // tslint:disable-next-line:no-shadowed-variable
      this.featureData.map((data, index) => {
        this.featureData[index].description = data.description.replace(/<[^>]*>/g, '');
      });
    });
  }

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
    this.getAllFeature();
  }
}

// image uploader for ckeditor

// export class UploadAdapter {
//   private loader;
//   constructor(loader: any) {
//     this.loader = loader;
//     console.log(this.readThis(loader.file));
//   }

//   public upload(): Promise<any> {
//     //"data:image/png;base64,"+ btoa(binaryString)
//     return this.readThis(this.loader.file);
//   }

//   readThis(file: File): Promise<any> {
//     console.log(file)
//     let imagePromise: Promise<any> = new Promise((resolve, reject) => {
//       var myReader: FileReader = new FileReader();
//       myReader.onloadend = (e) => {
//         let image = myReader.result;
//         console.log(image);
//         return { default: "data:image/png;base64," + image };
//         resolve();
//       }
//       myReader.readAsDataURL(file);
//     });
//     return imagePromise;
//   }

// }
