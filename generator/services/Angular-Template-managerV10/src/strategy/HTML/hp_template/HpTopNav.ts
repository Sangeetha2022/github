import { HPHeader } from "./HPHeader";

export class HpTopNav {
    /**
     * 
     * @param body 
     * Generate TopNav
     */
    generateTopNav(menuList) {
        let link = '';
        if (menuList && menuList.length > 0) {
            link += `<ul id='template-iyj9x'>\n`;
            menuList.forEach(element => {
                element.menuDetails.forEach(menuelement => {
                    menuelement.featuremenu.forEach(featurename => {
                        if (featurename.name.feature != 'default') {    
                            link += `<li class="nav-item dropdown" *ngIf='userId'>`;
                            link += `<a class="nav-link dropdown-toggle" data-toggle="dropdown">${featurename.name.feature}</a>`;
                            link += `<div class="dropdown-menu">`;
                            menuelement.screenmenu.forEach(screenname => {
                                screenname.name.screen.forEach(menuname => {
                                    link += `<a class="dropdown-item" *ngIf="isApplicable('${menuname.toLowerCase()}') && userId" [routerLink]="['/${menuname.toLowerCase()}']">{{'source.${menuname}' | i18next}}</a>`;
                                });
                            });
                            link += `</div>`;
                            link += `</li>`;
                        } else {
                            menuelement.screenmenu.forEach(screenname => {
                                screenname.name.screen.forEach(menuname => {
                                    switch (menuname) {
                                        case 'home':
                                            link += `<li class="nav-item" *ngIf="userId!=null">
        <a class="nav-link" [routerLink]="['/${menuname.toLowerCase()}']">{{'source.${menuname}' | i18next}}</a>
    </li>`;
                                            break;
                                        case 'login':
                                            //                                     link += `<li class="nav-item">
                                            // <a class="nav-link" *ngIf='userId==null' [routerLink]="['/${menuname.toLowerCase()}']">{{'source.${menuname}' | i18next}}</a>
                                            // </li>`;
                                            break;
                                        case 'admin':
                                            link += `<li class="nav-item" *ngIf='isAdminUser'>
        <a class="nav-link" [routerLink]="['/${menuname.toLowerCase()}']">{{'source.${menuname}' | i18next}}</a>
    </li>`;
                                        case 'authorization':
                                            link += `<li class="nav-item" *ngIf="isApplicable('${menuname.toLowerCase()}') && userId">
<a class="nav-link" [routerLink]="['/${menuname.toLowerCase()}']">{{'source.${menuname}' | i18next}}</a>
</li>`;
                                            break;
                                        case 'logout':
                                            //                                         link += `<li class="nav-item" *ngIf="userId!=null">
                                            //     <a class="nav-link" (click)="logout()">{{'source.${menuname}' | i18next}}</a>
                                            // </li>`;
                                            break;
                                        default:
                                            link += `<li class="nav-item">
        <a class="nav-link" [routerLink]="['/${menuname.toLowerCase()}']">{{'source.${menuname}' | i18next}}</a>
    </li>`;
                                            break;
                                    }
                                });
                            });
                        }
                    });
                });
            });
            link += '\n</ul>'
        }
        return link;
    }
}