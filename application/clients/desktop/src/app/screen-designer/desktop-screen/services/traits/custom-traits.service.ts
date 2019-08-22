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
                    // console.log('print button clicked');
                    const eventPopupModel = document.getElementById('EventPopup');
                    // console.log('print eventPopupModel values are ------ ', eventPopupModel);
                    $this.isGridEvent = false;
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

    gridActionFlowButton($this) {
        // action button add
        $this.editor.TraitManager.addType('gridActionButton', {
            events: {
                'click': function () {
                    // console.log('print button clicked');
                    const eventPopupModel = document.getElementById('EventPopup');
                    // console.log('print eventPopupModel values are ------ ', eventPopupModel);
                    $this.isGridEvent = true;
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
                    if (this.target.changed['entity'] !== undefined
                        && this.target.changed['entity'] !== 'none') {
                        $this.isFieldPopupModal = true;
                        $this.ref.detectChanges();
                        console.log('traits button after if --- ', $this.isFieldPopupModal);
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

    addGridRowButton(editor, columnOptions) {
        // add button
        editor.TraitManager.addType('addButton', {
            events: {
                'click': function () {
                    const count = this.target.view.el.gridOptions.columnDefs.length + 1;
                    const columnDefs = this.target.view.el.gridOptions.columnDefs;
                    columnDefs.push({
                        headerName: `column_${count}`,
                        field: 'a',
                        sortable: true,
                        colId: `col${count}_id`
                    });
                    this.target.view.el.gridOptions.api.setColumnDefs(columnDefs);
                    this.target.view.el.gridOptions.api.sizeColumnsToFit();
                    columnOptions.push({ value: `col${count}_id`, name: `column_${count}` });
                    const colTraits = this.target.get('traits').where({ name: 'columns' })[0];
                    colTraits.set('options', columnOptions);
                    editor.TraitManager.getTraitsViewer().render();
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

    removeGridRowButton(editor, columnOptions) {
        // remove button
        editor.TraitManager.addType('removeButton', {
            events: {
                'click': function () {
                    const columnDefs = this.target.view.el.gridOptions.columnDefs;
                    columnDefs.pop();
                    this.target.view.el.gridOptions.api.setColumnDefs(columnDefs);
                    this.target.view.el.gridOptions.api.sizeColumnsToFit();
                    columnOptions.pop();
                    const colTraits = this.target.get('traits').where({ name: 'columns' })[0];
                    console.log('llist of columnOptions ra e-11--- ', columnOptions);
                    console.log('llist of colTraits ra e--22-- ', colTraits);
                    colTraits.set('options', columnOptions);
                    editor.TraitManager.getTraitsViewer().render();
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
                    console.log('on entity triats changed ----  ', this.target.changed['entity']);
                    console.log('on entity columnDefs changed ----  ', this.target.view.el.gridOptions.columnDefs);
                    console.log('EntityField of data are -$this----  ', $this);
                    console.log('EntityField of data are -$this.columnOptions----  ', $this.columnOptions);
                    // console.log('columns target changed are ', this.target.get('columns'));
                    console.log('this.traits where are 11 ', this);
                    // console.log('this.traits where are 22 ', this.target.find('traits'));
                    console.log('agGridArray are 33 ', $this.agGridArray);
                    console.log('this.traits where are 44 ', this.target.changed['entity']);
                    console.log('this.traits where are 55 ', this.target.attributes.entity);
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
                        console.log('traits button after if --- ', $this.isGridPopup);
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
