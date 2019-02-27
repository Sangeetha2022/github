import { Component, OnInit } from '@angular/core';
import { Connector } from './interface/connector';
import { ComponentFlowsService } from '../component-flows/component-flows.service';

@Component({
  selector: 'app-available-connector',
  templateUrl: './available-connector.component.html',
  styleUrls: ['./available-connector.component.scss']
})
export class AvailableConnectorComponent implements OnInit {
  connectorColDef;
  rowSelection;
  defaultColDef;
  connectorFlowGrid;
  connectorData: any = [];
  addedProperties: any =[]
  addedApiProperties: any = [];
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
  };
  apiIndex : any;
  selectedApiCon: null;
  selcetedIndex: 0;
  selectedAvaConProp: Boolean = false;

  constructor(
    private componentFlowsService: ComponentFlowsService
  ) { }

  ngOnInit() {
    this.getAllConnector();
    this.setUpAgGrid();
  }

  addProperties(): void {
    this.connector.properties.push({
      key: '',
      value: ''
    })
  }

  addAPIProperties(): void {
    this.connector.available_apis[this.selcetedIndex].properties.push({
      key: '',
      value: ''
    })
  }

  deleteConnector() {
    this.componentFlowsService.deleteConnector(this.connector.id).subscribe(data => {
      console.log(data)
    })
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
  }

  closeModal() {
    this.showApiModal = 'none';
    this.selectedApiCon = null;
    this.selcetedIndex = 0;
    Array.from(document.querySelectorAll('input[name="apisradio"]:checked'), input => input["checked"] = false);
  }


  createConnector() {
    console.log(" - - -     ?  ? ? ? ? ", this.connector.properties)
    
       

    console.log("i am the connector",this.connector)
    this.componentFlowsService.saveConnector(this.connector).subscribe(data => {
      console.log("i am the data u r expected", data)

    })
    this.getAllConnector();
    this.closeModal();

  }

  updateConnector() {
    this.addedApiProperties = []; 
    this.addedProperties = []

    this.connector.properties.map(data => {
      console.log("___________>>>>?>??>?>????? ", data)
      if (data.key !== "" || data.value !== "") {
        this.addedProperties.push(data)
      }
    })
    this.connector.properties = this.addedProperties;
    if(this.selectedAvaConProp){
    this.connector.available_apis[this.selcetedIndex].properties.map((data, index) => {
        if (data.key !== "" || data.value !== "") {
          this.addedApiProperties.push(data);
        }
      })
      this.connector.available_apis[this.selcetedIndex].properties = this.addedApiProperties
      console.log("asldhadodhsoiadosa",this.addedApiProperties);
    }
    console.log("i am the connector id", this.connector)
    this.componentFlowsService.updateConnector(this.connector).subscribe(data => {
      console.log("i am the data u r expected", data)

    })
    this.getAllConnector();
    this.closeModal();
  }

  selectAvaConnector() {
    this.selectedAvaConnector = this.connectorFlowGrid.getSelectedRows();
    this.connector.id = this.selectedAvaConnector[0]._id;
  }

  selectAvaConProp(apis, index) {
    this.selectedAvaConProp = true;
    this.selectedApiCon = apis;
    this.selcetedIndex = index;
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
