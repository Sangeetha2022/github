import * as fs from 'fs';
import * as asyncLoop from 'node-async-loop';
import { Common } from '../config/Common';
import * as util from 'util';
import { FrontendSupportWorker } from '../Supportworker/frontendSupportWorker';

export class FrontendWorker {
    private frontendSupportWorker = new FrontendSupportWorker();
    private projectGenerationPath = '';
    private seedPath:any = '';
    private authTemplatePath = '';
    private clientframework = '';
    private routingMenus: any = [];

    // FOLDER NAME
    private LOGIN_FOLDERNAME = 'login';
    private SHARED_FOLDER = 'shared';
    private SIGNUP_FOLDERNAME = 'signup';
    private HOME_FOLDERNAME = 'home';
    private USER_FOLDERNAME = 'user';
    private CONFIG_FOLDERNAME = 'config'
    private AUTHORIZATION_FOLDERNAME = 'authorization';
    private MANAGEROLES_FOLDERNAME = 'manageroles';
    private MANAGEUSERS_FOLDERNAME = 'manageusers';
    private MANAGECONTROL_FOLDERNAME = 'managecontrol';
    private PROFILE_SETTINGS_FOLDERNAME = 'profilesettings';
    private BUTTON_RENDERER_FOLDERNAME = 'button-renderer';
    private UPDATE_AUTHORIZATION_FOLDERNAME = 'updateauthorization';
    private BUTTON_RENDERED_FOLDERNAME = 'button-rendered';
    private AUTH_FOLDERNAME = 'auth';
    private HEADER_FOLDERNAME = 'header';
    private BROADCAST_FOLDERNAME = 'broadcast';
    private VAULT_ADMIN = 'vaultadmin';
    private VAULT_FILE_NAME = 'vault-admin'

    // FILE NAME
    private SERVICE_NAME = 'service';
    private MODULE_NAME = 'module';
    private APP_MODULE_FILENAME = `app.module.ts`;
    private APP_ROUTING_MODULE_FILENAME = `app-routing.module.ts`;
    private REACT_ROUTING_FILENAME = `routes.tsx`;
    private PACKAGE_FILENAME = 'package.json';
    private AUTH_GUARD_FILENAME = `${this.AUTH_FOLDERNAME.charAt(0).toUpperCase() + this.AUTH_FOLDERNAME.slice(1)}Guard`;

    // TEMPLATE NAME
    private LOGIN_SERVICE_TEMPLATENAME = 'login_service';
    private MODULE_TEMPLATENAME = 'component_module';
    private MODIFY_APP_MODULE_TEMPLATENAME = `modify_app_module`;
    private MODIFY_APP_ROUTNG_TEMPLATENAME = `modify_app_routing`;
    private REACT_MODIFY_ROUTING_TEMPLATENAME = `react_modify_routing`;
    private VAULT_SERVICE_TEMPLATENAME = 'vault_service'

    // Methods
    private logoutMethod = ` logout() {\n\t\tconst temp = {\n\t\t\t id: sessionStorage.getItem('Id')\n\t\t};\n\t\tthis.loginService.Logout(temp).subscribe(data => {\n\t\t\tsessionStorage.clear();\n\t\tthis.userId = sessionStorage.getItem('Id');\n\t\tthis.router.navigate(['']);\n\t\t}, error => {\n\t\t\tconsole.error('error:', error);\n\t\t});\n\t\t}`;
    private logoutMethodV13 = ` logout() {\n\t\tthis.authArray = [];\n\t\t\t \n\t\tconst temp = {\n\t\t\t id: sessionStorage.getItem('Id')\n\t\t};\n\t\tthis.loginService.Logout(temp).subscribe(data => {\n\t\t\tsessionStorage.clear();\n\t\tthis.userId = sessionStorage.getItem('Id') || null;\n\t\tthis.router.navigate(['']);\n\t\t}, error => {\n\t\t\tconsole.error('error:', error);\n\t\t});\n\t\t}`;
    private logoutMethodV12 = ` logout() {\n\t\tconst temp = {\n\t\t\t id: sessionStorage.getItem('Id')\n\t\t};\n\t\tthis.loginService.Logout(temp).subscribe(data => {\n\t\t\tsessionStorage.clear();\n\t\tthis.userId = sessionStorage.getItem('Id') || '{}';\n\t\tthis.router.navigate(['']);\n\t\t}, error => {\n\t\t\tconsole.error('error:', error);\n\t\t});\n\t\t}`;
    private broadcastMethod = `\tthis.broadcastService.currentUserName.subscribe(headerPermission => {
        this.authArray = [];
        if (headerPermission !== undefined) {
            //   console.log('Headerpermission------->>>', headerPermission);
            for (let role in headerPermission) {
                console.log('-------role----', headerPermission[role])
                if (headerPermission[role].length >= 1) {
                    this.authArray = headerPermission[role];
                }
            }
        }
    });`
    private routeMethod = `\tthis.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    }`;
    private isAdminUser = `\t this.authArray.find((access:any) => access === 'admin' ? this.isAdminUser = true : false);`
    private secondconstruct = `\tthis.mysubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            this.router.navigated = false;
        }
    })`;

    private isApplicableMethod = `isApplicable(value) {
		if (this.authArray !== undefined) {
			return this.authArray.filter(routename => routename == value).length > 0;
		}
    }`;
    private isApplicableMethodV13 = `isApplicable(value:any) {
		if (this.authArray !== undefined) {
			return this.authArray.filter((routename: any) => routename == value).length > 0;
		}
        return false;
    }`;
    private isApplicableMethodV12 = `isApplicable(value:any) {
		if (this.authArray !== undefined) {
			return this.authArray.filter((routename: any) => routename == value).length > 0;
		}
        return false;
    }`;
    private confirmLangModel = `confirmLangModel(lang) {\n\t\tthis.userId= sessionStorage.getItem('Id');\n\t\tif (this.userId !== null) {\n\t\tthis.confirmLangChangeModal = 'block';\n\t\tthis.currentLanguage = lang;\n\t\t} else {\n\t\tthis.changeLanguage(lang);\n\t\tthis.onCloseHandled();\n\t\t}\n\t\t}`;
    private confirmLangModelV13 = `confirmLangModel(lang:any) {\n\t\tthis.userId= sessionStorage.getItem('Id') || null;\n\t\tif (this.userId !== null) {\n\t\tthis.confirmLangChangeModal = 'block';\n\t\tthis.currentLanguage = lang;\n\t\t} else {\n\t\tthis.changeLanguage(lang);\n\t\tthis.onCloseHandled();\n\t\t}\n\t\t}`;
    private confirmLangModelV12 = `confirmLangModel(lang:any) {\n\t\tthis.userId= sessionStorage.getItem('Id') || '{}';\n\t\tif (this.userId !== null) {\n\t\tthis.confirmLangChangeModal = 'block';\n\t\tthis.currentLanguage = lang;\n\t\t} else {\n\t\tthis.changeLanguage(lang);\n\t\tthis.onCloseHandled();\n\t\t}\n\t\t}`;
    private confirmLangChange = `confirmLangChange() {\n\t\tthis.changeLanguage(this.currentLanguage);\n\t\tthis.onCloseHandled();\n\t\t}`;
    private onCloseHandled = `onCloseHandled() {\n\t\tthis.confirmLangChangeModal = 'none';\n\t\t}`;
    private changeLanguage = `changeLanguage(lang) {\n\t\tif (lang !== this.i18NextService.language) {\n\t\tthis.i18NextService.changeLanguage(lang).then(x => {\n\t\tthis.updateState(lang);\n\t\t});\n\t\t}\n\t\tthis.userId = sessionStorage.getItem('Id');\n\t\tif (this.userId !== null) {\n\t\tthis.logout();\n\t\t} else {\n\t\tdocument.location.reload();\n\t\t}\n\t\t}`;
    private changeLanguageV13 = `changeLanguage(lang:any) {\n\t\tif (lang !== this.i18NextService.language) {\n\t\tthis.i18NextService.changeLanguage(lang).then(x => {\n\t\tthis.updateState(lang);\n\t\t});\n\t\t}\n\t\tthis.userId = sessionStorage.getItem('Id') || null;\n\t\tif (this.userId !== null) {\n\t\tthis.logout();\n\t\t} else {\n\t\tdocument.location.reload();\n\t\t}\n\t\t}`;
    private changeLanguageV12 = `changeLanguage(lang:any) {\n\t\tif (lang !== this.i18NextService.language) {\n\t\tthis.i18NextService.changeLanguage(lang).then(x => {\n\t\tthis.updateState(lang);\n\t\t});\n\t\t}\n\t\tthis.userId = sessionStorage.getItem('Id') || '{}';\n\t\tif (this.userId !== null) {\n\t\tthis.logout();\n\t\t} else {\n\t\tdocument.location.reload();\n\t\t}\n\t\t}`;
    private updateLangChange = `private updateState(lang: string) {\n\t\tthis.language = lang;\n\t\t}`;
    private profileImageChange = `onSelectFile(event:any) {
		\n\t\tlet image = event.target.files[0];
		\n\t\tif (event.target.files && event.target.files[0]) {
			\n\t\tlet formData = new FormData();
			\n\t\tvar reader = new FileReader();
			\n\t\treader.readAsDataURL(event.target.files[0]); // read file as data url
			\n\t\treader.onload = (event:any) => { // called once readAsDataURL is completed
				\n\t\tthis.url = event.target.result;
                \n\t\t}
                \n\t\t}
                \n\t\tif(image){
                    \n\t\talert('* confirm u can upload click ok');
                    \n\t\tconst endpoint = this.loginService.uploadImgFile();
                    \n\t\tconst formData: FormData = new FormData();
                    \n\t\tformData.append('fileKey', image, image.name);
                    \n\t\tfetch(endpoint, {
                        \n\t\tmethod: 'POST',
                        \n\t\tbody: formData
                        \n\t\t}).then( res => res.json() ).then((resultData:any) => {
                            \n\t\tlet userImage = \`\${this.sharedService.UPLOAD_API}/\${resultData}\`;
                            \n\t\tvar imgJson = {
                                \n\t\tavatar: userImage,
                                \n\t\tid: sessionStorage.getItem('Id')
                                \n\t\t}
                                \n\t\tthis.userService.UpdateUserImg(imgJson).subscribe((response) => {
                                    \n\t\tsessionStorage.removeItem('Image');
                                    \n\t\tsessionStorage.setItem('Image', response.avatar); 
                                    \n\t\tthis.ngOnInit();
                                    \n\t\t})
                                    \n\t\t})
                                    \n\t\t}
                                    \n\t\t}`;
    private isAppModule = {
        declaration: false,
        imports: false,
        providers: false,
        boostrap: false
    }
    private authPackageDependency = [
        `   "rxjs-compat": "6.5.2",`,
        `   "@auth0/angular-jwt": "2.1.2",`,
        `   "@types/i18next-sprintf-postprocessor": "^0.2.0",`,
        `   "ag-grid-angular": "^26.0.0",`,
        `   "ag-grid-community": "^26.0.0",`,
        `   "angular-i18next": "^7.0.0",`,
        `   "angular-validation-message-i18next": "^1.2.0",`,
        `   "i18next": "^17.0.14",`,
        `   "i18next-browser-languagedetector": "^3.0.3",`,
        `   "i18next-sprintf-postprocessor": "^0.2.2",`,
        `   "i18next-xhr-backend": "^3.1.2",`,
        `   "angular-validation-message": "^2.0.1",`,
        `   "moment": "^2.26.0",`,
    ]

    private reactAuthPackageDependency = [
        `  "i18next-sprintf-postprocessor": "^0.2.2",`,
        `  "i18next-xhr-backend": "^3.1.2",`,
        `  "jwt-auth-react": "4.1.2",`,
        `  "@types/jest": "^26.0.15",`,
        `  "@types/node": "^12.0.0",`,
        `  "@types/react": "^17.0.0",`,
        `  "@types/react-dom": "^17.0.0",`,
        `  "axios": "^0.20.0",`,
        `  "react-router-dom": "^5.3.0",`,
        `  "react-i18next": "^7.0.0",`,
        `  "react-moment": "1.1.1",`,
        `  "reactstrap": "^8.10.0",`,
        `  "react-social-login": "3.4.14",`,
        `  "rxjs": "~6.3.3",`,
        `  "rxjs-compat": "6.5.2",`,
        `  "tslib": "^1.9.0",`,
        `  "zone.js": "~0.8.26",`,
        `  "@testing-library/jest-dom": "^5.11.4",`,
        `  "@testing-library/react": "^11.1.0",`,
        `  "@testing-library/user-event": "^12.1.10",`,
        `  "bootstrap": "^5.1.1",`,
        `  "react-bootstrap": "^2.0.2",`,
        `  "node-sass": "^4.14.1",`,
        `  "typescript": "^4.1.2",`,
        `  "web-vitals": "^1.0.1",`,
      ]

    private appModuleInfo: any = {
        importDependency: [],
        imports: [],
        declarations: [],
        providers: [],
        entryComponents: [],
        boostrap: [],
        className: null
    }

    private httpClient = {
        importDependency: `import { HttpClientModule } from '@angular/common/http';`,
        imports: `HttpClientModule`
    }

    private FormModule = {
        importDependency: `import { FormsModule, ReactiveFormsModule } from '@angular/forms';`,
        imports: `FormsModule`
    }

    private SefScreenModule = {
        importDependency: `import { SefscreenModule } from './sefscreen/sefscreen.module';`,
        imports: `SefscreenModule`
    }

    private isRoutingModule = {
        path: false
    }

    private routingModuleInfo = {
        importDependency: [],
        path: []
    }

    private reactRoutingModuleInfo = {
        importDependency: [],
        path: []
    }

    initializeData() {
        this.appModuleInfo = {
            importDependency: [],
            imports: [],
            declarations: [],
            providers: [],
            entryComponents: [],
            boostrap: [],
            className: null
        }

        this.routingModuleInfo = {
            importDependency: [],
            path: []
        }

        this.reactRoutingModuleInfo = {
            importDependency: [],
            path: []
        }
    }

    // create login component from seed files
    async createLoginComponent(details, callback) {
        this.initializeData();
        this.projectGenerationPath = details.templateResponse.applicationPath;
        this.seedPath = details.seedTemplatePath;
        console.log("seedPath ====>",this.seedPath);
        this.authTemplatePath = details.authTemplatePath;
        console.log(" this.authTemplatePath[[", this.authTemplatePath);
        this.clientframework = details.clientframework;
        let loginApplicationPath = '';
        if(this.clientframework === 'react'){
            console.log('login react generate', this.clientframework);
            loginApplicationPath = `${this.projectGenerationPath}/src/app/${this.LOGIN_FOLDERNAME}`;
        } else if(this.clientframework !== 'react'){
            const loginApplicationPath = `${this.projectGenerationPath}/src/app/${this.LOGIN_FOLDERNAME}`;
        }
        this.generateStaticComponent(loginApplicationPath, this.clientframework, this.LOGIN_FOLDERNAME, () => {
            if(this.clientframework === 'react'){
                this.generateImportComponent(this.LOGIN_FOLDERNAME, this.MODULE_TEMPLATENAME, loginApplicationPath, () => {
                    callback();
                });
            } else if(this.clientframework !== 'react'){
                this.generateServiceComponent(details.templateResponse.shared, this.LOGIN_FOLDERNAME,
                    this.LOGIN_SERVICE_TEMPLATENAME, loginApplicationPath, () => {
                        this.generateModule(this.LOGIN_FOLDERNAME, this.MODULE_TEMPLATENAME, loginApplicationPath, () => {
                            callback();
                        });
                    });
            }
        });
    }

    //createVaultAdminFile
    async createVaultAdminComponent(details, callback) {
        if(this.clientframework !== 'react'){
            this.projectGenerationPath = details.templateResponse.applicationPath;
            this.seedPath = details.seedTemplatePath;
            this.authTemplatePath = details.authTemplatePath;
            const vaultApplicationPath = `${this.projectGenerationPath}/src/app/${this.VAULT_ADMIN}`;
            this.generateStaticComponent(vaultApplicationPath, this.clientframework, this.VAULT_ADMIN, () => {
                this.generateModule(this.VAULT_ADMIN, this.MODULE_TEMPLATENAME, vaultApplicationPath, () => {
                    callback();
                });
            });
        } else {
            callback();
        }

    }

    //createReadmeFile 
    async createReadMeFile(details, callback) {
        const generationPath = details.templateResponse.applicationPath.split("/application")
        const seedPath = `${details.seedTemplatePath}/readMe`;
        await this.frontendSupportWorker.generateStaticFile(generationPath[0], seedPath, "README.md", () => {
            callback()
        });
    }

     //createReadmeFile 
     async createErrorReadMeFile(details, callback) {
        const generationPath = details.templateResponse.applicationPath.split("/application")
        const seedPath = `${details.seedTemplatePath}/readMe`;
        await this.frontendSupportWorker.generateStaticFile(generationPath[0], seedPath, "ERROR.md", () => {
            callback();
        });
    }

    //create config folder from seed files
    async createConfig(callback) {
        if(this.clientframework !== 'react'){
            const configPath = `${this.projectGenerationPath}/src/app/${this.CONFIG_FOLDERNAME}`;
            await this.generateStaticComponent(configPath, this.clientframework, this.CONFIG_FOLDERNAME, () => {
                callback();
            });
        } else {
            console.log('back');
            callback();
        }
    }

    // create signup component from seed files
    async createSignupComponent(callback) {
        const signupApplicationPath = `${this.projectGenerationPath}/src/app/${this.SIGNUP_FOLDERNAME}`;
        this.generateStaticComponent(signupApplicationPath, this.clientframework, this.SIGNUP_FOLDERNAME, () => {
            if(this.clientframework === 'react'){
                this.generateImportComponent(this.SIGNUP_FOLDERNAME, this.MODULE_TEMPLATENAME, signupApplicationPath, () => {
                    callback();
                });
            } else if(this.clientframework !== 'react'){
                this.generateModule(this.SIGNUP_FOLDERNAME, this.MODULE_TEMPLATENAME, signupApplicationPath, () => {
                    callback();
                });
            }
        });
    }

    // create authorization component from seed files
    async createAuthorizationComponent(callback) {
        const authorizationPath = `${this.projectGenerationPath}/src/app/${this.AUTHORIZATION_FOLDERNAME}`;
        const updateauthorizationPath = `${authorizationPath}/${this.UPDATE_AUTHORIZATION_FOLDERNAME}`;
        const buttonRenderedApplicationPath = `${authorizationPath}/${this.BUTTON_RENDERED_FOLDERNAME}`;
        await this.generateStaticComponent(authorizationPath, this.clientframework, this.AUTHORIZATION_FOLDERNAME, async () => {
            await this.generateStaticComponent(updateauthorizationPath, this.clientframework, this.UPDATE_AUTHORIZATION_FOLDERNAME, async () => {
                await this.generateStaticComponent(buttonRenderedApplicationPath, this.clientframework, this.BUTTON_RENDERED_FOLDERNAME, () => {
                    if(this.clientframework === 'react'){
                        this.generateImportComponent(this.AUTHORIZATION_FOLDERNAME, this.MODULE_TEMPLATENAME, authorizationPath, () => {
                            callback();
                          });
                    } else if(this.clientframework !== 'react'){
                        this.generateModule(this.AUTHORIZATION_FOLDERNAME, this.MODULE_TEMPLATENAME, authorizationPath, () => {
                            this.generateModule(this.UPDATE_AUTHORIZATION_FOLDERNAME, this.MODULE_TEMPLATENAME, updateauthorizationPath, () => {
                                this.generateModule(this.BUTTON_RENDERED_FOLDERNAME, this.MODULE_TEMPLATENAME, buttonRenderedApplicationPath, () => {
                                    callback();
                                });
                            });
                        });
                    }
                });
            });
        });
    }

    // create manageroles component from seed files
    async createManageroleComponent(callback) {
        const managerolesPath = `${this.projectGenerationPath}/src/app/${this.MANAGEROLES_FOLDERNAME}`;
        await this.generateStaticComponent(managerolesPath, this.clientframework, this.MANAGEROLES_FOLDERNAME, () => {
            if(this.clientframework === 'react'){
                this.generateImportComponent(this.MANAGEROLES_FOLDERNAME, this.MODULE_TEMPLATENAME, managerolesPath, () => {
                    callback();
                });
            } else if(this.clientframework !== 'react'){
                this.generateModule(this.MANAGEROLES_FOLDERNAME, this.MODULE_TEMPLATENAME, managerolesPath, () => {
                    callback();
                });
            }
        });
    }

    // create manageuser component from seed files
    async createManageuserComponent(callback) {
        const manageuserPath = `${this.projectGenerationPath}/src/app/${this.MANAGEUSERS_FOLDERNAME}`;
        await this.generateStaticComponent(manageuserPath, this.clientframework, this.MANAGEUSERS_FOLDERNAME, () => {
            if(this.clientframework === 'react'){
                this.generateImportComponent(this.MANAGEUSERS_FOLDERNAME, this.MODULE_TEMPLATENAME, manageuserPath, () => {
                    callback();
                });
            } else if(this.clientframework !== 'react'){
                this.generateModule(this.MANAGEUSERS_FOLDERNAME, this.MODULE_TEMPLATENAME, manageuserPath, () => {
                    callback();
                });
            }
        });
    }

    // create managecontrol component from seed files
    async createManagecontrolComponent(callback) {
        const manageuserPath = `${this.projectGenerationPath}/src/app/${this.MANAGECONTROL_FOLDERNAME}`;
        await this.generateStaticComponent(manageuserPath, this.clientframework, this.MANAGECONTROL_FOLDERNAME, () => {
            if(this.clientframework === 'react') {
                this.generateImportComponent(this.MANAGECONTROL_FOLDERNAME, this.MODULE_TEMPLATENAME, manageuserPath, () => {
                    callback();
                });
            } else if(this.clientframework !== 'react'){
                this.generateModule(this.MANAGECONTROL_FOLDERNAME, this.MODULE_TEMPLATENAME, manageuserPath, () => {
                    callback();
                });
            }
        });
    }

    // create home component from seed files
    async createHomeComponent(callback) {
        const homeApplicationPath = `${this.projectGenerationPath}/src/app/${this.HOME_FOLDERNAME}`;
        this.generateStaticComponent(homeApplicationPath, this.clientframework, this.HOME_FOLDERNAME, () => {
            if(this.clientframework === 'react') {
                this.generateImportComponent(this.HOME_FOLDERNAME, this.MODULE_TEMPLATENAME, homeApplicationPath, () => {
                    callback();
                });
            } else if(this.clientframework !== 'react'){
                this.generateModule(this.HOME_FOLDERNAME, this.MODULE_TEMPLATENAME, homeApplicationPath, () => {
                    callback();
                });
            }
        });
    }

    // create user component from seed files
    async createUserComponent(callback) {
        if(this.clientframework !== 'react'){
            const userApplicationPath = `${this.projectGenerationPath}/src/app/${this.USER_FOLDERNAME}`;
            const profileApplicationPath = `${userApplicationPath}/${this.PROFILE_SETTINGS_FOLDERNAME}`;
            const buttonRendererApplicationPath = `${userApplicationPath}/${this.BUTTON_RENDERER_FOLDERNAME}`;
            this.generateStaticComponent(userApplicationPath, this.clientframework, this.USER_FOLDERNAME, () => {
                this.generateStaticComponent(profileApplicationPath, this.clientframework, this.PROFILE_SETTINGS_FOLDERNAME, () => {
                    this.generateStaticComponent(buttonRendererApplicationPath, this.clientframework, this.BUTTON_RENDERER_FOLDERNAME, () => {
                        if(this.clientframework === 'react'){
                            this.generateImportComponent(this.USER_FOLDERNAME, this.MODULE_TEMPLATENAME, userApplicationPath, () => {
                                this.generateImportComponent(this.PROFILE_SETTINGS_FOLDERNAME, this.MODULE_TEMPLATENAME, profileApplicationPath, () => {
                                    this.generateImportComponent(this.BUTTON_RENDERER_FOLDERNAME, this.MODULE_TEMPLATENAME, buttonRendererApplicationPath, () => {
                                        callback();
                                    });
                                });
                            });
                        } else if(this.clientframework !== 'react'){
                            this.generateModule(this.USER_FOLDERNAME, this.MODULE_TEMPLATENAME, userApplicationPath, () => {
                                this.generateModule(this.PROFILE_SETTINGS_FOLDERNAME, this.MODULE_TEMPLATENAME, profileApplicationPath, () => {
                                    this.generateModule(this.BUTTON_RENDERER_FOLDERNAME, this.MODULE_TEMPLATENAME, buttonRendererApplicationPath, () => {
                                        callback();
                                    });
                                });
                            });
                        }
                    });
                });
            });
        } else {
            callback();
        }

    }


    // create auth component from seed files
    async createAuthComponent(menus, seedTemplatePath, callback) {
        if(this.clientframework !== 'react'){
            this.allMenus(menus);
            console.log('sterst', menus);
            const templateName = `/authguard`;
            const templateNamev12 = `/authguardv12`;
            const templateNamev13 = `/authguardv13`;
            const fileName = `/auth.guard.ts`
            const AuthApplicationPath = `${this.projectGenerationPath}/src/app/${this.AUTH_FOLDERNAME}`;
            if (this.routingModuleInfo.importDependency.findIndex(x => x == `import { ${this.AUTH_GUARD_FILENAME} } from './${this.AUTH_FOLDERNAME}/${this.AUTH_FOLDERNAME}.guard';`) < 0) {
                this.routingModuleInfo.importDependency.push(`import { ${this.AUTH_GUARD_FILENAME} } from './${this.AUTH_FOLDERNAME}/${this.AUTH_FOLDERNAME}.guard';`);
            }
            await this.generateStaticComponent(AuthApplicationPath, this.clientframework, this.AUTH_FOLDERNAME, () => {
                let label = seedTemplatePath.split('/');
                if(label.includes('AngularV7')) {
                    this.frontendSupportWorker.generateFile(AuthApplicationPath, this.authTemplatePath, fileName, templateName, this.routingMenus, () => {
                        callback();
                    });
                } else if(label.includes('AngularV12')) {
                    this.frontendSupportWorker.generateFile(AuthApplicationPath, this.authTemplatePath, fileName, templateNamev12, this.routingMenus, () => {
                        callback();
                    });
                } else if(label.includes('AngularV13')) {
                    this.frontendSupportWorker.generateFile(AuthApplicationPath, this.authTemplatePath, fileName, templateNamev13, this.routingMenus, () => {
                        callback();
                    });
                }
            });
        } else {
            console.log('back');
            callback();
        }
    }



    //screenMenus
    allMenus(menus) {
        menus.forEach(menuElement => {
            if (menuElement.menu_option == true) {
                menuElement.menuDetails.forEach(elementScreenMenu => {
                    elementScreenMenu.screenmenu.forEach(elementScreenMenuDescription => {
                        elementScreenMenuDescription.description.screen.forEach(allMenus => {
                            const menuDetails = allMenus.toLowerCase();
                            if (menuDetails !== 'admin') {
                                this.routingMenus.push(menuDetails);
                            }
                        })
                    }), (err => {
                        return err;
                    })
                })
            }
        })
    }


    // add method in header component
    async generateAppFile(callback) {
        if(this.clientframework !== 'react'){
            const headerComponentPath = `${this.projectGenerationPath}/src/app`;
            this.modifyAppFile(headerComponentPath, this.HEADER_FOLDERNAME, () => {
                callback();
            });
        } else {
            console.log('back');
            callback();
        }
    }

    async generateStaticComponent(applicationPath, clientframework, folderName, callback) {
        let loginSeedPath;
        if (folderName === 'profilesettings' || folderName === 'button-renderer') {
            loginSeedPath = `${this.seedPath}/user/${folderName}`;
        } else if (folderName === 'updateauthorization' || folderName === 'button-rendered') {
            loginSeedPath = `${this.seedPath}/authorization/${folderName}`;
        } else if (clientframework === 'react') {
            loginSeedPath = `${this.seedPath}/src/app/${folderName}`;
        } else {
            loginSeedPath = `${this.seedPath}/${folderName}`;
        }
        Common.createFolders(applicationPath);
        let fileArray = await fs.readdirSync(loginSeedPath);
        asyncLoop(fileArray, (element, next) => {
            this.frontendSupportWorker.generateStaticFile(applicationPath, loginSeedPath, element, () => {
                next();
            });
        }, err => {
            callback();
        });
        // fs.readdirSync(loginSeedPath).forEach(async fileElement => {
        //     this.frontendSupportWorker.generateStaticFile(applicationPath, loginSeedPath, fileElement, () => {
        //         console.log('222222222222', folderName);
        //         callback();
        //     });
        // });


    }

    async generateServiceComponent(sharedObj, folderName, templateName, applicationPath, callback) {
        const fileName = `${folderName}.${this.SERVICE_NAME}.ts`;
        const temp = {
            className: folderName.charAt(0).toUpperCase() + folderName.slice(1),
            shared: {
                className: `${sharedObj.className}${this.SERVICE_NAME.charAt(0).toUpperCase() + this.SERVICE_NAME.slice(1)}`,
                objectName: `${sharedObj.className.charAt(0).toLowerCase() + sharedObj.className.slice(1)}${this.SERVICE_NAME.charAt(0).toUpperCase() + this.SERVICE_NAME.slice(1)}`,
                variableName: sharedObj.variableName,
                variableUploadName: `\${this.sharedService.UPLOAD_API `
            }
        }
        this.frontendSupportWorker.generateFile(applicationPath, this.authTemplatePath, fileName, templateName, temp, () => {
            callback();
        });
    }

    async generateModule(folderName, templateName, applicationPath, callback) {
        let fileName;
        if (folderName !== 'button-renderer' && folderName !== 'button-rendered') {
            if (folderName !== 'profilesettings' && folderName !== 'updateauthorization') {
                fileName = `${folderName}.${this.MODULE_NAME}.ts`;
            }
        }
        const tempImports = [];
        const tempDeclarations = [];
        const tempEntryComponents = [];
        const tempSchemas = [];

        // app module dependency
        // this.appModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)} } from './${folderName}/${folderName}.module';`);
        // this.appModuleInfo.imports.push(`${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)}`);
        if (folderName !== 'profilesettings' && folderName !== 'updateauthorization') {
            if (folderName !== 'button-renderer' && folderName !== 'button-rendered') {
                if (this.appModuleInfo.importDependency.findIndex(x => x == `import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)} } from './${folderName}/${folderName}.module';`) < 0) {
                    this.appModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)} } from './${folderName}/${folderName}.module';`);
                    this.appModuleInfo.imports.push(`${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)}`);
                    console.log('-----------------inside if appmodule with folder-----------------', this.appModuleInfo, folderName)
                }

            }
        }

        // if (folderName === 'authorization') {
        //     this.appModuleInfo.importDependency.push(`import { AuthorizationComponent } from './${folderName}/${folderName}.component';`);
        //     this.appModuleInfo.declarations.push(`AuthorizationComponent`);
        // }

        // if (folderName === 'manageroles') {
        //     this.appModuleInfo.importDependency.push(`import { ManagerolesComponent } from './${folderName}/${folderName}.component';`);
        //     this.appModuleInfo.declarations.push(`ManagerolesComponent`);
        // }

        // if (folderName === 'manageusers') {
        //     this.appModuleInfo.importDependency.push(`import { ManageusersComponent } from './${folderName}/${folderName}.component';`);
        //     this.appModuleInfo.declarations.push(`ManageusersComponent`);
        // }

        const temp = {
            importDependency: [],
            imports: null,
            declarations: null,
            entryComponents: null,
            schemas: null,
            className: folderName.charAt(0).toUpperCase() + folderName.slice(1)
        }
        if (folderName !== 'profilesettings' && folderName !== 'updateauthorization') {
            if (folderName !== 'button-renderer' && folderName !== 'button-rendered') {
                temp.importDependency.push({ dependencyname: 'NgModule', dependencyPath: '@angular/core' });
                temp.importDependency.push({ dependencyname: 'CommonModule', dependencyPath: '@angular/common' });
                temp.importDependency.push({ dependencyname: 'FormsModule, ReactiveFormsModule', dependencyPath: '@angular/forms' });
                temp.importDependency.push({ dependencyname: 'RouterModule', dependencyPath: '@angular/router' });
                temp.importDependency.push({ dependencyname: 'I18NextModule', dependencyPath: 'angular-i18next' });

                temp.importDependency.push({ dependencyname: `${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component`, dependencyPath: `./${folderName}.component` });

                if (folderName === 'user') {
                    temp.importDependency.push({ dependencyname: 'AgGridModule', dependencyPath: 'ag-grid-angular' });
                    temp.importDependency.push({ dependencyname: `ProfilesettingsComponent`, dependencyPath: `./profilesettings/profilesettings.component` });
                    temp.importDependency.push({ dependencyname: `ButtonRendererComponent`, dependencyPath: `./button-renderer/button-renderer.component` });

                    tempImports.push(`AgGridModule.withComponents([])`);
                    tempDeclarations.push(`ProfilesettingsComponent`);
                    tempDeclarations.push(`ButtonRendererComponent`);
                    tempEntryComponents.push(`ButtonRendererComponent`)
                }
                if (folderName === 'authorization') {
                    temp.importDependency.push({ dependencyname: `UpdateauthorizationComponent`, dependencyPath: `./updateauthorization/updateauthorization.component` });
                    temp.importDependency.push({ dependencyname: 'AgGridModule', dependencyPath: 'ag-grid-angular' });
                    temp.importDependency.push({ dependencyname: 'NgSelectModule', dependencyPath: '@ng-select/ng-select' })

                    tempImports.push(`AgGridModule.withComponents([])`);
                    tempImports.push(`NgSelectModule`);
                    tempDeclarations.push(`UpdateauthorizationComponent`);
                    tempSchemas.push(`CUSTOM_ELEMENTS_SCHEMA`)
                }
                tempImports.push(`CommonModule`);
                tempImports.push(`FormsModule`);
                tempImports.push(`ReactiveFormsModule`);
                tempImports.push(`RouterModule`);
                tempImports.push(`I18NextModule.forRoot()`);

                tempDeclarations.push(`${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component`);

                temp.imports = tempImports.join(',\n');
                temp.declarations = tempDeclarations.join(',\n');
                temp.entryComponents = tempEntryComponents.join(',\n');
                temp.schemas = tempSchemas.join(',\n');
            }
        }
        // app routing module
        if (folderName !== 'button-renderer' && folderName !== 'button-rendered' ) {
            if (this.routingModuleInfo.importDependency.findIndex(x => x == `import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component } from './${folderName}/${folderName}.component';`) < 0) {
                // if (folderName == this.LOGIN_FOLDERNAME) {
                //     this.routingModuleInfo.path.push(`{ path: '', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, pathMatch: 'full' }`);
                // }
                if (folderName === 'profilesettings') {
                    this.routingModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component } from './user/${folderName}/${folderName}.component';`);
                } else if(folderName !== 'updateauthorization'){
                    this.routingModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component } from './${folderName}/${folderName}.component';`);
                }
                if (folderName === 'updateauthorization') {
                    this.routingModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component } from './authorization/${folderName}/${folderName}.component';`);
                }
                if (folderName === 'profilesettings') {
                    let pathName = folderName.split('settings')[0]
                    this.routingModuleInfo.path.push(`{ path: '${pathName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] }`);
                } else if (folderName === 'updateauthorization') {
                    this.routingModuleInfo.path.push(`{ path: '${folderName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] }`);
                } else if (folderName === 'user') {
                    let pathName = `${folderName}management`
                    this.routingModuleInfo.path.push(`{ path: '${pathName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] }`);
                } else if (folderName === 'home' || folderName === 'authorization' || folderName === 'manageroles' || folderName === 'manageusers' || folderName === 'managecontrol') {
                    this.routingModuleInfo.path.push(`{ path: '${folderName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] }`);
                } else {
                    this.routingModuleInfo.path.push(`{ path: '${folderName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component }`);
                    console.log('test the sefscreen', this.routingModuleInfo.path);
                }
                const pushSefData = this.routingModuleInfo.path.includes(`{ path: 'sefscreen', component: SefscreenComponent, canActivate: [AuthGuard] }`);
                const pushSefDepend = this.routingModuleInfo.importDependency.includes(`import { SefscreenComponent } from './sefscreen/sefscreen.component';`);
                if(!pushSefData && !pushSefDepend){
                    folderName = 'sefscreen';
                    this.routingModuleInfo.path.push(`{ path: '${folderName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] }`);
                    this.routingModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component } from './${folderName}/${folderName}.component';`);
                    console.log('test the sefscreen', this.routingModuleInfo.path, this.routingModuleInfo.importDependency);
                    
                }    
            }
        }
        if (folderName !== 'button-renderer' && folderName !== 'button-rendered') {
            if (folderName !== 'profilesettings' && folderName !== 'updateauthorization') {
                this.frontendSupportWorker.generateFile(applicationPath, this.authTemplatePath, fileName, templateName, temp, () => {
                    callback();
                });
            } else {
                callback();
            }
        } else {
            callback();
        }
    }

    async modifyFiles(callback) {
        let appModulePath;
        if(this.clientframework === 'react'){
            console.log('react routing modulepath--', this.clientframework);
            appModulePath = `${this.projectGenerationPath}/src`;
        } else if(this.clientframework !== 'react'){
            appModulePath = `${this.projectGenerationPath}/src/app`;
            this.modifyAppModuleFile(appModulePath);
        }
        this.modifyAppRoutingModuleFile(appModulePath);
        this.modifyPackageJsonFile(() => {
            // modify app module
            // import httpclientmodule in app module files
            // this.appModuleInfo.importDependency.push();
            // this.appModuleInfo.imports.push();
            if (this.appModuleInfo.importDependency.findIndex(x => x == this.httpClient.importDependency) < 0) {
                this.appModuleInfo.importDependency.push(this.httpClient.importDependency);
                this.appModuleInfo.imports.push(this.httpClient.imports);
            }

            if (this.appModuleInfo.importDependency.findIndex(x => x == this.FormModule.importDependency) < 0) {
                this.appModuleInfo.importDependency.push(this.FormModule.importDependency);
                this.appModuleInfo.imports.push(this.FormModule.imports);
            }
            this.appModuleInfo.importDependency.push(this.SefScreenModule.importDependency);
            this.appModuleInfo.imports.push(this.SefScreenModule.imports);
            console.log('final app module importing ----- ', this.appModuleInfo);
            console.log('final routing modules importing ----- ', this.routingModuleInfo);
            console.log('final React routing importing ----- ', this.reactRoutingModuleInfo);
            if(this.clientframework !== 'react'){
                this.frontendSupportWorker.generateFile(appModulePath, this.authTemplatePath, this.APP_MODULE_FILENAME, this.MODIFY_APP_MODULE_TEMPLATENAME, this.appModuleInfo, () => {
                    // modify app routing file
                    this.frontendSupportWorker.generateFile(appModulePath, this.authTemplatePath, this.APP_ROUTING_MODULE_FILENAME, this.MODIFY_APP_ROUTNG_TEMPLATENAME, this.routingModuleInfo, () => {
                        callback();
                    });
                });
            } else if(this.clientframework === 'react'){
                // modify a react app routing file
                this.frontendSupportWorker.generateFile(appModulePath, this.authTemplatePath, this.REACT_ROUTING_FILENAME, this.REACT_MODIFY_ROUTING_TEMPLATENAME, this.reactRoutingModuleInfo, () => {
                    callback();
                });
            }
        });
        // console.log('modifyu files values are -------  ', this.appModuleInfo);
        // console.log('modifyu files values are -app routing files a------  ', this.routingModuleInfo);
    }

    async modifyAppFile(appPath, fileName, callback) {
        console.log('modufle app file path are ----  ', `${appPath}/${fileName}/${fileName}/${fileName}.component.ts`)
        const modifyFile = fs.readFileSync(`${appPath}/${fileName}/${fileName}.component.ts`).toString().split("\n");
        // modifyFile.forEach((appElement, index) => {
        //     console.log('filename of appfile are --------  ', appElement);
        //     const isImportService = false;
        //     if (appElement.includes(`import`) && isImportService) {

        //     }
        // });
        console.log('modify app file values are ----  ', modifyFile);
        const importIndex = modifyFile.findIndex(x => /import.*/.test(x));
        console.log('import index ----->>>>>>>>>>  ', importIndex);
        if (importIndex > -1) {
            modifyFile.splice(importIndex + 1, 0, `import { Router, NavigationEnd } from '@angular/router';`)
            modifyFile.splice(importIndex + 1, 0, `import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';`)
            modifyFile.splice(importIndex + 2, 0, `import { ${this.LOGIN_FOLDERNAME.charAt(0).toUpperCase() + this.LOGIN_FOLDERNAME.slice(1).toLowerCase()}Service } from '../${this.LOGIN_FOLDERNAME.toLowerCase()}/${this.LOGIN_FOLDERNAME.toLowerCase()}.service';`)
            modifyFile.splice(importIndex + 3, 0, `import { ${this.BROADCAST_FOLDERNAME.charAt(0).toUpperCase() + this.BROADCAST_FOLDERNAME.slice(1).toLowerCase()}Service } from '../${this.AUTH_FOLDERNAME.toLowerCase()}/${this.BROADCAST_FOLDERNAME.toLowerCase()}.service';`)
            modifyFile.splice(importIndex + 2, 0, `import { ${this.SHARED_FOLDER.charAt(0).toUpperCase() + this.SHARED_FOLDER.slice(1).toLowerCase()}Service } from '../../${this.SHARED_FOLDER.toLowerCase()}/${this.SHARED_FOLDER.toLowerCase()}.service';`)
            modifyFile.splice(importIndex + 3, 0, `import { ${this.USER_FOLDERNAME.charAt(0).toUpperCase() + this.USER_FOLDERNAME.slice(1).toLowerCase()}Service } from '../${this.USER_FOLDERNAME.toLowerCase()}/${this.USER_FOLDERNAME.toLowerCase()}.service';`)
        }
        let constructorIndex = modifyFile.findIndex(x => /constructor.*/.test(x));
        if (constructorIndex > -1) {
            // constructor params
            const temp = [
                `@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService`,
                `private router: Router`,
                `private ${this.LOGIN_FOLDERNAME.toLowerCase()}Service: ${this.LOGIN_FOLDERNAME.charAt(0).toUpperCase() + this.LOGIN_FOLDERNAME.slice(1).toLowerCase()}Service`,
                `public ${this.BROADCAST_FOLDERNAME.toLowerCase()}Service: ${this.BROADCAST_FOLDERNAME.charAt(0).toUpperCase() + this.BROADCAST_FOLDERNAME.slice(1).toLowerCase()}Service`,
                `private ${this.SHARED_FOLDER.toLowerCase()}Service: ${this.SHARED_FOLDER.charAt(0).toUpperCase() + this.SHARED_FOLDER.slice(1).toLowerCase()}Service`,
                `public ${this.USER_FOLDERNAME.toLowerCase()}Service: ${this.USER_FOLDERNAME.charAt(0).toUpperCase() + this.USER_FOLDERNAME.slice(1).toLowerCase()}Service`
            ];
            modifyFile.splice(constructorIndex + 1, 0, temp.join(',\n'));

            // variable declarations
            const tempVariable = [
                `public isAdminUser = false`,
                `public UserName:any = ''`,
                `public images:any`,
                `public url:any = ''`,
                `mysubscription: any`,
                `public authArray: any`,
                `public userId: string | null = ''`,
                `public currentLanguage: String = ''`,
                `public confirmLangChangeModal: String = 'none'`,
                `public language = 'en'`,
                `public languages = ['en', 'ta', 'es']`
            ]
            modifyFile.splice(constructorIndex, 0, tempVariable.join(';\n'));
        }
        let constructorMethodIndex = modifyFile.findIndex(x => /\)*.\{\s+\}/.test(x));
        if (constructorMethodIndex > -1) {
            const tempMethod = [
                `) {`,
                this.broadcastMethod,
                this.secondconstruct,
                this.routeMethod,
                this.isAdminUser,
                `}`
            ]
            // let temp = `) }`;
            // temp += tempMethod.join('\n');
            // temp += 
            console.log('constructor method index values are ', modifyFile[constructorMethodIndex])
            modifyFile.splice(constructorMethodIndex, 1, tempMethod.join('\n'));
        }
        let methodCount = 0;
        modifyFile.forEach((methodElement, methodIndex) => {
            if (methodElement == `}`) {
                methodCount = methodIndex;
            }
        })
        if (methodCount > -1) {
            let label = this.seedPath.split('/');
            if(label.includes('AngularV7')) {
                modifyFile.splice(methodCount, 0, this.logoutMethod);
                modifyFile.splice(methodCount, 0, this.isApplicableMethod);
                modifyFile.splice(methodCount, 0, this.confirmLangModel);
                modifyFile.splice(methodCount, 0, this.confirmLangChange);
                modifyFile.splice(methodCount, 0, this.onCloseHandled);
                modifyFile.splice(methodCount, 0, this.changeLanguage);
                modifyFile.splice(methodCount, 0, this.updateLangChange);
                modifyFile.splice(methodCount, 0, this.profileImageChange);
            } else if(label.includes('AngularV12')) {
                modifyFile.splice(methodCount, 0, this.logoutMethodV12);
                modifyFile.splice(methodCount, 0, this.isApplicableMethodV12);
                modifyFile.splice(methodCount, 0, this.confirmLangModelV12);
                modifyFile.splice(methodCount, 0, this.confirmLangChange);
                modifyFile.splice(methodCount, 0, this.onCloseHandled);
                modifyFile.splice(methodCount, 0, this.changeLanguageV12);
                modifyFile.splice(methodCount, 0, this.updateLangChange);
                modifyFile.splice(methodCount, 0, this.profileImageChange);
            } else if(label.includes('AngularV13')) {
                modifyFile.splice(methodCount, 0, this.logoutMethodV13);
                modifyFile.splice(methodCount, 0, this.isApplicableMethodV13);
                modifyFile.splice(methodCount, 0, this.confirmLangModelV13);
                modifyFile.splice(methodCount, 0, this.confirmLangChange);
                modifyFile.splice(methodCount, 0, this.onCloseHandled);
                modifyFile.splice(methodCount, 0, this.changeLanguageV13);
                modifyFile.splice(methodCount, 0, this.updateLangChange);
                modifyFile.splice(methodCount, 0, this.profileImageChange);
            } else {
                modifyFile.splice(methodCount, 0, this.logoutMethod);
                modifyFile.splice(methodCount, 0, this.isApplicableMethod);
                modifyFile.splice(methodCount, 0, this.confirmLangModel);
                modifyFile.splice(methodCount, 0, this.confirmLangChange);
                modifyFile.splice(methodCount, 0, this.onCloseHandled);
                modifyFile.splice(methodCount, 0, this.changeLanguage);
                modifyFile.splice(methodCount, 0, this.updateLangChange);
                modifyFile.splice(methodCount, 0, this.profileImageChange);
            }
        }
        // let count = modifyFile.length - 1;
        // const methodCount = 0;
        // do {
        //     if (modifyFile[count] == `}`) {

        //     } else {
        //         count--;
        //     }
        // } while (count > 0);
        // if (methodCount > 0) {
        //     console.log('methodcount are ----->>   ', methodCount);
        //     const temp = ` logout() {
        //         const temp = {
        //           id: sessionStorage.getItem('Id')
        //         }
        //         this.loginService.Logout(temp).subscribe(data => {
        //           sessionStorage.clear();
        //           this.router.navigate(['']);
        //         }, error => {
        //           console.error('error:', error);
        //         });
        //       }`
        //     modifyFile.splice(modifyFile.length, 0, temp);
        // }
        // console.log('constructorIndex index ----->>>>>>>>>>  ', constructorIndex);
        // const index = modifyFile.lastIndexOf(`}`)
        // if(index > -1) {

        // }
        // console.log('last } index ----->>>>>>>>>>  ', index);
        await this.frontendSupportWorker.writeStaticFile(`${appPath}/${fileName}`, `${fileName}.component.ts`, modifyFile, () => {
            callback();
        });
    }

    modifyAppModuleFile(appModulePath) {
        appModulePath += `/${this.APP_MODULE_FILENAME}`;
        fs.readFileSync(appModulePath).toString().split("\n").forEach((appElement, index, fileData) => {
            console.log("fileData--->>", fileData)
            if (appElement.includes('import') && appElement.includes('from')) {
                console.log('all import depenc are -11-  ', this.appModuleInfo);
                console.log('all import depenc are -22-  ', this.appModuleInfo.importDependency.findIndex(x => x == appElement));
                if (this.appModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                    this.appModuleInfo.importDependency.unshift(appElement);
                }
            }
            if (appElement.includes('declarations')) {
                this.isAppModule.declaration = true;
            }
            if (appElement.includes('imports')) {
                this.isAppModule.imports = true;
            }
            if (appElement.includes('providers')) {
                this.isAppModule.providers = true;
            }
            if (appElement.includes('bootstrap')) {
                this.isAppModule.boostrap = true;
            }
            if (appElement.includes('export class')) {
                const regex = /[\w-]*Module/g;
                this.appModuleInfo.className = appElement.match(regex)[0].replace('Module', '');
            }
            if (appElement.includes(']')) {
                this.isAppModule.declaration = false;
                this.isAppModule.imports = false;
                this.isAppModule.providers = false;
                this.isAppModule.boostrap = false;
                this.isAppModule.declaration = false;
            }
            if (this.isAppModule.declaration) {
                if (!appElement.includes('[') && !appElement.includes(']')) {
                    if (this.appModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                        this.appModuleInfo.declarations.unshift(appElement.replace(',', ''));
                    }
                }
            }

            if (this.isAppModule.imports) {
                if (!appElement.includes('[') && !appElement.includes(']')) {
                    if (this.appModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                        const existingImport = ['  UserModule,','UserModule','UserModule,', 'HomeModule,', 'SignupModule,', 'LoginModule,']
                        existingImport.forEach((e) => {
                            const importDataIndex = fileData.indexOf(e);
                            if (importDataIndex !== -1) {
                                fileData.splice(importDataIndex, 1)
                            }
                        })
                        this.appModuleInfo.imports.unshift(appElement.replace(',', ''));
                    }
                }
            }

            if (this.isAppModule.providers) {
                if (!appElement.includes('[') && !appElement.includes(']')) {
                    if (this.appModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                        this.appModuleInfo.providers.unshift(appElement.replace(',', ''));
                    }
                }
            }

            if (this.isAppModule.boostrap) {
                if (!appElement.includes('[') && !appElement.includes(']')) {
                    if (this.appModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                        this.appModuleInfo.boostrap.unshift(appElement.replace(',', ''));
                    }
                }
            }
        })
        console.log('after completed module app modules are ---- ', this.appModuleInfo);
    }

    modifyAppRoutingModuleFile(appRoutingModulePath) {
        if(this.clientframework === 'react') {
            console.log('react routing file generating')
            appRoutingModulePath += `/${this.REACT_ROUTING_FILENAME}`;
            fs.readFileSync(appRoutingModulePath).toString().split("\n").forEach((appElement) => {
                console.log('app routing each one are -------  ', appElement);
                if (appElement.includes('import') && appElement.includes('from')) {
                    if (this.reactRoutingModuleInfo.importDependency.findIndex(x => x == appElement) <= 0) {
                        //if (appElement.includes('.component')) {
                            this.reactRoutingModuleInfo.importDependency.push(appElement);
                        // } else {
                        //     this.routingModuleInfo.importDependency.unshift(appElement);
                        // }
                    }

                }
                if(appElement.includes('routes: any')){
                    this.isRoutingModule.path = true;
                }
                if (appElement.includes(']')) {
                    this.isRoutingModule.path = false;

                }
                if (this.isRoutingModule.path) {
                    console.log('is appElement.includes( path matched  ', appElement);
                    if (!appElement.includes('[') && !appElement.includes(']')) {
                        console.log('reactrouting file', this.reactRoutingModuleInfo);
                        if (this.reactRoutingModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                            if (appElement.includes(`redirectTo: ''`)) {
                                this.reactRoutingModuleInfo.path.unshift(appElement.replace('},', '}'));
                            } else if (appElement.includes(`component: Template`)) {
                                console.log('appelement template test', appElement, 'data from db', appElement.includes(`{  path: \"\",  component: Template },`))
                                this.reactRoutingModuleInfo.path.push(appElement.replace(`{  path: \"\",  component: Template },`, `{ path: \"/\", component: Template, },`));
                            } else {
                                this.reactRoutingModuleInfo.path.push(appElement.replace('},', `, canActivate: [${this.AUTH_GUARD_FILENAME}] }`));
                            }
                        }
                    }
                }
            });
        }
        else if(this.clientframework !== 'react') {
            appRoutingModulePath += `/${this.APP_ROUTING_MODULE_FILENAME}`;
            fs.readFileSync(appRoutingModulePath).toString().split("\n").forEach((appElement) => {
                console.log('app routing each one are -------  ', appElement);
                if (appElement.includes('import') && appElement.includes('from')) {
                    if (this.routingModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                        if (appElement.includes('.component')) {
                            this.routingModuleInfo.importDependency.push(appElement);
                        } else {
                            this.routingModuleInfo.importDependency.unshift(appElement);
                        }
                    }

                }
                if (appElement.includes('routes: Routes')) {
                    this.isRoutingModule.path = true;
                }
                if (appElement.includes(']')) {
                    this.isRoutingModule.path = false;

                }
                if (this.isRoutingModule.path) {
                    console.log('is appElement.includes( path matched  ', appElement);
                    if (!appElement.includes('[') && !appElement.includes(']')) {
                        if (this.routingModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                            if (appElement.includes(`redirectTo: ''`)) {
                                this.routingModuleInfo.path.unshift(appElement.replace('},', '}'));
                            } else if (appElement.includes(`component: TemplateComponent`)) {
                                this.routingModuleInfo.path.push(appElement.replace(`{ path: \'\', component: TemplateComponent },`, `{ path: \'\', component: TemplateComponent , pathMatch: \'full\' },`));
                            } else {
                                this.routingModuleInfo.path.push(appElement.replace('},', `, canActivate: [${this.AUTH_GUARD_FILENAME}] }`));
                            }
                        }
                    }
                }
            });
        }
    }

    async modifyPackageJsonFile(callback) {
        const packageInfo = fs.readFileSync(`${this.projectGenerationPath}/${this.PACKAGE_FILENAME}`).toString().split("\n");
        console.log('after separate package json ----  ', packageInfo);
        console.log('after separate package json -indexOf---  ', packageInfo.indexOf(`"dependencies": {`));
        packageInfo.forEach(element => console.log('each package element values are ---  ', element));
        const index = packageInfo.findIndex(x => x === '  "dependencies": {');
        console.log('package index rae -------  ', index);
        if (index > -1) {
            if(this.clientframework === 'react') {
                this.reactAuthPackageDependency.forEach(packageElement => {
                    if (packageInfo.findIndex(item => item === packageElement) < 0) {
                        packageInfo.splice(index + 3, 0, packageElement);
                    }
                })
            } else if(this.clientframework !== 'react') {
                this.authPackageDependency.forEach(packageElement => {
                    if (packageInfo.findIndex(item => item === packageElement) < 0) {
                        packageInfo.splice(index + 10, 0, packageElement);
                    }
                })
            }
        this.frontendSupportWorker.writeStaticFile(this.projectGenerationPath, this.PACKAGE_FILENAME, packageInfo, () => {
            callback();
        });
        }
        console.log('after added values in package are -------  ', packageInfo);
    }

    //React file import file adding on particular routing array
    async generateImportComponent(folderName, templateName, applicationPath, callback) {
        let fileName;
        if (folderName !== 'button-renderer') {
            if (folderName !== 'profilesettings') {
                fileName = `${folderName}.${this.MODULE_NAME}.tsx`;
            }
        }
        const tempImports = [];
        const tempDeclarations = [];
        const tempEntryComponents = [];

        // app module dependency
        // this.appModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)} } from './${folderName}/${folderName}.module';`);
        // this.appModuleInfo.imports.push(`${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)}`);
            // if (folderName !== 'profilesettings') {
            //     if (folderName !== 'button-renderer') {
            //         if (this.appModuleInfo.importDependency.findIndex(x => x == `import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)} } from './${folderName}/${folderName}.module';`) < 0) {
            //             this.appModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)} } from './${folderName}/${folderName}.module';`);
            //             this.appModuleInfo.imports.push(`${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)}`);
            //             console.log('-----------------inside if appmodule with folder-----------------', this.appModuleInfo, folderName)
            //         }

            //     }
            // }

        // if (folderName === 'authorization') {
        //     this.appModuleInfo.importDependency.push(`import { AuthorizationComponent } from './${folderName}/${folderName}.component';`);
        //     this.appModuleInfo.declarations.push(`AuthorizationComponent`);
        // }

        // if (folderName === 'manageroles') {
        //     this.appModuleInfo.importDependency.push(`import { ManagerolesComponent } from './${folderName}/${folderName}.component';`);
        //     this.appModuleInfo.declarations.push(`ManagerolesComponent`);
        // }

        // if (folderName === 'manageusers') {
        //     this.appModuleInfo.importDependency.push(`import { ManageusersComponent } from './${folderName}/${folderName}.component';`);
        //     this.appModuleInfo.declarations.push(`ManageusersComponent`);
        // }

            const temp = {
                importDependency: [],
                imports: null,
                declarations: null,
                entryComponents: null,
                className: folderName.charAt(0).toUpperCase() + folderName.slice(1)
            }
            // if (folderName !== 'profilesettings') {
            //     if (folderName !== 'button-renderer') {
            //         temp.importDependency.push({ dependencyname: 'NgModule', dependencyPath: '@angular/core' });
            //         temp.importDependency.push({ dependencyname: 'CommonModule', dependencyPath: '@angular/common' });
            //         temp.importDependency.push({ dependencyname: 'FormsModule, ReactiveFormsModule', dependencyPath: '@angular/forms' });
            //         temp.importDependency.push({ dependencyname: 'RouterModule', dependencyPath: '@angular/router' });
            //         temp.importDependency.push({ dependencyname: 'I18NextModule', dependencyPath: 'angular-i18next' });

            //         temp.importDependency.push({ dependencyname: `${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component`, dependencyPath: `./${folderName}.component` });

            //         if (folderName === 'user') {
            //             temp.importDependency.push({ dependencyname: 'AgGridModule', dependencyPath: 'ag-grid-angular' });
            //             temp.importDependency.push({ dependencyname: `ProfilesettingsComponent`, dependencyPath: `./profilesettings/profilesettings.component` });
            //             temp.importDependency.push({ dependencyname: `ButtonRendererComponent`, dependencyPath: `./button-renderer/button-renderer.component` });

            //             tempImports.push(`AgGridModule.withComponents([])`);
            //             tempDeclarations.push(`ProfilesettingsComponent`);
            //             tempDeclarations.push(`ButtonRendererComponent`);
            //             tempEntryComponents.push(`ButtonRendererComponent`)
            //         }
            //         tempImports.push(`CommonModule`);
            //         tempImports.push(`FormsModule`);
            //         tempImports.push(`ReactiveFormsModule`);
            //         tempImports.push(`RouterModule`);
            //         tempImports.push(`I18NextModule.forRoot()`);

            //         tempDeclarations.push(`${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component`);

            //         temp.imports = tempImports.join(',\n');
            //         temp.declarations = tempDeclarations.join(',\n');
            //         temp.entryComponents = tempEntryComponents.join(',\n');
            //     }
            // }
        // app routing module
        if (folderName !== 'button-renderer') {
            if (this.reactRoutingModuleInfo.importDependency.findIndex(x => x == `import  ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}  from './app/${folderName}/${folderName}';`) < 0) {
                // if (folderName == this.LOGIN_FOLDERNAME) {
                //     this.reactRoutingModuleInfo.path.push(`{ path: '', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, pathMatch: 'full' }`);
                // }
                if (folderName === 'profilesettings') {
                    this.reactRoutingModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component } from './user/${folderName}/${folderName}.component';`);
                } else {
                    this.reactRoutingModuleInfo.importDependency.push(`import  ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}  from './app/${folderName}/${folderName}';`);
                }
                if (folderName === 'profilesettings') {
                    let pathName = folderName.split('settings')[0]
                    this.reactRoutingModuleInfo.path.push(`{ path: '/${pathName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] }`);
                } else if (folderName === 'user') {
                    let pathName = `${folderName}management`
                    this.reactRoutingModuleInfo.path.push(`{ path: '/${pathName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] }`);
                } else if (folderName === 'home' || folderName === 'authorization' || folderName === 'manageroles' || folderName === 'manageusers') {
                    this.reactRoutingModuleInfo.path.push(`{ path: '/${folderName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)} }`);
                } else {
                    this.reactRoutingModuleInfo.path.push(`{ path: '/${folderName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)} }`);
                    console.log('test the sefscreen', this.reactRoutingModuleInfo.path);
                }
                // const pushSefData = this.reactRoutingModuleInfo.path.includes(`{ path: 'sefscreen', component: Sefscreen, canActivate: [AuthGuard] }`);
                // const pushSefDepend = this.reactRoutingModuleInfo.importDependency.includes(`import { Sefscreen } from './app/sefscreen/sefscreen';`);
                // if(!pushSefData && !pushSefDepend){
                //     folderName = 'sefscreen';
                //     this.reactRoutingModuleInfo.path.push(`{ path: '${folderName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] }`);
                //     this.reactRoutingModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component } from './${folderName}/${folderName}.component';`);
                //     console.log('test the sefscreen', this.reactRoutingModuleInfo.path, this.reactRoutingModuleInfo.importDependency);
                    
                // }    
            }
            callback();
        }
        // if (folderName !== 'button-renderer') {
        //     if (folderName !== 'profilesettings') {
        //         // this.frontendSupportWorker.generateFile(applicationPath, this.authTemplatePath, fileName, templateName, temp, () => {
        //         //     callback();
        //         // });
        //     } else {
        //         callback();
        //     }
        // } else {
        //     callback();
        // }
    }
}