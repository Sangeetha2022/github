import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ScreenDesignerService } from '../screen-designer.service';
import { BlockService } from './services/blocks/block.service';
import { LanguageService } from './services/languages/language.service';
import { StylesService } from './services/styles/styles.service';
import { PanelService } from './services/panels/panel.service';
import { CommandService } from './services/commands/command.service';
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


declare var grapesjs: any;
@Component({
    selector: 'app-desktop-screen',
    templateUrl: './desktop-screen.component.html',
    styleUrls: ['./desktop-screen.component.scss']
})
export class DesktopScreenComponent implements OnInit, OnDestroy {
    editor: any;
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
    saveChildURL: String;
    allEntity: any[] = [];
    selectedEntity: any;
    allEntityField: any[] = [];
    selectedProject: any;
    agGridFields: FormGroup;
    selectedFlow: any;
    is_grid_present: Boolean;
    // eventFlows: FormGroup;
    agGridObject: any = {
        html_id: '',
        component_id: '',
        custom_field: [],
        default_field: []
    };
    screenFlows: any[] = [];
    // selectColumn:,
    // selectEntity,
    // selectField,
    columnsOption: any[] = [];
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

    constructor(
        private screenDesignerService: ScreenDesignerService,
        private blockService: BlockService,
        private languageService: LanguageService,
        private styleService: StylesService,
        private panelService: PanelService,
        private traitService: TraitsService,
        private commandService: CommandService,
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
                checkboxSelection: true
            },
            { headerName: 'Label', field: 'label' },
            { headerName: 'Description', field: 'description' },
            { headerName: 'Action', field: 'action_on_data' },


        ];
        this.rowSelection = 'single';
        this.defaultColDef = {
            sortable: true,
            filter: true
        };
        this.dataService.currentAllEntityInfo.subscribe(
            (data) => {
                this.allEntity = data;
                // this.allEntityField = this.allEntity[0].field;
                console.log('all entity in traits are ----- ', this.allEntity);
                //   data.forEach((Entityelement) => {
                //     const temp = {
                //       value: Entityelement.name,
                //       name: Entityelement.name
                //     };
                // this.entityOptions.push(temp);
                // if (this.allEntity[0].name === Entityelement.name) {
                //   Entityelement.field.forEach(fieldElement => {
                //     const fieldTemp = {
                //       value: fieldElement.name,
                //       name: fieldElement.name
                //     };
                //     this.fieldOptions.push(fieldTemp);
                //   });
                // }
                //   });
                // }
            });
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
            });
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
        // this.eventFlows = this.formBuilder.group({
        //     selectEvent: ['', Validators.required]
        // });
        this.saveTemplateURL = this.sharedService.screenUrl + '/user_template/save';
        this.saveChildURL = this.sharedService.screenUrl + '/childTemplate/save';
        const addStyles = [];
        const plugins = ['gjs-grapedrop-preset'];
        const updateParams = {
            method: 'PATCH',
        };
        addStyles.push('./assets/css/gjs-base.css');


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
                styles: [addStyles],
                scripts: []
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
            },
        });
        this.getEntityType();
        this.getAllFlows();
        // this.getSelectedProject();
        this.getProjectDetails();
        this.addCustomBlocks();
        this.declareBlockLanguage();
        this.styleManager();
        this.panelManager();
        this.agGridEntity();
        this.traitService.initializeMethod(this.editor);
        // this.beforeDropElement();
        const test1 = 'test';
        // const is = this.agGridObject;
        const $this = this;
        this.editor.on('component:selected', function (component) {
            if (component.attributes.type === 'grid-type') {
                $this.agGridObject.html_id = component.ccid;
                $this.agGridObject.component_id = component.cid;
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
        this.RemoteStorage.set('params', {
            foldername: `screen${generate(dictionary.numbers, 6)}`,
        });
    }

    ngOnDestroy() {
        console.log('Destroy services called');
        this.dataService.setAgGridEntity('');
        this.currentAgGridData.unsubscribe();
    }

    onFieldOptions(event) {
        const agGridObject = {
            columnid: '',
            columnname: '',
            entity: '',
            entityfield: ''
        };
        console.log('this.agGridFields.value.selectColumn ----  ', this.agGridFields.value.selectColumn);
        if (this.agGridFields.value.selectColumn !== '' &&
            this.agGridFields.value.selectField !== '') {
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
        this.RemoteStorage.set('params', {
            grid_fields: this.agGridObject,
            flows_info: this.screenFlows,
            foldername: `screen${generate(dictionary.numbers, 6)}`,
            is_grid_present: this.is_grid_present,
            project: this.project_id,
            feature: this.feature_id
        });
    }

    getEntityType() {
        this.projectComponentService.getAllEntityType().subscribe(
            (data) => {
                console.log('get entity types before build -----  ', data);
                data.forEach(element => {
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
            //   this.dataFlow = flowData;
            console.log('dataFlow --print--- ', flowData);
            //   this.rowData = flowData;
            this.listOfFLows = flowData;
            if (this.feature_id !== undefined && this.feature_id != null) {
            this.rowData = flowData;
            } else {
                const createFlow = flowData.find(x => x.name === 'GpCreate');
                console.log('project and featureId are create flow ---- ', createFlow);
                this.rowData = [createFlow];
            }
        }, (error) => {
            console.log('cannot get flows in screen designer');
        });
    }

    cancelEvent() {
        this.closeEventPopup();
    }

    closeEventPopup() {
        const eventPopupModel = <HTMLElement>document.querySelector('#EventPopup');
        eventPopupModel.style.display = 'none';
    }

    // save flows
    saveEvent() {
        const flowObj = {
            html_id: '',
            component_id: '',
            flow: ''
        };
        flowObj.html_id = this.editor.getSelected().cid;
        flowObj.component_id = this.editor.getSelected().ccid;
        flowObj.flow = this.selectedFlow[0]._id;
        this.screenFlows.push(flowObj);
        this.saveRemoteStorage();
        this.closeEventPopup();
    }

    onSelectionChanged() {
        this.selectedFlow = this.gridApi.getSelectedRows();
    }

    // buildDataBindingTypes(element) {

    // }

    beforeDropElement() {
        this.editor.on('component:toggled', model => {
            // To inject buttons close to the input fields
            console.log('toggled ----- ', model);
            //  addATButtons();
        });
        // console.log('this editor ----- ', this.editor);
        // console.log('all triats --11--  ', this.editor.DomComponents.getType('input').model
        //     .prototype.defaults);
        // console.log('all triats --12--  ', this.editor.DomComponents.getType('input').model
        //     .prototype.defaults.traits);
        // console.log('all triats --13--  ', this.editor.DomComponents.getType('input').model
        //     .prototype.defaults.traits.push({
        //         type: 'select',
        //         label: 'Data Binding',
        //         name: 'data-binding',
        //         options: this.dataBindingTypes

        //     }));
        // this.editor.DomComponents.getType('input').model
        //     .prototype.defaults.traits.sort((n1, n2) => {
        //         if (n1.name === 'name') {
        //             return true;
        //         } else if (n1.name === 'data-crazy') {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //         console.log('n1 and n2 inside of arrays ----  ', n1, ' --- ', n2);
        //     });

        // console.log('all triats --22--  ', this.editor.TraitManager.getType('input'));
        // this.editor.DomComponents.getType('default')
        //     .model.prototype.defaults.traits.push({ label: 'Crazy Attribute', name: 'data-crazy' });
        this.editor.DomComponents.getType('input').model
            .prototype.defaults.traits.push({
                type: 'select',
                label: 'Data Binding',
                name: 'data-binding',
                options: this.dataBindingTypes

            });
        this.editor.DomComponents.getType('select').model
            .prototype.defaults.traits.push({
                type: 'select',
                label: 'Data Binding',
                name: 'data-binding',
                options: this.dataBindingTypes

            });
        this.editor.DomComponents.getType('radio').model
            .prototype.defaults.traits.push({
                type: 'select',
                label: 'Data Binding',
                name: 'data-binding',
                options: this.dataBindingTypes

            });
        this.editor.DomComponents.getType('textarea').model
            .prototype.defaults.traits.push({
                type: 'select',
                label: 'Data Binding',
                name: 'data-binding',
                options: this.dataBindingTypes

            });
        this.editor.on('block:drag:stop', function (model) {
            const allInputModels = model.find('input');
            const allTextAreaModels = model.find('textarea');
            const allOptionModels = model.find('select');
            const allRadioModels = model.find('.radio');
            const allButtonModels = model.find('.button');
            const allCheckBoxModels = model.find('.checkbox');
            const allImageBlockModels = model.find('.gpd-image-block');
            const allImageModels = model.find('.gjs-plh-image');
            console.log('buttonn are ---- ', allButtonModels);
            // allButtonModels[0].attributes.content = 'testnew';
            // allButtonModels.target.set('content', 'dsfdsfsdf');

            // button default content name changed
            allButtonModels[0].attributes.traits.target.set('content', `button_${generate(dictionary.numbers, 6)}`);
            allInputModels.forEach(models => models.setAttributes({ name: `input_${generate(dictionary.numbers, 6)}` }));
            // allButtonModels.forEach(models => models.setAttributes({ content: `button_${generate(dictionary.numbers, 6)}` }));
            allTextAreaModels.forEach(models => models.setAttributes({ name: `textarea_${generate(dictionary.numbers, 6)}` }));
            allOptionModels.forEach(models => models.setAttributes({ name: `select_${generate(dictionary.numbers, 6)}` }));
            allRadioModels.forEach(models => models.setAttributes({ name: `radio_${generate(dictionary.numbers, 6)}` },
                { value: 1 }));
            allCheckBoxModels.forEach(models => models.setAttributes({ name: `checkbox_${generate(dictionary.numbers, 6)}` }));
            // model.attributes.attributes = {href:"http://teste.com"}
            allImageBlockModels.forEach(models => models.setAttributes({ name: `imageblocks_${generate(dictionary.numbers, 6)}` }));
            allImageModels.forEach(models => models.setAttributes({ name: `image_${generate(dictionary.numbers, 6)}` }));
        });
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
        this.blockService.addAgGrid(this.editor);
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
        this.panelService.addSaveButton(this.editor, this.saveTemplateURL);
        this.panelService.addCancelButton(this.editor);
    }

    onCloseHandled() {
        // const modal = <HTMLElement>document.querySelector('#agGridModal');
        // modal.style.display = 'none';
        this.isGridPopup = false;
        this.agGridArray = [];
        this.allEntityField = [];
        this.ref.detectChanges();
    }

    agGridEntity() {
        this.currentAgGridData = this.dataService.currentAgGridEntitySource.subscribe(
            data => {
                console.log('agGridEntity values are -------  ', data);
                if (data) {
                    this.selectedEntity = data.entity;
                    this.allEntityField = data.entity.field;
                    this.columnsOption = data.customColumn;
                    this.defaultColumn = data.defalutColumn;
                    this.isGridPopup = true;
                    this.agGridArray = [];
                    this.ref.detectChanges();
                }
            }
        );
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridColumnApi = params.columnApi;
    }

    // trackElement(index: number, element: any) {
    //     return element ? element.headerName : null;
    //   }

    showPopupModal() {
        // this.isGridPopup = true;
        // console.log('showPopup mdoels -====  ', this.isGridPopup);
        // this.agGridArray = [];
        const modal = <HTMLElement>document.querySelector('#agGridModal');
        console.log('agGridEntity ag Grid modal are --main--- ', modal);
        modal.style.display = 'block';
        this.agGridArray = [];
    }

}
