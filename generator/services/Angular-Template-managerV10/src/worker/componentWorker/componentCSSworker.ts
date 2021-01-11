import { Common } from "../../config/Common";
import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";

const componentSupportWorker = new ComponentSupportWorker()
export class ComponentCssWorker  {

  public ComponentCssGeneration(filePath, htmlMetaData, fileName, callback) {
    Common.createFolders(filePath);
    const path = `${filePath}/${fileName}`
    componentSupportWorker.writeFile(path, htmlMetaData, (response) => {
        callback("Css file generated");
    })
}

}