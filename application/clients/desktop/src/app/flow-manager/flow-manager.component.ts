import { Component, OnInit } from '@angular/core';
import { IGenerateFlow } from './interface/generationFlow';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlowManagerService } from './flow-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IFlow } from './interface/flow';
import { DataService } from 'src/shared/data.service';

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
    actionOnData: '',
  };
  flowAfterCancel: any;
  gridApi;
  flow_name: String;
  gridColumnApi;
  getGenFlow: any;
  dataFlow: any;
  dataFlowComponent: any;
  selectedFlow: any = [];
  rowSelection;
  isDisableFlow: boolean;
  rowData: any;
  checkUpdate: boolean;
  columnDefs;
  message: string;
  defaultColDef;
  getRowNodeId;

  displayModel: String = 'none';
  createFlowForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private flowManagerService: FlowManagerService,
    private router: Router, private route: ActivatedRoute,
    private dataService: DataService,
  ) {
    this.columnDefs = [
      {
        headerName: 'Name', field: 'name',
        checkboxSelection: true
      },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Action', field: 'actionOnData' },


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
      actionOnData: ['', Validators.required],
    });
    this.getAllFlows();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
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
    if (this.selectedFlow.length !== 0) {
      this.dataService.setFlow(this.selectedFlow[0]);
    }
  }

  routeNextPage(event) {
    console.log('route next page values rae----- ', event);
    this.dataService.setFlow(event.data);
    this.router.navigate(['flow-component']);
    // this.dataService.currentflowSource.subscribe(data => {
    //   console.log('get route next page in flows ------  ', data);
    //   this.flow_name = data.name;
    // });
    // this.router.navigate(['flow-component'], { queryParams: { name: this.flow_name } });
  }

  openModal(type) {
    if (type === 'create') {
      this.checkUpdate = true;
      this.flow = { name: '', actionOnData: '', description: '', label: '' };
      this.displayModel = 'block';
    }
    if (type === 'update') {
      this.checkUpdate = false;
      this.flow = this.selectedFlow[0];
      this.displayModel = 'block';
    }
  }

  onCloseHandled() {
    this.displayModel = 'none';
    this.createFlowForm.clearValidators();
    this.createFlowForm.reset();
  }

  onCloseHandledForUpdate() {
    this.displayModel = 'none';
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

  updateFlowModel() {
    console.log('= = >> ', this.flow);
    this.flowManagerService.updateFlow(this.flow, this.flow['_id']).subscribe(
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
