import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-manager',
  templateUrl: './config-manager.component.html',
  styleUrls: ['./config-manager.component.scss']
})
export class ConfigManagerComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  private rowSelection;
  private checkUpdate: Boolean = false;
  private flow: any = {};
  private displayModel: string = 'none';
  private columnDefs: any = [];
  private defaultColDef: any = [];

  constructor() { 
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
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.showNoRowsOverlay()

  }

  openModal(type) {
    if (type === 'create') {
      this.checkUpdate = true;
      // this.flow = {name:'',action_on_data:'',description:'',label:''};
      this.displayModel = 'block';
    }
    if (type === 'update') {
      this.checkUpdate = false;
      // this.flow = this.selectedFlow[0];
      this.displayModel = 'block';
    }
  }

  onCloseHandled() {
    this.displayModel = 'none';
    // this.createFlowForm.clearValidators();
    // this.createFlowForm.reset();
  }
}
 