import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/data.service';
import { IEntity } from '../../../../project-component/interface/Entity';

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
  constructor(
    private dataService: DataService
  ) {}


  addCKEditorTraits(editor, buttonName) {

  }

  getData() {
    this.entityOptions = [];
    this.fieldOptions = [];
    this.dataService.currentAllEntityInfo.subscribe(
      (data) => {
        this.allEntity = data;
        console.log('all entity in traits are ----- ', this.allEntity);
        this.entityOptions.push({value: 'none', name: 'none'});
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
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    const allEntityTemp = this.allEntity;
    let selectedEntityName = '';
    const localDataService = this.dataService;
    let selectedEntity;
    let selectedColumnName = '';
    const agGridArray = this.agGridValue;
    // add button
    editor.TraitManager.addType('addButton', {
      /**
       * Returns the input element
       * @return {HTMLElement}
       */
      events: {
        'click': function () {
          console.log('is this working -----  ', selectedEntity);
          // console.log('onFieldOptions editor in traits ', editor.getSelected());
          const modal = <HTMLElement>document.querySelector('#agGridModal');
          console.log('ag Grid modal are ----- ', modal);
          if (selectedEntity !== undefined) {
          // modal.style.display = 'block';
          localDataService.setAgGridEntity(selectedEntity);
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
                  colId: 'params_1'
                },
                {
                  headerName: 'B',
                  field: 'b.name',
                  sortable: true
                },
                {
                  headerName: 'C',
                  valueGetter: '\'zz\' + data.c.name',
                  sortable: true
                },
                {
                  headerName: 'D',
                  field: 'd.name',
                  sortable: true
                },
                {
                  headerName: 'E',
                  field: 'e.name',
                  sortable: true
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
            label: 'entities',
            name: 'entities',
            changeProp: 1,
            options: this.entityOptions,
          }, {
            type: 'select',
            label: 'columns',
            name: 'columns',
            changeProp: 1,
            options: [
              { value: 'col_1', name: 'col_1' },
              { value: 'col_2', name: 'col_2' },
              { value: 'col_3', name: 'col_3' },
              { value: 'col_4', name: 'col_4' },
              { value: 'col_5', name: 'col_5' }
            ],
          }, {
            type: 'text',
            label: 'colName',
            name: 'colname',
            changeProp: 1
          },
          {
            'name': 'addButton',
            'label': 'Add',
            'type': 'addButton',
          },
          {
            type: 'select',
            label: 'fields',
            name: 'entity-field',
            changeProp: 1,
            options: this.fieldOptions,
          }],

        }),
        init() {
          this.listenTo(this, 'change:entities', this.entities); // listen for active event
          this.listenTo(this, 'change:columns', this.gridColumns);
          this.listenTo(this, 'change:colname', this.columnName);
          this.listenTo(this, 'change:entity-field', this.entityField);
        },
        columnName() {

          console.log('sessionStorage details are --this---- ', this);
          console.log('sessionStorage details are --this-222--- ', this.view.el.gridOptions);
          this.view.el.gridOptions.api.getColumnDef('params_1').headerName = 'tharani';
          this.view.el.gridOptions.api.refreshHeader();
          const id = editor.getSelected().ccid;
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
          console.log('entities ------ ', this);
          console.log('entities ------ ', localDataService);
          selectedEntityName = this.changed['entities'];
          console.log('entities ---33--- ', selectedEntityName);
          const fieldTraits = this.get('traits').where({ name: 'entity-field' })[0];
          console.log('entities ---44--- ', fieldTraits);
          const options = [];
          console.log('entities --55---- ', allEntityTemp.length);
          allEntityTemp.forEach(entityElement => {
            if (entityElement.name === selectedEntityName) {
              // localDataService.setAgGridEntity(entityElement);
              if (selectedEntityName !== 'none') {
                selectedEntity = entityElement;
              }
              entityElement.field.forEach(fieldElement => {
                const temp = {
                  value: fieldElement.name,
                  name: fieldElement.name
                };
                options.push(temp);
              });
            }
          });
          console.log('entities --66---- ', options);

          fieldTraits.set('options', options);
          console.log('entities --77---- ', options);
          editor.TraitManager.getTraitsViewer().render();

        },
        gridColumns() {
          alert('gridCol  ' + agGridArray);
          selectedColumnName = this.changed['columns'];
        },
        entityField() {
          alert('field');

        }
        // entity() {
        //   const entityTrait = this.get('traits').where({ name: 'entityattributes' })[0];
        //   const changedValue = this.changed['entities'];
        //   const options = [];
        //   if (allEntityTemp.length > 0) {
        //     allEntityTemp.forEach(element => {
        //       if (element.name === changedValue) {
        //         element.field.forEach(childElement => {
        //           const temp = {
        //             value: childElement.Name,
        //             name: childElement.Name
        //           };
        //           options.push(temp);
        //         });
        //       }
        //     });
        //   }
        //   entityTrait.set('options', options);
        //   editor.TraitManager.getTraitsViewer().render();
        // },
        // attributeVal() {
        // }
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
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    const allEntityTemp = this.allEntity;
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
          if (allEntityTemp.length > 0) {
            allEntityTemp.forEach(entityElement => {
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
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    const allEntityTemp = this.allEntity;

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
          if (allEntityTemp.length > 0) {
            allEntityTemp.forEach(entityElement => {
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
