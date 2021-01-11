import { Constant } from "../../config/Constant";
import * as path from 'path';
import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";

const componentSupportWorker = new ComponentSupportWorker()
export class ComponentWorker {

  public generateComponent(generationPath, callback) {

    this.footerComponetGeneration(generationPath , (res) => {

    })

  }

  public footerComponetGeneration(generationPath , callback) {

    const applicationPath = generationPath + `/${Constant.SRC_FOLDERNAME}/${Constant.FOOTER_FOLDERNAME}`;
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
      this.generateComponentSpcFile(`${templatePath}/ComponentSpec.handlebars`, fileData, applicationPath, 'footer.component.spec.ts' , (res) => {
        this.generateComponentModuleFile(`${templatePath}/ComponentModule.handlebars`, footerModule, applicationPath, 'footer.module.ts', (res) => {
          callback("Footer component generated")
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
