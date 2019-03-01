import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { MatDialog, MatGridTileHeaderCssMatStyler } from '@angular/material';
import { PopupModelComponent } from './popup-model/popup-model.component';
import { EntityManagerService } from './project-component.service';
import { DataService } from '../../shared/data.service';
import { IEntity } from './interface/Entity';
import { IFeature } from './interface/Feature';
import { Router } from '@angular/router';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.scss']
})

export class EntityManagerComponent implements OnInit {
  public Editor = ClassicEditor;
  selectFeature: Boolean = true;
  showUpdateFeature: Boolean = false;
  selectedExistingFeature: String;
  featureData: any = [];
  // user: any = [];
  public features: IFeature = {
    id: '',
    name: '',
    description: '',
    // explanation:'',
  };
  panelOpenState = false;
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
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private entityManagerService: EntityManagerService,
    private dataService: DataService
  ) {

    if (this.selectFeature === true) {
      this.features = { id: '', description: '', name: '' };
    }
  }

  ngOnInit() {
    this.getSelectedProject();
    this.getAllEntityByProjectId();
    // this.getDefaultEntityByProjectId();
    this.getAllFeature();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupModelComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(entityData => {
      if (entityData !== undefined) {
        this.saveEntity(entityData);
      }
    });
  }
  onChangeRadio(selected) {
    if (selected === 'on') {
      this.features = { id: '', description: '', name: '' };
    }
  }

  onChange(selected) {
    if (selected) {
      this.featureData.map((data, index) => {
        if (data.name === selected) {
          this.features.name = data.name;
          this.features.description = data.description;
          return;
        }
      });
    }
  }

  createFeature() {
    this.addFeature();
    this.closeFeatureCreateModel();
    console.log(this.features);

  }
  openFeatureDialog(create): void {
    if (create === 'create') {
      console.log('sandsldsnlanlsnd');
      this.showUpdateFeature = false;
      this.features = { id: '', description: '', name: '' };
    }
    this.displayFeatureModel = 'block';
  }

  closeFeatureCreateModel() {
    this.displayFeatureModel = 'none';
    this.features = { id: '', description: '', name: '' };
  }
  closeFeatureExistingModel() {
    this.displayFeatureModel = 'none';
  }

  saveEntity(entityData) {
    this.entity.name = entityData.name;
    this.entity.description = entityData.description;
    this.entity.project_id = this.selectedProject._id;
    this.entity.updated_at = new Date();
    this.entityManagerService.createEntity(this.entity).subscribe(
      (data) => {
        this.getAllEntityByProjectId();
      },
      (error) => {

      }
    );
  }
  getAllEntityByProjectId() {
    this.entityManagerService.getEntityByProjectId(this.selectedProject._id).subscribe(
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

  deleteEntity() {
    this.deletePopup = 'none';
    this.entityManagerService.deleteEntity(this.selectedEntityId).subscribe(
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
        console.log('this is the data', this.selectedProject._id);
      }
    );
  }

  // getDefaultEntityByProjectId() {
  //   this.entityManagerService.getDefaultEntityByProjectId(this.selectedProject._id).subscribe(data => {
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
    this.entityManagerService.updateFeature(this.features).subscribe(data => {
      console.log(data);
    });
    this.closeFeatureExistingModel();
    this.getAllFeature();
  }

  addFeature() {
    this.entityManagerService.addFeature(this.features).subscribe(data => {
      console.log(data);
      // if(data){

      // }
    });
  }

  getAllFeature() {
    this.entityManagerService.getAllFeature().subscribe(data => {
      this.featureData = data;
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
    this.entityManagerService.deleteFeature(this.selectedFeatureId).subscribe(data => {
      console.log(data);
    });
    this.closeDeleteFModel();
    this.getAllFeature();
  }

  editFeatureField(feature) {
    this.selectFeature = true;
    this.showUpdateFeature = true;
    this.features.id = feature._id;
    this.features.name = feature.name;
    this.features.description = feature.description;
    this.openFeatureDialog('');
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
