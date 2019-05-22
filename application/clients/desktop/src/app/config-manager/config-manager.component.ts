import { Component, OnInit } from '@angular/core';
import { ConfigManagerService } from './config-manager.service';
import { IConfigManager } from './interface/configmanager';
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

  public configManager: IConfigManager = {
    description: '',
    id: '',
    label: '',
    name: '',
    sub_type: '',
    type: '',
    value: '',
  };

  constructor(public configManagerService: ConfigManagerService) {
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
    console.log('i am the selected one', this.selectedConfig);

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
      // this.configManager.id = this.selectedConfig[0]._id;
      // this.configManager.name = this.selectedConfig[0].name;
      // this.configManager.description = this.selectedConfig[0].description;
      // this.configManager.label = this.selectedConfig[0].label;
      // this.configManager.type = this.selectedConfig[0].type;
      // this.configManager.value = this.selectedConfig[0].value;
      // this.configManager.sub_type = this.selectedConfig[0].sub_type;

      this.displayModel = 'block';
    }
  }

  onCloseHandled() {
    this.displayModel = 'none';
    this.configManager = { name: '', value: '', type: '', sub_type: '', label: '', id: '', description: '' };
    // this.createFlowForm.clearValidators();
    // this.createFlowForm.reset();
  }

  onCloseHandledForUpdate() {
    this.displayModel = 'none';
  }



  getAllConfig() {
    this.configManagerService.getAllConfig().subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }

  createConfig() {
    this.configManagerService.saveConfig(this.configManager)
      .subscribe(
        (data) => {
          console.log('successfully added gen flow -- ', data);
          this.onCloseHandled();
          this.getAllConfig();
        },
        (error) => {
          console.log('add gen flow error --- ', error);
        }
      );
  }

  updateConfig() {
    this.configManagerService.updateConfig(this.configManager).subscribe(
      (data) => {
        this.onCloseHandled();
        this.getAllConfig();
      },
      (error) => {
        console.log('error delete flow manager --- ', error);
      }
    );
  }

  deleteRow() {
    this.configManagerService.deleteConfig(this.selectedConfig[0]._id).subscribe(data => {
    });
    this.getAllConfig();
  }
}
