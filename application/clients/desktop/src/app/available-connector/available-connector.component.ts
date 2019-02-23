import { Component, OnInit } from '@angular/core';
import { Connector } from './interface/connector';
import { ComponentFlowsService } from '../component-flows/component-flows.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-available-connector',
  templateUrl: './available-connector.component.html',
  styleUrls: ['./available-connector.component.scss']
})
export class AvailableConnectorComponent implements OnInit {
  isDisplayConnector: boolean;
  addConnectorModel;
  connectorColDef;
  rowSelection;
  private fieldArray: Array<any> = [];
  defaultColDef;
  connectorFlowGrid;
  connectorData: any = [];
  createConnectorForm: FormGroup;
  selectedAvaConnector: any = [];
  connector: Connector = {
    id: '',
    name: '',
    description: '',
    url: '',
    properties: []
  }

  constructor(
    private componentFlowsService: ComponentFlowsService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.getAllConnector();
    this.setUpAgGrid();
    this.getForms();
  }

  openAddConnectorModal(type) {
    if (type === 'create') {
      console.log("i am here")
      this.isDisplayConnector = true;
      this.connector = { description: '', name: '', id: '', url: '', properties: [] }
      this.addConnectorModel = 'block'
    }
    if (type === 'update') {
      this.isDisplayConnector = false;
      this.connector = this.selectedAvaConnector[0]
      console.log(this.connector)
      this.addConnectorModel = 'block'
    }

  }

  addFieldValue() {
    this.fieldArray.push({
      key: '',
      value: ''
    });
    this.connector.properties = this.fieldArray;
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  deleteConnector() {
    this.componentFlowsService.deleteConnector(this.connector.id).subscribe(data => {
      console.log(data)
    })
    this.onCloseConnectorHandled();
    this.getAllConnector();

  }

  createConnector() {
    this.componentFlowsService.saveConnector(this.connector).subscribe(data => {
      console.log("i am the data u r expected", data)

    })
    this.onCloseConnectorHandled();
    this.getAllConnector();
  }

  updateConnector() {
    console.log("i am the connector id", this.connector)
    this.componentFlowsService.updateConnector(this.connector).subscribe(data => {
      console.log("i am the data u r expected", data)

    })
    this.onCloseConnectorHandledUpdate();
    this.getAllConnector();
  }

  onCloseConnectorHandled() {
    this.createConnectorForm.clearValidators();
    this.createConnectorForm.reset();
    this.addConnectorModel = 'none';
  }

  onCloseConnectorHandledUpdate() {
    this.addConnectorModel = 'none';
  }

  selectAvaConnector() {
    this.selectedAvaConnector = this.connectorFlowGrid.getSelectedRows();
    this.connector.id = this.selectedAvaConnector[0]._id;
    console.log("this.selectedFlowCmpnt[0].component_name.length", this.selectedAvaConnector[0]._id)
  }

  getAllConnector() {
    this.componentFlowsService.getAllConnector().subscribe(data => {
      this.connectorData = data;
      console.log("this is the data", this.connectorData)
    })
  }

  onGridConnectorReady(params) {
    this.connectorFlowGrid = params.api;
    this.connectorFlowGrid.sizeColumnsToFit();
  }

getForms(){
  this.createConnectorForm = this.formBuilder.group({
    name: '',
    description: '',
    url: '',
    properties: this.formBuilder.group({
    })
  })
}

setUpAgGrid(){
  this.connectorColDef = [
    { headerName: 'Name', field: 'name', checkboxSelection: true },
    { headerName: 'Description', field: 'description' },
    { headerName: 'URL', field: 'url' },
  ]
  this.rowSelection = 'single';

  this.defaultColDef = {
    enableValue: true,
    resizable: true
  };
}
}
