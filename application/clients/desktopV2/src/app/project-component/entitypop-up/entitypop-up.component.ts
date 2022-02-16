import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brodcastservice } from 'src/app/broadcast.service';
import { LoggingService } from 'src/app/config/logging.service';
import { ButtonRendererComponent } from '../entity-field/button-renderer/button-renderer.component';
import { ProjectComponentService } from '../project-component.service';

@Component
({
  selector: 'app-entitypop-up',
  templateUrl: './entitypop-up.component.html',
  styleUrls: ['./entitypop-up.component.scss']
})

export class EntitypopUpComponent implements OnInit 
{
  options: string[] = ['Create Entity', 'Select Existing Entity'];
  create:boolean=false;
  existing:boolean=false;
  hide:boolean=true;
  projectId:string='';
  public rowData = [];
  public rowSelection:any;
  public columnDefs:any;
  public selectedentity: any = [];
  public defaultColDef:any;
  public gridApi:any;
  public gridColumnApi:any;
  radio_value:string='';
  frameworkComponents: { buttonRenderer: any; };
  public logId = sessionStorage.getItem('LogId');
  isPrimaryEntityPresent: boolean=true;
  public featureId: String='';
  public modelObject: any = 
  {
    name: '',
    description: '',
    entityType: '',
    selectentity: '',
    entity_id: '',
  };

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EntitypopUpComponent>,
               private brodcastservice:Brodcastservice,private projectservice:ProjectComponentService,
               private logger:LoggingService) 
  { 
    this.projectId = data.projectId;
    //Storing the values of Entity component when user add new entity
    if (data.savedEntity !== undefined && Object.keys(data.savedEntity).length > 0) 
    {
      this.modelObject.name = data.savedEntity.name;
      this.modelObject.description = data.savedEntity.description;
      this.modelObject.entityType = data.savedEntity.entity_type;
      if (this.modelObject.entityType === 'primary') 
      {
          this.isPrimaryEntityPresent = false;
      } 
      else 
      {
          if (data.isPrimaryEntityPresent) 
          {
              this.isPrimaryEntityPresent = true;
          } 
          else 
          {
              this.isPrimaryEntityPresent = false;
          }
      }
    } 
    else 
    {
      this.isPrimaryEntityPresent = data.isPrimaryEntityPresent;
      if (this.isPrimaryEntityPresent) 
      {
          this.modelObject.entityType = 'secondary';
      } 
      else 
      {
          this.modelObject.entityType = 'primary';
      }
    }
    this.frameworkComponents = {buttonRenderer: ButtonRendererComponent};
  }

  ngOnInit(): void 
  {
    let featureEntityId: any = [];
    this.brodcastservice.currentFeatureId.subscribe((featureId: String) => 
    {
        this.featureId = featureId;
    });
    this.projectservice.getFeatureById(this.featureId, this.projectId).subscribe((fatureEntity) => 
    {
        if (fatureEntity.body && fatureEntity.body.entities && fatureEntity.body.entities.length > 0) 
        {
            featureEntityId = fatureEntity.body.entities.map(({entityId}:any)=> entityId);
        }
    });
    this.projectservice.getGlobalEntityByProjectId(this.projectId, this.logId).subscribe(data => 
    {
        if (featureEntityId.length > 0 && data.body && data.body.length > 0) 
        {
            const existingEntites = data.body.filter((x: { is_default: boolean; _id: any; }) => x.is_default !== true && !featureEntityId.includes(x._id));
            this.rowData = existingEntites;
        } 
        else if (data.body && data.body.length > 0) 
        {
            const existEntities: any = data.body.filter((x: { is_default: boolean; feature_id: String; }) => x.is_default !== true && x.feature_id !== this.featureId);
            this.rowData = existEntities;    
        }
    }, error => 
       {
         this.logger.log('error',error);
       });
    this.agGridInitialization();
  }

  //Change event for th radio button for Create Entity or Select Existing Entity
  radioChange(event:any) 
  {
        if (event.value === 'Create Entity') 
        {
            this.create = true;
            this.hide = false;
            this.dialogRef.updateSize('400px', 'auto');
        }
        if (event.value === 'Select Existing Entity') 
        {
            this.dialogRef.updateSize('550px', '320px');
            this.existing = true;
            this.hide = false;
        }
  }

  //For AgGrid initialisation for existing entity
  agGridInitialization() 
  {
        this.columnDefs = 
        [
            {
                width: 100,
                checkboxSelection: true,
            },
            {
                headerName: 'Name',
                field: 'name',
                width: 350,
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 350,
            }
        ];
        this.rowSelection = 'single';
        this.defaultColDef = 
        {
            enableValue: true,
        };

  }
  //Function is called in ag-grid angular property
  onGridReady(params:any) 
  {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridColumnApi = params.columnApi;
  }

  //Used in back button functionality
  showOptions() 
  {
      this.hide = true;
      this.create = this.existing = false;
      this.dialogRef.updateSize('400px', '200px');
  }
  onSelectionChanged(event:any) 
  {
        this.selectedentity = this.gridApi.getSelectedRows();
        if (this.selectedentity.length > 0) 
        {
            this.modelObject.name = this.selectedentity[0].name;
            this.modelObject.description = this.selectedentity[0].description;
            this.modelObject.selectentity = 'Existing';
            this.modelObject.entity_id = this.selectedentity[0]._id;
        }
  }
  onNoClick(): void 
  {
        this.dialogRef.close();
  }
}
