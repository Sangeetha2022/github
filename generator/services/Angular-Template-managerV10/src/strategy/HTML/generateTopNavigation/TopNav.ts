export class TemplateTopNav {
    /**
     * 
     * @param body 
     * Generate TopNav
     */
    static generateTopNav(humanLanguageMenus: any) {
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
                                // mainNav.push(`<div class="list-group panel" *ngIf='userId'>
                                // <a href="#${menuElement.featuremenu[0].name.feature.replace(' ', '')}" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#MainMenu">${menuElement.featuremenu[0].name.feature} <i class="fa fa-caret-down"></i></a>
                                // <div class="collapse" id="${menuElement.featuremenu[0].name.feature.replace(' ', '')}">`);
                                menuElement.screenmenu[0].name.screen.forEach((screenElement, screenIndex) => {
                                    if (screenIndex === 0) {
                                        mainNav.push(`<a id="ifylpi" class="menu-link"*ngIf="isApplicable('${screenElement.toLowerCase()}') && userId">
                                                        <a style="font-size: medium;" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true"
                                                        class="btn-secondary dropdown-toggle" id="dropdownMenuButton" data-parent="#MainMenu">
                                                        <a href="#${menuElement.featuremenu[0].name.feature.replace(' ', '')}">${menuElement.featuremenu[0].name.feature} </a>
                                                        <i class="fa fa-caret-down"></i></a>
                                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="${menuElement.featuremenu[0].name.feature.replace(' ', '')}">
                                                        <li>`);
                                    }
                                    mainNav.push(`<a id="ifylpi" class="dropdown-item" [routerLink]="['/${screenElement.toLowerCase()}']"><a {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>`);
                                });
                            }
                            mainNav.push(`</li>`);
                            mainNav.push(`</ul>`);
                            mainNav.push(`</a>`);
                        } 
                        else {
                            if (menuElement.screenmenu && menuElement.screenmenu.length > 0) {
                                menuElement.screenmenu[0].name.screen.forEach((screenElement, screenIndex) => {
                                    switch (screenElement) {
                                        case 'home':
                                            topNav.push(`<a id="izdchj" class="nav-link nav-item active" *ngIf='userId!=null'>
                                                            <a [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
                                                        </a>`);
                                            break;
                                        case 'authorization':
                                            bottomNav.push(`<a id="izdchj" class="nav-link nav-item active"  *ngIf="isApplicable('${screenElement.toLowerCase()}') && userId">
                                                                <a [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
                                                            </a>`);
                                            break;
                                        case 'manageroles':
                                            bottomNav.push(`<a id="izdchj" class="nav-link nav-item active" *ngIf="isApplicable('${screenElement.toLowerCase()}') && userId">
                                                                <a [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
                                                            </a>`);
                                            break;
                                        case 'manageusers':
                                            bottomNav.push(`<a id="izdchj" class="nav-link nav-item active" *ngIf="isApplicable('${screenElement.toLowerCase()}') && userId">
                                                                <a [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
                                                            </a>`);
                                            break;
                                        case 'admin':
                                            mainNav.push(`<a id="izdchj" class="nav-link nav-item active" *ngIf='isAdminUser'>
                                                            <a [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
                                                         </a>`);
                                            break;
                                        default:
                                            if(screenElement !== 'login' && screenElement !== 'logout') {
                                                mainNav.push(`<a id="izdchj" class="nav-link nav-item active">
                                                            <a [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
                                                        </a>`);
                                            }
                                            break;
                                    }
                                });
                            } 
                        } 
                        if(true){
                            if (menuElement.screenmenu && menuElement.screenmenu.length > 0) {
                                menuElement.screenmenu[0].name.screen.forEach((screenElement, screenIndex) => {
                                    switch (screenElement) {
                                        case 'login':
                                            bottomNav.push(`<button id="ipek5x" class="btn btn-primary" type="button" *ngIf='userId==null' [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}
                                                            </button>`);
                                            break;
                                        case 'logout':
                                            bottomNav.push(`<button type="button" id="ipek5x" class="btn btn-primary" *ngIf='userId!=null' (click)="logout()">
                                                                <a style="color: white;">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
                                                            </button>`);
                                            break;
                                    }
                                });
                            }
                        }
                    });
                }
            });
            bottomNav.push(`
                            <a id="ifylpi" class="menu-link">
                                <a style="font-size: medium;" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true"
                                class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton"> 
                                {{'source.selectLanguage' | i18next }} <b class="caret"></b> </a>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <a class="dropdown-item" *ngFor="let lang of languages" (click)='confirmLangModel(lang)'> {{'languages.' + lang | i18nextCap }}</a>
                                    </li>
                                </ul>
                            </a>`);
            sideNav += topNav.join('\n');
            sideNav += mainNav.join('\n');
            sideNav += bottomNav.join('\n');
        }
        return sideNav;
    }
}