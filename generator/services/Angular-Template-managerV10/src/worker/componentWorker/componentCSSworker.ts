import { Common } from "../../config/Common";
import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";
import { CommonWorker } from '../commonWorker/commonWorker';
import { GeppettoLanding } from '../../strategy/HTML/geppetto_template/GeppettoLanding';
import { Constant } from '../../config/Constant'

const componentSupportWorker = new ComponentSupportWorker();
const commonWorker = new CommonWorker();
export class ComponentCssWorker {

    public ComponentCssGeneration(filePath, htmlMetaData, fileName, callback) {
        Common.createFolders(filePath);
        const path = `${filePath}/${fileName}`
        componentSupportWorker.writeFile(path, htmlMetaData, (response) => {
            callback("Css file generated");
        })
    }

}