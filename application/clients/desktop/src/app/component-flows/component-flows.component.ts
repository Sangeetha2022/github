import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FlowManagerService } from '../flow-manager/flow-manager.service';
import { ComponentFlowsService } from './component-flows.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMicroFlow } from './interface/microFlow';
import { IFlowComponent } from './interface/flowComponents';
import { Connector } from './interface/connector';
import { IGenerateFlow } from '../flow-manager/interface/generationFlow';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/shared/data.service';

@Component({
  selector: 'app-component-flows',
  templateUrl: './component-flows.component.html',
  styleUrls: ['./component-flows.component.scss']
})
export class ComponentFlowsComponent implements OnInit {
  selectConnector: Boolean = false;
  disableDConnector: Boolean = true;
  iMicroFlow: IMicroFlow = {
    id: '',
    sequence_id: '',
    component_name: '',
    micro_flow_step_name: '',
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
  paramsName: String;
  AvailableConnector: any = [];
  selectedDCon: any = [];
  // private test;
  // columnDefs;
  // tableArr: any = [];
  // getFlowCompName: string;
  // icons;
  // rowData;
  microFlowDatatoUpdate: any = [];
  // data: any = [];
  // linkedConnectorData: any = [];
  // gridColumnApi;
  flow_name: String;
  // microFlowId;
  showMicroFlow: Boolean = false;
  isDisplayMicroFlow: Boolean;

  // connectorolDef;
  // flow_component_sequence: any = [];
  // selectedFlowCmpnt: any = [];
  selectedMFlow: any = [];
  // flowCompSeq: any = [];
  // message: string;
  addMFModel: String = 'none';

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
  suppressCellSelection;
  // Form 
  createFlowComponentForm: FormGroup;
  createMFlowForm: FormGroup;
  createDConnectorForm: FormGroup;

  flow_comp: any = [];
  flow_id: String = null;
  flow_deatils: any = {};
  default_connector: any = null;
  microFlow: any = [];
  selectedFlowCmpnt: any = [];
  flowCompName: String;
  isDisableFlowComp: boolean = true;
  addModel: String = 'none';
  addDConnector: String = 'none';
  isDisplayDConnector: boolean = true;
  selectedDConnector: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private flowManagerService: FlowManagerService,
    private componentFlowsService: ComponentFlowsService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.setupAgGrid();
    this.generateForms();
    this.getAllAvailableConnector();
    this.route.queryParams.subscribe(params => {
      console.log(params.name)
      this.paramsName = params.name;
    })
    this.getDataFromFlowService();
  }

  getDataFromFlowService() {
    this.dataService.currentFlowIdInfoSource.subscribe(data => {
      this.flow_id = data._id;
      this.flow_name = data.name;
      console.log(this.flow_name)
      if (this.flow_id !== undefined) {
        this.getFlowSequence(this.flow_id);
      } else {
        console.log("i am the one u looking", this.paramsName)
        // this.getFlowCompByName(this.paramsName)
      }
    })
  }

  getFlowSequence(id) {
    if (id) {
      this.componentFlowsService.getFlowSequence(id).subscribe((data) => {
        this.flow_deatils = data;
        this.flow_comp = data.flow_comp_seq;
        console.log("------------>err--------->>", this.flow_comp)
      });
    }
  }
  // getFlowCompByName(name) {
  //   this.componentFlowsService.getFlowCompByName(name).subscribe(data => {
  //     this.flow_comp = data.flow_comp_seq
  //   })
  // }
  selectFlowComponent() {
    this.selectedFlowCmpnt = this.flowCompGrid.getSelectedRows();
    if (this.selectedFlowCmpnt[0].component_name !== null) {
      this.showMicroFlow = true;
    }
    this.flowCompName = this.selectedFlowCmpnt[0].component_name
    this.default_connector = this.selectedFlowCmpnt[0].default_connector;
    this.getMicroFlowName(this.selectedFlowCmpnt[0].component_name);
  }

  // deleteConnector() {
  //   this.componentFlowsService.deleteConnector(this.connector.id).subscribe(data => {
  //     console.log(data)
  //   })

  //   this.getAllAvailableConnector();

  // }

  onChange(selected) {
    if (selected) {
      // this.featureData.map((data, index) => {
      //   if (data.name === selected) {
      //     this.features.name = data.name
      //     this.features.description = data.description
      //     return;
      //   }
      // });
    }
  }

  selectDefaultConnector() {
    this.selectedDConnector = this.linkedFlowGrid.getSelectedRows();
    console.log("================>>>>", this.selectedDConnector);
  }


  // onFCSelectionChanged(event) {
  //   console.log("selection changed, " , event.api.getSelectedNodes());
  // }

  openAddMFModal(type) {
    if (type === 'create') {
      this.isDisplayMicroFlow = true;
      this.iMicroFlow = { sequence_id: '', component_name: '', id: '', micro_flow_step_name: '' }
      this.addMFModel = 'block'
    }
    if (type === 'update') {
      this.isDisplayMicroFlow = false;
      this.iMicroFlow = this.selectedMFlow[0];
      this.addMFModel = 'block'
    }
  }





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

  onCloseMFHandled() {
    this.createMFlowForm.clearValidators();
    this.createMFlowForm.reset();
    this.addMFModel = 'none';
  }
  onCloseMFHandledUpdate() {
    this.addMFModel = 'none';
  }



  openAddFlowModal(type) {
    if (type === 'create') {
      this.isDisableFlowComp = true;
      this.createFlowComponentForm.controls['component_name'].enable();
      this.iFlowComponent = { label: '', description: '', component_name: '', connector: false, dev_framework: '', dev_language: '', sequence_id: '', type: '' }
      this.addModel = 'block'
    }
    if (type === 'update' && this.selectedFlowCmpnt.length > 0) {
      this.isDisableFlowComp = false;
      this.createFlowComponentForm.controls['component_name'].disable();
      this.iFlowComponent = this.selectedFlowCmpnt[0];
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
    this.componentFlowsService.updateFlowCompToFlow(this.selectedFlowCmpnt[0]._id, flow_comp).subscribe(data => {
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
    let dconnector = this.createDConnectorForm.getRawValue();
    this.componentFlowsService.addDefaultConnector(this.selectedFlowCmpnt[0]._id, dconnector).subscribe(data => {
      this.getFlowSequence(this.flow_id);
      this.onCloseHandled();
    }, error => {
      console.log("===got an error r===")
    })
  }

  updateDefaultConnector() {
    let dconnector = this.createDConnectorForm.getRawValue();
    this.componentFlowsService.updateDefaultConnector(this.selectedDConnector[0]._id, dconnector).subscribe(data => {
      this.getFlowSequence(this.flow_id);
      this.onCloseHandled();
    }, error => {
      console.log("===got an error r===")
    })
  }

  // deleteRowComponent() {
  //   console.log("i am in delete")
  //   this.getFlowCompName = this.selectedFlowCmpnt[0].component_name;
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
  //   if (this.selectedFlowCmpnt.length != 0) {
  //     this.getMicroFlowName(this.selectedFlowCmpnt[0].component_name);
  //   }
  // }

  createMicroFLow() {
    let dataToSave = this.createMFlowForm.getRawValue()
    dataToSave.component_name = this.selectedFlowCmpnt[0].component_name
    this.componentFlowsService.saveMicroFlow(dataToSave).subscribe((data) => {
      console.log("i am in add micro flow", data)

    },
      (error) => {
        console.log('add gen flow error --- ', error);
      }
    );
    this.getMicroFlowName(this.flowCompName);
    this.onCloseMFHandled();
  }

  updateMicroFlow() {
    this.microFlowDatatoUpdate = this.createMFlowForm.getRawValue();
    if (this.iMicroFlow.component_name === this.microFlowDatatoUpdate.component_name) {
      this.iMicroFlow.component_name = this.microFlowDatatoUpdate.component_name
      this.iMicroFlow.sequence_id = this.microFlowDatatoUpdate.sequence_id
      this.iMicroFlow.micro_flow_step_name = this.microFlowDatatoUpdate.micro_flow_step_name
    }
    this.componentFlowsService.updateMicroFlow(this.iMicroFlow).subscribe(data => {
      console.log("i am in data", data)
    })
    this.onCloseMFHandledUpdate();
  }

  deleteMicroFlow() {
    console.log("i am the id ur needed", this.selectedMFlow[0]._id)
    this.componentFlowsService.deleteMicroFlow(this.selectedMFlow[0]._id).subscribe(data => {
      console.log(data)
    }), (error) => {
      console.log(error)
    }
  }

  // onSelectionChange() {
  //   let selectedRows = this.flowCompGrid.getSelectedRows();
  //   this.selectedFlowCmpnt = selectedRows;
  //   console.log("this.selectedFlowCmpnt[0].component_name.length", this.selectedFlowCmpnt[0].component_name)
  //   if (this.selectedFlowCmpnt[0].component_name.length !== null) {
  //     this.showMicroFlow = true;
  //   }
  //   this.getMicroFlowName(this.selectedFlowCmpnt[0].component_name);
  //   this.getLinkedConnectorByName(this.selectedFlowCmpnt[0].component_name);
  //   if (this.selectedFlowCmpnt[0].connector) {
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

  getAllAvailableConnector() {
    this.componentFlowsService.getAllConnector().subscribe(data => {
      this.AvailableConnector = data;
    }, error => {
      console.log("==== ==  ? ? ", error)
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

  onSelectionMFChange() {
    let selectedMFRows = this.microFlowGrid.getSelectedRows();
    this.selectedMFlow = selectedMFRows;
    console.log(" [   = =  =  > > >", this.selectedMFlow)
  }

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

    this.linkedConnectorColDef = [
      { headerName: 'Name', field: 'name', checkboxSelection: true },
      { headerName: 'Description', field: 'description' },
      { headerName: 'URL', field: 'url' },
      { headerName: 'Disable', field: 'disable' },
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
      _id: '',
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
  }

  onFCGridReady(params) {
    this.flowCompGrid = params.api;
    this.flowCompGrid.sizeColumnsToFit();
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
