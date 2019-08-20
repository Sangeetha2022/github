import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from './rendered/button-renderer/button-renderer.component';
import { ProjectComponentService } from '../project-component.service';
import { IEntity } from '../interface/Entity';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ValueParserParams } from 'ag-grid-community';
import { DataService } from '../../../shared/data.service';
import { MatDialog } from '@angular/material';
import { FieldPopupModalComponent } from './field-popup-modal/field-popup-modal.component';
import { ToastrService } from 'ngx-toastr';
import { RegexExpression } from '../../config/Regex';

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
    entity_type: '',
    project_id: '',
    feature_id: '',
    created_by: '',
    last_modified_by: '',
    updated_at: new Date(),
    field: []
  };

  public editedProp: string;
  public isValid: Boolean = true;
  // public entity: any;
  allEntity: IEntity[];
  selectCellRenderedValue: String;
  currentRowData: any;
  selectedCellRowIndex: any;
  EnteredReserveWord: String;
  projectId: any;
  propertyPopup: String = 'none';
  propertiesIsExist: Boolean = false;
  featureId: any;

  constructor(
    private entityManagerService: ProjectComponentService,
    private router: Router,
    private location: Location,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private regexExpression: RegexExpression,
    private dataService: DataService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit() {
    this.regexExpression.generateReservedWord();
    this.getEntityType();
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
        width: 250,
        valueSetter: this.nameValueSetter.bind(this),
      },
      {
        headerName: 'Type',
        field: 'type_name',
        width: 308,
        cellEditor: 'agSelectCellEditor',
        // singleClickEdit: true,
        valueSetter: this.typeValueSetter.bind(this),
        cellEditorParams: {
          values: this.getEntityTypeValue,
        },
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 450,
      },
      {
        headerName: 'Action',
        width: 100,
        cellRenderer: 'buttonRenderer',
        editable: false,
        sortable: false,
        filter: false,
        cellRendererParams: {
          onClick: this.removeRow.bind(this),
          label: 'Remove'
        }
      }
    ];
    this.rowData = [
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
    this.selectCellRenderedValue = e.newValue;
    if (this.selectCellRenderedValue === 'Entity') {
      this.openDialog(this.allEntity, null, e);
    } else if (this.selectCellRenderedValue === 'List') {
      this.openDialog(this.allEntity, this.getEntityTypeValue, e);
    } else {
      e.data.is_entity_type = false;
      e.data.is_list_type = false;
      e.data.list_type = null;
      e.data.list_value = null;
      e.data.entity_id = null;
    }
    return e.newValue;
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
      if (entityData !== undefined) {
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
      }
    });
  }

  saveField() {
    this.entity.field = this.getRowData();
    this.updateEntityField(true);
  }
  updateField() {
    this.entity.field = this.getRowData();
    this.entity.field.forEach(prop => {
      prop.name = prop.name.toLowerCase();
    });
    this.updateEntityField(false);
  }

  cancelField() {
    this.location.back();
  }

  onCellValueChanged(event) {
    const rowIndex = event.rowIndex;
    const currentEntity = [];
    this.gridApi.forEachNode(function (node, index) {
      if (index !== rowIndex) {
        currentEntity.push(node.data.name);
      }
    });

    const index = currentEntity.findIndex(x =>
      x === event.data.name);

    if (index > -1) {
      this.propertiesIsExist = true;
    } else {
      this.propertiesIsExist = false;
    }

    if (this.propertiesIsExist) {
      this.propertyPopup = 'block';
    }
  }

  closeModel() {
    this.propertyPopup = 'none';
  }

  updateEntityField(options) {
    this.entityManagerService.updateEntityField(this.entity).subscribe(
      (data) => {
        if (options) {
          this.toastr.success('entity fields are saved');
        } else {
          this.toastr.success('entity fields are updated');
        }
      },
      (error) => {
        this.toastr.error('something went wrong, entity are not stored');
      });
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
    // const regexExpr = /`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\"|\;|\:|\s/;
    const regexExpr = new RegExp(this.regexExpression.getSpecialCharacter().toString(), 'g');
    const reservedRegexExpr = new RegExp(this.regexExpression.getReservedWord(), 'i');
    if (regexExpr.test(params.newValue) || /[0-9]/.test(params.newValue.toString().charAt(0))) {
      setDivStyle('block');
      this.EnteredReserveWord = null;
      return false;
    } else if (reservedRegexExpr.test(params.newValue)) {
      setDivStyle('block');
      this.EnteredReserveWord = String(params.newValue).toLowerCase();
      return false;
    }
    params.data[params.colDef.field] = params.newValue;
    setDivStyle('none');
    return true;
  }

  typeValueSetter(params: ValueParserParams) {
    const value = this.openModal(params);
    params.data[params.colDef.field] = value;
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

function setDivStyle(styleValue) {
  const errorDiv = document.getElementsByClassName('errorField')[0] as HTMLElement;
  errorDiv.style.display = styleValue;
}
