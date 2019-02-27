import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/data.service';
import { IEntity } from '../../../../project-component/interface/Entity';

@Injectable({
  providedIn: 'root'
})
export class TraitsService {

  public entityOptions: any[] = [];
  public allEntity: IEntity[] = [];
  constructor(
    private dataService: DataService
  ) {
    this.dataService.currentAllEntityInfo.subscribe(
      (data) => {
        this.allEntity = data;
        data.forEach((element) => {
          const temp = {
            value: element.name,
            name: element.name
          };
          this.entityOptions.push(temp);
        });
      }
    );
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
            allEntityTemp.forEach(element => {
              if (element.name === changedValue) {
                element.field.forEach(childElement => {
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
            allEntityTemp.forEach(element => {
              if (element.name === changedValue) {
                element.field.forEach(childElement => {
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
