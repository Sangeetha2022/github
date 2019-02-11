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
        checkboxSelection: true
      },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Action', field: 'action_on_data' },


    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      enableValue: true,
    };
  }

  ngOnInit() {
    this.createFlowForm = this.formBuilder.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      description: '',
      action_on_data: ['', Validators.required],
    });
    this.getAllFlows();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  routeNextPage() {
    this.router.navigate(['flow-component'], { skipLocationChange: true });
  }

  getAllFlows() {
    this.flowManagerService.getAllFlows().subscribe((flowData) => {
      this.dataFlow = flowData;
      console.log('dataFlow', this.dataFlow);
      this.rowData = flowData;

    });
  }

  onSelectionChanged() {
    this.selectedFlow = this.gridApi.getSelectedRows();
    if (this.selectedFlow.length != 0) {
      this.flowManagerService.changeMessage(this.selectedFlow[0].name);
    }
  }

  openModal() {
    this.displayModel = 'block';
  }

  onCloseHandled() {
    this.displayModel = 'none';
    this.createFlowForm.clearValidators();
    this.createFlowForm.reset();
  }

  createFlowModel() {
    this.flowManagerService.saveFlow(this.createFlowForm.getRawValue())
      .subscribe(
        (data) => {
          console.log('successfully added gen flow -- ', data);
          this.onCloseHandled();
          this.getAllFlows();
        },
        (error) => {
          console.log('add gen flow error --- ', error);
        }
      );
  }

  deleteRow() {
    this.flowManagerService.deleteFlow(this.selectedFlow[0]._id).subscribe(
      (data) => {
        console.log('delete flow manager -- ', data);
        this.getAllFlows();
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
        this.getAllFlows();
      },
      (error) => {
        console.log('error delete flow manager --- ', error);
      }
    );
  }
}
