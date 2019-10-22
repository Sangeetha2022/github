import { Constant } from "../config/Constant";
import * as componentDependency from '../assets/componentDependency';

export class ComponentSpecializedWorker {

    private GRID_HTML = [];

    private GRID_CLICK_HTML = {
        htmlOptionName: 'selectionChanged',
        htmlMethodName: 'onSelectionChanged',
        htmlParams: '$event'
    }
    private GRID_SINGLE_CLICK = [{
        htmlOptionName: 'rowSelection',
        htmlVariableName: 'rowSelection',
        componentVariable: 'rowSelection',
        componentVariableOption: 'single',
        gridOptionType: 'variable'
    }];
    checkSpecialElement($this) {


        // check ckeditor span tag
        if ($this.startString.includes(Constant.CKEDITOR_SPAN_IDNAME)) {
            $this.isCKeditorSpan = true;
        }

        // checking and add the ckeditor5
        if ($this.tagName == Constant.TEXTAREA_TAGNAME && $this.startString.includes(Constant.CKEDITOR_HTMLID_NAME)) {
            console.log('entering into change textarea into ckeditor5 --- ', $this.startString);
            $this.startString = $this.startString.replace($this.tagName.toString(), Constant.CKEDITOR_TAGNAME);
            const findckeditorDependencies = componentDependency.component.find(x => x.name == Constant.CKEDITOR_TAGNAME);
            this.removeClassName($this, 'textarea');
            if (findckeditorDependencies) {
                $this.startString = $this.startString.replace('>', ` ${findckeditorDependencies.htmlDependencies.join(' ')}>`);
                $this.tagName = Constant.CKEDITOR_TAGNAME;

                // adding ckeditor5 in tscomponent dependencies
                $this.tsComponent.otherMethodNames.push(Constant.CKEDITOR_TAGNAME);
            }
        }

        // check and add ag-grid
        if ($this.screenInfo.is_grid_present && $this.startString.includes(Constant.AGGRID_HTMLID_NAME)) {
            // let findAgGridDependencies;
            const findAgGridDependencies = componentDependency.component.find(x => x.name == Constant.AGGRID_TAGNAME);
            if (findAgGridDependencies) {
                console.log('befroe set grid html are ---- ', this.GRID_HTML, ' --join---  ', this.GRID_HTML.join(' '));
                if (this.isGridVariable()) {
                    findAgGridDependencies.htmlDependencies.splice(findAgGridDependencies.htmlDependencies.length - 1, 0, this.GRID_HTML.join(' '));
                }
                $this.startString = `<${Constant.AGGRID_TAGNAME} ${findAgGridDependencies.htmlDependencies.join(' ')}>`;

                // destroy the attached html variables
                if (this.isGridVariable()) {
                    findAgGridDependencies.htmlDependencies.splice(findAgGridDependencies.htmlDependencies.indexOf(this.GRID_HTML.join(' ')), 1);
                }
                $this.tagName = Constant.AGGRID_TAGNAME;

                // adding ag-grid in tscomponent dependencies
                $this.tsComponent.otherMethodNames.push(Constant.AGGRID_TAGNAME);

                // grid columns
                this.setGridColumnDefs($this, findAgGridDependencies)

                // add depended method
                const gridMethod = findAgGridDependencies.componentDependedMethod.find(x => x.name == Constant.GRID_READY_METHODNAME);
                if (gridMethod && !$this.tsComponent.elementDependedMethod.find(x => x === gridMethod)) {
                    $this.tsComponent.elementDependedMethod.push(gridMethod.method);
                }


                // adding its style into global component styles
                if (findAgGridDependencies.styles) {
                    $this.globalStyle.import = $this.globalStyle.import.concat(findAgGridDependencies.styles);
                    console.log('added ag grid styles are -----  ', $this.globalStyle);
                }

            }
        }
    }

    setGridColumnDefs($this, findAgGridDependencies) {
        let variableTemp = '';
        const isEventModal = $this.screenInfo['special-events'].some(x => x.type === Constant.GP_MODAL_POPUP);
        console.log('isEvent modsal present -----  ', isEventModal);
        variableTemp = `${findAgGridDependencies.componentDynamicVariable.columnDefName} = [\n`;
        if ($this.screenInfo.grid_fields.custom_field.length > 0) {
            $this.screenInfo.grid_fields.custom_field.forEach((customField, index) => {
                variableTemp += `{headerName: '${customField.columnname}', field: '${customField.entityfield}'}`
                if (index !== $this.screenInfo.grid_fields.custom_field.length - 1) {
                    variableTemp += `,\n`;
                }
            })
        } else {
            let findPrimaryEntity;
            findPrimaryEntity = $this.entities.find(x => x.entity_type === Constant.PRIMARY_NAME);
            if (findPrimaryEntity) {
                findPrimaryEntity.field.forEach((fieldElement, index) => {
                    variableTemp += `{headerName: '${fieldElement.name}', field: '${fieldElement.name}'}`
                    if (index !== findPrimaryEntity.field.length) {
                        variableTemp += `,\n`;
                    }
                })
            }
        }
        variableTemp += `]`;
        $this.tsComponent.variableList.push(variableTemp);
    }

    checkTagAttributes($this, element) {
        const tagName = $this.tagNameFunction(element);
        if (
            element.attributes && (element.attributes.id == Constant.CKEDITOR_SPAN_IDNAME ||
                element.attributes.id == Constant.AGGRID_HTMLID_NAME)) {
            return false;
        } else {
            return true;
        }
    }

    isGridVariable() {
        if (this.GRID_HTML.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    checkAGGridAction($this, routeObj) {
        this.GRID_HTML = [];
        const html = `(${this.GRID_CLICK_HTML.htmlOptionName})="${this.GRID_CLICK_HTML.htmlMethodName}(${this.GRID_CLICK_HTML.htmlParams})"`;
        this.GRID_HTML.push(html);
        const findAgGridDependencies = componentDependency.component.find(x => x.name == Constant.AGGRID_TAGNAME);
        if (findAgGridDependencies) {
            let tempMethod = `${this.GRID_CLICK_HTML.htmlMethodName}() {`;
            tempMethod += `\n  const selectedRows = this.${findAgGridDependencies.componentDynamicVariable.gridApiName}.getSelectedRows();`;
            tempMethod += `\n  this.${routeObj.methodName}(selectedRows[0]._id);`;
            tempMethod += `\n}`;
            $this.tsComponent.elementDependedMethod.push(tempMethod);
        }
        // will work for grid selection = single
        // this.GRID_SINGLE_CLICK.forEach(element => {
        //     console.log('swith $this are ---- ', $this);
        //     switch (element.gridOptionType) {
        //         case 'variable':
        //             const htmlTemp = `[${element.htmlOptionName}]="${element.htmlVariableName}"`;
        //             if (!this.GRID_HTML.find(x => x == htmlTemp)) {
        //                 this.GRID_HTML.push(htmlTemp);
        //             }
        //             const variableTemp = `${element.componentVariable} = '${element.componentVariableOption}'`;
        //             $this.tsComponent.variableList.push(variableTemp);
        //             break;
        //         default:
        //             break;
        //     }
        // })
    }

    // css guidelines

    // add class based on guideline rules
    addClassName($this, cssTypes) {
        // additional
        const cssGuides = $this.cssGuidelines.find(x => x.tagName == $this.tagName);
        if (cssGuides) {
            if (cssTypes == 'class') {
                return cssGuides.className;
            }
        } else {
            return null;
        }
        // if (this.tagName == 'form') {
        //     return 'form';
        // }
        // if (this.tagName == 'input') {
        //     return `form-control`;
        // }
        // if (this.tagName == 'select') {
        //     return `form-control`;
        // }
        // if (this.tagName == 'textarea') {
        //     return `form-control`;
        // }
        // if (this.tagName == 'button') {
        //     return `btn btn-primary`;
        // }
    }

    // remove class based on guideline rules
    removeClassName($this, removeTagName) {
        const temp = $this.cssGuidelines.find(x => x.tagName == removeTagName);
        if (temp) {
            $this.startString = $this.startString.replace(temp.className, '');
        }
    }

    // link info
    setLinkContent($this) {

        if ($this.linkContentInfo.linkInfo) {
            console.log('entering into link if')
            const linkInfo = $this.linkContentInfo.linkInfo;
            if (linkInfo.entity.id) {
                let linkTemp = '';
                $this.startTag.push(`<${Constant.NGCONTAINER_TAGNAME} *ngFor="let ${linkInfo.entity.name} of ${linkInfo.entity.name}${Constant.LIST_VARIABLE}">`);
                $this.startString = $this.startString.replace($this.tagName.toString(), Constant.DIV_TAGNAME);

                if (linkInfo.internalURL.screenId) {
                    linkTemp = ` [routerLink]="['/${linkInfo.internalURL.screenName}']"`;
                    let queryTemp = '';
                    if (linkInfo.paramArray.length > 0) {
                        // add the queryparams in html
                        linkInfo.paramArray.forEach((element, index) => {
                            queryTemp += `${element.name}: ${element.fieldName}`;
                            if (linkInfo.paramArray.length - 1 !== index) {
                                queryTemp += `,`;
                            }
                        })
                    }
                    linkTemp += this.setLinkQueryParams($this, linkInfo);
                }
                if (linkInfo.externalURL) {
                    linkTemp = ` href="${linkInfo.externalURL}"`;
                }
                if (linkTemp) {
                    $this.startString = $this.startString.replace(/>.*/g, `${linkTemp}>`);
                } else {
                    $this.startString = $this.startString.replace(/>.*/g, `>`);
                }
                // push startString
                $this.setTagValue();
                // dynamic content
                $this.startTag.push(`<${Constant.SPAN_TAGNAME}>{{${linkInfo.entity.name}.${linkInfo.entity.fieldName}}}</${Constant.SPAN_TAGNAME}>`);
                // ng container end tag
                $this.startTag.push(`</${Constant.DIV_TAGNAME}>`);
                // ng container end tag
                $this.startTag.push(`</${Constant.NGCONTAINER_TAGNAME}>`);
                //     `<ng-container *ngFor="let data of categoryData; let i=index">
                //     <div class="row textFont" [routerLink]="['/fred3']"  [queryParams]="{value: data.id}">
                //       <h4>{{data.name}}</h4>
                //     </div>
                //    </ng-container>`
            }

            // link content
            $this.linkContentInfo = {
                contentArray: [],
                isNgContentPresent: false,
                linkInfo: null
            }
        }
    }

    setLinkQueryParams($this, linkInfo) {
        const temp = {
            screenId: '',
            screenName: '',
            paramType: '',
            params: []
        }
        if (linkInfo.internalURL.screenId) {
            temp.screenId = linkInfo.internalURL.screenId;
            temp.screenName = linkInfo.internalURL.screenName;
        }
        temp.paramType = linkInfo.paramType;
        temp.params = linkInfo.paramArray;
        if (!$this.linkedScreenInfo.find(x => x.screenId === temp.screenId)) {
            $this.linkedScreenInfo.push(temp);
        }
        let linkTemp = '';
        switch (linkInfo.paramType.toLowerCase()) {
            case 'queryparameter':
                linkTemp += ` [queryParams]="{`;
                linkInfo.paramArray.forEach((element, index) => {
                    if(linkInfo.isDynamic) {
                    linkTemp += ` ${element.name}: ${linkInfo.entity.name}.${element.fieldName}`;                        
                    } else {
                    linkTemp += ` ${element.name}: ${element.fieldName}`;
                    }
                    if (index !== linkInfo.paramArray.length - 1) {
                        linkTemp += `,`;
                    }
                });
                linkTemp += ` }"`;
                return linkTemp;
                break;
            default:
                break;
        }
    }

    setSpecialEvents($this) {
        if ($this.screenInfo['special-events'].length > 0) {
            $this.screenInfo['special-events'].forEach(elementObj => {
                switch (elementObj.type) {
                    case Constant.MODAL_SPECIALEVENT_NAME:
                        const modalDependencies = componentDependency.component.find(x => x.name === Constant.GP_MODAL_POPUP);
                        this.specialEventHtml(elementObj, modalDependencies, $this);
                        this.specialEventTsFile(elementObj, modalDependencies, $this);
                        this.specialEventModule(elementObj, modalDependencies, $this);
                        break;
                    default:
                        break;
                }
            });
        }
    }

    specialEventHtml(elementObj, modalDependencies, $this) {
        console.log('specilaevent htlm values are ----  ', $this.startString);
        const tagName = `app-${elementObj.screenName}`;
        let temp = `<${tagName}`;
        temp += ` ${modalDependencies.htmlDependencies.join(' ')}>`;
        temp += `</${tagName}>`;
        $this.startTag.push(temp);
    }

    specialEventTsFile(elementObj, modalDependencies, $this) {
        // variable list
        $this.tsComponent.variableList.push(modalDependencies.componentVariableList.join(' '));
        // component methods
        console.log('eeeeeeeeeeeeee elementobj are --11111---  ', elementObj)
        console.log('eeeeeeeeeeeeee elementobj are --222222222---  ', elementObj.modal.bindInfo);
        console.log('eeeeeeeeeeeeee modalDependencies are --33333---  ', modalDependencies)
        console.log('eeeeeeeeeeeeee modalDependencies are --4444---  ', $this.entityDetails);
        console.log('eeeeeeeeeeeeee tscomponent are --55555---  ', $this.tsComponent);
        let successMethod = `${modalDependencies.componentDynamicVariable.popupDataName}(${modalDependencies.componentDynamicVariable.eventName})`;
        successMethod += `\n {`;
        elementObj.modal.bindInfo.forEach(element => {
            const screenEntity = $this.entityDetails.find(x => x.elementName === element.componentName);
            console.log('each temp values are ---- ', screenEntity);
            if (screenEntity) {
                const entityInfo = $this.entities.find(x => x._id === screenEntity.entityId);
                console.log('entityInfo afater temp are ---------   ', entityInfo);
                if (entityInfo) {
                    const entityFieldInfo = entityInfo.field.find(x => x._id === screenEntity.fields.fieldId);
                    if (entityFieldInfo) {
                        if (element.componentType === 'input') {
                            successMethod += `\n this.${entityInfo.name}.${entityFieldInfo.name} = ${modalDependencies.componentDynamicVariable.eventName}.${Constant.POPUP_DATA_VARIABLENAME}.${element.fieldName};`;
                        } else if (element.componentType === 'select') {
                            successMethod += `\n this.${Constant.SELECT_TS_OPTION_VARIABLENAME} = [{`;
                            successMethod += `\n\t ${Constant.SELECT_KEY_VARIABLENAME}: ${modalDependencies.componentDynamicVariable.eventName}.${Constant.POPUP_DATA_VARIABLENAME}.${element.fieldName}, ${Constant.SELECT_VALUE_VARIABLENAME}: ${modalDependencies.componentDynamicVariable.eventName}.${Constant.POPUP_DATA_VARIABLENAME}.${element.fieldName}`;
                            successMethod += `\n }]`;
                        }
                    }
                }
            }
        })
        successMethod += `\n this.${modalDependencies.componentDynamicVariable.popupModalName} = ${modalDependencies.componentDynamicVariable.eventName}.${modalDependencies.componentDynamicVariable.popupModalName};`;
        successMethod += `\n }`;

        let cancelMethod = `${modalDependencies.componentDynamicVariable.cancelPopupName}(${modalDependencies.componentDynamicVariable.eventName})`;
        cancelMethod += `\n {`;
        cancelMethod += `\n this.${modalDependencies.componentDynamicVariable.popupModalName} = ${modalDependencies.componentDynamicVariable.eventName};`;
        cancelMethod += `\n }`;
        // success method
        $this.tsComponent.elementDependedMethod.push(successMethod);
        // cancel method
        $this.tsComponent.elementDependedMethod.push(cancelMethod);
        // const methods = modalDependencies.componentDependedMethod.filter(x =>
        //     x.name !== modalDependencies.componentDynamicVariable.submitMethodName &&
        //     x.name !== modalDependencies.componentDynamicVariable.cancelMethodName)
        // const temp = methods.map(({ method }) => method);
        // $this.tsComponent.elementDependedMethod.push(temp.join('\n'));
    }

    specialEventModule(elementObj, modalDependencies, $this) {
        $this.moduleComponent.importDependency.push({ dependencyName: `${elementObj.screenName.charAt(0).toUpperCase()}${elementObj.screenName.slice(1).toLowerCase()}Module`, dependencyPath: `../${elementObj.screenName.toLowerCase()}/${elementObj.screenName.toLowerCase()}.module` });
        $this.moduleComponent.imports.push(`${elementObj.screenName.charAt(0).toUpperCase()}${elementObj.screenName.slice(1).toLowerCase()}Module`);
    }

}