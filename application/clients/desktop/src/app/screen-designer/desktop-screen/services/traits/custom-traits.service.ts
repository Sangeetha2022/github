import { Injectable } from '@angular/core';

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
        // action button add
        $this.editor.TraitManager.addType('actionButton', {
            events: {
                'click': function () {
                    const element = $this.screenFlows.filter(x => x.elementName === this.target.attributes.name);
                    const eventPopupModel = document.getElementById('EventPopup');
                    if (element && element.length > 0) {
                        $this.selectedFlowObj = $this.listOfFLows.filter(x => x._id === element[0].flow);
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
    }

    popupModalButton($this) {
        // action button add
        $this.editor.TraitManager.addType('modalButton', {
            events: {
                'click': function () {
                    $this.customPopupModal.name = $this.GPMODAL_FLOWNAME;
                    $this.customPopupModal.title = 'Modal Details';
                    $this.customPopupModal.dropdownLabelName = 'Screen';
                    $this.customPopupModal.typeLabelName = null;
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

    gridActionFlowButton($this) {
        // action button add
        $this.editor.TraitManager.addType('gridActionButton', {
            events: {
                'click': function () {
                    // console.log('print button clicked');
                    const eventPopupModel = document.getElementById('EventPopup');
                    // console.log('print eventPopupModel values are ------ ', eventPopupModel);
                    eventPopupModel.style.display = 'block';
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

    entityFieldButton($this) {
        // const $this = this;
        $this.editor.TraitManager.addType('entityFieldButton', {
            events: {
                'click': function () {
                    console.log('traits button before if --- ', this.target.changed['entity']);
                    const traitEntity = this.target.changed['entity'];
                    if (traitEntity !== undefined
                        && traitEntity !== 'none') {
                        $this.isFieldPopupModal = true;
                        $this.EntityField.forEach(entityElement => {
                            console.log('entity component update 1--  ', entityElement);
                            console.log('entity component update 2--  ', traitEntity);
                            if (entityElement._id === traitEntity) {
                                $this.fields = entityElement.field.filter((el) => {
                                    return (el.name.toLowerCase() !== 'createdat' &&
                                        el.name.toLowerCase() !== 'updatedat');
                                });
                            }
                            console.log('entity component update fields 3--  ', $this.fields);

                        });
                        $this.ref.detectChanges();
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
                    colTraits.set('options', $this.columnOptions);
                    $this.editor.TraitManager.getTraitsViewer().render();
                    // console.log('sessionStorage count are ', count, ' --- ', { value: `col${count}_id`, name: `column_${count}` });
                    // const modal = <HTMLElement>document.querySelector('#agGridModal');
                    // console.log('ag Grid modal are ----- ', modal);
                    // if (selectedEntity !== undefined) {
                    //   // modal.style.display = 'block';
                    //   localDataService.setAgGridEntity(selectedEntity);
                    // }
                    // trigger when btn is clicked
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
                    columnDefs.pop();
                    console.log('removing grid options and value')
                    this.target.view.el.gridOptions.api.setColumnDefs(columnDefs);
                    this.target.view.el.gridOptions.api.sizeColumnsToFit();
                    $this.columnOptions.pop();
                    $this.agGridObject.default_field.pop();
                    $this.agGridObject.custom_field.pop();
                    $this.saveRemoteStorage();
                    const colTraits = this.target.get('traits').where({ name: 'columns' })[0];
                    colTraits.set('options', $this.columnOptions);
                    $this.editor.TraitManager.getTraitsViewer().render();
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
                    // const modal = <HTMLElement>document.querySelector('#agGridModal');
                    // if (selectedEntity !== undefined) {
                    //     // modal.style.display = 'block';
                    //     const constructObj = {
                    //         entity: selectedEntity,
                    //         defalutColumn: this.target.view.el.gridOptions.columnDefs,
                    //         customColumn: columnOptions
                    //     };
                    //     $this.dataService.setAgGridEntity(constructObj);
                    // }
                    // trigger when btn is clicked
                    let entityId = null;
                    if (this.target.changed['entity']) {
                        entityId = this.target.changed['entity'];
                    } else if (this.target.attributes.entity !== 'none') {
                        entityId = this.target.attributes.entity;
                    }
                    const entityFound = $this.EntityField.find(x => x._id === entityId);
                    if (entityFound) {
                        $this.selectedEntity = entityFound;
                        $this.allEntityField = entityFound.field;
                        $this.defaultColumn = this.target.view.el.gridOptions.columnDefs;
                        $this.isGridPopup = true;
                        $this.ref.detectChanges();
                    }
                    // $this.isGridPopup = true;
                    // $this.ref.detectChanges();
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
