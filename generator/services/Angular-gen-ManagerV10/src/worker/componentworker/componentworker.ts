import { Constant } from "../../assets/Constant";
import * as util from 'util';


export class ComponentWorker {
    generateComponent(componentName, details, callback) {
        // console.log('generate component are ---- ', util.inspect(details, { showHidden: true, depth: null }));
        // console.log('html tag result in generate component are -----  ', this.startTag);
        // console.log('generate service component are -----  ', this.serviceComponent);
        console.log('generatecomponent name in generatehtmlworkers are -----  ', this.tsComponent);
        const applicationPath = `${details.projectGenerationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        const packagePath = details.projectGenerationPath;
        const templatePath = details.templateLocation.frontendTemplate;
        this.checkRoutes(applicationPath, templatePath);
        popupModal.checkPopupModal();
        thirdPartyWorker.setSpecialEvents(this);
        componentWorker.generateComponentService(applicationPath, templatePath, componentName, this.serviceComponent, (response) => {
            componentWorker.generateComponentTs(applicationPath, templatePath, componentName, this.tsComponent, this.entities, (response) => {
                componentWorker.generateComponentHtml(applicationPath, templatePath, componentName, this.startTag, (response) => {
                    console.log('before calling generatecomponentcss from generatehtlm -----  ', this.componentStyle);
                    componentWorker.generateComponentCss(applicationPath, templatePath, componentName, this.componentStyle, (response) => {
                        componentWorker.generateComponentSpec(applicationPath, templatePath, componentName, this.startTag, (response) => {
                            componentWorker.generateComponentModule(applicationPath, templatePath, componentName, this.moduleComponent,  (response) => {
                                // console.log('component worker in generate component modeule in-----  ');
                                // this.modifyDependency(applicationPath, packagePath, callback)
                                callback();
                            })
                        })
                    })
                })
            })
        })
    }

}