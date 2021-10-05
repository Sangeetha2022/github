import { Injectable } from '@angular/core';
declare var ClassicEditor: any;

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
  }

  initializeInputMethod(screenGlobalVariable:any) {
    this.entitylist = [];
    const $this = this;
    const comps = screenGlobalVariable.editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    console.log("defaultModel",defaultModel);
    
    comps.addType('input', {
      isComponent: (el: { tagName: string; }) => el.tagName === 'INPUT',
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
              if (el.tagName === 'BUTTON') {
                return {
                  type: 'button'
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
}
