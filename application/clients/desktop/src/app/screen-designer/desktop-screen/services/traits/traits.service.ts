import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraitsService {

  // var comps = editor.DomComponents;
  // var defaultType = comps.getType('default');
  // var defaultModel = defaultType.model;
  // var defaultView = defaultType.view;
  public secondaryNounOption: Object[] = [
    { value: 'supermarket', name: 'supermarket' },
    { value: 'student', name: 'student' }
  ];
  constructor() { }

  addSpecialButtonTraits(editor, buttonName) {
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    // The `input` will be the Component type ID
    comps.addType(buttonName, {
      // Define the Model
      model: defaultModel.extend({
        // Extend default properties
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          // Can be dropped only inside `form` elements
          draggable: '*',
          // Can't drop other elements inside it
          droppable: false,
          // Traits (Settings)
          traits: [{
            // Change the type of the input (text, password, email, etc.)
            type: 'select',
            label: 'secondary-noun',
            name: 'secondary-noun',
            changeProp: 1,
            options: this.secondaryNounOption,
          }, {
            type: 'select',
            label: 'attributes',
            name: 'nounattributes',
            changeProp: 1,
            options: [],			// Tried this but didn't worked!
          }],

        }),
        init() {
          this.listenTo(this, 'change:secondary-noun', this.noun);
          this.listenTo(this, 'change:nounattributes', this.attributeVal); // listen for active event
        },
        noun() {
          const nounTrait = this.get('traits').where({ name: 'nounattributes' })[0];
          const changedValue = this.changed['secondary-noun'];
          console.log('changed value are --- ', changedValue);
          const options = [];
          if (changedValue === 'student') {
            options.push({ value: 'name', name: 'name' },
              { value: 'age', name: 'age' },
              { value: 'marks', name: 'marks' });
          } else if (changedValue === 'supermarket') {
            options.push({ value: 'category', name: 'category' },
              { value: 'price', name: 'price' },
              { value: 'quantity', name: 'quantity' });
          }
          nounTrait.set('options', options);
          // editor.trigger('change:selectedComponent');
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

    // The `input` will be the Component type ID
    comps.addType(buttonName, {
      // Define the Model
      model: defaultModel.extend({
        // Extend default properties
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          // Can be dropped only inside `form` elements
          draggable: '*',
          // Can't drop other elements inside it
          droppable: false,
          // Traits (Settings)
          traits: [{
            // Change the type of the input (text, password, email, etc.)
            type: 'select',
            label: 'secondary-noun',
            name: 'secondary-noun',
            changeProp: 1,
            options: this.secondaryNounOption,
          }, {
            type: 'select',
            label: 'attributes',
            name: 'nounattributes',
            changeProp: 1,
            options: [],			// Tried this but didn't worked!
          }],

        }),
        init() {
          this.listenTo(this, 'change:secondary-noun', this.noun);
          this.listenTo(this, 'change:nounattributes', this.attributeVal); // listen for active event
        },
        noun() {
          const nounTrait = this.get('traits').where({ name: 'nounattributes' })[0];
          const changedValue = this.changed['secondary-noun'];
          console.log('changed value are --- ', changedValue);
          const options = [];
          if (changedValue === 'student') {
            options.push({ value: 'name', name: 'name' },
              { value: 'age', name: 'age' },
              { value: 'marks', name: 'marks' });
          } else if (changedValue === 'supermarket') {
            options.push({ value: 'category', name: 'category' },
              { value: 'price', name: 'price' },
              { value: 'quantity', name: 'quantity' });
          }
          nounTrait.set('options', options);
          // editor.trigger('change:selectedComponent');
          editor.TraitManager.getTraitsViewer().render();
        },
        attributeVal() {
        }
      },
        // The second argument of .extend are static methods and we'll put inside our
        // isComponent() method. As you're putting a new Component type on top of the stack,
        // not declaring isComponent() might probably break stuff, especially if you extend
        // the default one.
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
}
