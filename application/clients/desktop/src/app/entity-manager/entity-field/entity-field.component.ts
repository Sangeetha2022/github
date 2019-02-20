import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from './rendered/button-renderer/button-renderer.component';
import { EntityManagerService } from '../entity-manager.service';
import { IEntity } from '../interface/Entity';
import { Router } from '@angular/router';
import { ValueParserParams } from 'ag-grid-community';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService } from '../../../shared/data.service';
import { MatDialog } from '@angular/material';
import { FieldPopupModalComponent } from './field-popup-modal/field-popup-modal.component';

@Component({
  selector: 'app-entity-field',
  templateUrl: './entity-field.component.html',
  styleUrls: ['./entity-field.component.scss']
})
export class EntityFieldComponent implements OnInit {

  public gridApi;
  public gridColumnApi;

  public columnDefs;
  public rowData;
  public rowSelection;
  defaultColDef: { editable: boolean; sortable: boolean; filter: boolean; };
  frameworkComponents: { buttonRenderer: any; };

  public getEntityTypeValue: any[] = [];
  public entity: IEntity = {
    name: '',
    description: '',
    project_id: '',
    created_by: '',
    last_modified_by: '',
    updated_at: new Date(),
    field: []
  };
  public isGridInit: Boolean;
  public isValid: Boolean = true;
  // public entity: any;
  createProject: FormGroup;
  selectNounType: FormGroup;
  selectListType: FormGroup;
  testvalues: String = 'testfine';
  allEntity: IEntity[];
  selectCellRenderedValue: String;
  selectedCellRowIndex: any;

  constructor(
    private entityManagerService: EntityManagerService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit() {
    this.isGridInit = true;
    this.getEntityType();
    // this.getEntity();
  }

  getEntityType() {
    this.entityManagerService.getAllEntityType().subscribe(
      (data) => {
        data.forEach(element => {
          this.getEntityTypeValue.push(element.typename);
        });
        this.agGridInitialization();
      },
      (error) => {
        this.getEntityTypeValue = [];
        this.agGridInitialization();
      }
    );
  }

  agGridInitialization() {
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        valueSetter: this.nameValueSetter,
        suppressSizeToFit: false
      },
      {
        headerName: 'Type',
        field: 'type',
        cellEditor: 'agSelectCellEditor',
        // singleClickEdit: true,
        cellEditorParams: {
          values: this.getEntityTypeValue,
        },
        cellRenderer: this.openModal.bind(this)

      },
      {
        headerName: 'Description',
        field: 'description'
      },
      {
        headerName: 'Action',
        cellRenderer: 'buttonRenderer',
        editable: false,
        sortable: false,
        cellRendererParams: {
          onClick: this.removeRow.bind(this),
          label: 'Remove'
        }
      }
    ];
    this.rowData = [
      {
        name: 'Enter Name',
        type: 'Text',
        description: 'Description',
        is_entity_type: false,
        is_list_type: false,
        list_type: null,
        list_value: null,
        entity_id: null
      }
    ];
    // this.rowSelection = 'multiple';
    this.defaultColDef = {
      editable: true,
      sortable: true,
      filter: true
    };
    this.getEntity();
  }

  getEntity() {
    this.dataService.currentSelectedEntityInfo.subscribe(
      (data) => {
        this.entity = data;
        console.log('entity valuesa re --------------', data, this.entity.field.length);
        if (this.entity.field.length > 0) {
          this.rowData = this.entity.field;
        }
      },
      (error) => { });
    this.getAllEntity();
  }

  getAllEntity() {
   
    this.dataService.currentAllEntityInfo.subscribe(
      (data) => {
        this.allEntity = data;
      }
    );
  }

  openModal(e) {
    console.log('open modal values are ---------- ', e, this.isGridInit);
    if (this.selectCellRenderedValue !== e.value
      || this.selectedCellRowIndex !== e.rowIndex) {
      this.selectCellRenderedValue = e.value;
      this.selectedCellRowIndex = e.rowIndex;
      if (this.selectCellRenderedValue === 'Noun' && !this.isGridInit) {
        console.log('open modal noun values are  &&---------- ', e);
        this.openDialog(this.allEntity, null, e);
      } else if (this.selectCellRenderedValue === 'List'  && !this.isGridInit) {
        console.log('open modal list values are ---------- ', e);
        this.openDialog(this.allEntity, this.getEntityTypeValue, e);
      } else {
        e.data.is_entity_type = false;
        e.data.is_list_type = false;
        e.data.list_type = null;
        e.data.list_value = null;
        e.data.entity_id = null;
      }
    }
    return e.value;
  }

  openDialog(entityValue, standardValue, e): void {
    const dialogRef = this.dialog.open(FieldPopupModalComponent, {
      width: '250px',
      data: {
        allEntity: entityValue,
        standard: standardValue,
        currentObj: this.entity
      }
    });

    dialogRef.afterClosed().subscribe(entityData => {
      if (standardValue === null) {
        e.data.is_entity_type = true;
        e.data.is_list_type = false;
        e.data.entity_id = entityData.entity;
        e.data.list_type = null;
        e.data.list_value = null;
      } else {
        e.data.is_list_type = true;
        e.data.is_entity_type = false;
        e.data.entity_id = entityData.entity;
        if (entityData.standard !== undefined) {
          e.data.list_type = 'standard';
          e.data.list_value = entityData.standard;
        } else if (entityData.entity !== undefined) {
          e.data.list_type = 'entity';
          e.data.list_value = null;
          e.data.entity_id = entityData.entity;
        }
      }
    });
  }

  saveField() {
    this.entity.field = this.getRowData();
    this.updateEntityField();
  }
  updateField() {
    this.entity.field = this.getRowData();
    this.updateEntityField();
  }

  cancelField() {
    this.router.navigate(['/entity']);
  }

  updateEntityField() {
    this.entityManagerService.updateEntityField(this.entity).subscribe(
      (data) => { },
      (error) => { });
  }
  // get() {
  //   console.log('get row data in entity field are --------- ', this.getRowData());
  // }

  getRowData() {
    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    return rowData;
  }


  onAddRow() {
    const newItem = createNewRowData();
    const res = this.gridApi.updateRowData({ add: [newItem] });
  }
  removeRow(e) {
    const rows = e.rowData;
    const selectedData = [
      rows
    ];
    const res = this.gridApi.updateRowData({ remove: selectedData });
  }

  // The value setter function/method
  nameValueSetter(params: ValueParserParams) {
    const regexExpr = /`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\"|\;|\:|\s/;
    if (regexExpr.test(params.newValue) || /[0-9]/.test(params.newValue.toString().charAt(0))) {
      setDivStyle('block');
      return false;
    }
    params.data[params.colDef.field] = params.newValue;
    setDivStyle('none');
    return true;
  }
  onGridReady(params) {
    console.log('onGrid ready valuses are ------- ', this.isGridInit);
    this.isGridInit = false;
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
  }
}

function createNewRowData() {
  const newData = {
    name: 'Enter Name',
    type: 'Text',
    description: 'Description',
    is_entitytype: false,
    is_listtype: false,
    list_type: null,
    list_value: null,
    entity_id: null
  };
  return newData;
}

function setDivStyle(styleValue) {
  const errorDiv = document.getElementsByClassName('errorField')[0] as HTMLElement;
  errorDiv.style.display = styleValue;
}
