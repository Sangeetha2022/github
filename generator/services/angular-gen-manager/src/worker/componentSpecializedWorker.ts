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

        // checking and add the ckeditor5
        // console.log('each tagname are -----  ', $this.tagName);
        // console.log('each startString are -----  ', $this.startString);
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
            const findAgGridDependencies = componentDependency.component.find(x => x.name == Constant.AGGRID_TAGNAME);
            if (findAgGridDependencies) {
                console.log('befroe set grid html are ---- ', this.GRID_HTML, ' --join---  ', this.GRID_HTML.join(' '));
                if (this.GRID_HTML.length > 0) {
                    findAgGridDependencies.htmlDependencies.splice(findAgGridDependencies.htmlDependencies.length - 1, 0, this.GRID_HTML.join(' '));
                    console.log('findckedeid --findAgGridDependencies--  ', findAgGridDependencies.htmlDependencies);
                }
                $this.startString = `<${Constant.AGGRID_TAGNAME} ${findAgGridDependencies.htmlDependencies.join(' ')}>`;
                $this.tagName = Constant.AGGRID_TAGNAME;

                // adding ag-grid in tscomponent dependencies
                $this.tsComponent.otherMethodNames.push(Constant.AGGRID_TAGNAME);
                let variableTemp = '';

                // add depended method
                const gridMethod = findAgGridDependencies.componentDependedMethod.find(x => x.name == Constant.GRID_READY_METHODNAME);
                if (gridMethod && !$this.tsComponent.elementDependedMethod.find(x => x === gridMethod)) {
                    $this.tsComponent.elementDependedMethod.push(gridMethod.method);
                }
                variableTemp = `${findAgGridDependencies.componentDynamicVariable.columnDefName} = [\n`;
                if ($this.screenInfo.grid_fields.custom_field.length > 0) {
                    $this.screenInfo.grid_fields.custom_field.forEach((customField, index) => {
                        variableTemp += `{headerName: '${customField.columnname}', field: '${customField.entityfield}'}`
                        if (index !== $this.screenInfo.grid_fields.custom_field.length - 1) {
                            variableTemp += `,\n`;
                        }
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

                // adding its style into global component styles
                if (findAgGridDependencies.styles) {
                    $this.globalStyle.import = $this.globalStyle.import.concat(findAgGridDependencies.styles);
                    console.log('added ag grid styles are -----  ', $this.globalStyle);
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
        this.GRID_SINGLE_CLICK.forEach(element => {
            console.log('swith $this are ---- ', $this);
            switch (element.gridOptionType) {
                case 'variable':
                    const htmlTemp = `[${element.htmlOptionName}]="${element.htmlVariableName}"`;
                    if (!this.GRID_HTML.find(x => x == htmlTemp)) {
                        this.GRID_HTML.push(htmlTemp);
                    }
                    const variableTemp = `${element.componentVariable} = '${element.componentVariableOption}'`;
                    $this.tsComponent.variableList.push(variableTemp);
                    break;
                default:
                    break;
            }
        })
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