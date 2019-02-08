import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Injectable } from '@angular/core';
import { AppComponentService } from '../app.component.service';
import { ProjectsService } from '../projects/projects.service';
import { project } from '../projects/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
@Injectable()
export class ProjectsComponent implements OnInit {

  displayModel: String = 'none';
  delmodal: String = 'none';
  idToDelete: String = null;
  createProject: FormGroup;
  languages: string[] = ['English', 'Tamil', 'Spanish'];
  submitted = false;
  myAllProjects: Array<Object> = [];

  constructor(private formBuilder: FormBuilder, private data: AppComponentService, private projectsService: ProjectsService) { }

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
  }
  openModal() {
    this.displayModel = 'block';
  }
  onCloseHandled() {
    this.displayModel = 'none';
    this.submitted = false;
    this.createProject.clearValidators();
    this.createProject.reset();
  }

  get form_control() { return this.createProject.controls; }

  getAllMyProjects() {
    this.projectsService.getMyAllProjects().subscribe(data => {
      this.myAllProjects = data;
      console.log('data', this.myAllProjects);
    }, error => {
      console.log('Check the browser console to see more info.', 'Error!');
    });
  }
  openDeleteModel(proj) {
    this.idToDelete = proj._id;
    this.delmodal = 'block'
  }

  deleteMyProjects() {
    this.projectsService.deleteProject(this.idToDelete).subscribe(data => {
      console.log("data", data);
      this.delmodal = 'none'
    }, error => {
      console.log('Check the browser console to see more info.', 'Error!');
    });
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

}
