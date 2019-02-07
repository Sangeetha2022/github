import { Component, OnInit } from '@angular/core';
import { FlowManagerService } from '../flow-manager/flow-manager.service';
import { ComponentFlowsService } from './component-flows.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-flows',
  templateUrl: './component-flows.component.html',
  styleUrls: ['./component-flows.component.scss']
})
export class ComponentFlowsComponent implements OnInit {
  columnDefs;
  icons;
  rowData;
  rowSelection;
  defaultColDef;
  flowCompGrid;
  microFlowGrid;
  data: any = [];
  microFlow: any = [];
  gridColumnApi;
  showMicroFlow: Boolean = false;
  microColDef;
  flow_component_sequence: any = [];
  selectedFlow: any = [];
  message: string;
  addModel: String = 'none';
  addMFModel: String = 'none';
  createFlowForm: FormGroup;
  createMFlowForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private flowManagerService: FlowManagerService, private componentFlowsService: ComponentFlowsService) {
    this.columnDefs = [
      { headerName: 'Component Name', field: 'component_name' },
      { headerName: 'FrameWork', field: 'dev_framework' },
      { headerName: 'Type', field: 'type' },
      { headerName: 'Sequence', field: 'sequence_id' },
      { headerName: 'Language', field: 'dev_language' },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Description', field: 'description' },
    ];
    this.microColDef = [
      { headerName: 'sequence_id', field: 'sequence_id', sort: 'asc' },
      { headerName: 'component_name', field: 'component_name' },
      { headerName: 'micro_flow_step_name', field: 'micro_flow_step_name' }
    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      enableValue: true,
      resizable: true
    };
  }

  ngOnInit() {
    this.getDataFromFlowService();
    this.getFlowComponentByName();
    this.createFlowForm = this.formBuilder.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      description: '',
      action_on_data: ['', Validators.required],
    });
    this.createMFlowForm = this.formBuilder.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      description: '',
      action_on_data: ['', Validators.required],
    });
  }

  getDataFromFlowService() {
    this.flowManagerService.currentMessage.subscribe((message) => {
      this.message = message;
    }, (error) => {
      console.log("------------>err--------->>", error)
    });
  }

  openAddModal() {
    this.addModel = 'block'
  }

  openAddMFModal() {
    this.addMFModel = 'block'
  }

  onCloseHandled() {
    this.createFlowForm.clearValidators();
    this.createFlowForm.reset();
    this.addModel = 'none';
  }

  onCloseMFHandled() {
    this.createMFlowForm.clearValidators();
    this.createMFlowForm.reset();
    this.addMFModel = 'none';
  }

  getFlowComponentByName() {
    console.log("-= = =  ==  >>> >  ", this.message)

    this.flowManagerService.getFlowComponentByName(this.message).subscribe((data) => {
      this.rowData = data;
      console.log(data);
      this.data = this.rowData.flow_comp_seq;
      console.log(this.rowData.flow_comp_seq);
    });
  }
  onGridReady(params) {
    this.flowCompGrid = params.api;
    this.gridColumnApi = params.columnApi;
    this.flowCompGrid.sizeColumnsToFit();
  }
  onGridMicroFlowReady(params) {
    this.microFlowGrid = params.api;
    this.gridColumnApi = params.columnApi;
    this.microFlowGrid.sizeColumnsToFit();
    console.log("----------v-v->", this.microColDef)
    console.log("----------v-v->", this.microFlowGrid)
    // this.microFlowGrid.enableSorting = true
      // this.microFlowGrid.getColumn('sequence_id').setSort("asc")
    }

  getMicroFlowName(component) {
    this.componentFlowsService.getMicroFlowByName(component).subscribe(data => {
      console.log("selected data____+++++++++ ", data)
      if (data) {
        this.showMicroFlow = true;
      }
      this.microFlow = data;
    }, error => {
      console.log("==== ==  ? ? ", error)
    })
  }
  onSelectionChange() {
    let selectedRows = this.flowCompGrid.getSelectedRows();
    this.selectedFlow = selectedRows;
    this.getMicroFlowName(this.selectedFlow[0].component_name);
  }

}
