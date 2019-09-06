import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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

import * as shortid from 'shortid';

import * as nanoid from 'nanoid';

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

declare var grapesjs: any;
declare var jQuery: any;
@Component({
    selector: 'app-desktop-screen',
    templateUrl: './desktop-screen.component.html',
    styleUrls: ['./desktop-screen.component.scss']
})
export class DesktopScreenComponent implements OnInit, OnDestroy {
    editor: any;
    @ViewChild('myModal') myModal: ElementRef;
    public Editor = ClassicEditor;
    blocksOption: any[] = [{
        'option': 'Basic Elements',
        'value': ''
    }, {
        'option': 'Built-in Blocks',
        'value': '2'
    }];
    stylesOption: any[] = styleConstant.styleManagerEnglish;
    dataBindingTypes: any[] = [];
    agGridSelectedObject: any = {
        column: '',
        entityname: '',
        entityfield: ''
    };
    agGridArray: any[] = [];
    defaultLanguage: String = 'en';
    saveTemplateURL: String;
    updateTemplateURL: String;
    allEntityField: any[] = [];
    selectedEntity: any;
    fields: any[] = [];
    EntityField: any[] = [];
    selectedProject: any;
    isFieldPopupModal: Boolean;
    agGridFields: FormGroup;
    entityFields: any = '';
    selectedFlow: any;
    is_grid_present: Boolean;
    // eventFlows: FormGroup;
    agGridObject: any = {
        htmlId: '',
        componentId: '',
        custom_field: [],
        default_field: []
    };
    screenFlows: any[] = [];
    routeFlows: any[] = [];
    // selectColumn:,
    // selectEntity,
    // selectField,
    listOfFLows: any[] = [];
    gridApi: any;
    gridColumnApi: any;
    public isGridPopup: Boolean;
    currentAgGridData: any;
    defaultColumn: any;
    RemoteStorage: any;
    columnDefs: any;
    rowSelection: string;
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
        type: 'queryParameter'
    };
    public buttonVerb: String = 'click';
    public selectedFlowObj: any = null;
    public isRoutePopup = false;
    public isGridEvent = false;
    constructor(
        private screenDesignerService: ScreenDesignerService,
        private blockService: BlockService,
        private languageService: LanguageService,
        private styleService: StylesService,
        private panelService: PanelService,
        private traitService: TraitsService,
        private customTraitService: CustomTraitsService,
        private projectComponentService: ProjectComponentService,
        private flowManagerService: FlowManagerService,
        private dataService: DataService,
        private sharedService: SharedService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private ref: ChangeDetectorRef
    ) {
        this.columnDefs = [
            {
                headerName: 'Name', field: 'name',
                checkboxSelection: true, filter: 'agTextColumnFilter'
            },
            { headerName: 'Label', field: 'label', filter: 'agTextColumnFilter' },
            { headerName: 'Description', field: 'description', filter: 'agTextColumnFilter' },
            { headerName: 'Action', field: 'actionOnData', filter: 'agTextColumnFilter' },


        ];
        this.rowSelection = 'single';
        this.defaultColDef = {
            sortable: true,
            filter: true
        };
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log('activated routes in screen designer are ----- ', params);
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
        });
        console.log('stylesheets json are ----  ', JSON.parse(localStorage.getItem('stylesheets')));
        console.log('scripts json are ----  ', JSON.parse(localStorage.getItem('scripts')));
        console.log('css_guidelines json are ----  ', JSON.parse(localStorage.getItem('css_guidelines')));
        this.stylesheets = JSON.parse(localStorage.getItem('stylesheets'));
        this.scripts = JSON.parse(localStorage.getItem('scripts'));
        this.cssGuidelines = JSON.parse(localStorage.getItem('css_guidelines'));

        // this.columnDefs = [
        //     {
        //         headerName: 'Name',
        //         field: 'name',
        //         width: 250,
        //     },
        //     {
        //         headerName: 'Type',
        //         field: 'type_name',
        //         width: 308,
        //         cellEditor: 'agSelectCellEditor',
        //     },
        //     {
        //         headerName: 'Description',
        //         field: 'description',
        //         width: 450,
        //     },
        //     {
        //         headerName: 'Action',
        //         width: 100,
        //         cellRenderer: 'buttonRenderer',
        //         editable: false,
        //         sortable: false,
        //         filter: false,
        //     }
        // ];
        // this.rowData = [
        //     {
        //         name: 'Enter_Name',
        //         type_name: 'Text',
        //         data_type: null,
        //         description: 'Description',
        //         is_entity_type: false,
        //         is_list_type: false,
        //         list_type: null,
        //         list_value: null,
        //         entity_id: null
        //     }
        // ];
        // // this.rowSelection = 'multiple';
        // this.defaultColDef = {
        //     editable: true,
        //     sortable: true,
        //     filter: true
        // };
        this.isFieldPopupModal = false;
        this.isGridPopup = false;
        this.is_grid_present = false;
        // this.selectedColumn = 'column1';
        // this.selectedEntity = 'none';
        // this.selectedField = 'none';

        this.agGridFields = this.formBuilder.group({
            selectColumn: ['', Validators.required],
            selectEntity: ['', Validators.required],
            selectField: ['', Validators.required],
        });
        // this.entityFields = this.formBuilder.group({
        //     field: ['', Validators.required]
        // });
        // this.eventFlows = this.formBuilder.group({
        //     selectEvent: ['', Validators.required]
        // });
        this.saveTemplateURL = `${this.sharedService.Apigateway}${Constants.addScreen}`;
        this.updateTemplateURL = `${this.sharedService.Apigateway}${Constants.updateScreen}`;
        let addStyles = [];
        let addScripts = [];
        const plugins = ['gjs-grapedrop-preset'];
        const updateParams = {
            method: 'PATCH',
        };
        if (this.stylesheets) {
            addStyles = this.stylesheets;
        }
        if (this.scripts) {
            addScripts = this.scripts;
        }
        console.log('final addStyles are ---- ', addStyles);
        console.log('final addScripts are ---- ', addScripts);
        console.log('final cssGuideleines are ---- ', this.cssGuidelines);
        // add multiple styles
        // addStyles.push('./assets/css/gjs-base.css');
        // addStyles.push('./assets/css/bootstrap.min.css');
        // addStyles.push('./assets/css/grapesjscustom1.css');
        // addStyles.push('./assets/css/grapesjscustom2.css');
        // addStyles.push('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
        grapesjs.plugins.add('mobile-plugin', function (editor, options) {
            // remove the devices switcher
            // editor.getConfig().showDevices = false;
            // console.log('new plugin editor --1--- ', editor);
            // console.log('new plugin options --2--- ', options);
            // console.log('new plugin options -3 -editor.getConfig()--- ', editor.getConfig());
            // editor.getConfig().deviceManager.devices = [];
            editor.getConfig().deviceManager.devices = [{
                name: 'Mobile',
                width: '568px',
                widthMedia: '768px'
            },
            {
                name: 'Mobile',
                width: '320px',
                widthMedia: '480px'
            }];
            // console.log('new plugin options -4 -editor.Panels--- ', editor.Panels);
            // console.log('new plugin options 55 ', editor.Panels);
            // console.log('new plugin options all panels ', editor.Panels.getPanels());
            // console.log('new plugin options 1 options ', editor.Panels.getPanel('commands').get('buttons'));
            // console.log('new plugin options 2 options ', editor.Panels.getPanel('options').get('buttons'));
            // console.log('new plugin options 3 options ', editor.Panels.getPanel('views').get('buttons'));
            // console.log('new plugin options 4 options ', editor.Panels.getPanel('blocks-panel').get('buttons'));
            // console.log('new plugin options 5 options ', editor.Panels.getPanel('block-btn').get('buttons'));
            // console.log('new plugin options 6 options ', editor.Panels.getPanel('devices-c').get('buttons'));
            // console.log('new plugin options 7 options ', editor.Panels.getPanel('views-container'));
            // remove the view code button
            // const codeButton = editor.Panels.getButton("options", "undo-options");
            // const codeButton1 = editor.Panels.getButton("devices-c", "set-device-desktop");
            // const codeButton2 = editor.Panels.getButton("devices-c", "set-device-tablet");
            // const codeButton3 = editor.Panels.getButton("devices-c", "set-device-mobile");
            const desktopButton = editor.Panels.getButton('devices-c', 'deviceDesktop');
            const tabletButton = editor.Panels.getButton('devices-c', 'deviceTablet');
            const mobileButton = editor.Panels.getButton('devices-c', 'deviceMobile');
            // console.log('new code button are ------ ', codeButton);
            // console.log('new code button are ---codeButton--- ', codeButton);
            // console.log('new code button are ---codeButton1--- ', codeButton1);
            // console.log('new code button are --codeButton2---- ', codeButton2);
            // console.log('new code button are --codeButton3---- ', codeButton3);
            // console.log('new code button are --desktopButton---- ', desktopButton);
            // console.log('new code button are --tabletButton---- ', tabletButton);
            desktopButton.collection.remove(desktopButton);
            tabletButton.collection.remove(tabletButton);
            mobileButton.set('active', 1);
        });
        if (this.screenType === 'mobile') {
            plugins.push('mobile-plugin');
        }
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
                'gjs-grapedrop-preset': {
                    isDev: 0,
                    pageUuid: 'ad8906ca2d4d4fcfb0c99f0a11082f4d',
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
                    labelMsgError: 'An error occurred on processing your request, try again!',
                    labelPublish: 'Publish',
                    labelTemplate: 'Template',
                    labelTemplatePage: 'page',
                    labelDataBind: 'Data Binding',
                    labelDeleteAsset: 'Delete Asset',
                    labelAreYouSureAsset: 'This operation can&#039;t be undone. Are you sure?',
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
                upload: 'https://grapedrop.com/asset-upload/ad8906ca2d4d4fcfb0c99f0a11082f4d',
                params: {},
                noAssets: '<div class="gjs-assets-empty"><i class="fa fa-picture-o"></i><br>No images, yet</div>',
                dropzoneContent: '<div class="gjs-dropzone-inner">Drop here your assets</div>'
            },
            storageManager: {
                type: 'remote',
                contentTypeJson: true,
                urlStore: '',
            },
            styleManager: {
                clearProperties: 1,
            }
        });
        this.getScreenById();
        this.getScreenByProjectId();
        this.traitService.initMethod(this);
        this.getEntity();
        this.getEntityType();
        this.getAllFlows();
        // this.getSelectedProject();
        this.getProjectDetails();
        this.addCustomBlocks();
        this.declareBlockLanguage();
        this.styleManager();
        this.panelManager();
        // this.agGridEntity();
        // this.traitService.initializeRadioMethod(this.editor);
        // this.beforeDropElement();
        // const is = this.agGridObject;
        const $this = this;
        this.editor.on('component:selected', function (component) {
            if (component.attributes.type === 'grid-type') {
                $this.agGridObject.htmlId = component.ccid;
                $this.agGridObject.componentId = component.cid;
                $this.is_grid_present = true;
                //   const styleManager = editor.StyleManager;
                //   styleManager.addSector('div-only-sector',{
                //     name: 'Div only sector',
                //     open: true,
                //     properties: [{ name: 'This is a div'}]
                //   });
            }
        });
        this.RemoteStorage = this.editor.StorageManager.get('remote');
        console.log('before save remotestorage ar e----- ', this.project_id, ' -feat--- ', this.feature_id);
        this.screenName = `screen${generate(dictionary.numbers, 6)}`;
        this.saveRemoteStorage();
        // this.RemoteStorage.set('params', {
        //     screenName: this.screenName,
        //     project: this.project_id,
        //     feature: this.feature_id
        // });
        if (this.screenType === 'mobile') {
            // console.log('screen type ares ----- ', this.editor);
            this.editor.setDevice('Mobile');
            // console.log('screen type ares --devices--- ', this.editor.getDevice());
        }
        // console.log(' editor ram 11 ---- ', this.editor);
        // console.log(' editor ram 22 ---- ', this.editor.DeviceManager);
        // console.log(' editor ram 22 ---- ', JSON.stringify(this.editor.DeviceManager.getAll()));
        this.setImportOption();
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
                // alert('import html called')
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

        pnm.addButton('options',
            [
                {
                    id: 'import',
                    className: 'fa fa-download',
                    command: 'html-import',
                    attributes: {
                        title: 'Import Your Template'
                    }
                }
            ]
        );
    }
    ngOnDestroy() {
        console.log('Destroy services called');
        // this.dataService.setAgGridEntity('');
        // this.currentAgGridData.unsubscribe();
    }

    onFieldOptions(event) {
        const agGridObject = {
            columnid: '',
            columnname: '',
            entity: '',
            entityfield: ''
        };
        console.log('this.agGridFields.value.selectColumn -11---  ', this.agGridArray);
        console.log('this.agGridFields.value.selectColumn --22--  ', this.agGridFields.value.selectColumn);
        if (this.agGridFields.value.selectColumn !== '' &&
            this.agGridFields.value.selectField !== '') {
            const isColExist = this.agGridArray.findIndex(x => x.columnid === this.agGridFields.value.selectColumn.value);
            if (isColExist > -1) {
                this.agGridArray.splice(isColExist, 1);
            }
            agGridObject.columnid = this.agGridFields.value.selectColumn.value;
            agGridObject.columnname = this.agGridFields.value.selectColumn.name;
            agGridObject.entity = this.selectedEntity.name;
            agGridObject.entityfield = this.agGridFields.value.selectField;
            this.agGridArray.push(agGridObject);
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
        console.log('save remote storage ------- ', this.screenEntityModel);
        console.log('save remote storage agGridArray------- ', this.agGridArray);
        this.RemoteStorage.set('params', {
            grid_fields: this.agGridObject,
            flows_info: this.screenFlows,
            route_info: this.routeFlows,
            screenName: this.screenName,
            is_grid_present: this.is_grid_present,
            entity_info: this.screenEntityModel,
            project: this.project_id,
            feature: this.feature_id,
            screenType: this.screenType
        });
    }

    // get screens by project id
    getScreenByProjectId() {
        this.screenDesignerService.getScreenByProjectId(this.project_id)
            .subscribe(projectData => {
                console.log('get screen by project id -------  ', projectData);
                this.screenArrayByProjectId = projectData.body;
            }, error => {

            });
    }

    // need to work screen by id
    getScreenById() {
        console.log('screenId in getScreen by id ---- ', this.screen_id);
        if (this.screen_id) {
            this.editor.StorageManager.get('remote').set({ urlStore: `${this.updateTemplateURL}${this.screen_id}` });
            this.screenDesignerService.getScreenById(this.screen_id).subscribe(
                (response) => {
                    console.log('screenId get are --- ', response, this.screen_id);
                    if (response.body) {
                        this.existScreenDetail = response.body;
                        if (this.existScreenDetail[0]['gjs-components']) {
                            this.feature_id = this.existScreenDetail[0]['feature'];
                            this.project_id = this.existScreenDetail[0]['project'];
                            this.screenName = this.existScreenDetail[0]['screenName'];
                            this.is_grid_present = this.existScreenDetail[0]['is_grid_present'];
                            this.agGridObject = this.existScreenDetail[0]['grid_fields'];
                            this.screenEntityModel = this.existScreenDetail[0]['entity_info'];
                            this.screenFlows = this.existScreenDetail[0]['flows_info'];
                            this.routeFlows = this.existScreenDetail[0]['route_info'];
                            this.screenName = this.existScreenDetail[0]['screenName'];

                            // LOAD CUSTOM BLOCKS
                            this.addCustomBlocks();
                            // change colname array
                            if (this.agGridObject &&
                                this.agGridObject.custom_field.length > 0) {
                                this.columnOptions = [];
                                this.agGridObject.custom_field.forEach(customField => {
                                    const temp = { value: '', name: '' };
                                    temp.value = customField.columnid;
                                    temp.name = customField.columnname;
                                    this.columnOptions.push(temp);
                                });
                            }
                            this.editor.setComponents(JSON.parse(this.existScreenDetail[0]['gjs-components']));
                            this.editor.setStyle(this.existScreenDetail[0]['gjs-css']);
                        }

                    }
                },
                (error) => {
                    console.log('screenId error are ---- ', error);
                }
            );
        } else {
            this.editor.StorageManager.get('remote').set({ urlStore: this.saveTemplateURL });
        }
    }

    getEntityType() {
        this.projectComponentService.getAllEntityType().subscribe(
            (data) => {
                if (data.body) {
                    data.body.forEach(element => {
                        const object = {
                            name: '',
                            value: ''
                        };
                        if (element.typename === 'Number' ||
                            element.typename === 'Decimal') {
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
                console.log('after build databinding types are --- ', this.dataBindingTypes);
                this.beforeDropElement();
            },
            (error) => {
                this.beforeDropElement();
            }
        );
    }

    getAllFlows() {
        this.flowManagerService.getAllFlows().subscribe((flowData) => {
            this.listOfFLows = flowData.body;
            if (this.feature_id !== undefined && this.feature_id != null) {
                this.rowData = this.listOfFLows;
            } else {
                const createFlow = this.listOfFLows.find(x => x.name === 'GpCreate');
                this.rowData = [createFlow];
            }
        }, (error) => {
            console.log('cannot get flows in screen designer ', error);
        });
    }

    cancelEvent() {
        this.closeEventPopup();
    }

    closeEventPopup() {
        const eventPopupModel = <HTMLElement>document.querySelector('#EventPopup');
        eventPopupModel.style.display = 'none';
    }

    saveRouteDetails() {
        const GetByIdFlowObj = this.listOfFLows.find(x => x.name === 'GpGetNounById');
        const tempIndex = this.routeFlows.findIndex(x => x.elementName === this.editor.getSelected().attributes.name);
        if (tempIndex > -1) {
            this.routeFlows[tempIndex].screenId = this.routeDetails.screen._id;
            this.routeFlows[tempIndex].screenName = this.routeDetails.screen.screenName;
            this.routeFlows[tempIndex].routeType = this.routeDetails.type;
            // update getByNounId for route
            if (GetByIdFlowObj) {
                this.routeFlows[tempIndex].screenFlow = GetByIdFlowObj._id;
                this.routeFlows[tempIndex].screenFlowName = GetByIdFlowObj.name;
            }
            this.routeFlows[tempIndex].methodName =
                `${this.selectedFlow[0].name}${this.routeFlows.length > 1 ? this.routeFlows.length : ''}`;

            this.saveRemoteStorage();
        } else {
            const routeObj = {
                htmlId: '',
                componentId: '',
                elementName: '',
                routeFlow: '',
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
            routeObj.routeFlow = this.selectedFlow[0]._id;
            routeObj.screenId = this.routeDetails.screen._id;
            routeObj.screenName = this.routeDetails.screen.screenName;
            routeObj.routeType = this.routeDetails.type;
            // add the routing method name
            routeObj.methodName = `${this.selectedFlow[0].name}${this.routeFlows.length > 1 ? this.routeFlows.length : ''}`;
            // add the screensflow
            if (GetByIdFlowObj) {
                routeObj.screenFlow = GetByIdFlowObj._id;
                routeObj.screenFlowName = GetByIdFlowObj.name;
            }
            this.routeFlows.push(routeObj);
            this.saveFlowDetails(this.routeDetails.verb);
        }

        this.isRoutePopup = false;
    }

    closeRoute() {
        this.isRoutePopup = false;
    }

    // save event flows
    saveEvent() {
        let temp = null;
        if (this.buttonVerb) {
            temp = this.buttonVerb;
        }
        this.saveFlowDetails(temp);
        this.closeEventPopup();
    }

    // save flow details
    saveFlowDetails(verbInfo) {
        const flowObj = {
            htmlId: '',
            componentId: '',
            elementName: '',
            verb: '',
            flow: ''
        };
        // console.log('selected component after upload an flows ---- ', this.editor.selected())
        flowObj.htmlId = this.editor.getSelected().ccid;
        flowObj.componentId = this.editor.getSelected().cid;
        flowObj.elementName = this.editor.getSelected().attributes.name;
        if (verbInfo) {
            flowObj.verb = verbInfo;
        }
        flowObj.flow = this.selectedFlow[0]._id;
        const isFlowExist = this.screenFlows.findIndex(x => x.elementName === this.editor.getSelected().attributes.name);
        if (isFlowExist > -1) {
            this.screenFlows.splice(isFlowExist, 1);
        }
        this.screenFlows.push(flowObj);
        this.saveRemoteStorage();
        this.traitService.setScreenInfo(flowObj.htmlId, flowObj.componentId, this.selectedFlow[0]);
    }

    saveGridEvent() {
        if (this.selectedFlow &&
            this.selectedFlow[0].name.toLowerCase() === 'gproute') {
            this.isRoutePopup = true;
            this.closeEventPopup();
        } else {
            this.closeEventPopup();
            this.saveFlowDetails(null);
        }
    }

    onSelectionChanged() {
        this.selectedFlow = this.gridApi.getSelectedRows();
    }

    getEntity() {
        if (this.project_id !== undefined && this.feature_id !== undefined) {
            this.projectComponentService.getEntityByFeatureId(this.feature_id)
                .subscribe((response) => {
                    const entityData = response.body;
                    if (entityData !== null && entityData !== undefined && entityData.length > 0) {
                        const entityArray = [];
                        entityArray.push({ name: 'none', value: 'none' });
                        this.EntityField = entityData;
                        entityData.forEach(entityElement => {
                            // const data = entityElement;
                            const object = {
                                name: '',
                                value: ''
                            };
                            object.name = entityElement.name;
                            object.value = entityElement._id;
                            entityArray.push(object);
                        });
                        this.traitsName = 'entity';
                        this.setDefaultType(entityArray);
                    } else {
                        this.traitsName = 'dataBinding';
                        this.setDefaultType(this.dataBindingTypes);
                    }
                }, (error) => {

                });
        } else {
            this.projectComponentService.getEntityByProjectId(this.project_id)
                .subscribe((response) => {
                    const allEntityData = response.body;
                    if (allEntityData !== null && allEntityData !== undefined && allEntityData.length > 0) {
                        const entityArray = [];
                        entityArray.push({ name: 'none', value: 'none' });
                        this.EntityField = allEntityData;
                        allEntityData.forEach(entityElement => {
                            // const data = JSON.parse(entityElement);
                            const object = {
                                name: '',
                                value: ''
                            };
                            object.name = entityElement.name;
                            object.value = entityElement._id;
                            entityArray.push(object);
                        });
                        this.traitsName = 'entity';
                        this.setDefaultType(entityArray);
                    } else {
                        this.traitsName = 'dataBinding';
                        this.setDefaultType(this.dataBindingTypes);
                    }
                }, (error) => {

                });
        }
    }

    setDefaultType(EntityBinding) {
        // this.editor.DomComponents.getType('input').model.prototype.init().listenTo(this, 'change:2345', this.newENtity);
        // custom traits for entity field button
        this.customTraitService.entityFieldButton(this);
        // custom traits for content textarea
        this.customTraitService.content(this);
        // custom traits for flows action button
        this.customTraitService.flowsActionButton(this);
        // input traits
        this.editor.DomComponents.getType('input').model
            .prototype.defaults.traits.push({
                type: 'select',
                label: this.traitsName,
                name: this.traitsName,
                options: EntityBinding,
                changeProp: 1

            }, {
                    type: 'entityFieldButton',
                    label: 'Field',
                    name: 'Field'
                });

        // select traits
        this.editor.DomComponents.getType('select').model
            .prototype.defaults.traits.push({
                type: 'select',
                label: this.traitsName,
                name: this.traitsName,
                options: EntityBinding,
                changeProp: 1

            }, {
                    type: 'entityFieldButton',
                    label: 'Field',
                    name: 'Field'
                });

        // radio traits
        this.editor.DomComponents.getType('radio').model
            .prototype.defaults.traits.push({
                type: 'select',
                label: this.traitsName,
                name: this.traitsName,
                options: EntityBinding,
                changeProp: 1

            }, {
                    type: 'entityFieldButton',
                    label: 'Field',
                    name: 'Field'
                });
        // textarea traits
        this.editor.DomComponents.getType('textarea').model
            .prototype.defaults.traits.push({
                type: 'select',
                label: this.traitsName,
                name: this.traitsName,
                options: EntityBinding,
                changeProp: 1

            }, {
                    type: 'entityFieldButton',
                    label: 'Field',
                    name: 'Field'
                });
        // button traits
        const buttonVerbOptions = this.verbOptions.filter(x => x.key === 'click');
        this.editor.DomComponents.getType('button').model
            .prototype.defaults.traits.push({
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
                    options: buttonVerbOptions,
                },
                {
                    'name': 'actionButton',
                    'label': 'Action',
                    'type': 'actionButton',
                });
        // ckeditor traits
        this.editor.DomComponents.getType('ckeditor5').model
            .prototype.defaults.traits.push({
                type: 'select',
                label: this.traitsName,
                name: this.traitsName,
                options: EntityBinding,
                changeProp: 1

            }, {
                    type: 'entityFieldButton',
                    label: 'Field',
                    name: 'Field'
                });
        this.setGridDefaultType(EntityBinding);
    }

    setGridDefaultType(EntityBinding) {
        this.agGridArray = [];
        // add rows trits
        this.customTraitService.addGridRowButton(this);
        // remove rows triats
        this.customTraitService.removeGridRowButton(this);
        // add field binding button
        this.customTraitService.gridFieldButton(this);
        // custom traits for grid action buttons
        this.customTraitService.gridActionFlowButton(this);

        this.editor.DomComponents.getType('grid-type').model
            .prototype.defaults.traits.push(
                {
                    type: 'select',
                    label: this.traitsName,
                    name: this.traitsName,
                    changeProp: 1,
                    options: EntityBinding,
                },
                {
                    'name': 'fieldButton',
                    'label': 'bind',
                    'type': 'fieldGridButton',
                },
                {
                    type: 'select',
                    label: 'verb',
                    name: 'verbs',
                    changeProp: 1,
                    options: this.verbOptions,
                },
                {
                    'name': 'gridActionButton',
                    'label': 'Action',
                    'type': 'gridActionButton',
                },
                {
                    'name': 'addButton',
                    'label': 'Add',
                    'type': 'addButton',
                },
                {
                    'name': 'removeButton',
                    'label': `Remove`,
                    'type': 'removeButton',
                });
    }


    beforeDropElement() {
        const $this = this;
        // it worked well if we inject the buttons close to the input fields
        this.editor.on('component:toggled', model => { });

        // it called when we remove the component
        this.editor.on(`component:remove`, function (model) {
            const parentComponent = model.get('components');
            let componentIndex = 0;
            if (model.attributes && model.attributes.name) {
                componentIndex = $this.routeFlows.findIndex(x =>
                    x.elementName === model.attributes.name
                );

                if (componentIndex > -1) {
                    // remove flows first if present in flows_info
                    const flowInfoIndex = $this.screenFlows.findIndex(x => x.elementName === $this.routeFlows[componentIndex].elementName);
                    if (flowInfoIndex > -1) {
                        $this.screenFlows.splice(flowInfoIndex, 1);
                    }
                    $this.routeFlows.splice(componentIndex, 1);

                }
            }
            if (parentComponent.length === 0) {
                componentIndex = $this.screenEntityModel.findIndex(x =>
                    x.elementName === parentComponent.parent.attributes.name
                );
                if (componentIndex > -1) {
                    $this.screenEntityModel.splice(componentIndex, 1);
                }
                componentIndex = $this.screenFlows.findIndex(x =>
                    x.elementName === parentComponent.parent.attributes.name
                );
                if (componentIndex > -1) {
                    $this.screenFlows.splice(componentIndex, 1);
                }
                const elementNameIndex = $this.ElementNameArray.findIndex(x => x === parentComponent.parent.attributes.name);
                if (elementNameIndex > -1) {
                    $this.ElementNameArray.splice(elementNameIndex, 1);
                }
                $this.saveRemoteStorage();
            } else {
                model.get('components').each(child => {
                    componentIndex = $this.screenEntityModel.findIndex(x =>
                        x.elementName === child.attributes.name
                    );
                    if (componentIndex > -1) {
                        $this.screenEntityModel.splice(componentIndex, 1);
                    }
                    componentIndex = $this.screenFlows.findIndex(x =>
                        x.elementName === child.attributes.name
                    );
                    if (componentIndex > -1) {
                        $this.screenFlows.splice(componentIndex, 1);
                    }
                    const elementNameIndex = $this.ElementNameArray.findIndex(x => x === child.attributes.name);
                    if (elementNameIndex > -1) {
                        $this.ElementNameArray.splice(elementNameIndex, 1);
                    }
                });
                $this.saveRemoteStorage();
            }
        });

        // it called when we update the component traits name
        this.editor.on(`component:update:name`, function (model) {
            if (model._previousAttributes.name === '') {
                $this.ElementNameArray.push(model.attributes.name);
            } else {
                const elementNameIndex = $this.ElementNameArray.findIndex(x => x === model.attributes.name);
                if (elementNameIndex > -1) {
                    model.attributes.traits.target.set('name', `${model._previousAttributes.name}`);
                    $this.editor.TraitManager.getTraitsViewer().render();
                } else {
                    $this.ElementNameArray.push(model.attributes.name);
                }
            }
            const entityIndex = $this.screenEntityModel.findIndex(x =>
                x.elementName === model._previousAttributes.name);
            if (entityIndex > -1) {
                $this.screenEntityModel[entityIndex].elementName = model.attributes.name;
                $this.saveRemoteStorage();
            }
            const flowIndex = $this.screenFlows.findIndex(x =>
                x.elementName === model._previousAttributes.name);
            if (flowIndex > -1) {
                $this.screenFlows[flowIndex].elementName = model.attributes.name;
            }
            const routeIndex = $this.routeFlows.findIndex(x =>
                x.elementName === model._previousAttributes.name);
            if (routeIndex > -1) {
                $this.routeFlows[routeIndex].elementName = model.attributes.name;
            }
            $this.saveRemoteStorage();

        });

        // select entity if triats values changed then its called
        this.editor.on(`component:update:${this.traitsName}`, function (model) {
            $this.selectedEntityModel = model.changed['entity'];
            $this.selectedHtmlElement.htmlId = model.ccid;
            $this.selectedHtmlElement.componentId = model.cid;
            $this.selectedHtmlElement.elementName = model.attributes.name;
            // $this.EntityField.forEach(entityElement => {
            //     console.log('entity component update 1--  ', entityElement);
            //     console.log('entity component update 2--  ', model.changed['entity']);
            //     if (entityElement._id === model.changed['entity']) {
            //         $this.fields = entityElement.field.filter((el) => {
            //             return (el.name.toLowerCase() !== 'createdat' &&
            //                 el.name.toLowerCase() !== 'updatedat');
            //         });
            //     }
            //     console.log('entity component update fields 3--  ', $this.fields);

            // });
        });
        this.editor.on('block:drag:stop', function (model) {
            // get dropped element with its types
            const wrapperType = $this.editor.DomComponents.getWrapper().find('[data-gjs-type="grid-type"]');
            if (wrapperType.length > 0) {
                $this.is_grid_present = true;
                $this.saveRemoteStorage();
                wrapperType.forEach(element => {
                    element.attributes.traits.target.set('name', `grid_${element.ccid}`);
                });
            }
            // $this.editor.DomComponents.getWrapper().find('#somid')[0];
            const allInputModels = model.find('input');
            const allRadioModels = model.find('input[type="radio"i]');
            const allTextAreaModels = model.find('textarea');
            const allOptionModels = model.find('select');
            const allButtonModels = model.find('button');
            const allCheckBoxModels = model.find('input[type="checkbox"i]');
            const allImageBlockModels = model.find('.gpd-image-block');
            const allImageModels = model.find('.gjs-plh-image');
            const allLabelModels = model.find('label');
            // const ckeditorDiv = model.find('#ckeditordiv');
            const ckeditorspan = model.find('#ckeditorspan');
            // const allCKeditorModels = model.find('#ckeditortextarea');
            const ckeditorTextAreaModels = model.find('span #ckeditortextarea');

            // const agGridModels = model.find('[data-gjs-type="grid-type"]');
            // console.log('ag grid models before drop ----- ', agGridModels);
            // console.log('before drop the element component ----models--- ', allInputModels);
            // console.log('before drop the element component ----textArea--- ', allTextAreaModels);
            // console.log('all input models are ----- ', allInputModels);
            // console.log('all radio models are ----- ', allRadioModels);
            // console.log('all ButtonModels are ----- ', allButtonModels);
            // console.log('all labelmodels are ----- ', allLabelModels);
            // console.log('all textareamodels are ----- ', allTextAreaModels);
            // console.log('all CKeditorModels are ----- ', allCKeditorModels);
            // console.log('all ckeditorDiv are ----- ', ckeditorDiv);
            // console.log('all ckeditorspan are ----- ', ckeditorspan);
            console.log('all spanTextareaModels are ----- ', ckeditorTextAreaModels);
            // label
            allLabelModels.forEach(element => {
                // element.set({
                //     attributes: {
                //         class: 'form-control'
                //     }
                // });
                // element.addClass('form-control');
                // const temp = $this.cssGuidelines.find(x => x.tagName === 'input');
                // if (temp) {
                //     element.addClass(temp.className);
                // }
                console.log('input models are ----  ', element);
                $this.setElementCSS(element, 'label', null);
            });
            // input
            allInputModels.forEach(element => {
                $this.setElementCSS(element, 'input', null);
                element.attributes.traits.target.set('name', `input_${element.ccid}`);
            });
            // radio
            allRadioModels.forEach(element => {
                if (element) {
                    $this.setElementCSS(element, 'radio', 'input');
                }
                console.log('each radiobutton elemenr are ----  ', element);
                element.attributes.traits.target.set('name', `radio_${element.ccid}`);
            });
            // TextArea
            allTextAreaModels.forEach(element => {
                $this.setElementCSS(element, 'textarea', null);
                element.attributes.traits.target.set('name', `textbox_${element.ccid}`);
            });
            // input options
            allOptionModels.forEach(element => {
                $this.setElementCSS(element, 'select', null);
                element.attributes.traits.target.set('name', `select_${element.ccid}`);
            });
            // checkbox
            allCheckBoxModels.forEach(element => {
                $this.setElementCSS(element, 'checkbox', 'input');
                element.attributes.traits.target.set('name', `checkbox_${element.ccid}`);
            });
            // button
            allButtonModels.forEach(element => {
                // set default verbs for button
                $this.buttonVerb = 'click';
                $this.setElementCSS(element, 'button', null);
                element.attributes.traits.target.set('name', `button_${element.ccid}`);
            });
            // image blocks
            allImageBlockModels.forEach(element => {
                element.attributes.traits.target.set('name', `image_${element.ccid}`);
            });
            // images
            allImageModels.forEach(element => {
                element.attributes.traits.target.set('name', `image_${element.ccid}`);
            });
            // ckeditor
            // set dynamic name in ckeditor span
            ckeditorspan.forEach(element => {
                element.attributes.traits.target.set('name', `ckeditor_${element.ccid}`);
            });
            // remove unwanted classes and add the classname if available
            ckeditorTextAreaModels.forEach(element => {
                $this.setElementCSS(element, 'ckeditor', 'textarea');
                element.attributes.traits.target.set('name', `ckeditor_${element.ccid}`);
            });
        });
        // this.editor.on('change:traits:entity', function (model) {
        //     console.log('ram change editor entity values ar e-----  ');
        // });
        // this.editor.on('component:update:Field', function (model) {
        //     alert('entity field button clicked');
        // });
        // this.editor.on('block:drag:stop', function (model) {
        //     console.log('ram component values ar e----11--  ', model);
        //     console.log('ram component values ar e--22----  ', model.find('input'));
        //     const allInputModels = model.find('input');
        //     const allTextAreaModels = model.find('textarea');
        //     const allOptionModels = model.find('select');
        //     const allRadioModels = model.find('.radio');
        //     const allButtonModels = model.find('.button');
        //     const allCheckBoxModels = model.find('.checkbox');
        //     const allImageBlockModels = model.find('.gpd-image-block');
        //     const allImageModels = model.find('.gjs-plh-image');
        //     // console.log('buttonn are ---- ', allButtonModels);
        //     // console.log('ram component values ar e--33----  ', model.find('textarea'));
        //     // console.log('ram component values ar e--44----  ', model.find('select'));
        //     // console.log('ram component values ar e--55----  ', model.find('.radio'));
        //     // console.log('ram component values ar e--66----  ', model.find('.button'));
        //     // console.log('ram component values ar e--77----  ', model.find('.checkbox'));
        //     // console.log('ram component values ar e--88----  ', model.find('.gpd-image-block'));
        //     // console.log('ram component values ar e--99----  ', model.find('.gjs-plh-image'));


        //     allInputModels.forEach(inputElement => {
        //         inputElement.setAttributes({ name: `input_${inputElement.ccid}` });
        //     });
        //     allTextAreaModels.forEach(inputElement => {
        //         inputElement.setAttributes({ name: `textarea_${inputElement.ccid}` });
        //     });
        //     allOptionModels.forEach(inputElement => {
        //         inputElement.setAttributes({ name: `option_${inputElement.ccid}` });
        //     });
        //     allRadioModels.forEach(inputElement => {
        //         inputElement.setAttributes({ name: `radio_${inputElement.ccid}` });
        //     });
        //     allButtonModels.forEach(inputElement => {
        //         inputElement.setAttributes({ name: `button_${inputElement.ccid}` });
        //     });
        //     allCheckBoxModels.forEach(inputElement => {
        //         inputElement.setAttributes({ name: `checkbox_${inputElement.ccid}` });
        //     });
        //     allImageBlockModels.forEach(inputElement => {
        //         inputElement.setAttributes({ name: `imageblock_${inputElement.ccid}` });
        //     });
        //     allImageModels.forEach(inputElement => {
        //         inputElement.setAttributes({ name: `image_${inputElement.ccid}` });
        //     });

        //     // allButtonModels[0].attributes.content = 'testnew';
        //     // allButtonModels.target.set('content', 'dsfdsfsdf');

        //     // button default content name changed
        //     // allButtonModels[0].attributes.traits.target.set('content', `button_${generate(dictionary.numbers, 6)}`);
        //     // allInputModels.forEach(models => models.setAttributes({ name: `input_${generate(dictionary.numbers, 6)}` }));
        //     // // allButtonModels.forEach(models => models.setAttributes({ content: `button_${generate(dictionary.numbers, 6)}` }));
        //     // allTextAreaModels.forEach(models => models.setAttributes({ name: `textarea_${generate(dictionary.numbers, 6)}` }));
        //     // allOptionModels.forEach(models => models.setAttributes({ name: `select_${generate(dictionary.numbers, 6)}` }));
        //     // allRadioModels.forEach(models => models.setAttributes({ name: `radio_${generate(dictionary.numbers, 6)}` },
        //     //     { value: 1 }));
        //     // allCheckBoxModels.forEach(models => models.setAttributes({ name: `checkbox_${generate(dictionary.numbers, 6)}` }));
        //     // // model.attributes.attributes = {href:"http://teste.com"}
        //     // allImageBlockModels.forEach(models => models.setAttributes({ name: `imageblocks_${generate(dictionary.numbers, 6)}` }));
        //     // allImageModels.forEach(models => models.setAttributes({ name: `image_${generate(dictionary.numbers, 6)}` }));
        // });
    }

    setElementCSS(element, tagName, removeTagClassName) {
        const temp = this.cssGuidelines.find(x => x.tagName === tagName);
        console.log('set element css ar e----  ', temp, '  --tagname--  ', tagName, '  --removeTagClassName- ', removeTagClassName);
        if (temp) {
            element.addClass(temp.className);
        }
        if (removeTagClassName) {
            const removeTemp = this.cssGuidelines.find(x => x.tagName === removeTagClassName);
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

    addCustomBlocks() {
        this.blockService.addCKeditor5(this.editor);
        this.blockService.addAgGrid(this);
        this.blockService.addSpecialButton(this.editor);
        this.blockService.addSpecialDropdown(this.editor);
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

    onCloseHandled() {
        this.isGridPopup = false;
        this.allEntityField = [];
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
        const checkedIndex = this.screenEntityModel.findIndex(x => (
            x.htmlId === this.selectedHtmlElement.htmlId
            && x.componentId === this.selectedHtmlElement.componentId
        ));
        if (checkedIndex > -1) {
            this.screenEntityModel.splice(checkedIndex, 1);
        }
        if (this.selectedHtmlElement.htmlId !== undefined
            && this.selectedHtmlElement.componentId !== undefined
            && this.entityFields !== ''
            && this.entityFields !== undefined
            && this.traitsName === 'entity'
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
            obj.htmlId = this.selectedHtmlElement.htmlId;
            obj.componentId = this.selectedHtmlElement.componentId;
            obj.elementName = this.selectedHtmlElement.elementName;
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
        const index = this.screenArrayByProjectId.findIndex(x =>
            x.screenName === this.screenName && x._id !== this.screen_id);
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
            $this.screen_id = e._id;
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
                (featureData) => {
                    currentStorageDetails.attributes.params.feature = featureData.body._id;
                    this.editor.store();
                    saveButton.set('active', 0);
                },
                (error) => {
                    console.log('feature cannot able to save from screens');
                }
            );
        }

    }



}
