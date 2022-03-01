import { Injectable } from '@angular/core';

@Injectable
({
  providedIn: 'root'
})

export class CustomTraitsService 
{
  constructor() { }
  entityinfo:any;
  content($this:any) 
  {
    $this.editor.TraitManager.addType('content', 
    {
        events: 
        {
            'keyup': 'onChange',  // trigger parent onChange method on keyup
        },
        getInputEl: function ()
        {
            if (!this.inputEl) 
            {
                const input = document.createElement('textarea');               
                input.value = this.target.get('content');
                this.inputEl = input;
            }
            return this.inputEl;
        },
        onValueChange: function () 
        {
            this.target.set('content', this.model.get('value'));
        }
    });  
  }

  entityFieldButton(screen_designer:any) 
  {
    let matchentity: any;
    screen_designer.editor.TraitManager.addType('entityFieldButton', 
    {
        getInputEl() 
        {
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
            button.onclick = () =>
            {
               /* this condition is used to get the entity info of the screen to bind the entity field 
               upon  selecting the html element in grapesjs*/
               if (screen_designer.existScreenDetail !== undefined && screen_designer.existScreenDetail !== null) 
               {
                    this.entityinfo = screen_designer.existScreenDetail[0]["entity_info"];
                    console.log(" this.entityinfo", this.entityinfo);
                    matchentity = this.entityinfo.find((x:any) => x.htmlId == this.target.attributes.attributes.id);
                    console.log("matchentity",matchentity);
                    
               }
               // previously the enity was bind using this way this.target.changed['entity'];
               const traitEntity = this.target.attributes.entity;
               console.log("traitEntity",traitEntity);
               if (traitEntity !== undefined && traitEntity !== 'none') 
               {
                        console.log("inside field");                        
                        screen_designer.isFieldPopupModal = true;
                        screen_designer.EntityField.forEach((entityElement:any) => 
                        {
                          if (entityElement._id === traitEntity) 
                          {
                            screen_designer.fields = entityElement.field.filter((el:any) => 
                            {
                                return (el.name.toLowerCase() !== 'createdat' && el.name.toLowerCase() !== 'updatedat');
                            });
                            /* This is where we find the field of the selected html template and bind it with ngModel
                            value for details refer #381 in github developer is Kishan 19May2020*/
                            if (matchentity !== undefined && matchentity !== null) 
                            {
                                screen_designer.entityFields.entityfieldname = matchentity.fields.name;
                                screen_designer.entityFields.entityId = matchentity.entityId;
                            } 
                            else 
                            {
                                screen_designer.entityFields.entityId = traitEntity;
                            }
                          }
                        });
                        screen_designer.ref.detectChanges();
               } 
               else 
               {
                   console.log('no entity selected');
               }
            };
            return button;
        }
    });
  }
  flowsActionButton(screen_designer:any) 
  {
     let rows: any;
     screen_designer.editor.TraitManager.addType('actionButton', 
     {
            getInputEl() 
            {
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
                button.onclick=()=>
                {
                    console.log('---------action button clicked here-------');
                    const element = screen_designer.screenFlows.filter((x:any) => x.elementName === this.target.attributes.name);
                    const eventPopupModel = document.getElementById('EventPopup');
                    if (element && element.length > 0) 
                    {
                        screen_designer.selectedFlowObj = screen_designer.listOfFLows.filter((x:any) => x._id === element[0].flow);
                        rows = screen_designer.gridApi.getCellRendererInstances();
                        Object.keys(rows).forEach(k => 
                        {
                           if (screen_designer.selectedFlowObj[0].name == rows[k].params.data.name) 
                           {
                               rows[k].params.eGridCell.children[0].checked = true;
                           } 
                           else 
                           {
                               rows[k].params.eGridCell.children[0].checked = false;
                           }
                        });
                    } 
                    else 
                    {
                        screen_designer.selectedFlowObj = null;
                    }
                    screen_designer.isLifeCycleRow = false;
                    eventPopupModel!.style.display = 'block';
                    screen_designer.ref.detectChanges();
                }
                return button;
            },
     });
  }

    async flowsModifierValueButton(screen_designer:any) 
    {
        let rows: any;
        // action button add
        screen_designer.editor.TraitManager.addType('valueButton', 
        {         
            getInputEl() 
            {
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
                button.onclick=async ()=>
                {
                    console.log('---------action button clicked here-------');
                    const oldElement = screen_designer.screenFlows.filter((x:any) => x.elementName === this.target.attributes.name);
                    let element: any = await this.getEntityDetails(screen_designer);
                    if (element && element.length > 0) 
                    {
                        element.forEach((entity: any) => 
                        {
                          if (entity.is_default === true) 
                          {
                            entity.field.forEach((data:any) => 
                            {
                                screen_designer.allEntityByProject.push(data);
                            });
                          }
                          else if (entity.feature_id === screen_designer.feature_id)
                          {
                            entity.field.forEach((data:any) => 
                            {
                                screen_designer.allEntityByProject.push(data);
                            });
                          }
                        });
                    }
                    screen_designer.tableRowData = screen_designer.allEntityByProject;
                    const eventPopupModel = document.getElementById('ProjectEventPopup');
                    if (element && element.length > 0) 
                    {
                        console.log('-------selectedflowobj------', screen_designer.selectedFlowObj);
                        /*Here we match the which of the flow is already been added in the screen flow info and make the checkbox 
                        checked for that row in ag-grid. For more details refer issue #381 in github developer is Kishan 21May2020 */
                        rows = screen_designer.gridApi_modifier.getCellRendererInstances();
                    } 
                    else 
                    {
                        screen_designer.selectedFlowObj = null;
                    }
                    screen_designer.isLifeCycleRow = false;
                    eventPopupModel!.style.display = 'block';
                    screen_designer.gridApi_modifier.deselectAll();
                    screen_designer.ref.detectChanges();
                }
                return button;
            },
            getEntityDetails(screen_designer:any) 
            {
                return new Promise(resolve => 
                {
                    screen_designer.projectComponentService.getEntityByProjectId(screen_designer.project_id, screen_designer.logId).subscribe((response:any) => 
                    {
                        resolve(response.body);
                    });
                })
            }
        });
    }

    gridFieldButton(screen_designer:any) 
    {
        screen_designer.editor.TraitManager.addType('fieldGridButton', 
        {
            getInputEl() 
            {
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
                button.onclick=()=>
                {
                          // trigger when btn is clicked
                          let entityId:any = null;
                          if (this.target.changed['entity']) 
                          {
                              entityId = this.target.changed['entity'];
                          } 
                          else if (this.target.attributes.entity !== 'none') 
                          {
                              entityId = this.target.attributes.entity;
                          }
                          const entityFound = screen_designer.EntityField.find((x:any) => x._id === entityId);
                          if (entityFound) 
                          {
                            screen_designer.agGridObject.entityId = entityId;
                            screen_designer.selectedEntity = entityFound;
                            screen_designer.allEntityField = entityFound.field;
                            screen_designer.defaultColumn = this.target.view.el.gridOptions.columnDefs;
                            screen_designer.isGridPopup = true;
                            screen_designer.ref.detectChanges();
                          }
                }
                return button;
            },
        });
    }

    RouteActionButton(screen_designer:any) 
    {
        // action button add
        screen_designer.editor.TraitManager.addType('routeButton', 
        {
            getInputEl() 
            {
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
                button.onclick=()=>
                {
                    screen_designer.customPopupModal.name = screen_designer.GPROUTE_FLOWNAME;
                    screen_designer.customPopupModal.title = 'Routes';
                    screen_designer.customPopupModal.dropdownLabelName = 'Screen';
                    screen_designer.customPopupModal.typeLabelName = 'Type';
                    screen_designer.isCustomPopup = true;
                    screen_designer.ref.detectChanges();
                }
                return button;
            },
        });
    }

    addGridRowButton(screen_designer:any) 
    {
        // add button
        screen_designer.editor.TraitManager.addType('addButton', 
        {
            getInputEl() 
            {
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
                button.onclick=()=>
                {
                    const component = screen_designer.editor.getSelected();
                    console.log("component",component);                    
                    const agGridObject = 
                    {
                        columnid: '',
                        columnname: '',
                        entity: '',
                        entityfield: ''
                    };
                    const count = screen_designer.agGridObject.default_field.length+1;
                    console.log("count",count);
                    const columnDefs = screen_designer.agGridObject.default_field;
                    const columnOptions=screen_designer.columnOptions;
                    console.log("columnDefs",columnDefs);
                    agGridObject.columnid = `col${count}_id`;
                    agGridObject.columnname = `column_${count}`;
                    columnDefs.push
                    ({
                        headerName: agGridObject.columnname,
                        field: screen_designer.columnOptions[0].name,
                        sortable: true,
                        colId: agGridObject.columnid,
                    });
                    console.log("columnDefs.push", columnDefs);
                    screen_designer.agGridObject.default_field=columnDefs;
                    screen_designer.agGridObject.custom_field.push(agGridObject);
                    console.log("Custom_field:",screen_designer.agGridObject.custom_field);
                    this.target.view.el.gridOptions.api.setColumnDefs(columnDefs);
                    this.target.view.el.gridOptions.api.sizeColumnsToFit();
                    columnOptions.push({ value: `col${count}_id`, name: `column_${count}` });
                    screen_designer.columnOptions=columnOptions;
                    console.log("Screen_designer.columnOptions:",screen_designer.columnOptions);
                    screen_designer.columnOptions.forEach((columnElement:any) =>
                    {
                                              columnDefs.forEach((columnEl:any)=>
                                              {
                                                if(columnElement.value===columnEl.colId)
                                                {
                                                      columnEl.headerName=columnElement.name;
                                                }
                                              });
                    }); 
                    const colTraits = this.target.get('traits').where({ name: 'columns' })[0];
                    screen_designer.saveRemoteStorage();
                    component.removeTrait('columns');
                    component.addTrait
                    ({
                            type: 'select',
                            label: 'Columns',
                            name: 'columns',
                            changeProp: 1,
                            options: screen_designer.columnOptions,
                    }, { at: 1 });                      
                 }
                return button;
            },
        });
    }

    removeGridRowButton(screen_designer:any) 
    {
        // remove button
        screen_designer.editor.TraitManager.addType('removeButton', 
        {    
            getInputEl() 
            {
                const button = <HTMLElement>document.createElement('button');
                button.id = 'removeButton';
                button.style.width = '100%';
                button.style.backgroundColor = 'rgba(186, 43, 0, 0.73)';
                button.style.border = 'none';
                button.style.color = 'white';
                button.style.fontSize = '16px';
                button.style.cursor = 'pointer';
                button.appendChild(document.createTextNode('-'));
                button.onclick=()=>
                {
                    const component = screen_designer.editor.getSelected();
                    const columnDefs = screen_designer.newColumnDefs;
                    if(screen_designer.selectedColumnId==='')
                    {
                        alert("Select a column to remove!");
                    }
                    if(columnDefs.length >=1 && screen_designer.selectedColumnId!='')
                    {
                        console.log("ColumnId to remove:",screen_designer.selectedColumnId);
                        columnDefs.forEach((element: { colId: any; },index: any)=>
                        {
                            if(element.colId===screen_designer.selectedColumnId)
                            {
                                columnDefs.splice(index,1);
                            }
                        });
                        this.target.view.el.gridOptions.api.setColumnDefs(columnDefs);
                        this.target.view.el.gridOptions.api.sizeColumnsToFit();
                        console.log("ColumnDefs after Delete:",screen_designer.newColumnDefs);
                        screen_designer.newColumnOptions.forEach((element: { value: any; },index: any)=>
                        {
                                if(element.value===screen_designer.selectedColumnId)
                                {
                                    screen_designer.newColumnOptions.splice(index,1);
                                }
                        });
                        console.log("screen_designer.columnOptions:",screen_designer.newColumnOptions);
                        screen_designer.agGridObject.default_field.pop();
                        screen_designer.agGridObject.custom_field.pop();
                        screen_designer.saveRemoteStorage();
                        component.removeTrait('columns');
                        component.addTrait
                        ({
                                type: 'select',
                                label: 'Columns',
                                name: 'columns',
                                changeProp: 1,
                                options: screen_designer.newColumnOptions,
                        }, { at: 1 });    
                        screen_designer.selectedColumnId='';
                    }               
                }
                return button;
            },
        });
    }

    MultiflowsActionButton(screen_designer:any) 
    {
        // action button add
        screen_designer.editor.TraitManager.addType('multiflowButton', 
        {
            getInputEl() 
            {
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
                button.onclick=()=>
                {
                    const element = screen_designer.screenFlows.filter((x:any) => x.elementName === this.target.attributes.name);
                    const eventPopupModel = document.getElementById('EventPopup');
                    if (element && element.length > 0) 
                    {
                        screen_designer.selectedFlowObj = screen_designer.listOfFLows.filter((x:any) => x._id === element[0].flow);
                    } 
                    else 
                    {
                        screen_designer.selectedFlowObj = null;
                    }
                    screen_designer.isLifeCycleRow = true;
                    eventPopupModel!.style.display = 'block';
                    screen_designer.gridApi.deselectAll();
                    screen_designer.ref.detectChanges();
                }
                return button;
            },
        });
    }

    popupLinkButton(screen_designer:any) 
    {
        // action button add
        screen_designer.editor.TraitManager.addType('linkButton', 
        {
            getInputEl() 
            {
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
                button.onclick=()=>
                {
                    screen_designer.isLinkPopup = true;
                    if (screen_designer.pageLinkObj.selectedEntity) 
                    {
                        const entityObj = screen_designer.entityData.find((x:any) => x._id === screen_designer.pageLinkObj.selectedEntity._id);
                        if (entityObj) 
                        {
                            screen_designer.pageLinkObj.entityField = entityObj.field;
                        }
                    }
                    screen_designer.ref.detectChanges();
                }
                return button;
            },
        });
    }
}
