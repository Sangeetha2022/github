import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatGridTileHeaderCssMatStyler } from '@angular/material';
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
  showUpdateFeature: Boolean = false;
  selectedExistingFeature: String;
  featureData: any = [];
  public features: IFeature = {
    id:'',
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
  deleteFPopup: String = 'none';
  public selectedEntityId: any;
  selectedFeatureId: any;
  selectedProject: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private entityManagerService: EntityManagerService,
    private dataService: DataService
  ) {

    if (this.selectFeature === true) {
      this.features = { id:'',description: '', name: '' }
    }
  }

  ngOnInit() {
    this.getSelectedProject();
    this.getAllEntity();
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
    if(selected==="on"){
      this.features = { id:'', description: '', name: '' }
    }
  }

  onChange(selected) {
    if (selected) {
      this.featureData.map((data, index) => {
        if (data.name === selected) {
          this.features.name = data.name
          this.features.description = data.description
          return;
        }
      });
    }
  }

  createFeature() {
    this.addFeature();
    this.closeFeatureCreateModel();
    console.log(this.features)

  }
  openFeatureDialog(): void {

    this.displayFeatureModel = 'block';
  }

  closeFeatureCreateModel() {
    this.displayFeatureModel = 'none';
    this.features = { id:'', description: '', name: '' }
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
    this.entityManagerService.setEntity(entity);
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

  //Feature

  openDeleteFModel(feature) {
    this.selectedFeatureId = feature._id;
    this.deleteFPopup = 'block';
  }

  closeDeleteFModel(){
    this.deleteFPopup = 'none';
  }

  updateFeature(){
    this.entityManagerService.updateFeature(this.features).subscribe(data=>{
      console.log(data)
    })
    this.closeFeatureExistingModel();
    this.getAllFeature();
  }

  addFeature(){
    this.entityManagerService.addFeature(this.features).subscribe(data=>{
      console.log(data);
      // if(data){
        
      // }
    })
  }

  getAllFeature(){
    this.entityManagerService.getAllFeature().subscribe(data=>{
      this.featureData = data;
      var content = this.featureData[0].description;
      var plainText = content.replace(/<[^>]*>/g, '');

    })
  }

  deleteFeature(){
    this.entityManagerService.deleteFeature(this.selectedFeatureId).subscribe(data=>{
      console.log(data)
    })
    this.closeDeleteFModel();
    this.getAllFeature();
  }

  editFeatureField(feature){
    this.selectFeature = true;
    this.showUpdateFeature = true;
    this.features.id = feature._id;
    this.features.name = feature.name;
    this.features.description = feature.description;
    this.openFeatureDialog();
  }  
}
