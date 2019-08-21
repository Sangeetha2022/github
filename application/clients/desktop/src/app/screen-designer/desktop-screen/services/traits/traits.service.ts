import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/data.service';
import { IEntity } from '../../../../project-component/interface/Entity';
import * as dictionary from 'nanoid-dictionary';
import * as generate from 'nanoid/generate';
import { CustomTraitsService } from './custom-traits.service';
import { ProjectComponentService } from 'src/app/project-component/project-component.service';

declare var ClassicEditor: any;
declare var agGrid: any;
@Injectable({
  providedIn: 'root'
})
export class TraitsService {

  public entityOptions: any[] = [];
  public fieldOptions: any[] = [];
  public allEntity: IEntity[] = [];
  public agGridValue: any[] = [{
    column: '',
    field: '',
    entity: ''
  }];
  public verbOptions: any[] = [
    { key: 'click', value: 'onClick' },
    { key: 'focus', value: 'onFocus' },
    { key: 'blur', value: 'onBlur' }
  ];
  public screenArray: any[] = [];
  constructor(
    private dataService: DataService,
    private projectComponentService: ProjectComponentService,
    private customTraitService: CustomTraitsService
  ) { this.initVariable(); }

  initVariable() {
    this.screenArray = [];
  }

  initMethod(editor) {
    this.initializeInputMethod(editor);
    this.initializeTextAreaMethod(editor);
    this.initializeSelectMethod(editor);
    this.initializeCheckboxMethod(editor);
    this.initializeRadioMethod(editor);
    this.initializeButtonMethod(editor);

  }

  // input values are ---
  initializeInputMethod(editor) {
    const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    comps.addType('input', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          traits: [
            { name: 'name', label: 'Name', changeProp: 1, type: 'text' },
            { name: 'placeholder', label: 'Placeholder' },
            {
              label: 'Type',
              type: 'select',
              name: 'type',
              options: [{ value: 'text', name: 'Text' },
              { value: 'email', name: 'Email' },
              { value: 'password', name: 'Password' },
              { value: 'number', name: 'Number' }]
            },
            { type: 'checkbox', name: 'required', label: 'Required' }
          ]
        })
      },
        {
          isComponent: function (el) {
            console.log('ram iscomponent for radio tagname and ttype', el.tagName, '  ---  ', el);
            if (el.tagName === 'INPUT') {
              return {
                type: 'input'
              };
            }
          },
        }),

      // Define the View
      view: defaultType.view,
    });
  }

  // Select values are ---
  initializeSelectMethod(editor) {
    const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;

    comps.addType('select', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          traits: [
            { name: 'name', label: 'Name', changeProp: 1 },
            { label: 'Options', type: 'select-options' },
            { type: 'checkbox', name: 'required', label: 'Required' },
          ],

        })
      },
        {
          isComponent: function (el) {
            console.log('ram iscomponent for radio tagname and ttype', el.tagName, '  ---  ', el);
            if (el.tagName === 'SELECT') {
              return {
                type: 'select'
              };
            }
          },
        }),

      // Define the View
      view: defaultType.view,
    });
  }

  // textarea are ---
  initializeTextAreaMethod(editor) {
    const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;

    comps.addType('textarea', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          traits: [
            { name: 'name', label: 'Name', changeProp: 1 },
            { name: 'placeholder', label: 'Placeholder' },
            { type: 'checkbox', name: 'required', label: 'Required' }
          ],

        })
      },
        {
          isComponent: function (el) {
            console.log('ram iscomponent for radio tagname and ttype', el.tagName, '  ---  ', el);
            if (el.tagName === 'TEXTAREA' && el.type === 'textarea') {
              return {
                type: 'textarea'
              };
            }
          },
        }),

      // Define the View
      view: defaultType.view,
    });
  }

  // Radio values are ---
  initializeRadioMethod(editor) {
    const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;

    comps.addType('radio', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          traits: [{ name: 'id', label: 'ID' },
          { name: 'name', label: 'Name', changeProp: 1 },
          { name: 'value', label: 'Value' },
          { type: 'checkbox', name: 'required', label: 'Required' },
          { label: 'Checked', type: 'checkbox', name: 'checked', changeProp: 1 }],

        })
      },
        {
          isComponent: function (el) {
            console.log('ram iscomponent for radio tagname and ttype', el.tagName, '  ---  ', el);
            console.log('ram iscomponent for radio tagname and ttype', el.tagName, '  ---  ');
            if (el.tagName === 'INPUT' && el.type === 'radio') {
              return {
                type: 'radio'
              };
            }
          },
        }),

      // Define the View
      view: defaultType.view,
    });
  }

  // checkbox values are ---
  initializeCheckboxMethod(editor) {
    const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;

    comps.addType('checkbox', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          traits: [{ name: 'id', label: 'ID' },
          { name: 'name', label: 'Name', changeProp: 1 },
          { name: 'value', label: 'Value' },
          { type: 'checkbox', name: 'required', label: 'Required' },
          { label: 'Checked', type: 'checkbox', name: 'checked', changeProp: 1 }],

        })
      },
        {
          isComponent: function (el) {
            console.log('ram iscomponent for radio tagname and ttype', el.tagName, '  ---  ', el);
            if (el.tagName === 'INPUT' && el.type === 'checkbox') {
              return {
                type: 'checkbox'
              };
            }
          },
        }),

      // Define the View
      view: defaultType.view,
    });
  }

  // button traits
  initializeButtonMethod(editor) {
    const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;

    // content traits
    this.customTraitService.content(editor);
    // flows action button traits
    this.customTraitService.flowsActionButton(editor);

    comps.addType('button', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          traits: [{
            type: 'content',
            label: 'contentName',
            name: 'contentname',
            changeProp: 1
          },
          {
            label: 'Name',
            name: 'name',
            type: 'text',
            changeProp: 1
          },
          {
            'name': 'actionButton',
            'label': 'Action',
            'type': 'actionButton',
          }],

        })
      },
        {
          isComponent: function (el) {
            if (el.tagName === 'BUTTON') {
              return {
                type: 'button'
              };
            }
          },
        }),

      // Define the View
      view: defaultType.view,
    });
  }



  getEntityData(projectId) {
    this.entityOptions = [];
    this.fieldOptions = [];
    this.projectComponentService.getEntityByProjectId(projectId).subscribe(
      (data) => {
        this.allEntity = data;
        console.log('all entity in traits service file are ----- ', this.allEntity);
        this.entityOptions.push({ value: 'none', name: 'none' });
        data.forEach((Entityelement) => {
          const temp = {
            value: Entityelement.name,
            name: Entityelement.name
          };
          this.entityOptions.push(temp);
          console.log('entities in traits are --- ', this.entityOptions);
          if (this.allEntity[0].name === Entityelement.name) {
            Entityelement.field.forEach(fieldElement => {
              const fieldTemp = {
                value: fieldElement.name,
                name: fieldElement.name
              };
              this.fieldOptions.push(fieldTemp);
            });
          }
        });
      }
    );
  }

  addCKEditorTraits(editor, buttonName) {
    const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    // typemodels
    // const typeModel = comps.getType(buttonName).model;
    comps.addType(buttonName, {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          script: function () {
            const initCKeditor = function () {
              ClassicEditor.create(document.querySelector('#ckeditortextarea'))
                .then(obj => {
                  console.log(obj);
                })
                .catch(error => {
                  console.error(error);
                });
            };
            if (typeof ClassicEditor === 'undefined') {
              const script = document.createElement('script');
              script.onload = initCKeditor;
              script.src = 'https://cdn.ckeditor.com/ckeditor5/11.2.0/classic/ckeditor.js';
              document.body.appendChild(script);
            } else {
              initCKeditor();
            }
          },
          traits: [{
            label: 'name',
            name: 'name',
            changeProp: 1,
            type: 'text'
          }],

        })
      },
        {
          isComponent: function (el) {
            if (el.tagName === buttonName) {
              return {
                type: buttonName
              };
            }
          },
        }),

      // Define the View
      view: defaultType.view,
    });
  }

  addGridTraits(editor, buttonName, projectId) {
    this.getEntityData(projectId);
    const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    let selectedEntityName = '';
    let selectedEntity;
    let selectedColumnName = 'col1_id';
    const columnOptions = [
      { value: 'col1_id', name: 'a' },
      { value: 'col2_id', name: 'b' },
      { value: 'col3_id', name: 'c' },
      { value: 'col4_id', name: 'd' },
      { value: 'col5_id', name: 'e' }
    ];
console.log('entityOptions values are ---- ', this.entityOptions);
console.log('fieldOptions values are ---- ', this.fieldOptions);
    // add rows trits
    this.customTraitService.addGridRowButton(editor, columnOptions);
    // remove rows triats
    this.customTraitService.removeGridRowButton(editor, columnOptions);
    // add field binding button
    this.customTraitService.gridFieldButton(editor, this, selectedEntity, columnOptions);

    comps.addType(buttonName, {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          script: function () {
            const initAgGrid = () => {
              const columnDefs = [
                {
                  headerName: 'A',
                  field: 'a',
                  sortable: true,
                  colId: 'col1_id'
                },
                {
                  headerName: 'B',
                  field: 'b.name',
                  sortable: true,
                  colId: 'col2_id'
                },
                {
                  headerName: 'C',
                  field: 'c.name',
                  sortable: true,
                  colId: 'col3_id'
                },
                {
                  headerName: 'D',
                  field: 'd.name',
                  sortable: true,
                  colId: 'col4_id'
                },
                {
                  headerName: 'E',
                  field: 'e.name',
                  sortable: true,
                  colId: 'col5_id'
                }
              ];

              function createRowData() {
                const rowData = [];
                for (let i = 0; i < 100; i++) {
                  // create sample row item
                  const rowItem = {
                    // is is simple
                    a: 'aa' + Math.floor(Math.random() * 10000),
                    // but b, c, d and e are all complex objects
                    b: {
                      name: 'bb' + Math.floor(Math.random() * 10000)
                    },
                    c: {
                      name: 'cc' + Math.floor(Math.random() * 10000)
                    },
                    d: {
                      name: 'dd' + Math.floor(Math.random() * 10000)
                    },
                    e: {
                      name: 'ee' + Math.floor(Math.random() * 10000)
                    },
                    f: {
                      name: 'ee' + Math.floor(Math.random() * 10000)
                    }
                  };
                  rowData.push(rowItem);
                }
                return rowData;
              }
              this.gridOptions = {
                defaultColDef: {
                  editable: true
                },
                columnDefs: columnDefs,
                rowData: createRowData(),
                components: {
                  boldRenderer: function (params) {
                    return '<b>' + params.value.name + '</b>';
                  }
                },
                onGridReady: function (params) {
                  params.api.sizeColumnsToFit();

                  window.addEventListener('resize', function () {
                    setTimeout(function () {
                      params.api.sizeColumnsToFit();
                    });
                  });
                },
                paginationAutoPageSize: true,
                pagination: true,
              };
              const gridDiv = document.querySelector('#myGrid');
              // tslint:disable-next-line:no-unused-expression
              new agGrid.Grid(gridDiv, this.gridOptions);
              this.gridOptions.cacheQuickFilter = false;
              this.gridOptions.api.sizeColumnsToFit();
            };
            let exists = false;
            const url = 'https://unpkg.com/ag-grid-community@20.0.0/dist/ag-grid-community.min.js';
            const scripts = document.getElementsByTagName('script');
            for (let i = scripts.length; i--;) {
              if (scripts[i].src === url) {
                exists = true;
              }
            }
            if (exists) {
              initAgGrid();
            } else {
              const script = document.createElement('script');
              script.onload = initAgGrid;
              script.src = url;
              document.body.appendChild(script);
            }
          },
          traits: [{
            label: 'Name',
            name: 'name',
            changeProp: 1,
            type: 'text'
          }, {
            type: 'select',
            label: 'columns',
            name: 'columns',
            changeProp: 1,
            options: columnOptions,
          }, {
            type: 'text',
            label: 'colName',
            name: 'colname',
            changeProp: 1
          },
          {
            type: 'select',
            label: 'entities',
            name: 'entities',
            changeProp: 1,
            options: this.entityOptions,
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
            'name': 'addButton',
            'label': 'Add',
            'type': 'addButton',
          },
          {
            'name': 'removeButton',
            'label': `Remove`,
            'type': 'removeButton',
          }],

        }),
        init() {
          this.listenTo(this, 'change:name', this.ElementName);
          this.listenTo(this, 'change:entities', this.entities); // listen for active event
          this.listenTo(this, 'change:columns', this.gridColumns);
          this.listenTo(this, 'change:colname', this.columnName);
          // this.listenTo(this, 'change:entity-field', this.entityField);
        },
        ElementName() {

        },
        columnName() {

          console.log('sessionStorage details are --this---- ', this);
          console.log('sessionStorage details are --this-222--- ', this.view.el.gridOptions, selectedColumnName);
          const enteredColName = this.changed['colname'];
          const colTraits = this.get('traits').where({ name: 'colname' })[0];
          console.log('sessionStorage get all columnDef --333--- ', this.view.el.gridOptions.api.getColumnDef(selectedColumnName));
          this.view.el.gridOptions.api.getColumnDef(selectedColumnName).headerName = enteredColName;
          this.view.el.gridOptions.api.refreshHeader();
          console.log('sessionStorage 333 colName ----- ', this.view.el.gridOptions);
          console.log('sessionStorage 444 colOptions ----- ', columnOptions);
          const id = editor.getSelected().ccid;
          columnOptions.forEach(columnElement => {
            if (columnElement.value === selectedColumnName) {
              columnElement.name = enteredColName;
            }
          });
          colTraits.set('options', columnOptions);
          editor.TraitManager.getTraitsViewer().render();
        },
        entities() {
          // let isExist = false;
          // agGridArray.forEach(gridElement => {
          //   if (element.name === gridElement.entity) {
          //     isExist = true;
          //   }
          // });
          // if (isExist) {
          //   agGridArray.push();
          // }
          selectedEntity = undefined;
          // console.log('entities ------ ', this);
          // console.log('entities ------ ', localDataService);
          selectedEntityName = this.changed['entities'];
          // console.log('entities ---33--- ', selectedEntityName);
          // const fieldTraits = this.get('traits').where({ name: 'entity-field' })[0];
          // console.log('entities ---44--- ', fieldTraits);
          // const options = [];
          // console.log('entities --55---- ', allEntityTemp.length);
          $this.allEntity.forEach(entityElement => {
            if (entityElement.name === selectedEntityName) {
              // localDataService.setAgGridEntity(entityElement);
              if (selectedEntityName !== 'none') {
                selectedEntity = entityElement;
              }
            }
          });
          //     entityElement.field.forEach(fieldElement => {
          //       const temp = {
          //         value: fieldElement.name,
          //         name: fieldElement.name
          //       };
          //       options.push(temp);
          //     });
          //   }
          // });
          // fieldTraits.set('options', options);
          // editor.TraitManager.getTraitsViewer().render();

        },
        gridColumns() {
          selectedColumnName = this.changed['columns'];
        },
        toHTML: function () {
          const html = this.view.el.innerHTML;
          console.log('rnder html are ---------------- ', html);
          const replacedValue = `<div style="height: 80%; padding-top: 10px; box-sizing: border-box;">
         <ag-grid-angular #agGrid style="width: 100%; height: 100%;" id="myGrid" class="ag-theme-balham" [animateRows]="true"
         [gridOptions]="gridOptions" (gridReady)="onGridReady($event)" domLayout='autoHeight'></ag-grid-angular>
         </div>
       `;
          return replacedValue;
        }
      },
        {
          isComponent: function (el) {
            if (el.tagName === buttonName) {
              return {
                type: buttonName
              };
            }
          },
        }),

      // Define the View
      view: defaultType.view,
    });
  }

  addSpecialButtonTraits(editor, buttonName) {
    const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    comps.addType(buttonName, {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          traits: [{
            label: 'name',
            name: 'name',
            changeProp: 1,
            type: 'text'
          }, {
            type: 'select',
            label: 'entities',
            name: 'entities',
            changeProp: 1,
            options: this.entityOptions,
          }, {
            type: 'select',
            label: 'attributes',
            name: 'entityattributes',
            changeProp: 1,
            options: [],
          }],

        }),
        init() {
          this.listenTo(this, 'change:name', this.ElementName);
          this.listenTo(this, 'change:entities', this.entity);
          this.listenTo(this, 'change:entityattributes', this.attributeVal); // listen for active event
        },
        ElementName() {

        },
        entity() {
          const entityTrait = this.get('traits').where({ name: 'entityattributes' })[0];
          const changedValue = this.changed['entities'];
          const options = [];
          if ($this.allEntity.length > 0) {
            $this.allEntity.forEach(entityElement => {
              if (entityElement.name === changedValue) {
                entityElement.field.forEach(childElement => {
                  const temp = {
                    value: childElement.Name,
                    name: childElement.Name
                  };
                  options.push(temp);
                });
              }
            });
          }
          entityTrait.set('options', options);
          editor.TraitManager.getTraitsViewer().render();
        },
        attributeVal() {
        }
      },
        {
          isComponent: function (el) {
            if (el.tagName === buttonName) {
              return {
                type: buttonName
              };
            }
          },
        }),

      // Define the View
      view: defaultType.view,
    });
  }
  addSpecialDropdownTraits(editor, buttonName) {
    const comps = editor.DomComponents;
    const $this = this;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;

    comps.addType(buttonName, {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          traits: [{
            label: 'name',
            name: 'name',
            type: 'text',
            changeProp: 1
          }, {
            type: 'select',
            label: 'entities',
            name: 'entities',
            changeProp: 1,
            options: this.entityOptions,
          }, {
            type: 'select',
            label: 'attributes',
            name: 'entityattributes',
            changeProp: 1,
            options: [],
          }],

        }),
        init() {
          this.listenTo(this, 'change:name', this.ElementName);
          this.listenTo(this, 'change:entities', this.entity);
          this.listenTo(this, 'change:entityattributes', this.attributeVal); // listen for active event
        },
        ElementName() {

        },
        entity() {
          const entityTrait = this.get('traits').where({ name: 'entityattributes' })[0];
          const changedValue = this.changed['entities'];
          const options = [];
          if ($this.allEntity.length > 0) {
            $this.allEntity.forEach(entityElement => {
              if (entityElement.name === changedValue) {
                entityElement.field.forEach(childElement => {
                  const temp = {
                    value: childElement.Name,
                    name: childElement.Name
                  };
                  options.push(temp);
                });
              }
            });
          }
          entityTrait.set('options', options);
          editor.TraitManager.getTraitsViewer().render();
        },
        attributeVal() {
        }
      },
        {
          isComponent: function (el) {
            if (el.tagName === buttonName) {
              return {
                type: buttonName
              };
            }
          },
        }),

      view: defaultType.view,
    });
  }

  setScreenInfo(htmlId, componentId, flow) {
    const screenObj = {
      button: {
        htmlId: undefined,
        componentId: undefined,
        action: undefined
      }
    };
    screenObj.button.htmlId = htmlId;
    screenObj.button.componentId = componentId;
    screenObj.button.action = flow;
    this.screenArray.push(screenObj);
    console.log('button rnder html set screen info ------ ', this.screenArray);
  }

  getScreenInfo() {
    return this.screenArray;
  }

}
