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
                                // mainNav.push(`<div className="list-group panel" *ngIf='userId'>
                                // <a href="#${menuElement.featuremenu[0].name.feature.replace(' ', '')}" className="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#MainMenu">${menuElement.featuremenu[0].name.feature} <i className="fa fa-caret-down"></i></a>
                                // <div className="collapse" id="${menuElement.featuremenu[0].name.feature.replace(' ', '')}">`);
                                menuElement.screenmenu[0].name.screen.forEach((screenElement, screenIndex) => {
                                    if (screenIndex === 0) {
                                        mainNav.push(`<a id="izdchj" href="#${menuElement.featuremenu[0].name.feature.replace(' ', '')}" className="menu-link nav-item" *ngIf="isApplicable('${screenElement.toLowerCase()}') && userId">
                                                        <a style="font-size: medium;" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true"
                                                        className="dropdown-toggle" id="dropdownMenuButton" data-parent="#MainMenu">
                                                        ${menuElement.featuremenu[0].name.feature} </a>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="${menuElement.featuremenu[0].name.feature.replace(' ', '')}">
                                                        <li>`);
                                    }
                                    mainNav.push(`<a id="ifylpi" className="dropdown-item" [routerLink]="['/${screenElement.toLowerCase()}']">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>`);
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
                                            topNav.push(`
                                                        <NavItem>
                                                            <NavLink id="izdchj" className="menu-link nav-item" href="/${screenElement.toLowerCase()}" >
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</NavLink>
                                                        </NavItem>`);
                                            break;
                                        case 'authorization':
                                            bottomNav.push(`<a id="izdchj" className="menu-link nav-item"  *ngIf="isApplicable('${screenElement.toLowerCase()}') && userId" [routerLink]="['/${screenElement.toLowerCase()}']">
                                                                {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}
                                                                
                                                            </a>
                                                            
                                                            <NavItem>
                                                            <NavLink id="izdchj" className="menu-link nav-item" href="/${screenElement.toLowerCase()}" >
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</NavLink>
                                                        </NavItem>`);
                                            break;
                                        case 'manageroles':
                                            bottomNav.push(`<a id="izdchj" className="menu-link nav-item" *ngIf="isApplicable('${screenElement.toLowerCase()}') && userId" [routerLink]="['/${screenElement.toLowerCase()}']">
                                                                {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}
                                                            </a>
                                                            
                                                            <NavItem>
                                                            <NavLink id="izdchj" className="menu-link nav-item" href="/${screenElement.toLowerCase()}" >
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</NavLink>
                                                        </NavItem>`);
                                            break;
                                        case 'manageusers':
                                            bottomNav.push(`<a id="izdchj" className="menu-link nav-item" *ngIf="isApplicable('${screenElement.toLowerCase()}') && userId" [routerLink]="['/${screenElement.toLowerCase()}']">
                                                                {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}
                                                            </a>
                                                            
                                                            <NavItem>
                                                            <NavLink id="izdchj" className="menu-link nav-item" href="/${screenElement.toLowerCase()}" >
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</NavLink>
                                                        </NavItem>`);
                                            break;
                                        case 'admin':
                                            mainNav.push(`<a id="izdchj" className="menu-link nav-item" *ngIf='isAdminUser' [routerLink]="['/${screenElement.toLowerCase()}']">
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}
                                                         </a>
                                                         
                                                         <NavItem>
                                                            <NavLink id="izdchj" className="menu-link nav-item" href="/${screenElement.toLowerCase()}" >
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</NavLink>
                                                        </NavItem>`);
                                            break;
                                        case 'sefscreen':
                                            mainNav.push(`<a id="izdchj" className="menu-link nav-item" *ngIf='userId!=null' [routerLink]="['/${screenElement.toLowerCase()}']">
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}
                                                            </a>
                                                            
                                                            <NavItem>
                                                            <NavLink id="izdchj" className="menu-link nav-item" href="/${screenElement.toLowerCase()}" >
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</NavLink>
                                                        </NavItem>`);
                                            break;
                                        default:
                                            if(screenElement !== 'login' && screenElement !== 'logout') {
                                                mainNav.push(`<a id="izdchj" className="menu-link nav-item" [routerLink]="['/${screenElement.toLowerCase()}']">
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}
                                                        </a>
                                                        
                                                        <NavItem>
                                                            <NavLink id="izdchj" className="menu-link nav-item" href="/${screenElement.toLowerCase()}" >
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</NavLink>
                                                        </NavItem>`);
                                            }
                                            break;
                                    }
                                });
                            } 
                        }
                    });
                }
            });
            bottomNav.push(`
                            <a id="i4izs3" className="menu-link nav-item">
                                <a style="font-size: medium;" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true"
                                className="btn dropdown-toggle" id="dropdownMenuButton"> 
                                {{'source.selectLanguage' | i18next }} <b className="caret"></b> </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <a className="dropdown-item" *ngFor="let lang of languages" (click)='confirmLangModel(lang)'> {{'languages.' + lang | i18nextCap }}</a>
                                    </li>
                                </ul>
                            </a>`);
            humanLanguageMenus.forEach((element: any) => {
                if (element.menuDetails && element.menuDetails.length > 0) {
                    element.menuDetails.forEach((menuElement: any) => {
                        if (menuElement.screenmenu && menuElement.screenmenu.length > 0) {
                            menuElement.screenmenu[0].name.screen.forEach((screenElement, screenIndex) => {
                                switch (screenElement) {
                                    case 'login':
                                        bottomNav.push(`<button id="ipek5x" className="btn btn-primary" type="button" *ngIf='userId==null' [routerLink]="['/${screenElement.toLowerCase()}']">
                                        {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}
                                                        </button>
                                                        
                                                        <NavItem>
                                                            <NavLink id="ipek5x" className="btn btn-primary" href="/${screenElement.toLowerCase()}" >
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</NavLink>
                                                        </NavItem>`);
                                        break;
                                    case 'logout':
                                        bottomNav.push(`<button type="button" id="ipek5x" className="btn btn-primary" *ngIf='userId!=null' (click)="logout()">
                                                            <a style="color: white;">{{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</a>
                                                        </button>
                                                        
                                                        <NavItem>
                                                            <NavLink id="ipek5x" className="btn btn-primary" href="/${screenElement.toLowerCase()}" >
                                                            {{'source.${menuElement.screenmenu[0].description.screen[screenIndex]}' | i18next}}</NavLink>
                                                        </NavItem>`);
                                        break;
                                }
                            });
                        }
                    });
                }
            });
            sideNav += topNav.join('\n');
            sideNav += mainNav.join('\n');
            sideNav += bottomNav.join('\n');
        }
        return sideNav;
    }
}