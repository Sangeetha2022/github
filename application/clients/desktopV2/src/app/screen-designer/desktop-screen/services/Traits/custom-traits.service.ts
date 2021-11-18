import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTraitsService {
  [x: string]: any;

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
            this.target.set('content', this.model.get('value'));
        }
    });
}

flowsActionButton($this: any) {
    let rows: any;
    // action button add
    $this.editor.TraitManager.addType('actionButton', {
        events: {
            'click':  () =>{
                console.log('---------action button clicked here-------');
                const element = $this.screenFlows.filter((x: { elementName: any; }) => x.elementName === this.target.attributes.name);
                const eventPopupModel = document.getElementById('EventPopup');
                if (element && element.length > 0) {
                    $this.selectedFlowObj = $this.listOfFLows.filter((x: { _id: any; }) => x._id === element[0].flow);
                    console.log('-------selectedflowobj------', $this.selectedFlowObj);
                    /*Here we match the which of the flow is already been added in the screen flow info and make the checkbox 
                    checked for that row in ag-grid. For more details refer issue #381 in github developer is Kishan 21May2020 */
                    rows = $this.gridApi.getCellRendererInstances();
                    Object.keys(rows).forEach(k => {
                         /** The below condition is for show the flow action for selected attribute in the screen designer.
                          *  For more details check issue #401 in github developer Kishan 29Jun2020 */
                        // tslint:disable-next-line: triple-equals
                        if ($this.selectedFlowObj[0].name == rows[k].params.data.name) {
                            rows[k].params.eGridCell.children[0].checked = true;
                        } else {
                            rows[k].params.eGridCell.children[0].checked = false;
                        }
                    });
                } else {
                    $this.selectedFlowObj = null;
                }
                // $this.rowSelection = 'single';
                $this.isLifeCycleRow = false;
                eventPopupModel!.style.display = 'block';
                $this.gridApi.deselectAll();
                $this.ref.detectChanges();
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
            button.appendChild(document.createTextNode('Flow'));
            return button;
        },
    });
}

async flowsModifierValueButton($this: any) {
    let rows: any;
    // action button add
    $this.editor.TraitManager.addType('valueButton', {
        events: {
            'click': async  ()=> {
                console.log('---------action button clicked here-------');
                const oldElement = $this.screenFlows.filter((x: { elementName: any; }) => x.elementName === this.target.attributes.name);
                let element: any = await this.getEntityDetails($this);
                if (element && element.length > 0) {
                    element.forEach((entity: any) => {
                      if (entity.is_default === true) {
                        entity.field.forEach((data: any) => {
                          $this.allEntityByProject.push(data);
                        });
                      } else if (entity.feature_id === $this.feature_id){
                        entity.field.forEach((data: any) => {
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
                    rows = $this.gridApi1.getCellRendererInstances();
                    Object.keys(rows).forEach(k => {
                        /** The below condition is for show the flow action for selected attribute in the screen designer.
                         *  For more details check issue #401 in github developer Kishan 29Jun2020 */
                       // tslint:disable-next-line: triple-equals
                       if ($this.selectedModifierValue[0].name == rows[k].params.data.name) {
                           rows[k].params.eGridCell.children[0].checked = true;
                       } else {
                           rows[k].params.eGridCell.children[0].checked = false;
                       }
                   });
                } else {
                    $this.selectedFlowObj = null;
                }
                // $this.rowSelection = 'single';
                $this.isLifeCycleRow = false;
                eventPopupModel!.style.display = 'block';
                $this.gridApi.deselectAll();
                $this.ref.detectChanges();
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
            button.appendChild(document.createTextNode('Modifier Value'));
            return button;
        },
        getEntityDetails($this: { projectComponentService: { getEntityByProjectId: (arg0: any, arg1: any) => { (): any; new(): any; subscribe: { (arg0: (response: any) => void): void; new(): any; }; }; }; project_id: any; logId: any; }) {
            return new Promise(resolve => {
                $this.projectComponentService.getEntityByProjectId($this.project_id, $this.logId).subscribe((response: { body: unknown; }) => {
                    resolve(response.body);
                });
            })
        }
    });
}





MultiflowsActionButton($this: any) {
    // action button add
    $this.editor.TraitManager.addType('multiflowButton', {
        events: {
            'click':  ()=> {
                const element = $this.screenFlows.filter((x: { elementName: any; }) => x.elementName === this.target.attributes.name);
                const eventPopupModel = document.getElementById('EventPopup');
                if (element && element.length > 0) {
                    $this.selectedFlowObj = $this.listOfFLows.filter((x: { _id: any; }) => x._id === element[0].flow);
                } else {
                    $this.selectedFlowObj = null;
                }
                // $this.rowSelection = 'multiple';
                $this.isLifeCycleRow = true;
                eventPopupModel!.style.display = 'block';
                $this.gridApi.deselectAll();
                $this.ref.detectChanges();
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
            button.appendChild(document.createTextNode('Flow'));
            return button;
        },
    });

    $this.editor.TraitManager.addType('popupmodal', {
        events: {
            'click': function () {
                alert('clicked');
            },
        },
        getInputEl() {
            // tslint:disable-next-line:prefer-const
            const newCheckBox = document.createElement('input');
            newCheckBox.type = 'checkbox';
            newCheckBox.id = 'ptworkinfo'; // need unique Ids!
            newCheckBox.value = 'popupmodal';
            return newCheckBox;
        },
    });

    $this.editor.TraitManager.addType('linkCheckboxModal', {
        events: {
            'click': function () {
                alert('clicked');
            },
        },
        getInputEl() {
            const newCheckBox = document.createElement('input');
            newCheckBox.type = 'checkbox';
            newCheckBox.id = 'linkCheckboxID'; // need unique Ids!
            newCheckBox.value = 'linkCheckboxModal';

            // parentElement.appendChild(newCheckBox);
            return newCheckBox;
        },
    });
}

popupModalButton($this: any) {
    // action button add
    $this.editor.TraitManager.addType('modalButton', {
        events: {
            'click': function () {
                $this.modalDroppedElements = [];
                const allInputModels = $this.editor.DomComponents.getWrapper().find('[data-gjs-type="input"]');
                const allOptionModels = $this.editor.DomComponents.getWrapper().find('select');
                allInputModels.forEach((element: { attributes: { name: string; }; }) => {
                    if (element.attributes.name) {
                        const inputTemp = {
                            name: '',
                            type: ''
                        };
                        inputTemp.name = element.attributes.name;
                        inputTemp.type = 'input';
                        $this.modalDroppedElements.push(inputTemp);
                    }
                });
                allOptionModels.forEach((element: { attributes: { name: string; }; }) => {
                    if (element.attributes.name) {
                        const selectTemp = {
                            name: '',
                            type: ''
                        };
                        selectTemp.name = element.attributes.name;
                        selectTemp.type = 'select';
                        $this.modalDroppedElements.push(selectTemp);
                    }
                });
                $this.customPopupModal.name = $this.GPMODAL_FLOWNAME;
                $this.customPopupModal.title = 'Modal Details';
                $this.customPopupModal.dropdownLabelName = 'Screen';
                $this.customPopupModal.typeLabelName = null;
                const temp = {
                    labelName: 'Entity',
                    fieldLabelName: 'Entity Field',
                    componentLabelName: 'Component Name'
                };
                $this.customPopupModal.entity = temp;
                $this.isCustomPopup = true;
                $this.ref.detectChanges();
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
            button.appendChild(document.createTextNode('Details'));
            return button;
        },
    });
}
  entityFieldButton($this:any) {
    let matchentity: any;
     console.log("$this==>",$this);
    
    $this.editor.TraitManager.addType('entityFieldButton', {
      
            'click': function()  {
              
                    console.log("button clicked");
                    //alert("trigger when btn is clicked")
            },  
        // events: {
        //     'click': function ()  {
        //         alert()
        //         /* this condition is used to get the entity info of the screen to bind the entity field upon 
        //         selecting the html element in grapesjs for details refer #381 in github developer is Kishan 19May2020 */
        //         if ($this.existScreenDetail !== undefined && $this.existScreenDetail !== null) {
        //             this.entityinfo = $this.existScreenDetail[0]["entity_info"];
        //             console.log("entityinfo==>trait",this.entityinfo);
        //             matchentity = this.entityinfo.find((x: { htmlId: any; }) => x.htmlId == this.target.attributes.attributes.id);
        //         }
        //         // previously the enity was bind using this way this.target.changed['entity'];
        //         const traitEntity = this.target.attributes.entity;
        //         if (traitEntity !== undefined
        //             && traitEntity !== 'none') {
        //             $this.isFieldPopupModal = true;
        //             $this.EntityField.forEach((entityElement: { _id: any; field: any[]; }) => {
        //                 if (entityElement._id === traitEntity) {
        //                     $this.fields = entityElement.field.filter((el: { name: string; }) => {
        //                         return (el.name.toLowerCase() !== 'createdat' &&
        //                             el.name.toLowerCase() !== 'updatedat');
        //                     });
        //                     /* This is where we find the field of the selected html template and bind it with ngModel
        //                     value for details refer #381 in github developer is Kishan 19May2020*/
        //                     if (matchentity !== undefined && matchentity !== null) {
        //                         $this.entityFields.entityfieldname = matchentity.fields.name;
        //                         $this.entityFields.entityId = matchentity.entityId;
        //                     } else {
        //                         $this.entityFields.entityId = traitEntity;
        //                     }
        //                 }


        //             });
        //             $this.ref.detectChanges();
        //         } else {
        //             console.log('no entity selected');
        //         }
        //     },
        // },
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
        }
    });
}
}
