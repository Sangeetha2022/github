import { Constant } from "../config/Constant";
import * as componentDependency from '../assets/componentDependency';

export class ComponentSpecializedWorker {

    checkSpecialElement($this) {
        // checking and add the ckeditor5
        console.log('each tagname are -----  ', $this.tagName);
        console.log('each startString are -----  ', $this.startString);
        if ($this.tagName == Constant.TEXTAREA_TAGNAME && $this.startString.includes(Constant.CKEDITOR_HTMLID_NAME)) {
            console.log('entering into change textarea into ckeditor5 --- ', $this.startString);
            $this.startString = $this.startString.replace($this.tagName.toString(), Constant.CKEDITOR_TAGNAME);
            const findckeditorDependencies = componentDependency.component.find(x => x.name == Constant.CKEDITOR_TAGNAME);
            this.removeClassName($this, 'textarea');
            if (findckeditorDependencies) {
                $this.startString = $this.startString.replace('>', ` ${findckeditorDependencies.htmlDependencies.join(' ')}>`);
            }
            $this.tagName = Constant.CKEDITOR_TAGNAME;
            // adding ckeditor5 in tscomponent dependencies
            $this.tsComponent.otherMethodNames.push(Constant.CKEDITOR_TAGNAME);
        }

        if ($this.screenInfo.is_grid_present && $this.startString.includes(Constant.AGGRID_HTMLID_NAME)) {
            const findAgGridDependencies = componentDependency.component.find(x => x.name == Constant.AGGRID_TAGNAME);
            if (findAgGridDependencies) {
                // let temp = '';
                // Array(findAgGridDependencies.htmlDependencies).forEach((htmlElement) => {
                //     temp += htmlElement;
                // })
                $this.startString = `<${Constant.AGGRID_TAGNAME} ${findAgGridDependencies.htmlDependencies.join(' ')}>`;
                $this.tagName = Constant.AGGRID_TAGNAME;
                // adding ag-grid in tscomponent dependencies
                $this.tsComponent.otherMethodNames.push(Constant.AGGRID_TAGNAME);
                let variableTemp = '';
                // add depended method
                const gridMethod = findAgGridDependencies.componentDependedMethod.find(x => x.name == Constant.GRID_READY_METHODNAME);
                if (gridMethod && !$this.tsComponent.elementDependedMethod.find(x => gridMethod)) {
                    $this.tsComponent.elementDependedMethod.push(gridMethod.method);
                }
                // customFields for columnDefs
                console.log('aggird screenInfo gridFiles are --- ', $this.screenInfo.grid_fields);
                console.log('aggird screenInfo custom_field are --- ', $this.screenInfo.grid_fields.custom_field);
                // if (this.screenInfo.grid_fields && this.screenInfo.grid_fields.custom_field) {
                variableTemp = `${findAgGridDependencies.componentDynamicVariable.columnDefName} = [\n`;
                if ($this.screenInfo.grid_fields.custom_field.length > 0) {
                    $this.screenInfo.grid_fields.custom_field.forEach((customField, index) => {
                        variableTemp += `{headerName: '${customField.columnname}', field: '${customField.entityfield}'}`
                        if (index !== $this.screenInfo.grid_fields.custom_field.length - 1) {
                            variableTemp += `,\n`;
                        }
                        // temp.headerName = customField.columnname;
                        // temp.field = customField.entityfield;

                    })
                } else {
                    const findPrimaryEntity = $this.entities.find(x => x.entity_type === Constant.PRIMARY_NAME);
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
                // }
                // adding its style into global component styles
                if (findAgGridDependencies.styles) {
                    $this.globalStyle.import = $this.globalStyle.import.concat(findAgGridDependencies.styles);
                }

            }
        }
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

}