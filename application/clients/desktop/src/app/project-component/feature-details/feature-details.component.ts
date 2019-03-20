import { Component, OnInit } from '@angular/core';
import { FeatureDetailsService } from './feature-details.service';
import { DataService } from 'src/shared/data.service';
import { Iscreen } from './interface/screen';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.scss']
})
export class FeatureDetailsComponent implements OnInit {
  screens: any = [];
  columnDefs: any = [];
  featureName: any;
  screenName: String;
  description: String;
  displayModel: String = 'none';
  columnFeatureDefs: any = [];
  rowFlowCompData: any = [];
  featureFlowId: String;
  rowSelection: String;
  defaultColDef: any;
  showFeatureFlow: boolean;
  public screenData: Iscreen = {
    screenName: '',
    description: '',
    featureName: '',

  }
  showFeatureFlowComponent: boolean;
  rowData: any = [];
  selectedFlow: any = [];
  selectedFeatureFlow: any = [];
  gridApi;
  gridColumnApi;
  constructor(private featureDetailsService: FeatureDetailsService, private dataService: DataService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.screenData.featureName = params.feature;
    });
    this.columnDefs = [
      {
        headerName: 'Name', field: 'name',
        checkboxSelection: true
      },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Method Name', field: 'methodName' },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Action', field: 'action_on_data' }
    ];
    this.columnFeatureDefs = [
      {
        headerName: 'Name', field: 'component_name',
        checkboxSelection: true
      },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Description', field: 'description' },
    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      enableValue: true,
    };
  }

  ngOnInit() {
    this.getAllScreen();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
  getAllFeatureFlows(type) {
    this.showFeatureFlow = true;
    this.featureDetailsService.getAllFeatureFlows().subscribe(data => {
      this.rowData = [];
      console.log("i am the one you needed",this.rowData);
      // if(this.rowData==null){
      //   this.showFeatureFlowComponent = false;
      // }
      data.map((data) => {
        if (data.screenName === type) {
          this.rowData.push(data);
        }
      });
    });
  }

  getFeatureFlowDetails() {

    this.dataService.currentFeatureFlowIdInfoSource.subscribe(data => {
      this.featureFlowId = data._id;
      if (data) {
        this.featureDetailsService.getFeatureFlowDetails(this.featureFlowId).subscribe(data => {
          console.log("asdasddsdad", data)
          this.rowFlowCompData = data.flow_comp_seq;
        });
      }
    });

  }

  createScreen() {
    this.featureDetailsService.addScreen(this.screenData).subscribe(data => {
      if (data) {
        this.onCloseHandled();
        this.getAllScreen();
      }
    });
  }
  getAllScreen() {
    this.featureDetailsService.getAllScreen().subscribe(data => {
      this.screens = data;
    });
  }
  openScreenModal() {
    this.displayModel = 'block';
  }
  onCloseHandled() {
    this.displayModel = 'none';
  }
  onSelectionChanged() {
    this.selectedFlow = this.gridApi.getSelectedRows();
    if (this.selectedFlow.length !== 0) {
      this.dataService.setFeatureFlowIdInfo(this.selectedFlow[0]);
      this.showFeatureFlowComponent = true;
    }
    this.getFeatureFlowDetails();
  }
}
