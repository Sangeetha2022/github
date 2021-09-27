import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTraitsService {
  [x: string]: any;

  constructor() { }
  entityinfo:any;
  entityFieldButton($this:any) {
    let matchentity: any;
     
    $this.editor.TraitManager.addType('entityFieldButton', {
        events: {
            'click': ()=> {
                /* this condition is used to get the entity info of the screen to bind the entity field upon 
                selecting the html element in grapesjs for details refer #381 in github developer is Kishan 19May2020 */
                if ($this.existScreenDetail !== undefined && $this.existScreenDetail !== null) {
                    this.entityinfo = $this.existScreenDetail[0]["entity_info"];
                    matchentity = this.entityinfo.find((x: { htmlId: any; }) => x.htmlId == this.target.attributes.attributes.id);
                }
                // previously the enity was bind using this way this.target.changed['entity'];
                const traitEntity = this.target.attributes.entity;
                if (traitEntity !== undefined
                    && traitEntity !== 'none') {
                    $this.isFieldPopupModal = true;
                    $this.EntityField.forEach((entityElement: { _id: any; field: any[]; }) => {
                        if (entityElement._id === traitEntity) {
                            $this.fields = entityElement.field.filter((el: { name: string; }) => {
                                return (el.name.toLowerCase() !== 'createdat' &&
                                    el.name.toLowerCase() !== 'updatedat');
                            });
                            /* This is where we find the field of the selected html template and bind it with ngModel
                            value for details refer #381 in github developer is Kishan 19May2020*/
                            if (matchentity !== undefined && matchentity !== null) {
                                $this.entityFields.entityfieldname = matchentity.fields.name;
                                $this.entityFields.entityId = matchentity.entityId;
                            } else {
                                $this.entityFields.entityId = traitEntity;
                            }
                        }


                    });
                    $this.ref.detectChanges();
                } else {
                    console.log('no entity selected');
                }
            },
        },
        getInputEl() {
            // tslint:disable-next-line:prefer-const
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
            return button;
        },
    });
}
}
