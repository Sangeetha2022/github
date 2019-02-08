import { Component, OnInit, ɵConsole } from '@angular/core';
import { FlowManagerService } from '../flow-manager/flow-manager.service';
import { ComponentFlowsService } from './component-flows.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMicroFlow } from './interface/microFlow';
import { IFlowComponent } from './interface/flowComponents';
import { IGenerateFlow } from '../flow-manager/interface/generationFlow';



@Component({
  selector: 'app-component-flows',
  templateUrl: './component-flows.component.html',
  styleUrls: ['./component-flows.component.scss']
})
export class ComponentFlowsComponent implements OnInit {
  iMicroFlow: IMicroFlow = {
    sequence_id: '',
    component_name: '',
    micro_flow_step_name: '',
  }
  private generateFlow: IGenerateFlow = {
    flow_name: '',
    flow_sequence: [],
  };
  iFlowComponent: IFlowComponent = {
    component_name: '',
    label: '',
    type: '',
    sequence_id: '',
    dev_language: '',
    dev_framework: '',
    description: '',
  }
  columnDefs;
  getFlowCompName: string;
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
  isRemoveModel: Boolean;
  microColDef;
  flow_component_sequence: any = [];
  selectedFlow: any = [];
  flowCompSeq: any = [];
  message: string;
  addModel: String = 'none';
  addMFModel: String = 'none';
  createFlowComponentModel: FormGroup;
  createMFlowForm: FormGroup;
  isCreateModel: Boolean = true;
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
    this.createFlowComponentModel = this.formBuilder.group({
      component_name: '',
      label: '',
      type: '',
      sequence_id: '',
      dev_language: '',
      dev_framework: '',
      description: '',
    });
    this.createMFlowForm = this.formBuilder.group({
      sequence_id: '',
      component_name: '',
      micro_flow_step_name: '',
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
    this.addToMicroFlow = true
    this.addMFModel = 'block'
  }

  onCloseHandled() {
    this.createFlowComponentModel.clearValidators();
    this.createFlowComponentModel.reset();
    this.addModel = 'none';
  }

  onCloseMFHandled() {
    this.addToMicroFlow = null
    this.createMFlowForm.clearValidators();
    this.createMFlowForm.reset();
    this.addMFModel = 'none';
  }

  getFlowComponentByName() {
    this.flowManagerService.getFlowComponentByName(this.message).subscribe((data) => {
      this.rowData = data;
      this.data = this.rowData.flow_comp_seq;
      console.log(this.rowData.flow_comp_seq);
    });
  }

  createFlowComponent() {
    this.componentFlowsService.addFlowComp(this.createFlowComponentModel.getRawValue()).subscribe((data) => {
      this.rowData.flow_comp_seq.push(this.createFlowComponentModel.getRawValue())
      this.addGenFlow();
      this.onCloseHandled();
    },
      (error) => {
        console.log('add gen flow error --- ', error);
      } 
    );
  }
  deleteRowComponent() {

    this.rowData.flow_comp_seq.forEach((data,index)=>{
      if(this.getFlowCompName === data.component_name){
        this.rowData.flow_comp_seq.splice(this.rowData.flow_comp_seq[index]); 
        this.updataFLowComp();
        return
      }
    })

  }

  createFlowModel() {
    let dataToSave = this.createMFlowForm.getRawValue()
    dataToSave.component_name = this.selectedFlow[0].component_name
    this.componentFlowsService.updateFlowComp(dataToSave).subscribe((data) => {
      
    },
      (error) => {
        console.log('add gen flow error --- ', error);
      }
    );
  }

  updateRowMicro() {
    this.isRemoveModel = false;
  }

  updateRow() {
    this.isCreateModel = false;
    this.iFlowComponent = this.selectedFlow[0];
    console.log(this.createFlowComponentModel)
    this.openAddModal();
  }

  updateFlowCompModel() {
    this.getFlowCompName = this.createFlowComponentModel.getRawValue().component_name;
    this.rowData.flow_comp_seq.forEach((data,index)=>{
      if(this.getFlowCompName === data.component_name){
        this.rowData.flow_comp_seq[index] = this.createFlowComponentModel.getRawValue()
        this.updataFLowComp();
        return
      }
    })
    console.log("in update flow",)
    // this.rowData.flow_comp_seq.push(this.createFlowComponentModel.getRawValue())
    // this.addGenFlow();
    // console.log("======> > >  > >  ")
    // this.componentFlowsService.updateFlowComp(this.createFlowComponentModel.getRawValue()).subscribe(data => {
    //   console.log("hello", data)
    //   this.onCloseHandled();
    //   this.getFlowComponentByName();
    // },
    //   (error) => {
    //     console.log('error delete flow manager --- ', error);
    //   }
    // );
  }

  addGenFlow() {
    this.componentFlowsService.addGenFlow(this.rowData).subscribe(data => {
      console.log("i am in generation", data)
      this.getFlowComponentByName();
    }, error => {
      console.log("===got an error r===")
    })
  }
  updataFLowComp(){
    this.componentFlowsService.addGenFlow(this.rowData).subscribe(data => {
      console.log("i am in generation", data)
      this.getFlowComponentByName();
    }, error => {
      console.log("===got an error r===")
    })
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
  microFlowView() {
    this.getMicroFlowName(this.selectedFlow[0].component_name);
  }
  onSelectionChange() {
    let selectedRows = this.flowCompGrid.getSelectedRows();
    this.selectedFlow = selectedRows;
    console.log(" [   = =  =  > > >", this.selectedFlow)
    this.microFlowView();
  }

}
