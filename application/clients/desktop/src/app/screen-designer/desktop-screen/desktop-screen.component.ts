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
// import gjsWebPage from 'grapesjs-preset-webpage';

import * as constant from '../../../assets/data/constant.json';
import * as langConstant from '../../../assets/data/language.json';
import * as styleConstant from '../../../assets/data/stylemanager-language';

import { SharedService } from '../../../shared/shared.service';
import * as generate from 'nanoid/generate';

import * as dictionary from 'nanoid-dictionary';
import { ProjectComponentService } from 'src/app/project-component/project-component.service';
import { FlowManagerService } from 'src/app/flow-manager/flow-manager.service';
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

import { Dataservice } from '../../broadcast.service';
import { NgxSpinnerService } from "ngx-spinner";

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
  selectedentityfield: any;
  EntityField: any[] = [];
  selectedProject: any;
  isFieldPopupModal: Boolean;
  agGridFields: FormGroup;
  entityFields: any = {
    entityfieldname: '',
    entityId: ''
  };
  selectedFlow: any;
  is_grid_present: Boolean;
  is_bootStrapTable_present: Boolean;
  agGridObject: any = {
    htmlId: '',
    componentId: '',
    entityId: '',
    custom_field: [],
    default_field: [],
    event: ''
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
  // template_css: any[] = [];
  scripts: any[] = [];
  logId = sessionStorage.getItem('LogId');
  templateName: String;
  cssGuidelines: any[] = [];
  public verbOptions: any[] = [
    { key: 'click', value: 'onClick' },
    // { key: "focus", value: "onFocus" },
    // { key: "blur", value: "onBlur" }
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
  public selectedcolumn: any;
  public selectedaggridentity: any = {
    entityfieldname: ''
  };
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

  specific_attribute_Event: any[] = [];
  public paramArray: any = [];

  // public linkInformation: any = {
  //     linkType: '',
  //     externalURL: null,
  //     internalURL: {
  //         screenId: '',
  //         screenName: ''
  //     },
  //     entity: {
  //         id: '',
  //         name: '',
  //         fieldId: '',
  //         fieldName: ''
  //     },
  //     isDynamic: false,
  //     paramArray: [],
  //     htmlId: '',
  //     componentId: '',
  //     elementName: ''
  // };
  public entitydetails: any;
  public linkArray: any[] = [];
  public selectentityarray: any[] = [];

  // default Names
  public GPROUTE_FLOWNAME = 'gproute';
  public GPMODAL_FLOWNAME = 'gpmodal';
  public MODAL_METHODNAME = 'popupModal';
  public ROUTE_METHODNAME = 'GpRoute';
  public matchedentity: any;
  public allflowlist: any;
  public featurelist: any;

  public eventObj = {
    htmlId: '',
    componentId: '',
    elementName: '',
    selected_event: ''
  };
  isTemplateEdit: boolean = false;
  templateObj: {
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
  modifyTemplateUrl: string;
  projectTemplateId: any;


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
    private flowManagerService: FlowManagerService,
    private dataService: DataService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    public broadcast: Dataservice,
    private spinner: NgxSpinnerService
  ) {
    this.columnDefs = [
      {
        cellRenderer: this.checkboxCellRenderer,
        width: 105
      },
      {
        headerName: 'Name',
        field: 'name',
        filter: 'agTextColumnFilter'
      },
      { headerName: 'Label', field: 'label', filter: 'agTextColumnFilter' },
      {
        headerName: 'Action',
        field: 'actionOnData',
        filter: 'agTextColumnFilter',
        width: 230
      }
    ];
    this.rowSelection = 'single';
    this.defaultColDef = {
      sortable: true,
      filter: true
    };

    this.broadcast.data.subscribe(eventchange => {
      console.log('eventchange value trigger value-----------', typeof eventchange);
      if (Object.keys(eventchange).length !== 0) {
        this.saveEventdetails(eventchange);
      }
    });
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
      if (params['project-template-id']) {
        this.isTemplateEdit = true;
        this.projectTemplateId = params['project-template-id'];
        this.getProjectTemplate(this.projectTemplateId);
      }
      // if (params.screenOption !== undefined && params.screenOption !== null) {
      //     this.screenOption = params.screenOption;
      // }
    });
    this.stylesheets = JSON.parse(localStorage.getItem('stylesheets'));
    this.scripts = JSON.parse(localStorage.getItem('scripts'));
    this.cssGuidelines = JSON.parse(localStorage.getItem('css_guidelines'));
    this.templateName = localStorage.getItem('templateName').toLocaleLowerCase().replace(' ', '');
    this.isFieldPopupModal = false;
    this.isGridPopup = false;
    this.is_grid_present = false;
    this.is_bootStrapTable_present = false;

    this.agGridFields = this.formBuilder.group({
      selectColumn: ['', Validators.required],
      selectEntity: ['', Validators.required],
      selectField: ['', Validators.required]
    });
    this.saveTemplateURL = `${this.sharedService.Apigateway}${Constants.addScreen}`;
    this.updateTemplateURL = `${this.sharedService.Apigateway}${Constants.updateScreen}`;
    this.modifyTemplateUrl = `${this.sharedService.Apigateway}${Constants.updateProjectTemplate}`;
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


    // desktop plugins
    grapesjs.plugins.add('desktop-plugin', function (editor, options) {
      // remove the devices switcher
      // editor.getConfig().showDevices = false;
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
    grapesjs.plugins.add('mobile-plugin', function (editor, options) {
      // remove the devices switcher
      // editor.getConfig().showDevices = false;
      console.log('mobile plugins editor are --11-- ', editor);
      console.log('mobile plugins options are --22-- ', options);
      // editor.getConfig().deviceManager.devices = [{
      //     name: 'Mobile',
      //     width: '568px',
      //     widthMedia: '768px'
      // },
      // {
      //     name: 'Mobile',
      //     width: '320px',
      //     widthMedia: '480px'
      // }];
      // remove the view code button
      // const codeButton = editor.Panels.getButton("options", "undo-options");
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
      console.log('desktop button plugin adding ----- ', desktopButton);
      console.log('tabletButton button plugin adding ----- ', tabletButton);
      console.log('mobileButton button plugin adding ----- ', mobileButton);
      console.log(
        'mobileButton button plugin adding ---22-- ',
        editor.Panels.getPanelsEl()
      );
      console.log(
        'mobileButton button plugin adding ---33-- ',
        editor.Panels.getPanel('devices-c')
      );
      // desktopButton.collection.remove(desktopButton);
      // tabletButton.collection.remove(tabletButton);
      mobileButton.set('active', 1);
    });
    if (this.screenType === 'mobile') {
      plugins.push('mobile-plugin');
    } else {
      // plugins.push('desktop-plugin');
    }
    console.log('plugins list before set grapesjs are ----  ', plugins);
    // adding gep css
    addStyles.push(`./assets/css/template/${this.templateName.replace(/ +/g, "")}.css`);
    console.log('--------template css file location--------', addStyles);
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
        clearProperties: 1,
      }
    });

    // this.editor.BlockManager.getAll().remove('column3-7');
    // this.editor.BlockManager.getAll().remove('column3');
    // this.editor.BlockManager.getAll().remove('column2');

    const comps = this.editor.DomComponents;
    this.editor.DomComponents.Component.createId = function (model) {
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
    // this.getEntity();

    // Need to set generated id while component creation
    this.editor.on('component:create', component => {
      component.setId(component.getId());
    });
    this.getScreenById();
    this.getFeatureById();
    this.getScreenByProjectId();
    this.traitService.initMethod(this);
    this.getEntityType();
    this.getAllFlows();
    this.getProjectDetails();
    this.addCustomBlocks();
    // this.declareBlockLanguage();
    this.styleManager();
    this.panelManager();
    this.editorCommands();

    this.RemoteStorage = this.editor.StorageManager.get('remote');
    this.screenName = `screen${generate(dictionary.numbers, 6)}`;
    this.saveRemoteStorage();
    if (this.screenType === 'mobile') {
      this.editor.setDevice('Mobile');
    }
    this.setImportOption();
  }
  getProjectTemplate(id) {
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
    }, err => {
      this.spinner.hide();
    });
  }
  setImportOption() {
    const pfx = this.editor.getConfig().stylePrefix;
    const modal = this.editor.Modal;
    const cmdm = this.editor.Commands;
    const codeViewer = this.editor.CodeManager.getViewer('CodeMirror').clone();
    const pnm = this.editor.Panels;
    const container = document.createElement('div');
    const btnEdit = document.createElement('button');
    const _this = this;

    codeViewer.set({
      codeName: 'htmlmixed',
      readOnly: 0,
      theme: 'hopscotch',
      autoBeautify: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      styleActiveLine: true,
      smartIndent: true,
      indentWithTabs: true
    });

    btnEdit.innerHTML = 'Import';
    btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import';
    btnEdit.onclick = function () {
      const code = codeViewer.editor.getValue();
      _this.editor.DomComponents.getWrapper().set('content', '');
      _this.editor.setComponents(code.trim());
      modal.close();
    };

    cmdm.add('html-import', {
      run: function (editor, sender) {
        sender.set('active', 0);
        let viewer = codeViewer.editor;
        modal.setTitle('Edit code');
        if (!viewer) {
          const txtarea = document.createElement('textarea');
          container.appendChild(txtarea);
          container.appendChild(btnEdit);
          codeViewer.init(txtarea);
          viewer = codeViewer.editor;
        }
        modal.setContent('');
        modal.setContent(container);
        codeViewer.setContent('');
        modal.open();
        viewer.refresh();
      }
    });

    pnm.addButton('options', [
      {
        id: 'import',
        className: 'fa fa-download',
        command: 'html-import',
        attributes: {
          title: 'Import Your Template'
        }
      }
    ]);
  }

  findEntity(screenInfo, event) {
    let findEntity = null;
    // console.log()
    if (screenInfo.entity_info.length > 0) {
      // routeDetails.modalInfo.entity
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
      // if (event === 'custom') {
      //     this.routeDetails.modalInfo.entity = findEntity;
      // }
      this.customEntityFields = findEntity.field;
      return findEntity;
    } else {
      // if (event === 'custom') {
      //     this.routeDetails.modalInfo.entity = null;
      // }
      this.customEntityFields = [];
      return null;
    }
  }

  customModelChanged($event, action) {
    console.log(
      'model changed ----- customModelChanged',
      ' ----- ',
      this.routeDetails.modalInfo
    );
    console.log(
      'model changed ----- customModelChanged screenDetails',
      ' ----- ',
      this.routeDetails
    );
    console.log('entity modal entityData info are ----- ', this.entityData);
    if (this.routeDetails.screen && this.routeDetails.screen !== 'null') {
      this.routeDetails.modalInfo.entity = this.findEntity(
        this.routeDetails.screen,
        'custom'
      );
      console.log('final afet seti --- ', this.routeDetails.modalInfo.entity);
    }
    console.log(
      'after set the routedetails values are-----  ',
      this.routeDetails
    );
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
      // if (index > -1) {
      //     this.routeDetails.modalInfo.modalBindInfo.splice(index, 1);
      // }
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
    // tslint:disable-next-line:max-line-length
    console.log(
      'final routeDetails details are ----  ',
      this.routeDetails,
      ' ---componentname-- ',
      this.routeDetails.modalInfo.component
    );
    this.ref.detectChanges();
  }

  /* This method is used to bind the entity field for the ag-grid component so based on the column selected we will
  show the entity field if that column has entity field mapped to it. For more info check github issue #355 Dev Kishan May 28th 2020 */
  onColumnChange(event) {
    this.selectedcolumn = event;
    const customfields = this.agGridObject.custom_field;
    const selectedentityfield = customfields.find(x => x.columnname === this.selectedcolumn.name);
    this.agGridFields.controls['selectField'].setValue(selectedentityfield.entityfield);
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
      console.log('added gridarray value are ------  ', this.agGridArray);
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

  saveRemoteStorage(params = {}) {
    if (Object.keys(params).length > 0) {
      this.RemoteStorage.set('params', params);
      this.editor.StorageManager.get('remote').set({
        urlStore: `${this.modifyTemplateUrl}/${this.templateObj._id}?log_id=${this.logId}`,
      });
    } else {
      this.RemoteStorage.set('params', {
        'component-lifecycle': this.componentLifeCycle,
        'special-events': this.specialEvents,
        grid_fields: this.agGridObject,
        flows_info: this.screenFlows,
        route_info: this.routeFlows,
        link_info: this.linkArray,
        screenName: this.screenName,
        is_grid_present: this.is_grid_present,
        is_bootStrapTable_present: this.is_bootStrapTable_present,
        entity_info: this.screenEntityModel,
        project: this.project_id,
        feature: this.feature_id,
        screenType: this.screenType,
        screenOption: this.screenOption,
        specific_attribute_Event: this.specific_attribute_Event
      });
    }
    // console.log('REMOTE STORAGE---->>>>', this.RemoteStorage.get('params'));
    // console.log('CURRENT STORAGE---->>>>', this.editor.StorageManager.getCurrentStorage())
  }

  // get screens by project id
  getScreenByProjectId() {
    this.screenDesignerService.getScreenByProjectId(this.project_id, this.logId).subscribe(
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
    console.log('get screen by id are ------   ', this.screen_id);
    console.log('==========screenName=========', this.screenName);
    console.log('------------ remote', this.editor.StorageManager.get('remote'));
    console.log('+++++++++', this.updateTemplateURL);
    if (this.screen_id) {
      this.spinner.show();
      this.editor.StorageManager.get('remote').set({
        urlStore: `${this.updateTemplateURL}${this.screen_id}`,
      });

      this.screenDesignerService.getScreenById(this.screen_id, this.logId).subscribe(
        response => {
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
              this.is_grid_present = this.existScreenDetail[0][
                'is_grid_present'
              ];
              this.is_bootStrapTable_present = this.existScreenDetail[0][
                'is_bootStrapTable_present'
              ];
              this.agGridObject = this.existScreenDetail[0]['grid_fields'];
              this.screenEntityModel = this.existScreenDetail[0]['entity_info'];
              this.screenFlows = this.existScreenDetail[0]['flows_info'];
              this.routeFlows = this.existScreenDetail[0]['route_info'];
              this.componentLifeCycle = this.existScreenDetail[0][
                'component-lifecycle'
              ];
              this.specialEvents = this.existScreenDetail[0]['special-events'];
              this.specific_attribute_Event = this.existScreenDetail[0]['specific_attribute_Event'];
              this.linkArray = this.existScreenDetail[0]['link_info'];
              // console.log('after get scrende id ------ ', this.linkInformation);
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
                console.log(' gjs component------------ value -------', this.agGridObject);
              }
              this.editor.setComponents(
                JSON.parse(this.existScreenDetail[0]['gjs-components'])
              );
              this.editor.setStyle(this.existScreenDetail[0]['gjs-css']);
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



  getEntityType() {
    this.projectComponentService.getAllEntityType(this.logId).subscribe(
      data => {
        if (data.body) {
          data.body.forEach(element => {
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

  getAllFlows() {
    this.flowManagerService.getAllFlows(this.logId).subscribe((flowData) => {
      this.allflowlist = flowData.body;
    }, (error) => {
      console.log('cannot get flows in screen designer ', error);
    });
  }

  getProjectFeatureFlows(projectFlowsID) {
    this.projectComponentService
      .getProjectFeatureFlows(projectFlowsID, this.logId)
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
    console.log(
      'save custom popup info ----  ',
      flowName,
      ' --routeDetails--  ',
      this.routeDetails
    );
    if (flowName === this.GPROUTE_FLOWNAME) {
      this.saveRouteDetails();
    } else if (flowName === this.GPMODAL_FLOWNAME) {
      this.saveModalDetails();
    }
    this.isCustomPopup = false;
    this.ref.detectChanges();
  }

  saveModalDetails() {
    console.log('save modal details are ---- ', this.routeDetails);
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
    // console.log('---------entity temp details----------', temp);
    // const bindFields = {
    //     fieldId: '',
    //     fieldName: '',
    //     componentName: ''
    // };
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
    console.log('after added final resutlt are --- ', this.specialEvents);
    this.saveRemoteStorage();
  }

  saveRouteDetails() {
    const GetByIdFlowObj = this.listOfFLows.find(
      x => x.name === 'GpGetNounById'
    );
    const tempIndex = this.routeFlows.findIndex(
      x => x.elementName === this.editor.getSelected().attributes.name
    );
    console.log('save route details tempIndex are ------   ', tempIndex);
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

    // update the screen with getnounbyid flow
    if (routeObj.screenId) {
      this.getscreendetailsbyid(routeObj.screenId);
    }
    // add the routing method name
    routeObj.methodName = this.ROUTE_METHODNAME;
    // add the screensflow
    if (this.routeDetails.screenFlow) {
      console.log('------------flow details---------', this.routeDetails.screenFlow);
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
      this.selectedFlow[0].name.toLowerCase() === this.GPROUTE_FLOWNAME || this.selectedFlow[0].name === 'GpSearchForUpdate'
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
    console.log('save lifecyle flows are -----  ', this.selectedFlow);
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
      console.log('----Kishan---flow------', flowTemp);
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
      event: '',
      flow: '',
      flowName: ''
    };
    flowObj.htmlId = this.editor.getSelected().ccid;
    flowObj.componentId = this.editor.getSelected().cid;
    flowObj.elementName = this.editor.getSelected().attributes.name;
    if (verbInfo) {
      flowObj.verb = verbInfo;
    }
    if (this.editor.getSelected().attributes.type === 'dynamicdropdown-type') {
      flowObj.event = this.eventObj.selected_event;
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
    console.log('-------grid flowobject------', flowObj);
    this.screenFlows.push(flowObj);
    this.saveRemoteStorage();
  }

  // tslint:disable-next-line: max-line-length
  /* This method is used for the checkbox shown in the aggrid for the
  flows. For more details refer issue #381 in github developer is Kishan 21May2020 */
  checkboxCellRenderer(params) {
    const input = document.createElement('input');
    input.type = 'checkbox';
    return input;
  }

  // tslint:disable-next-line: max-line-length
  /* This method is used on the selection change in row and also uncheck
  the checkbox if upon change on the selection. For more details refer
  issue #381 in github developer is Kishan 21May2020 */
  onSelectionChanged(event) {
    let rows: any;
    rows = event.api.getCellRendererInstances();
    this.selectedFlow = this.gridApi.getSelectedRows();
    Object.keys(rows).forEach(k => {
      if (this.selectedFlow.length > 0) {
        if (rows[k].params.node.selected === true) {
          rows[k].params.eGridCell.children[0].checked = true;
        } else {
          rows[k].params.eGridCell.children[0].checked = false;
        }
      }
    });

  }

  getEntity(featureObject) {
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
              const entityArray = [];
              entityArray.push({ name: 'none', value: 'none' });
              this.EntityField = this.entityData;
              featureObject.entities.forEach(entity => {
                this.entityData.forEach(entityElement => {
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
              const entityArray = [];
              entityArray.push({ name: 'none', value: 'none' });
              this.EntityField = allEntityData;
              allEntityData.forEach(entityElement => {
                // const data = JSON.parse(entityElement);
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

  setDefaultType(EntityBinding) {
    EntityBinding.forEach(entitylist => {
      if (entitylist.type === 'secondary') {
        this.selectentityarray.push(entitylist);

      }
      console.log('-----selectEntityarray-----', this.selectentityarray);
    });

    // this.editor.DomComponents.getType('input').model.prototype.init().listenTo(this, 'change:2345', this.newENtity);
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
        name: 'Field'
      });
    console.log('--------selectentity----->>>>', this.editor.DomComponents);
    // select traits
    this.editor.DomComponents.getType(
      'select'
    ).model.prototype.defaults.traits.push(
      {
        type: 'select',
        label: this.traitsName,
        name: this.traitsName,
        options: this.selectentityarray,
        changeProp: 1
      },
      {
        type: 'entityFieldButton',
        label: 'Field',
        name: 'Field'
      }
    );

    console.log('--------dynamicdropdown----->>>>', this.editor.DomComponents.getType('dynamicdropdown-type').model.prototype
      .defaults.traits);

    // dynamic dropdown
    this.editor.DomComponents.getType(
      'dynamicdropdown-type'
    ).model.prototype.defaults.traits.push(
      {
        type: 'select',
        label: this.traitsName,
        name: this.traitsName,
        options: EntityBinding,
        changeProp: 1
      },
    );

    // radio traits
    this.editor.DomComponents.getType(
      'radio'
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
        name: 'Field'
      }
    );
    // textarea traits
    this.editor.DomComponents.getType(
      'textarea'
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
        name: 'Field'
      }
    );
    // button traits
    const buttonVerbOptions = this.verbOptions.filter(x => x.key === 'click');
    this.editor.DomComponents.getType(
      'button'
    ).model.prototype.defaults.traits.push(
      // {
      //   type: "content",
      //   label: "contentName",
      //   name: "contentname",
      //   changeProp: 1
      // },
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
    // test
    console.log(
      'popupmdal types are ----  ',
      this.editor.DomComponents.getType('popupModal-type').model.prototype
        .defaults.traits
    );
    this.editor.DomComponents.getType(
      'popupModal-type'
    ).model.prototype.defaults.traits.push(
      {
        type: 'content',
        label: 'contentName',
        name: 'contentname',
        changeProp: 1
      },
      {
        type: 'select',
        label: 'verb',
        name: 'verbs',
        changeProp: 1,
        options: this.verbOptions
      },
      {
        name: 'modalButton',
        label: 'Modal',
        type: 'modalButton'
      }
    );
    // ckeditor traits
    this.editor.DomComponents.getType(
      'ckeditor5'
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
        name: 'Field'
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
    this.setGridDefaultType(EntityBinding);
  }

  setGridDefaultType(EntityBinding) {
    console.log('-----------aggrid-entity--------', EntityBinding);
    this.agGridArray = [];
    // add rows trits
    this.customTraitService.addGridRowButton(this);
    // remove rows triats
    this.customTraitService.removeGridRowButton(this);
    // add field binding button
    this.customTraitService.gridFieldButton(this);
    // custom traits for grid action buttons
    this.customTraitService.RouteActionButton(this);
    this.editor.DomComponents.getType(
      'grid-type'
    ).model.prototype.defaults.traits.push(
      {
        type: 'select',
        label: this.traitsName,
        name: this.traitsName,
        changeProp: 1,
        options: EntityBinding
      },
      {
        name: 'fieldButton',
        label: 'bind',
        type: 'fieldGridButton'
      },
      {
        type: 'select',
        label: 'verb',
        name: 'verbs',
        changeProp: 1,
        options: this.verbOptions
      },
      {
        name: 'routeButton',
        label: 'Route',
        type: 'routeButton'
      },
      {
        name: 'addButton',
        label: 'Add',
        type: 'addButton'
      },
      {
        name: 'removeButton',
        label: `Remove`,
        type: 'removeButton'
      }
    );
    // updating traits entties
    console.log('---------grid--traits------------', this);
    this.commandService.updateTraits(this);
  }
  // set component element css based on cssGuideLines
  setElementCSS(element, tagName, removeTagClassName) {
    const gepStyle = JSON.parse(localStorage.getItem('templateparser'));
    console.log('gep default styles are -----  ', gepStyle, ' cssguideines are ---  ', this.cssGuidelines, '  tagname  ', tagName);
    let temp = null;
    if (this.cssGuidelines) {
      temp = this.cssGuidelines.find(x => x.tagName === tagName);

    }
    console.log(
      'set element css ar e----  ',
      temp,
      '  --tagname--  ',
      tagName,
      '  --removeTagClassName- ',
      removeTagClassName
    );
    if (temp) {
      console.log(' if parts');
      element.addClass(temp.className);
    } else if (gepStyle && gepStyle.length > 0) {
      console.log('entered in else if parts');
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
      console.log('removeTagClassName parts  ----   ', removeTemp);
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
    this.blockService.dynamicDropdown(this.editor);
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
    console.log('-------draganddrop-----this', this);
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
    console.log('save linkd details arear --pageLinkObj--- ', this.pageLinkObj);
    console.log(
      'save linkd details arear --linkInformation--- ',
      linkInformation
    );
    console.log(
      'save linkd details arear --this.editor.getSelected()--- ',
      this.editor.getSelected()
    );
    console.log(
      'save linkd details arear --this.editor.getSelected() traits--- ',
      this.editor.getSelected().get('traits')
    );
    console.log(
      'save linkd details arear --linkInformation--- ',
      linkInformation
    );
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
    console.log('after set linkArrays are --- ', this.linkArray);
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
    console.log('after set temp values are- -- ', temp);
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
    console.log('add link params value are --- ', this.pageLinkObj.paramArray);
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
    console.log('change link details rae ---- ', event);
    if (event === 'none' || event === 'internal' || event === 'external') {
      this.resetLinkDetails(event);
    } else if (event === 'flow') {
      console.log(
        'change link details flow entiteu fare --111- ',
        this.findEntity(this.pageLinkObj.internalURL, null)
      );
      console.log(
        'change link details flow entiteu fare --222---customEntityFields- ',
        this.customEntityFields
      );
    } else if (event.toLowerCase() === 'paramentity') {
      this.pageLinkObj.entityField = this.pageLinkObj.paramEntity.field;
    }
    if (event.toLowerCase() === 'internalpage') {
      // console.log('change link details internalpage are----  ', this.pageLinkObj.internalURL._id);
      // console.log('change link details linkInformation are----  ', this.linkInformation);
      // if (this.pageLinkObj.internalURL._id) {
      //     this.linkInformation.internalURL.screenId = this.pageLinkObj.internalURL._id;
      //     this.linkInformation.internalURL.screenName = this.pageLinkObj.internalURL.screenName;
      // } else {
      //     this.linkInformation.internalURL.screenId = '';
      //     this.linkInformation.internalURL.screenName = '';
      // }
      // console.log('after set internalURLs are --- ', this.linkInformation);
    } else {
    }
    //  else if (event.toLowerCase() === 'selectedentity') {
    //     console.log('selected entity are ----- ', this.pageLinkObj.selectedEntity);
    //     this.pageLinkObj.entityField = this.pageLinkObj.selectedEntity.field;
    //     this.pageLinkObj.selectedField = null;
    //     if (this.pageLinkObj.selectedEntity) {
    //         this.linkInformation.entity.id = this.pageLinkObj.selectedEntity._id;
    //         this.linkInformation.entity.name = this.pageLinkObj.selectedEntity.name;
    //     } else {
    //         this.linkInformation.entity.id = null;
    //         this.linkInformation.entity.name = null;
    //     }
    //     console.log('selected entity fields are ----- ', this.pageLinkObj.entityField);
    // } else if (event.toLowerCase() === 'entityfield') {
    //     console.log('selected entity filed are -----2222--selectedField----   ', this.pageLinkObj.selectedField);
    //     if (this.pageLinkObj.selectedField) {
    //         this.linkInformation.entity.fieldId = this.pageLinkObj.selectedField._id;
    //         this.linkInformation.entity.fieldName = this.pageLinkObj.selectedField.name;
    //     } else {
    //         this.linkInformation.entity.fieldId = null;
    //         this.linkInformation.entity.fieldName = null;
    //     }
    // } else if (event.toLowerCase() === '') {

    // }
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
    this.entityFields['entityfieldname'] = {};
    this.entityFields['entityId'] = {};
    this.isFieldPopupModal = false;
    this.ref.detectChanges();
  }

  /* this method was added as for form entity binding and also I have upated this code to bind the selected entity field to store
  it in the screen entity array and it saved in the entity info of screen table
  for details refer #381 in github developer is Kishan 19May2020
  */
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
      entitydetails = this.entityData.find(x => x._id === this.entityFields.entityId);
      this.selectedentityfield = entitydetails.field.find(field => field.name === this.entityFields.entityfieldname);
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
      for details refer #381 in github developer is Kishan 19May2020 */
      const duplicatefieldrm = this.screenEntityModel.findIndex(y => y.elementName === obj.elementName);
      if (duplicatefieldrm > -1) {
        this.screenEntityModel[duplicatefieldrm] = obj;
      } else {
        this.screenEntityModel.push(obj);

      }

    }
    this.saveRemoteStorage();
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
    if (this.isTemplateEdit) {
      this.saveRemoteStorage(this.templateObj);
      this.closeScreeName();
      this.spinner.show();
      this.editor.store((data) => {
        console.log('DATA---->>>>', data);
        this.getProjectTemplate(this.projectTemplateId);
      });
    } else {
      this.saveRemoteStorage();
      this.createFeatureIfNotExist();
      this.closeScreeName();
      this.editor.on('storage:response', function (e) {
        console.log('storage id are -------------    ', e);
        $this.screen_id = e.body._id;
        $this.getScreenById();
      });
    }
  }
  createFeatureIfNotExist() {
    const currentStorageDetails = this.editor.StorageManager.getCurrentStorage();
    const saveButton = this.editor.Panels.getButton('options', 'save-page');
    if (this.project_id !== undefined && this.feature_id !== undefined) {
      this.editor.store();
      saveButton.set('active', 0);
    } else if (this.screen_id !== undefined) {
      this.editor.store();
      console.log('kkkkkkk', this.screen_id);
      saveButton.set('active', 0);
    } else {
      const featureDetailObj = {
        name: `Feature_${generate(dictionary.numbers, 6)}`,
        description: `This Feature has been created from screen designer`,
        project: this.project_id
      };
      this.projectComponentService.saveFeatures(featureDetailObj, this.logId).subscribe(
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


  saveEventdetails(value) {


    if (value.event.type === 'dynamicdropdown-type') {
      const traitsvalue = value.event.traits;
      this.eventObj.htmlId = value.event.htmlId;
      this.eventObj.componentId = value.event.componentId;
      this.eventObj.elementName = value.event.elementname;
      this.eventObj.selected_event = value.event.value;
      this.specific_attribute_Event.push(this.eventObj);
      this.saveRemoteStorage();
    }

    if (value.event.type === 'grid-type') {
      console.log('---------grid event-------', value.event);
      this.agGridObject.event = value.event.value;
    }
    // tslint:disable-next-line:max-line-length
    // console.log('-----flow value-----', this.eventObj, '----selectedflow', this.selectedFlow, '----selectedflowobj', this.selectedFlowObj);

  }


  getscreendetailsbyid(screenid) {

    const GetByIdFlowObj = this.allflowlist.find(
      x => x.name === 'GpGetNounById'
    );

    const flowObj = {
      htmlId: '',
      componentId: '',
      elementName: '',
      verb: '',
      event: '',
      flow: '',
      flowName: ''
    };

    console.log('--------GetByIdFlowobj-------', GetByIdFlowObj);

    const projectflow_arr = [];

    projectflow_arr.push(GetByIdFlowObj);

    flowObj.flowName = GetByIdFlowObj.name;
    flowObj.flow = GetByIdFlowObj._id;
    flowObj.event = 'OnLoad';
    this.screenDesignerService.getScreenById(screenid, this.logId).subscribe(
      response => {
        if (response.body) {
          const screendetails = response.body[0];
          const flowsarray = screendetails['flows_info'];
          if (flowsarray.find(x => x.flowName === GetByIdFlowObj.name)) {
            console.log('-------for gpserachforupdateflow process-----', flowsarray);
          } else {
            screendetails['flows_info'].push(flowObj);
            console.log('--------screenid----', screendetails);
            // console.log('------update done--', this.editor.StorageManager.get('remote'));
            this.projectComponentService.getallProjectFlow(this.logId).subscribe(
              projectflowlist => {
                if (projectflowlist.body) {

                  const projectflowexsists = projectflowlist.body.findIndex(x => x._id == GetByIdFlowObj._id);
                  const featureflowexsists = this.featurelist.flows.findIndex(x => x == GetByIdFlowObj._id);
                  console.log('---------projectflowlist-------', projectflowexsists, featureflowexsists);

                  if (projectflowexsists > -1 && featureflowexsists == -1) {
                    this.featurelist.flows = this.featurelist.flows.concat(GetByIdFlowObj._id);
                    this.projectComponentService.updateFeature(this.featurelist, this.logId).subscribe(
                      featureresponse => {
                        console.log('save in flow ---in feature -->>', featureresponse);
                      },
                      error => {
                        console.log('cannot able to update the many projectfeature');
                      });

                  }
                  if (projectflowexsists == -1 && featureflowexsists == -1) {
                    this.projectComponentService.saveManyProjectFlow(projectflow_arr, this.logId).subscribe(
                      projectflow => {
                        if (projectflow.body) {
                          console.log('save many project flows----->>', projectflow);
                          const projectFlowsId = projectflow.body.map(({ _id }) => _id);
                          this.featurelist.flows = this.featurelist.flows.concat(projectFlowsId);
                          this.projectComponentService.updateFeature(this.featurelist, this.logId).subscribe(
                            featureresponse => {
                              console.log('save in flow --in feature -->>', response);
                            },
                            error => {
                              console.log('cannot able to update the many projectfeature');
                            });
                        }
                      },
                      error => {
                        console.log('cannot able to save the many projectFlows');
                      });
                  }

                }
              });


            this.screenDesignerService.updateScreen(screenid, screendetails, this.logId).subscribe(
              screenresponse => {
                console.log('------update done--', screenresponse);
              }
            );
          }

        }
      });

  }
}
