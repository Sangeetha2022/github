import { Constant } from '../assets/Constant';
import * as util from 'util';
import { Common } from '../config/Common';
import * as path from 'path';

export class RouteWorker {

    /**
    * Constructing Microflows for Handlebars
    */
    private constructPayLoad() {
        const microflowObject = {
            GpHeaders: [],
            Gproutes: []
        }
        return microflowObject;
    }


    public generateRouteWorker(details: any, callback) {
        details = JSON.parse(JSON.stringify(details));
        details.desktop.forEach(async desktopElement => {
            const screenName = desktopElement.screenName.toLowerCase();
            const firstElement = screenName.charAt(0).toUpperCase();
            const otherElements = screenName.substring(1, screenName.length);
            const routerComponetName = `${firstElement}${otherElements}Component`
            let routePayload = this.constructPayLoad()
            const componentObject = {
                importName: routerComponetName,
                importPath: `./${screenName}.component`
            }
            const routingObject = {
                path : screenName ,
                component:routerComponetName
            }
            routePayload.GpHeaders.push(componentObject)
            routePayload.Gproutes.push(routingObject)
            const templatePath = path.resolve(__dirname, '../../templates/router.handlebars');
            const projectGenerationPath = details.projectGenerationPath;
            const applicationPath = projectGenerationPath + '/src/app';
            const screenGenerationPath = applicationPath + `/${screenName}`
            await Common.handleBarsFile(templatePath, routePayload, screenGenerationPath, `${screenName}.route.ts`);
    
        })
      
    }
   
}