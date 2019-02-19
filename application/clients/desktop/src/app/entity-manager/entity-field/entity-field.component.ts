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
  public test: String = '';
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
    this.createProject = this.formBuilder.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      appContext: '',
      description: '',
      primaryLanguage: ['', Validators.required],
      secondaryLanguage: [''],
    });
    this.selectNounType = new FormGroup({
      allEntity: new FormControl(null)
    });
    this.selectListType = new FormGroup({
      entity: new FormControl(null),
      standard: new FormControl(null)
    });
    // this.agGridInitialization();
    this.selectNounType.controls['allEntity'].setValue('', { onlySelf: true });
    this.selectListType.controls['entity'].setValue('', { onlySelf: true });
    this.selectListType.controls['standard'].setValue('', { onlySelf: true });
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
        field: 'Name',
        valueSetter: this.nameValueSetter,
        suppressSizeToFit: false
      },
      {
        headerName: 'Type',
        field: 'Type',
        cellEditor: 'agSelectCellEditor',
        // singleClickEdit: true,
        cellEditorParams: {
          values: this.getEntityTypeValue,
        },
        cellRenderer: this.openModal.bind(this)

      },
      {
        headerName: 'Description',
        field: 'Description'
      },
      {
        headerName: 'Action',
        cellRenderer: 'buttonRenderer',
        editable: false,
        cellRendererParams: {
          onClick: this.removeRow.bind(this),
          label: 'Remove'
        }
      }
    ];
    this.rowData = [
      {
        Name: 'Enter Name',
        Type: 'Text',
        Description: 'Description',
        isEntityType: false,
        isListType: false,
        ListType: '',
        ListId: '',
        EntityId: ''
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
    if (this.selectCellRenderedValue !== e.value
      || this.selectedCellRowIndex !== e.rowIndex) {
      this.selectCellRenderedValue = e.value;
      this.selectedCellRowIndex = e.rowIndex;
      if (this.selectCellRenderedValue === 'Noun') {
        this.openDialog(this.allEntity, null, e);
      } else if (e.value === 'List') {
        this.openDialog(this.allEntity, this.getEntityTypeValue, e);
      } else {
        e.data.isEntityType = false;
        e.data.isListType = false;
        e.data.ListType = '';
        e.data.ListId = '';
        e.data.EntityId = '';
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
        e.data.isEntityType = true;
        e.data.isListType = false;
        e.data.EntityId = entityData.entity;
        e.data.ListType = '';
        e.data.ListId = '';
      } else {
        e.data.isListType = true;
        e.data.isEntityType = false;
        e.data.EntityId = entityData.entity;
        if (entityData.standard !== undefined) {
          e.data.ListType = 'standard';
          e.data.ListId = entityData.standard;
        } else if (entityData.entity !== undefined) {
          e.data.ListType = 'entity';
          e.data.ListId = entityData.entity;
        }
      }
    });
  }

  saveField() {
    this.entity.field = this.getRowData();
    this.updateEntity();
  }
  updateField() {
    this.entity.field = this.getRowData();
    this.updateEntity();
  }

  cancelField() {
    this.router.navigate(['/entity']);
  }

  updateEntity() {
    this.entityManagerService.updateEntity(this.entity).subscribe(
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
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
  }
}

function createNewRowData() {
  const newData = {
    Name: 'Enter Name',
    Type: 'Text',
    Description: 'Description',
    isEntityType: false,
    isListType: false,
    ListType: '',
    ListId: '',
    EntityId: ''
  };
  return newData;
}

function setDivStyle(styleValue) {
  const errorDiv = document.getElementsByClassName('errorField')[0] as HTMLElement;
  errorDiv.style.display = styleValue;
}
