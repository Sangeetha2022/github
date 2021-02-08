export class GeppettoSideNav {
    /**
     * 
     * @param body 
     * Generate Sidenav
     */
    generateSideNav(humanLanguageMenus: any) {
        let topNav = [];
        let mainNav = [];
        let bottomNav = [];
        let sideNav: string = '';
        if (humanLanguageMenus && humanLanguageMenus.length > 0) {
            humanLanguageMenus.forEach((element: any) => {
                if (element.menuDetails && element.menuDetails.length > 0) {
                    element.menuDetails.forEach((menuElement: any) => {
                        if (menuElement.featuremenu[0].name.feature !== 'default') {
                            if (menuElement.screenmenu && menuElement.screenmenu.length > 0) {
                                mainNav.push(`<div class="list-group panel" *ngIf='userId'>
                                <a href="#${menuElement.featuremenu[0].name.feature.replace(' ', '')}" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#MainMenu">${menuElement.featuremenu[0].name.feature} <i class="fa fa-caret-down"></i></a>
                                <div class="collapse" id="${menuElement.featuremenu[0].name.feature.replace(' ', '')}">`);
                                menuElement.screenmenu[0].name.screen.forEach((screenElement, screenIndex) => {                                   
                                    mainNav.push(`<a class="list-group-item" *ngIf="isApplicable('${screenElement.toLowerCase()}') && userId" [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>`);
                                });
                            }
                            mainNav.push(`</div>`);
                            mainNav.push(`</div>`);
                        } else {
                            if (menuElement.screenmenu && menuElement.screenmenu.length > 0) {
                                menuElement.screenmenu[0].name.screen.forEach((screenElement, screenIndex) => {
                                    switch (screenElement) {
                                        case 'home':
                                            topNav.push(`<div class="list-group panel">
    <a class="list-group-item list-group-item-success" *ngIf='userId!=null'  [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
</div>`);
                                            break;
                                        case 'login':
                                            bottomNav.push(`<li>
    <a class="list-group-item list-group-item-success text" *ngIf='userId==null' [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
</li>`);
                                            break;
                                        case 'authorization':
                                            bottomNav.push(`<div class="list-group panel" *ngIf="isApplicable('${screenElement.toLowerCase()}') && userId">
                                            <a class="list-group-item list-group-item-success" [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
                                        </div>`);
                                            break;
                                        case 'admin':
                                            mainNav.push(`<div class="list-group panel" *ngIf='isAdminUser'>
    <a class="list-group-item list-group-item-success" [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
</div>`);
                                            break;
                                        case 'logout':
                                            bottomNav.push(`<div class="list-group panel">
    <a class="list-group-item list-group-item-success" *ngIf='userId!=null' (click)="logout()">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
</div>`);
                                            break;
                                        default:
                                            mainNav.push(`<div class="list-group panel">
    <a class="list-group-item list-group-item-success" [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
</div>`);
                                            break;
                                    }
                                });
                            }
                        }
                    });
                }
            });
            bottomNav.push(`<li>
    <a href="#translator" data-toggle="collapse" aria-expanded="false" class="list-group-item list-group-item-success dropdown-toggle text"> {{'source.selectLanguage' | i18next }} </a>
    <ul class="collapse list-unstyled" id="translator">
        <li>
            <a class="list-group-item text" *ngFor="let lang of languages" (click)='confirmLangModel(lang)'> {{'languages.' + lang | i18nextCap }}</a>
        </li>
    </ul>
</li>`);
            sideNav += topNav.join('\n');
            sideNav += mainNav.join('\n');
            sideNav += bottomNav.join('\n');
        }
        return sideNav;
    }
}