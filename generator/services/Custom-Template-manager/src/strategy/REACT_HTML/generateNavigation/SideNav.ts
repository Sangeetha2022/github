export class TemplateSideNav {
    /**
     * 
     * @param body 
     * Generate Sidenav
     */
    static generatedSideNav(humanLanguageMenus: any) {
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
                                        mainNav.push(`<div id="icrvgp" className="cell gpd-clm"  >
                                                        <div id="i6vd27" className="gdp-row gpd-grid"  >
                                                            <div id="inlo1l" className="cell gpd-clm"  >
                                                                <i id="iyxitk" className="fa fa-folder-open" aria-hidden="true"></i>
                                                            </div>
                                                            <div id="iytw4t" className="cell gpd-clm" >
                                                                <a id="i9imej" className="gpd-text" href="#${menuElement.featuremenu[0].name.feature.replace(' ', '')}" data-toggle="collapse" data-parent="#MainMenu">${menuElement.featuremenu[0].name.feature} <i className="fa fa-caret-down"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="collapse" id="${menuElement.featuremenu[0].name.feature.replace(' ', '')}">
                                                        <div id="icrvgp" className="cell gpd-clm">
                                                            <div id="i6vd27" className="gdp-row gpd-grid">
                                                                <div id="iytw4t" className="cell gpd-clm">`);
                                    }
                                    mainNav.push(`<a id="i9imej" className="gpd-text" href='/${screenElement.toLowerCase()}'>${menuElement.screenmenu[0].description.screen[screenIndex]}</a>
                                        </div>
                                    </div>`);
                                });
                            }
                            mainNav.push(`</div>`);
                            mainNav.push(`</div>`);
                        } else {
                            if (menuElement.screenmenu && menuElement.screenmenu.length > 0) {
                                menuElement.screenmenu[0].name.screen.forEach((screenElement, screenIndex) => {
                                    switch (screenElement) {
                                        case 'home':
                                            topNav.push(`<div id="i0xya-2" class="cell gpd-clm">
                                                            <div id="i60c7-2" className="gdp-row gpd-grid">
                                                                <div id="ibuiwl" className="cell gpd-clm"><img id="imvflv" /></div>
                                                                    <div id="icrvgp" className="cell gpd-clm" >
                                                                        <div id="i6vd27" className="gdp-row gpd-grid" >
                                                                            <div id="inlo1l" className="cell gpd-clm" >
                                                                                <i id="iyxitk" className="fa fa-home" aria-hidden="true"></i>
                                                                            </div>
                                                                            <div id="iytw4t" className="cell gpd-clm">
                                                                                <a id="i9imej" className="gpd-text"
                                                                                     href='/${screenElement.toLowerCase()}'>${menuElement.screenmenu[0].description.screen[screenIndex]}</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>`);
                                            break;
                                        case 'sefscreen':
                                            bottomNav.push(`<div id="icrvgp" className="cell gpd-clm" >
                                                                <div id="i6vd27" className="gdp-row gpd-grid" >
                                                                    <div id="inlo1l" className="cell gpd-clm" >
                                                                        <i id="iyxitk" className="fa fa-desktop" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div id="iytw4t" className="cell gpd-clm">
                                                                        <a id="i9imej" className="gpd-text"
                                                                         href='/${screenElement.toLowerCase()}'>${menuElement.screenmenu[0].description.screen[screenIndex]}</a>
                                                                    </div>
                                                                </div>
                                                            </div>`);
                                            break;
                                        case 'login':
                                            bottomNav.push(`<li>
                                                                <div id="icrvgp" className="cell gpd-clm" >
                                                                    <div id="i6vd27" className="gdp-row gpd-grid" >
                                                                        <div id="inlo1l" className="cell gpd-clm" >
                                                                            <i id="iyxitk" className="fa fa-sign-in" aria-hidden="true"></i>
                                                                        </div>
                                                                        <div id="iytw4t" className="cell gpd-clm">
                                                                            <a id="i9imej" className="gpd-text" 
                                                                            href='/${screenElement.toLowerCase()}'>${menuElement.screenmenu[0].description.screen[screenIndex]}</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>`);
                                            break;
                                        case 'authorization':
                                            bottomNav.push(``);
                                            break;
                                        case 'managecontrol':
                                            bottomNav.push(``);
                                            break;
                                        case 'manageroles':
                                            bottomNav.push(``);
                                            break;
                                        case 'manageusers':
                                            bottomNav.push(``);
                                            break;
                                        // case 'authorization':
                                        //     bottomNav.push(` <div id="icrvgp" className="cell gpd-clm" >
                                        //                         <div id="i6vd27" className="gdp-row gpd-grid" >
                                        //                             <div id="inlo1l" className="cell gpd-clm" >
                                        //                                 <i id="iyxitk" className="fa fa-shield" aria-hidden="true"></i>
                                        //                             </div>
                                        //                             <div id="iytw4t" className="cell gpd-clm" >
                                        //                                 <a id="i9imej" className="gpd-text"
                                        //                                 href='/${screenElement.toLowerCase()}'>${menuElement.screenmenu[0].description.screen[screenIndex]}</a>
                                        //                             </div>
                                        //                         </div>
                                        //                     </div>`);
                                        //     break;
                                        // case 'manageroles':
                                        //     bottomNav.push(`<div id="icrvgp" className="cell gpd-clm" >
                                        //                         <div id="i6vd27" className="gdp-row gpd-grid" >
                                        //                             <div id="inlo1l" className="cell gpd-clm" >
                                        //                                 <i id="iyxitk" className="fa fa-user-plus" aria-hidden="true"></i>
                                        //                             </div>
                                        //                             <div id="iytw4t" className="cell gpd-clm" >
                                        //                                 <a id="i9imej" className="gpd-text"
                                        //                                 href='/${screenElement.toLowerCase()}'>${menuElement.screenmenu[0].description.screen[screenIndex]}</a>
                                        //                             </div>
                                        //                         </div>
                                        //                     </div>`);
                                        //     break;
                                        // case 'manageusers':
                                        //     bottomNav.push(`<div id="icrvgp" className="cell gpd-clm" >
                                        //                         <div id="i6vd27" className="gdp-row gpd-grid" >
                                        //                             <div id="inlo1l" className="cell gpd-clm" >
                                        //                                 <i id="iyxitk" className="fa fa-users" aria-hidden="true"></i>
                                        //                             </div>
                                        //                             <div id="iytw4t" className="cell gpd-clm" >
                                        //                                 <a id="i9imej" className="gpd-text"
                                        //                                 href='/${screenElement.toLowerCase()}'>${menuElement.screenmenu[0].description.screen[screenIndex]}</a>
                                        //                             </div>
                                        //                         </div>
                                        //                     </div>`);
                                        //     break;
                                        case 'admin':
                                            mainNav.push(`<div id="icrvgp" className="cell gpd-clm" >
                                                            <div id="i6vd27" className="gdp-row gpd-grid" >
                                                                <div id="inlo1l" className="cell gpd-clm" >
                                                                    <i id="iyxitk" className="fa fa-user" aria-hidden="true"></i>
                                                                </div>
                                                                <div id="iytw4t" className="cell gpd-clm" >
                                                                    <a id="i9imej" className="gpd-text"
                                                                    href='/${screenElement.toLowerCase()}'>${menuElement.screenmenu[0].description.screen[screenIndex]}</a>
                                                                </div>
                                                            </div>
                                                        </div>`);
                                            break;
                                        case 'logout':
                                            bottomNav.push(`<div id="icrvgp" className="cell gpd-clm" >
                                                                <div id="i6vd27" className="gdp-row gpd-grid" >
                                                                    <div id="inlo1l" className="cell gpd-clm" >
                                                                        <i id="iyxitk" className="fa fa-sign-out" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div id="iytw4t" className="cell gpd-clm">
                                                                        <a id="i9imej" className="gpd-text"
                                                                         >${menuElement.screenmenu[0].description.screen[screenIndex]}</a>
                                                                    </div>
                                                                </div>
                                                            </div>`);
                                            break;
                                        default:
                                            mainNav.push(`<div id="icrvgp" className="cell gpd-clm" >
                                                            <div id="i6vd27" className="gdp-row gpd-grid" >
                                                                <div id="inlo1l" className="cell gpd-clm" >
                                                                    <i id="iyxitk" className="fa fa-home" aria-hidden="true"></i>
                                                                </div>
                                                                <div id="iytw4t" className="cell gpd-clm">
                                                                    <a id="i9imej" className="gpd-text"
                                                                         href='/${screenElement.toLowerCase()}'>${menuElement.screenmenu[0].description.screen[screenIndex]}</a>
                                                                </div>
                                                            </div>
                                                        </div>`);
                                            break;
                                    }
                                });
                            }
                        }
                    });
                }
            });
            // bottomNav.push(`<li> 
            //                     <div id="icrvgp" className="cell gpd-clm">
            //                         <div id="i6vd27" className="gdp-row gpd-grid">
            //                             <div id="inlo1l" className="cell gpd-clm">
            //                                 <i id="iyxitk" className="fa fa-language" aria-hidden="true"></i>
            //                             </div>
            //                             <div id="iytw4t" className="cell gpd-clm">
            //                                 <a href="#translator" data-toggle="collapse" aria-expanded="false"
            //                                     id="i9imej" className="dropdown-toggle text">
            //                                     selectLanguage' | i18next }} </a>
            //                             </div>
            //                         </div>
            //                     </div>

            //                     <ul className="collapse list-unstyled" id="translator">
            //                         <li *ngFor="let lang of languages">  
            //                             <div id="icrvgp" className="cell gpd-clm">
            //                                 <div id="i6vd27" className="gdp-row gpd-grid">
            //                                     <div id="iytw4t" className="cell gpd-clm">
            //                                         <a id="i9imej" className="text" 
            //                                             (click)='confirmLangModel(lang)'> {{'languages.' + lang | i18nextCap}}</a>
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                         </li>
            //                     </ul>
            //                 </li>
            //             </div>
            //         </div>`);
            bottomNav.push(`
                    </div>
                </div>
            `)
            sideNav += topNav.join('\n');
            sideNav += mainNav.join('\n');
            sideNav += bottomNav.join('\n');
        }
        return sideNav;
    }
}