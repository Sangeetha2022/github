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
        this.generateHeaderTs(generationPath, templateName, (res) => {
            callback();
        });
      })
    })

  }

  public footerComponetGeneration(generationPath, callback) {

    const applicationPath = generationPath + `/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}/${Constant.FOOTER_FOLDERNAME}`;
    const templatePath = path.resolve(__dirname, '../../../templates');
    const fileData = {
      GpOptions: {
        screenName: "footer",
        className: "FooterComponent"
      },
      GpHeaders: {
        importName: "FooterComponent",
        importPath: "./footer.component"
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
  public generateComponentTsFile(templatePath, fileData, applicationPath, fileName, callback) {
    componentSupportWorker.handleBarsFile(templatePath, fileData, applicationPath, fileName);
    callback("Component Ts file generated ")
  }


  public generateComponentSpcFile(templatePath, fileData, applicationPath, fileName, callback) {
    componentSupportWorker.handleBarsFile(templatePath, fileData, applicationPath, fileName);
    callback("Component spec file generated ")
  }
    private async generateHeaderTs(generationPath, templateName, callback) {
        const handlebarsObject = {
            GpOptions: { screenName: 'header', className: 'HeaderComponent' },
            GpCodeToAdd: { lifecycle_info: [] }
        };
        const templateGenerationPath = generationPath
            + Constant.SRC_FOLDERNAME + '/' + Constant.APP_FOLDERNAME + '/' + Constant.HEADER_FOLDERNAME;
        const templatePath = path.resolve(__dirname, '../../../templates/ComponentTs.handlebars');
        const fileName = 'header.component.ts';
        if (templateName === 'geppetto template') {
            handlebarsObject.GpCodeToAdd.lifecycle_info.push({ data: `this.userId = sessionStorage.getItem('Id');` });
        }
        await componentSupportWorker.handleBarsFile(templatePath, handlebarsObject, templateGenerationPath, fileName);
        callback('Header Ts file generated');
    }
}
