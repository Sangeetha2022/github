import { Component, OnInit } from '@angular/core';
import { ConfigManagerService } from './config-manager.service'
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
  private rowData: any = [];
  private defaultColDef: any = [];
  private paginationPageSize;
  private paginationNumberFormatter;

  constructor(private configManagerService: ConfigManagerService) {
    this.columnDefs = [
      {
        headerName: 'Name', field: 'name',
        checkboxSelection: true,
        filter: "agTextColumnFilter",
      },
      {
        headerName: 'Label', field: 'label', filter: "agTextColumnFilter",
      },
      {
        headerName: 'Value', field: 'value', filter: "agTextColumnFilter",
      },
      {
        headerName: 'Description', field: 'description', filter: "agTextColumnFilter",
      },
      {
        headerName: 'Type', field: 'type', filter: "agTextColumnFilter",
      },
      {
        headerName: 'Sub Type', field: 'sub_type', filter: "agTextColumnFilter",
      },




    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      enableValue: true,
    };
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }

  ngOnInit() {
    this.getAllGen();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.showNoRowsOverlay()

  }
  onSelectionChanged(event) {

  }
  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize));
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



  getAllGen() {
    this.configManagerService.getAllGen().subscribe(data => {
      this.rowData = data;
      console.log(data)
    })
  }
}
