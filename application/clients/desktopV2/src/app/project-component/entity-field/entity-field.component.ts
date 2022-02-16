import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ValueParserParams } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegexExpression } from 'src/app/config/Regex';
import { ProjectComponentService } from '../project-component.service';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { FieldPopupModalComponent } from './field-popup-modal/field-popup-modal.component';

@Component
({
  selector: 'app-entity-field',
  templateUrl: './entity-field.component.html',
  styleUrls: ['./entity-field.component.scss']
})

export class EntityFieldComponent implements OnInit 
{
  public currentEntityId:string='';
  public featureId:string='';
  public projectId:string='';
  public columnDefs:any;
  public rowData:any;
  defaultColDef!: { editable: boolean; sortable: boolean; filter: boolean; };
  public entity:any;
  public entity_name:string='';
  public allEntity:any;
  public getEntityTypeValue: any[] = [];
  public propertiesIsExist:boolean=false;
  public gridColumnApi:any;
  public propertyPopup:string='none';
  selectCellRenderedValue: String='';
  EnteredReserveWord: any;
  error_status:boolean=false;
  reserved_error_status:boolean=false;
  public logId = sessionStorage.getItem('LogId');
  frameworkComponents: { buttonRenderer: any; };
  public gridApi:any;

  constructor(private activatedRoute:ActivatedRoute,private spinner:NgxSpinnerService,
              private projectComponentService:ProjectComponentService,private regexExpression: RegexExpression,
              private toastr: ToastrService,   private location: Location,public dialog: MatDialog) 
  { 
    this.frameworkComponents = {buttonRenderer: ButtonRendererComponent};
  }

  ngOnInit(): void 
  {
    this.activatedRoute.queryParams.subscribe(params => 
    {
      if (params.entityId !== undefined && params.entityId !== null) 
      {
        this.currentEntityId = params.entityId;
      }
      if (params.featureId !== undefined && params.featureId !== null) 
      {
        this.featureId = params.featureId;
      }
      if (params.projectId !== undefined && params.projectId !== null) 
      {
        this.projectId = params.projectId;
      }
    });
    this.regexExpression.generateReservedWord();
    this.getEntityType();
    this.getEntity();
  }
  agGridInitialization() 
  {
    this.columnDefs = 
    [
      {
        headerName: 'Name',
        field: 'name',
        width: 250,
        valueSetter: this.nameValueSetter.bind(this)
      },
      {
        headerName: 'Type',
        field: 'type_name',
        width: 308,
        cellEditor: 'agSelectCellEditor',
        valueSetter: this.typeValueSetter.bind(this),
        cellEditorParams: {values: this.getEntityTypeValue}
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 450
      },
      {
        headerName: 'Action',
        width: 100,
        cellRenderer: 'buttonRenderer',
        editable: false,
        sortable: false,
        filter: false,
        cellRendererParams: 
        {
          onClick: this.removeRow.bind(this),
          label: 'Remove'
        }
      }
    ];
    this.rowData = 
    [
      {
        name: 'Enter_Name',
        type_name: 'Text',
        data_type: null,
        description: 'Description',
        is_entity_type: false,
        is_list_type: false,
        list_type: null,
        list_value: null,
        entity_id: null
      }
    ];
    this.defaultColDef = 
    {
      editable: true,
      sortable: true,
      filter: true
    };
    this.getEntity();
  }
  onAddRow() 
  {
    const newItem = this.createNewRowData();
    const res = this.gridApi.updateRowData({ add: [newItem] });
  }
   createNewRowData() 
   {
    const newData = 
    {
      name: 'Enter_Name',
      type_name: 'Text',
      data_type: null,
      description: 'Description',
      is_entitytype: false,
      is_listtype: false,
      list_type: null,
      list_value: null,
      entity_id: null
    };
    return newData;
   }
   removeRow(e:any) 
   {
    const rows = e.rowData;
    const selectedData = [rows];
    const res = this.gridApi.updateRowData({ remove: selectedData });
   }
   async getEntity() 
   {
    this.spinner.show();
    const entityDetails: any = await this.getEntityDetails();
    if (entityDetails) 
    {
      console.log("entityDetails",entityDetails);      
      this.spinner.hide();
      this.entity = entityDetails.body;
      console.log(" this.entity ", this.entity);
      console.log(" this.entity field", this.entity.field.length);
      this.entity_name=this.entity.name;
      if (this.entity.field.length > 0) 
      {
        this.rowData = this.entity.field;
      }
    }
    this.getAllEntity();
   }
   getEntityDetails() 
   {
    return new Promise((resolve) => 
    {
      this.projectComponentService.getByIdEntity(this.currentEntityId, this.logId).subscribe(data => 
      {
          resolve(data);
      },
      error => 
      {
          resolve(error);
      });
    });
   }
   getAllEntity()
   {
    if (this.featureId) 
    {
      this.getEntityByProjectId();
    } 
    else 
    {
      this.getEntityByProjectId();
    }
   }
   getEntityByProjectId() 
   {
    this.projectComponentService.getEntityByProjectId(this.projectId, this.logId).subscribe(data => 
    {
        if (data.body && data.body.length > 0) 
        {
          this.allEntity = data.body.filter((x: { _id: string; is_default: boolean; }) => x._id !== this.featureId && x.is_default !== true);
        }
    },
    error => { });
   }
   getEntityType() 
   {
    this.projectComponentService.getAllEntityType(this.logId).subscribe((data) => 
    {
        data.body.forEach((element: { typename: any; }) => 
        {
          this.getEntityTypeValue.push(element.typename);
        });
        this.agGridInitialization();
    },
    (error) => 
    {
        this.getEntityTypeValue = [];
        this.agGridInitialization();
    });
   }
   onGridReady(params:any) 
   {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
   }
   onCellValueChanged(event:any) 
   {
    const rowIndex = event.rowIndex;
    const currentEntity:any = [];
    this.gridApi.forEachNode(function (node: { data: { name: any; }; }, nodIndex: any) 
    {
      if (nodIndex !== rowIndex) 
      {
        currentEntity.push(node.data.name);
      }
    });
    console.log("currentEntity ---> ", currentEntity)
    console.log("event.data.name-------------->", event.data.name)
    const index = currentEntity.findIndex((x: any) => x === event.data.name);
    console.log('index ----> ', index)
    if (index > -1) 
    {
      this.propertiesIsExist = true;
    } 
    else 
    {
      this.propertiesIsExist = false;
    }
    if (this.propertiesIsExist) 
    {
      this.propertyPopup = 'block';
    }
   }
   closeModel() 
   {
    this.propertyPopup = 'none';
   }
   getRowData() 
   {
    const rowData:any = [];
    this.gridApi.forEachNode(function (node: { data: any; }) 
    {
      rowData.push(node.data);
    });
    return rowData;
   }
   updateEntityField(options: boolean) 
   {
    this.spinner.show();
    this.projectComponentService.updateEntityField(this.entity, this.logId).subscribe((data:any) => 
    {
        if (options) 
        {
          this.spinner.hide();
          this.toastr.success('entity fields are saved');
        } 
        else 
        {
          this.spinner.hide();
          this.toastr.success('entity fields are updated');
        }
    },
    (error) => 
    {
        this.toastr.error('something went wrong, entity is not stored');
    });
   }
   saveField() 
   {
    this.entity.field = this.getRowData();
    this.updateEntityField(true);
   }
   updateField() 
   {
    this.entity.field = this.getRowData();
    this.entity.field.forEach((prop: { name: string; }) => 
    {
      prop.name = prop.name.toLowerCase();
    });
    this.updateEntityField(false);
   }
   cancelField() 
   {
    this.location.back();
   }

   //The value setter function/method
   nameValueSetter(params: ValueParserParams) 
   {
    const regexExpr = new RegExp(this.regexExpression.getSpecialCharacter().toString(), 'g');
    const reservedRegexExpr = new RegExp(this.regexExpression.getReservedWord(), 'i');
    if (regexExpr.test(params.newValue) || /[0-9]/.test(params.newValue.toString().charAt(0))) 
    {
      this.error_status=true;
      this.reserved_error_status=false;
      this.EnteredReserveWord = null;
      return false;
    } 
    else if (reservedRegexExpr.test(params.newValue)) 
    {
      this.reserved_error_status=true;
      this.error_status=false;
      this.EnteredReserveWord = String(params.newValue).toLowerCase();
      return false;
    }
    params.data.name = params.newValue;
    this.error_status=false;
    this.reserved_error_status=false;
    return true;
   }
   typeValueSetter(params: ValueParserParams) 
   {
    console.log("params ---------------> ", params)
    const value = this.openModal(params);
    console.log("value ---------------> ", value)
    params.data.type_name = value;
    console.log("params.data ---> ", params.data)
    return true;
   }
   openModal(e:any) 
   {
    this.selectCellRenderedValue = e.newValue;
    if (this.selectCellRenderedValue === 'Entity') 
    {
      this.openDialog(this.allEntity, null, e);
    } 
    else if (this.selectCellRenderedValue === 'List') 
    {
      this.openDialog(this.allEntity, this.getEntityTypeValue, e);
    } 
    else 
    {
      e.data.is_entity_type = false;
      e.data.is_list_type = false;
      e.data.list_type = null;
      e.data.list_value = null;
      e.data.entity_id = null;
    }
    return e.newValue;
   }
   openDialog(entityValue: any, standardValue: any[] | null, e: { data: { is_entity_type: boolean; is_list_type: boolean; entity_id: null | undefined; entity_field: any; list_type: string | null; list_value: null | undefined; }; }): void 
   {
    console.log("entityValue ------------->", entityValue)
    console.log("standardValue-------------->", standardValue)
    console.log("this.entity ---> ", this.entity)
    const dialogRef = this.dialog.open(FieldPopupModalComponent, 
    {
      width: '250px',
      data: 
      {
        allEntity: entityValue,
        standard: standardValue,
        currentObj: this.entity
      }
    });
    dialogRef.afterClosed().subscribe((entityData: { entity: null | undefined; field: any; standard: undefined; } | undefined) => 
    {
      if (entityData !== undefined) 
      {
        if (standardValue === null) 
        {
          e.data.is_entity_type = true;
          e.data.is_list_type = false;
          e.data.entity_id = entityData.entity;
          e.data.entity_field = entityData.field;
          e.data.list_type = null;
          e.data.list_value = null;
        } 
        else 
        {
          e.data.is_list_type = true;
          e.data.is_entity_type = false;
          e.data.entity_id = entityData.entity;
          e.data.entity_field = entityData.field;
          if (entityData.standard !== undefined) 
          {
            e.data.list_type = 'standard';
            e.data.list_value = entityData.standard;
          } 
          else if (entityData.entity !== null || entityData.entity !== undefined) 
          {
            console.log('let me test entity --------------> ', entityData.entity)
            e.data.list_type = 'entity';
            e.data.list_value = null;
            e.data.entity_id = entityData.entity;
            e.data.entity_field = entityData.field;
          }
        }
      }
    });
   }
}
