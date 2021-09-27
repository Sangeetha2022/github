import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/shared/data.service';
import { LoggingService } from '../config/logging.service';
import { ProjectService } from '../project/project.service';
import { IMenu } from './interface/Menu';
import { ProjectComponentService } from './project-component.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ValidatorService } from 'src/shared/validator.service';


@Component({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.scss']
})
export class EntityManagerComponent implements OnInit {

  public Editor:any = ClassicEditor;
  project_id:string='';  
  feature_id:string='';
  logId:any = sessionStorage.getItem('LogId');
  projectName:string='';
  project_display_Name:string='';
  projectFeatureData: any = [];
  selectedEntityId:string='';
  menuLanguages: any = [];
  selectedProject:any=[];
  projectEntity:any;
  displayFeatureModel = 'none';
  selectedOption: String = 'Create Feature';
  deletePopup:string='none';
  options: string[] = ['Import Feature', 'Upload Feature', 'Create Feature'];
  showUploadFeature: Boolean=false;
  showImportFeature: Boolean=false;
  showAddFeature: Boolean = true;
  isFeatureExist: Boolean=false;
  public allEntity:any;
  isReserveWord: Boolean=false;
  invalidName: Boolean=false;
  public formData: FormData = new FormData();
  public menuBuilder: IMenu = {
    language: '',
    feature: [],
    project: '',
    menuDetails: [],
    project_languages: [],
    menu_option: false,
};
public featureInfo: any = {
  name: '',
  description: '',
  project: '',
  type: ''
};

  constructor(private spinner:NgxSpinnerService,
    private projectService:ProjectService,
    private route: ActivatedRoute,
    private dataService:DataService,
    private projectComponentService: ProjectComponentService,
    private logger:LoggingService,
    private validatorService: ValidatorService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log("params is",params);
      
      this.project_id = params.projectId;
      this.feature_id = params.featureId;
  });
    this.getProjectById();
    this.getFeatureByProjectId();
    this.getAllEntityByProjectId();
  }

  //To open add feature dialog box
  openFeatureDialog(): void {
    // if (this.uiFile) {
    //     this.uiFile.nativeElement.value = '';
    // }
    // if (this.serviceFile) {
    //     this.serviceFile.nativeElement.value = '';
    // }
    // if (this.apiGatewayFile) {
    //     this.apiGatewayFile.nativeElement.value = '';
    // }
    // this.formData = new FormData();

    // this.frontFile = undefined;
    // this.backendFile = undefined;
    // this.apiManFile = undefined;
    this.displayFeatureModel = 'block';
}

//Radio button change event for add feature
radioChange(event:any) {
  if (event.value === 'Import Feature') {
    
       this.showImportFeature = true;
       this.showAddFeature = false;
       this.showUploadFeature = false;
  }
  if (event.value === 'Upload Feature') {
    
       this.formData = new FormData();
       this.showImportFeature = false;
      this.showAddFeature = false;
       this.showUploadFeature = true;

  }
  if (event.value === 'Create Feature') {
    
       this.showImportFeature = false;
       this.showAddFeature = true;
       this.showUploadFeature = false;
  }
}

onFeatureChange(event:any) {
  if (event.length <= 0) {
      this.isFeatureExist = false;
      this.isReserveWord = false;
      this.invalidName = false;
  }
}
onReady(eventData:any) {
  eventData.plugins.get('FileRepository').createUploadAdapter = function (loader:any) {
  };
}
  //to get the Project name and details
  getProjectById() {
    this.spinner.show();
    this.projectService.getProjectById(this.project_id, this.logId).subscribe(response => {
        if (response.body) {
            this.spinner.hide();
            this.projectName = response.body.project_unique_id;
            this.project_display_Name=response.body.name;
            this.menuLanguages.push(response.default_human_language);
            if (response.other_human_languages !== '') {
                this.menuLanguages.push(response.other_human_languages);
            }
            this.menuBuilder.project_languages = this.menuLanguages;
            this.menuBuilder.language = this.menuLanguages[0];
        }
    });
}

//GET PROJECT FEATURE BY ID
getFeatureByProjectId() {
  this.spinner.show();
  this.projectComponentService.getFeatureByProjectId(this.project_id, this.logId).subscribe(
      response => {
        console.log(this.project_id,this.logId);
        
          this.spinner.hide();
          this.projectFeatureData = response.body;
          console.log("project feature data",this.projectFeatureData);
      },
      error => {

      }
  );
}
//To get the All entity by project id
getAllEntityByProjectId() {
  this.spinner.show();
  this.projectComponentService.getEntityByProjectId(this.project_id, this.logId).subscribe(
      (data) => {
          this.spinner.hide();
          console.log('all entity data', data.body);
          this.allEntity = data.body;
          this.projectEntity = this.allEntity;
          this.dataService.setAllEntity(this.allEntity);
      },
      (error) => {
          console.log('cannot able to get all entity based on projectId ---- ', error);
      }
  );
}

//To get the selected project
getSelectedProject() {
  this.spinner.show();
  this.dataService.currentProjectInfo.subscribe(
      (data) => {
          this.spinner.hide();
          this.selectedProject = data;
      }
  );
}
  //To close the feature model popup box
  closeFeatureCreateModel() {
        this.displayFeatureModel = 'none';
  }

  //To create the new feature
  createFeature() {
    this.featureInfo.name = this.featureInfo.name.toLowerCase();
    this.featureInfo.project = this.project_id;
    this.validatorService.checkNamingConvention(this.featureInfo.name);
    this.validatorService.checkReserveWords(this.featureInfo.name);
    this.validatorService.currentProjectInfo.subscribe(data => {
        if (data === null) {
            this.invalidName = true;
        } else {
            this.invalidName = false;
        }
    });
    this.validatorService.currentProjectReserveWordInfo.subscribe(reserveWord => {
        this.isReserveWord = reserveWord;
    });
    this.projectComponentService.getFeatureByProjectId(this.project_id, this.logId).subscribe(projFeature => {
      if (projFeature.body.length > 0) {
        projFeature.body.forEach((feature: { name: any; }) => {
            if (feature.name === this.featureInfo.name) {
                this.isFeatureExist = true;
            }
        });
    }
    if (!this.isFeatureExist && !this.invalidName && !this.isReserveWord) {
      this.spinner.show();
      this.featureInfo.description = this.featureInfo.description.replace(/<[^>]+>/g, '');
      this.featureInfo.description.trim();
      this.projectComponentService.saveFeatures(this.featureInfo, this.logId).subscribe(
        (featureData) => {
          this.featureInfo = { name: '', description: '', project: '', type: '' };
          this.displayFeatureModel = 'none';
          this.getFeatureByProjectId();
          this.spinner.hide();
        },
        (error) => {
          this.logger.log('error',error);
        })
    }
    });
  }
  //To edit the entity fro add entity section
  editEntityField(entity: any) {
    this.router.navigate(['/entity-field'], 
      { queryParams: { entityId: entity._id,
        featureId: this.feature_id,
        projectId: this.project_id
      } 
    });
  }
  //To open entity delete popup model
  openDeleteModel(entity:any) {
    this.selectedEntityId = entity._id;
    this.deletePopup = 'block';
  }
  //To close delete Popup model
  closeDeleteModel() {
    this.deletePopup = 'none';
  }
  //To delete the particular wntity
  deleteEntityById() {
    this.deletePopup = 'none';
    this.projectComponentService.deleteEntityById(this.selectedEntityId, this.logId).subscribe(
        (data) => {
            if (data) {
                this.getAllEntityByProjectId();
            }
        },
        (error) => {
          this.logger.log('error',error);
        }
    );
}
}
