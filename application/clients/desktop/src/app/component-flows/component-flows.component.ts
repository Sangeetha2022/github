import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FlowManagerService } from '../flow-manager/flow-manager.service';
import { ComponentFlowsService } from './component-flows.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMicroFlow } from './interface/microFlow';
import { IFlowComponent } from './interface/flowComponents';
import { Connector } from './interface/connector';
import { IGenerateFlow } from '../flow-manager/interface/generationFlow';

@Component({
  selector: 'app-component-flows',
  templateUrl: './component-flows.component.html',
  styleUrls: ['./component-flows.component.scss']
})
export class ComponentFlowsComponent implements OnInit {
  // iMicroFlow: IMicroFlow = {
  //   _id: '',
  //   sequence_id: '',
  //   component_name: '',
  //   micro_flow_step_name: '',
  // }
  connector: Connector = {
    id: '',
    name: '',
    description: '',
    url: '',
    properties: []
  }

  dconnector: Connector = {
    id: '',
    name: '',
    description: '',
    url: '',
    properties: []
  }

  iFlowComponent: IFlowComponent = {
    component_name: '',
    label: '',
    type: '',
    sequence_id: '',
    dev_language: '',
    dev_framework: '',
    description: '',
    connector: false,
  };
  // private test;
  // private fieldArray: Array<any> = [];
  // columnDefs;
  // tableArr: any = [];
  // getFlowCompName: string;
  // icons;
  // rowData;
  // selectedConnector;
  // microFlowDatatoUpdate: any = [];
  // data: any = [];
  // linkedConnectorData: any = [];
  // gridColumnApi;
  // addConnectorModel;
  // microFlowId;
  // showMicroFlow: Boolean = false;
  // isDisplayMicroFlow: Boolean;

  // isDisplayConnector: boolean;
  // connectorolDef;
  // flow_component_sequence: any = [];
  // selectedFlow: any = [];
  // selectedMFlow: any = [];
  // flowCompSeq: any = [];
  // message: string;
  // addMFModel: String = 'none';

  // showConnectors: boolean;
  // gridOptions;

  // ag-grid 
  // rowSelection: String = null;
  // defaultColDef: any = null;
  // microColDef: any = [];
  // fcompColDefs: any = null;
  // connectorColDef: any = [];
  // linkedConnectorColDef: any = [];
  // flowCompGrid: any = [];
  // microFlowGrid: any = [];
  // connectorFlowGrid: any = [];

  rowSelection;
  defaultColDef;

  microColDef;
  fcompColDefs;
  connectorColDef;
  linkedConnectorColDef;

  flowCompGrid;
  microFlowGrid;
  connectorFlowGrid;
  linkedFlowGrid: any = [];

  // Form 
  createFlowComponentForm: FormGroup;
  createMFlowForm: FormGroup;
  createDConnectorForm: FormGroup;
  createConnectorForm: FormGroup;

  flow_comp: any = [];
  flow_id: String = null;
  flow_deatils: any = {};
  default_connector: any = null;
  connectorData: any = [];
  microFlow: any = [];
  selectedFlow: any = [];
  isDisableFlowComp: boolean = true;
  addModel: String = 'none';
  addDConnector: String = 'none';
  isDisplayDConnector: boolean = true;
  selectedDConnector: any = [];

  constructor(private formBuilder: FormBuilder, private flowManagerService: FlowManagerService, private componentFlowsService: ComponentFlowsService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log("------------>essssssrr--------->>")
    this.setupAgGrid();
    this.getDataFromFlowService();
    this.getAllConnector();
    this.generateForms();
  }

  getDataFromFlowService() {
    this.flowManagerService.currentMessage.subscribe((id) => {
      this.flow_id = id;
      this.getFlowSequence(id);
    }, (error) => {
      console.log("------------>err--------->>", error)
    });
  }

  getFlowSequence(id) {
    this.componentFlowsService.getFlowSequence(id).subscribe((data) => {
      this.flow_deatils = data;
      this.flow_comp = data.flow_comp_seq;
      console.log("------------>err--------->>", this.flow_comp)
    });
  }

  selectFlowComponent() {
    this.selectedFlow = this.flowCompGrid.getSelectedRows();
    if (this.selectedFlow[0].linked_connector) {
      this.default_connector = [this.selectedFlow[0].linked_connector];
    } else {
      this.default_connector = null
    }
    this.getMicroFlowName(this.selectedFlow[0].component_name);
  }

  selectDefaultConnector() {
    this.selectedDConnector = this.linkedFlowGrid.getSelectedRows();
    console.log("================>>>>", this.selectedDConnector);
  }

  // selectAvaConnector() {
  //   let selectedRows = this.connectorFlowGrid.getSelectedRows();
  //   console.log("this.selectedFlow[0].component_name.length", selectedRows)
  // }
  // onFCSelectionChanged(event) {
  //   console.log("selection changed, " , event.api.getSelectedNodes());
  // }

  // openAddMFModal(type) {
  //   if (type === 'create') {
  //     this.isDisplayMicroFlow = true;
  //     this.iMicroFlow = { sequence_id: '', component_name: '', _id: '', micro_flow_step_name: '' }
  //     this.addMFModel = 'block'
  //   }
  //   if (type === 'update') {
  //     this.isDisplayMicroFlow = false;
  //     this.iMicroFlow = this.selectedMFlow[0];
  //     this.addMFModel = 'block'
  //   }
  // }

  // addFieldValue() {
  //   this.fieldArray.push({
  //     key: '',
  //     value: ''
  //   });
  //   this.connector.properties = this.fieldArray;
  // }

  // deleteFieldValue(index) {
  //   this.fieldArray.splice(index, 1);
  // }

  // openAddConnectorModal(type) {
  //   if (type === 'create') {
  //     console.log("i am here")
  //     this.isDisplayConnector = true;
  //     this.connector = { description: '', name: '', id: '', url: '', properties: [] }
  //     this.addConnectorModel = 'block'
  //   }
  //   if (type === 'update') {
  //     this.isDisplayConnector = false;
  //     this.connector = this.selectedConnector[0]
  //     console.log(this.connector)
  //     this.addConnectorModel = 'block'
  //   }

  // }

  onCloseHandled() {
    this.createFlowComponentForm.clearValidators();
    this.createFlowComponentForm.reset();
    this.addModel = 'none';

    this.createDConnectorForm.clearValidators();
    this.createDConnectorForm.reset();
    this.addDConnector = 'none';
  }

  onCloseHandledUpdate() {
    this.addModel = 'none';
    this.addDConnector = 'none';
  }

  // onCloseMFHandled() {
  //   this.createMFlowForm.clearValidators();
  //   this.createMFlowForm.reset();
  //   this.addMFModel = 'none';
  // }
  // onCloseMFHandledUpdate() {
  //   this.addMFModel = 'none';
  // }

  // onCloseConnectorHandled() {
  //   this.createMFlowForm.clearValidators();
  //   this.createMFlowForm.reset();
  //   this.addConnectorModel = 'none';
  // }

  // onCloseConnectorHandledUpdate() {
  //   this.addConnectorModel = 'none';
  // }

  openAddFlowModal(type) {
    if (type === 'create') {
      this.isDisableFlowComp = true;
      this.createFlowComponentForm.controls['component_name'].enable();
      this.iFlowComponent = { label: '', description: '', component_name: '', connector: false, dev_framework: '', dev_language: '', sequence_id: '', type: '' }
      this.addModel = 'block'
    }
    if (type === 'update' && this.selectedFlow.length > 0) {
      this.isDisableFlowComp = false;
      this.createFlowComponentForm.controls['component_name'].disable();
      this.iFlowComponent = this.selectedFlow[0];
      this.addModel = 'block'
    }
  }

  createFlowComponent() {
    let flow_comp = this.createFlowComponentForm.getRawValue();
    this.componentFlowsService.saveFlowComponent(flow_comp).subscribe((data) => {
      this.addFlowComponentToFlow(flow_comp);
    },
      (error) => {
        console.log('add gen flow error --- ', error);
      }
    );
  }

  addFlowComponentToFlow(flow_comp) {
    this.componentFlowsService.addFlowCompToFlow(this.flow_id, flow_comp).subscribe(data => {
      console.log("i am in generation", data)
      this.getFlowSequence(this.flow_id);
      this.onCloseHandled();
    }, error => {
      console.log("===got an error r===")
    })
  }

  updateFlowCompModel() {
    let flow_comp = this.createFlowComponentForm.getRawValue();
    this.componentFlowsService.updateFlowCompToFlow(this.flow_id, flow_comp).subscribe(data => {
      this.getFlowSequence(this.flow_id);
      this.onCloseHandled();
    }, error => {
      console.log("===got an error r===")
    })
  }

  openAddDConnectorModal(type) {
    if (type === 'create') {
      console.log("i am here")
      this.isDisplayDConnector = true;
      this.dconnector = { description: '', name: '', id: '', url: '', properties: [] }
      this.addDConnector = 'block'
    }
    if (type === 'update' && this.selectedDConnector.length > 0) {
      this.isDisplayDConnector = false;
      this.dconnector = this.selectedDConnector[0]
      console.log(this.dconnector)
      this.addDConnector = 'block'
    }

  }

  addDefaultConnector() {
    let flow_comp = this.createConnectorForm.getRawValue();
    // this.componentFlowsService.addFlowCompToFlow(this.flow_id, flow_comp).subscribe(data => {
    //   console.log("i am in generation", data)
    //   this.getFlowSequence(this.flow_id);
    //   this.onCloseHandled();
    // }, error => {
    //   console.log("===got an error r===")
    // })
  }

  updateDefaultConnector() {
    let flow_comp = this.createConnectorForm.getRawValue();
    this.componentFlowsService.updateFlowCompToFlow(this.flow_id, flow_comp).subscribe(data => {
      this.getFlowSequence(this.flow_id);
      this.onCloseHandled();
    }, error => {
      console.log("===got an error r===")
    })
  }

  // deleteRowComponent() {
  //   console.log("i am in delete")
  //   this.getFlowCompName = this.selectedFlow[0].component_name;
  //   this.rowData.flow_comp_seq.forEach((data, index) => {
  //     if (this.getFlowCompName === data.component_name) {
  //       this.rowData.flow_comp_seq.splice(index, 1)
  //       this.updateGenFlow();
  //       return
  //     }
  //   })
  // }

  // updataFLowComp() {
  //   console.log("i am in updateflow comp", this.rowData)
  //   this.componentFlowsService.updateFlowComponent(this.rowData).subscribe(data => {
  //     console.log("i am in generation", data)
  //     this.getFlowSequence();
  //   }, error => {
  //     console.log("===got an error r===")
  //   })
  //   this.onCloseHandled();
  // }


  // microFlowView() {
  //   if (this.selectedFlow.length != 0) {
  //     this.getMicroFlowName(this.selectedFlow[0].component_name);
  //   }
  // }

  // createMicroFLow() {
  //   let dataToSave = this.createMFlowForm.getRawValue()
  //   dataToSave.component_name = this.selectedFlow[0].component_name
  //   this.componentFlowsService.saveMicroFlow(dataToSave).subscribe((data) => {
  //     console.log("i am in add micro flow", data)
  //     this.onCloseHandled();

  //   },
  //     (error) => {
  //       console.log('add gen flow error --- ', error);
  //     }
  //   );
  // }

  // createConnector() {
  //   this.componentFlowsService.saveConnector(this.createConnectorForm.getRawValue()).subscribe(data => {
  //     console.log("i am the data u r expected", data)

  //   })
  //   this.onCloseConnectorHandled();
  // }

  // updateConnector() {
  //   console.log("i am the connector", this.connector)
  //   this.componentFlowsService.updateConnector(this.connector).subscribe(data => {
  //     console.log("i am the data u r expected", data)

  //   })
  //   this.onCloseConnectorHandled();
  // }
  // deleteConnector() {
  //   this.componentFlowsService.deleteConnector(this.connector.id).subscribe(data => {
  //     console.log(data)
  //   })
  //   this.onCloseConnectorHandled();

  // }
  // updateMicroFlow() {
  //   this.microFlowDatatoUpdate = this.createMFlowForm.getRawValue();
  //   if (this.iMicroFlow.component_name === this.microFlowDatatoUpdate.component_name) {
  //     this.iMicroFlow.component_name = this.microFlowDatatoUpdate.component_name
  //     this.iMicroFlow.sequence_id = this.microFlowDatatoUpdate.sequence_id
  //     this.iMicroFlow.micro_flow_step_name = this.microFlowDatatoUpdate.micro_flow_step_name
  //   }
  //   this.componentFlowsService.updateMicroFlow(this.iMicroFlow).subscribe(data => {
  //     console.log("i am in data", data)
  //   })
  //   this.onCloseHandled();
  // }

  // deleteMicroFlow() {
  //   console.log("i am the id ur needed", this.selectedMFlow[0]._id)
  //   this.componentFlowsService.deleteMicroFlow(this.selectedMFlow[0]._id).subscribe(data => {
  //     console.log(data)
  //   }), (error) => {
  //     console.log(error)
  //   }
  // }

  // onSelectionChange() {
  //   let selectedRows = this.flowCompGrid.getSelectedRows();
  //   this.selectedFlow = selectedRows;
  //   console.log("this.selectedFlow[0].component_name.length", this.selectedFlow[0].component_name)
  //   if (this.selectedFlow[0].component_name.length !== null) {
  //     this.showMicroFlow = true;
  //   }
  //   this.getMicroFlowName(this.selectedFlow[0].component_name);
  //   this.getLinkedConnectorByName(this.selectedFlow[0].component_name);
  //   if (this.selectedFlow[0].connector) {
  //     this.getAllConnector();
  //   }
  // }

  getMicroFlowName(component) {
    this.componentFlowsService.getMicroFlowByCompName(component).subscribe(data => {
      this.microFlow = data;
    }, error => {
      console.log("==== ==  ? ? ", error)
    })
  }

  getAllConnector() {
    this.componentFlowsService.getAllConnector().subscribe(data => {
      this.connectorData = data;
    })
  }

  // getLinkedConnectorByName(component) {
  //   console.log("hello udhaya i am", component)
  //   this.componentFlowsService.getLinkedConnectorByName(component).subscribe(data => {
  //     console.log("i am the default connector", data)
  //     this.linkedConnectorData = data;
  //     console.log("i am the linked connector", this.linkedConnectorData)
  //   })
  // }

  // onSelectionConnectorChange() {
  //   let selectedConnectorRows = this.connectorFlowGrid.getSelectedRows();
  //   this.selectedConnector = selectedConnectorRows;
  //   this.connector.id = this.selectedConnector[0]._id;
  //   console.log("i am the selected one", this.selectedConnector[0])
  // }

  // onSelectionLinkedConnectorChange() {
  //   let selectedConnectorRows = this.connectorFlowGrid.getSelectedRows();
  //   this.selectedConnector = selectedConnectorRows;
  //   this.connector.id = this.selectedConnector[0]._id;
  //   console.log("i am the selected one", this.selectedConnector[0])
  // }

  // onSelectionMFChange() {
  //   let selectedMFRows = this.microFlowGrid.getSelectedRows();
  //   this.selectedMFlow = selectedMFRows;
  //   console.log(" [   = =  =  > > >", this.selectedMFlow)
  // }

  setupAgGrid() {
    this.fcompColDefs = [
      { headerName: 'Component Name', field: 'component_name', checkboxSelection: true },
      { headerName: 'FrameWork', field: 'dev_framework' },
      { headerName: 'Type', field: 'type' },
      { headerName: 'Sequence', field: 'sequence_id' },
      { headerName: 'Language', field: 'dev_language' },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Description', field: 'description' },
    ];

    this.connectorColDef = [
      { headerName: 'Name', field: 'name', checkboxSelection: true },
      { headerName: 'Description', field: 'description' },
      { headerName: 'URL', field: 'url' },
    ]

    this.linkedConnectorColDef = [
      { headerName: 'Name', field: 'name', checkboxSelection: true },
      { headerName: 'Description', field: 'description' },
      { headerName: 'URL', field: 'url' },
      // { headerName: 'Api key', field: 'properties.apiKey' },
      // { headerName: 'Secret Key', field: 'properties.secretKey' },

    ]
    this.microColDef = [
      { headerName: 'Sequence Id', field: 'sequence_id', sort: 'asc', checkboxSelection: true },
      { headerName: 'Component Name', field: 'component_name' },
      { headerName: 'Micro Flow Step Name', field: 'micro_flow_step_name' }
    ];

    this.rowSelection = 'single';

    this.defaultColDef = {
      enableValue: true,
      resizable: true
    };
  }

  generateForms() {
    this.createFlowComponentForm = this.formBuilder.group({
      component_name: '',
      label: '',
      type: '',
      sequence_id: '',
      dev_language: '',
      dev_framework: '',
      description: '',
      connector: '',
    });

    this.createMFlowForm = this.formBuilder.group({
      sequence_id: '',
      component_name: '',
      micro_flow_step_name: '',
    });

    this.createDConnectorForm = this.formBuilder.group({
      name: '',
      description: '',
      url: '',
      properties: this.formBuilder.group({
      })
    })

    this.createConnectorForm = this.formBuilder.group({
      name: '',
      description: '',
      url: '',
      properties: this.formBuilder.group({
      })
    })
  }

  onFCGridReady(params) {
    this.flowCompGrid = params.api;
    this.flowCompGrid.sizeColumnsToFit();
  }

  onGridConnectorReady(params) {
    this.connectorFlowGrid = params.api;
    this.connectorFlowGrid.sizeColumnsToFit();
  }

  onDCGridReady(params) {
    this.linkedFlowGrid = params.api;
    this.linkedFlowGrid.sizeColumnsToFit();
  }

  onGridMicroFlowReady(params) {
    this.microFlowGrid = params.api;
    this.microFlowGrid.sizeColumnsToFit();
  }
}
