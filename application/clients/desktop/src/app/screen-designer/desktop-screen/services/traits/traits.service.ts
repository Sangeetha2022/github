import { Injectable } from '@angular/core';
import { IEntity } from '../../../../project-component/interface/Entity';

declare var ClassicEditor: any;
declare var agGrid: any;
declare var Highcharts: any;
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
  constructor() { }


  initMethod(screenGlobalVariable) {
    this.initializeInputMethod(screenGlobalVariable);
    this.initializeTextAreaMethod(screenGlobalVariable);
    this.initializeSelectMethod(screenGlobalVariable);
    this.initializeCheckboxMethod(screenGlobalVariable);
    this.initializeRadioMethod(screenGlobalVariable);
    this.initializeButtonMethod(screenGlobalVariable);

  }

  // input values are ---
  initializeInputMethod(screenGlobalVariable) {
    const $this = this;
    const comps = screenGlobalVariable.editor.DomComponents;
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
  initializeSelectMethod(screenGlobalVariable) {
    const $this = this;
    const comps = screenGlobalVariable.editor.DomComponents;
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
  initializeTextAreaMethod(screenGlobalVariable) {
    const $this = this;
    const comps = screenGlobalVariable.editor.DomComponents;
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
  initializeRadioMethod(screenGlobalVariable) {
    const $this = this;
    const comps = screenGlobalVariable.editor.DomComponents;
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
  initializeCheckboxMethod(screenGlobalVariable) {
    const $this = this;
    const comps = screenGlobalVariable.editor.DomComponents;
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
  initializeButtonMethod(screenGlobalVariable) {
    const $this = this;
    const comps = screenGlobalVariable.editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;

    comps.addType('button', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          traits: [{
            label: 'Name',
            name: 'name',
            type: 'text',
            changeProp: 1
          }],

        }),
        init() {
          this.listenTo(this, 'change:verbs', this.verb);
        },
        verb() {
          const verbObj = screenGlobalVariable.verbOptions.find(x => x.value === this.changed['verbs']);
          if (verbObj) {
            screenGlobalVariable.buttonVerb = verbObj.key;
          }
        }
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

  addGridTraits(screensVariable, buttonName) {
    // this.getEntityData(editor, buttonName, projectId);
    const $this = this;
    const comps = screensVariable.editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    let selectedEntityName = '';
    let selectedEntity;
    let selectedColumnId = 'col1_id';
    const gridOptionsInString = JSON.stringify(screensVariable.agGridObject);
    console.log('screenvariable gridOptions are -----  ', screensVariable.agGridObject);
    console.log('before set to screensVariable.columnOptions --v---  ', screensVariable.columnOptions);
    const secGridString = JSON.stringify(screensVariable.agGridObject.custom_field);
    comps.addType(buttonName, {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          myModelCount: 5,
          myModelPropName: '{name: age}',
          gridOptions: gridOptionsInString,
          secGrid: secGridString,
          script: function () {
            const gridOptions = JSON.parse('{[ gridOptions ]}');
            const initAgGrid = () => {
              let columnDefs = [];
              let rowData = [];
              if (gridOptions &&
                gridOptions.custom_field &&
                gridOptions.custom_field.length > 0) {
                columnDefs = [];
                for (const key of gridOptions.custom_field) {
                  for (let i = 0; i < 30; i++) {
                    const newObject = gridOptions.custom_field.reduce((o, objectKey) =>
                      Object.assign(o, { [objectKey.columnname]: `${objectKey.columnname}${Math.floor(Math.random() * 10000)}` }), {});
                    rowData.push(newObject);
                  }
                  const temp = {
                    headerName: '',
                    field: '',
                    sortable: true,
                    colId: ''
                  };
                  temp.headerName = key.columnname;
                  temp.field = key.columnname;
                  temp.colId = key.columnid;
                  columnDefs.push(temp);
                }
              } else {
                columnDefs = [
                  {
                    headerName: 'A',
                    field: 'a',
                    sortable: true,
                    colId: 'col1_id'
                  },
                  {
                    headerName: 'B',
                    field: 'b',
                    sortable: true,
                    colId: 'col2_id'
                  },
                  {
                    headerName: 'C',
                    field: 'c',
                    sortable: true,
                    colId: 'col3_id'
                  },
                  {
                    headerName: 'D',
                    field: 'd',
                    sortable: true,
                    colId: 'col4_id'
                  },
                  {
                    headerName: 'E',
                    field: 'e',
                    sortable: true,
                    colId: 'col5_id'
                  }
                ];
                rowData = createRowData();
              }

              function createRowData() {
                const tempData = [];
                for (let i = 0; i < 100; i++) {
                  // create sample row item
                  const rowItem = {
                    // is is simple
                    a: 'aa' + Math.floor(Math.random() * 10000),
                    b: 'bb' + Math.floor(Math.random() * 10000),
                    c: 'cc' + Math.floor(Math.random() * 10000),
                    d: 'dd' + Math.floor(Math.random() * 10000),
                    e: 'ee' + Math.floor(Math.random() * 10000)
                  };
                  tempData.push(rowItem);
                }
                return tempData;
              }
              this.gridOptions = {
                defaultColDef: {
                  editable: true
                },
                columnDefs: columnDefs,
                rowData: rowData,
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
            options: screensVariable.columnOptions,
          }, {
            type: 'text',
            label: 'colName',
            name: 'colname',
            changeProp: 1
          }],

        }),
        init() {
          this.listenTo(this, 'change:name', this.ElementName);
          this.listenTo(this, 'change:entities', this.entities); // listen for active event
          this.listenTo(this, 'change:columns', this.gridColumns);
          this.listenTo(this, 'change:colname', this.columnName);
          this.listenTo(this, 'change:verbs', this.verb);
          // this.listenTo(this, 'change:entity-field', this.entityField);
        },
        ElementName() {

        },
        verb() {
          const verbObj = screensVariable.verbOptions.find(x => x.value === this.changed['verbs']);
          if (verbObj) {
            screensVariable.routeDetails.verb = verbObj.key;
          }
        },
        columnName() {

          console.log('sessionStorage details are --this---- ', this);
          console.log('sessionStorage details are --this-222--- ', this.view.el.gridOptions, selectedColumnId);
          const enteredColName = this.changed['colname'];
          const colTraits = this.get('traits').where({ name: 'columns' })[0];
          const selectedColumns = this.view.el.gridOptions.api.getColumnDef(selectedColumnId);
          console.log('sessionStorage get all columnDef --333--- ', selectedColumns);
          selectedColumns.headerName = enteredColName;
          this.view.el.gridOptions.api.refreshHeader();
          console.log('sessionStorage 333 colName ----- ', this.view.el.gridOptions);
          console.log('sessionStorage 444 colOptions ----- ', screensVariable.columnOptions);
          console.log('sessionStorage 555 agGridArray ----- ', screensVariable.agGridArray);
          const indexFound = screensVariable.agGridArray.findIndex(x => x.columnid === selectedColumns.colId);
          if (indexFound > -1) {
            screensVariable.agGridArray[indexFound].columnname = enteredColName;
          }
          screensVariable.columnOptions.forEach(columnElement => {
            if (columnElement.value === selectedColumnId) {
              columnElement.name = enteredColName;
              console.log('entered into screen valr ---- ', columnElement);
              const customField = screensVariable.agGridObject.custom_field.find(x => x.columnid === selectedColumnId);
              if (customField) {
                customField.columnname = enteredColName;
              }
              console.log('after set tge grid ojbect c ---  ', screensVariable.agGridObject.custom_field);
              screensVariable.saveRemoteStorage();
            }
          });
          console.log('after set the column Options values are ----   ', screensVariable.columnOptions);
          colTraits.set('options', screensVariable.columnOptions);
          // this.changed['colname'] = '';
          screensVariable.editor.TraitManager.getTraitsViewer().render();
          // this.changed['colname'] = '';
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
          selectedColumnId = this.changed['columns'];
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
  // getEntityData(editor, buttonName, projectId) {
  //   this.entityOptions = [];
  //   this.fieldOptions = [];
  //   this.projectComponentService.getEntityByProjectId(projectId).subscribe(
  //     (data) => {
  //       this.allEntity = data;
  //       console.log('all entity in traits service file are ----- ', this.allEntity);
  //       this.entityOptions.push({ value: 'none', name: 'none' });
  //       data.forEach((Entityelement) => {
  //         const temp = {
  //           value: Entityelement.name,
  //           name: Entityelement.name
  //         };
  //         this.entityOptions.push(temp);
  //         console.log('entities in traits are --- ', this.entityOptions);
  //         if (this.allEntity[0].name === Entityelement.name) {
  //           Entityelement.field.forEach(fieldElement => {
  //             const fieldTemp = {
  //               value: fieldElement.name,
  //               name: fieldElement.name
  //             };
  //             this.fieldOptions.push(fieldTemp);
  //           });
  //         }
  //       });
  //       // this.gridTraits(editor, buttonName);
  //     },
  //     (error) => {
  //       console.log('error in get entities ---- ', error);
  //       // this.gridTraits(editor, buttonName);
  //     }
  //   );
  // }

  addPopupModalTraits(editor, buttonName) {
    const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    comps.addType(buttonName, {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          components: '<button>Modal</button>',
          style: {
            'padding-top': '10px',
            'padding-right': '2px',
            'padding-left': '2px',
            'padding-bottom': '10px'
          },
          traits: []
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
    const labelSelectOption = [
      'name'
    ];

    comps.addType(buttonName, {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          components: `<select>
          <option value="1">1</option>
          <option value="2">2</option>
          </select>`,
          style: {
            'padding-top': '10px',
            'padding-right': '2px',
            'padding-left': '2px',
            'padding-bottom': '10px'
          },
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


  addHighChartTraits(editor, buttonName) {
    const comps = editor.DomComponents;
    const $this = this;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    const labelSelectOption = [
      'name'
    ];

    comps.addType(buttonName, {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          components: `<div id="containerchart" style="width:100%; height:400px;"></div>`,
          script: function () {
            const initHighChart = function () {
              const myChart = Highcharts.chart('containerchart', {
                chart: {
                  type: 'bar'
                },
                title: {
                  text: 'Fruit Consumption'
                },
                xAxis: {
                  categories: ['Apples', 'Bananas', 'Oranges']
                },
                yAxis: {
                  title: {
                    text: 'Fruit eaten'
                  }
                },
                series: [{
                  name: 'Jane',
                  data: [1, 0, 4]
                }, {
                  name: 'John',
                  data: [5, 7, 3]
                }]
              });
              // });
            };
            let exists = false;
            const url = 'https://code.highcharts.com/highcharts.js';
            const scripts = document.getElementsByTagName('script');
            for (let i = scripts.length; i--;) {
              if (scripts[i].src === url) {
                exists = true;
              }
            }
            if (!exists) {
              const script = document.createElement('script');
              script.onload = initHighChart;
              script.src = url;
              document.body.appendChild(script);
            } else {
              initHighChart();
            }
          },
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

}
