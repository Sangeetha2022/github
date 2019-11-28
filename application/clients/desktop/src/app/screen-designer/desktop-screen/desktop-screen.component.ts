import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ScreenDesignerService } from '../screen-designer.service';
import { BlockService } from './services/blocks/block.service';
import { LanguageService } from './services/languages/language.service';
import { StylesService } from './services/styles/styles.service';
import { PanelService } from './services/panels/panel.service';
import { DataService } from '../../../shared/data.service';
import * as constant from '../../../assets/data/constant.json';
import * as langConstant from '../../../assets/data/language.json';
import * as styleConstant from '../../../assets/data/stylemanager-language';
import { SharedService } from '../../../shared/shared.service';
import * as generate from 'nanoid/generate';
import * as dictionary from 'nanoid-dictionary';
import { ProjectComponentService } from 'src/app/project-component/project-component.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TraitsService } from './services/traits/traits.service';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/config/Constant';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomTraitsService } from './services/traits/custom-traits.service';
import { CommandService } from './services/commands/command.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group
} from '@angular/animations';

declare var grapesjs: any;
@Component({
  selector: 'app-desktop-screen',
  templateUrl: './desktop-screen.component.html',
  styleUrls: ['./desktop-screen.component.scss'],
  animations: [
    trigger('openCloseMapping', [
      state(
        'openGrid',
        style({
          height: '*',
          opacity: '1'
        })
      ),
      state(
        'closeGrid',
        style({
          height: '0px',
          opacity: '0',
          display: 'none'
        })
      ),
      transition('openGrid => closeGrid', [animate('100ms ease-in')]),
      transition('closeGrid => openGrid', [animate('100ms ease-out')])
    ])
  ]
})
export class DesktopScreenComponent implements OnInit {
  editor: any;
  @ViewChild('myModal') myModal: ElementRef;
  public Editor = ClassicEditor;
  blocksOption: any[] = [
    {
      option: 'Basic Elements',
      value: ''
    },
    {
      option: 'Built-in Blocks',
      value: '2'
    }
  ];
  stylesOption: any[] = styleConstant.styleManagerEnglish;
  dataBindingTypes: any[] = [];
  agGridSelectedObject: any = {
    column: '',
    entityname: '',
    entityfield: ''
  };
  agGridArray: any[] = [];
  isMappingGrid: Boolean = false;
  defaultLanguage: String = 'en';
  saveTemplateURL: String;
  updateTemplateURL: String;
  allEntityField: any[] = [];
  selectedEntity: any;
  entityData: any;
  fields: any[] = [];
  EntityField: any[] = [];
  selectedProject: any;
  isFieldPopupModal: Boolean;
  agGridFields: FormGroup;
  entityFields: any = '';
  selectedFlow: any;
  is_grid_present: Boolean;
  agGridObject: any = {
    htmlId: '',
    componentId: '',
    entityId: '',
    custom_field: [],
    default_field: []
  };
  screenFlows: any[] = [];
  routeFlows: any[] = [];
  listOfFLows: any[] = [];
  gridApi: any;
  gridColumnApi: any;
  public isGridPopup: Boolean;
  currentAgGridData: any;
  defaultColumn: any;
  RemoteStorage: any;
  columnDefs: any;
  rowSelection: string;
  isLifeCycleRow: Boolean;
  defaultColDef: any;
  rowData: any;
  feature_id: String;
  project_id: String;
  selectedEntityModel: any;
  selectedHtmlElement: any = {
    htmlId: undefined,
    componentId: undefined,
    elementName: undefined
  };
  screenEntityModel: any[] = [];
  traitsName: string;
  screen_id: any;
  existScreenDetail: any;
  screenName: any;
  gridScript: any;
  ElementNameArray: any[] = [];
  screenType: String;
  screenOption: String = 'normal';
  screenArrayByProjectId: any;
  screenNameExist: Boolean = false;
  stylesheets: any[] = [];
  scripts: any[] = [];
  cssGuidelines: any[] = [];
  public verbOptions: any[] = [
    { key: 'click', value: 'onClick' },
    { key: 'focus', value: 'onFocus' },
    { key: 'blur', value: 'onBlur' }
  ];
  public componentVerbList: any[] = [
    { key: 'onload', value: 'onLoad' },
    { key: 'onchange', value: 'onChange' },
    { key: 'afterload', value: 'afterLoad' }
  ];
  public columnOptions = [
    { value: 'col1_id', name: 'a' },
    { value: 'col2_id', name: 'b' },
    { value: 'col3_id', name: 'c' },
    { value: 'col4_id', name: 'd' },
    { value: 'col5_id', name: 'e' }
  ];
  public routeDetails: any = {
    screen: '',
    verb: 'click',
    type: 'queryParameter',
    screenFlow: '',
    modalInfo: {
      entity: null,
      component: null,
      fields: null,
      modalBindInfo: []
    }
  };
  public buttonVerb: String = 'click';
  public componentVerb: String = 'onload';
  public selectedFlowObj: any = null;
  public isCustomPopup = false;
  public isConnectorPopup = false;
  public isLinkPopup = false;
  public componentLifeCycle: any[] = [];
  public customPopupModal: any = {
    name: '',
    title: '',
    dropdownLabelName: '',
    typeLabelName: '',
    entity: null
  };
  public specialEvents: any = [];
  public modalDroppedElements: any[] = [];
  public customEntityFields: any[] = [];

  public pageLinkObj = {
    linkType: '',
    isDynamic: false,
    externalURL: '',
    internalURL: null,
    flowList: [],
    flowObj: {},
    selectedEntity: undefined,
    paramEntity: null,
    entityField: [],
    selectedField: null,
    isParamMapping: false,
    paramArray: [],
    htmlId: '',
    componentId: '',
    elementName: ''
  };

  public paramArray: any = [];
  public linkArray: any[] = [];

  // default Names
  public GPROUTE_FLOWNAME = 'gproute';
  public GPMODAL_FLOWNAME = 'gpmodal';
  public MODAL_METHODNAME = 'popupModal';
  public ROUTE_METHODNAME = 'GpRoute';
  constructor(
    private screenDesignerService: ScreenDesignerService,
    private blockService: BlockService,
    private languageService: LanguageService,
    private styleService: StylesService,
    private panelService: PanelService,
    private traitService: TraitsService,
    private customTraitService: CustomTraitsService,
    private commandService: CommandService,
    private projectComponentService: ProjectComponentService,
    private dataService: DataService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        checkboxSelection: true,
        filter: 'agTextColumnFilter'
      },
      { headerName: 'Label', field: 'label', filter: 'agTextColumnFilter' },
      {
        headerName: 'Description',
        field: 'description',
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'Action',
        field: 'actionOnData',
        filter: 'agTextColumnFilter'
      }
    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      sortable: true,
      filter: true
    };
  }

  ngOnInit() {
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
      // if (params.screenOption !== undefined && params.screenOption !== null) {
      //     this.screenOption = params.screenOption;
      // }
    });
    this.stylesheets = JSON.parse(localStorage.getItem('stylesheets'));
    this.scripts = JSON.parse(localStorage.getItem('scripts'));
    this.cssGuidelines = JSON.parse(localStorage.getItem('css_guidelines'));
    this.isFieldPopupModal = false;
    this.isGridPopup = false;
    this.is_grid_present = false;

    this.agGridFields = this.formBuilder.group({
      selectColumn: ['', Validators.required],
      selectEntity: ['', Validators.required],
      selectField: ['', Validators.required]
    });
    this.saveTemplateURL = `${this.sharedService.Apigateway}${Constants.addScreen}`;
    this.updateTemplateURL = `${this.sharedService.Apigateway}${Constants.updateScreen}`;
    let addStyles = [];
    let addScripts = [];
    const plugins = ['grapesjs-preset-webpage'];
    const updateParams = {
      method: 'PATCH'
    };
    if (this.stylesheets) {
      addStyles = this.stylesheets;
    }
    if (this.scripts) {
      addScripts = this.scripts;
    }

    // mobile plugin
    grapesjs.plugins.add('mobile-plugin', function (editor, options) {
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
    // adding gep css
    addStyles.push(`./assets/css/gep-min.css`);
    this.editor = grapesjs.init({
      container: '#editor-c',
      height: '100%',
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
          isDev: 0,
          fonts: [],
          unsplash: constant['unsplash'],
          assetIcons: constant['assets'],
          updateParams: updateParams,
          labelTop: 'Top',
          labelRight: 'Right',
          labelBottom: 'Bottom',
          labelLeft: 'Left',
          labelWidth: 'Width',
          labelStyle: 'Style',
          labelColor: 'Fill Color',
          labelBorder: 'Border',
          labelBorderRadius: 'Border Radius',
          labelBackground: 'Background',
          labelShadow: 'Shadow',
          labelBoxShadow: 'Box Shadow',
          labelXpos: 'Offset X',
          labelYpos: 'Offset Y',
          labelBlur: 'Blur',
          labelSpread: 'Spread',
          labelShadowType: 'Shadow Type',
          labelTextShadow: 'Text Shadow',
          labelImage: 'Image',
          labelRepeat: 'Repeat',
          labelPosition: 'Position',
          labelAttachment: 'Attachment',
          labelSize: 'Size',
          labelExtra: 'Extra',
          labelOpacity: 'Opacity',
          labelBurgerMenu: 'Burger Menu',
          labelFont: 'Font',
          labelSlider: 'Slider',
          labelInputGroup: 'Input group',
          labelFormGroup: 'Form group',
          labelSelectOption: 'Select Option',
          labelSelect: 'Select',
          labelOptions: 'Options',
          labelOption: 'Option',
          labelMessage: 'Message',
          labelTextarea: 'Textarea',
          labelSend: 'Send',
          labelButton: 'Button',
          labelCheckbox: 'Checkbox',
          labelRadio: 'Radio',
          labelMethod: 'Method',
          labelAction: 'Action',
          labelFormActionPlh: '(default Grapedrop)',
          labelName: 'Name',
          labelFormNamePlh: 'eg. Top Form',
          labelState: 'State',
          labelStateNormal: 'Normal',
          labelStateSuccess: 'Success',
          labelStateError: 'Error',
          labelMsgSuccess: 'Thanks! We received your request',
          labelMsgError:
            'An error occurred on processing your request, try again!',
          labelPublish: 'Publish',
          labelTemplate: 'Template',
          labelTemplatePage: 'page',
          labelDataBind: 'Data Binding',
          labelDeleteAsset: 'Delete Asset',
          labelAreYouSureAsset:
            'This operation can&#039;t be undone. Are you sure?',
          labelCancel: 'Cancel',
          labelConfirm: 'Confirm'
        }
      },
      canvas: {
        styles: addStyles,
        scripts: addScripts
      },
      assetManager: {
        assets: [],
        upload:
          'https://grapedrop.com/asset-upload/ad8906ca2d4d4fcfb0c99f0a11082f4d',
        params: {},
        noAssets:
          '<div class="gjs-assets-empty"><i class="fa fa-picture-o"></i><br>No images, yet</div>',
        dropzoneContent:
          '<div class="gjs-dropzone-inner">Drop here your assets</div>'
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
      styleManager: {
        clearProperties: 1
      }
    });
    this.getScreenById();
    this.getFeatureById();
    this.getScreenByProjectId();
    this.traitService.initMethod(this);
    this.getEntity();
    this.getProjectDetails();
    this.addCustomBlocks();
    this.styleManager();
    this.panelManager();
    this.editorCommands();

    this.RemoteStorage = this.editor.StorageManager.get('remote');
    this.screenName = `screen${generate(dictionary.numbers, 6)}`;
    this.saveRemoteStorage();
    if (this.screenType === 'mobile') {
      this.editor.setDevice('Mobile');
    }
  }

  findEntity(screenInfo, event) {
    let findEntity = null;
    if (screenInfo.entity_info.length > 0) {
      findEntity = this.entityData.find(
        x => x._id === screenInfo.entity_info[0].entityId
      );
    } else if (
      screenInfo.entity_info.length === 0 &&
      screenInfo.grid_fields.entityId &&
      screenInfo.is_grid_present
    ) {
      findEntity = this.entityData.find(
        x => x._id === screenInfo.grid_fields.entityId
      );
    }
    if (findEntity) {
      this.customEntityFields = findEntity.field;
      return findEntity;
    } else {
      this.customEntityFields = [];
      return null;
    }
  }

  customModelChanged($event, action) {
    if (this.routeDetails.screen && this.routeDetails.screen !== 'null') {
      this.routeDetails.modalInfo.entity = this.findEntity(
        this.routeDetails.screen,
        'custom'
      );
    }
    const bindFields = {
      fieldId: '',
      fieldName: '',
      componentName: '',
      componentType: ''
    };
    if (action === 'components' && this.routeDetails.modalInfo.component.name) {
      const index = this.routeDetails.modalInfo.modalBindInfo.findIndex(
        x => x.componentName === this.routeDetails.modalInfo.component.name
      );
      bindFields.fieldId = this.routeDetails.modalInfo.fields._id;
      bindFields.fieldName = this.routeDetails.modalInfo.fields.name;
      bindFields.componentName = this.routeDetails.modalInfo.component.name;
      bindFields.componentType = this.routeDetails.modalInfo.component.type;
      this.routeDetails.modalInfo.modalBindInfo.push(bindFields);
    }
    if (this.routeDetails.modalInfo.entity === 'null') {
      this.routeDetails.modalInfo.componentId = null;
      this.routeDetails.modalInfo.fields = null;
    }
    this.ref.detectChanges();
  }

  onFieldOptions(event) {
    const agGridObject = {
      columnid: '',
      columnname: '',
      entity: '',
      entityfield: ''
    };
    if (
      this.agGridFields.value.selectColumn !== '' &&
      this.agGridFields.value.selectField !== ''
    ) {
      const isColExist = this.agGridArray.findIndex(
        x => x.columnid === this.agGridFields.value.selectColumn.value
      );
      if (isColExist > -1) {
        this.agGridArray.splice(isColExist, 1);
      }
      agGridObject.columnid = this.agGridFields.value.selectColumn.value;
      agGridObject.columnname = this.agGridFields.value.selectColumn.name;
      agGridObject.entity = this.selectedEntity.name;
      agGridObject.entityfield = this.agGridFields.value.selectField;
      this.agGridArray.push(agGridObject);
      this.ref.detectChanges();
    }
  }

  saveGridField() {
    this.dataService.setAgGridValue(this.agGridArray);
    this.agGridObject.custom_field = this.agGridArray;
    this.agGridObject.default_field = this.defaultColumn;
    this.saveRemoteStorage();
    this.onCloseHandled();
  }

  saveRemoteStorage() {
    this.RemoteStorage.set('params', {
      'component-lifecycle': this.componentLifeCycle,
      'special-events': this.specialEvents,
      grid_fields: this.agGridObject,
      flows_info: this.screenFlows,
      route_info: this.routeFlows,
      link_info: this.linkArray,
      screenName: this.screenName,
      is_grid_present: this.is_grid_present,
      entity_info: this.screenEntityModel,
      project: this.project_id,
      feature: this.feature_id,
      screenType: this.screenType,
      screenOption: this.screenOption
    });
  }

  // get screens by project id
  getScreenByProjectId() {
    this.screenDesignerService.getScreenByProjectId(this.project_id).subscribe(
      projectData => {
        if (projectData.body) {
          this.screenArrayByProjectId = projectData.body.filter(
            x => x.screenName !== this.screenName
          );
        }
      },
      error => { }
    );
  }

  getScreenById() {
    if (this.screen_id) {
      this.editor.StorageManager.get('remote').set({
        urlStore: `${this.updateTemplateURL}${this.screen_id}`
      });
      this.screenDesignerService.getScreenById(this.screen_id).subscribe(
        response => {
          if (response.body) {
            this.existScreenDetail = response.body;
            if (this.existScreenDetail[0]['gjs-components']) {
              this.feature_id = this.existScreenDetail[0]['feature'];
              this.project_id = this.existScreenDetail[0]['project'];
              this.screenName = this.existScreenDetail[0]['screenName'];
              this.is_grid_present = this.existScreenDetail[0][
                'is_grid_present'
              ];
              this.agGridObject = this.existScreenDetail[0]['grid_fields'];
              this.screenEntityModel = this.existScreenDetail[0]['entity_info'];
              this.screenFlows = this.existScreenDetail[0]['flows_info'];
              this.routeFlows = this.existScreenDetail[0]['route_info'];
              this.componentLifeCycle = this.existScreenDetail[0][
                'component-lifecycle'
              ];
              this.specialEvents = this.existScreenDetail[0]['special-events'];
              this.linkArray = this.existScreenDetail[0]['link_info'];
              // LOAD CUSTOM BLOCKS
              this.addGridBlocks();

              // change colname array
              if (
                this.agGridObject &&
                this.agGridObject.custom_field.length > 0
              ) {
                this.columnOptions = [];
                this.agGridObject.custom_field.forEach(customField => {
                  const temp = { value: '', name: '' };
                  temp.value = customField.columnid;
                  temp.name = customField.columnname;
                  this.columnOptions.push(temp);
                });
              }
              this.editor.setComponents(
                JSON.parse(this.existScreenDetail[0]['gjs-components'])
              );
              this.editor.setStyle(this.existScreenDetail[0]['gjs-css']);
            }
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

  getProjectFeatureFlows(projectFlowsID) {
    this.projectComponentService
      .getProjectFeatureFlows(projectFlowsID)
      .subscribe(
        data => {
          this.listOfFLows = data.body;
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

  getFeatureById() {
    if (this.feature_id) {
      this.projectComponentService.getFeatureById(this.feature_id).subscribe(
        featureData => {
          if (featureData.body) {
            this.getProjectFeatureFlows(featureData.body.flows);
          }
        },
        error => {
          console.error('cannot able to get the feature data');
        }
      );
    }
  }

  cancelEvent() {
    this.closeEventPopup();
  }

  closeEventPopup() {
    const eventPopupModel = <HTMLElement>document.querySelector('#EventPopup');
    eventPopupModel.style.display = 'none';
  }

  closeConnectorPopup() {
    this.isConnectorPopup = false;
  }

  saveCustomPopupInfo(flowName) {
    if (flowName === this.GPROUTE_FLOWNAME) {
      this.saveRouteDetails();
    } else if (flowName === this.GPMODAL_FLOWNAME) {
      this.saveModalDetails();
    }
    this.isCustomPopup = false;
    this.ref.detectChanges();
  }

  saveModalDetails() {
    const temp = {
      htmlId: '',
      componentId: '',
      elementName: '',
      screenId: '',
      screenName: '',
      methodName: '',
      type: '',
      modal: {
        entityId: '',
        entityName: '',
        bindInfo: []
      }
    };
    const findIndex = this.specialEvents.findIndex(
      x => x.elementName === this.editor.getSelected().attributes.name
    );
    if (findIndex > -1) {
      this.specialEvents.splice(findIndex, 1);
    }
    temp.htmlId = this.editor.getSelected().ccid;
    temp.componentId = this.editor.getSelected().cid;
    temp.elementName = this.editor.getSelected().attributes.name;
    temp.screenId = this.routeDetails.screen._id;
    temp.screenName = this.routeDetails.screen.screenName;
    temp.methodName = this.MODAL_METHODNAME;
    temp.type = 'modal';
    temp.modal.entityId = this.routeDetails.modalInfo.entity._id;
    temp.modal.entityName = this.routeDetails.modalInfo.entity.name;
    // bind fields
    temp.modal.bindInfo = this.routeDetails.modalInfo.modalBindInfo;
    this.specialEvents.push(temp);
    this.saveRemoteStorage();
  }

  saveRouteDetails() {
    const GetByIdFlowObj = this.listOfFLows.find(
      x => x.name === 'GpGetNounById'
    );
    const tempIndex = this.routeFlows.findIndex(
      x => x.elementName === this.editor.getSelected().attributes.name
    );
    if (tempIndex > -1) {
      this.routeFlows.splice(tempIndex, 1);
    }
    const routeObj = {
      htmlId: '',
      componentId: '',
      elementName: '',
      screenId: '',
      screenName: '',
      routeType: '',
      methodName: '',
      screenFlow: '',
      screenFlowName: ''
    };
    routeObj.htmlId = this.editor.getSelected().ccid;
    routeObj.componentId = this.editor.getSelected().cid;
    routeObj.elementName = this.editor.getSelected().attributes.name;
    routeObj.screenId = this.routeDetails.screen._id;
    routeObj.screenName = this.routeDetails.screen.screenName;
    routeObj.routeType = this.routeDetails.type;
    // add the routing method name
    routeObj.methodName = this.ROUTE_METHODNAME;
    // add the screensflow
    if (this.routeDetails.screenFlow) {
      routeObj.screenFlow = this.routeDetails.screenFlow.flow;
      routeObj.screenFlowName = this.routeDetails.screenFlow.flowName;
    }
    this.routeFlows.push(routeObj);
    this.saveRemoteStorage();
    this.isCustomPopup = false;
  }

  closeCustomPopup() {
    this.isCustomPopup = false;
    this.isMappingGrid = false;
    this.ref.detectChanges();
  }

  // save event flows
  saveEvent() {
    let temp = null;
    if (this.isLifeCycleRow) {
      this.saveLifeCycleFlows();
    } else if (
      this.selectedFlow &&
      this.selectedFlow[0].name.toLowerCase() === this.GPROUTE_FLOWNAME
    ) {
      this.customPopupModal.name = this.GPROUTE_FLOWNAME;
      this.customPopupModal.title = 'Routes';
      this.customPopupModal.dropdownLabelName = 'Screen';
      this.customPopupModal.typeLabelName = 'Type';
      this.customPopupModal.entity = null;
      this.isCustomPopup = true;
    } else {
      if (this.buttonVerb) {
        temp = this.buttonVerb;
      }
      this.saveFlowDetails(temp);
    }
    this.closeEventPopup();
  }

  saveLifeCycleFlows() {
    const lifeCycleIndex = this.componentLifeCycle.findIndex(
      x => x.flowId === this.selectedFlow[0]._id
    );
    if (lifeCycleIndex > -1) {
      this.componentLifeCycle.splice(lifeCycleIndex, 1);
    }
    const temp = {
      flowId: this.selectedFlow[0]._id,
      flowName: this.selectedFlow[0].name,
      verb: this.componentVerb
    };
    this.componentLifeCycle.push(temp);
    const flowIndex = this.checkIfFlowExist(temp.flowId, null);
    if (flowIndex < 0) {
      const flowTemp = {
        htmlId: '',
        componentId: '',
        elementName: '',
        verb: '',
        flow: '',
        flowName: ''
      };
      flowTemp.flow = temp.flowId;
      flowTemp.flowName = temp.flowName;
      this.screenFlows.push(flowTemp);
    }
    this.saveRemoteStorage();
  }

  checkIfFlowExist(flowId, elementName) {
    if (flowId != null && elementName != null) {
      return this.screenFlows.findIndex(
        x => x.flow === flowId && x.elementName === elementName
      );
    } else if (flowId != null && elementName == null) {
      return this.screenFlows.findIndex(x => x.flow === flowId);
    } else if (flowId == null && elementName != null) {
      return this.screenFlows.findIndex(x => x.elementName === elementName);
    }
  }

  // save flow details
  saveFlowDetails(verbInfo) {
    const flowObj = {
      htmlId: '',
      componentId: '',
      elementName: '',
      verb: '',
      flow: '',
      flowName: ''
    };
    flowObj.htmlId = this.editor.getSelected().ccid;
    flowObj.componentId = this.editor.getSelected().cid;
    flowObj.elementName = this.editor.getSelected().attributes.name;
    if (verbInfo) {
      flowObj.verb = verbInfo;
    }
    flowObj.flow = this.selectedFlow[0]._id;
    flowObj.flowName = this.selectedFlow[0].name;
    // remove flows if it present without elementName
    const flowIndex = this.checkIfFlowExist(flowObj.flow, '');
    if (flowIndex > -1) {
      this.screenFlows.splice(flowIndex, 1);
    }
    // remove flows if the elementName is already present
    const isFlowExist = this.checkIfFlowExist(
      null,
      this.editor.getSelected().attributes.name
    );
    if (isFlowExist > -1) {
      this.screenFlows.splice(isFlowExist, 1);
    }
    this.screenFlows.push(flowObj);
    this.saveRemoteStorage();
  }

  onSelectionChanged() {
    this.selectedFlow = this.gridApi.getSelectedRows();
  }

  getEntity() {
    if (this.project_id !== undefined && this.feature_id !== undefined) {
      this.projectComponentService
        .getEntityByFeatureId(this.feature_id)
        .subscribe(
          response => {
            this.entityData = response.body;
            if (
              this.entityData !== null &&
              this.entityData !== undefined &&
              this.entityData.length > 0
            ) {
              const entityArray = [];
              entityArray.push({ name: 'none', value: 'none' });
              this.EntityField = this.entityData;
              this.entityData.forEach(entityElement => {
                const object = {
                  name: '',
                  value: ''
                };
                object.name = entityElement.name;
                object.value = entityElement._id;
                entityArray.push(object);
              });
              this.traitsName = 'entity';
              this.dataBindingTypes = entityArray;
              this.setDefaultType();
            }
          },
          error => { }
        );
    } else {
      this.projectComponentService
        .getEntityByProjectId(this.project_id)
        .subscribe(
          response => {
            const allEntityData = response.body;
            if (
              allEntityData !== null &&
              allEntityData !== undefined &&
              allEntityData.length > 0
            ) {
              const entityArray = [];
              entityArray.push({ name: 'none', value: 'none' });
              this.EntityField = allEntityData;
              allEntityData.forEach(entityElement => {
                const object = {
                  name: '',
                  value: ''
                };
                object.name = entityElement.name;
                object.value = entityElement._id;
                entityArray.push(object);
              });
              this.traitsName = 'entity';
              this.dataBindingTypes = entityArray;
              this.setDefaultType();
            }
          },
          error => { }
        );
    }
  }

  setDefaultType() {
    this.agGridArray = [];
    // add rows trits
    this.customTraitService.addGridRowButton(this);
    // remove rows triats
    this.customTraitService.removeGridRowButton(this);
    // add field binding button
    this.customTraitService.gridFieldButton(this);
    // custom traits for grid action buttons
    this.customTraitService.RouteActionButton(this);
    // custom traits for entity field button
    this.customTraitService.entityFieldButton(this);
    // custom traits for content textarea
    this.customTraitService.content(this);
    // custom traits for flows action button
    this.customTraitService.flowsActionButton(this);
    // custom traits for page flow action button
    this.customTraitService.MultiflowsActionButton(this);
    // custom traits for popup modal button
    this.customTraitService.popupModalButton(this);

    // add traits at the state of initialization
    this.editor.DomComponents.getWrapper()
      .get('traits')
      .add([
        {
          type: 'select',
          label: 'verb',
          name: 'componentVerb',
          changeProp: 1,
          options: this.componentVerbList
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
  // set component element css based on cssGuideLines
  setElementCSS(element, tagName, removeTagClassName) {
    const gepStyle = JSON.parse(localStorage.getItem('templateparser'));
    const temp = this.cssGuidelines.find(x => x.tagName === tagName);
    if (temp) {
      element.addClass(temp.className);
    } else if (gepStyle && gepStyle.length > 0) {
      gepStyle.forEach(gepEle => {
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
      if (removeTemp) {
        element.removeClass(removeTemp.className);
      }
    }
  }

  getProjectDetails() {
    this.dataService.currentDefaultLanguage.subscribe(
      data => {
        this.defaultLanguage = data;
      },
      error => {
        console.error('error occurred: cannot get project Details ', error);
      }
    );
  }

  addGridBlocks() {
    this.blockService.addAgGrid(this);
  }

  addCustomBlocks() {
    this.blockService.addCKeditor5(this.editor);
    this.blockService.addUpload(this.editor);
    this.blockService.addDownload(this.editor);
    this.blockService.addPopupModal(this.editor);
    this.blockService.addSpecialDropdown(this.editor);
    this.blockService.addSpecialCharts(this.editor);
    this.addGridBlocks();
  }

  declareBlockLanguage() {
    let langArray = langConstant['Blocks-English'];
    langConstant['different-languages'].forEach(element => {
      if (this.defaultLanguage.toLowerCase() === element.keywords) {
        langArray = langConstant['default'][element.field];
        this.blocksOption = element.options;
        this.stylesOption = styleConstant[element.styleFieldName];
      }
    });
    this.languageService.setBlockLanguage(this.editor, langArray);
  }
  styleManager() {
    this.styleService.addStyleManager(this.editor, this.stylesOption);
  }
  panelManager() {
    this.panelService.addSaveButton(this.editor);
    this.panelService.addCancelButton(this.editor);
  }

  editorCommands() {
    this.commandService.componentSelected(this);
    this.commandService.toggle(this);
    this.commandService.removeComponent(this);
    this.commandService.updateComponentName(this);
    this.commandService.updateTraits(this);
    this.commandService.dragAndDrop(this);
  }

  saveLinkDetails() {
    const linkInformation: any = {
      linkType: '',
      isDynamic: false,
      externalURL: null,
      internalURL: {
        screenId: '',
        screenName: ''
      },
      entity: {
        id: '',
        name: '',
        fieldId: '',
        fieldName: ''
      },
      paramArray: [],
      htmlId: '',
      componentId: '',
      elementName: '',
      paramType: 'queryParameter'
    };
    // this.resetLinkDetails(this.pageLinkObj.linkType);
    const findIndex = this.linkArray.findIndex(
      x => x.elementName === this.editor.getSelected().attributes.name
    );
    if (findIndex > -1) {
      this.linkArray.splice(findIndex, 1);
    }
    linkInformation.htmlId = this.editor.getSelected().ccid;
    linkInformation.componentId = this.editor.getSelected().cid;
    linkInformation.elementName = this.editor.getSelected().attributes.name;
    linkInformation.linkType = this.pageLinkObj.linkType;
    linkInformation.isDynamic = this.pageLinkObj.isDynamic;
    linkInformation.externalURL = this.pageLinkObj.externalURL;
    if (this.pageLinkObj.internalURL) {
      linkInformation.internalURL.screenId = this.pageLinkObj.internalURL._id;
      linkInformation.internalURL.screenName = this.pageLinkObj.internalURL.screenName;
    }
    if (this.pageLinkObj.selectedEntity) {
      linkInformation.entity.id = this.pageLinkObj.selectedEntity._id;
      linkInformation.entity.name = this.pageLinkObj.selectedEntity.name;
    } else if (this.pageLinkObj.paramEntity) {
      linkInformation.entity.id = this.pageLinkObj.paramEntity._id;
      linkInformation.entity.name = this.pageLinkObj.paramEntity.name;
    }
    if (this.pageLinkObj.selectedField) {
      linkInformation.entity.fieldId = this.pageLinkObj.selectedField._id;
      linkInformation.entity.fieldName = this.pageLinkObj.selectedField.name;
    }
    if (this.pageLinkObj.paramArray.length > 0) {
      linkInformation.paramArray = this.pageLinkObj.paramArray;
    }

    this.linkArray.push(linkInformation);
    this.removeLinkEntityTraits();
    this.isLinkPopup = false;
    this.pageLinkObj = {
      linkType: '',
      isDynamic: false,
      externalURL: '',
      internalURL: null,
      flowList: [],
      flowObj: {},
      selectedEntity: undefined,
      paramEntity: null,
      entityField: [],
      selectedField: null,
      isParamMapping: false,
      paramArray: [],
      htmlId: '',
      componentId: '',
      elementName: ''
    };

    this.saveRemoteStorage();
    this.ref.detectChanges();
  }

  removeLinkEntityTraits() {
    const temp = this.editor
      .getSelected()
      .get('traits')
      .filter(trait => {
        if (
          trait.attributes.name === 'entity' ||
          trait.attributes.name === 'field'
        ) {
          return true;
        }
      });
    if (temp && temp.length > 0) {
      temp.forEach(element => {
        this.editor
          .getSelected()
          .get('traits')
          .remove(element);
      });
    }
    this.editor.TraitManager.getTraitsViewer().render();
  }

  addLinkParams() {
    this.pageLinkObj.paramArray.push({
      name: null,
      fieldName: null
    });
    this.ref.detectChanges();
  }
  removeLinkParams(index) {
    this.pageLinkObj.paramArray.splice(index, 1);
    this.ref.detectChanges();
  }

  resetLinkDetails(type) {
    switch (type) {
      case 'internal':
        this.pageLinkObj.externalURL = '';
        this.pageLinkObj.paramArray = [];
        break;
      case 'external':
        this.pageLinkObj.internalURL = null;
        this.pageLinkObj.paramArray = [];
        this.pageLinkObj.paramEntity = null;
        break;
      default:
        this.pageLinkObj.internalURL = null;
        this.pageLinkObj.externalURL = '';
        this.pageLinkObj.paramArray = [];
        break;
    }
  }

  changeLinkDetails(event) {
    if (event === 'none' || event === 'internal' || event === 'external') {
      this.resetLinkDetails(event);
    } else if (event === 'flow') {
    } else if (event.toLowerCase() === 'paramentity') {
      this.pageLinkObj.entityField = this.pageLinkObj.paramEntity.field;
    }
    if (event.toLowerCase() === 'internalpage') { } else { }
    this.ref.detectChanges();
  }

  onCloseLink() {
    this.isLinkPopup = false;
    this.ref.detectChanges();
  }

  onCloseHandled() {
    this.isGridPopup = false;
    this.allEntityField = [];
    this.isMappingGrid = false;
    this.ref.detectChanges();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
  }

  onCloseModel() {
    this.entityFields = '';
    this.isFieldPopupModal = false;
    this.ref.detectChanges();
  }

  // save entity for form
  saveFieldPopup() {
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
      obj.htmlId = this.editor.getSelected().ccid;
      obj.componentId = this.editor.getSelected().cid;
      obj.elementName = this.editor.getSelected().attributes.name;
      obj.entityId = this.selectedEntityModel;
      obj.fields.fieldId = this.entityFields._id;
      obj.fields.name = this.entityFields.name;
      obj.fields.description = this.entityFields.description;
      obj.fields.typeName = this.entityFields.type_name;
      obj.fields.dataType = this.entityFields.data_type;
      this.screenEntityModel.push(obj);
    }

    this.saveRemoteStorage();
    this.onCloseModel();
  }

  isScreenNameExist() {
    const index = this.screenArrayByProjectId.findIndex(
      x => x.screenName === this.screenName && x._id !== this.screen_id
    );
    if (index > -1) {
      this.screenNameExist = true;
    } else {
      this.screenNameExist = false;
    }
  }

  closeScreeName() {
    const model = document.getElementById('myModal');
    model.style.display = 'none';
    const saveButton = this.editor.Panels.getButton('options', 'save-page');
    saveButton.set('active', 0);
  }

  updateScreeName() {
    const $this = this;
    this.saveRemoteStorage();
    this.createFeatureIfNotExist();
    this.closeScreeName();
    this.editor.on('storage:response', function (e) {
      $this.screen_id = e.body._id;
      $this.getScreenById();
    });
  }
  createFeatureIfNotExist() {
    const currentStorageDetails = this.editor.StorageManager.getCurrentStorage();
    const saveButton = this.editor.Panels.getButton('options', 'save-page');
    if (this.project_id !== undefined && this.feature_id !== undefined) {
      this.editor.store();
      saveButton.set('active', 0);
    } else if (this.screen_id !== undefined) {
      this.editor.store();
      saveButton.set('active', 0);
    } else {
      const featureDetailObj = {
        name: `Feature_${generate(dictionary.numbers, 6)}`,
        description: `This Feature has been created from screen designer`,
        project: this.project_id
      };
      this.projectComponentService.saveFeatures(featureDetailObj).subscribe(
        featureData => {
          currentStorageDetails.attributes.params.feature =
            featureData.body._id;
          this.editor.store();
          saveButton.set('active', 0);
        },
        error => {
          console.log('feature cannot able to save from screens');
        }
      );
    }
  }

  toggleMapping() {
    this.isMappingGrid = !this.isMappingGrid;
    this.ref.detectChanges();
  }
}
