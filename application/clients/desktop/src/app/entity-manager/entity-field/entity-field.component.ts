import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from './rendered/button-renderer/button-renderer.component';
import { EntityManagerService } from '../entity-manager.service';
import { IEntity } from '../interface/Entity';
import { Router } from '@angular/router';
import { ValueParserParams } from 'ag-grid-community';

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

  public entity: IEntity = {
    name: '',
    description: '',
    field: []
  };
  public test: String = '';
  public isValid: Boolean = true;
  // public entity: any;

  constructor(
    private entityManagerService: EntityManagerService,
    private router: Router
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit() {
    this.agGridInitialization();
    this.getEntity();
  }

  agGridInitialization() {
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'Name',
        valueSetter: this.nameValueSetter
      },
      {
        headerName: 'Type',
        field: 'Type',
        // editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: [
            'Text',
            'Number',
            'Decimal',
            'Date',
            'Boolean',
            'Picture',
            'Sound',
            'Video',
            'Noun',
            'List',
            'File_Attachement',
            'Rich_Text'
          ]
        }
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
        Description: 'Description'
      }
    ];
    // this.rowSelection = 'multiple';
    this.defaultColDef = {
      editable: true,
      sortable: true,
      filter: true
    };
  }

  getEntity() {
    this.entityManagerService.currentEntityInfo.subscribe(
      (data) => {
        this.entity = data;
        if (this.entity.field.length > 0) {
          this.rowData = this.entity.field;
        }
      },
      (error) => { });
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
    Description: 'Description'
  };
  return newData;
}

function setDivStyle(styleValue) {
  const errorDiv = document.getElementsByClassName('errorField')[0] as HTMLElement;
  errorDiv.style.display = styleValue;
}

