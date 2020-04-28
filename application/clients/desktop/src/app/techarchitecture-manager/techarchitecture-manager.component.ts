import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_services';
import { ConfigManagerService } from '../config-manager/config-manager.service';
import { DataService } from 'src/shared/data.service';
import { ProjectsService } from '../projects/projects.service';
import { ProjectComponentService } from '../project-component/project-component.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-techarchitecture-manager',
  templateUrl: './techarchitecture-manager.component.html',
  styleUrls: ['./techarchitecture-manager.component.scss']
})

export class ConnectorManagerComponent implements OnInit {
  selected: any = {
    clientLanguage: {},
    clientFramework: {},
    serverLanguage: {},
    serverFramework: {},
    database: {},
    deploymentTarget: {},
    deploymentServer: {}
  };
  constructor(private modalService: ModalService,
    private configManagerService: ConfigManagerService,
    private dataService: DataService,
    private projectService: ProjectsService,
    private projectComponentService: ProjectComponentService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  clientLanguage: String;
  technical: any = {
    clientLanguage: [],
    clientFramework: [],
    serverLanguage: [],

    serverFramework: [],
    database: [],
    deploymentTarget: [],
    deploymentServer: []
  };
  projectInfo: any;
  projectId: String;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.projectId = params.projectId;
    });
    this.getProjectById();
  }

  getProjectById() {
    this.projectService.getProjectById(this.projectId).subscribe(
      response => {
        this.projectInfo = response.body;
        this.getTechProperties();
      },
      error => {
        console.error('cannot able to get the project by its Id ', error);
      }
    );
  }

  updateProject() {
    if (this.projectInfo) {
      this.projectInfo.clientlanguage = this.selected.clientLanguage._id;
      this.projectInfo.clientframework = this.selected.clientFramework._id;
      this.projectInfo.serverlanguage = this.selected.serverLanguage._id;
      this.projectInfo.serverframework = this.selected.serverFramework._id;
      this.projectInfo.serverdatabase = this.selected.database._id;
      this.projectInfo.servertarget = this.selected.deploymentTarget._id;
      this.projectInfo.server_deployment_type = this.selected.deploymentServer._id;
      this.projectService.updateProjectById(this.projectInfo._id, this.projectInfo)
        .subscribe(
          data => {
            this.dataService.setProjectInfo(data.body.response);
          },
          error => {

          });
    }
  }

  compareById(obj1, obj2) {
    return obj1._id === obj2._id;
  }

  onChange(event) {
    this.updateProject();
  }

  updateProjectProperties() {

  }

  generateField() {
    this.projectComponentService.exportSharedServiceYaml(this.projectId).subscribe(data => {
      console.log("export---->", data);
      this.toastr.success('PROJECT:','Exported successfully!', {
        closeButton: true,
        disableTimeOut: false,
        timeOut: 2000
      });
    })

  }

  getTechProperties() {
    this.configManagerService.getTechProperties().subscribe(
      data => {
        data.body.forEach(element => {
          switch (element['type']) {
            case 'GpClientLanguage':
              this.technical.clientLanguage.push(element);
              if (this.projectInfo && this.projectInfo.clientlanguage) {
                if (element['_id'] === this.projectInfo.clientlanguage._id) {
                  this.selected.clientLanguage = element;
                }
              } else if (element['label'] === 'Javascript') {
                this.selected.clientLanguage = element;
              }
              break;
            case 'GpClientDevFramework':
              this.technical.clientFramework.push(element);
              if (this.projectInfo && this.projectInfo.clientframework) {
                if (element['_id'] === this.projectInfo.clientframework._id) {
                  this.selected.clientFramework = element;
                }
              } else if (element['label'] === 'Angular 7') {
                this.selected.clientFramework = element;
              }
              break;
            case 'GpServerLanguage':
              this.technical.serverLanguage.push(element);
              if (this.projectInfo && this.projectInfo.serverlanguage) {
                if (element['_id'] === this.projectInfo.serverlanguage._id) {
                  this.selected.serverLanguage = element;
                }
              } else if (element['label'] === 'NodeJS') {
                this.selected.serverLanguage = element;
              }
              break;
            case 'GpServerDevFramework':
              this.technical.serverFramework.push(element);
              if (this.projectInfo && this.projectInfo.serverframework) {
                if (element['_id'] === this.projectInfo.serverframework._id) {
                  this.selected.serverFramework = element;
                }
              } else if (element['label'] === 'Express') {
                this.selected.serverFramework = element;
              }
              break;
            case 'GpServerDBMS':
              this.technical.database.push(element);
              if (this.projectInfo && this.projectInfo.serverdatabase) {
                if (element['_id'] === this.projectInfo.serverdatabase._id) {
                  this.selected.database = element;
                }
              } else if (element['label'] === 'MongoDB') {
                this.selected.database = element;
              }
              break;
            case 'GpUserDeploymentTarget':
              this.technical.deploymentTarget.push(element);
              if (this.projectInfo && this.projectInfo.servertarget) {
                if (element['_id'] === this.projectInfo.servertarget._id) {
                  this.selected.deploymentTarget = element;
                }
              } else if (element['label'] === 'Live') {
                this.selected.deploymentTarget = element;
              }
              break;
            case 'GpUserDeploymentServer':
              this.technical.deploymentServer.push(element);
              if (this.projectInfo && this.projectInfo.server_deployment_type) {
                if (element['_id'] === this.projectInfo.server_deployment_type._id) {
                  this.selected.deploymentServer = element;
                }
              } else if (element['label'] === 'AWS') {
                this.selected.deploymentServer = element;
              }
              break;
            default:
              break;
          }
        });
        this.updateProject();
      },
      error => {

      });
  }
}
