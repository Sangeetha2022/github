import { Component, OnInit } from '@angular/core';
import { ScreenPopupComponent } from '../screen-popup/screen-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-showscreen-popup',
  templateUrl: './showscreen-popup.component.html',
  styleUrls: ['./showscreen-popup.component.scss']
})
export class ShowscreenPopupComponent implements OnInit 
{
  project_id:any;
  feature_id: any;

  constructor(private dialog: MatDialog,private router:Router,private route:ActivatedRoute,
              public dialogRef: MatDialogRef<ShowscreenPopupComponent>) { }

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
                        screenOption: screenData.type
                    }
                });
            }
        });
  }

}
