import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Injectable } from '@angular/core';
import { AppComponentService } from '../app.component.service';
import { ProjectsService } from '../projects/projects.service';
import { DataService } from '../../shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectComponentService } from '../project-component/project-component.service';
import { TemplateScreenService } from '../template-screen/template-screen.service';
import { ScreenDesignerService } from '../screen-designer/screen-designer.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

@Injectable()
export class ProjectsComponent implements OnInit {
  displayModel: String = 'none';
  delmodal: String = 'none';
  displayGenratorModel: String = 'none';
  idToDelete: String = null;
  createProject: FormGroup;
  secondoryLanguages: string[] = ['English', 'Tamil', 'Spanish'];
  primaryLanguages: string[] = ['English', 'Tamil', 'Spanish'];
  submitted = false;
  myAllProjects: any = [];
  createdProject: any = [];
  genNotifyArr: any = [];
  userNotifyArr: any = [];
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
  public tokens: any;
  public codes: any;
  public scopes: any;
  public states: any;
  public lang: any;
  gepTemplates: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private data: AppComponentService,
    private projectsService: ProjectsService,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private templateScreenService: TemplateScreenService,
    private route: ActivatedRoute,
    private screenDesignerService: ScreenDesignerService,
    private entityManagerService: ProjectComponentService,
  ) {    
     }

  ngOnInit() {
    this.UserId = sessionStorage.getItem('Id');
    this.getAllMyProjects();
    this.getAllGepTemplates();
    this.createProject = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      primaryLanguage: ['', Validators.required],
      secondaryLanguage: [''],
      template: [''],
    });

    this.lang = navigator.language;
if (this.lang.includes("ta")) {
console.log("tamil")
this.lang = "Tamil"
this.createProject.controls['primaryLanguage'].setValue(this.lang, {onlySelf: true});
} else if (this.lang.includes("en")) {
  this.lang = "English"
  this.createProject.controls['primaryLanguage'].setValue(this.lang, {onlySelf: true});
  console.log("eng")
} else if (this.lang.includes("es")) {
  this.lang = "Spanish"
  this.createProject.controls['primaryLanguage'].setValue(this.lang, {onlySelf: true});
  console.log("span")
} else {
  this.lang = "English"
  this.createProject.controls['primaryLanguage'].setValue(this.lang, {onlySelf: true});
}
    // socket
    // this.initSocket();
    // this.onEvent();

    const user_id = '123';

    if (!sessionStorage.getItem('onNotify')) {
      this.getAllUserNotify(user_id);
      sessionStorage.setItem('onNotify', 'off');
    }

    // this.Queryparams();
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

    this.projectsService.landingpage(this.params).subscribe(data => {
      this.tokens = data.body;
      sessionStorage.setItem('Tokens', JSON.stringify(this.tokens));
    }, error => {
      console.error('error:', error);
    });

  }

  openModal() {
    this.displayModel = 'block';
  }
  onCloseHandled() {
    this.displayModel = 'none';
    this.delmodal = 'none';
    this.submitted = false;
    this.createProject.clearValidators();
    this.createProject.reset();
  }
  openGeneratorModal() {
    this.displayGenratorModel = 'block';
  }

  onCloseHandledGen() {
    this.displayGenratorModel = 'none';
  }
  get form_control() { return this.createProject.controls; }

  getAllMyProjects() {
    this.myAllProjects = [];
    this.projectsService.getMyAllProjects(this.UserId).subscribe(data => {
      if (data) {
        this.myAllProjects = data;
      }
      console.log('--------myprojects----', this.myAllProjects);
    }, error => {
      console.log('Check the browser console to see more info.', 'Error!');
    });
  }

  openDeleteModel(proj) {
    this.idToDelete = proj._id;
    this.delmodal = 'block';
  }

  deleteMyProjects() {
    this.projectsService.deleteProject(this.idToDelete).subscribe(data => {
      console.log('data', data);
      this.delmodal = 'none';
      this.getAllMyProjects();
    }, error => {
      console.log('Check the browser console to see more info.', 'Error!');
    });
  }

  editProject(project) {
    console.log('edit project are --------- ', project);
    this.dataService.setProjectInfo(project);
    this.router.navigate(['/project-component'], { queryParams: { projectId: project._id } });
  }

  projectCreate() {
    this.submitted = true;
    if (this.createProject.invalid) {
      return;
    }
    const dataToSave = {
      name: this.createProject.value.name,
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
      app_ui_template: this.createProject.value.template.name,
      app_ui_template_img: this.createProject.value.template.template_image[0].image,
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
      UserId: sessionStorage.getItem('Id')
    };
    const templateDetailsToSave = {
      'gjs-assets': this.createProject.value.template['gjs-assets'],
      'gjs-css': this.createProject.value.template['gjs-css'],
      'gjs-styles': this.createProject.value.template['gjs-styles'],
      'gjs-html': this.createProject.value.template['gjs-html'],
      'gjs-components': this.createProject.value.template['gjs-components'],
      screenName: this.createProject.value.template.name,
      project: '',
      isTemplate: true,
    };

    this.projectsService.addProject(dataToSave).subscribe(data => {
      if (data) {
        templateDetailsToSave.project = data._id;
        this.created_date = data.created_date;
        this.screenDesignerService.saveScreen(templateDetailsToSave).subscribe(screenData => {
        });
        this.dataService.setProjectInfo(data);
        this.projectsService.createProjectDefaults(data._id).subscribe(
          (defaultRes) => {
          }, (error) => { });
        // this.defaultEntity.user_id = "12345"
        // this.defaultEntity.user_name = "david",
        // this.defaultEntity.project_id = data._id;
        // this.defaultEntity.project_name = data.name;
        // this.defaultEntity.project_description = data.description;

        // console.log("i am the entity u want",this.defaultEntity)
        // this.entityManagerService.addDefaultEntity(this.defaultEntity).subscribe(data=>{
        //   this.dataService.setDefaultEntityInfo(data)
        // }),(error)=>{
        //   console.log(error);
        // }

      }
      this.getAllMyProjects();
    }, error => {
      console.log('Check the browser console to see more info.', 'Error!');
    });
    this.onCloseHandled();
  }

  // generation
  generateProject(project) {
    console.log('project-------->', project);
    // this.displayGenratorModel = 'block';

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



    this.projectsService.generateProject(projectgen).subscribe(data => {
      console.log('data', data);

      // this.getAllMyProjects();
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
      console.log('Check the browser console to see more info.', 'Error!');
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

      this.genNotifyArr.push(data);
      let currentNotify: any;
      currentNotify = data;
      if (currentNotify.project_id !== undefined) {
        if (currentNotify.status !== 'gen_requested') {

          this.toastr.success('PROJECT : ' + currentNotify.project_name +
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
        console.log('Check the browser console to see more info.', 'Error!');
      });

  }

  getAllNotifyByProject(project_id) {
    this.projectsService.getAllNotifyProject(project_id).subscribe(data => {
      this.genNotifyArr = data;
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });

  }


  getAllGepTemplates() {
    this.templateScreenService.getAllTemplates().subscribe(gepTemp => {
      this.gepTemplates = gepTemp;
      this.gepTempImages = this.gepTemplates.template_image;
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });
  }
  getAllUserNotify(user_id) {

    this.projectsService.getAllUserNotify(user_id).subscribe(data => {
      this.userNotifyArr = data;
      console.log('userNotifydata:', data);
      if (this.userNotifyArr.length !== 0) {
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
