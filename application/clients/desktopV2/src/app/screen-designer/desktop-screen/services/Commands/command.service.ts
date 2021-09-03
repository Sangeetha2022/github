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
  dragAndDrop($this:any) {
    $this.editor.on('block:drag:stop', function (model:any) {
      console.log('model drag and drop are ----- ', model);
      const ckeditorspan = model.find('#ckeditorspan');
      const ckeditorTextAreaModels = model.find('span #ckeditortextarea');
            // ckeditor
      // set dynamic name in ckeditor span
      ckeditorspan.forEach((element: { attributes: { traits: { target: { set: (arg0: string, arg1: string) => void; }; }; }; ccid: any; }) => {
        element.attributes.traits.target.set('name', `ckeditor_${element.ccid}`);
      });
      // remove unwanted classes and add the classname if available
      ckeditorTextAreaModels.forEach((element: { attributes: { traits: { target: { set: (arg0: string, arg1: string) => void; }; }; }; ccid: any; }) => {
        $this.setElementCSS(element, 'ckeditor', 'textarea');
        element.attributes.traits.target.set('name', `ckeditor_${element.ccid}`);
      });
    })
  }
  componentSelected($this:any) {
    $this.editor.on('component:selected', function (component:any) {
      const entityTrait = component.getTrait('entity');
      const removeTriatName = ['Field', 'modalButton',
        'fieldButton', 'verbs', 'actionButton',
        'routeButton', 'addButton', 'removeButton'];
      removeTriatName.forEach((name, index) => {
        component.removeTrait(name);
      });
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
    });
  }
}
