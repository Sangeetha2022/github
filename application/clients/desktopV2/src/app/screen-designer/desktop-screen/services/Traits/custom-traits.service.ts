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
            //alert(this.model.get('value'))
            this.target.set('content', this.model.get('value'));
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
    flowsActionButton(screen_designer:any) {
        let rows: any;
        screen_designer.editor.TraitManager.addType('actionButton', {
            getInputEl() {
                let button = document.createElement('button');
                button.id = 'fieldButton';
                button.style.width = '100%';
                button.style.backgroundColor = '#4CAF50';
                button.style.border = 'none';
                button.style.color = 'white';
                button.style.backgroundColor = '#008CBA';
                button.style.fontSize = '12px !important';
                button.style.cursor = 'pointer';
                button.appendChild(document.createTextNode('Flow'));
                button.onclick=()=>{
                    console.log('---------action button clicked here-------');
                    const element = screen_designer.screenFlows.filter((x:any) => x.elementName === this.target.attributes.name);
                    const eventPopupModel = document.getElementById('EventPopup');
                    if (element && element.length > 0) {
                        screen_designer.selectedFlowObj = screen_designer.listOfFLows.filter((x:any) => x._id === element[0].flow);
                        console.log('-------selectedflowobj------', screen_designer.selectedFlowObj);
                        rows = screen_designer.gridApi.getCellRendererInstances();
                        Object.keys(rows).forEach(k => {
                            /** The below condition is for show the flow action for selected attribute in the screen designer.
                             *  For more details check issue #401 in github developer Kishan 29Jun2020 */
                           // tslint:disable-next-line: triple-equals
                           if (screen_designer.selectedFlowObj[0].name == rows[k].params.data.name) {
                               rows[k].params.eGridCell.children[0].checked = true;
                           } else {
                               rows[k].params.eGridCell.children[0].checked = false;
                           }
                       });
                    } else {
                        screen_designer.selectedFlowObj = null;
                    }
                    // $this.rowSelection = 'single';
                    screen_designer.isLifeCycleRow = false;
                    eventPopupModel!.style.display = 'block';
                    screen_designer.ref.detectChanges();
                }
                return button;
            },
        });
    }

    async flowsModifierValueButton($this:any) {
        let rows: any;
        // action button add
        $this.editor.TraitManager.addType('valueButton', {
         
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
                button.appendChild(document.createTextNode('Modifier Value'));
                button.onclick=async ()=>{
                    console.log('---------action button clicked here-------');
                    const oldElement = $this.screenFlows.filter((x:any) => x.elementName === this.target.attributes.name);
                    let element: any = await this.getEntityDetails($this);
                    if (element && element.length > 0) {
                        element.forEach((entity: any) => {
                          if (entity.is_default === true) {
                            entity.field.forEach((data:any) => {
                              $this.allEntityByProject.push(data);
                            });
                          } else if (entity.feature_id === $this.feature_id){
                            entity.field.forEach((data:any) => {
                              $this.allEntityByProject.push(data);
                            });
                          }
                        });
                    }
                    $this.tableRowData = $this.allEntityByProject;
                    const eventPopupModel = document.getElementById('ProjectEventPopup');
                    if (element && element.length > 0) {
                        // $this.selectedFlowObj = $this.listOfFLows.filter(x => x._id === element[0].flow);
                        console.log('-------selectedflowobj------', $this.selectedFlowObj);
                        /*Here we match the which of the flow is already been added in the screen flow info and make the checkbox 
                        checked for that row in ag-grid. For more details refer issue #381 in github developer is Kishan 21May2020 */
                        rows = $this.gridApi_modifier.getCellRendererInstances();
                    } else {
                        $this.selectedFlowObj = null;
                    }
                    // $this.rowSelection = 'single';
                    $this.isLifeCycleRow = false;
                    eventPopupModel!.style.display = 'block';
                    $this.gridApi_modifier.deselectAll();
                    $this.ref.detectChanges();
                }
                return button;
            },
            getEntityDetails($this:any) {
                return new Promise(resolve => {
                    $this.projectComponentService.getEntityByProjectId($this.project_id, $this.logId).subscribe((response:any) => {
                        resolve(response.body);
                    });
                })
            }
        });
    }
}
