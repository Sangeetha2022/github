import { Component, OnInit } from '@angular/core';
import { ConfigManagerService } from './config-manager.service';
import { IConfigManager } from './interface/configmanager';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-config-manager',
  templateUrl: './config-manager.component.html',
  styleUrls: ['./config-manager.component.scss']
})
export class ConfigManagerComponent implements OnInit {

  public gridApi;
  public gridColumnApi;
  public rowSelection;
  public checkUpdate: Boolean = false;
  public config: any;
  public selectedConfig: any = [];
  public displayModel = 'none';
  public columnDefs: any = [];
  public rowData: any = [];
  public defaultColDef: any = [];
  public paginationPageSize;
  public paginationNumberFormatter;
  public logId = sessionStorage.getItem('LogId');

  public configManager: IConfigManager = {
    description: '',
    id: '',
    label: '',
    name: '',
    sub_type: '',
    type: '',
    value: '',
  };

  constructor(
    public configManagerService: ConfigManagerService,
    private spinner: NgxSpinnerService
  ) {
    this.columnDefs = [
      {
        headerName: 'Name', field: 'name',
        checkboxSelection: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Label', field: 'label', filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Value', field: 'value', filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Description', field: 'description', filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Type', field: 'type', filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Sub Type', field: 'sub_type', filter: 'agTextColumnFilter',
      },




    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      enableValue: true,
    };
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
  }

  ngOnInit() {
    this.getAllConfig();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.showNoRowsOverlay();

  }
  onSelectionChanged() {
    this.selectedConfig = this.gridApi.getSelectedRows();

  }
  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize));
  }

  openModal(type) {
    if (type === 'create') {
      this.checkUpdate = true;
      // this.flow = {name:'',actionOnData:'',description:'',label:''};
      this.displayModel = 'block';
    }
    if (type === 'update') {
      this.checkUpdate = false;
      this.configManager = this.selectedConfig[0];
      this.displayModel = 'block';
    }
  }

  onCloseHandled() {
    this.displayModel = 'none';
    this.configManager = { name: '', value: '', type: '', sub_type: '', label: '', id: '', description: '' };
  }

  onCloseHandledForUpdate() {
    this.displayModel = 'none';
  }



  getAllConfig() {
    this.spinner.show();
    this.configManagerService.getAllConfig(this.logId).subscribe(data => {
      this.spinner.hide();
      this.rowData = data.body;
    });
  }

  createConfig() {
    this.spinner.show();
    this.configManagerService.saveConfig(this.configManager, this.logId)
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.onCloseHandled();
          this.getAllConfig();
        },
        (error) => {
          console.log('add gen flow error --- ', error);
        }
      );
  }

  updateConfig() {
    this.spinner.show();
    this.configManagerService.updateConfig(this.configManager, this.logId).subscribe(
      (data) => {
        this.spinner.hide();
        this.onCloseHandled();
        this.getAllConfig();
      },
      (error) => {
        console.log('error delete flow manager --- ', error);
      }
    );
  }

  deleteRow() {
    this.spinner.show();
    this.configManagerService.deleteConfig(this.selectedConfig[0]._id, this.logId).subscribe(data => {
      this.spinner.hide();
      this.getAllConfig();
    });
  }
}
