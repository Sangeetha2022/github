import { Injectable } from '@angular/core';
import { isArray } from 'util';

@Injectable({
    providedIn: 'root'
})
export class CustomTraitsService {

    content($this) {
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

    flowsActionButton($this) {
        let rows: any;
        // action button add
        $this.editor.TraitManager.addType('actionButton', {
            events: {
                'click': function () {
                    const element = $this.screenFlows.filter(x => x.elementName === this.target.attributes.name);
                    const eventPopupModel = document.getElementById('EventPopup');
                    if (element && element.length > 0) {
                        $this.selectedFlowObj = $this.listOfFLows.filter(x => x._id === element[0].flow);
                        /*Here we match the which of the flow is already been added in the screen flow info and make the checkbox 
                        checked for that row in ag-grid. For more details refer issue #381 in github developer is Kishan 21May2020 */
                        rows = $this.gridApi.getCellRendererInstances();
                        Object.keys(rows).forEach(k=>{
                            if($this.selectedFlowObj[0].name == rows[k].params.data.name){
                                rows[k].params.node.selected = true;
                                rows[k].params.eGridCell.children[0].checked = true;
                            }
                        })
                    } else {
                        $this.selectedFlowObj = null;
                    }
                    // $this.rowSelection = 'single';
                    $this.isLifeCycleRow = false;
                    eventPopupModel.style.display = 'block';
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



    MultiflowsActionButton($this) {
        // action button add
        $this.editor.TraitManager.addType('multiflowButton', {
            events: {
                'click': function () {
                    const element = $this.screenFlows.filter(x => x.elementName === this.target.attributes.name);
                    const eventPopupModel = document.getElementById('EventPopup');
                    if (element && element.length > 0) {
                        $this.selectedFlowObj = $this.listOfFLows.filter(x => x._id === element[0].flow);
                    } else {
                        $this.selectedFlowObj = null;
                    }
                    // $this.rowSelection = 'multiple';
                    $this.isLifeCycleRow = true;
                    eventPopupModel.style.display = 'block';
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

    popupModalButton($this) {
        // action button add
        $this.editor.TraitManager.addType('modalButton', {
            events: {
                'click': function () {
                    $this.modalDroppedElements = [];
                    const allInputModels = $this.editor.DomComponents.getWrapper().find('[data-gjs-type="input"]');
                    const allOptionModels = $this.editor.DomComponents.getWrapper().find('select');
                    allInputModels.forEach(element => {
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
                    allOptionModels.forEach(element => {
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

    popupLinkButton($this) {
        // action button add
        $this.editor.TraitManager.addType('linkButton', {
            events: {
                'click': function () {
                    $this.isLinkPopup = true;
                    if ($this.pageLinkObj.selectedEntity) {
                        const entityObj = $this.entityData.find(x => x._id === $this.pageLinkObj.selectedEntity._id);
                        if (entityObj) {
                            $this.pageLinkObj.entityField = entityObj.field;
                        }
                    }
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

    RouteActionButton($this) {
        // action button add
        $this.editor.TraitManager.addType('routeButton', {
            events: {
                'click': function () {
                    $this.customPopupModal.name = $this.GPROUTE_FLOWNAME;
                    $this.customPopupModal.title = 'Routes';
                    $this.customPopupModal.dropdownLabelName = 'Screen';
                    $this.customPopupModal.typeLabelName = 'Type';
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
                button.appendChild(document.createTextNode('Screens'));
                return button;
            },
        });
    }

    entityFieldButton($this) {
        let matchentity: any;
        $this.editor.TraitManager.addType('entityFieldButton', {
            events: {
                'click': function () {
                    /* this condition is used to get the entity info of the screen to bind the entity field upon 
                    selecting the html element in grapesjs for details refer #381 in github developer is Kishan 19May2020 */
                    if ($this.existScreenDetail !== undefined && $this.existScreenDetail !== null) {
                        this.entityinfo = $this.existScreenDetail[0]["entity_info"];
                        matchentity = this.entityinfo.find(x => x.htmlId == this.target.attributes.attributes.id);
                    }
                    // previously the enity was bind using this way this.target.changed['entity'];
                    const traitEntity = this.target.attributes.entity;
                    if (traitEntity !== undefined
                        && traitEntity !== 'none') {
                        $this.isFieldPopupModal = true;
                        $this.EntityField.forEach(entityElement => {
                            if (entityElement._id === traitEntity) {
                                $this.fields = entityElement.field.filter((el) => {
                                    return (el.name.toLowerCase() !== 'createdat' &&
                                        el.name.toLowerCase() !== 'updatedat');
                                });
                                /* This is where we find the field of the selected html template and bind it with ngModel value for details refer #381 in github developer is Kishan 19May2020*/
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

    addGridRowButton($this) {
        // add button
        $this.editor.TraitManager.addType('addButton', {
            events: {
                'click': function () {
                    const component = $this.editor.getSelected();
                    const agGridObject = {
                        columnid: '',
                        columnname: '',
                        entity: '',
                        entityfield: ''
                    };
                    const count = this.target.view.el.gridOptions.columnDefs.length + 1;
                    const columnDefs = this.target.view.el.gridOptions.columnDefs;
                    agGridObject.columnid = `col${count}_id`;
                    agGridObject.columnname = `column_${count}`;
                    columnDefs.push({
                        headerName: agGridObject.columnname,
                        field: $this.columnOptions[0].name,
                        sortable: true,
                        colId: agGridObject.columnid
                    });
                    $this.agGridObject.default_field.push(agGridObject);
                    $this.agGridObject.custom_field.push(agGridObject);
                    this.target.view.el.gridOptions.api.setColumnDefs(columnDefs);
                    this.target.view.el.gridOptions.api.sizeColumnsToFit();
                    $this.columnOptions.push({ value: `col${count}_id`, name: `column_${count}` });
                    const colTraits = this.target.get('traits').where({ name: 'columns' })[0];
                    $this.saveRemoteStorage();
                    component.getTrait('columns').set('options', [
                        ...$this.columnOptions
                    ]);
                },
            },
            getInputEl() {
                const button = <HTMLElement>document.createElement('button');
                button.id = 'addButton';
                button.style.width = '100%';
                button.style.backgroundColor = '#4CAF50';
                button.style.border = 'none';
                button.style.color = 'white';
                button.style.backgroundColor = '#008CBA';
                button.style.fontSize = '16px';
                button.style.cursor = 'pointer';
                button.appendChild(document.createTextNode('+'));
                return button;
            },
        });
    }

    removeGridRowButton($this) {
        // remove button
        $this.editor.TraitManager.addType('removeButton', {
            events: {
                'click': function () {
                    const columnDefs = this.target.view.el.gridOptions.columnDefs;
                    const component = $this.editor.getSelected();
                    columnDefs.pop();
                    this.target.view.el.gridOptions.api.setColumnDefs(columnDefs);
                    this.target.view.el.gridOptions.api.sizeColumnsToFit();
                    $this.columnOptions.pop();
                    $this.agGridObject.default_field.pop();
                    $this.agGridObject.custom_field.pop();
                    $this.saveRemoteStorage();
                    component.getTrait('columns').set('options', [
                        ...$this.columnOptions
                    ]);
                },
            },
            getInputEl() {
                const button = <HTMLElement>document.createElement('button');
                button.id = 'removeButton';
                button.style.width = '100%';
                button.style.backgroundColor = 'rgba(186, 43, 0, 0.73)';
                button.style.border = 'none';
                button.style.color = 'white';
                button.style.fontSize = '16px';
                button.style.cursor = 'pointer';
                button.appendChild(document.createTextNode('-'));
                return button;
            },
        });
    }

    gridFieldButton($this) {
        $this.editor.TraitManager.addType('fieldGridButton', {
            events: {
                'click': function () {
                    // trigger when btn is clicked
                    let entityId = null;
                    if (this.target.changed['entity']) {
                        entityId = this.target.changed['entity'];
                    } else if (this.target.attributes.entity !== 'none') {
                        entityId = this.target.attributes.entity;
                    }
                    const entityFound = $this.EntityField.find(x => x._id === entityId);
                    if (entityFound) {
                        $this.agGridObject.entityId = entityId;
                        $this.selectedEntity = entityFound;
                        $this.allEntityField = entityFound.field;
                        $this.defaultColumn = this.target.view.el.gridOptions.columnDefs;
                        $this.isGridPopup = true;
                        $this.ref.detectChanges();
                    }
                },
            },
            getInputEl() {
                const button = <HTMLElement>document.createElement('button');
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
