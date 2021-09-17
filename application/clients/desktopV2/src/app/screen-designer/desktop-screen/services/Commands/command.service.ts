import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  feature_id: any;
  project_id: any;
  screenArray: any[] = [];
  screen_id: any;
  constructor( private location: Location,private activateRoute:ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      if (params.featureId !== undefined && params.featureId !== null) {
        this.feature_id = params.featureId;
      } else {
        this.feature_id = undefined;
      }
      if (params.projectId !== undefined && params.projectId !== null) {
        this.project_id = params.projectId;
      } else {
        this.project_id = undefined;
      }
      if (params.screenId !== undefined && params.screenId !== null) {
        this.screen_id = params.screenId;
      } else {
        this.screen_id = undefined;
      }
    });
   }

  addSaveCommand(commandName:any, editor:any) {
    const $this = this;
    editor.Commands.add(commandName, {
      run () {
        const eventPopupModel = document.getElementById('myModal');
        eventPopupModel!.style.display = 'block';
      }
    });
  }

  addCancelCommand(commandName:any, editor:any) {
    const previousPageRoute = this.location;
    console.log("previousPageRoute",previousPageRoute);
    
    editor.Commands.add(commandName, {
      run(status:any) {
        //status.set('active', 0);
        previousPageRoute.back();
      }
    });
  }

  componentSelected($this:any) {
    $this.editor.on('component:selected', function (component:any) {
      const entityTrait = component.getTrait('entity');
      console.log("entityTrait is",entityTrait);
      
      // const removeTriatName = ['Field', 'modalButton',
      //   'fieldButton', 'verbs', 'actionButton',
      //   'routeButton', 'addButton', 'removeButton'];
      // removeTriatName.forEach((name, index) => {
      //   component.removeTrait(name);
      // });
      if (entityTrait && component.attributes.type !== 'grid-type') {
        entityTrait.set('options', $this.dataBindingTypes);
        component.get('traits').add(
          {
            type: 'entityFieldButton',
            label: 'Field',
            name: 'Field'
          }
        );
      }
      if (component.attributes.tagName === 'input') {
        alert("inside component selected input trait")
        component.get('traits').set([
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
          {
            type: 'select',
            label: 'entity',
            name: 'entity',
            changeProp: 1,
            options: $this.entitydetails
          },
          {
            type: 'entityFieldButton',
            label: 'Field',
            name: 'Field'
          }
        ]);
      }
    });
  }
  dragAndDrop($this:any) {
    $this.editor.on('block:drag:stop', function (model:any) {
      console.log('model drag and drop are ----- ', model);
      const allInputModels = model.find('[data-gjs-type="input"]');
      console.log('allInputModels ---  ', allInputModels);
      if (allInputModels.length === 0 && model.attributes.tagName === 'input') {
        allInputModels.push(model);
      }
         // input
         allInputModels.forEach((element: { attributes: { traits: { target: { set: (arg0: string, arg1: string) => void; }; }; }; ccid: any; }) => {
          $this.setElementCSS(element, 'input', null);
          element.attributes.traits.target.set('name', `input_${element.ccid}`);
        });
    })
  }

}
