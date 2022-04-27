import { Component, Inject, OnInit } from '@angular/core';
import { ScreenPopupComponent } from '../screen-popup/screen-popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { FeatureDetailsService } from '../feature-details/feature-details.service';
import { DeletefeatpopupComponent } from '../deletefeatpopup/deletefeatpopup.component';
import { ScreenDesignerService } from 'src/app/screen-designer/screen-designer.service';
import { EditpositionComponent } from './editposition/editposition.component';
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
  showInput:boolean=false;
  fromIndex:number=0;
  toIndex:number=0;
  wizardScreenDetails:any=
  {
    posInWizard:0
  };
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

  editWizardScreen(index:any,screenName:any) 
  {
      this.showInput=true;
      this.fromIndex=index;
      console.log("Index:",this.fromIndex);
      const dialogRef = this.dialog.open(EditpositionComponent, 
      {
          width: '350px',
          height:'auto',
          data:
          {
             fromIndex:this.fromIndex,
             screenName:screenName
          }
      });
      dialogRef.afterClosed().subscribe((data)=>
      {
          console.log("NewPosition:",data);
          this.arrayMove(data);
      })
  }
  arrayMove(data:any)
  {
    this.toIndex=data;
    var element=this.wizardScreenDetails.splice(this.fromIndex,1)[0];
    this.wizardScreenDetails.splice(this.toIndex,0,element);
    console.log("Screen:",element);
    console.log("FromIndex:",this.fromIndex);
    console.log("ToIndex:",this.toIndex);
    console.log("position of Screens:",this.wizardScreenDetails);
  }

  updateWizard()
  {
    this.wizardData._id=this.matWizardData.wizardId;
    this.wizardData.screen_info=this.wizardScreenDetails;
    console.log("WizardData JSON:",this.wizardData);
    this.featuredetailsservice.updateWizardById(this.wizardData).subscribe((response:any)=>
    {
      console.log("updatedWizardData:",response);
    })
    this.dialogRef.close();
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
            },
            (error:any) => {  });
            
          }
        })
  }

}
