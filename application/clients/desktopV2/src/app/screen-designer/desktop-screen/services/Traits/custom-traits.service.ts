import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTraitsService {

  constructor() { }
  entityinfo:any;
  content($this:any) {
    $this.editor.TraitManager.addType('content', {
        events: {
            'keyup': 'onChange',  // trigger parent onChange method on keyup
        },

        getInputEl: function () {
            if (!this.inputEl) {
                const input = document.createElement('textarea');
                input.value = this.target.get('content');
                this.inputEl = input;
            }
            return this.inputEl;
        },
        onValueChange: function () {
            console.log("this.model.get('type')",this.model.get('type'));
             console.log("value",this.model);
         this.target.set('content', this.model.get('value'));
         alert( this.model.get('value'))
        }
    });
  
}

  entityFieldButton(screen_designer:any) {
    let matchentity: any;
    screen_designer.editor.TraitManager.addType('entityFieldButton', {
       
        getInputEl() {
            let button = <HTMLElement>document.createElement('button');
            button.id = 'fieldButton';
            button.style.width = '100%';
            button.style.backgroundColor = '#4CAF50';
            button.style.border = 'none';
            button.style.color = 'white';
            button.style.backgroundColor = '#008CBA';
            button.style.fontSize = '12px !important';
            button.style.cursor = 'pointer';
            button.appendChild(document.createTextNode('Field'));
            //Click events not worked in grapesjs old version code so event function and capturing in entity details below onclick event
            button.onclick = () =>{
               
               /* this condition is used to get the entity info of the screen to bind the entity field 
               upon  selecting the html element in grapesjs*/
                if (screen_designer.existScreenDetail !== undefined && screen_designer.existScreenDetail !== null) {
                    this.entityinfo = screen_designer.existScreenDetail[0]["entity_info"];
                    matchentity = this.entityinfo.find((x:any) => x.htmlId == this.target.attributes.attributes.id);
                }
                // previously the enity was bind using this way this.target.changed['entity'];
                const traitEntity = this.target.attributes.entity;
                if (traitEntity !== undefined
                    && traitEntity !== 'none') {
                        screen_designer.isFieldPopupModal = true;
                        screen_designer.EntityField.forEach((entityElement:any) => {
                        if (entityElement._id === traitEntity) {
                            screen_designer.fields = entityElement.field.filter((el:any) => {
                                return (el.name.toLowerCase() !== 'createdat' &&
                                    el.name.toLowerCase() !== 'updatedat');
                            });
                            /* This is where we find the field of the selected html template and bind it with ngModel
                            value for details refer #381 in github developer is Kishan 19May2020*/
                            if (matchentity !== undefined && matchentity !== null) {
                                screen_designer.entityFields.entityfieldname = matchentity.fields.name;
                                screen_designer.entityFields.entityId = matchentity.entityId;
                            } else {
                                screen_designer.entityFields.entityId = traitEntity;
                            }
                        }
                    });
                    screen_designer.ref.detectChanges();
                } else {
                    console.log('no entity selected');
                }
         
              };
           return button;
        }
    });
}
}
