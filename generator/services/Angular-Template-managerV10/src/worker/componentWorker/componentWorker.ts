import { Constant } from "../../config/Constant";
import * as path from 'path';
import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";

const componentSupportWorker = new ComponentSupportWorker()
export class ComponentWorker {

  public generateComponent(generationPath, callback) {

    this.templateComponetGeneration(generationPath, (res) => {
      this.footerComponetGeneration(generationPath, (res) => {
        callback();
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
    this.generateComponentTsFile(`${templatePath}/ComponentTs.handlebars`, fileData, applicationPath, 'footer.component.ts', (res) => {
      this.generateComponentSpcFile(`${templatePath}/ComponentSpec.handlebars`, fileData, applicationPath, 'footer.component.spec.ts', (res) => {
        this.generateComponentModuleFile(`${templatePath}/ComponentModule.handlebars`, footerModule, applicationPath, 'footer.module.ts', (res) => {
          callback("Footer component generated");
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
        className: `${Constant.TEMPLATE_FOLDERNAME.charAt(0).toUpperCase()}Component`
      },
      GpHeaders: {
        importName: `${Constant.TEMPLATE_FOLDERNAME.charAt(0).toUpperCase()}Component`,
        importPath: `./${Constant.TEMPLATE_FOLDERNAME}.component`
      }
    }
    const footerModule = Constant.FooterModule
    this.generateComponentTsFile(`${templatePath}/ComponentTs.handlebars`, fileData, applicationPath, `${Constant.TEMPLATE_FOLDERNAME}.component.ts`, (res) => {
      this.generateComponentSpcFile(`${templatePath}/ComponentSpec.handlebars`, fileData, applicationPath, `${Constant.TEMPLATE_FOLDERNAME}.component.spec.ts`, (res) => {
        this.generateComponentModuleFile(`${templatePath}/ComponentModule.handlebars`, footerModule, applicationPath, `${Constant.TEMPLATE_FOLDERNAME}.module.ts`, (res) => {
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

  //Generate component Module file
  public generateComponentModuleFile(templatePath, fileData, applicationPath, fileName, callback) {
    componentSupportWorker.handleBarsFile(templatePath, fileData, applicationPath, fileName);
    callback("Component Ts file generated ")
  }

  public generateComponentSpcFile(templatePath, fileData, applicationPath, fileName, callback) {
    componentSupportWorker.handleBarsFile(templatePath, fileData, applicationPath, fileName);
    callback("Component spec file generated ")
  }

}
