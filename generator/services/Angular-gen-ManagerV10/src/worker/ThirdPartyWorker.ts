import { Constant } from "../config/Constant";
import { agGridComponents } from "../config/componentDependency";

export class ThirdPartyWorker {

    constructAgGridComponents(desktopElement: any, microflowObject: any) {
        microflowObject.GpOptions['is_grid_present'] = desktopElement.is_grid_present;
        if (desktopElement.is_grid_present && desktopElement.is_grid_present == true) {
            microflowObject.GpOptions['grid_components'] = agGridComponents.join('\n \t');
            if (desktopElement.grid_fields) {
                const columnDefs = [];
                desktopElement.grid_fields.custom_field.forEach((element: any) => {
                    columnDefs.push({ key1: 'headerName', value1: element.columnname, key2: 'field', value2: element.entityfield });
                });
                microflowObject.GpOptions.arrayVariables.push({
                    name: 'columnDefs',
                    dataType: 'any',
                    value: columnDefs
                });
            }
        }
        return microflowObject;
    }

    constructThirdPartyComponents(desktopElement, microflowObject) {
        const gjs_components = JSON.parse(desktopElement['gjs-components'][0]);
        if(gjs_components && gjs_components.length > 0) {
            gjs_components.forEach((gjs_element)=> {
                if(gjs_element.components && gjs_element.components.length > 0) {
                    gjs_element.components.forEach((gjs_component_element) => {
                        // Dynamic Dropdown
                        if(gjs_component_element.tagName && gjs_component_element.type && gjs_component_element.tagName === 'select' && gjs_component_element.type === 'dynamicdropdown-type') {
                            microflowObject.GpOptions.arrayVariables.push({name: 'itemArray', dataType: 'any', value: []});
                            return microflowObject;
                        }
                        // CKEditor
                        if(gjs_component_element.type && gjs_component_element.type === 'ckeditor5') {
                            microflowObject['GpHeadersStarAs'] = [];
                            microflowObject['GpHeadersStarAs'].push({importName: Constant.CLASSIC_EDITOR, importPath: Constant.CLASSIC_EDITOR_PATH});
                            microflowObject.GpOptions.variables.push({name: Constant.CLASSIC_EDITOR_VARIABLE, dataType: 'any', value: Constant.CLASSIC_EDITOR_VALUE});
                            return microflowObject;
                        }
                    });
                }
                // Special Dropdown
                if(gjs_element.type && gjs_element.type === 'specialdropdown-type') {
                    const components = gjs_element.components;
                    if(components && components.length > 0) {
                        components.forEach((element: any) => {
                            if(element.tagName && element.tagName === 'select') {
                                const selectComponents = element.components;
                                if(selectComponents && selectComponents.length > 0) {
                                    const columnDefs = [];
                                    selectComponents.forEach((selectComponentsElement: any) => {
                                        columnDefs.push({ key1: 'key', value1: selectComponentsElement.content, key2: 'value', value2: selectComponentsElement.attributes.value });
                                    });
                                    microflowObject.GpOptions.arrayVariables.push({
                                        name: selectComponents[0].tagName,
                                        dataType: 'any',
                                        value: columnDefs
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
        return microflowObject;
    }

    constructThirdPartyModuleHeaders(desktopElement, microflowObject) {
        const gjs_components = JSON.parse(desktopElement['gjs-components'][0]);
        if(gjs_components && gjs_components.length > 0) {
            gjs_components.forEach((gjs_element)=> {
                if(gjs_element.components && gjs_element.components.length > 0) {
                    gjs_element.components.forEach((gjs_component_element) => {
                        if(gjs_component_element.tagName && gjs_component_element.type && gjs_component_element.tagName === 'select' && gjs_component_element.type === 'dynamicdropdown-type') {
                            microflowObject.GpHeaders.push({importName: Constant.NG_SELECT_MODULE, importPath: Constant.NG_SELECT_MODULE_PATH});
                            microflowObject.GpOptions.modules.push({name: Constant.NG_SELECT_MODULE});
                            return microflowObject;
                        }
                        if(gjs_component_element.type && gjs_component_element.type === 'ckeditor5') {
                            microflowObject.GpHeaders.push({importName: Constant.CK_EDITOR_MODULE, importPath: Constant.CK_EDITOR_MODULE_PATH});
                            microflowObject.GpOptions.modules.push({name: Constant.CK_EDITOR_MODULE});
                            return microflowObject;
                        }
                    });
                }
            });
        }
        return microflowObject;
    }
    // private GRID_HTML = [];

    // private GRID_CLICK_HTML = {
    //     htmlOptionName: 'selectionChanged',
    //     htmlMethodName: 'onSelectionChanged',
    //     htmlParams: '$event'
    // }
    // private GRID_SINGLE_CLICK = [{
    //     htmlOptionName: 'rowSelection',
    //     htmlVariableName: 'rowSelection',
    //     componentVariable: 'rowSelection',
    //     componentVariableOption: 'single',
    //     gridOptionType: 'variable'
    // }];
    // checkSpecialElement($this, IDName) {


    //     // check ckeditor span tag
    //     if (IDName === Constant.CKEDITOR_SPAN_IDNAME) {
    //         $this.isCKeditorSpan = true;
    //     }

    //     // checking and add the ckeditor5
    //     if ($this.tagName == Constant.TEXTAREA_TAGNAME && IDName === Constant.CKEDITOR_HTMLID_NAME) {
    //         console.log('entering into change textarea into ckeditor5 --- ', $this.startString);
    //         $this.startString = $this.startString.replace($this.tagName.toString(), Constant.CKEDITOR_TAGNAME);
    //         const findckeditorDependencies = componentDependency.component.find(x => x.name == Constant.CKEDITOR_TAGNAME);
    //         this.removeClassName($this, 'textarea');
    //         if (findckeditorDependencies) {
    //             $this.startString = $this.startString.replace('>', ` ${findckeditorDependencies.htmlDependencies.join(' ')}>`);
    //             $this.tagName = Constant.CKEDITOR_TAGNAME;

    //             // adding ckeditor5 in tscomponent dependencies
    //             $this.tsComponent.otherMethodNames.push(Constant.CKEDITOR_TAGNAME);
    //         }
    //     }

    //     // check and add ag-grid
    //     if ($this.screenInfo.is_grid_present && IDName === Constant.AGGRID_HTMLID_NAME) {
    //         // let findAgGridDependencies;
    //         const findAgGridDependencies = componentDependency.component.find(x => x.name == Constant.AGGRID_TAGNAME);
    //         const flow_arr = $this.screenInfo.flows_info;
    //         if (findAgGridDependencies) {
    //             if (this.isGridVariable()) {
    //                 flow_arr.forEach(flowobj => {
    //                     console.log('----------flowobj--------', flowobj.flowName);
    //                     const flowname = flowobj.flowName
    //                 if(flowname !== 'GpGetAllValues'){
    //                     findAgGridDependencies.htmlDependencies.splice(findAgGridDependencies.htmlDependencies.length - 1, 0, this.GRID_HTML.join(' '));
    //                 }
    //                 else{
    //                     findAgGridDependencies.htmlDependencies;
    //                 }
    //             });

    //             }
    //             $this.startString = `<${Constant.AGGRID_TAGNAME} ${findAgGridDependencies.htmlDependencies.join(' ')}>`;
    //             console.log('befroe set grid html are ---- ', $this.screenInfo.flows_info, ' --join---  ', this.GRID_HTML.join(' '));

    //             // destroy the attached html variables
    //             if (this.isGridVariable()) {
    //                 findAgGridDependencies.htmlDependencies.splice(findAgGridDependencies.htmlDependencies.indexOf(this.GRID_HTML.join(' ')), 1);
    //             }
    //             $this.tagName = Constant.AGGRID_TAGNAME;

    //             // adding ag-grid in tscomponent dependencies
    //             $this.tsComponent.otherMethodNames.push(Constant.AGGRID_TAGNAME);

    //             // grid columns
    //             this.setGridColumnDefs($this, findAgGridDependencies)

    //             // add depended method
    //             const gridMethod = findAgGridDependencies.componentDependedMethod.find(x => x.name == Constant.GRID_READY_METHODNAME);
    //             if (gridMethod && !$this.tsComponent.elementDependedMethod.find(x => x === gridMethod)) {
    //                 $this.tsComponent.elementDependedMethod.push(gridMethod.method);
    //             }


    //             // adding its style into global component styles
    //             if (findAgGridDependencies.styles) {
    //                 $this.globalStyle.import = $this.globalStyle.import.concat(findAgGridDependencies.styles);
    //                 console.log('added ag grid styles are -----  ', $this.globalStyle);
    //             }

    //         }
    //     }
    // }

    // setGridColumnDefs($this, findAgGridDependencies) {
    //     let variableTemp = '';
    //     const isEventModal = $this.screenInfo['special-events'].some(x => x.type === Constant.GP_MODAL_POPUP);
    //     console.log('isEvent modsal present -----  ', isEventModal);
    //     variableTemp = `${findAgGridDependencies.componentDynamicVariable.columnDefName} = [\n`;
    //     if ($this.screenInfo.grid_fields.custom_field.length > 0) {
    //         $this.screenInfo.grid_fields.custom_field.forEach((customField, index) => {
    //             variableTemp += `{headerName: '${customField.columnname}', field: '${customField.entityfield}'}`
    //             if (index !== $this.screenInfo.grid_fields.custom_field.length - 1) {
    //                 variableTemp += `,\n`;
    //             }
    //         })
    //     } else {
    //         let findPrimaryEntity;
    //         findPrimaryEntity = $this.entities.find(x => x.entity_type === Constant.PRIMARY_NAME);
    //         if (findPrimaryEntity) {
    //             findPrimaryEntity.field.forEach((fieldElement, index) => {
    //                 variableTemp += `{headerName: '${fieldElement.name}', field: '${fieldElement.name}'}`
    //                 if (index !== findPrimaryEntity.field.length) {
    //                     variableTemp += `,\n`;
    //                 }
    //             })
    //         }
    //     }
    //     variableTemp += `]`;
    //     console.log('---------grid variable list---------', variableTemp);
    //     $this.tsComponent.variableList.push(variableTemp);
    // }

    // checkTagAttributes($this, element) {
    //     const tagName = $this.tagNameFunction(element);
    //     if (
    //         element.attributes && (element.attributes.id == Constant.CKEDITOR_SPAN_IDNAME ||
    //             element.attributes.id == Constant.AGGRID_HTMLID_NAME)) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    // isGridVariable() {
    //     if (this.GRID_HTML.length > 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // checkAGGridAction($this, routeObj) {
    //     this.GRID_HTML = [];
    //     const html = `(${this.GRID_CLICK_HTML.htmlOptionName})="${this.GRID_CLICK_HTML.htmlMethodName}(${this.GRID_CLICK_HTML.htmlParams})"`;
    //     this.GRID_HTML.push(html);
    //     const findAgGridDependencies = componentDependency.component.find(x => x.name == Constant.AGGRID_TAGNAME);
    //     console.log('--------findAdGridDependencies-----', html);
    //     const aggridevent = $this.screenInfo.grid_fields.event;
    //     if (findAgGridDependencies) {
    //         // if (aggridevent == 'Rowclick'){
    //             let tempMethod = `${this.GRID_CLICK_HTML.htmlMethodName}(event) {`;
    //             tempMethod += `\n  const selectedRows = this.${findAgGridDependencies.componentDynamicVariable.gridApiName}.getSelectedRows();`;
    //             tempMethod += `\n  this.${routeObj.methodName}(selectedRows[0]._id);`;
    //             tempMethod += `\n}`;
    //             $this.tsComponent.elementDependedMethod.push(tempMethod);
    //         // }

    //     }
    // }

    // // css guidelines

    // // add class based on guideline rules
    // addClassName($this, cssTypes) {
    //     // additional
    //     const cssGuides = $this.cssGuidelines.find(x => x.tagName == $this.tagName);
    //     if (cssGuides) {
    //         if (cssTypes == 'class') {
    //             return cssGuides.className;
    //         }
    //     } else {
    //         return null;
    //     }
    // }

    // // remove class based on guideline rules
    // removeClassName($this, removeTagName) {
    //     const temp = $this.cssGuidelines.find(x => x.tagName == removeTagName);
    //     if (temp) {
    //         $this.startString = $this.startString.replace(temp.className, '');
    //     }
    // }

    // // link info
    // setLinkContent($this) {

    //     if ($this.linkContentInfo.linkInfo) {
    //         console.log('entering into link if')
    //         const linkInfo = $this.linkContentInfo.linkInfo;
    //         if (linkInfo.entity.id) {
    //             let linkTemp = '';
    //             $this.startTag.push(`<${Constant.NGCONTAINER_TAGNAME} *ngFor="let ${linkInfo.entity.name} of ${linkInfo.entity.name}${Constant.LIST_VARIABLE}">`);
    //             $this.startString = $this.startString.replace($this.tagName.toString(), Constant.DIV_TAGNAME);

    //             if (linkInfo.internalURL.screenId) {
    //                 linkTemp = ` [routerLink]="['/${linkInfo.internalURL.screenName}']"`;
    //                 let queryTemp = '';
    //                 if (linkInfo.paramArray.length > 0) {
    //                     // add the queryparams in html
    //                     linkInfo.paramArray.forEach((element, index) => {
    //                         queryTemp += `${element.name}: ${element.fieldName}`;
    //                         if (linkInfo.paramArray.length - 1 !== index) {
    //                             queryTemp += `,`;
    //                         }
    //                     })
    //                 }
    //                 linkTemp += this.setLinkQueryParams($this, linkInfo);
    //             }
    //             if (linkInfo.externalURL) {
    //                 linkTemp = ` href="${linkInfo.externalURL}"`;
    //             }
    //             if (linkTemp) {
    //                 $this.startString = $this.startString.replace(/>.*/g, `${linkTemp}>`);
    //             } else {
    //                 $this.startString = $this.startString.replace(/>.*/g, `>`);
    //             }
    //             // push startString
    //             $this.setTagValue();
    //             // dynamic content
    //             $this.startTag.push(`<${Constant.SPAN_TAGNAME}>{{${linkInfo.entity.name}.${linkInfo.entity.fieldName}}}</${Constant.SPAN_TAGNAME}>`);
    //             // ng container end tag
    //             $this.startTag.push(`</${Constant.DIV_TAGNAME}>`);
    //             // ng container end tag
    //             $this.startTag.push(`</${Constant.NGCONTAINER_TAGNAME}>`);
    //         }

    //         // link content
    //         $this.linkContentInfo = {
    //             contentArray: [],
    //             isNgContentPresent: false,
    //             linkInfo: null
    //         }
    //     }
    // }

    // setLinkQueryParams($this, linkInfo) {
    //     const temp = {
    //         screenId: '',
    //         screenName: '',
    //         paramType: '',
    //         params: []
    //     }
    //     if (linkInfo.internalURL.screenId) {
    //         temp.screenId = linkInfo.internalURL.screenId;
    //         temp.screenName = linkInfo.internalURL.screenName;
    //     }
    //     temp.paramType = linkInfo.paramType;
    //     temp.params = linkInfo.paramArray;
    //     if (!$this.linkedScreenInfo.find(x => x.screenId === temp.screenId)) {
    //         $this.linkedScreenInfo.push(temp);
    //     }
    //     let linkTemp = '';
    //     switch (linkInfo.paramType.toLowerCase()) {
    //         case 'queryparameter':
    //             linkTemp += ` [queryParams]="{`;
    //             linkInfo.paramArray.forEach((element, index) => {
    //                 if (linkInfo.isDynamic) {
    //                     linkTemp += ` ${element.name}: ${linkInfo.entity.name}.${element.fieldName}`;
    //                 } else {
    //                     linkTemp += ` ${element.name}: ${element.fieldName}`;
    //                 }
    //                 if (index !== linkInfo.paramArray.length - 1) {
    //                     linkTemp += `,`;
    //                 }
    //             });
    //             linkTemp += ` }"`;
    //             return linkTemp;
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // setSpecialEvents($this) {
    //     if ($this.screenInfo['special-events'].length > 0) {
    //         $this.screenInfo['special-events'].forEach(elementObj => {
    //             switch (elementObj.type) {
    //                 case Constant.MODAL_SPECIALEVENT_NAME:
    //                     const modalDependencies = componentDependency.component.find(x => x.name === Constant.GP_MODAL_POPUP);
    //                     this.specialEventHtml(elementObj, modalDependencies, $this);
    //                     this.specialEventTsFile(elementObj, modalDependencies, $this);
    //                     this.specialEventModule(elementObj, modalDependencies, $this);
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         });
    //     }
    // }

    // specialEventHtml(elementObj, modalDependencies, $this) {
    //     console.log('specilaevent htlm values are ----  ', $this.startString);
    //     const tagName = `app-${elementObj.screenName}`;
    //     let temp = `<${tagName}`;
    //     temp += ` ${modalDependencies.htmlDependencies.join(' ')}>`;
    //     temp += `</${tagName}>`;
    //     $this.startTag.push(temp);
    // }

    // specialEventTsFile(elementObj, modalDependencies, $this) {
    //     // variable list
    //     $this.tsComponent.variableList.push(modalDependencies.componentVariableList.join(' '));
    //     // component methods
    //     console.log('eeeeeeeeeeeeee elementobj are --11111---  ', elementObj)
    //     console.log('eeeeeeeeeeeeee elementobj are --222222222---  ', elementObj.modal.bindInfo);
    //     console.log('eeeeeeeeeeeeee modalDependencies are --33333---  ', modalDependencies)
    //     console.log('eeeeeeeeeeeeee modalDependencies are --4444---  ', $this.entityDetails);
    //     console.log('eeeeeeeeeeeeee tscomponent are --55555---  ', $this.tsComponent);
    //     let successMethod = `${modalDependencies.componentDynamicVariable.popupDataName}(${modalDependencies.componentDynamicVariable.eventName})`;
    //     successMethod += `\n {`;
    //     elementObj.modal.bindInfo.forEach(element => {
    //         const screenEntity = $this.entityDetails.find(x => x.elementName === element.componentName);
    //         console.log('each temp values are ---- ', screenEntity);
    //         if (screenEntity) {
    //             const entityInfo = $this.entities.find(x => x._id === screenEntity.entityId);
    //             console.log('entityInfo afater temp are ---------   ', entityInfo);
    //             if (entityInfo) {
    //                 const entityFieldInfo = entityInfo.field.find(x => x._id === screenEntity.fields.fieldId);
    //                 if (entityFieldInfo) {
    //                     if (element.componentType === 'input') {
    //                         successMethod += `\n this.${entityInfo.name}.${entityFieldInfo.name} = ${modalDependencies.componentDynamicVariable.eventName}.${Constant.POPUP_DATA_VARIABLENAME}.${element.fieldName};`;
    //                     } else if (element.componentType === 'select') {
    //                         successMethod += `\n this.${Constant.SELECT_TS_OPTION_VARIABLENAME} = [{`;
    //                         successMethod += `\n\t ${Constant.SELECT_KEY_VARIABLENAME}: ${modalDependencies.componentDynamicVariable.eventName}.${Constant.POPUP_DATA_VARIABLENAME}.${element.fieldName}, ${Constant.SELECT_VALUE_VARIABLENAME}: ${modalDependencies.componentDynamicVariable.eventName}.${Constant.POPUP_DATA_VARIABLENAME}.${element.fieldName}`;
    //                         successMethod += `\n }]`;
    //                     }
    //                 }
    //             }
    //         }
    //     })
    //     successMethod += `\n this.${modalDependencies.componentDynamicVariable.popupModalName} = ${modalDependencies.componentDynamicVariable.eventName}.${modalDependencies.componentDynamicVariable.popupModalName};`;
    //     successMethod += `\n }`;

    //     let cancelMethod = `${modalDependencies.componentDynamicVariable.cancelPopupName}(${modalDependencies.componentDynamicVariable.eventName})`;
    //     cancelMethod += `\n {`;
    //     cancelMethod += `\n this.${modalDependencies.componentDynamicVariable.popupModalName} = ${modalDependencies.componentDynamicVariable.eventName};`;
    //     cancelMethod += `\n }`;
    //     // success method
    //     $this.tsComponent.elementDependedMethod.push(successMethod);
    //     // cancel method
    //     $this.tsComponent.elementDependedMethod.push(cancelMethod);
    // }

    // specialEventModule(elementObj, modalDependencies, $this) {
    //     $this.moduleComponent.importDependency.push({ dependencyName: `${elementObj.screenName.charAt(0).toUpperCase()}${elementObj.screenName.slice(1).toLowerCase()}Module`, dependencyPath: `../${elementObj.screenName.toLowerCase()}/${elementObj.screenName.toLowerCase()}.module` });
    //     $this.moduleComponent.imports.push(`${elementObj.screenName.charAt(0).toUpperCase()}${elementObj.screenName.slice(1).toLowerCase()}Module`);
    // }

}