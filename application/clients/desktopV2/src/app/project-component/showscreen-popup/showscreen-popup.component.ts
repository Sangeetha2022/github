import { Component, Inject, OnInit } from '@angular/core';
import { ScreenPopupComponent } from '../screen-popup/screen-popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { FeatureDetailsService } from '../feature-details/feature-details.service';
import { DeletefeatpopupComponent } from '../deletefeatpopup/deletefeatpopup.component';
import { ScreenDesignerService } from 'src/app/screen-designer/screen-designer.service';

@Component({
  selector: 'app-showscreen-popup',
  templateUrl: './showscreen-popup.component.html',
  styleUrls: ['./showscreen-popup.component.scss']
})
export class ShowscreenPopupComponent implements OnInit 
{
  project_id:any;
  feature_id: any;
  selectedScreenId:any;
  wizardData:any=
  {
    _id:'',
    screen_info: []
  };
  wizardScreenDetails:any[]=[];
  public logId = sessionStorage.getItem('LogId');

  constructor(private dialog: MatDialog,private router:Router,private route:ActivatedRoute,
              public dialogRef: MatDialogRef<ShowscreenPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public matWizardData: any,public featuredetailsservice:FeatureDetailsService,
              private screenService: ScreenDesignerService) { }

  ngOnInit(): void 
  { 
    this.route.queryParams.subscribe(params => 
    {
          if (params.featureId !== undefined && params.featureId !== null) 
          {
              this.feature_id = params.featureId;
          }
          if (params.projectId !== undefined && params.projectId !== null) 
          {
              this.project_id = params.projectId;
          }
    });
    this.getAllWizard();
  }

  getAllWizard()
  {
    this.featuredetailsservice.getAllWizard().subscribe((wizardData: any) => 
    {
            
            wizardData.body.forEach((data:any)=>
            {
              if(data._id==this.matWizardData.wizardId)
              {
                this.wizardScreenDetails=data.screen_info;
              }
            })
    },
    (error: any) => 
    {
            console.log('cannot able to get the screen based on featureId  ', error);
    });
  }

  GoToDesigner() 
  {
    this.dialogRef.close();
    this.openScreenDialog();
  }

  openScreenDialog()
  {
        const dialogRef = this.dialog.open(ScreenPopupComponent, 
        {
            width: '550px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(screenData => 
        {
            console.log('screen data are---------------- ', screenData);
            if (screenData) 
            {
                this.router.navigate(['/desktopscreen'], 
                {
                    queryParams: 
                    {
                        projectId: this.project_id,
                        featureId: this.feature_id,
                        screenType: screenData.name,
                        screenOption: screenData.type,
                        isPartOfWizard:true,
                        wizardName:this.matWizardData.wizardName,
                        wizardId:this.matWizardData.wizardId
                    }
                });
            }
        });
  }

  editWizardScreen(screenId:any, screenType:any) 
  {
        this.dialogRef.close();
        this.router.navigate(['/desktopscreen'], 
        {
            queryParams: 
            {
                projectId: this.project_id, 
                screenId: screenId,
                featureId: this.feature_id,
                screenType: screenType,
                isPartOfWizard:true,
                wizardName:this.matWizardData.wizardName,
                wizardId:this.matWizardData.wizardId
            }
        });
  }

  deleteWizardScreen(screenId:any)
  {
     this.selectedScreenId=screenId;
     this.deleteDialog();
  }

  deleteDialog() 
  {
        const dialogRef = this.dialog.open(DeletefeatpopupComponent, 
        {
            width: '350px',
        });
        dialogRef.afterClosed().subscribe((data)=>
        {
          console.log(data);
          if(data==true)
          {
            console.log('Screen id', this.selectedScreenId);
            this.screenService.deleteScreenById(this.selectedScreenId, this.logId).subscribe((data) => 
            {
                console.log(data);
                this.wizardData._id=this.matWizardData.wizardId;
                this.featuredetailsservice.getWizardById(this.matWizardData.wizardId).subscribe((data:any)=>
                {
                  this.wizardData=data.body;
                  this.wizardScreenDetails.forEach((data:any,index:any)=>
                  {
                    if(data.screenId==this.selectedScreenId)
                    {
                       this.wizardScreenDetails.splice(index,1);                                               
                    }              
                  })
                  this.wizardData.screen_info=this.wizardScreenDetails;
                  console.log("WizardData JSON:",this.wizardData);
                  this.featuredetailsservice.updateWizardById(this.wizardData).subscribe((response:any)=>
                  {
                    console.log("updatedWizardData:",response);
                  })
                })
                this.featuredetailsservice.updateWizardById(this.wizardData).subscribe((response:any)=>
                {
                    console.log("updatedWizardData:",response);
                }) 
            },
            (error:any) => {  });
            
          }
        })
  }

}
