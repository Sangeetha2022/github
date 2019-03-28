import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_services';
import { ConfigManagerService } from '../config-manager/config-manager.service';
import { DataService } from 'src/shared/data.service';
import { ProjectsService } from '../projects/projects.service';

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
    private projectService: ProjectsService) { }

  // connector: Connector = {
  //   id: '',
  //   name: '',
  //   description: '',
  //   url: '',
  //   properties: []
  // }

  // connectorForm: FormGroup;
  // properties: FormArray;
  // private fieldArray: Array<any> = [];
  // showModal: String = 'none';
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

  ngOnInit() {
    this.getProject();
    this.getTechProperties();
  }

  getProject() {
    this.dataService.currentProjectInfo.subscribe(
      data => {
        this.projectInfo = data;
      });
  }

  updateProject() {
    if (this.projectInfo !== null) {
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
            this.dataService.setProjectInfo(data);
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

  getTechProperties() {
    this.configManagerService.getTechProperties().subscribe(
      data => {
        data.forEach(element => {
          switch (element['type']) {
            case 'GpClientLanguage':
              this.technical.clientLanguage.push(element);
              if (this.projectInfo.clientlanguage !== null) {
                if (element['_id'] === this.projectInfo.clientlanguage) {
                  this.selected.clientLanguage = element;
                }
              } else if (element['label'] === 'Javascript') {
                this.selected.clientLanguage = element;
              }
              break;
            case 'GpClientDevFramework':
              this.technical.clientFramework.push(element);
              if (this.projectInfo.clientframework !== null) {
                if (element['_id'] === this.projectInfo.clientframework) {
                  this.selected.clientFramework = element;
                }
              } else if (element['label'] === 'Angular 7') {
                this.selected.clientFramework = element;
              }
              break;
            case 'GpServerLanguage':
              this.technical.serverLanguage.push(element);
              if (this.projectInfo.serverlanguage !== null) {
                if (element['_id'] === this.projectInfo.serverlanguage) {
                  this.selected.serverLanguage = element;
                }
              } else if (element['label'] === 'NodeJS') {
                this.selected.serverLanguage = element;
              }
              break;
            case 'GpServerDevFramework':
              this.technical.serverFramework.push(element);
              if (this.projectInfo.serverframework !== null) {
                if (element['_id'] === this.projectInfo.serverframework) {
                  this.selected.serverFramework = element;
                }
              } else if (element['label'] === 'Express') {
                this.selected.serverFramework = element;
              }
              break;
            case 'GpServerDBMS':
              this.technical.database.push(element);
              if (this.projectInfo.serverdatabase !== null) {
                if (element['_id'] === this.projectInfo.serverdatabase) {
                  this.selected.database = element;
                }
              } else if (element['label'] === 'MongoDB') {
                this.selected.database = element;
              }
              break;
            case 'GpUserDeploymentTarget':
              this.technical.deploymentTarget.push(element);
              if (this.projectInfo.servertarget !== null) {
                if (element['_id'] === this.projectInfo.servertarget) {
                  this.selected.deploymentTarget = element;
                }
              } else if (element['label'] === 'Live') {
                this.selected.deploymentTarget = element;
              }
              break;
            case 'GpUserDeploymentServer':
              this.technical.deploymentServer.push(element);
              if (this.projectInfo.server_deployment_type !== null) {
                if (element['_id'] === this.projectInfo.server_deployment_type) {
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

  // openModal = (id: string) => {
  //   this.modalService.open(id);
  // }

  // closeModal = (id: string) => {
  //   this.modalService.close(id);
  // }

  // addProperties(): void {
  //   this.properties = this.connectorForm.get('properties') as FormArray;
  //   this.properties.push(this.createProp());
  // }

  // generateForm() {
  //   this.connectorForm = this.formBuilder.group({
  //     name: '',
  //     description: '',
  //     url: '',
  //     properties: this.formBuilder.array([this.createProp()])
  //   })
  // }

  // createProp(): FormGroup {
  //   return this.formBuilder.group({
  //     key: '',
  //     value: ''
  //   });
  // }

}
