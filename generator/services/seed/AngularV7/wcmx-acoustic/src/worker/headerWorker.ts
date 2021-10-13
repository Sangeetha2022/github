import { AcousticSupportWorker } from "../supportworker/acousticSupportWorker";
import { Constant } from "../assets/constant";
import { AcousticEndPointService } from "../config/constants";
import { AcousticDao } from '../dao/acousticdao';

export class HeaderWorker {
    private acousticSupportworker = new AcousticSupportWorker();
    public acousticdao = new AcousticDao();

    async modifyHeader(applicationPath, pageRoute) {
        const headerPath = `${Constant.APPLICATION_PATH}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}/${Constant.HEADER_FOLDERNAME}`;
        const componentName = `${Constant.HEADER_FOLDERNAME}.${Constant.COMPONENT_EXTENSION}.${Constant.HTML_EXTENSION}`;
        const file = this.acousticSupportworker.readFile(headerPath, componentName);
        // console.log('----------header file content--------', file);
        const tempRegex = new RegExp(`</${Constant.HTML_LIST_TAG}>`);
        const index = file.lastIndexOf('        </li>');
        // let menuresponse = await this.MenuList();
        if (index > -1 && pageRoute && pageRoute.length > 0) {
            pageRoute.forEach(element => {
                const eleRegex = new RegExp(element.value);
                let routestring = eleRegex.toString().slice(1, -1);
                console.log('exits------>>>,', eleRegex)
                if (file.findIndex(x => eleRegex.test(x)) < 0) {
                    let link = ` <${Constant.HTML_LIST_TAG} class='nav-item'>\n`;
                     link += `  <${Constant.HTML_ANCHOR_TAG}  class='nav-link' [routerLink]="['/${routestring}']">${routestring}</${Constant.HTML_ANCHOR_TAG}>\n`;
                    // link += `  <${Constant.HTML_ANCHOR_TAG}  class="text" (click)="routernavigate('${routestring}')">${routestring}</${Constant.HTML_ANCHOR_TAG}>\n`;
                    link += ` </${Constant.HTML_LIST_TAG}>`;
                    file.splice(index + 1, 0, link);
                }
            })

            this.acousticSupportworker.writeStaticFile(headerPath, componentName,
                file.join(`\n`), (response) => { })
        }
    }


}