import { Injectable } from '@angular/core';
import { IEntity } from 'src/app/project-component/interface/Entity';
import { Dataservice } from '../../../../broadcast.service';
declare var ClassicEditor: any;
declare var Highcharts: any;
declare var agGrid: any;

@Injectable({
  providedIn: 'root'
})

export class TraitsService {
  //public gridOptions: GridOptions;
  public entitylist: any[] = [];
  public entityOptions: any[] = [];
  public allEntity: IEntity[] = [];
  constructor(private broadcastservice: Dataservice) { 

  }
  initMethod(screenGlobalVariable:any) {
    this.initializeInputMethod(screenGlobalVariable);
    this.initializeSelectMethod(screenGlobalVariable);
     this.initializeRadio_CheckBoxMethod(screenGlobalVariable);
    this.initializeButtonMethod(screenGlobalVariable);
   this.initializeLabelMethod(screenGlobalVariable);
  }

  initializeInputMethod(screenGlobalVariable:any) {
    this.entitylist = [];
    const $this = this;
    const comps = screenGlobalVariable.editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    console.log("defaultModel",defaultModel);
    
    comps.addType('input', {
      isComponent: (el: { tagName: string; }) => { el.tagName === 'INPUT'},
      model: {
        defaults: {
          draggable: '*',
          droppable: false,
          traits: [
            { name: 'name', label: 'Name', changeProp: 1, type: 'text' },
            { name: 'placeholder', label: 'Placeholder' },
            { type: 'checkbox', name: 'required', label: 'Required' },
            {
              type: 'select',
              label: 'FieldType',
              name: 'entity',
              options: [],
              changeProp: 1
            },
          ],       
        }
        
      },

      // Define the View
      view: defaultType.view
    });
  }
    // label traits
    initializeLabelMethod(screenGlobalVariable:any) {
      const comps = screenGlobalVariable.editor.DomComponents;
      console.log("comps==>",comps);
      const defaultType = comps.getType('default');
      console.log("defaultType==>",defaultType);
      const defaultModel = defaultType.model;
      console.log("defaultModel==>",defaultModel);
      comps.addType('label', {
        model: defaultModel.extend(
          {
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
              draggable: '*',
              droppable: false,
              traits: [
                {
                  label: 'Name',
                  name: 'name',
                  type: 'text',
                  changeProp: 1
                },
                {
                  type: 'content',
                  label: 'contentName',
                  name: 'contentname',
                  changeProp: 1
                },
              ],
            }),
            init() {
             // this.listenTo(this,'change:contentname',this.chartTitle);
            },
          },
          {
            isComponent:  (el: { tagName: string; })=> {
              if (el.tagName === 'LABEL') {
                return {
                  type: 'label'
                };
              }
            }
          }
        ),
  
        // Define the View
      
        view: defaultType.view
      });
    }

  // Select values are ---
  initializeSelectMethod(screenGlobalVariable:any) {
    const $this = this;
    const comps = screenGlobalVariable.editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;

    comps.addType('select', {
      model: defaultModel.extend(
        {
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            draggable: '*',
            droppable: false,
            traits: [
              { name: 'name', label: 'Name', changeProp: 1 },
              { label: 'Options', type: 'select-options' },
              {
                type: 'select',
                label: 'FieldType',
                name: 'entity',
                options: [],
                changeProp: 1
              },
              // { type: 'checkbox', name: 'required', label: 'Required' }
            ]
          })
        },
        {
          isComponent: function (el: { tagName: string; }) {
            if (el.tagName === 'SELECT') {
              return {
                type: 'select'
              };
            }
          }
        }
      ),

      // Define the View
      view: defaultType.view
    });
  }
    // button traits
    initializeButtonMethod(screenGlobalVariable:any) {
      const comps = screenGlobalVariable.editor.DomComponents;
      const defaultType = comps.getType('default');
      const defaultModel = defaultType.model;
  
      comps.addType('button', {
        model: defaultModel.extend(
          {
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
              draggable: '*',
              droppable: false,
            //  editable:true,
              traits: [
                {
                  label: 'Name',
                  name: 'name',
                  type: 'text',
                  changeProp: 1
                },
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
                  options: [
                    { key: 'click', value: 'onClick' },
                    { key: 'focus', value: 'onFocus' },
                    { key: 'blur', value: 'onBlur' }
                  ]
                },
                
              ]
            }),
            init() {
              this.listenTo(this, 'change:verbs', this.verb);
              this.listenTo(this, 'change:modifiers', this.modifier);
            },
            verb() {
              const verbObj = screenGlobalVariable.verbOptions.find(
                (x: { value: any; }) => x.value === this.changed['verbs']
              );
              console.log("verb is",verbObj);
              
              if (verbObj) {
                screenGlobalVariable.buttonVerb = verbObj.key;
              }
            },
            modifier() {
              const modifierObj = screenGlobalVariable.filterModifiers.find(
                (                x: { value: any; }) => x.value === this.changed['modifiers']
              );
              if (modifierObj) {
                screenGlobalVariable.modifierUsageObject.modifier_id = modifierObj.key;
                screenGlobalVariable.modifierUsageObject.modifier_name = modifierObj.value;
                screenGlobalVariable.modifierUsageObject.modify_target_type = 'flow';
              }
            }
          },
          {
            isComponent:  (el: { tagName: string; })=> {
              if (el.tagName === 'button') {
                return {
                  type: 'button'
                };
              }
            }
          }
        ),
  
        // Define the View
        view: defaultType.view
      });
    }
      // Radio and checkbox values values are ---
  initializeRadio_CheckBoxMethod(screenGlobalVariable:any) {
    const $this = this;
    const comps = screenGlobalVariable.editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;

    comps.addType('radio', {
      isComponent: (el: { tagName: string; }) => { el.tagName === 'INPUT'},
      model: defaultModel.extend(
        {
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            draggable: '*',
            droppable: false,
            traits: [
              { name: 'id', label: 'ID' },
              { name: 'name', label: 'Name', changeProp: 1 },
              { name: 'value', label: 'Value' },
              { type: 'checkbox', name: 'required', label: 'Required' },
              {
                label: 'Checked',
                type: 'checkbox',
                name: 'checked',
                changeProp: 1
              },
              {
                type: 'select',
                label: 'entity',
                name: 'entity',
                options: [],
                changeProp: 1
              }
            ]
          })
        },
      ),

      // Define the View
      view: defaultType.view
    });
  }
  addCKEditorTraits(editor:any, buttonName:any) {
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    comps.addType(buttonName, {
      model: defaultModel.extend(
        {
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            draggable: '*',
            droppable: false,
            script: function () {
              const initCKeditor = function () {
                ClassicEditor.create(
                  document.querySelector('#ckeditortextarea')
                )
              };
              if (typeof ClassicEditor === 'undefined') {
                const script = document.createElement('script');
                script.onload = initCKeditor;
                script.src =
                  'https://cdn.ckeditor.com/ckeditor5/11.2.0/classic/ckeditor.js';
                document.body.appendChild(script);
              } else {
                initCKeditor();
              }
            },
          })
        },
        {
          isComponent: (el:any)=>{
            if (el.tagName === buttonName) {
              return {
                type: buttonName
              };
            }
            else{return null}
          }
        }
      ),

      // Define the View
      view: defaultType.view
    });
  }
  addHighChartTraits(editor:any, buttonName:any) {
    const comps = editor.DomComponents;
    const $this = this;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    const dType = comps.getType(buttonName);
    const dView = defaultType.view;
    const chartType = 'bar';
    const chartTitle='Food Used';
    const chartInverted='true';
    comps.addType(buttonName, {
      model: defaultModel.extend(
        {
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            draggable: '*',
            droppable: false,
            charttype: chartType,
            charttitle:chartTitle,
            chartinverted:chartInverted,
            script: function () {
              const initHighChart = function () {
                const myChart = Highcharts.chart('highchart4', {
                  chart: {
                    type: '{[ charttype ]}',
                  
                    inverted: '{[ chartinverted ]}'     
                  },
                  title: {
                    text: '{[ charttitle ]}'
                  },
                  xAxis: {
                    categories: ['Apples', 'Bananas', 'Oranges']
                  },
                  yAxis: {
                    title: {
                      text: 'Fruit eaten'
                    }
                  },
                  series: [
                    {
                      name: 'Jane',
                      data: [1, 50, 100]
                    },
                    {
                      name: 'John',
                      data: [5, 30, 3]
                    }
                  ]
                });
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
            traits: [
              {
                label: 'Type',
                type: 'select',
                name: 'charttype',
                options: [
                  { value: 'bar', name: 'bar' },
                  { value: 'line', name: 'line' },
                  { value: 'column', name: 'column' },
                  { value: 'area', name: 'area' }
                ],
                changeProp: 1
              },
              {
                label: 'Convertion',
                type: 'select',
                name: 'chartinverted',
                options: [
                  { value: true, name: 'true' },
                  { value: false, name: 'false' },
                ],
                changeProp: 1
              },
              {
                label:'Title',
                type:'text',
                name:'charttitle',
                changeProp: 1
              },
            ]
          }),
          init() {
            this.listenTo(this, 'change:charttype', this.chartType);
            this.listenTo(this,'change:charttitle',this.chartTitle);
            this.listenTo(this,'change:chartinverted',this.chartInverted);
           
          },
          chartType() { 
            const view = this.getView(); 
            view && view.render();
            
         },
         chartTitle(){
             const view = this.getView(); 
           view && view.render();
 
         },
        
         chartInverted(){
           const view = this.getView(); 
           console.log("view is",view);
           
           view && view.render();
         },
        },
        {
          isComponent:  (el:any)=> {
            if (el.tagName === buttonName) {
              return {
                type: buttonName
              };
            }
            else return
          }
        }
      ),

      view: defaultType.view
    });
  }

  dynamicDropdownTraits(editor:any, buttonName:any) {
    const comps = editor.DomComponents;
    const $this = this;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    console.log('----------this.entityoptions', this.entityOptions);
    comps.addType(buttonName, {
      model: defaultModel.extend(
        {
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            draggable: '*',
            droppable: false,
            traits: [
              {
                label: 'name',
                name: 'name',
                type: 'text',
                changeProp: 1
              },
              {
                type: 'select',
                label: 'FieldType',
                name: 'entity',
                changeProp: 1,
                options: this.entityOptions
              },
              {
                type: 'select',
                label: 'Event',
                name: 'events',
                changeProp: 1,
                options: [
                  { key: 'Load', value: 'OnLoad' },
                  { key: 'AfterLoad', value: 'AfterLoad' },
                  { key: 'Rowclick', value: 'Rowclick' },
                  { key: 'Rowclick | Load', value: 'Rowclick | OnLoad'}
                ]
              }
            ]
          }),
          init() {
            this.listenTo(this, 'change:events', this.handlechangetype);
          },
          handlechangetype() {
            // tslint:disable-next-line:max-line-length
            console.log('Input type changed to : ', editor.getSelected().attributes.type, editor.getSelected().ccid, editor.getSelected().cid);
            const dynamicDropdownTraits = this.get('traits').where({
              name: 'events'
            })[0];
            console.log("dynamicDropdownTraits",dynamicDropdownTraits);
            
            const changedValue = this.changed['events'];
            const eventchangetrigger = {
              type: editor.getSelected().attributes.type,
              elementname: editor.getSelected().attributes.name,
              componentId: editor.getSelected().cid,
              htmlId: editor.getSelected().ccid,
              traits: dynamicDropdownTraits,
              value: changedValue
            };
            $this.broadcastservice.updateDataselection({ 'event': eventchangetrigger });
            console.log('--------changed event-----', eventchangetrigger);
            editor.TraitManager.getTraitsViewer().render();
          },
        },
        {
          isComponent: function (el:any) {
            if (el.tagName === buttonName) {
              return {
                type: buttonName
              };
            }
          }
        }
      ),

      view: defaultType.view
    });
  }
  addGridTraits(screensVariable:any, buttonName:any) {
    const $this = this;
    const comps = screensVariable.editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    let selectedEntityName = '';
    let selectedEntity;
    let selectedColumnId = 'col1_id';
    const gridOptionsInString:any = JSON.stringify(screensVariable.agGridObject);
    const secGridString = JSON.stringify(screensVariable.agGridObject.custom_field);
    comps.addType(buttonName, {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          'bootStrapTableCheckBox': true,
          gridOptions: gridOptionsInString,
          secGrid: secGridString,
          script: function () {
            const gridOptions = JSON.parse('{[ gridOptions ]}');
            const initAgGrid = () => {
              let columnDefs:any = [];
              let rowData:any = [];
              if (gridOptions &&
                gridOptions.custom_field &&
                gridOptions.custom_field.length > 0) {
                columnDefs = [];
                for (const key of gridOptions.custom_field) {
                  for (let i = 0; i < 10; i++) {
                    const newObject = gridOptions.custom_field.reduce((o:any, objectKey:any) =>
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
                    colId: 'col1_id',
                  },
                  {
                    headerName: 'B',
                    field: 'b',
                    sortable: true,
                    colId: 'col2_id',
                  },
                  {
                    headerName: 'C',
                    field: 'c',
                    sortable: true,
                    colId: 'col3_id',
                  },
                  {
                    headerName: 'D',
                    field: 'd',
                    sortable: true,
                    colId: 'col4_id',
                  },
                  {
                    headerName: 'E',
                    field: 'e',
                    sortable: true,
                    colId: 'col5_id',
                  }
                ];
                rowData = createRowData();
              }

              function createRowData() {
                const tempData = [];
                for (let i = 0; i < 10; i++) {
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
                  boldRenderer: function (params:any) {
                    return '<b>' + params.value.name + '</b>';
                  }
                },
                onGridReady: function (params:any) {
                  console.log('rendering params', params.api);
                  params.api.sizeColumnsToFit();

                  window.addEventListener('resize', function () {
                    setTimeout(function () {
                      params.api.sizeColumnsToFit();
                    });
                  });
                },
                paginationPageSize: 5,
                pagination: true,
              };
              const gridDiv = document.querySelector('#myGrid');
              // tslint:disable-next-line:no-unused-expression
              new agGrid.Grid(gridDiv, this.gridOptions);
              this.gridOptions.cacheQuickFilter = false;
              console.log('grid function api', this.gridOptions.api);
              this.gridOptions.api.sizeColumnsToFit();
            };
            let exists = false;
            const url = 'https://unpkg.com/ag-grid-community@26.2.0/dist/ag-grid-community.min.js';
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
          },
          { type: 'checkbox', name: 'bootStrapTableCheckBox', label: 'Bootstrap Table', changeProp: 1 }
          ],

        }),
        init() {
          this.listenTo(this, 'change:bootStrapTableCheckBox', this.checkbox);
          this.listenTo(this, 'change:name', this.ElementName);
          this.listenTo(this, 'change:entities', this.entities); // listen for active event
          this.listenTo(this, 'change:columns', this.gridColumns);
          this.listenTo(this, 'change:colname', this.columnName);
          this.listenTo(this, 'change:verbs', this.verb);
          this.listenTo(this, 'change:events', this.handlechangetype);
          this.listenTo(this, 'change:modifiers', this.modifier);
        },
        handlechangetype() {
          // tslint:disable-next-line:max-line-length
          const gridevent = this.get('traits').where({
            name: 'events'
          })[0];
          const changedValue = this.changed['events'];
          screensVariable.agGridObject['selectedevent'] = this.changed['events'];
          // tslint:disable-next-line:max-line-length
          console.log('Input type changed to : ', screensVariable.editor.getSelected().attributes.type, screensVariable.editor.getSelected().ccid, screensVariable.editor.getSelected().cid);
          const eventchangetrigger = {
            type: screensVariable.editor.getSelected().attributes.type,
            value: changedValue
          };
          $this.broadcastservice.updateDataselection({ 'event': eventchangetrigger });
          console.log('--------changed event-----', changedValue , screensVariable);
          // screensVariable.editor.TraitManager.getTraitsViewer().render();
        },
        modifier() {
          const modifierObj = screensVariable.filterModifiers.find(
            (x:any) => x.value === this.changed['modifiers']
          );
          if (modifierObj) {
            screensVariable.modifierUsageObject.modifier_id = modifierObj.key;
            screensVariable.modifierUsageObject.modifier_name = modifierObj.value;
            screensVariable.modifierUsageObject.modify_target_type = 'flow';
          }
        },
        ElementName() { },
        checkbox() {
          screensVariable.is_bootStrapTable_present = this.attributes.bootStrapTableCheckBox;
        },
        verb() {
          const verbObj = screensVariable.verbOptions.find((x:any) => x.value === this.changed['verbs']);
          if (verbObj) {
            screensVariable.routeDetails.verb = verbObj.key;
          }
        },
        columnName() {
          const enteredColName = this.changed['colname'];
          const selectedColumns = this.view.el.gridOptions.api.getColumnDef(selectedColumnId);
          selectedColumns.headerName = enteredColName;
          this.view.el.gridOptions.api.refreshHeader();
          const indexFound = screensVariable.agGridArray.findIndex((x:any) => x.columnid === selectedColumns.colId);
          if (indexFound > -1) {
            screensVariable.agGridArray[indexFound].columnname = enteredColName;
          }
          screensVariable.columnOptions.forEach((columnElement:any) => {
            if (columnElement.value === selectedColumnId) {
              columnElement.name = enteredColName;
              const customField = screensVariable.agGridObject.custom_field.find((x:any) => x.columnid === selectedColumnId);
              if (customField) {
                customField.columnname = enteredColName;
              }
              screensVariable.saveRemoteStorage();
            }
          });
          const component = screensVariable.editor.getSelected();
          component.removeTrait('columns');
          component.addTrait({
            type: 'select',
            label: 'columns',
            name: 'columns',
            changeProp: 1,
            options: screensVariable.columnOptions,
          }, { at: 1 });
        },
        entities() {
          selectedEntity = undefined;
          selectedEntityName = this.changed['entities'];
          $this.allEntity.forEach(entityElement => {
            if (entityElement.name === selectedEntityName) {
              if (selectedEntityName !== 'none') {
                selectedEntity = entityElement;
              }
            }
          });
        },
        gridColumns() {
          selectedColumnId = this.changed['columns'];
        }
      },
        {
          isComponent: function (el:any) {
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
 
}
