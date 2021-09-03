import { Injectable } from '@angular/core';
declare var ClassicEditor: any;

@Injectable({
  providedIn: 'root'
})
export class TraitsService {

  constructor() { }
  initMethod(screenGlobalVariable:any) {
    this.initializeTextAreaMethod(screenGlobalVariable);
  }
    // textarea are ---
    initializeTextAreaMethod(screenGlobalVariable:any) {
      const $this = this;
      const comps = screenGlobalVariable.editor.DomComponents;
      const defaultType = comps.getType('default');
      const defaultModel = defaultType.model;
  
      comps.addType('textarea', {
        model: defaultModel.extend(
          {
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
              draggable: '*',
              droppable: false,
              traits: [
                { name: 'name', label: 'Name', changeProp: 1 },
                { name: 'placeholder', label: 'Placeholder' },
                { type: 'checkbox', name: 'required', label: 'Required' },
                {
                  type: 'select',
                  label: 'FieldType',
                  name: 'entity',
                  options: [],
                  changeProp: 1
                }
              ]
            })
          },
          {
            isComponent: function (el:any) {
              if (el.tagName === 'TEXTAREA' && el.type === 'textarea') {
                return {
                  type: 'textarea'
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
