import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupModelComponent } from './popup-model/popup-model.component';
import { EntityManagerService } from './entity-manager.service';
import { DataService } from '../../shared/data.service';
import { IEntity } from './interface/Entity';
import { IFeature } from './interface/Feature';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-entity-manager',
  templateUrl: './entity-manager.component.html',
  styleUrls: ['./entity-manager.component.scss']
})

export class EntityManagerComponent implements OnInit {
  public Editor = ClassicEditor;
  selectFeature: Boolean = true;
  selectedExistingFeature: String;
  public existingFeature: any[] = [{
    "id": '1',
    "name": 'First',
    "description": 'I am the 1st',
  }, {
    "id": '2',
    "name": 'Second',
    "description": 'I am the 2st',
  }, {
    "id": '3',
    "name": 'Third',
    "description": 'I am the 3st',
  }, {
    "id": '4',
    "name": 'Fourth',
    "description": 'I am the 4st',
  }, {
    "id": '5',
    "name": 'Fifth',
    "description": 'I am the 5st',
  },]
  public features: IFeature = {
    name: '',
    description: '',
    // explanation:'',
  };
  panelOpenState = false;
  displayFeatureModel: string = 'none';
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
  public selectedEntityId: any;
  selectedProject: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private entityManagerService: EntityManagerService,
    private dataService: DataService
  ) {

    if (this.selectFeature === true) {
      console.log("i am the one")
      this.features = { description: '', name: '' }
    }
  }

  ngOnInit() {
    this.getSelectedProject();
    this.getAllEntity();
    console.log("selectFeature", this.selectFeature)
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
    console.log(selected)
    if(selected==="on"){
      this.features = { description: '', name: '' }
    }
  }

  onChange(selected) {
    if (selected) {
      this.existingFeature.map((data, index) => {
        if (data.name === selected) {
          this.features.name = data.name
          this.features.description = data.description
          console.log("i am the new one", data)
          return;
        }
      });
    }
    console.log("i am the selected one", selected)
  }

  createFeature() {
    console.log(this.features)

  }
  openFeatureDialog(): void {

    this.displayFeatureModel = 'block';
  }

  closeFeatureCreateModel() {
    console.log("i am the create")
    this.displayFeatureModel = 'none';
    this.features = { description: '', name: '' }
  }
  closeFeatureExistingModel() {
    console.log("i am the Existing")
    this.displayFeatureModel = 'none';
  }

  saveEntity(entityData) {
    this.entity.name = entityData.name;
    this.entity.description = entityData.description;
    this.entity.project_id = this.selectedProject._id;
    this.entity.updated_at = new Date();
    this.entityManagerService.createEntity(this.entity).subscribe(
      (data) => {
        this.getAllEntity();
      },
      (error) => {

      }
    );
  }
  getAllEntity() {
    this.entityManagerService.getAllEntity().subscribe(
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
    this.dataService.setAllEntity(this.allEntity);
    this.router.navigate(['/entity-field']);
  }
  deleteEntity() {
    this.deletePopup = 'none';
    this.entityManagerService.deleteEntity(this.selectedEntityId).subscribe(
      (data) => {
        this.getAllEntity();
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
  GoToDesigner() {
    this.dataService.setAllEntity(this.allEntity);
    this.router.navigate(['/desktopscreen']);
  }
}
