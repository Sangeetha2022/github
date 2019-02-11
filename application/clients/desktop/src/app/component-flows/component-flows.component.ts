import { Component, OnInit, ɵConsole } from '@angular/core';
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
  iMicroFlow: IMicroFlow = {
    _id:'',
    sequence_id: '',
    component_name: '',
    micro_flow_step_name: '',
  }
  connector: Connector={
    id:'',
    name:'',
    description:'',
    url:'',
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
  }
  columnDefs;
  getFlowCompName: string;
  icons;
  rowData;
  rowSelection;
  defaultColDef;
  flowCompGrid;
  microFlowGrid;
  connectorFlowGrid;
  selectedConnector;
  microFlowDatatoUpdate: any = [];
  data: any = [];
  microFlow: any = [];
  connectorData: any = [];
  gridColumnApi;
  addConnectorModel;
  microFlowId;
  showMicroFlow: Boolean = false;
  isUpdateMF: Boolean = false;
  isUpdateConnector: Boolean = false;
  microColDef;
  isDisableFlowComp: boolean;
  connectorColDef;
  flow_component_sequence: any = [];
  selectedFlow: any = [];
  selectedMFlow: any=[];
  flowCompSeq: any = [];
  message: string;
  addModel: String = 'none';
  addMFModel: String = 'none';
  createFlowComponentModel: FormGroup;
  createMFlowForm: FormGroup;
  createConnectorForm: FormGroup;
  showConnectors: boolean;
  gridOptions;
  addToMicroFlow: Boolean = null;

  constructor(private formBuilder: FormBuilder, private flowManagerService: FlowManagerService, private componentFlowsService: ComponentFlowsService) {
    this.columnDefs = [
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
    this.microColDef = [
      { headerName: 'sequence_id', field: 'sequence_id', sort: 'asc', checkboxSelection: true },
      { headerName: 'component_name', field: 'component_name' },
      { headerName: 'micro_flow_step_name', field: 'micro_flow_step_name' }
    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      enableValue: true,
      resizable: true
    };
    console.log("i am unwanted one in con",this.isDisableFlowComp)
  }

  ngOnInit() {
    this.getDataFromFlowService();
    this.getFlowComponentByName();
    this.getAllConnector();
    this.generateForms();
    console.log("i am unwanted one",this.isDisableFlowComp)
  }

  generateForms(){
    this.createFlowComponentModel = this.formBuilder.group({
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

    this.createConnectorForm = this.formBuilder.group({
      name:'',
      description:'',
      url:'',
    })
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

  openAddConnectorModal() {
    this.addConnectorModel = 'block'
  }

  onCloseHandled() {
    this.createFlowComponentModel.clearValidators();
    this.createFlowComponentModel.reset();
    this.addModel = 'none';
  }
  onCloseHandledUpdate() {
    this.addModel = 'none';
  }

  onCloseMFHandled() {
    this.addToMicroFlow = null
    this.isUpdateMF = false;
    this.createMFlowForm.clearValidators();
    this.createMFlowForm.reset();
    this.addMFModel = 'none';
  }
  onCloseMFHandledUpdate() {
    this.addMFModel = 'none';
  }

  onCloseConnectorHandled() {
    this.isUpdateConnector = false;
    this.createMFlowForm.clearValidators();
    this.createMFlowForm.reset();
    this.addConnectorModel = 'none';
  }
  onCloseConnectorHandledUpdate() {
    this.addConnectorModel = 'none';
  }
  
  onRowSelectedFlowComp(event) {
    this.isDisableFlowComp = event.node.selected;
    console.log("i am needed one",this.isDisableFlowComp)
    if(this.isDisableFlowComp=== false){
      console.log("i my darling")
      this.createFlowComponentModel.clearValidators();
      this.createFlowComponentModel.reset();
    }
  }

  getFlowComponentByName() {
    console.log("asodhofhso",this.message)
    this.componentFlowsService.getFlowGenComponentByName(this.message).subscribe((data) => {
      console.log("i need u dr",data)
      this.rowData = data;
      console.log(this.rowData);
      this.data = this.rowData.flow_comp_seq;
    });
  }

  createFlowComponent() {
    console.log(this.createFlowComponentModel.getRawValue().connector);
    this.componentFlowsService.saveFlowComponent(this.createFlowComponentModel.getRawValue()).subscribe((data) => {
      this.rowData.flow_comp_seq.push(this.createFlowComponentModel.getRawValue())
      this.updateGenFlow();
      this.onCloseHandled();
    },
      (error) => {
        console.log('add gen flow error --- ', error);
      } 
    );
  }

  getAllConnector(){
    this.componentFlowsService.getAllConnector().subscribe(data => {
      this.connectorData = data;
      console.log("i am the connector",data)
    })
  }

  deleteRowComponent() {
    console.log("i am in delete")
    this.getFlowCompName = this.selectedFlow[0].component_name;
    this.rowData.flow_comp_seq.forEach((data,index)=>{
      if(this.getFlowCompName === data.component_name){
        this.rowData.flow_comp_seq.splice(index,1)
        this.updateGenFlow();
        return
      }
    })

  }

  // openAddConnectorModal(){

  // }

  updateRowConnector(){
    this.isUpdateConnector = true;
    this.connector = this.selectedConnector[0]
    this.openAddConnectorModal();
  }

  updateRow() {
    this.iFlowComponent = this.selectedFlow[0];
    this.openAddModal();
  }

  updateFlowCompModel() {
    this.getFlowCompName = this.createFlowComponentModel.getRawValue().component_name;
    this.rowData.flow_comp_seq.forEach((data,index)=>{
      if(this.getFlowCompName === data.component_name){
        this.rowData.flow_comp_seq[index] = this.createFlowComponentModel.getRawValue()
        this.updateGenFlow();
        this.onCloseHandled();
        return
      }
    })
    console.log("in update flow",)
  }

  updateGenFlow() {
    this.componentFlowsService.updateGenFlow(this.rowData).subscribe(data => {
      console.log("i am in generation", data)
      this.getFlowComponentByName();
    }, error => {
      console.log("===got an error r===")
    })
  }
  updataFLowComp(){
    console.log("i am in updateflow comp",this.rowData)
    this.componentFlowsService.updateFlowComponent(this.rowData).subscribe(data => {
      console.log("i am in generation", data)
      this.getFlowComponentByName();
    }, error => {
      console.log("===got an error r===")
    })
    this.onCloseHandled();
  }

  onGridReady(params) {
    this.flowCompGrid = params.api;
    this.gridColumnApi = params.columnApi;
    this.flowCompGrid.sizeColumnsToFit();
  }

  onGridConnectorReady(params) {
    this.connectorFlowGrid = params.api;
    this.gridColumnApi = params.columnApi;
    this.connectorFlowGrid.sizeColumnsToFit();
    console.log("----------v-v->", this.connectorFlowGrid)
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
    this.componentFlowsService.getMicroFlowByCompName(component).subscribe(data => {
      console.log("selected data____+++++++++ ", data)
      if (data) {
        this.showMicroFlow = true;
      }
      this.microFlow = data;
    }, error => {
      console.log("==== ==  ? ? ", error)
    })
  }
  microFlowView() {
    if(this.selectedFlow.length!=0){
    this.getMicroFlowName(this.selectedFlow[0].component_name);
    }
  }

  createMicroFLow() {
    let dataToSave = this.createMFlowForm.getRawValue()
    dataToSave.component_name = this.selectedFlow[0].component_name
    this.componentFlowsService.saveMicroFlow(dataToSave).subscribe((data) => {
      console.log("i am in add micro flow",data)
      this.onCloseHandled();

    },
      (error) => {
        console.log('add gen flow error --- ', error);
      }
    );
  }

  createConnector(){
  this.componentFlowsService.saveConnector(this.createConnectorForm.getRawValue()).subscribe(data =>{
      console.log("i am the data u r expected",data)

   })
   this.onCloseConnectorHandled();
  }

  updateConnector(){
    this.componentFlowsService.updateConnector(this.connector).subscribe(data =>{
      console.log("i am the data u r expected",data)

   })
   this.onCloseConnectorHandled();
  }
  deleteConnector(){
    this.componentFlowsService.deleteConnector(this.connector.id).subscribe(data=>{
      console.log(data)
    })
   this.onCloseConnectorHandled();

  }
  updateRowMicro() {
    console.log("u need this id",this.selectedMFlow[0])
    this.iMicroFlow = this.selectedMFlow[0];
    console.log("u need this id",this.iMicroFlow)
    this.isUpdateMF = true;
    this.openAddMFModal();
  }
  updateMicroFlow(){
    this.microFlowDatatoUpdate = this.createMFlowForm.getRawValue();
    if(this.iMicroFlow.component_name === this.microFlowDatatoUpdate.component_name){
      this.iMicroFlow.component_name = this.microFlowDatatoUpdate.component_name
      this.iMicroFlow.sequence_id = this.microFlowDatatoUpdate.sequence_id
      this.iMicroFlow.micro_flow_step_name = this.microFlowDatatoUpdate.micro_flow_step_name
    }
    this.updateMicroFlowService();
  }
  updateMicroFlowService(){
    console.log("i am the one your looking for",this.iMicroFlow)
    this.componentFlowsService.updateMicroFlow(this.iMicroFlow).subscribe(data=>{
      console.log("i am in data",data)
    })
    this.onCloseHandled();
  }
  deleteMicroFlow(){
    console.log("i am the id ur needed",this.selectedMFlow[0]._id)
    this.componentFlowsService.deleteMicroFlow(this.selectedMFlow[0]._id).subscribe(data=>{
      console.log(data)
    }), (error) => {
      console.log(error)
     }
  }
  onSelectionChange() {
    let selectedRows = this.flowCompGrid.getSelectedRows();
    this.selectedFlow = selectedRows;
    if(this.isDisableFlowComp===true){
    this.showConnectors = this.selectedFlow[0].connector
    }
    console.log(" [   = =  =  > > >", this.selectedFlow)
    this.microFlowView();
  }
  onSelectionConnectorChange(){
    let selectedConnectorRows = this.connectorFlowGrid.getSelectedRows();
    this.selectedConnector = selectedConnectorRows;
    this.connector.id = this.selectedConnector[0]._id;
    console.log("i am the selected one", this.connector.id)
  }
  onSelectionMFChange(){
    let selectedMFRows = this.microFlowGrid.getSelectedRows();
    this.selectedMFlow = selectedMFRows;
    console.log(" [   = =  =  > > >", this.selectedMFlow)
  }

}
