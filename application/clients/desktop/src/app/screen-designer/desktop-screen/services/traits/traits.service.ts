import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/data.service';
import { IEntity } from '../../../../project-component/interface/Entity';
import * as dictionary from 'nanoid-dictionary';
import * as generate from 'nanoid/generate';

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
  public testPrivate: String = '';
  // public screenObj: any = {
  //   button: {
  //   htmlId: undefined,
  //   componentId: undefined,
  //   action: undefined
  //   }
  // };
  public screenArray: any[] = [];
  public clientFramework: any = 'Angular 7';
  constructor(
    private dataService: DataService
  ) { this.initMethod(); }

  initMethod() {
    this.screenArray = [];
  }

  initializeMethod(editor) {
   const $this = this;
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;

// content traits
// Each new type extends the default Trait
editor.TraitManager.addType('content', {
  events: {
    'keyup': 'onChange',  // trigger parent onChange method on keyup
  },

  /**
  * Returns the input element
  * @return {HTMLElement}
  */
  getInputEl: function() {
    if (!this.inputEl) {
      const input = document.createElement('textarea');
      input.value = this.target.get('content');
      this.inputEl = input;
    }
    return this.inputEl;
  },

  /**
   * Triggered when the value of the model is changed
   */
  onValueChange: function () {
    this.target.set('content', this.model.get('value'));
  }
});

    // action button add
    editor.TraitManager.addType('actionButton', {
     events: {
        'click': function () {
          console.log('print button clicked');
          const eventPopupModel = document.getElementById('EventPopup');
          console.log('print eventPopupModel values are ------ ', eventPopupModel);
          eventPopupModel.style.display = 'block';
        },
      },
      getInputEl() {
        // tslint:disable-next-line:prefer-const
        let button = <HTMLElement>document.createElement('button');
        button.id = 'fieldButton';
        button.style.width = '100%';
        button.style.backgroundColor = '#4CAF50';
        button.style.border = 'none';
        button.style.color = 'white';
        button.style.backgroundColor = '#008CBA';
        button.style.fontSize = '12px !important';
        button.style.cursor = 'pointer';
        button.appendChild(document.createTextNode('Flow'));
        return button;
      },
    });

    comps.addType('button', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: '*',
          droppable: false,
          'name': `button_${generate(dictionary.numbers, 6)}`,
          traits: [{
            type: 'content',
            label: 'Name',
            name: 'name',
            changeProp: 1
          },
          {
            'name': 'actionButton',
            'label': 'Action',
            'type': 'actionButton',
          }],

        }),
        toHTML: function () {
          const html = this.view.el.innerHTML;
          console.log('button rnder html are ------11---------- ', html);
          console.log('button rnder html are -------22--------- ', this);
      //    const replacedValue = `<div style="height: 80%; padding-top: 10px; box-sizing: border-box;">
      //    <ag-grid-angular #agGrid style="width: 100%; height: 100%;" id="myGrid" class="ag-theme-balham" [animateRows]="true"
      //    [gridOptions]="gridOptions" (gridReady)="onGridReady($event)" domLayout='autoHeight'></ag-grid-angular>
      //    </div>
      //  `;
      //     return replacedValue;
        },
        init() {
          // this.listenTo(this, 'change:name', this.buttonText); // listen for active event
        },
        buttonText() {
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

  }

  getData() {
    this.entityOptions = [];
    this.fieldOptions = [];
    this.dataService.currentAllEntityInfo.subscribe(
      (data) => {
        this.allEntity = data;
        console.log('all entity in traits are ----- ', this.allEntity);
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


  addGridTraits(editor, buttonName) {
    this.getData();
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
    const agGridArray = this.agGridValue;

    // add button
    editor.TraitManager.addType('addButton', {
      /**
       * Returns the input element
       * @return {HTMLElement}
       */
      events: {
        'click': function () {
          console.log('addButton is this working -----  ', this.target.view.el.gridOptions.columnDefs);
          const count = this.target.view.el.gridOptions.columnDefs.length + 1;
          const columnDefs = this.target.view.el.gridOptions.columnDefs;
          columnDefs.push({
            headerName: `column_${count}`,
            field: 'a',
            sortable: true,
            colId: `col${count}_id`
          });
          this.target.view.el.gridOptions.api.setColumnDefs(columnDefs);
          this.target.view.el.gridOptions.api.sizeColumnsToFit();
          columnOptions.push({ value: `col${count}_id`, name: `column_${count}` });
          const colTraits = this.target.get('traits').where({ name: 'colname' })[0];
          colTraits.set('options', columnOptions);
          editor.TraitManager.getTraitsViewer().render();
          console.log('sessionStorage count are ', count, ' --- ', { value: `col${count}_id`, name: `column_${count}` });
          // const modal = <HTMLElement>document.querySelector('#agGridModal');
          // console.log('ag Grid modal are ----- ', modal);
          // if (selectedEntity !== undefined) {
          //   // modal.style.display = 'block';
          //   localDataService.setAgGridEntity(selectedEntity);
          // }
          // trigger when btn is clicked
        },
      },
      getInputEl() {
        // var button = document.createElement('button');
        // button.id = 'btnLogin';
        // button.value = 'Login';
        // return button;
        // tslint:disable-next-line:prefer-const
        let button = <HTMLElement>document.createElement('button');
        button.id = 'addButton';
        button.style.width = '100%';
        button.style.backgroundColor = '#4CAF50';
        button.style.border = 'none';
        button.style.color = 'white';
        button.style.backgroundColor = '#008CBA';
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        //       button.style =
        //         'width: 100%;   background-color: #4CAF50; \
        // border: none; \
        // color: white; \
        // font-size: 16px; \
        // cursor: pointer; background-color: #008CBA;';
        button.appendChild(document.createTextNode('+'));
        return button;
      },
    });

    // remove button
    editor.TraitManager.addType('removeButton', {
      /**
       * Returns the input element
       * @return {HTMLElement}
       */
      events: {
        'click': function () {
          const columnDefs = this.target.view.el.gridOptions.columnDefs;
          columnDefs.pop();
          this.target.view.el.gridOptions.api.setColumnDefs(columnDefs);
          this.target.view.el.gridOptions.api.sizeColumnsToFit();
          columnOptions.pop();
          const colTraits = this.target.get('traits').where({ name: 'colname' })[0];
          colTraits.set('options', columnOptions);
          editor.TraitManager.getTraitsViewer().render();
        },
      },
      getInputEl() {
        const button = <HTMLElement>document.createElement('button');
        button.id = 'removeButton';
        button.style.width = '100%';
        button.style.backgroundColor = 'rgba(186, 43, 0, 0.73)';
        button.style.border = 'none';
        button.style.color = 'white';
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        button.appendChild(document.createTextNode('-'));
        return button;
      },
    });

    // add field binding button
    editor.TraitManager.addType('fieldButton', {
      /**
       * Returns the input element
       * @return {HTMLElement}
       */
      events: {
        'click': function () {
          console.log('is this working -----  ', selectedEntity);
          console.log('is this working events of this ------ ', this);
          // console.log('onFieldOptions editor in traits ', editor.getSelected());
          const modal = <HTMLElement>document.querySelector('#agGridModal');
          console.log('ag Grid modal are ----- ', modal);
          if (selectedEntity !== undefined) {
            // modal.style.display = 'block';
            const constructObj = {
              entity: selectedEntity,
              defalutColumn: this.target.view.el.gridOptions.columnDefs,
              customColumn: columnOptions
            };
            $this.dataService.setAgGridEntity(constructObj);
          }
          // trigger when btn is clicked
        },
      },
      getInputEl() {
        // var button = document.createElement('button');
        // button.id = 'btnLogin';
        // button.value = 'Login';
        // return button;
        // tslint:disable-next-line:prefer-const
        let button = <HTMLElement>document.createElement('button');
        button.id = 'fieldButton';
        button.style.width = '100%';
        button.style.backgroundColor = '#4CAF50';
        button.style.border = 'none';
        button.style.color = 'white';
        button.style.backgroundColor = '#008CBA';
        button.style.fontSize = '12px !important';
        button.style.cursor = 'pointer';
        //       button.style =
        //         'width: 100%;   background-color: #4CAF50; \
        // border: none; \
        // color: white; \
        // font-size: 16px; \
        // cursor: pointer; background-color: #008CBA;';
        button.appendChild(document.createTextNode('Field'));
        return button;
      },
    });
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
            'type': 'fieldButton',
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
          this.listenTo(this, 'change:entities', this.entities); // listen for active event
          this.listenTo(this, 'change:columns', this.gridColumns);
          this.listenTo(this, 'change:colname', this.columnName);
          // this.listenTo(this, 'change:entity-field', this.entityField);
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
          this.listenTo(this, 'change:entities', this.entity);
          this.listenTo(this, 'change:entityattributes', this.attributeVal); // listen for active event
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
          this.listenTo(this, 'change:entities', this.entity);
          this.listenTo(this, 'change:entityattributes', this.attributeVal); // listen for active event
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
