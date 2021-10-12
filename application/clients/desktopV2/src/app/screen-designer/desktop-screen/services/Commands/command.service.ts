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
      if (component.attributes.tagName === 'input') {
        //alert("inside component selected input trait")
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
  toggle($this:any) {
    // it worked well if we inject the buttons close to the input fields
    $this.editor.on('component:toggled', (model: any) => { });
  }
   removeComponent($this:any) {
    // it called when we remove the component
    $this.editor.on(`component:remove`, function (model:any) {
      const parentComponent = model.get('components');
      let componentIndex = 0;
      if (model.attributes && model.attributes.name) {
        componentIndex = $this.routeFlows.findIndex((x: { elementName: any; }) =>
          x.elementName === model.attributes.name
        );

        if (componentIndex > -1) {
          // remove flows first if present in flows_info
          const flowInfoIndex = $this.screenFlows.findIndex((x: { elementName: any; componentId: string; }) =>
            x.elementName === $this.routeFlows[componentIndex].elementName && x.componentId !== '');
          if (flowInfoIndex > -1) {
            $this.screenFlows.splice(flowInfoIndex, 1);
          }
          $this.routeFlows.splice(componentIndex, 1);

        }
        // remove special events
        componentIndex = $this.specialEvents.findIndex((x: { elementName: any; }) =>
          x.elementName === model.attributes.name);
        if (componentIndex > -1) {
          $this.specialEvents.splice(componentIndex, 1);
        }

        // remove link information
        componentIndex = $this.linkArray.findIndex((x: { elementName: any; }) =>
          x.elementName === model.attributes.name);
        if (componentIndex > -1) {
          $this.linkArray.splice(componentIndex, 1);
        }
      }
      if (parentComponent.length === 0) {
        componentIndex = $this.screenEntityModel.findIndex((x: { elementName: any; }) =>
          x.elementName === parentComponent.parent.attributes.name
        );
        if (componentIndex > -1) {
          $this.screenEntityModel.splice(componentIndex, 1);
        }
        componentIndex = $this.screenFlows.findIndex((x: { elementName: any; componentId: string; }) =>
          x.elementName === parentComponent.parent.attributes.name && x.componentId !== ''
        );
        if (componentIndex > -1) {
          $this.screenFlows.splice(componentIndex, 1);
        }
        const elementNameIndex = $this.ElementNameArray.findIndex((x: any) => x === parentComponent.parent.attributes.name);
        if (elementNameIndex > -1) {
          $this.ElementNameArray.splice(elementNameIndex, 1);
        }
        $this.saveRemoteStorage();
      } else {
        model.get('components').each((child: { attributes: { name: any; }; }) => {
          componentIndex = $this.screenEntityModel.findIndex((x: { elementName: any; }) =>
            x.elementName === child.attributes.name
          );
          if (componentIndex > -1) {
            $this.screenEntityModel.splice(componentIndex, 1);
          }
          componentIndex = $this.screenFlows.findIndex((x: { elementName: any; componentId: string; }) =>
            x.elementName === child.attributes.name && x.componentId !== ''
          );
          if (componentIndex > -1) {
            $this.screenFlows.splice(componentIndex, 1);
          }
          const elementNameIndex = $this.ElementNameArray.findIndex((x: any) => x === child.attributes.name);
          if (elementNameIndex > -1) {
            $this.ElementNameArray.splice(elementNameIndex, 1);
          }
          // remove element for special events
          const specialEventIndex = $this.specialEvents.findIndex((x: { elementName: any; }) => x.elementName === child.attributes.name);
          if (specialEventIndex > -1) {
            $this.specialEvents.splice(specialEventIndex, 1);
          }

          // remove element for link
          const linkIndex = $this.linkArray.findIndex((x: { elementName: any; }) => x.elementName === child.attributes.name);
          if (linkIndex > -1) {
            $this.linkArray.splice(linkIndex, 1);
          }
        });
        $this.saveRemoteStorage();
      }
    });

  }
  updateComponentName($this:any) {
    // it called when we update the component traits name
    $this.editor.on(`component:update:name`, function (model:any) {
      if (model._previousAttributes.name === '') {
        $this.ElementNameArray.push(model.attributes.name);
      } else {
        const elementNameIndex = $this.ElementNameArray.findIndex((x: any) => x === model.attributes.name);
        if (elementNameIndex > -1) {
          model.attributes.traits.target.set('name', `${model._previousAttributes.name}`);
          $this.editor.TraitManager.getTraitsViewer().render();
        } else {
          $this.ElementNameArray.push(model.attributes.name);
        }
      }
      const entityIndex = $this.screenEntityModel.findIndex((x:any) =>
        x.elementName === model._previousAttributes.name);
      if (entityIndex > -1) {
        $this.screenEntityModel[entityIndex].elementName = model.attributes.name;
        $this.saveRemoteStorage();
      }
      const flowIndex = $this.screenFlows.findIndex((x:any) =>
        x.elementName === model._previousAttributes.name && x.componentId !== '');
      if (flowIndex > -1) {
        $this.screenFlows[flowIndex].elementName = model.attributes.name;
      }
      // rename element in routeFlows
      const routeIndex = $this.routeFlows.findIndex((x:any) =>
        x.elementName === model._previousAttributes.name);
      if (routeIndex > -1) {
        $this.routeFlows[routeIndex].elementName = model.attributes.name;
      }
      // rename special events
      const specialEventIndex = $this.specialEvents.findIndex((x:any) =>
        x.elementName === model._previousAttributes.name);
      if (specialEventIndex > -1) {
        $this.specialEvents[specialEventIndex].elementName = model.attributes.name;
      }

      // rename link events
      const linkIndex = $this.linkArray.findIndex((x:any) =>
        x.elementName === model._previousAttributes.name);
      if (linkIndex > -1) {
        $this.linkArray[linkIndex].elementName = model.attributes.name;
      }

      $this.saveRemoteStorage();
    });
  }
  updateTraits($this:any) {
    // select entity if triats values changed then its called
    $this.editor.on(`component:update:entity`, function (model:any) {
      $this.selectedEntityModel = model.changed['entity'];
      $this.selectedHtmlElement.htmlId = model.ccid;
      $this.selectedHtmlElement.componentId = model.cid;
      $this.selectedHtmlElement.elementName = model.attributes.name;
    });

    // called when we change value in component lifecycle verbs
    $this.editor.on(`component:update:componentVerb`, function (model:any) {
      $this.selectedEntityModel = model.changed['componentVerb'];
      $this.componentVerb = $this.componentVerbList.find((x:any) => x.value === model.changed['componentVerb']).key;
    });

    // set whether the screen type as popupmodal or normal one
    $this.editor.on(`component:update:popupmodal`, function (model:any) {
      if (model.changed['popupmodal']) {
        $this.screenOption = 'popupmodal';
      } else {
        $this.screenOption = 'normal';
      }
    });
  }
  dragAndDrop($this:any) {
    $this.editor.on('block:drag:stop', function (model:any) {
      console.log('model drag and drop are ----- ', model);
      const allInputModels = model.find('[data-gjs-type="input"]');
      const allFormModels = model.find('form');
      console.log("form-----",allFormModels);
      

      const allButtonModels = model.find('button');
      const allImageBlockModels = model.find('.gpd-image-block');
      const allImageModels = model.find('.gjs-plh-image');
      const allLabelModels = model.find('[data-gjs-type="label"]');
      console.log('allInputModels ---  ', allInputModels);
      console.log('allButtonModels ---  ', allButtonModels);
      console.log('alllabelModels ---  ', allLabelModels);
      console.log('formall models are ------- ', allFormModels);
      if (allInputModels.length === 0 && model.attributes.tagName === 'input') {
        allInputModels.push(model);
      }
      if (allFormModels.length === 0 && model.attributes.tagName === 'form') {
        $this.setElementCSS(model, 'form', null);
      }
      if (allButtonModels.length === 0 && model.attributes.tagName === 'button') {
        allButtonModels.push(model);
      }
      if (allLabelModels.length === 0 && model.attributes.tagName === 'label') {
        allLabelModels.push(model);
      }
         // label
         allLabelModels.forEach((element:any) => {
          $this.setElementCSS(element, 'label', null);
          //element.attributes.traits.target.set('name', `label_${element.ccid}`);
        });
         // input
         allInputModels.forEach((element:any) => {
          $this.setElementCSS(element, 'input', null);
          console.log("element.ccid",element.ccid);
          
          element.attributes.traits.target.set('name', `input_${element.ccid}`);
        });
              // button
      allButtonModels.forEach((element:any) => {
        // set default verbs for button
        $this.buttonVerb = 'click';
        $this.setElementCSS(element, 'button', null);
        element.attributes.traits.target.set('name', `button_${element.ccid}`);
      });
        // image blocks
        allImageBlockModels.forEach((element:any) => {
          element.attributes.traits.target.set('name', `image_${element.ccid}`);
        });
           // images
      allImageModels.forEach((element:any) => {
        element.attributes.traits.target.set('name', `image_${element.ccid}`);
      });
    })
  }

}
