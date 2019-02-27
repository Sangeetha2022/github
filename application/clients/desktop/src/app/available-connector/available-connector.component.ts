import { Component, OnInit } from '@angular/core';
import { Connector } from './interface/connector';
import { ComponentFlowsService } from '../component-flows/component-flows.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

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
  showApiModal: String = 'none';
  selectedType: String = null;
  connector: Connector = {
    id: '',
    name: '',
    description: '',
    url: '',
    available_apis: [{
      name: "",
      description: "",
      type: "",
      properties: [{
        key: "",
        value: ""
      }]
    }],
    properties: []
  }
  properties: FormArray;
  available_apis: FormArray;
  selectedApiCon: null;
  selcetedIndex: 0;

  constructor(
    private componentFlowsService: ComponentFlowsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getAllConnector();
    this.setUpAgGrid();
    this.generateForm();
  }

  openAddConnectorModal(type) {
    if (type === 'create') {
      console.log("i am here")
      this.isDisplayConnector = true;
      this.connector = {
        id: '',
        url: '',
        properties: [],
        description: '', name: '',
        available_apis: [{
          name: "",
          description: "",
          type: "",
          properties: [{
            key: "",
            value: ""
          }]
        }]
      }
      this.addConnectorModel = 'block'
    }
    if (type === 'update') {
      this.isDisplayConnector = false;
      this.connector = this.selectedAvaConnector[0]
      console.log(this.connector)
      this.addConnectorModel = 'block'
    }

  }

  addProperties(): void {
    this.connector.properties.push({
      key: '',
      value: ''
    })
  }

  addAPIProperties(): void {
    console.log(" === == >>  ", this.connector.available_apis[this.selcetedIndex].properties)
    this.connector.available_apis[this.selcetedIndex].properties.push({
      key: '',
      value: ''
    })
  }

  generateForm() {
    console.log("====>", this.selectedAvaConnector)
    this.createConnectorForm = this.formBuilder.group({
      name: '',
      description: '',
      url: '',
      available_apis: this.selectedAvaConnector.length > 0 ? this.formBuilder.array(this.selectAvaConnector[0].available_apis) : this.formBuilder.array([this.createApi()]),
      properties: this.formBuilder.array([this.createProp()])
    })
  }

  createApi(): FormGroup {
    // if (this.selectedAvaConnector.length > 0) {
    //   console.log(" = = = = = =  = =1=====>", this.createConnectorForm.getRawValue())
    //   return this.formBuilder.group(this.selectAvaConnector[0].available_apis)
    // } else {
    // console.log(" = = = = = =  = =2222=====>", this.createConnectorForm.getRawValue())
    return this.formBuilder.group({
      name: "",
      description: "",
      type: "",
      properties: this.formBuilder.array([this.createApiProp()])
    })
    // }
  }

  createApiProp(): FormGroup {
    return this.formBuilder.group({
      key: "",
      value: ""
    })
  }

  createProp(): FormGroup {
    return this.formBuilder.group({
      key: '',
      value: ''
    });
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

  onShowAPI() {
    this.showApiModal = 'block'
    if (this.selectedAvaConnector.length > 0) {
      this.connector = this.selectedAvaConnector[0]
      console.log(" - -> >  ", this.connector)
    } else {
      this.connector = {
        id: '',
        url: '',
        properties: [],
        description: '', name: '',
        available_apis: [{
          name: "",
          description: "",
          type: "",
          properties: [{
            key: "",
            value: ""
          }]
        }]
      }
    }
    // if (type === 'create') {
    //   console.log("i am here")
    //   this.isDisplayConnector = true;
    // this.connector = { description: '', name: '', id: '', url: '', properties: [] }
    //   this.addConnectorModel = 'block'
    // }
    // if (type === 'update') {
    //   this.isDisplayConnector = false;
    //   console.log(this.connector)
    //   this.addConnectorModel = 'block'
    // }
    console.log("--->> >selected connectror", this.selectedAvaConnector[0])
  }

  closeModal() {
    this.showApiModal = 'none'
  }

  onFCSelectionChanged(event) {
    console.log("selection changed, ", event.api.getSelectedNodes());
  }

  createConnector() {
    console.log(" - - -     ?  ? ? ? ? ", this.connector)
    // this.componentFlowsService.saveConnector(this.connector).subscribe(data => {
    //   console.log("i am the data u r expected", data)

    // })
    // this.onCloseConnectorHandled();
    // this.getAllConnector();
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

  selectTypesForKey(type) {

  }

  onCloseConnectorHandledUpdate() {
    this.addConnectorModel = 'none';
  }

  selectAvaConnector() {
    this.selectedAvaConnector = this.connectorFlowGrid.getSelectedRows();
    this.connector.id = this.selectedAvaConnector[0]._id;
    console.log("this.selectedFlowCmpnt[0].component_name.length", this.selectedAvaConnector[0]._id)
  }

  selectAvaConProp(apis, index) {
    //  TODO: start from here to integrate and app available connetor method proppertoes 
    this.selectedApiCon = apis;
    this.selcetedIndex = index;
    console.log("= == = >> > > > > ", apis, index)
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

  setUpAgGrid() {
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
