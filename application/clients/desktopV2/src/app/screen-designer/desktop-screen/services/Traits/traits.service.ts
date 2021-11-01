import { Injectable } from '@angular/core';
declare var ClassicEditor: any;
declare var Highcharts: any;

@Injectable({
  providedIn: 'root'
})

export class TraitsService {

  public entitylist: any[] = [];
  constructor() { }
  initMethod(screenGlobalVariable:any) {
    this.initializeInputMethod(screenGlobalVariable);
    this.initializeSelectMethod(screenGlobalVariable);
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
      isComponent: (el: { tagName: string; }) => el.tagName === 'input',
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
                }
              ],
             tagName: 'label',
            }),
            init() {
            },
          },
          {
            isComponent:  (el: { tagName: string; })=> {
              if (el.tagName === 'LABEL') {
                return {
                  type: 'label'
                };
              }
              return null;
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
          isComponent:  (el: { tagName: string; })=> {
            if (el.tagName === 'SELECT') {
              return {
                type: 'select'
              };
            }
            return null;
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
                (                x: { value: any; }) => x.value === this.changed['verbs']
              );
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
              console.log("tagName is",el.tagName);
              
              if (el.tagName === 'BUTTON') {
                return {
                  type: 'button'
                };
              }
              else{
                return null;
              }
             
            }
          }
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
          // console.log(myChart);
           
         //  console.log(Category_values);
         
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
}
