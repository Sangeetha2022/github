import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/shared/data.service';
import { LoggingService } from '../config/logging.service';
import { ProjectService } from '../project/project.service';
import { IMenu } from './interface/Menu';
import { MenuBuilderService } from '../menu-builder/menu-builder.service';
import { TreeDragService } from '../menu-builder/tree-drag/tree-drag.service';
import { ScreenDesignerService } from '../screen-designer/screen-designer.service';
import { ProjectComponentService } from './project-component.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ValidatorService } from 'src/shared/validator.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ProjentitypopUpComponent } from './projentitypop-up/projentitypop-up.component';
import { PEntity } from '../project-component/interface/Entity';
import { DeletefeatpopupComponent } from './deletefeatpopup/deletefeatpopup.component';


@Component
({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.scss']
})


export class EntityManagerComponent implements OnInit 
{
  result!:string;
  search : String ="";
  searchTerm: string = "";
  term: string = "";
  isClick:boolean=false;
  menuFeatureName: any = [];
  menuBuilderDetails: any = [];
  dataMenu: any;
  featureDetailsData: any = [];
  menuFId: String='';
  menuFName: String='';
  screenMenuName: any = [];
  screenId: any = [];
  public Editor:any = ClassicEditor;
  project_id:string='';  
  feature_id:string='';
  logId:any = sessionStorage.getItem('LogId');
  projectName:string='';
  project_display_Name:string='';
  projectFeatureData: any = [];
  isDefaultFeature:boolean=false;
  getAllSharableFeatueData: any = [];
  selectedEntityId:string='';
  selectedFeatureId:string='';
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
  public menuBuilder: IMenu = 
  
  {
    language: '',
    feature: [],
    project: '',
    menuDetails: [],
    project_languages: [],
    menu_option: false,
  };
  public featureInfo: any = 
  {
    name: '',
    description: '',
    project: '',
    type: ''
  };
  public POPUP_MODAL_VARIABLENAME = 'popupmodal';
  entityid: any;
  public entity: PEntity = 
  {
      name: '',
      description: '',
      project_id: '',
      created_by: '',
      last_modified_by: '',
      updated_at: new Date(),
      field: []
  };
  entitydetails: any[] = [];
  updateEntityId: any;

  constructor(private spinner:NgxSpinnerService,private database: TreeDragService,private projectService:ProjectService,
              private route: ActivatedRoute,private dataService:DataService,private projectComponentService: ProjectComponentService,
              private logger:LoggingService,private validatorService: ValidatorService,private router: Router,
              private toastr: ToastrService,private menuBuilderService: MenuBuilderService,
              private screenService: ScreenDesignerService,private dialog: MatDialog) { }

  ngOnInit(): void 
  {
    this.route.queryParams.subscribe(params => 
    {
      console.log("params is",params);      
      this.project_id = params.projectId;
      this.feature_id = params.featureId;
    });
    this.getProjectById();
    this.getFeatureByProjectId();
    this.getAllEntityByProjectId();
    this.getMenuBuilderByProjectId();
    this.getAllSharableFeatue();
        
  }

  deleteFeature(feature:any) 
  {
        this.selectedFeatureId = feature._id;
        console.log("SelectedFeatureId:",this.selectedFeatureId);
        this.deleteDialog();
  }

  deleteDialog() 
  {
        const dialogRef = this.dialog.open(DeletefeatpopupComponent, 
        {
            width: '350px',
        });
        dialogRef.afterClosed().subscribe((data)=>
        {
          console.log(data);
          if(data==true)
          {
            console.log('feature id', this.selectedFeatureId);
            this.projectComponentService.deleteFeatureFlowById(this.selectedFeatureId,this.logId).subscribe((data)=>
            {
             console.log("Data after Delete:",data);
             if(data)
             {
               this.getFeatureByProjectId();
             }
            })
          }
        })
  }

  //To open the entity model dialog box
  saveEntityModel() 
  {
        this.openDialog();
  }

  //Function used to open ProjEntity popup component and save the value
  openDialog() 
  {
        const dialogRef = this.dialog.open(ProjentitypopUpComponent, 
        {
            width: '350px',
        });
        dialogRef.afterClosed().subscribe(entityData => 
        {
            if (entityData) 
            {
                this.entityid = entityData.entity_id;
                this.entity.project_id = this.project_id;
                this.entity.name = entityData.name;
                this.entity.description = entityData.description;
                if (entityData !== undefined) 
                {
                  console.log("EntityData:",entityData);
                  this.saveEntity(this.entity);
                    
                }
            }
        });
  }

  saveEntity(entityData:any) 
  {
        delete entityData._id;
        entityData.project_id = this.project_id;
        this.projectComponentService.createEntity(entityData, this.logId).subscribe((response) => 
        {
                console.log("Response:",response);
                this.updateEntityId = response.body._id;
                this.entitydetails = [];
                this.entitydetails = 
                [
                    {
                        'entities':
                        {
                            'entityId': response.body._id
                        },
                        'name': entityData.name,
                        'description': entityData.description,
                        'updated_date': Date.now()
                    }
                ];
                this.getAllEntityByProjectId();
        },
        (error) => 
        {
           console.log('error cannot able to save the entities ', error);
        });
  }

  //To open add feature dialog box
  openFeatureDialog(): void 
  {
    this.displayFeatureModel = 'block';
  }

  openFeatureLibrary()
  {
    this.isClick=!this.isClick;
  }

  //Radio button change event for add feature
  radioChange(event:any) 
  {
    if (event.value === 'Import Feature') 
    {
       this.showImportFeature = true;
       this.showAddFeature = false;
       this.showUploadFeature = false;
    }
    if (event.value === 'Upload Feature') 
    {
       this.formData = new FormData();
       this.showImportFeature = false;
       this.showAddFeature = false;
       this.showUploadFeature = true;
    }
    if (event.value === 'Create Feature') 
    {    
       this.showImportFeature = false;
       this.showAddFeature = true;
       this.showUploadFeature = false;
    }
  }

  onFeatureChange(event:any) 
  {
    if (event.length <= 0) 
    {
      this.isFeatureExist = false;
      this.isReserveWord = false;
      this.invalidName = false;
    }
  }
  onReady(eventData:any) 
  {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader:any) { };
  }
  
  //to get the Project name and details
  getProjectById() 
  {
    this.spinner.show();
    this.projectService.getProjectById(this.project_id, this.logId).subscribe(response => 
    {
        if (response.body) 
        {
            this.spinner.hide();
            this.projectName = response.body.project_unique_id;
            this.project_display_Name=response.body.name;
            this.menuLanguages.push(response.default_human_language);
            if (response.other_human_languages !== '') 
            {
                this.menuLanguages.push(response.other_human_languages);
            }
            this.menuBuilder.project_languages = this.menuLanguages;
            this.menuBuilder.language = this.menuLanguages[0];
        }
    });
  }

  //GET PROJECT FEATURE BY ID
  getFeatureByProjectId() 
  {
    this.spinner.show();
    this.projectComponentService.getFeatureByProjectId(this.project_id, this.logId).subscribe(response => 
    {
        console.log(this.project_id,this.logId);       
        this.spinner.hide();
        this.projectFeatureData = response.body;
        console.log("project feature data",this.projectFeatureData);
    },
    (error) => { });
  }
  //To get the All entity by project id
  getAllEntityByProjectId() 
  {
    this.spinner.show();
    this.projectComponentService.getEntityByProjectId(this.project_id, this.logId).subscribe((data) => 
    {
          this.spinner.hide();
          console.log('all entity data', data.body);
          this.allEntity = data.body;
          this.projectEntity = this.allEntity;
          this.dataService.setAllEntity(this.allEntity);
    },
    (error) => {console.log('cannot able to get all entity based on projectId ---- ', error);});
  }

  getMenuBuilderByProjectId() 
  {
    this.spinner.show();
    this.menuFeatureName = [];
    this.menuBuilderService.getMenuBuilderByProjectId(this.project_id, this.logId).subscribe(menuBuilderData => 
    {
      this.spinner.hide();
      if (menuBuilderData.body && menuBuilderData.body.length !== 0) 
      {
          this.menuBuilderDetails = menuBuilderData.body;
          const array:any[]= [];
          this.menuBuilderDetails.forEach((menuData:any) => 
          {
              if (menuData.menu_option === true) 
              {
                  this.dataMenu = menuData.menuDetails;
                  if (menuData.feature.length > 0) 
                  {
                      menuData.feature.forEach((feData:any)=> 
                      {
                          if (feData !== null) 
                          {
                              this.featureDetailsData = [];
                              this.projectComponentService.getFeatureById(feData, this.logId).subscribe(response => 
                              {
                                      this.featureDetailsData = response.body;
                                      this.menuFId = this.featureDetailsData._id;
                                      this.menuFName = this.featureDetailsData.name;
                                      const fMenuData = 
                                      {
                                          feature: this.menuFName,
                                          featureId: this.menuFId,
                                      };
                                      this.screenService.getScreenByFeatureId(feData, this.logId).subscribe(screenResponse => 
                                      {
                                          if (screenResponse.body && screenResponse.body.length !== 0) 
                                          {
                                              this.screenMenuName = [];
                                              this.screenId = [];
                                              screenResponse.body.forEach((sData:any) => 
                                              {
                                                  if (sData.screenOption !== this.POPUP_MODAL_VARIABLENAME) 
                                                  {
                                                      this.screenId.push(sData._id);
                                                      this.screenMenuName.push(sData.screenName);
                                                  }
                                              });
                                              const screenData = 
                                              {
                                                  screen: this.screenMenuName,
                                                  screenId: this.screenId
                                              };
                                              const obj = 
                                              {
                                                  featuremenu: [{ name: fMenuData, description: fMenuData }],
                                                  screenmenu: 
                                                  [{
                                                      name: screenData,
                                                      description: screenData
                                                  }],
                                              };
                                              array.push(obj);
                                              this.menuBuilder = menuData;
                                              this.menuBuilder.menuDetails = array;
                                              if (this.dataMenu.length !== 0) 
                                              {
                                                  this.dataMenu.forEach((meData:any) => 
                                                  {
                                                      this.menuBuilder.menuDetails.forEach(menu => 
                                                      {
                                                          if (meData.featuremenu.length > 0) 
                                                          {
                                                              // tslint:disable-next-line:max-line-length
                                                              if (menu.featuremenu[0].name.featureId === meData.featuremenu[0].name.featureId) 
                                                              {
                                                                  menu.featuremenu[0].description = meData.featuremenu[0].description;
                                                                  // tslint:disable-next-line:max-line-length
                                                                  if (menu.screenmenu[0].name.screenId !== undefined && meData.screenmenu[0].name.screenId !== undefined) 
                                                                  {
                                                                      // tslint:disable-next-line:max-line-length
                                                                      const intersection = menu.screenmenu[0].name.screenId.filter((x:any) => meData.screenmenu[0].name.screenId.includes(x));
                                                                      if (intersection.length !== 0) 
                                                                      {
                                                                          intersection.forEach((sId:any) => 
                                                                          {
                                                                              // tslint:disable-next-line:max-line-length
                                                                              meData.screenmenu[0].name.screenId.forEach((dSId: any, index: string | number) => 
                                                                              {
                                                                                  if (sId === dSId) 
                                                                                  {
                                                                                      // tslint:disable-next-line:max-line-length
                                                                                      menu.screenmenu[0].description.screen[index] = meData.screenmenu[0].description.screen[index];
                                                                                  }
                                                                              });
                                                                          });
                                                                      }
                                                                  }
                                                              }
                                                          }
                                                      });
                                                  });
                                                  if (this.menuBuilder.menuDetails[0].featuremenu[0].name.feature !== 'default') 
                                                  {
                                                      this.menuBuilder.menuDetails.splice(0, 0, this.dataMenu[0]);
                                                  }
                                              }
                                              this.menuBuilderService.updateMenuById(menuData._id, this.menuBuilder, this.logId).subscribe(menuResponse => 
                                              {
                                                      if (menuResponse.body) 
                                                      {
                                                          this.dataService.setMenuBuilder(menuResponse.body.menuDetails);
                                                          this.database.initialize(menuResponse.body.menuDetails);
                                                      }
                                              });
                                          }
                                      });
                              },
                              error => { });
                          }
                      });
                  }
                  else 
                  {
                      this.database.initialize(this.dataMenu);
                      this.dataService.setMenuBuilder(this.dataMenu);
                  }
              }
          });
      }
    });
  }

  //Sharable Feature
  getAllSharableFeatue()
  {
    this.spinner.show();
    this.projectComponentService.getAllSharableFeatue(this.project_id,this.logId).subscribe(response =>
    {
        console.log(this.project_id, this.logId);
        this.spinner.hide();
        this.getAllSharableFeatueData = response.body;
        console.log("All Sharable Feature",this.getAllSharableFeatueData);
    },
    error => { });
  }
  //Search Feature


  //To get the selected project
  getSelectedProject() 
  {
    this.spinner.show();
    this.dataService.currentProjectInfo.subscribe((data) => 
    {
          this.spinner.hide();
          this.selectedProject = data;
    });
  }
  
  //To close the feature model popup box
  closeFeatureCreateModel() 
  {
        this.displayFeatureModel = 'none';
  }

  //To create a external shared feature
  addFeature(name:any,description:any, values:any)
  {
    this.featureInfo.name = name.toLowerCase();
    this.featureInfo.description=description;
    this.featureInfo.project = this.project_id;
    this.featureInfo.type='';
    this.featureInfo.feature_type = values.feature_type;
    this.projectComponentService.getFeatureByProjectId(this.project_id, this.logId).subscribe(projFeature => 
    {
      if (projFeature.body.length > 0) 
      {
        projFeature.body.forEach((feature: { name: any; }) => 
        {
            if (feature.name === this.featureInfo.name) 
            {
                this.isFeatureExist = true;
            }
        });
      }
      if (!this.isFeatureExist  && !this.invalidName && !this.isReserveWord) 
      {
        this.spinner.show();
        this.featureInfo.description = this.featureInfo.description.replace(/<[^>]+>/g, '');
        this.featureInfo.description.trim();
        this.projectComponentService.saveFeatures(this.featureInfo, this.logId).subscribe((featureData) => 
        {
          console.log("featureData:",featureData);
          this.featureInfo = { name: '', description: '', project: '', type: '' };
          this.displayFeatureModel = 'none';
          this.menuBuilder = 
          {
            feature: [], project: '', language: '',
            menuDetails: [], project_languages: this.menuLanguages, menu_option: true
          };
          this.menuBuilderService.getMenuBuilderByProjectId(this.project_id, this.logId).subscribe(menuBuilderData => 
          {
            if (menuBuilderData.body && menuBuilderData.body.length !== 0) 
            {
                menuBuilderData.body.forEach((menuData:any) => 
                {
                    if (menuData.menu_option === true) 
                    {
                        this.menuBuilder.feature = menuData.feature;
                        this.menuBuilder.project = this.project_id;
                        this.menuBuilder.language = menuData.language;
                        this.menuBuilder.feature.push(featureData.body._id);
                        this.menuBuilder.menuDetails = menuData.menuDetails;
                        this.menuBuilderService.updateMenuById(menuData._id, this.menuBuilder, this.logId).subscribe(fMenu => 
                        { }, error => console.log('cannot able to update the menu details'));
                    }
                });
            }
          });
          values.web_client_properties.screens.forEach((screen:any) => {
            delete screen.project;
            delete screen.feature;
            screen.project = this.project_id;
            screen.feature = featureData.body._id;
            this.projectComponentService.saveScreenSharedLibrary(screen, this.logId).subscribe(data => {

            });
          });

          //create a entity for a sharedfeature library
          let shared_entity = values.primary_entity;
          delete shared_entity.project_id;
          delete shared_entity.feature_id;

          shared_entity.project_id = this.project_id;
          shared_entity.feature_id = featureData.body._id;

          //create a entity into get a gfc json from data update the project 
          this.projectComponentService.createEntity(shared_entity, this.logId).subscribe(data => {
            let feature_entity = {
              entityType : data.body.entity_type,
			        entityId : data.body._id
            }
            let add_entity:any[] = [];
            let project_updateData = {
              _id: featureData.body._id,
              flows: [],
              entities: add_entity,
            }
            add_entity.push(feature_entity);

            //create a list flows get and save project flows to save list of ID
            let listOfFlows:any[] = [];
            this.projectComponentService.getAllFlows(this.logId).subscribe( async response => {
              let flowsArray = response.body;
              await flowsArray.forEach((flowsMap:any) => {
                if(flowsMap.name !== 'GpSEF'){
                    delete flowsMap._id;
                    delete flowsMap._v;
                    listOfFlows.push(flowsMap);
                }
              });

              // update the list of flows data same time adding
              await this.projectComponentService.saveManyProjectFlow(listOfFlows, this.logId).subscribe( async response => {
                if (response.body) 
                {
                    let projectFlowsId:any = response.body.map(({_id}: any) => _id);
                    project_updateData['flows'] = projectFlowsId;
                    await this.projectComponentService.updateFeature(project_updateData, this.logId).subscribe( update_data => {
                      console.log('complete the data', update_data);
                    })
                }
              });
            });
          })
          this.getFeatureByProjectId();
          this.spinner.hide();
        },
        (error) => 
        {
          this.logger.log('error',error);
        })
      }
    });
  }

  //To create the new feature
  createFeature() 
  {
    this.featureInfo.name = this.featureInfo.name.toLowerCase();
    this.featureInfo.project = this.project_id;
    this.featureInfo.type='internal';
    this.validatorService.checkNamingConvention(this.featureInfo.name);
    this.validatorService.checkReserveWords(this.featureInfo.name);
    this.validatorService.currentProjectInfo.subscribe(data => 
    {
        if (data === null) 
        {
            this.invalidName = true;
        } 
        else 
        {
            this.invalidName = false;
        }
    });
    this.validatorService.currentProjectReserveWordInfo.subscribe(reserveWord => 
    {
        this.isReserveWord = reserveWord;
    });
    this.projectComponentService.getFeatureByProjectId(this.project_id, this.logId).subscribe(projFeature => 
    {
      console.log("projFeature:",projFeature);
      if (projFeature.body.length > 0) 
      {
        projFeature.body.forEach((feature: { name: any; }) => 
        {
            if (feature.name === this.featureInfo.name) 
            {
                this.isFeatureExist = true;
            }
        });
      }
      if (!this.isFeatureExist && !this.invalidName && !this.isReserveWord) 
      {
        this.spinner.show();
        this.featureInfo.description = this.featureInfo.description.replace(/<[^>]+>/g, '');
        this.featureInfo.description.trim();
        this.projectComponentService.saveFeatures(this.featureInfo, this.logId).subscribe((featureData) => 
        {
          console.log("featureData:",featureData);
          this.featureInfo = { name: '', description: '', project: '', type: '' };
          this.displayFeatureModel = 'none';
          this.menuBuilder = 
          {
            feature: [], project: '', language: '',
            menuDetails: [], project_languages: this.menuLanguages, menu_option: true
          };
          this.menuBuilderService.getMenuBuilderByProjectId(this.project_id, this.logId).subscribe(menuBuilderData => 
          {
            if (menuBuilderData.body && menuBuilderData.body.length !== 0) 
            {
                menuBuilderData.body.forEach((menuData:any) => 
                {
                    if (menuData.menu_option === true) 
                    {
                        this.menuBuilder.feature = menuData.feature;
                        this.menuBuilder.project = this.project_id;
                        this.menuBuilder.language = menuData.language;
                        this.menuBuilder.feature.push(featureData.body._id);
                        this.menuBuilder.menuDetails = menuData.menuDetails;
                        this.menuBuilderService.updateMenuById(menuData._id, this.menuBuilder, this.logId).subscribe(fMenu => 
                        { }, error => console.log('cannot able to update the menu details'));
                    }
                });
            }
          });
          this.getFeatureByProjectId();
          this.spinner.hide();
        },
        (error) => 
        {
          this.logger.log('error',error);
        })
      }
    });
  }
  //To edit the entity fro add entity section
  editEntityField(entity: any) 
  {
    this.router.navigate(['/entity-field'], 
    { 
      queryParams: 
      { 
        entityId: entity._id,
        featureId: this.feature_id,
        projectId: this.project_id
      } 
    });
  }
  //To open entity delete popup model
  openDeleteModel(entity:any) 
  {
    this.selectedEntityId = entity._id;
    this.deletePopup = 'block';
  }
  //To close delete Popup model
  closeDeleteModel() 
  {
    this.deletePopup = 'none';
  }
  //To delete the particular entity
  deleteEntityById() 
  {
    this.deletePopup = 'none';
    this.projectComponentService.deleteEntityById(this.selectedEntityId, this.logId).subscribe((data) => 
    {
            console.log("Data after Entity Delete:",data);
            if (data) 
            {
                this.getAllEntityByProjectId();
            }
    },
    (error) => {this.logger.log('error',error);});
  }

  async generateCode() 
  {
    this.toastr.success('Please wait', 'Generating the code!', 
    {
      closeButton: true,
      disableTimeOut: true
    });
    this.toastr.success('PROJECT: ' + this.projectName, 'Generation Requested!', 
    {
      closeButton: false,
      disableTimeOut: false
    });
    this.projectComponentService.codeGenerate(this.project_id, this.logId).subscribe(data => 
    {
      if (data.body) 
      {
          console.log('body data----------------->>>', data.body);
          // tslint:disable-next-line: max-line-length
          this.toastr.clear();
          this.toastr.success('Github URL: https://github.com/gepinfo/' + this.projectName + '.git', 'Generation Completed!', 
          {
              closeButton: true,
              disableTimeOut: true
          }).onTap.subscribe(action => {window.open('https://github.com/gepinfo/' + this.projectName + '.git', '_blank');});
      }
    }, 
    error => 
    {
      if (error) 
      {
          this.toastr.error('Failed!', 'Generation Failed', 
          {
              closeButton: false,
              disableTimeOut: false
          });
      }
    });
  }

}
