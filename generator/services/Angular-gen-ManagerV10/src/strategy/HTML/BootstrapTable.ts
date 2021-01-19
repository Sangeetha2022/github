import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { response } from 'express';
import { couldStartTrivia } from 'typescript';
import * as path from 'path';
import { Common } from '../../config/Common';
import { Constant } from "../../config/Constant";
import * as componentDependency from '../../config/componentDependency';
export class BootstrapTable {

    private BT_CLICK_HTML = {
        htmlOptionName: 'onSelectionChanged',
        htmlMethodName: '(click)',
        htmlParams: 'values'
    }

    private BOOTSTRAP = {
        values: ''
    }

    async BootstrapTableHTMLGeneration(bootstrap_table, screenData, details, callback) {
        let rowclick_present = false;

        this.BOOTSTRAP = {
            values: ''
        }

        // rowclick
        if (screenData.grid_fields.event == "Rowclick" && (screenData.route_info.find(i => i.routeType === 'queryParameter'))) {
            let bootstraptable_Data = `${this.BT_CLICK_HTML.htmlMethodName}="${this.BT_CLICK_HTML.htmlOptionName}(${this.BT_CLICK_HTML.htmlParams})"`;
            this.BOOTSTRAP.values += bootstraptable_Data
            rowclick_present = true
        }

        if (bootstrap_table.components !== undefined) {
            const findAgGridDependencies = componentDependency.component.find(x => x.name == Constant.BOOTSTRAP_TAGNAME);
            findAgGridDependencies.htmlDependencies.forEach((BOOTSTRAP_TAGNAME, index) => {
                this.BOOTSTRAP.values += BOOTSTRAP_TAGNAME.toString();
                if (BOOTSTRAP_TAGNAME.length - 1 == index) {
                } else {
                    this.BOOTSTRAP.values += ` `;
                }
            })
        };
        let rowclick = screenData.grid_fields.event
        let routeType = screenData.route_info.find(i => i.routeType === 'queryParameter')
        var screenName = screenData.screenName;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';

        var fileData = {
            component_class: bootstrap_table.attributes.id,
            component_name: bootstrap_table.name,
            screenName: screenName,
            custom_field: screenData.grid_fields.custom_field,
            rowclick_data: this.BOOTSTRAP.values,
            rowclick_present: rowclick_present
        }


        let templatePath = path.resolve(__dirname, './template');
        let filePath = templatePath + `/bootstrap-type.handlebars`;
        let screenGenerationPath = applicationPath + `/${screenName}`
        let result: any = await this.handleBarsFile(filePath, fileData, screenGenerationPath, screenName)
        callback(result);
    }

    handleBarsFile(filePath, fileData, screenGenerationPath, screenName) {
        Handlebars.registerHelper('surroundWithCurlyBraces1', function (text) {
            var result = '{{' + text + '}}';
            return new Handlebars.SafeString(result);
        });
        Handlebars.registerHelper('surroundWithCurlyBraces', function (text) {
            var result = '{{' + 'values.' + text + '}}';
            return new Handlebars.SafeString(result);
        });
        Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        });
        return new Promise(resolve => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                var source = data;
                var template = Handlebars.compile(source);
                var result = template(fileData);
                resolve(result);

            });
        })
    }
}