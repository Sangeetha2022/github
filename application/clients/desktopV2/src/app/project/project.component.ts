import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggingService } from '../config/logging.service';
import { ProjectService } from './project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  panelOpenState = false;
  myAllProjects:any=[];
  cloneAllProjects: any = [];
  public UserId:any=  sessionStorage.getItem('Id');
  public logId:any=sessionStorage.getItem('LogId');
  constructor(private projectsService:ProjectService,private logger:LoggingService,private spinner: NgxSpinnerService,  private toastr: ToastrService,) { }
  idToDelete: any;
  delmodal: String = 'none';
  ngOnInit(): void {
    this.getProjectByUserId();
    this.getCloneProjectById();
  }
  
  getProjectByUserId() {
    this.spinner.show();
    this.myAllProjects = [];
    this.projectsService.getProjectByUserId(this.UserId, this.logId).subscribe(data => {
      if (data) {
        this.spinner.hide();
        this.myAllProjects = data.body;
      }
    }, error => {
      this.logger.log('error',error);
    });
  }
  getCloneProjectById() {
    this.spinner.show();
    this.cloneAllProjects = [];
    this.projectsService.getProjectByAll(this.UserId, this.logId).subscribe(async data => {
      if (data) {
         this.spinner.hide();
        let sampleData = data.body.filter((global:any) => global.shared_visibility === 'Global');
        this.cloneAllProjects = sampleData;
      }
    }, error => {
      this.logger.log('error',error);
    });

  }
    //cloneProject
    cloned_data:any;
    async cloneProject(project:any) {
     
      const cloneproject = {
        project_id: project._id,
        project_name: project.name,
  
        user_id: sessionStorage.getItem('Id'),
  
        status: 'gen_requested',
        status_message: 'generation requested',
        stack_trace: 'gen_processing',
        claimed: 't',
        parent_gen_id: '0'
  
      };
      this.projectsService.cloneProject(cloneproject, this.logId).subscribe(data => {
      
        //console.log('lo',data['body']);
        
        this.cloned_data=data;
         var firstBody = this.cloned_data['body'];
         var addData = firstBody['body'];
  
        // console.log('projectid', firstBody);
  
        setTimeout(() => {
          if (cloneproject.project_id !== addData._id) {
            this.toastr.success('PROJECT CLONED: ' + addData.project_unique_id + '', '',
              {
                closeButton: true,
                disableTimeOut: false
              });
          }
          this.getCloneProjectById();
          this.getProjectByUserId();
        }, 1500);
  
      }, error => {
        this.toastr.error('Failed!', 'Operation', {
          closeButton: true,
          disableTimeOut: false
        });
      });
    }
  openDeleteModel(proj:any) {
    this.idToDelete = proj._id;
    this.delmodal = 'block';
  }
  deleteMyProjects() {
    this.projectsService.deleteProjectFlowByProjectId(this.idToDelete, this.logId).subscribe(data => {
      if (data) {
        console.log(data);
        
        this.delmodal = 'none';
        this.getProjectByUserId();
      }
    }, error => {
      this.logger.log('error',error);
    });
  }
  onCloseHandled() {
    this.delmodal = 'none';
  }
}
