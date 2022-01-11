import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Injectable
({
  providedIn: 'root'
})

export class CommandService
{
  feature_id: any;
  project_id: any;
  screenArray: any[] = [];
  screen_id: any;

  constructor( private location: Location,private activateRoute:ActivatedRoute) 
  {
    this.activateRoute.queryParams.subscribe(params => 
    {
      if (params.featureId !== undefined && params.featureId !== null) 
      {
        this.feature_id = params.featureId;
      } 
      else 
      {
        this.feature_id = undefined;
      }
      if (params.projectId !== undefined && params.projectId !== null) 
      {
        this.project_id = params.projectId;
      } 
      else 
      {
        this.project_id = undefined;
      }
      if (params.screenId !== undefined && params.screenId !== null) 
      {
        this.screen_id = params.screenId;
      } 
      else 
      {
        this.screen_id = undefined;
      }
    });
  }

  addSaveCommand(commandName:any, editor:any) 
  {
    const $this = this;
    editor.Commands.add(commandName, 
    {
      run () 
      {
        const eventPopupModel = document.getElementById('myModal');
        eventPopupModel!.style.display = 'block';
      }
    });
  }

  addCancelCommand(commandName:any, editor:any) 
  {
    const previousPageRoute = this.location;
    console.log("previousPageRoute",previousPageRoute);    
    editor.Commands.add(commandName, 
    {
      run(status:any) 
      {
        previousPageRoute.back();
      }
    });
  }

  componentSelected($this:any) 
  {
    $this.editor.on('component:selected', function (component:any) 
    {
      console.log("component.attributes.tagName",component.attributes.tagName);
      console.log("component",component);    
      if(component.attributes.tagName==="img")
      {
        const run=()=>
        {
           const eventPopupModel = document.getElementById('imageSizeModal');
           eventPopupModel!.style.display = 'block';
        }
        run();
      } 
      if(component.attributes.type==="highcharts-type" || component.attributes.type==="multiselect-type")
      {
        const run=()=>
        {
           const eventPopupModel = document.getElementById('warnModal');
           eventPopupModel!.style.display = 'block';
        }
        run();
      }
      const entityTrait = component.getTrait('entity');
      console.log("entityTrait is",entityTrait);      
      const removeTriatName = 
      ['Field', 'modalButton','fieldButton', 'verbs', 'actionButton','routeButton', 'addButton', 'removeButton'];
      removeTriatName.forEach((name, index) => 
      {
          component.removeTrait(name);
      });
      console.log("component.attributes.type ",component.attributes.type );
      if (entityTrait && component.attributes.type !== 'grid-type') 
      {
        entityTrait.set('options', $this.dataBindingTypes);
        component.get('traits').add
        (          {
            type: 'entityFieldButton',
            label: 'Field',
            name: 'Field',
          });
      }
      if (component.attributes.tagName === 'input') 
      {
        console.log("$this.EntityBinding",$this.selectentityarray);
        console.log("entitydetails",$this.dataBindingTypes);
        component.get('traits').set
        ([
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
            name: 'Field',
          }
        ]);       
      }
      else if (component.attributes.tagName === 'textarea') 
      {
        console.log("$this.EntityBinding",$this.selectentityarray);
        console.log("entitydetails",$this.dataBindingTypes);
        console.log("$this.entitydetails",$this.entitydetails);        
        component.get('traits').set
        ([
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
            name: 'Field',
          }
        ]);       
      }
    
      else if (component.attributes.tagName === 'button') 
      {
        component.get('traits').set
        ([
          {
            label: 'Name',
            name: 'name',
            type: 'text',
            changeProp: 1
          },
          {
            type: 'select',
            label: 'verb',
            name: 'verbs',
            changeProp: 1,
            options: $this.verbOptions
          },
          {
            name: 'actionButton',
            label: 'Action',
            type: 'actionButton'
          },
          {
            type: 'select',
            label: 'modifiers',
            name: 'modifiers',
            changeProp: 1,
          },
          {
            name: 'valueButton',
            label: 'Modify By',
            type: 'valueButton'
          }
          ]
        );
      }
      if (component.attributes.type === 'dynamicdropdown-type') 
      {
        component.get('traits').add
        ({
            name: 'actionButton',
            label: 'Action',
            type: 'actionButton'
          });
      }
      if (component.attributes.type === 'grid-type') 
      {
        // entity remove traits
        component.removeTrait('entity');
        component.get('traits').add
        ([
          {
            type: 'select',
            label: 'entity',
            name: 'entity',
            changeProp: 1,
            options: $this.entitydetails // Entity binding
          },
          {
            name: 'fieldButton',
            label: 'bind',
            type: 'fieldGridButton'
          },
          {
            type: 'select',
            label: 'verb',
            name: 'verbs',
            changeProp: 1,
            options: 
            [
              { key: 'click', value: 'onClick' },
              { key: 'focus', value: 'onFocus' },
              { key: 'blur', value: 'onBlur' }
            ]
          },
          {
            type: 'select',
            label: 'event',
            name: 'events',
            changeProp: 1,
            options: 
            [
              { key: 'Load', value: 'OnLoad' },
              { key: 'AfterLoad', value: 'AfterLoad' },
              { key: 'Rowclick', value: 'Rowclick' },
              { key: 'Rowclick | Load', value: 'Rowclick | OnLoad' }
            ]
          },
          {
            name: 'actionButton',
            label: 'Action',
            type: 'actionButton'
          },
          {
            type: 'select',
            label: 'modifiers',
            name: 'modifiers',
            changeProp: 1,
            options: $this.filterModifiers // Modifier binding
          },
          {
            name: 'valueButton',
            label: 'Modify By',
            type: 'valueButton'
          },
          {
            name: 'routeButton',
            label: 'Route',
            type: 'routeButton'
          },
          {
            name: 'addButton',
            label: 'Add',
            type: 'addButton'
          },
          {
            name: 'removeButton',
            label: `Remove`,
            type: 'removeButton'
          }
        ]);
      }
      if (component.attributes.type === 'grid-type') 
      {
        $this.agGridObject.htmlId = component.ccid;
        $this.agGridObject.componentId = component.cid;
        $this.is_grid_present = true;
        $this.is_bootStrapTable_present = component.attributes.bootStrapTableCheckBox;
      }     
    });    
  }
  toggle($this:any)
   {
    // it worked well if we inject the buttons close to the input fields
    $this.editor.on('component:toggled', (model: any) => { });
  }
  removeComponent($this:any) 
  {
    // it called when we remove the component
    $this.editor.on(`component:remove`, function (model:any) 
    {
      const parentComponent = model.get('components');
      let componentIndex = 0;
      if (model.attributes && model.attributes.name) 
      {
        componentIndex = $this.routeFlows.findIndex((x: { elementName: any; }) =>
          x.elementName === model.attributes.name);
        if (componentIndex > -1) 
        {
          // remove flows first if present in flows_info
          const flowInfoIndex = $this.screenFlows.findIndex((x: { elementName: any; componentId: string; }) =>
            x.elementName === $this.routeFlows[componentIndex].elementName && x.componentId !== '');
          if (flowInfoIndex > -1)
          {
            $this.screenFlows.splice(flowInfoIndex, 1);
          }
          $this.routeFlows.splice(componentIndex, 1);
        }
        // remove special events
        componentIndex = $this.specialEvents.findIndex((x: { elementName: any; }) =>
          x.elementName === model.attributes.name);
        if (componentIndex > -1) 
        {
          $this.specialEvents.splice(componentIndex, 1);
        }

        // remove link information
        componentIndex = $this.linkArray.findIndex((x: { elementName: any; }) =>
          x.elementName === model.attributes.name);
        if (componentIndex > -1) 
        {
          $this.linkArray.splice(componentIndex, 1);
        }
      }
      if (parentComponent.length === 0) 
      {
        componentIndex = $this.screenEntityModel.findIndex((x: { elementName: any; }) =>
          x.elementName === parentComponent.parent.attributes.name);
        if (componentIndex > -1) 
        {
          $this.screenEntityModel.splice(componentIndex, 1);
        }
        componentIndex = $this.screenFlows.findIndex((x: { elementName: any; componentId: string; }) =>
          x.elementName === parentComponent.parent.attributes.name && x.componentId !== '');
        if (componentIndex > -1) 
        {
          $this.screenFlows.splice(componentIndex, 1);
        }
        const elementNameIndex = $this.ElementNameArray.findIndex((x: any) => x === parentComponent.parent.attributes.name);
        if (elementNameIndex > -1) 
        {
          $this.ElementNameArray.splice(elementNameIndex, 1);
        }
        $this.saveRemoteStorage();
      } 
      else 
      {
        model.get('components').each((child: { attributes: { name: any; }; }) => 
        {
          componentIndex = $this.screenEntityModel.findIndex((x: { elementName: any; }) =>
            x.elementName === child.attributes.name);
          if (componentIndex > -1) 
          {
            $this.screenEntityModel.splice(componentIndex, 1);
          }
          componentIndex = $this.screenFlows.findIndex((x: { elementName: any; componentId: string; }) =>
            x.elementName === child.attributes.name && x.componentId !== '');
          if (componentIndex > -1) 
          {
            $this.screenFlows.splice(componentIndex, 1);
          }
          const elementNameIndex = $this.ElementNameArray.findIndex((x: any) => x === child.attributes.name);
          if (elementNameIndex > -1) 
          {
            $this.ElementNameArray.splice(elementNameIndex, 1);
          }
          // remove element for special events
          const specialEventIndex = $this.specialEvents.findIndex((x: { elementName: any; }) => x.elementName === child.attributes.name);
          if (specialEventIndex > -1) 
          {
            $this.specialEvents.splice(specialEventIndex, 1);
          }

          // remove element for link
          const linkIndex = $this.linkArray.findIndex((x: { elementName: any; }) => x.elementName === child.attributes.name);
          if (linkIndex > -1) 
          {
            $this.linkArray.splice(linkIndex, 1);
          }
        });
        $this.saveRemoteStorage();
      }
    });
  }
  updateComponentName($this:any) 
  {
    // it called when we update the component traits name
    $this.editor.on(`component:update:name`, function (model:any) 
    {
      if (model._previousAttributes.name === '') 
      {
        $this.ElementNameArray.push(model.attributes.name);
      } 
      else
      {
        const elementNameIndex = $this.ElementNameArray.findIndex((x: any) => x === model.attributes.name);
        if (elementNameIndex > -1) 
        {
          model.attributes.traits.target.set('name', `${model._previousAttributes.name}`);
          $this.editor.TraitManager.getTraitsViewer().render();
        } 
        else 
        {
          $this.ElementNameArray.push(model.attributes.name);
        }
      }
      const entityIndex = $this.screenEntityModel.findIndex((x:any) =>
        x.elementName === model._previousAttributes.name);
      if (entityIndex > -1) 
      {
        $this.screenEntityModel[entityIndex].elementName = model.attributes.name;
        $this.saveRemoteStorage();
      }
      const flowIndex = $this.screenFlows.findIndex((x:any) =>
        x.elementName === model._previousAttributes.name && x.componentId !== '');
      if (flowIndex > -1) 
      {
        $this.screenFlows[flowIndex].elementName = model.attributes.name;
      }
      // rename element in routeFlows
      const routeIndex = $this.routeFlows.findIndex((x:any) =>
        x.elementName === model._previousAttributes.name);
      if (routeIndex > -1) 
      {
        $this.routeFlows[routeIndex].elementName = model.attributes.name;
      }
      // rename special events
      const specialEventIndex = $this.specialEvents.findIndex((x:any) =>
        x.elementName === model._previousAttributes.name);
      if (specialEventIndex > -1) 
      {
        $this.specialEvents[specialEventIndex].elementName = model.attributes.name;
      }
      // rename link events
      const linkIndex = $this.linkArray.findIndex((x:any) =>
        x.elementName === model._previousAttributes.name);
      if (linkIndex > -1) 
      {
        $this.linkArray[linkIndex].elementName = model.attributes.name;
      }
      $this.saveRemoteStorage();
    });
  }
  updateTraits($this:any) 
  {
    // select entity if triats values changed then its called
    $this.editor.on(`component:update:entity`, function (model:any) 
    {
      $this.selectedEntityModel = model.changed['entity'];
      console.log(" $this.selectedEntityModel ", $this.selectedEntityModel );      
      $this.selectedHtmlElement.htmlId = model.ccid;
      $this.selectedHtmlElement.componentId = model.cid;
      $this.selectedHtmlElement.elementName = model.attributes.name;
    });

    // called when we change value in component lifecycle verbs
    $this.editor.on(`component:update:componentVerb`, function (model:any) 
    {
      $this.selectedEntityModel = model.changed['componentVerb'];
      $this.componentVerb = $this.componentVerbList.find((x:any) => x.value === model.changed['componentVerb']).key;
    });

    // set whether the screen type as popupmodal or normal one
    $this.editor.on(`component:update:popupmodal`, function (model:any) 
    {
      if (model.changed['popupmodal']) 
      {
        $this.screenOption = 'popupmodal';
      } 
      else 
      {
        $this.screenOption = 'normal';
      }
    });
  }
  dragAndDrop($this:any) 
  {
    $this.editor.on('block:drag:stop', function (model:any) 
    {
      console.log('model drag and drop are ----- ', model);
      const allInputModels = model.find('[data-gjs-type="input"]');
      const allFormModels = model.find('form');
      const allButtonModels = model.find('button');
      const allOptionModels = model.find('select');
      const allRadioModels = model.find('input[type="radio"i]');
      const allCheckBoxModels = model.find('input[type="checkbox"i]');
      const allImageBlockModels = model.find('.gpd-image-block');
      const allImageModels = model.find('.gjs-plh-image');
      const allTextAreaModels = model.find('textarea');
      const ckeditorspan = model.find('#ckeditorspan');
      const ckeditorTextAreaModels = model.find('span #ckeditortextarea');
      console.log("allFormModels",allFormModels);
      console.log('allRadioModels are ------- ', allRadioModels);
      if (allInputModels.length === 0 && model.attributes.tagName === 'input') 
      {
        allInputModels.push(model);
      }
      if (allFormModels.length === 0 && model.attributes.tagName === 'form') 
      {
        $this.setElementCSS(model, 'form', null);
      }
      if (allButtonModels.length === 0 && model.attributes.tagName === 'button') 
      {
        allButtonModels.push(model);
      }
      // input
      allInputModels.forEach((element:any) => 
      {
          $this.setElementCSS(element, 'input', null);
          console.log("element.ccid",element.ccid);          
          element.attributes.traits.target.set('name', `input_${element.ccid}`);
      });
      // TextArea
      allTextAreaModels.forEach((element:any) => 
      {
        $this.setElementCSS(element, 'textarea', null);
        element.attributes.traits.target.set('name', `textbox_${element.ccid}`);
      });
      allRadioModels.forEach((element:any) => 
      {
          if (element) 
          {
            $this.setElementCSS(element, 'radio', 'input');
          }
          element.attributes.traits.target.set('name', `radio_${element.ccid}`);
      });
      // checkbox
      allCheckBoxModels.forEach((element:any) => 
      {
        $this.setElementCSS(element, 'checkbox', 'input');
        element.attributes.traits.target.set('name', `checkbox_${element.ccid}`);
      });
      // button
      allButtonModels.forEach((element:any) =>
      {
        // set default verbs for button
        $this.buttonVerb = 'click';
        $this.setElementCSS(element, 'button', null);
        element.attributes.traits.target.set('name', `button_${element.ccid}`);
      });
      // image blocks
      allImageBlockModels.forEach((element:any) =>
      {
          element.attributes.traits.target.set('name', `image_${element.ccid}`);
      });
      // input options
      allOptionModels.forEach((element:any) => 
      {
        $this.setElementCSS(element, 'select', null);
        element.attributes.traits.target.set('name', `select_${element.ccid}`);
      });
      // images
      allImageModels.forEach((element:any) => 
      {
        element.attributes.traits.target.set('name', `image_${element.ccid}`);
      });
      // ckeditor
      // set dynamic name in ckeditor span
      ckeditorspan.forEach((element:any) => 
      {
        element.attributes.traits.target.set('name', `ckeditor_${element.ccid}`);
      });
      // remove unwanted classes and add the classname if available
      ckeditorTextAreaModels.forEach((element:any) => 
      {
        $this.setElementCSS(element, 'ckeditor', 'textarea');
        element.attributes.traits.target.set('name', `ckeditor_${element.ccid}`);
      });
      const wrapperType = $this.editor.DomComponents.getWrapper().find('[data-gjs-type="grid-type"]');
      const linkType = $this.editor.DomComponents.getWrapper().find('[data-gjs-type="link"]');
      const dynamicdropdownType = $this.editor.DomComponents.getWrapper().find('[data-gjs-type="dynamicdropdown-type"]');
      const tagManager = $this.editor.DomComponents.getWrapper().find('[data-gjs-type="tagmanager"]');
      const multiSelectDropdown=$this.editor.DomComponents.getWrapper().find('[data-gjs-type="multiselect-type"]');
      const highChart=$this.editor.DomComponents.getWrapper().find('[data-gjs-type="highcharts-type"]');
      const image=$this.editor.DomComponents.getWrapper().find('[data-gjs-type="image"]');

      if (image.length > 0) 
      {
        image.forEach((element:any) => 
        {
          element.attributes.traits.target.set('name', `image_${element.ccid}`);
        });
      }

      if (wrapperType.length > 0) 
      {
        $this.is_grid_present = true;
        $this.saveRemoteStorage();
        wrapperType.forEach((element:any) => 
        {
          $this.setElementCSS(element, 'grid', null);
          element.attributes.traits.target.set('name', `grid_${element.ccid}`);
        });
      }
      if (linkType.length > 0) 
      {
        linkType.forEach((element:any) => 
        {
          element.attributes.traits.target.set('name', `link_${element.ccid}`);
        });
      }
      if (dynamicdropdownType.length > 0) 
      {
          dynamicdropdownType.forEach((element:any) => 
          {
             element.attributes.traits.target.set('name', `dynamicdropdown_${element.ccid}`);
          });
      }
      if (tagManager.length > 0) 
      {
        tagManager.forEach((element:any) => 
        {
          element.attributes.traits.target.set('name', `tagmanager_${element.ccid}`);
        });
      }
      if (multiSelectDropdown.length > 0) 
      {
        multiSelectDropdown.forEach((element:any) => 
        {
          element.attributes.traits.target.set('name', `multiselectdropdown_${element.ccid}`);
        });
      }  

      if (highChart.length > 0) 
      {
        highChart.forEach((element:any) => 
        {
          element.attributes.traits.target.set('name', `highChart_${element.ccid}`);
        });
      }
    })
  }
}  



