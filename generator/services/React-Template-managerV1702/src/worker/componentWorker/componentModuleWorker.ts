import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";

const componentSupportWorker = new ComponentSupportWorker();
export class ComponentModuleWorker {
    //Generate component Module file
    public generateComponentModuleFile(templatePath, fileData, applicationPath, fileName, callback) {
      componentSupportWorker.handleBarsFile(templatePath, fileData, applicationPath, fileName);
      callback("Component Ts file generated ")
    }
}