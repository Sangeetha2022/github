import { Constant } from "../../config/Constant";
import * as path from 'path';
import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";
import { ComponentModuleWorker } from "./componentModuleWorker";

const componentSupportWorker = new ComponentSupportWorker()
const componentModuleWorker = new ComponentModuleWorker()
export class ComponentWorker {

  public generateComponent(generationPath, templateName, callback) {
    this.templateComponetGeneration(generationPath, (res) => {
      this.footerComponetGeneration(generationPath, (res) => {
        this.headerComponentGeneration(generationPath, templateName, (res) => {
          this.generateAppComponentTsHtml(generationPath, (res) => {
            callback();
          });
        });
      });
    });
  }

  async generateAppComponentTsHtml(generationPath, callback) {
    const applicationPath = generationPath + `/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
    const templatePath = path.resolve(__dirname, '../../../templates');
    componentSupportWorker.handleBarsFile(templatePath + '/' + Constant.APP_COMPONENT_TS_HANDLEBARS, {}, applicationPath, Constant.APP_COMPONENT_TS).then(tsData => {
      componentSupportWorker.handleBarsFile(templatePath + '/' + Constant.APP_COMPONENT_HTML_HANDLEBARS, {}, applicationPath, Constant.APP_COMPONENT_HTML).then(htmlData => {
        callback();
      });
    });
  }
  public footerComponetGeneration(generationPath, callback) {
    const applicationPath = generationPath + `/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}/${Constant.FOOTER_FOLDERNAME}`;
    const templatePath = path.resolve(__dirname, '../../../templates');
    const fileData = {
      GpOptions: {
        screenName: "footer",
        className: "FooterComponent"
      }
    }
    const footerModule = Constant.FooterModule
    this.generateComponentTsFile(`${templatePath}/${Constant.COMPONENT_TS_HANDELBARS}`, fileData, applicationPath, Constant.FOOTER_TS_FILENAME, (res) => {
      this.generateComponentSpcFile(`${templatePath}/${Constant.COMPONENT_SPEC_HANDELBARS}`, fileData, applicationPath, Constant.FOOTER_SPEC_FILENAME, (res) => {
        componentModuleWorker.generateComponentModuleFile(`${templatePath}/${Constant.COMPONENT_MODULE_HANDELBARS}`, footerModule, applicationPath, Constant.FOOTER_MODULE_FILENAME, (res) => {
          callback("Footer component generated")
        })
      })
    })
  }

  public templateComponetGeneration(generationPath, callback) {
    const applicationPath = generationPath + `/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}/${Constant.TEMPLATE_FOLDERNAME}`;
    const templatePath = path.resolve(__dirname, '../../../templates');
    const fileData = {
      GpOptions: {
        screenName: Constant.TEMPLATE_FOLDERNAME,
        className: `${Constant.TEMPLATE_FOLDERNAME.charAt(0).toUpperCase() + Constant.TEMPLATE_FOLDERNAME.slice(1).toLowerCase()}Component`
      },
      GpHeaders: {
        importName: `${Constant.TEMPLATE_FOLDERNAME.charAt(0).toUpperCase() + Constant.TEMPLATE_FOLDERNAME.slice(1).toLowerCase()}Component`,
        importPath: `./${Constant.TEMPLATE_FOLDERNAME}.component`
      }
    }

    const tsFileData = {
      GpOptions: {
        screenName: Constant.TEMPLATE_FOLDERNAME,
        className: `${Constant.TEMPLATE_FOLDERNAME.charAt(0).toUpperCase() + Constant.TEMPLATE_FOLDERNAME.slice(1).toLowerCase()}Component`
      }
    }
    const templateModule = Constant.TemplateModule;
    this.generateComponentTsFile(`${templatePath}/ComponentTs.handlebars`, tsFileData, applicationPath, `${Constant.TEMPLATE_FOLDERNAME}.component.ts`, (res) => {
      this.generateComponentSpcFile(`${templatePath}/ComponentSpec.handlebars`, fileData, applicationPath, `${Constant.TEMPLATE_FOLDERNAME}.component.spec.ts`, (res) => {
        componentModuleWorker.generateComponentModuleFile(`${templatePath}/ComponentModule.handlebars`, templateModule, applicationPath, `${Constant.TEMPLATE_FOLDERNAME}.module.ts`, (res) => {
          callback("template component generated");
        })
      })
    })
  }

  //Generate component Ts file
  public async generateComponentTsFile(templatePath, fileData, applicationPath, fileName, callback) {
    await componentSupportWorker.handleBarsFile(templatePath, fileData, applicationPath, fileName);
    callback("Component Ts file generated ")
  }


  public async generateComponentSpcFile(templatePath, fileData, applicationPath, fileName, callback) {
    await componentSupportWorker.handleBarsFile(templatePath, fileData, applicationPath, fileName);
    callback("Component spec file generated ")
  }
    private async headerComponentGeneration(generationPath, templateName, callback) {
        const tsFileData = {
            GpOptions: { screenName: Constant.HEADER_FOLDERNAME, className: `${Constant.HEADER_FOLDERNAME.charAt(0).toUpperCase() + Constant.HEADER_FOLDERNAME.slice(1).toLowerCase()}Component` },
            GpCodeToAdd: { lifecycle_info: [] }
        };
        const specFileData = {
            GpHeaders: {
                importName: `${Constant.HEADER_FOLDERNAME.charAt(0).toUpperCase() + Constant.HEADER_FOLDERNAME.slice(1).toLowerCase()}Component`,
                importPath: `./${Constant.HEADER_FOLDERNAME}.component`
            }
        }
        const templateGenerationPath = generationPath + '/'
            + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.HEADER_FOLDERNAME;
        const templatePath = path.resolve(__dirname, '../../../templates');
        const fileName = `${Constant.HEADER_FOLDERNAME}.component.ts`;
        if (templateName === 'geppetto template') {
            tsFileData.GpCodeToAdd.lifecycle_info.push({ data: `this.userId = sessionStorage.getItem('Id');` });
        }
        const moduleFileData = Constant.HeaderModule
        this.generateComponentTsFile(templatePath + '/ComponentTs.handlebars', tsFileData, templateGenerationPath, `${Constant.HEADER_FOLDERNAME}.component.ts`, (res) => {
            this.generateComponentSpcFile(templatePath + '/ComponentSpec.handlebars', specFileData, templateGenerationPath, `${Constant.HEADER_FOLDERNAME}.component.spec.ts`, (res) => {
                componentModuleWorker.generateComponentModuleFile(`${templatePath}/ComponentModule.handlebars`, moduleFileData, templateGenerationPath, `${Constant.HEADER_FOLDERNAME}.module.ts`, (res) => {
                    callback("Header Component Generated");
                });
            });
        });
    }
}
