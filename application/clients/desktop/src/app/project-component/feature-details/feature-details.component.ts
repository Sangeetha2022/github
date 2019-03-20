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
  featureFlowGrid;
  featureFlowCompGrid;
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
    // this.getScreenByFeatureName();
  }
  getAllFeatureFlows(type) {
    this.showFeatureFlow = true;
    this.showFeatureFlowComponent = false;
    this.featureDetailsService.getAllFeatureFlows().subscribe(data => {
      this.rowData = [];
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
        // this.getScreenByFeatureName();
      }
    });
  }
  getAllScreen() {
    this.featureDetailsService.getAllScreen().subscribe(data => {
      this.screens = data;
    });
  }

  // getScreenByFeatureName() {
  //   const name = this.screenData.featureName;
  //   console.log("i am the name", name);

  //   this.featureDetailsService.getScreenByFeatureName(name).subscribe(data => {
  //     this.screens = data;
  //   });
  // }
  openScreenModal() {
    this.displayModel = 'block';
  }
  onCloseHandled() {
    this.displayModel = 'none';
  }

  selectedFeatureFlow() {

    this.selectedFlow = this.featureFlowGrid.getSelectedRows();
    console.log("i am the selected one", this.selectedFlow);
    if (this.selectedFlow.length !== 0) {
      this.dataService.setFeatureFlowIdInfo(this.selectedFlow[0]);
      this.showFeatureFlowComponent = true;
      console.log("i am here");
    }
    this.getFeatureFlowDetails();

  }

  onFlowGridReady(params) {
    this.featureFlowGrid = params.api;
    this.featureFlowGrid.sizeColumnsToFit();
  }

  onFlowCompGridReady(params) {
    this.featureFlowCompGrid = params.api;
    this.featureFlowCompGrid.sizeColumnsToFit();
  }
}
