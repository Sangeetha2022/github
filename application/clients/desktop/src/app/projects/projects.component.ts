import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Injectable } from '@angular/core';
import { AppComponentService } from '../app.component.service';
import { ProjectsService } from '../projects/projects.service';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

@Injectable()
export class ProjectsComponent implements OnInit {
  displayModel: String = 'none';
  delmodal: String = 'none';
  displayGenratorModel: String = 'none'
  idToDelete: String = null;
  createProject: FormGroup;
  languages: string[] = ['English', 'Tamil', 'Spanish'];
  submitted = false;
  myAllProjects: any = [];

  genNotifyArr: any = [];

  userNotifyArr: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private data: AppComponentService,
    private projectsService: ProjectsService,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllMyProjects();
    this.createProject = this.formBuilder.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      appContext: '',
      description: '',
      primaryLanguage: ['', Validators.required],
      secondaryLanguage: [''],
    });

    //socket
    this.initSocket();
    this.onEvent();
    let user_id = "123"
    if(!sessionStorage.getItem('onNotify')){
    this.getAllUserNotify(user_id);
    sessionStorage.setItem('onNotify','off')
    }
   
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

  onCloseHandledGen(){
    this.displayGenratorModel = 'none';
  }
  get form_control() { return this.createProject.controls; }

  getAllMyProjects() {
    this.projectsService.getMyAllProjects().subscribe(data => {
      this.myAllProjects = data;
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
    this.router.navigate(['/entity']);
  }

  projectCreate() {
    this.submitted = true;
    if (this.createProject.invalid) {
      return;
    }
    const dataToSave = {
      name: this.createProject.value.name,
      label: this.createProject.value.label,
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
      app_ui_template: null,
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
      extra_project_info: this.createProject.value.appContext,
      lotus_notes_cred_enabled: null,
      user_deployment_target: null,
      server_deployment_target: null,
    };

    this.projectsService.addProject(dataToSave).subscribe(data => {
      console.log('data', data);
      this.getAllMyProjects();
    }, error => {
      console.log('Check the browser console to see more info.', 'Error!');
    });
    this.onCloseHandled();
    this.getAllMyProjects();
  }



  //generation
  generateProject(project) {
    console.log("project-------->", project);
    //this.displayGenratorModel = 'block';

    const projectgen = {
      project_id: project._id,
      project_name: project.name,
      user_id: "123",
      user_name: "tharani",
      status: "gen_requested",
      status_message: "generation requested",
      stack_trace: "gen_processing",
      claimed: "t",
      parent_gen_id: "0"
    }
    

    this.projectsService.generateProject(projectgen).subscribe(data => {
      console.log('data', data);
      //this.getAllMyProjects();
      this.getProjectNotify(projectgen.project_id)
      this.toastr.success('project: '+projectgen.project_name, 'generation requested!', {
        closeButton:true,
        disableTimeOut:true
      });
    }, error => {
      this.toastr.error("Failed!", 'Operation', {
        closeButton:true,
        disableTimeOut:true
      });
      console.log('Check the browser console to see more info.', 'Error!');
    });
  }

  //socket 
  initSocket() {
    this.projectsService.initSocket();
  }

  onEvent() {
    this.projectsService.onEvent("connect");
  }

  disconnect() {
    this.projectsService.onEvent("disconnect")
  }

  //socket get notify
  getProjectNotify(project_id) {
    this.projectsService.getProjectNotify(project_id).subscribe(data => {
      console.log("socket data---->", data)
      this.genNotifyArr.push(data);
      let currentNotify :any;
      currentNotify = data;
      if (currentNotify.project_id!==undefined) {
        this.toastr.success('project: '+currentNotify.project_name, currentNotify.status_message, {
          closeButton:true,
          disableTimeOut:true
        });
      }
    },
      error => {
        this.toastr.error('Failed', 'Operation!', {
          closeButton:true,
          disableTimeOut:true
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

  getAllUserNotify(user_id){
    this.projectsService.getAllUserNotify(user_id).subscribe(data => {
      this.userNotifyArr = data;
      console.log('userNotifydata:', data);
      if (this.userNotifyArr.length !== 0) {
        this.toastr.info('project: '+this.userNotifyArr[this.userNotifyArr.length-1].project_name, this.userNotifyArr[this.userNotifyArr.length-1].status_message, {
          closeButton:true,
          disableTimeOut:true
        });
        this.getProjectNotify(this.userNotifyArr[this.userNotifyArr.length-1].project_id)
      }
    },
      error => {
        console.log('Check the browser console to see more info.', 'Error!');
      });
  }

}
