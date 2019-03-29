import { Component, OnInit } from '@angular/core';
import { FeatureDetailsService } from './feature-details.service';
import { DataService } from 'src/shared/data.service';
import { Iscreen } from './interface/screen';
import { Route, ActivatedRoute } from '@angular/router';
import yaml from 'js-yaml';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3006/feature/details/addfile';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.scss']
})
export class FeatureDetailsComponent implements OnInit {
  screens: any = [];
  columnDefs: any = [];
  featureName: any;
  feature_id: String;
  screenName: String;
  description: String;
  featureDetailsData: any = [];
  featureEntityData: any = [];
  featureEntity: any = [];
  displayModel: String = 'none';
  columnFeatureDefs: any = [];
  columnFeatureEntityData: any = [];
  columnFeatureEntity: any = [];
  rowFlowCompData: any = [];
  featureFlowRowData: any = [];
  featureFlowId: String;
  featureId: any;
  rowSelection: String;
  defaultColDef: any;
  showFeatureFlow: boolean;
  public screenData: Iscreen = {
    screenName: '',
    description: '',
    featureName: '',

  }
  showFeatureFlowComponent: boolean;
  allFeatureFlows: any = [];
  selectedFlow: any = [];
  selectedFeatureEntity: any = [];
  showFeatureEntity: boolean;
  featureFlowGrid;
  featureFlowCompGrid;
  featureEntityDataGrid;
  featureEntityGrid;

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  //This is the default title property created by the angular cli. Its responsible for the app works 
  title = 'app works!';

  constructor(private featureDetailsService: FeatureDetailsService, private dataService: DataService, private route: ActivatedRoute) {
    this.columnDefs = [
      {
        headerName: 'Name', field: 'name',
        checkboxSelection: true
      },
      { headerName: 'Label', field: 'label' },
      { headerName: 'Screen Name', field: 'screenName' },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Action', field: 'action_on_data' }
    ];
    this.columnFeatureDefs = [
      {
        headerName: 'Label', field: 'label', checkboxSelection: true
      },

      {
        headerName: 'Dev Framework', field: 'dev_framework',
      },
      {
        headerName: 'Dev Lang', field: 'dev_language',
      },
      { headerName: 'Description', field: 'description' },
    ];

    this.columnFeatureEntityData = [
      {
        headerName: 'Collection Name', field: 'name', checkboxSelection: true
      },

      {
        headerName: 'Description', field: 'description',
      }
    ];

    this.columnFeatureEntity = [
      {
        headerName: 'Document Name', field: 'name', checkboxSelection: true
      },
      {
        headerName: 'Data Type', field: 'data_type'
      }
    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      enableValue: true,
    };
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.feature_id = params.featureId;
    });
    this.getAllFeatureDetailsByFeatureId();
    this.getFeatureEntityByFeatureId();
    // this.getAllScreen();
    // this.getAllFeatureFlows();
    // this.getAllEntity();
    // var doc = yaml.safeLoad(this.readTextFile('assets/files/ticketing-system.yaml'))
    // this.formDatafromYAML(doc);
  }

  upload = () => {

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }

  // formDatafromYAML = (doc) => {
  //   console.log("== >> am coming here ---======>>>> ", doc);
  //   let allSchema = []
  //   let allFlows = []
  //   let flowArray = Object.keys(doc).map((data, index) => {
  //     if (data !== "dns" && data !== "db") {
  //       let flowArray1 = Object.keys(doc[data]).map((data1, i) => {
  //         if (data1 !== "schema" && data1 !== "handler") {
  //           console.log("====>>>data needed ----->>>>>", doc[data][data1]);
  //           let dataTopush = {
  //             action_on_data: data1,
  //             create_with_default_activity: 1,
  //             description: doc[data][data1]["description"],
  //             label: data1,
  //             name: doc[data][data1]["flow"],
  //             screenName: "Ticket Creation",
  //             type: "basic"
  //           }
  //           this.allFeatureFlows.push(dataTopush)
  //           return data1
  //         }
  //       })
  //       allSchema.push({ name: data, model: doc[data]["schema"] })

  //       console.log("== >> am coming here flowArray1---=ffffffffffff=====>>>> ", allSchema);
  //       console.log("== >> am coming here allFlows---=ffffffffffff=====>>>> ", this.allFeatureFlows);
  //       return data
  //     } else {
  //       return false
  //     }
  //   })
  //   console.log(" flow array 0pp  p- -- -  = = = > ", flowArray)
  // }

  getAllFeatureDetailsByFeatureId() {
    this.featureDetailsService.getAllFeatureDetailsByFeatureId(this.feature_id).subscribe(data => {
      this.featureDetailsData = data;
      console.log("adsffadffaf", this.featureDetailsData);
      this.featureDetailsData.map((data) => {
        this.allFeatureFlows.push(data.flow);
      });
      this.featureFlowRowData = this.allFeatureFlows;
      console.log("adsffadffaf", this.featureFlowRowData);
    });
  }
  // getAllFeatureFlows() {
  //   this.showFeatureFlow = true;
  //   this.showFeatureFlowComponent = false;
  //   this.featureDetailsService.getAllFeatureFlowByFeatureId(this.featureId).subscribe(data => {
  //     this.allFeatureFlows = data;
  //   });
  // }

  readTextFile = (file) => {
    var rawFile = new XMLHttpRequest();
    var allText = null;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          allText = rawFile.responseText;
        }
      }
    }
    rawFile.send(null);
    return allText;
  }

  getFeatureEntityByFeatureId(){
    this.featureDetailsService.getFeatureEntityByFeatureId(this.feature_id).subscribe(data=>{
      console.log(data);
      this.featureEntityData = data;
    })
  }

  getAllEntity() {
    this.featureDetailsService.getAllEntity().subscribe(data => {
      this.featureEntityData = data;
    });
  }

  // getFeatureFlowDetails() {

  //   this.dataService.currentFeatureFlowIdInfoSource.subscribe(data => {
  //     this.featureFlowId = data._id;
  //     if (data) {
  //       // this.featureDetailsService.getFeatureFlowDetails(this.featureFlowId).subscribe(data => {
  //       //   this.rowFlowCompData = data.flow_comp_seq;
  //       // });
  //     }
  //   });

  // }

  createScreen() {
    this.featureDetailsService.addScreen(this.screenData).subscribe(data => {
      if (data) {
        this.onCloseHandled();
        // this.getAllScreen();
      }
    });
  }
  // getAllScreen() {
  //   this.featureDetailsService.getAllScreen().subscribe(data => {
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
    console.log(this.selectedFlow)
    if (this.selectedFlow.length !== 0) {

      this.featureDetailsService.getFeatureFlowCompByFlowId(this.selectedFlow[0]._id).subscribe(data => {
        console.log("adfadffafafffdfgfag", data)
        this.rowFlowCompData = data.flow_comp_seq;
        this.showFeatureFlowComponent = true;

      });
    }
  }

  selectedFeatureEntityData() {
    this.selectedFeatureEntity = this.featureEntityDataGrid.getSelectedRows();
    if (this.selectedFeatureEntity.length !== 0) {
      const id = this.selectedFeatureEntity[0]._id;
      this.featureEntity = this.selectedFeatureEntity[0].field;
      this.showFeatureEntity = true;
    }

  }

  onFlowGridReady(params) {
    this.featureFlowGrid = params.api;
    this.featureFlowGrid.sizeColumnsToFit();
  }

  onFlowCompGridReady(params) {
    this.featureFlowCompGrid = params.api;
    this.featureFlowCompGrid.sizeColumnsToFit();
  }

  onFeatureEntityDataGridReady(params) {
    this.featureEntityDataGrid = params.api;
    this.featureEntityDataGrid.sizeColumnsToFit();
  }
  onFeatureEntityGridReady(params) {
    this.featureEntityGrid = params.api;
    this.featureEntityGrid.sizeColumnsToFit();
  }
}
