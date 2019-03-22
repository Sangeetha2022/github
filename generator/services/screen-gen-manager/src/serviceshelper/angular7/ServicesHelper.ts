import * as fs from 'fs';
import * as util from 'util';
import { ScreenWorker } from '../../worker/angular7/ScreenWorker';
import { TemplateWorker } from '../../worker/angular7/TemplateWorker';
// import {  } from '../'

const screenWorker = new ScreenWorker();
const templateWorker = new TemplateWorker();
// group caller
export class ServicesHelper {

  private importAppDependency = [];
  private importComponent = [];
  private importComponentDependency = [];
  private componentPath = [];
  private packageJson = [];
  private angularCssJson = [];
  private angularScriptJson = [];


  private initalizeVariable() {
    this.importAppDependency = [];
    this.importComponent = [];
    this.importComponentDependency = [];
    this.componentPath = [];
    this.packageJson = [];
    this.angularCssJson = [];
    this.angularScriptJson = [];
  }

  // generate template related folder and files
  public createTemplate(template, path, folders,
    assetsFile, componentObj, assetImage, callback) {
    console.log('generate path firest---- ', path);
    templateWorker.generateAssetsFile(assetsFile, path, (assetResponse) => {
      templateWorker.generateAssetImage(assetImage, path, (imageResponse) => {
        templateWorker.generateFooter(template.footer, folders.footer, path, componentObj, (footerResponse) => {
          templateWorker.generateTemplate(template.content, folders.content, path, componentObj, (templateResponse) => {
            templateWorker.generateHeader(template.header, folders.header, path, componentObj, (headerResponse) => {
              callback(headerResponse);
            })
          })
        })
      })
    })
  }

  // generate constant files and e2e related files
  public e2eFile(path, callback) {
    screenWorker.generateE2E(path, (response) => {
      screenWorker.generateEnvironment(path, (envResponse) => {
        screenWorker.generateConstantFile(path, (constResponse) => {
          callback(constResponse);
        })
      })
    })
  }

  // generate karma and src related constant files
  public SrcFolder(path, callback) {
    screenWorker.generateSrcConstantFile(path, (constResponse) => {
      screenWorker.generateSrcTsFile(path, (tsResponse) => {
        screenWorker.generateKarmaFile(path, (karmaResponse) => {
          callback(karmaResponse);
        })
      })
    })
  }

  // generate index.html and style.scss file
  public indexAndStyleFiles(path, script, stylesheect, style, title, callback) {
    screenWorker.generateIndexFile(path, script, stylesheect, title, (indexResponse) => {
      screenWorker.generateStylesFile(path, style, (styleResponse) => {
        callback(styleResponse);
      })
    })
  }
  // generate app.routing and app.module files
  public routingAndModuleFiles(path, folderName, importRouteComponent, importAppComponent, importPath, importModuleDependency, callback) {
    screenWorker.generateRoutingFile(path, importRouteComponent, importPath, (routingResponse) => {
      screenWorker.generateAppModuleFile(path, folderName,
        importAppComponent, importModuleDependency, (moduleResponse) => {
          callback(moduleResponse);
        })
    })
  }

  // generate angular.json and package.json file
  public angularAndPackageFile(path, folderName, cssArray, scriptArray, packageDependency, callback) {
    screenWorker.generateAngularJsonFile(path, folderName, cssArray, scriptArray, (angResponse) => {
      console.log('angular and package foldername are --- ', folderName);
      screenWorker.generatePackageJsonFile(path, folderName, packageDependency, (packageResponse) => {
        callback(packageResponse);
      })

    })
  }

  // generate app component files
  public createAppComponent(path, folderName, appHtml, styles, callback) {
    screenWorker.generateAppHtmlFile(path, folderName, appHtml, (htmlResponse) => {
      screenWorker.generateAppTsFile(path, folderName, (tsResponse) => {
        screenWorker.generateCustomCssFile(path, folderName, styles, (cssResponse) => {
          screenWorker.generateCustomSpecFile(path, folderName, (specResponse) => {
            callback(specResponse);
          })
        })
      })
    })
  }

  // create Html component files
  public createHtmlComponent(path, folderName, htmlValue, callback) {
    screenWorker.generateCustomHtmlFile(path, folderName, htmlValue, (response) => {
      callback(response);
    })
  }

  // create spec component files
  public createSpecComponent(path, folderName, callback) {
    screenWorker.generateCustomSpecFile(path, folderName, (response) => {
      callback(response);
    })
  }

  // create css component files
  public createCssComponent(path, folderName, styles, callback) {
    screenWorker.generateCustomCssFile(path, folderName, styles, (response) => {
      callback(response);
    })
  }

  // create ts component files
  public createTsComponent(path, folderName, componentObj, callback) {
    screenWorker.generateCustomTsFile(path, folderName, componentObj, (response) => {
      callback(response);
    })
  }


  // public createAng7Project(projectData, projectName, sourcePath, templatePath, callback) {
  //   const appPath = `${sourcePath}/${projectName}`;
  //   const ang7TemplatePath = `${templatePath}/angular7`;
  //   this.createFolder(appPath);
  //   screenWorker.generateE2E(appPath, ang7TemplatePath);
  //   screenWorker.generateConstant(appPath, ang7TemplatePath, projectName);
  //   //  screenWorker.generateEnvironment(appPath, ang7TemplatePath);
  //   screenWorker.generateSrcFile(appPath, ang7TemplatePath, projectName);
  //   screenWorker.generateAppFiles(appPath, ang7TemplatePath, projectName);
  //   // screenWorker.generatePackageJsonFile(appPath, ang7TemplatePath, projectName);
  //   callback('successfully generated')
  // }

  // public createCustomHtml(projectData, projectName, folderName, sourcePath, templatePath, callback) {
  //   const appPath = `${sourcePath}/${projectName}/src/app/${folderName}`;
  //   const ang7TemplatePath = `${templatePath}/angular7/app`;
  //   var scriptRegExp = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
  //   const htmlValue = projectData['gjs-html'].replace(`<body>`, '')
  //     .replace(`</body>`, '')
  //     .replace(scriptRegExp, '')
  //   console.log('createCustom Html are ---- ', htmlValue);
  //   // callback('success');
  //   screenWorker.generateCustomHtmlFile(appPath, ang7TemplatePath, folderName, htmlValue, (response) => {
  //     callback(response);
  //   })
  // }

  //   public createCustomTs(projectData, projectName, folderName, sourcePath, templatePath, callback) {
  //     const appPath = `${sourcePath}/${projectName}/src/app/${folderName}`;
  //     const ang7TemplatePath = `${templatePath}/angular7/app`;
  //     this.initalizeVariable();
  //     let componentVariable = [];
  //     let componentConstructorParams = [];
  //     let gridOptionColumnDefs = [];
  //     let componentOnInit = [];
  //     let componentMethod = [];
  //     this.importComponent.push({ classname: folderName, foldername: folderName })
  //     this.componentPath.push({ path: folderName, component: folderName })
  //     if (projectData.is_grid_present) {
  //       var foundAppDependencyIndex = this.importAppDependency.findIndex(x => x.dependencyname == 'AgGridModule');
  //       if (foundAppDependencyIndex < 0) {
  //         this.importAppDependency.push({
  //           dependencyname: 'AgGridModule',
  //           dependencypath: 'ag-grid-angular',
  //           modulename: 'AgGridModule.withComponents()'
  //         })
  //       }
  //       var foundComponentDependencyIndex = this.importComponentDependency.findIndex(x => x.dependencyname == 'GridOptions');
  //       if (foundComponentDependencyIndex < 0) {

  //         this.importComponentDependency.push({
  //           dependencyname: 'GridOptions',
  //           dependencyPath: 'ag-grid-community'
  //         })
  //       }

  //       this.angularCssJson.push(`./node_modules/ag-grid-community/dist/styles/ag-grid.css`);
  //       this.angularCssJson.push(`./node_modules/ag-grid-community/dist/styles/ag-theme-balham.css`);

  //       this.packageJson.push({ dependencyname: 'ag-grid-angular', dependencyversion: '^20.1.0' })
  //       this.packageJson.push({ dependencyname: 'ag-grid-community', dependencyversion: '^20.1.0' })

  //       componentVariable.push(`gridOptions: GridOptions`);
  //       componentVariable.push(`defaultColDef: { editable: boolean; sortable: boolean; filter: boolean; }`);
  //       componentVariable.push(`gridApi: any`);
  //       componentVariable.push(`gridColumnApi: any`);
  //       const gridColumnDefs = projectData.grid_fields.default_field;
  //       projectData.grid_fields.custom_field.forEach(customElement => {

  //         const foundIndex = projectData.grid_fields.default_field.findIndex(x => x.colId == customElement.columnid);
  //         if (foundIndex > -1) {
  //           gridColumnDefs[foundIndex].headerName = customElement.columnname;
  //           gridColumnDefs[foundIndex].field = customElement.entityfield;
  //         }
  //       });

  //       gridColumnDefs.forEach(columnElement => {
  //         let columnObj = {
  //           headerName: columnElement.headerName,
  //           field: columnElement.field,
  //           colId: columnElement.colId
  //         }
  //         gridOptionColumnDefs.push(columnObj);
  //       })

  //       componentOnInit.push(`this.gridOptions = <GridOptions>{}`);
  //       componentOnInit.push(`this.gridOptions.columnDefs = ${util.inspect(gridOptionColumnDefs, { showHidden: false, depth: null })}`);
  //       // componentOnInit.push(`this.gridOptions.columnDefs = ${util.inspect(gridColumnDefs, { showHidden: false, depth: null })}`);
  //       componentOnInit.push(`this.gridOptions.defaultColDef = {
  //   editable: true,
  //   sortable: true,
  //   filter: true
  // }`);


  //       componentOnInit.push(`this.gridOptions.rowData = [{
  //   firstname: 'ram',
  //   lastname: 'kumar',
  //   email: 'ram@gmail.com',
  //   phonenumber: '+91909345345'
  // }, {
  //   firstname: 'mani',
  //   lastname: 'kandan',
  //   email: 'mani@gmail.com',
  //   phonenumber: '+919092311111'
  // }]`);

  //       componentMethod.push(`onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridApi.sizeColumnsToFit();
  //   this.gridColumnApi = params.columnApi;
  // }`);
  //     }

  //     screenWorker.generateCustomTsFile(appPath, ang7TemplatePath, folderName,
  //       this.importComponentDependency, null,
  //       componentVariable, componentConstructorParams, componentOnInit,
  //       componentMethod, (response) => {
  //         console.log(response);
  //         callback(response);
  //       });
  //   }

  // public createCustomSpecCss(projectData, projectName, folderName, sourcePath, templatePath, callback) {
  //   const appPath = `${sourcePath}/${projectName}/src/app/${folderName}`;
  //   const ang7TemplatePath = `${templatePath}/angular7/app`;
  //   screenWorker.generateCustomCssFile(appPath, ang7TemplatePath, folderName, null, (Cssresponse) => {
  //     screenWorker.generateCustomSpecFile(appPath, ang7TemplatePath, folderName, (specResponse) => {
  //       callback(specResponse);
  //     })
  //   })
  // }

  // public createRoutingFile(appPath, templatePath, projectName, callback) {
  //   const appSrcPath = `${appPath}/${projectName}/src/app`;
  //   const templateSrcPath = `${templatePath}/angular7/app`;
  //   screenWorker.generateRoutingFile(appSrcPath, templateSrcPath, this.importComponent, this.componentPath, (response) => {
  //     callback(response);
  //   })
  // }

  // public createAppModuleFile(appPath, templatePath, projectName,
  //   callback) {
  //   const appSrcPath = `${appPath}/${projectName}/src/app`;
  //   const templateSrcPath = `${templatePath}/angular7/app`;
  //   screenWorker.generateAppModuleFile(appSrcPath, templateSrcPath, projectName,
  //     this.importComponent, this.importAppDependency, (response) => {
  //       callback(response);
  //     })
  // }

  // public createAngularJsonFile(sourcePath, templatePath, projectName, callback) {
  //   const appPath = `${sourcePath}/${projectName}`;
  //   const ang7TemplatePath = `${templatePath}/angular7`;
  //   screenWorker.generateAngularJsonFile(appPath, ang7TemplatePath, projectName,
  //     this.angularCssJson, this.angularScriptJson, (response) => {
  //       callback(response);
  //     })
  // }

  // public createPackageJsonFile(sourcePath, templatePath, projectName, callback) {
  //   const appPath = `${sourcePath}/${projectName}`;
  //   const ang7TemplatePath = `${templatePath}/angular7`;
  //   screenWorker.generatePackageJsonFile(appPath, ang7TemplatePath, projectName,
  //     this.packageJson, (response) => {
  //       callback(response);
  //     })
  // }






  createFolder(appPath) {
    if (!fs.existsSync(appPath)) {
      fs.mkdirSync(appPath)
    }
    return true;
  }

}