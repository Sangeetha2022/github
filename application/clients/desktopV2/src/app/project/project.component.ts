import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoggingService } from '../config/logging.service';
import { ProjectService } from './project.service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorService } from 'src/shared/validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/shared/data.service';
import { TemplateScreenService } from '../template-screen/template-screen.service';
import { Router } from '@angular/router';

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
  idToDelete: any;
  delmodal: String = 'none';
  displayModel: String = 'none';
  displayTemplateModel:String='none';
  secondoryLanguages: String[] = ['English', 'Tamil', 'Spanish'];
  primaryLanguages: String[] = ['English', 'Tamil', 'Spanish'];
  gepTemplates: any = [];
  gepTempImages:any=[];
  public invalidName: boolean=false;
  public isProjectExit: boolean = false;
  public isReserveWord: boolean=false;
  public flowDeatilsArray: any = [];
  submitted = false;
  public defaultscreenvalue: any;
  public defaultFeatureInfo: any;
  createProject:FormGroup=new FormGroup({});
   created_date: String='';
   public projectName: String = '';
    templateObj= {
    app_ui_template: '',
    app_ui_template_id: '',
    app_ui_template_name: ''
  };
  public lang: any;
  public defaultEntityInfo: any;
  public flowsArray:any;
  public entitydetails: { 'entities': { 'entityType': any; 'entityId': any; }; 'name': any; 'description': any; 'updated_date': number; }[] = [];
  constructor(private projectsService:ProjectService,
    private formBuilder: FormBuilder,
    private logger:LoggingService,
    private spinner: NgxSpinnerService,  
    private toastr: ToastrService,
    private validatorService: ValidatorService,
    private dataService: DataService,
    private templateScreenService:TemplateScreenService,
    private router:Router) { }

  ngOnInit(): void {
    this.createProject = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern('')
      ])],
      description: '',
      primaryLanguage: ['', Validators.required],
      secondaryLanguage: [''],
      template: [''],
    });
    this.lang = navigator.language;
    if (this.lang.includes('ta')) {
      this.lang = 'Tamil';
      this.createProject.controls['primaryLanguage'].setValue(this.lang, { onlySelf: true });
    } else if (this.lang.includes('en')) {
      this.lang = 'English';
      this.createProject.controls['primaryLanguage'].setValue(this.lang, { onlySelf: true });
      console.log('eng');
    } else if (this.lang.includes('es')) {
      this.lang = 'Spanish';
      this.createProject.controls['primaryLanguage'].setValue(this.lang, { onlySelf: true });
      console.log('span');
    } else {
      this.lang = 'English';
      this.createProject.controls['primaryLanguage'].setValue(this.lang, { onlySelf: true });
    }
    this.getProjectByUserId();
    this.getCloneProjectById();
    this.getAllTemplates();
    this.getAllFlows();
    setTimeout(() => {
      this.onSecondoryLangSelect();
    }, 1000);
  }
  
  //Getting UserProjects By theie Id
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
   
  //Getting All UserTemplates
  getAllTemplates() {
    this.spinner.show();
    this.templateScreenService.getAllTemplates(this.logId).subscribe(gepTemp => {
      console.log('gepTemp', gepTemp);
      this.spinner.hide();
      this.gepTemplates = gepTemp.body;
      this.gepTempImages = this.gepTemplates.template_image;
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });
  }
  //Getting All Flows by inputing LogId
  getAllFlows() {
    this.projectsService.getAllFlows(this.logId).subscribe((response) => {
      this.flowsArray = response.body;
    })
  }

  //Getting All ClonedProjects by their Id
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
    //Used to Cloned the Select Project
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
        this.cloned_data=data;
         var firstBody = this.cloned_data['body'];
         var addData = firstBody['body'];
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

    //Open the Popup Model Box
    openModal() {
      this.displayModel = 'block';
    }

    //Open the Template Model Box
    openTemplateModal() {
      this.displayTemplateModel = 'block';
    }

     //Open the Delete Model Box
    openDeleteModel(proj:any) {
    this.idToDelete = proj._id;
    this.delmodal = 'block';
  }

  //Getting All FormControls
  get form_control() { return this.createProject.controls; }

  //To Delete Project by their id
  deleteMyProjects() {
    this.projectsService.deleteProjectFlowByProjectId(this.idToDelete, this.logId).subscribe(data => {
      if (data) {
        this.delmodal = 'none';
        this.getProjectByUserId();
      }
    }, error => {
      this.logger.log('error',error);
    });
  }
  
  //To close the Model Popup box
  onCloseHandled() {
    this.delmodal = 'none';
    this.displayModel = 'none';
    this.displayTemplateModel = 'none';
    this.submitted = false;
    this.isProjectExit = false;
    this.invalidName = false;
    this.isReserveWord = false;
    this.createProject.clearValidators();
    this.createProject.reset();
    this.templateObj.app_ui_template = '';
    this.templateObj.app_ui_template_id = '';
    this.templateObj.app_ui_template_name = '';
  }

  //To close the Template Model Popup box
  closeTemplateModal() {
    this.displayTemplateModel = 'none';
  }

  //Get the Selected Template and Storing to Template details to Template Object
  onTemplateSelect(template:any) {
    this.templateObj = {
      app_ui_template: template.name,
      app_ui_template_id: template._id,
      app_ui_template_name: template.template_name
    };
    this.closeTemplateModal();
  }

  //To View the selected Template on window
  onPreviewClick(template:any) {
    if (template.name) {
      window.open(`assets/templates/${template.name.split(' ').join('-').toLowerCase()}/index.html`);
    }
  }

  //Assining Secondary Languages and calling in Change model in primary dropdown
  onSecondoryLangSelect() {
    this.secondoryLanguages = this.primaryLanguages;
    this.secondoryLanguages = this.secondoryLanguages.filter(item => item !== this.createProject.value.primaryLanguage)
  }

  editProject(project:any) {
    this.logger.log('log',project);
    this.dataService.setProjectInfo(project);
    this.templateScreenService.getTemplateByName(project.app_ui_template, this.logId).subscribe(data => {
      console.log('after get the project template ----  ', data);
      const response = data.body;
      localStorage.setItem('stylesheets', JSON.stringify(response['stylesheets']));
      localStorage.setItem('scripts', JSON.stringify(response['scripts']));
      localStorage.setItem('css_guidelines', JSON.stringify(response['css-guidelines']));
      localStorage.setItem('templateName', project.app_ui_template);

    }, error => {
      console.log('cannot able to template details');
    });
    this.router.navigate(['/project-component'], { queryParams: { projectId: project._id } });
  }

  //To Create New Project
  async projectCreate(){
    this.submitted = true;
        if (this.createProject.invalid) {
        return;
      }
    this.projectName = this.createProject.value.name.toLowerCase();
    this.validatorService.checkNamingConvention(this.projectName);
    this.validatorService.checkReserveWords(this.projectName);
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
    if (!this.createProject.value.secondaryLanguage) {
      this.createProject.value.secondaryLanguage = null;
    }
    const dataToSave = {
      name: this.createProject.value.name.toLowerCase(),
      description: this.createProject.value.description,
      default_module_id: null,
      default_module_label: null,
      notes: null,
      created_by: null,
      created_any: null,
      last_modified_by: null,
      last_modified_any: null,
      client_os_types: null,
      client_device_types: null,
      client_dev_languages: null,
      client_dev_frameworks: null,
      client_widget_frameworks: null,
      mobile_css_framework: null,
      desktop_css_framework: null,
      app_ui_template: this.templateObj.app_ui_template,
      app_ui_template_id: this.templateObj.app_ui_template_id,
      app_ui_template_name: this.templateObj.app_ui_template_name,
      app_ui_template_img: null,
      client_code_pattern: null,
      server_code_pattern: null,
      server_dev_lang: null,
      server_dev_framework: null,
      server_run_time: null,
      server_os: null,
      server_dbms: null,
      server_deployment_environment: null,
      global_extensions: null,
      ui_navigation_styles: null,
      supported_browsers: null,
      default_human_language: this.createProject.value.primaryLanguage,
      other_human_languages: this.createProject.value.secondaryLanguage,
      entity: null,
      enforce_documentation: null,
      widget_count: null,
      generation_type: null,
      authorization_type: null,
      authorizations: null,
      communication_protocal: null,
      stand_alone_app: null,
      application_type: null,
      lotus_notes_enabled: null,
      lotus_notes_cred_enabled: null,
      user_deployment_target: null,
      server_deployment_target: null,
      created_date: null,
      UserId: sessionStorage.getItem('Id'),
      logsid: this.logId
    };
    this.projectsService.getProjectByUserId(this.UserId, this.logId).subscribe(async (data) => {
      this.getProjectByUserId();
      this.getCloneProjectById();
      if (data) {
        this.myAllProjects = data.body;
        await this.myAllProjects.forEach((userProjects: { name: String; }) => {
          if (userProjects.name === this.projectName) {
            this.isProjectExit = true;
          }
        });
        if (!this.isProjectExit && !this.invalidName && !this.isReserveWord) {
          this.projectsService.addProject(dataToSave, this.logId).subscribe(response => {
            if (response) {
              const projectDetail = response.body;
              this.created_date = projectDetail.created_date;
              this.dataService.setProjectInfo(projectDetail);

              //create default entity api
              this.projectsService.createDefaultEntity(projectDetail._id, this.logId).subscribe(
                (defaultRes) => {
                  this.entitydetails = [];
                  this.defaultEntityInfo = defaultRes.body;
                  this.entitydetails = [
                    {
                      'entities':
                      {
                        'entityType': 'primary',
                        'entityId': this.defaultEntityInfo._id
                      },
                      'name': this.defaultEntityInfo.name,
                      'description': this.defaultEntityInfo.description,
                      'updated_date': Date.now()
                    }
                  ];
                  this.projectsService.createDefaultFeature(projectDetail._id, this.logId).subscribe(
                    async (defaultFeature) => {
                      this.defaultFeatureInfo = defaultFeature.body;
                      console.log('defaut feature data =======>>', this.defaultFeatureInfo);
                     let gpSefFlowArray = this.flowsArray.map(({_id,_v,...rest}:any)=>({ ...rest })).filter((flow:any) => flow.name === 'GpSEF');
                      let updateFlowInFeature = await this.saveManyProjectFlow(gpSefFlowArray);
                      let updateEntityinFeature = await this.updateInFeatureEntity();
                      let createSefScreen = await this.createSefScreen(projectDetail);
                    }, error => {
                      console.error('cannot able to create the default feature for this project ', error);
                    })
                }, (error) => {
                  console.error('cannot able to create the default entity for this project ', error);
                });
                     // create default screens
              this.projectsService.createDefaultScreens(projectDetail._id, this.logId).subscribe(
                (defaultscreen) => {
                  this.defaultscreenvalue = defaultscreen.response;
                }, (error) => {
                  console.error('cannot able to create the default screens for this project', error);
                });
                    // create default menus
              this.projectsService.createDefaultMenu(
                projectDetail._id,
                dataToSave.default_human_language,
                dataToSave.other_human_languages,
                this.logId
              ).subscribe(
                (defaultMenuResponse) => {
                }, (error) => {
                  console.error('cannot able to create the default menu for this project ', error);
                });
                  // Save user template
              this.projectsService.getGepTemplate(dataToSave.app_ui_template, this.logId).subscribe(data => {
                data.body.project_id = projectDetail._id;
                if (data && data.body) {
                  this.projectsService.addProjectTemplate(data.body, this.logId).subscribe(postRes => {
                  });
                }
              });
            }
            this.getProjectByUserId();
            this.getCloneProjectById();
          }, error => {
            console.error('cannot able to save the project', error);
          });
          this.onCloseHandled();
        }
      }
    }, error => {
      console.error('cannot able to get all the projects.', error);
    });
  }
  async saveManyProjectFlow(projectFlowList:any) { 
    return new Promise((resolve, reject) => {
      this.spinner.show();
    this.projectsService.saveManyProjectFlow(projectFlowList, this.logId).subscribe(
      async (response) => {
       
        if (response.body) {
          // get only the specific values
          this.flowDeatilsArray = response.body;
          this.spinner.hide();
          const projectFlowsId: any = response.body.map(({_id}: any) =>_id);
          console.log('projectFlowsId ===>>', projectFlowsId);
          this.defaultFeatureInfo.flows = this.defaultFeatureInfo.flows.concat(projectFlowsId);
          let updatefeature = await this.saveFlowsInFeature();
          resolve(updatefeature);
        }
      },
      error => {
        console.log('cannot able to save the many projectFlows');
      });
    })
  }
   saveFlowsInFeature() {
    return new Promise((resolve, reject) => {
      console.log('inside promise',this.defaultFeatureInfo);
      this.projectsService.updateFeature(this.defaultFeatureInfo, this.logId).subscribe(
        (response: any) => {
          console.log('save in flow --in feature -->>', response);
          resolve(response);
        },
        error => {console.log('error',error);
         });
    })
  }
  updateInFeatureEntity() {
    return new Promise((resolve, reject) => {
      this.projectsService.Updatefeaturedetailsentity(this.defaultFeatureInfo._id, this.entitydetails, this.logId).subscribe(data => {
        this.logger.log('log',data);
        resolve(data);
      })
    })
  }

  //Creating Sef Screens
  createSefScreen(projectDetail:any) {
    return new Promise(resolve => {
      let sefFlowData = this.flowDeatilsArray.filter((x:any) => x.name === 'GpSEF');
     // console.log('sefFlowData',sefFlowData);
      let data = {
        "htmlId" : "template-x2d",
        "componentId" : "c2189",
        "elementName" : "button_template-iowtv",
        "verb" : "",
        "event" : "onload",
        "flowName" : "GpSEF",
        "flow" : sefFlowData[0]._id
      }
      console.log('lo',data);
      
      this.projectsService.createSefScreens(projectDetail._id, this.defaultFeatureInfo._id, data, this.logId).subscribe(res => {
        this.logger.log('log',res);
        resolve(res);
      })
    })
  }
}
