import { Component, OnInit } from '@angular/core';
import { IGenerateFlow } from './interface/generationFlow';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlowManagerService } from './flow-manager.service';
import { Router } from '@angular/router';
import { IFlow } from './interface/flow';

@Component({
  selector: 'app-flow-manager',
  templateUrl: './flow-manager.component.html',
  styleUrls: ['./flow-manager.component.scss']
})
export class FlowManagerComponent implements OnInit {

  private generateFlow: IGenerateFlow = {
    flow_name: '',
    flow_sequence: [],
  };

  flow: IFlow = {
    name: '',
    label: '',
    description: '',
    action_on_data: '',
  };

  gridApi;
  gridColumnApi;
  getGenFlow: any;
  dataFlow: any;
  dataFlowComponent: any;
  selectedFlow: any = [];
  rowSelection;
  rowData: any;
  columnDefs;
  message: string;
  defaultColDef;
  getRowNodeId;

  displayModel: String = 'none';
  createFlowForm: FormGroup;

  isCreateModel: Boolean = true;

  constructor(private formBuilder: FormBuilder,
    private flowManagerService: FlowManagerService, private router: Router) {
    this.columnDefs = [
      {
        headerName: 'Name', field: 'name',
        // headerCheckboxSelection: true,
        // headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Action', field: 'action_on_data' },


    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      enableValue: true,
      // sortable: true,
      filter: true,
      resizable: true,
      // editable: true,
    };
  }

  ngOnInit() {
    this.createFlowForm = this.formBuilder.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      description: '',
      action_on_data: ['', Validators.required],
    });
    this.getFlow();
    this.getFlowComp();
    this.getAllGenFlow();
    // this.flowManagerService.currentMessage.subscribe(message => this.message = message)
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: '_id',
    //   textField: 'name',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };
  }

  getFlowComp() {
    this.flowManagerService.getFlowComponents().subscribe((flowComponentData) => {
      this.dataFlowComponent = flowComponentData;
    });
  }

  getFlow() {
    this.flowManagerService.getFlows().subscribe((flowData) => {
      this.dataFlow = flowData;
      console.log('dataFlow', this.dataFlow);
      this.rowData = flowData;

    });
  }

  routeNextPage() {
    this.router.navigate(['flow-component'], { skipLocationChange: true });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged(show) {
    // const selectedRows = this.gridApi.getSelectedRows();
    this.selectedFlow = this.gridApi.getSelectedRows();
    console.log('selected flow values are ------ ', this.selectedFlow);
    this.flowManagerService.changeMessage(this.selectedFlow[0].name);
    // this.router.navigate(['flow-component'], { skipLocationChange: true });
  }

  openModal() {
    this.displayModel = 'block';
  }
  onCloseHandled() {
    this.displayModel = 'none';
    // this.submitted = false;
    this.createFlowForm.clearValidators();
    this.createFlowForm.reset();
  }

  createFlowModel() {
    console.log('test values are ---------- ', this.createFlowForm.getRawValue());
    // const createFlow = {
    this.flowManagerService.saveFlow(this.createFlowForm.getRawValue())
      .subscribe(
        (data) => {
          console.log('successfully added gen flow -- ', data);
          this.onCloseHandled();
          this.getAllGenFlow();
        },
        (error) => {
          console.log('add gen flow error --- ', error);
        }
      );

    // }
  }
  getAllGenFlow() {
    this.flowManagerService.getGenFlow().subscribe((getGenFlow) => {
      this.getGenFlow = getGenFlow;
    });
  }

  deleteRow() {
    // console.log('delete row flow manager ----- ', this.s)
    this.flowManagerService.deleteFlow(this.selectedFlow[0]._id).subscribe(
      (data) => {
        console.log('delete flow manager -- ', data);
        this.getAllGenFlow();
      },
      (error) => {
        console.log('error delete flow manager --- ', error);
      }
    );
  }

  updateRow() {
    this.isCreateModel = false;
    this.flow = this.selectedFlow[0];
    this.openModal();
  }

  updateFlowModel() {
    this.flowManagerService.updateFlow(this.flow).subscribe(
      (data) => {
        this.onCloseHandled();
        this.getAllGenFlow();
      },
      (error) => {
        console.log('error delete flow manager --- ', error);
      }
    );
  }

  // onItemSelect(item: any) {
  //   this.items.push(item.name)
  //   console.log(this.items)
  // }

  // onSelectAll(items: any) {
  //   console.log("items", items)
  //   items.forEach((data) => {
  //     this.items.push(data.name)
  //   });
  //   console.log("drag and drop", this.items)
  // }



  // onSelectionMicroFlowChanged(show) {
  //   var selectedRows = this.gridApi.getSelectedRows();
  //   this.selectedMicroFlow = selectedRows;
  //   if(this.selectedMicroFlow.length>1){

  //   }
  //   this.microFLowData.push(this.selectedMicroFlow.length)
  //   console.log("hello+++++++++++++",this.microFLowData)
  //   if (this.selectedMicroFlow.length >= 1) {
  //     this.checkSelectedFlowComponent = true;
  //   }
  //   // this.router.navigate(['flow-component'],{ skipLocationChange: true });
  // }

  // onSelectionFlowChanged(show) {
  //   var selectedFlowRows = this.gridApi.getSelectedRows();
  //   this.selectedFlowComponents = selectedFlowRows;
  //   if (this.selectedFlowComponents.length === 1) {
  //     this.checkSelectedFlow = false;
  //     this.checkSelectedMicroFlow = true;
  //   }
  // }


  // onUnSelectAll(items: any) {
  //   this.items = items;
  // }

  // onItemDeSelect(item) {
  //   let index = this.items.indexOf(item.name)
  //   this.items.splice(index, 1)
  //   console.log(this.items)
  // }

  // onDrop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  // }

  // selectFlow(flowSelect) {
  //   this.selectedFlow = this.dataFlow.find((fl) => { return fl.name === flowSelect })
  // }

  // saveGenFlow() {
  //   this.items.forEach((item) => {
  //     this.components.push(this.dataFlowComponent.find((fl) => { return fl.name === item }))
  //   })
  //   this.generation_flow.flow_name = this.selectedFlow;
  //   this.generation_flow.flow_sequence = this.components;
  //   this.addFlow();
  //   this.empty();
  // }
}
