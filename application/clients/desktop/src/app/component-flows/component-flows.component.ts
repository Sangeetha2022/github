import { Component, OnInit } from '@angular/core';
import { ComponentFlowsService } from './component-flows.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMicroFlow } from './interface/microFlow';
import { IFlowComponent } from './interface/flowComponents';
import { Connector } from './interface/connector';
import { Router } from '@angular/router';
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
  };


  dconnector: Connector = {
    id: '',
    name: '',
    description: '',
    url: '',
    properties: []
  };

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
  selectedAvaConnector: any = null;
  microFlowDatatoUpdate: any = [];
  flow_name: String;
  showMicroFlow: Boolean = false;
  isDisplayMicroFlow: Boolean;
  selectedMFlow: any = [];
  addMFModel: String = 'none';

  rowSelection;
  defaultColDef;

  microFlowColDef;
  flowComponentColDef;
  connectorColDef;
  linkedConnectorColDef;

  flowComponentGrid;
  microFlowGrid;
  connectorFlowGrid;
  linkedFlowGrid: any = [];
  suppressCellSelection;
  // Form
  createFlowComponentForm: FormGroup;
  createMFlowForm: FormGroup;
  createDConnectorForm: FormGroup;

  flow_comp: any = [];
  flowComponentRowData: any = [];
  flow_id: String = null;
  flow_deatils: any = {};
  default_connector: any = null;
  microFlowRowData: any = [];
  selectedFlowCmpnt: any = [];
  flowCompName: String;
  isDisableFlowComp = true;
  addModel: String = 'none';
  addDConnector: String = 'none';
  isDisplayDConnector = true;
  selectedDConnector: any = [];
  selectedAvaConnectorMethod: any = null;
  availableConnApis: any = null;
  selectedAvaConnectorMethodApi: any = null;
  selectedAvaConnectorMethodApiValues: any = null;
  availableConnApisProp: any = [];
  selectedAvaConnectorProp: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private componentFlowsService: ComponentFlowsService,
    private router: Router,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.setupAgGrid();
    this.generateForms();
    this.getFlows();
  }

  getFlows() {
    this.dataService.currentflowSource.subscribe(
      flowData => {
        if (Object.keys(flowData).length === 0) {
          this.router.navigate(['flow-manager']);
        }
        this.flowComponentRowData = flowData.components;
      },
      error => {
        console.error('cannot able to get the flows ----- ', error);
      }
    );
  }


  selectFlowComponent() {
    this.selectedFlowCmpnt = this.flowComponentGrid.getSelectedRows();
    this.componentFlowsService.getMicroFlow(this.flowComponentGrid.getSelectedRows()[0].microFlows).subscribe(
      microflow => {
        this.microFlowRowData = microflow;
      },
      error => {

      }
    );
  }


  onSelectAvaConnector() { }

  onSelectAvaConnectorMethod() {
    const index = this.selectedAvaConnector.available_apis.indexOf(this.selectedAvaConnectorMethod);
  }

  onSelectAvaConnectorMethodProp() {
    if (this.selectedAvaConnectorMethodApi.value && this.selectedAvaConnectorMethodApi.value !== '') {
      this.availableConnApisProp.push(this.selectedAvaConnectorMethodApi);
    }
  }

  selectDefaultConnector() {
    this.selectedDConnector = this.linkedFlowGrid.getSelectedRows();
  }

  openAddMFModal(type) {
    if (type === 'create') {
      this.isDisplayMicroFlow = true;
      this.iMicroFlow = { sequence_id: '', component_name: '', id: '', micro_flow_step_name: '' };
      this.addMFModel = 'block';
    }
    if (type === 'update') {
      this.isDisplayMicroFlow = false;
      this.iMicroFlow = this.selectedMFlow[0];
      this.addMFModel = 'block';
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
      this.iFlowComponent = {
        label: '', description: '', component_name: '',
        connector: false, dev_framework: '', dev_language: '', sequence_id: '', type: ''
      };
      this.addModel = 'block';
    }
    if (type === 'update' && this.selectedFlowCmpnt.length > 0) {
      this.isDisableFlowComp = false;
      this.createFlowComponentForm.controls['component_name'].disable();
      this.iFlowComponent = this.selectedFlowCmpnt[0];
      this.addModel = 'block';
    }
  }

  openAddDConnectorModal(type) {
    if (type === 'create') {
      this.isDisplayDConnector = true;
      this.dconnector = { description: '', name: '', id: '', url: '', properties: [] };
    }
    if (type === 'update' && this.selectedDConnector.length > 0) {
      this.isDisplayDConnector = false;
      this.dconnector = this.selectedDConnector[0];
    }
    this.addDConnector = 'block';

  }

  createMicroFLow() {
    const dataToSave = this.createMFlowForm.getRawValue();
    dataToSave.component_name = this.selectedFlowCmpnt[0].component_name;
    this.componentFlowsService.saveMicroFlow(dataToSave).subscribe((data) => {

    },
      (error) => {
        console.log('cannot able to create the microflows--- ', error);
      }
    );
    this.onCloseMFHandled();
  }

  updateMicroFlow() {
    this.microFlowDatatoUpdate = this.createMFlowForm.getRawValue();
    if (this.iMicroFlow.component_name === this.microFlowDatatoUpdate.component_name) {
      this.iMicroFlow.component_name = this.microFlowDatatoUpdate.component_name;
      this.iMicroFlow.sequence_id = this.microFlowDatatoUpdate.sequence_id;
      this.iMicroFlow.micro_flow_step_name = this.microFlowDatatoUpdate.micro_flow_step_name;
    }
    this.componentFlowsService.updateMicroFlow(this.iMicroFlow).subscribe(data => {
    });
    this.onCloseMFHandledUpdate();
  }



  onSelectionMFChange() {
    const selectedMFRows = this.microFlowGrid.getSelectedRows();
    this.selectedMFlow = selectedMFRows;
  }

  setupAgGrid() {
    this.flowComponentColDef = [
      { headerName: 'Component Name', field: 'name', checkboxSelection: true },
      { headerName: 'FrameWork', field: 'devFramework' },
      { headerName: 'Type', field: 'type' },
      { headerName: 'Sequence', field: 'sequenceId' },
      { headerName: 'Language', field: 'devLanguage' },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Description', field: 'description' },
    ];

    this.connectorColDef = [
      { headerName: 'Name', field: 'name', checkboxSelection: true },
      { headerName: 'Description', field: 'description' },
    ];

    this.linkedConnectorColDef = [
      { headerName: 'Name', field: 'name', checkboxSelection: true },
      { headerName: 'Description', field: 'description' },
      { headerName: 'URL', field: 'url' },
      { headerName: 'Disable', field: 'disable' },
    ];
    this.microFlowColDef = [
      { headerName: 'Sequence Id', field: 'sequenceId', sort: 'asc', checkboxSelection: true },
      { headerName: 'Component Name', field: 'componentName' },
      { headerName: 'Micro Flow Step Name', field: 'microFlowStepName' }
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
    });
  }

  onFCGridReady(params) {
    this.flowComponentGrid = params.api;
    this.flowComponentGrid.sizeColumnsToFit();
  }



  onDCGridReady(params) {
    this.linkedFlowGrid = params.api;
    this.linkedFlowGrid.sizeColumnsToFit();
  }

  onGridMicroFlowReady(params) {
    this.microFlowGrid = params.api;
    this.microFlowGrid.sizeColumnsToFit();
  }

// older code method names
  createFlowComponent() { }

  updateFlowCompModel() { }

  addDefaultConnector() { }

  updateDefaultConnector() { }

  deleteMicroFlow() { }
}
