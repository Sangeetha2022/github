import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { response } from 'express';
import { couldStartTrivia } from 'typescript';
import * as path from 'path';
import { Common } from '../../config/Common';
import { Constant } from "../../config/Constant";
import * as componentDependency from '../../config/componentDependency';


export class AgGrid {
    
    private AG_GRID = {
        values: ''
    }

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

    async agGridTableHTMLGeneration(AgGriddata, screenData, details, callback) {
        this.AG_GRID.values = '';
        let flowName = '';
        const findAgGridDependencies = componentDependency.component.find(x => x.name == Constant.AGGRID_TAGNAME);
        if (AgGriddata.components !== undefined) {
            findAgGridDependencies.htmlDependencies.forEach((ag_grid_angular, index) => {
                this.AG_GRID.values += ag_grid_angular.toString();
                if (ag_grid_angular.length - 1 == index) {
                } else {
                    this.AG_GRID.values += ` `;
                }
            })
        };

        if(screenData.grid_fields.event=='Rowclick'){
            console.log("Here events rowclick is present--->>>")
           let gridData = `(${this.GRID_CLICK_HTML.htmlOptionName})="${this.GRID_CLICK_HTML.htmlMethodName}(${this.GRID_CLICK_HTML.htmlParams})"`;
            this.AG_GRID.values += gridData
        }

        if (AgGriddata.components !== undefined) {
            screenData.flows_info.forEach(element => {
                if (AgGriddata.name === element.elementName) {
                    flowName = element.flowName
                }
            });
        }

        var screenName = screenData.screenName;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';

        var fileData = {
            component_class: AgGriddata.attributes.id,
            component_name: AgGriddata.name,
            screenName: screenName,
            Flowname: flowName,
            GRID_HTML: this.AG_GRID.values
        }

        let templatePath = path.resolve(__dirname, './template');
        let filePath = templatePath + `/${AgGriddata.type}.handlebars`;
        let screenGenerationPath = applicationPath + `/${screenName}`
        let result: any = await this.handleBarsFile(filePath, fileData, screenGenerationPath, screenName);
        callback(result);
    }

    handleBarsFile(filePath, fileData, screenGenerationPath, screenName) {
        return new Promise(resolve => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                var source = data;
                Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
                    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
                });
                var template = Handlebars.compile(source);
                console.log("template for the aggrid handlebars----", template)
                var result = template(fileData);
                console.log("template for the grid componetne----", result)
                resolve(result);
            });
        })
    }
}

