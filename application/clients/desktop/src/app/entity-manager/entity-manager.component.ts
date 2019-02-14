import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupModelComponent } from './popup-model/popup-model.component';
import { EntityManagerService } from './entity-manager.service';
import { IEntity } from './interface/Entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entity-manager',
  templateUrl: './entity-manager.component.html',
  styleUrls: ['./entity-manager.component.scss']
})

export class EntityManagerComponent implements OnInit {
  panelOpenState = false;
  public entity: IEntity = {
    name: '',
    description: '',
    field: []
  };
  public allEntity: IEntity[] = [];
  public deletePopup: String = 'none';
  public selectedEntityId: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private entityManagerService: EntityManagerService
  ) { }

  ngOnInit() {
    this.getAllEntity();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupModelComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(entityData => {
      console.log('The dialog was closed -- ', entityData);
      if (entityData !== undefined) {
        this.saveEntity(entityData);
      }
    });
  }

  saveEntity(entityData) {
    this.entity.name = entityData.name;
    this.entity.description = entityData.description;
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
        console.log('get all entity data ----- ', data);
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
    console.log('delete entity id are ---- ', this.selectedEntityId);
    this.deletePopup = 'none';
    this.entityManagerService.deleteEntity(this.selectedEntityId).subscribe(
      (data) => {
        this.getAllEntity();
      },
      (error) => {

      }
    );
  }
}
