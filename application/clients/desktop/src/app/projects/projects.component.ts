import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { AppComponentService } from '../app.component.service';
import { ProjectsService } from '../projects/projects.service';
import { DataService } from '../../shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TemplateScreenService } from '../template-screen/template-screen.service';
import { ScreenDesignerService } from '../screen-designer/screen-designer.service';
import { ValidatorService } from 'src/shared/validator.service';
import { FileUploader } from 'ng2-file-upload';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';
import { ReturnStatement } from '@angular/compiler';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

@Injectable()
export class ProjectsComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  displayModel: String = 'none';
  displayTemplateModel: String = 'none';
  displayImportModel: String = 'none';
  fileToUpload: File = null;
  delmodal: String = 'none';
  displayGenratorModel: String = 'none';
  idToDelete: String = null;
  createProject: FormGroup;
  secondoryLanguages: string[] = ['English', 'Tamil', 'Spanish'];
  primaryLanguages: string[] = ['English', 'Tamil', 'Spanish'];
  submitted = false;
  myAllProjects: any = [];
  cloneAllProjects: any = [];
  createdProject: any = [];
  genNotifyArr: any = [];
  userNotifyArr: any = [];
  public flowDeatilsArray: any = [];
  public UserId: any;
  public defaultEntity: any = {
    project_name: '',
    project_description: '',
    project_id: '',
    user_id: '',
    user_name: '',
  };
  created_date: String;
  gepTempImages: any = [];
  public params = {
    code: '',
    scope: '',
    state: ''
  };
  public currentName: String;
  public tokens: any;
  public codes: any;
  public scopes: any;
  public states: any;
  public invalidName: Boolean;
  public lang: any;
  public isProjectExit: Boolean = false;
  public isReserveWord: Boolean;
  public projectName: String = '';
  public defaultscreenvalue: any;
  gepTemplates: any = [];
  public logId = sessionStorage.getItem('LogId');
  public flowsArray;
  public defaultFeatureInfo: any;
  public entitydetails: { 'entities': { 'entityType': any; 'entityId': any; }; 'name': any; 'description': any; 'updated_date': number; }[];
  public defaultEntityInfo: any;
  templateData: any;
  public uploader: FileUploader = new FileUploader({
    url: '',
  });
  templateObj: {
    app_ui_template: '',
    app_ui_template_id: '',
    app_ui_template_name: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private data: AppComponentService,
    private projectsService: ProjectsService,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private validatorService: ValidatorService,
    private templateScreenService: TemplateScreenService,
    private route: ActivatedRoute,
    private screenDesignerService: ScreenDesignerService,
    private restapi: SharedService,
    private spinner: NgxSpinnerService

  ) {
  }

  ngOnInit() {
    this.UserId = sessionStorage.getItem('Id');
    this.getProjectByUserId();
    this.getCloneProjectById();
    this.getAllTemplates();
    this.getAllFlows();
    this.getTemplateParser();
    this.createProject = this.formBuilder.group({
      // const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern('')
      ])],
      description: '',
      primaryLanguage: ['', Validators.required],
      secondaryLanguage: [''],
      template: [''],
    });

    this.createProject.get('name').valueChanges.subscribe(name => {
      this.currentName = name;
      if (this.currentName && this.currentName.length <= 0) {
        this.invalidName = false;
        this.isProjectExit = false;
        this.isReserveWord = false;
      }
    });

    this.lang = navigator.language;
    if (this.lang.includes('ta')) {
      console.log('tamil');
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

    // socket
    // this.initSocket();
    // this.onEvent();

    const user_id = '123';

    if (!sessionStorage.getItem('onNotify')) {
      // this.getAllUserNotify(user_id);
      sessionStorage.setItem('onNotify', 'off');
    }
    let UserId = sessionStorage.getItem('Id');

    this.uploader.onBeforeUploadItem = (item) => {
      item.url = `${this.restapi.sharedserviceapi}${Constants.sharedAppImport}/${UserId}`
    }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('FileUpload: uploaded successfully:',item,status,response);
      this.getProjectByUserId();
      this.getCloneProjectById();
      this.closeImportModal();
    }
    setTimeout(() => {
      this.onSecondoryLangSelect();
    }, 1000);
  }

  Queryparams() {
    this.route.queryParams.subscribe(params => {
      this.codes = params['code'];
      this.scopes = params['scope'];
      this.states = params['state'];
    });

    this.params.code = this.codes;
    this.params.scope = this.scopes;
    this.params.state = this.states;

  }

  getAllFlows() {
    this.projectsService.getAllFlows(this.logId).subscribe((response) => {
      this.flowsArray = response.body;
    })
  }

  openModal() {
    this.displayModel = 'block';
  }
  openTemplateModal() {
    this.displayTemplateModel = 'block';
  }
  closeTemplateModal() {
    this.displayTemplateModel = 'none';
  }
  openImportModal() {
    this.displayImportModel = 'block';
  }
  closeImportModal() {
    this.displayImportModel = 'none';
    this.myInputVariable.nativeElement.value = "";
  }
  onTemplateSelect(template) {
    this.templateObj = {
      app_ui_template: template.name,
      app_ui_template_id: template._id,
      app_ui_template_name: template.template_name
    };
    this.closeTemplateModal();
  }
  onPreviewClick(template) {
    if (template.name) {
      window.open(`assets/templates/${template.name.split(' ').join('-').toLowerCase()}/index.html`);
    }
  }
  // importProject() {
  //   this.projectsService.importSharedServiceYaml(this.fileToUpload,this.UserId).subscribe(data => {
  //     console.log("import---->", data);
  //   })
  //   this.toastr.success('PROJECT: ', 'Project Imported', {
  //     closeButton: true,
  //     disableTimeOut: false,
  //     timeOut: 2000
  //   });
  //   // this.getProjectByUserId();
  //   this.displayImportModel = 'none';
  //   this.getProjectByUserId();
  // }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log('fileToUpload---->', this.fileToUpload);
  }
  onCloseHandled() {
    this.displayModel = 'none';
    this.delmodal = 'none';
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
  openGeneratorModal() {
    this.displayGenratorModel = 'block';
  }

  onCloseHandledGen() {
    this.displayGenratorModel = 'none';
  }
  get form_control() { return this.createProject.controls; }

  getProjectByUserId() {
    this.spinner.show();
    this.myAllProjects = [];
    this.projectsService.getProjectByUserId(this.UserId, this.logId).subscribe(data => {
      if (data) {
        this.spinner.hide();
        this.myAllProjects = data.body;
      }
    }, error => {
      console.log('Check the browser console to see more info.', 'Error!');
    });
  }

  getCloneProjectById() {
    this.spinner.show();
    this.cloneAllProjects = [];
    this.projectsService.getProjectByAll(this.UserId, this.logId).subscribe(async data => {
      if (data) {
        this.spinner.hide();
        let sampleData = data.body.filter((global) => global.shared_visibility === 'Global');
        this.cloneAllProjects = sampleData;
      }
    }, error => {
      console.log('Check the browser console to see more info.', 'Error!');
    });

  }

  // nameOnChnage(event) {
  //   this.createProject.get('name').valueChanges.subscribe(values => {
  //     console.log(values);
  //   });
  // }

  openDeleteModel(proj) {
    this.idToDelete = proj._id;
    this.delmodal = 'block';
  }

  deleteMyProjects() {
    this.projectsService.deleteProjectFlowByProjectId(this.idToDelete, this.logId).subscribe(data => {
      if (data) {
        this.delmodal = 'none';
        this.getProjectByUserId();
      }
    }, error => {
      console.log('Check the browser console to see more info.', 'Error!');
    });
  }

  editProject(project) {
    console.log('edit project are --------- ', project);
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

  onSecondoryLangSelect() {

    this.secondoryLanguages = this.primaryLanguages;
    this.secondoryLanguages = this.secondoryLanguages.filter(item => item !== this.createProject.value.primaryLanguage)

  }


  async projectCreate() {
    this.isProjectExit = false;
    this.invalidName = false;

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
      // app_ui_template: this.createProject.value.template.name,
      // app_ui_template_id: this.createProject.value.template._id,
      // app_ui_template_name: this.createProject.value.template.template_name,
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
        await this.myAllProjects.forEach(userProjects => {
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
              // create default entity
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
                      // this.defaultFeatureInfo.entities = this.defaultFeatureInfo.entities.concat(this.entitydetails);
                      let gpSefFlowArray = this.flowsArray.map(({ _id, _v, ...rest }) => ({ ...rest })).filter(flow => flow.name === 'GpSEF');
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
              // default feature (System Entry Feature)
              // this.projectsService.createDefaultFeature(projectDetail._id, this.logId).subscribe(
              //   (defaultFeature) => {
              //   }, error => {
              //     console.error('cannot able to create the default feature for this project ', error);
              //   })
              // create default menus
              console.log('create project values are ------- ', dataToSave);
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

  updateInFeatureEntity() {
    return new Promise((resolve, reject) => {
      this.projectsService.Updatefeaturedetailsentity(this.defaultFeatureInfo._id, this.entitydetails, this.logId).subscribe(data => {
        console.log(data);
        resolve(data);
      })
    })
    
  }

  createSefScreen(projectDetail) {
    return new Promise(resolve => {
      let sefFlowData = this.flowDeatilsArray.filter((x) => x.name === 'GpSEF');
      let data = {
        "htmlId" : "template-x2d",
        "componentId" : "c2189",
        "elementName" : "button_template-iowtv",
        "verb" : "",
        "event" : "onload",
        "flowName" : "GpSEF",
        "flow" : sefFlowData[0]._id
      }
      this.projectsService.createSefScreens(projectDetail._id, this.defaultFeatureInfo._id, data, this.logId).subscribe(res => {
        console.log('res ============>>>', res);
        resolve(res);
      })
    })
  }

  async saveManyProjectFlow(projectFlowList) {
    return new Promise((resolve, reject) => {
      this.spinner.show();
    this.projectsService.saveManyProjectFlow(projectFlowList, this.logId).subscribe(
      async (response) => {
        if (response.body) {
          // get only the specific values
          this.flowDeatilsArray = response.body;
          this.spinner.hide();
          const projectFlowsId = response.body.map(({ _id }) => _id);
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
      this.projectsService.updateFeature(this.defaultFeatureInfo, this.logId).subscribe(
        response => {
          console.log('save in flow --in feature -->>', response);
          resolve(response);
        },
        error => { });
    })
  }

  // generation
  generateProject(project) {
    const projectgen = {
      project_id: project._id,
      project_name: project.name,

      user_id: '123',
      user_name: 'tharani',

      status: 'gen_requested',
      status_message: 'generation requested',
      stack_trace: 'gen_processing',
      claimed: 't',
      parent_gen_id: '0'

    };
    this.projectsService.generateProject(projectgen, this.logId).subscribe(data => {
      console.log('data', data);

      // this.getProjectByUserId();
      this.getProjectNotify(projectgen.project_id);

      this.toastr.success('PROJECT: ' + projectgen.project_name, 'Generation Requested!', {
        closeButton: true,
        disableTimeOut: true
      });
    }, error => {
      this.toastr.error('Failed!', 'Operation', {
        closeButton: true,
        disableTimeOut: true
      });
    });
  }

  //cloneProject
  async cloneProject(project) {
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
      var firstBody = data['body'];
      var addData = firstBody['body'];

      console.log('projectid', firstBody);

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
  // socket
  initSocket() {
    this.projectsService.initSocket();
  }

  onEvent() {
    this.projectsService.onEvent('connect');
  }

  disconnect() {

    this.projectsService.onEvent('disconnect');

  }

  // socket get notify
  getProjectNotify(project_id) {
    this.projectsService.getProjectNotify(project_id).subscribe(data => {

      console.log('socket data---->', data);

      this.genNotifyArr.push(data.body);
      let currentNotify: any;
      currentNotify = data.body;
      if (currentNotify.project_id !== undefined) {
        if (currentNotify.status !== 'gen_requested') {

          this.toastr.success('PROJECT : ' + currentNotify.project_unique_id +
            ', STATUS : ' + currentNotify.status_message + '', 'Generation Notification!', {
            closeButton: true,
            disableTimeOut: true
          });

        }
      }
    },
      error => {
        this.toastr.error('Failed', 'Operation!', {
          closeButton: true,
          disableTimeOut: true
        });
      });

  }

  getAllNotifyByProject(project_id) {
    this.projectsService.getAllNotifyProject(project_id, this.logId).subscribe(data => {
      this.genNotifyArr = data.body;
    },
      error => {
        console.log('cannot able to get all the notification for this project ', error);
      });

  }


  getAllTemplates() {
    this.spinner.show();
    this.templateScreenService.getAllTemplates(this.logId).subscribe(gepTemp => {
      this.spinner.hide();
      this.gepTemplates = gepTemp.body;
      this.gepTempImages = this.gepTemplates.template_image;
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });
  }

  getTemplateParser() {
    this.spinner.show();
    this.templateScreenService.getTemplateParser(this.logId).subscribe(response => {
      this.spinner.hide();
      console.log('getTemplate parser response in project are --- ', response);
      // this.gepTemplates = gepTemp.body;
      // this.gepTempImages = this.gepTemplates.template_image;
      if (response) {
        localStorage.setItem('templateparser', JSON.stringify(response.body));
      }
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });
  }


  getAllUserNotify(user_id) {

    this.projectsService.getAllUserNotify(user_id, this.logId).subscribe(data => {
      this.userNotifyArr = data.body;
      console.log('userNotifydata:', data);
      if (this.userNotifyArr && this.userNotifyArr.length !== 0) {
        this.toastr.info('PROJECT : ' + this.userNotifyArr[this.userNotifyArr.length - 1].project_name
          + ', STATUS : ' + this.userNotifyArr[this.userNotifyArr.length - 1].status_message,
          'Generation Notification!', {
          closeButton: true,
          disableTimeOut: true
        });

        this.getProjectNotify(this.userNotifyArr[this.userNotifyArr.length - 1].project_id);

      }
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });
  }

}
