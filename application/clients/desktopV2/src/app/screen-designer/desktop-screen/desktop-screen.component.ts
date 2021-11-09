import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { nanoid } from 'nanoid';
import { customAlphabet } from 'nanoid'
import { NgxSpinnerService } from 'ngx-spinner';

// @ts-ignore
import grapesjs from 'node_modules/grapesjs';
import { ProjectComponentService } from 'src/app/project-component/project-component.service';
import { SharedService } from 'src/shared/shared.service';
import { ScreenDesignerService } from '../screen-designer.service';
import { BlockService } from './services/Blocks/block.service';
import { CommandService } from './services/Commands/command.service';
import { PanelService } from './services/Panels/panel.service';
import { TraitsService } from './services/Traits/traits.service';
import { Constants } from 'src/app/config/Constant';
import { CustomTraitsService } from './services/Traits/custom-traits.service';
import { Aggrid } from '../Variables';
@Component({
  selector: 'app-desktop-screen',
  templateUrl: './desktop-screen.component.html',
  styleUrls: ['./desktop-screen.component.scss']
})
export class DesktopScreenComponent implements OnInit {
  editor: any;
  screenType: String='';
  feature_id: String='';
  project_id: String='';
  screen_id: String='';
  traitsName: String='';
  isTemplateEdit:boolean=false;
  isFieldPopupModal:boolean=false;
  entityFields: any = {
    entityfieldname: '',
    entityId: ''
  };
  public verbOptions: any[] = [
    { key: 'click', value: 'onClick' },
  ];
  logId: any = sessionStorage.getItem('LogId');
  screenEntityModel: any[] = [];
  dataBindingTypes: any[] = [];
  stylesheets: any[] = [];
  templateName:string='';
  scripts: any[] = [];
  cssGuidelines: any[] = [];
  selectedEntityModel: any;
  selectedentityfield: any;
  fields: any[] = [];
  selectedHtmlElement: any = {
    htmlId: '',
    componentId: '',
    elementName: ''
  };
  public selectedFlowObj: any = null;
  public Aggrid: Aggrid = {
    gridApi: '',
    gridColumnApi:'',
    defaultColDef:'',
    columnDefs:'',
    rowSelection:''
};
 
  selectedFlow: any;
  ElementNameArray: any[] = [];
  screenFlows: any[] = [];
  routeFlows: any[] = [];
  specialEvents: any[] = [];
  linkArray: any[] = [];
  projectTemplateId:any;
  public featurelist: any;
  existScreenDetail: any;
  screenArrayByProjectId: any;
  templateObj:any= {
    _id: '',
    stylesheets: '',
    scripts: '',
    template_image: '',
    'css-guidelines': '',
    template_name: '',
    project_id: '',
    date: '',
    __v: 0
  };

  screenNameExist: Boolean = false;
  screenName: string='';
  screenOption: String = 'normal';
  RemoteStorage:any;
  saveTemplateURL:any;
  updateTemplateURL:any;
  modifyTemplateUrl:any;
  constructor(private activatedRoute:ActivatedRoute,private blockservice:BlockService,private panelService:PanelService,
    private projectComponentService:ProjectComponentService,private traitService:TraitsService,private commandService:CommandService,
    private spinner:NgxSpinnerService, private screenDesignerService: ScreenDesignerService,private sharedService:SharedService,
    private customTraitService:CustomTraitsService, private ref: ChangeDetectorRef,) {
      this.Aggrid.columnDefs= [
        {
          headerName: 'Name',
          field: 'name',
          filter: 'agTextColumnFilter',
          checkboxSelection: true
        },
        { headerName: 'Label', field: 'label', filter: 'agTextColumnFilter' },
        {
          headerName: 'Action',
          field: 'actionOnData',
          filter: 'agTextColumnFilter',
          width: 230
        }
      ];
      this.Aggrid.rowSelection = 'single',
       this.Aggrid.defaultColDef = {
        sortable: true,
        filter: true
      };
     }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.featureId !== undefined && params.featureId !== null) {
        this.feature_id = params.featureId;
      }
      if (params.projectId !== undefined && params.projectId !== null) {
        this.project_id = params.projectId;
      }
      if (params.screenId !== undefined && params.screenId !== null) {
        this.screen_id = params.screenId;
      }
      if (params.screenType !== undefined && params.screenType !== null) {
        this.screenType = params.screenType;
      }
      if (params['project-template-id']) {
        this.isTemplateEdit = true;
        this.projectTemplateId = params['project-template-id'];
        this.getProjectTemplate(this.projectTemplateId);
      }
    });
    this.stylesheets = JSON.parse(localStorage.getItem('stylesheets')|| '{}');
    this.scripts = JSON.parse(localStorage.getItem('scripts')|| '{}');
    this.cssGuidelines = JSON.parse(localStorage.getItem('css_guidelines')|| '{}');
    this.templateName=localStorage.getItem('templateName')?.toLocaleLowerCase().replace(' ','') || '{}';
    const plugins = ['grapesjs-preset-webpage','gjs-plugin-ckeditor','grapesjs-custom-code'];
    let addStyles:any = [];
    let addScripts:any = [];
    if (this.stylesheets) {
      addStyles = this.stylesheets;
    }
    if (this.scripts) {
      addScripts = this.scripts;
    }
   
       // desktop plugins
       grapesjs.plugins.add('desktop-plugin', function (editor:any, options:any) {
        console.log('desktop plugins editor are --11-- ', editor);
        console.log('desktop plugins options are --22-- ', options);
        editor.getConfig().deviceManager.devices = [
          { name: 'Desktop', width: '' },
          { name: 'Tablet', width: '768px', widthMedia: '992px' },
          { name: 'Mobile landscape', width: '568px', widthMedia: '768px' },
          { name: 'Mobile portrait', width: '320px', widthMedia: '480px' }
        ];
      });
      // mobile plugin
      grapesjs.plugins.add('mobile-plugin', function (editor:any, options:any) {
        console.log('mobile plugins editor are --11-- ', editor);
        console.log('mobile plugins options are --22-- ', options);
        const desktopButton = editor.Panels.removeButton(
          'devices-c',
          'set-device-desktop'
        );
        const tabletButton = editor.Panels.removeButton(
          'devices-c',
          'set-device-tablet'
        );
        const mobileButton = editor.Panels.getButton(
          'devices-c',
          'set-device-mobile'
        );
        mobileButton.set('active', 1);
      });
      if (this.screenType === 'mobile') {
        plugins.push('mobile-plugin');
      }
      addStyles.push(`./assets/css/template/${this.templateName.replace(/ +/g, "")}.css`);
    console.log('--------template css file location--------', addStyles);
      this.editor = grapesjs.init({
        container: '#editor-c',
        height: '110%',
        showDevices: 0,
        showOffsets: 1,
        avoidInlineStyle: 1,
        avoidDefaults: 1,
        clearStyles: 1,
        exportWrapper: 1,
        allowScripts: 1,
        plugins: plugins,
        pluginsOpts: {
          'grapesjs-preset-webpage': {
           
          },
          'grapesjs-custom-code': {}
        },
        assetManager: {
          assets: [ ],
        },
        canvas: {
          styles: addStyles,
          scripts: addScripts
        },
        styleManager: {
          //To avoid duplicate stylemanager values
          clearProperties: true,
        },
        storageManager: {
          type: 'remote',
          autosave: false,
          autoload: false,
          storeComponents: true,
          storeStyles: true,
          contentTypeJson: true,
          urlStore: ''
        },
      });
      const comps = this.editor.DomComponents;
      this.editor.DomComponents.Component.createId = function (model:any) {
        const list = comps.Component.getList(model);
        const { id } = model.get('attributes');
        let nextId;
  
        if (id) {
          // only commented this line, to keep the original id.
          nextId = id;
          model.setId(nextId);
        } else {
          nextId = 'template-' + comps.Component.getNewId(list);
        }
  
        list[nextId] = model;
        return nextId;
      };
      // Need to set generated id while component creation
      this.editor.on('component:create', (component: { setId: (arg0: any) => void; getId: () => any; }) => {
        component.setId(component.getId());
      });
      this.getScreenById();
      this.getFeatureById();
      this.getEntityType();
      this.addCustomBlocks();
      this.panelManager();
      this.traitService.initMethod(this);
      this.editorCommands();
      const nanoid = customAlphabet('1234567890', 6)
      this.screenName = `screen${nanoid()}`;
      this.RemoteStorage = this.editor.StorageManager.get('remote');
      this.saveRemoteStorage();
      this.saveTemplateURL = `${this.sharedService.Apigateway}${Constants.addScreen}`;
      this.updateTemplateURL = `${this.sharedService.Apigateway}${Constants.updateScreen}`;
      this.modifyTemplateUrl = `${this.sharedService.Apigateway}${Constants.updateProjectTemplate}`;
  }
  //To add Custom Blocks
  addCustomBlocks() {
    this.blockservice.addHeadingTag(this.editor);
    this.blockservice.addCKeditor5(this.editor);
    this.blockservice.addSpecialCharts(this.editor);
  }
  //Function Contains custom buttons in panels
  panelManager() {
    this.panelService.addSaveButton(this.editor);
    this.panelService.addCancelButton(this.editor);
  }
  editorCommands() {
    console.log('-------draganddrop-----this', this);
    this.commandService.componentSelected(this);
    this.commandService.toggle(this);
    //this.commandService.removeComponent(this);
    this.commandService.updateComponentName(this);
    this.commandService.updateTraits(this);
    this.commandService.dragAndDrop(this);
  }
  onGridReady(params:any) {
    
    this.Aggrid.gridApi = params.api;
    this.Aggrid.gridApi.sizeColumnsToFit();
    this.Aggrid.gridColumnApi = params.columnApi;
  }
  onSelectionChanged(event:any) {
    this.selectedFlow =  this.Aggrid.gridApi.getSelectedRows();
    console.log(" this.selectedFlow ", this.selectedFlow );
    
}
  // set component element css based on cssGuideLines
  setElementCSS(element:any, tagName:any, removeTagClassName:any) {
    const gepStyle = JSON.parse(localStorage.getItem('templateparser')|| '{}');
    console.log('gep default styles are -----  ', gepStyle, ' cssguideines are ---  ', this.cssGuidelines, '  tagname  ', tagName);
    let temp = null;
    if (this.cssGuidelines) {
      console.log("cssGuidelines",this.cssGuidelines);
      temp = this.cssGuidelines.find(x => x.tagName === tagName);
    }
    if (temp) {
      element.addClass(temp.className);
    } else if (gepStyle && gepStyle.length > 0) {
      gepStyle.forEach((gepEle: { css: { [x: string]: any; }; }) => {
        const tempCSS = gepEle.css[tagName];
        if (tempCSS) {
          element.addClass(tempCSS.className);
        }
      });
    }
    if (removeTagClassName) {
      const removeTemp = this.cssGuidelines.find(
        x => x.tagName === removeTagClassName
      );
      console.log('removeTagClassName parts  ----   ', removeTemp);
      if (removeTemp) {
        element.removeClass(removeTemp.className);
      }
    }
  }
  //To get Project Template this function called when modify template clicked
  getProjectTemplate(id:any) {
    this.spinner.show();
    this.screenDesignerService.getProjectTemplate(id, this.logId).subscribe((response: any) => {
      this.spinner.hide();
      console.log('TEMPLATE RESPONSE---->>>>', response);
      if(response && response.body && response.body.length > 0) {
        const body = response.body[0];
        this.templateObj = {
          _id: body._id,
          stylesheets: body.stylesheets,
          scripts: body.scripts,
          template_image: body.template_image,
          'css-guidelines': body['css-guidelines'],
          template_name: body.template_name,
          project_id: body.project_id,
          date: body.date,
          __v: body.__v
        };
        let gjsComponents = body['gjs-components'][0] || null;
        let gjsStyles = body['gjs-styles'][0] || null;
        const gjsCss = body['gjs-css'] || null;
        if (gjsComponents) {
          gjsComponents = JSON.parse(gjsComponents);
          this.editor.setComponents(gjsComponents);
        }
        if (gjsStyles) {
          gjsStyles = JSON.parse(gjsStyles);
          this.editor.setStyle(gjsStyles);
        }
        if (gjsCss) {
          this.editor.setStyle(gjsCss);
        }
      }
    });
  }
  public entityData:any;
  EntityField: any[] = [];
  entitydetails:any;
  public selectentityarray: any[] = [];
  listOfFLows: any[] = [];
  rowData: any;
  getEntity(featureObject:any) {
    if (this.project_id !== undefined && this.feature_id !== undefined) {
      this.projectComponentService
        .getAllEntityByFeatureId(this.feature_id, this.logId)
        .subscribe(
          response => {
            this.entityData = response.body.body;
            if (
              this.entityData !== null &&
              this.entityData !== undefined &&
              this.entityData.length > 0
            ) {
              console.log('entityData details using Feature id --------  ', this.entityData);
              const entityArray: { name: string; value: string; type?: string; }[] = [];
              entityArray.push({ name: 'none', value: 'none' });
              this.EntityField = this.entityData;
              featureObject.entities.filter((entity: { entityId: any; entityType: string; }) => {
                this.entityData.filter((entityElement: { _id: string; name: string; }) => {
                  if(entity.entityId === entityElement._id) {
                    const object = {
                      name: '',
                      value: '',
                      type: ''
                    };
                    object.name = entityElement.name;
                    object.value = entityElement._id;
                    object.type = entity.entityType;
                    entityArray.push(object);
                    this.entitydetails = entityArray;
                  }
                  console.log('-----Geppetto service calling----', entityArray);
                });
              })
              this.traitsName = 'entity';
              this.setDefaultType(entityArray);
            } else {
              console.log('----------coming in feature entity else part-------');
              this.traitsName = 'dataBinding';
              this.setDefaultType(this.dataBindingTypes);
            }
          },
          error => { }
        );
    } else {
      console.log('---------------else coming first---');
      this.projectComponentService
        .getEntityByProjectId(this.project_id, this.logId)
        .subscribe(
          response => {
            const allEntityData = response.body;
            if (
              allEntityData !== null &&
              allEntityData !== undefined &&
              allEntityData.length > 0
            ) {
              console.log('entityData details using Project id --------  ', this.entityData);
              const entityArray: { name: string; value: string; type?: string; }[] = [];
              entityArray.push({ name: 'none', value: 'none' });
              this.EntityField = allEntityData;
              allEntityData.filter((entityElement: { name: string; _id: string; entity_type: string; }) => {
                const object = {
                  name: '',
                  value: '',
                  type: ''
                };
                object.name = entityElement.name;
                object.value = entityElement._id;
                object.type = entityElement.entity_type;
                entityArray.push(object);
                this.entitydetails = entityArray;
              });
              this.traitsName = 'entity';
              this.setDefaultType(entityArray);
            } else {
              console.log('----------coming in entity else part-------');
              this.traitsName = 'dataBinding';
              this.setDefaultType(this.dataBindingTypes);
            }
          },
          error => { }
        );
    }
  }
  getEntityType() {
    this.projectComponentService.getAllEntityType(this.logId).subscribe(
      data => {
        if (data.body) {
          data.body.filter((element: { typename: string; }) => {
            const object = {
              name: '',
              value: ''
            };
            if (
              element.typename === 'Number' ||
              element.typename === 'Decimal'
            ) {
              object.name = element.typename;
              object.value = 'Number';
            } else if (element.typename === 'Date') {
              object.name = element.typename;
              object.value = 'Date';
            } else if (element.typename === 'Boolean') {
              object.name = element.typename;
              object.value = 'Boolean';
            } else {
              object.name = element.typename;
              object.value = 'String';
            }
            this.dataBindingTypes.push(object);
          });
        }
        console.log(
          'after build databinding types are --- ',
          this.dataBindingTypes
        );
      },
      error => { }
    );
  }
  setDefaultType(EntityBinding:any) {
    EntityBinding.filter((entitylist: { type: string; }) => {
      console.log("EntityBinding foreach==>",entitylist);
      if (entitylist.type === 'secondary') {
        this.selectentityarray.push(entitylist);
      }
    });
    this.customTraitService.entityFieldButton(this);
     this.customTraitService.content(this);
     this.customTraitService.flowsActionButton(this);
    // // custom traits for flows action button
    // this.customTraitService.flowsActionButton(this);
    // // custom traits for page flow action button
    // this.customTraitService.MultiflowsActionButton(this);
    // this.customTraitService.flowsModifierValueButton(this);
    // // custom traits for popup modal button
    // this.customTraitService.popupModalButton(this);
    

        // input traits
        this.editor.DomComponents.getType(
          'input'
        ).model.prototype.defaults.traits.push(
          {
            type: 'select',
            label: this.traitsName,
            name: this.traitsName,
            options: EntityBinding,
            changeProp: 1
          },
          {
            type: 'entityFieldButton',
            label: 'Field',
            name: 'Field',
          }
          );
        console.log('--------selectentity----->>>>', this.editor.DomComponents);
          console.log("this.selectentityarray==>",this.selectentityarray)
        // select traits
        this.editor.DomComponents.getType(
          'select'
        ).model.prototype.defaults.traits.push(
          {
            type: 'select',
            label: this.traitsName,
            name: this.traitsName,
            options: this.selectentityarray,
          },
          {
            type: 'entityFieldButton',
            label: 'Field',
            name: 'Field',
          }
        );
          // button traits
          this.editor.DomComponents.getType(
            'button'
          ).model.prototype.defaults.traits.push(
            {
              type: 'select',
              label: 'verb',
              name: 'verbs',
              changeProp: 1,
              options: this.verbOptions
            },
            {
              name: 'actionButton',
              label: 'Action',
              type: 'actionButton'
            }
          );
            // add traits at the state of initialization
    this.editor.DomComponents.getWrapper()
    .get('traits')
    .add([
      {
        type: 'select',
        label: 'verb',
        name: 'componentVerb',
        changeProp: 1,
        options: []
      },
      {
        name: 'multiflowButton',
        label: 'Action',
        type: 'multiflowButton'
      },
      {
        type: 'checkbox',
        label: 'isPopup',
        name: 'popupmodal',
        changeProp: 1
      }
    ]);
  }
  getFeatureById() {
    if (this.feature_id) {
      this.projectComponentService.getFeatureById(this.feature_id, this.logId).subscribe(
        featureData => {
          if (featureData.body) {
            this.featurelist = featureData.body;
            let featureObject = featureData.body;
            this.getEntity(featureObject);
            this.getProjectFeatureFlows(featureData.body.flows);
          }
        },
        error => {
          console.error('cannot able to get the feature data');
        }
      );
    }
  }
  getProjectFeatureFlows(projectFlowsID:any) {
    console.log('projectFlowsID ==============>>>', projectFlowsID)
    this.projectComponentService
      .getProjectFeatureFlows(projectFlowsID, this.logId)
      .subscribe(
        data => {
          this.listOfFLows = data.body;
          console.log('this.listOfFLows =============>>', this.listOfFLows);
          if (this.listOfFLows) {
            if (this.feature_id !== undefined && this.feature_id != null) {
              this.rowData = this.listOfFLows;
            } else {
              const createFlow = this.listOfFLows.find(
                x => x.name === 'GpCreate'
              );
              this.rowData = [createFlow];
            }
          }
        },
        error => {
          console.error('cannot able to get the projectFeatureFlows');
        }
      );
  }
    //To omit special characters in input field
    omit_special_char(event:any)
    {   
      var k;  
      k = event.charCode;  //         k = event.keyCode;  (Both can be used)
      return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
    }
    isScreenNameExist() {
      const index = this.screenArrayByProjectId.findIndex(
        (        x: { screenName: any; _id: String; }) => x.screenName === this.screenName && x._id !== this.screen_id
      );
      if (index > -1) {
        this.screenNameExist = true;
      } else {
        this.screenNameExist = false;
      }
    }
    saveRemoteStorage(params = {}) {
      if (Object.keys(params).length > 0) {
        this.RemoteStorage.set('params', params);
        this.editor.StorageManager.get('remote').set({
          urlStore: `${this.modifyTemplateUrl}/${this.templateObj._id}?log_id=${this.logId}`,
        });
      } else {
        this.RemoteStorage.set('params', {
          screenName: this.screenName,
          project: this.project_id,
          feature: this.feature_id,
          screenType: this.screenType,
          entity_info: this.screenEntityModel,
          screenOption: this.screenOption,
        });
      }
    }
    closeScreeName() {
      const model = document.getElementById('myModal');
      model!.style.display = 'none';
      const saveButton = this.editor.Panels.getButton('options', 'save-page');
      saveButton.set('active', 0);
    }
    getScreenById() {
      if (this.screen_id) {
        this.spinner.show();
        this.editor.StorageManager.get('remote').set({
          urlStore: `${this.updateTemplateURL}${this.screen_id}`,
        });
  
        this.screenDesignerService.getScreenById(this.screen_id, this.logId).subscribe(
          response => {
            console.log('response ================ for screen data =========+>>>', response);
            if (response.body) {
              this.spinner.hide();
              this.existScreenDetail = response.body;
              console.log('------screen response-----', this.existScreenDetail);
              if (this.existScreenDetail[0]['entity_info']) {
                const entityinfo = this.existScreenDetail[0]['entity_info'];
                console.log('----from screen---entityinfo-----', entityinfo, this.entitydetails);
              }
              if (this.existScreenDetail[0]['gjs-components']) {
                this.feature_id = this.existScreenDetail[0]['feature'];
                this.project_id = this.existScreenDetail[0]['project'];
                this.screenName = this.existScreenDetail[0]['screenName'];
                // this.is_grid_present = this.existScreenDetail[0][
                //   'is_grid_present'
                // ];
                // this.agGridObject = this.existScreenDetail[0]['grid_fields'];
                  this.screenEntityModel = this.existScreenDetail[0]['entity_info'];
                  this.screenFlows = this.existScreenDetail[0]['flows_info'];
                //  this.routeFlows = this.existScreenDetail[0]['route_info'];
                // this.componentLifeCycle = this.existScreenDetail[0][
                //   'component-lifecycle'
                // ];
               //  this.specialEvents = this.existScreenDetail[0]['special-events'];
                // this.specific_attribute_Event = this.existScreenDetail[0]['specific_attribute_Event'];
               //  this.linkArray = this.existScreenDetail[0]['link_info'];
                // this.addGridBlocks();
  
               // // change colname array
                // if (this.agGridObject && this.agGridObject.custom_field.length > 0)
                //  {
                //   this.columnOptions = [];
                //   this.agGridObject.custom_field.forEach(customField => {
                //     const temp = { value: '', name: '' };
                //     temp.value = customField.columnid;
                //     temp.name = customField.columnname;
                //     this.columnOptions.push(temp);
                //   });
                //   console.log(' gjs component------------ value -------', this.agGridObject);
                // }
                this.editor.setComponents(
                  JSON.parse(this.existScreenDetail[0]['gjs-components'])
                );
                this.editor.setStyle(JSON.parse(this.existScreenDetail[0]['gjs-styles'][0]) || this.existScreenDetail[0]['gjs-css']);
                console.log('------get grapesjs css-------', this.editor.getStyle());
                //   this.editor.render();
              }
            } else {
              console.log('------empty response coming for screen api');
            }
          },
          error => {
            console.log('screenId error are ---- ', error);
          }
        );
      } else {
        this.editor.StorageManager.get('remote').set({
          urlStore: this.saveTemplateURL
        });
      }
    }
    updateScreeName() {
      if (this.isTemplateEdit) {
        this.saveRemoteStorage(this.templateObj);
        this.closeScreeName();
        this.spinner.show();
        this.editor.store((data:any) => {
          this.getProjectTemplate(this.projectTemplateId);
        });
      } else {
        this.saveRemoteStorage();
        this.getScreenById();
        //this.createFeatureIfNotExist();
        this.closeScreeName();
        this.editor.store((data:any) => {
          console.log('storage id are -------------    ', data);
          this.screen_id = data.body._id;
          this.getScreenById();
        });
      }
    }
    onCloseModel() {
      this.entityFields['entityfieldname'] = {};
      this.entityFields['entityId'] = {};
      this.isFieldPopupModal = false;
      this.ref.detectChanges();
    }
    onChangeentityfield() {
      let entitydetails: any;
      const checkedIndex = this.screenEntityModel.findIndex(
        x =>
          x.htmlId === this.editor.getSelected().ccid &&
          x.componentId === this.editor.getSelected().cid
      );
      if (checkedIndex > -1) {
        this.screenEntityModel.splice(checkedIndex, 1);
      }
      if (
        this.entityFields !== '' &&
        this.entityFields !== undefined &&
        this.traitsName === 'entity'
      ) {
        const obj = {
          htmlId: '',
          componentId: '',
          elementName: '',
          entityId: '',
          fields: {
            fieldId: '',
            name: '',
            description: '',
            typeName: '',
            dataType: ''
          }
        };
        entitydetails = this.entityData.find((x: { _id: any; }) => x._id === this.entityFields.entityId);
        this.selectedentityfield = entitydetails.field.find((field: { name: any; }) => field.name === this.entityFields.entityfieldname);
        obj.htmlId = this.editor.getSelected().ccid;
        obj.componentId = this.editor.getSelected().cid;
        if (this.editor.getSelected().attributes.type === 'select') {
          obj.elementName = 'select_' + this.editor.getSelected().ccid;
        } else {
          obj.elementName = this.editor.getSelected().attributes.name;
        }
        obj.entityId = this.editor.getSelected().attributes.entity;
        obj.fields.fieldId = this.selectedentityfield._id;
        obj.fields.name = this.selectedentityfield.name;
        obj.fields.description = this.selectedentityfield.description;
        obj.fields.typeName = this.selectedentityfield.type_name;
        obj.fields.dataType = this.selectedentityfield.data_type;
        /* This method is done to remove duplicate value which is pushed in the screenEntity Model
        for details  */
        const duplicatefieldrm = this.screenEntityModel.findIndex(y => y.elementName === obj.elementName);
        if (duplicatefieldrm > -1) {
          this.screenEntityModel[duplicatefieldrm] = obj;
        } else {
          this.screenEntityModel.push(obj);
  
        }
  
      }
      this.saveRemoteStorage();
    }
}
