import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectComponentService } from '../project-component.service';
import { ScreenPopupComponent } from '../screen-popup/screen-popup.component';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.scss']
})
export class FeatureDetailsComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService,
    private projectComponentService:ProjectComponentService,
    private route:ActivatedRoute,
    private dialog: MatDialog,
    private router:Router) { }

  featureEntityDetails: any[] = [];
  feature_id: any;
  project_id:any;
  public logId = sessionStorage.getItem('LogId');
  isPrimaryEntityPresent!: Boolean;
  featureInfo: any;
  selectedFeatureName: String='';
  flowInFeatureRowData: any[] = [];
  rowData: any = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        if (params.featureId !== undefined && params.featureId !== null) {
            this.feature_id = params.featureId;
        }
        if (params.projectId !== undefined && params.projectId !== null) {
            this.project_id = params.projectId;
        }

    });
    this.getFeatureById();
    this.getEntityByFeatureId();
  }
  getFeatureById() {
    this.spinner.show();
    this.projectComponentService.getFeatureById(this.feature_id, this.logId).subscribe(
        response => {
            this.spinner.hide();
            this.featureInfo = response.body;
            this.selectedFeatureName = response.body.name;
            this.getProjectFeatureFlows();
            this.getAllFlows();
        },
        error => {

        }
    );
}
  getEntityByFeatureId() {
    this.spinner.show();
    //Added secondray entity in feature
    this.projectComponentService.getAllEntityByFeatureId(this.feature_id, this.logId).subscribe(
        (entityData) => {
            console.log("entityData",entityData);
            
            this.spinner.hide();
            this.featureEntityDetails = entityData.body.body;
            console.log("featureEntityDetails is",this.featureEntityDetails);
            this.isPrimaryEntityPresent = this.featureEntityDetails.some(x => x.entity_type === 'primary');
        },
        (error) => {

        }
    );
}
getProjectFeatureFlows() {
  this.spinner.show();
  this.projectComponentService.getProjectFeatureFlows(this.featureInfo.flows, this.logId).subscribe(response => {
      const temp = [];
      if (response.body) {
          this.spinner.hide();
          this.flowInFeatureRowData = response.body;
      }
  }, error => {
      console.error(error);
  });
}
getAllFlows() {
  this.spinner.show();
  this.projectComponentService.getAllFlows(this.logId).subscribe(
      response => {
          const flows = response.body;
          if (flows) {
              this.spinner.hide();
              if (this.flowInFeatureRowData.length === 0) {
                  this.rowData = flows;
              } else {
                  this.flowInFeatureRowData.forEach(flowElement => {
                      const index = flows.findIndex((x: { name: any; }) => x.name === flowElement.name);
                      if (index > -1) {
                          flows.splice(index, 1);
                      }
                  });
                  this.rowData = flows;
              }
          }
      },
      error => {
      }
  );
}
GoToDesigner() {
    this.openScreenDialog();
}
openScreenDialog(): void {
    const dialogRef = this.dialog.open(ScreenPopupComponent, {
        width: '550px',
        data: {}
    });


    dialogRef.afterClosed().subscribe(screenData => {
        console.log('screen data ar e---------------- ', screenData);
        if (screenData) {
            this.router.navigate(['/desktopscreen'], {
                queryParams: {
                    projectId: this.project_id,
                    featureId: this.feature_id,
                    screenType: screenData.name,
                    screenOption: screenData.type
                }
            });
        }
    });
}

}
