import * as fs from 'fs';
import * as util from 'util';
import { expression } from '../../assets/RegexExpression';
import { ServicesHelper } from '../../serviceshelper/angular7/ServicesHelper';
import { ScreenWorker } from '../../worker/angular7/ScreenWorker';

let serviceHelper = new ServicesHelper();

// path extention and data separation supporter
export class ScreenServiceSupporter {

  // private importAppDependency = [];
  // private importComponent = [];
  // private importComponentDependency = [];
  // private componentPath = [];
  // private packageJson = [];
  // private angularCssJson = [];
  // private angularScriptJson = [];

  private indexScripts: String[] = [];
  private indexStyleSheets: String[] = [];
  private angularStyle: any[] = [];
  private angularScript: any[] = [];
  private importRouteComponent: any[] = [];
  private importAppComponent: any[] = [];
  private importPath: any[] = [];
  private packageDependency: any[] = [];
  private styleValue: any;
  private appFolderName: String = 'app';
  importModuleDependency: any[] = [];
  private appHtml: any[] = [];
  private componentObj: any = {
    componentVariable: [],
    importDependency: [],
    componentConstructorParams: [],
    componentOnInit: [],
    componentMethod: []

  }


  private initalizeVariable() {
  this.indexScripts = [];
  this.indexStyleSheets = [];
  this.angularStyle = [];
  this.angularScript = [];
  this.importRouteComponent = [];
  this.importAppComponent = [];
  this.importPath = [];
  this.packageDependency = [];
  this.styleValue = null;
  this.importModuleDependency = [];
  this.appHtml = [];
  this.componentObj.componentVariable = [];
  this.componentObj.importDependency = [];
  this.componentObj.componentConstructorParams = [];
  this.componentObj.componentOnInit = [];
  this.componentObj.componentMethod = [];
  }

  public generateTemplate(templateData, path, callback) {
    this.initalizeVariable();
    let assetsFile = [];
    this.createFolder(path);
    if (templateData) {
      const script = templateData.scripts;
      const styleSheet = templateData.stylesheets;
      const templateHtml = templateData['gjs-html'];
      const assetImage = templateData['asset-image'];
      const template = {
        header: '',
        content: '',
        footer: ''
      }
      // const path = {
      //   source: `${srcPath}/${folderName}/src/app`,
      //   destination: `${templatePath}/angular7/app`
      // }
      const folders = {
        header: `header`,
        content: `template`,
        footer: `footer`
      }
      this.styleValue = templateData['gjs-css'];
      this.importRouteComponent.push({
        classname: folders.content.charAt(0).toUpperCase() + folders.content.slice(1),
        foldername: folders.content
      })
      this.importPath.push({
        path: '',
        component: folders.content.charAt(0).toUpperCase() + folders.content.slice(1)
      })
      this.importAppComponent.push({
        classname: folders.header.charAt(0).toUpperCase() + folders.header.slice(1),
        foldername: folders.header
      })
      this.importAppComponent.push({
        classname: folders.content.charAt(0).toUpperCase() + folders.content.slice(1),
        foldername: folders.content
      })
      this.importAppComponent.push({
        classname: folders.footer.charAt(0).toUpperCase() + folders.footer.slice(1),
        foldername: folders.footer
      })

      this.appHtml.push(`app-${folders.header.toLowerCase()}`)
      this.appHtml.push(`router-outlet`)
      this.appHtml.push(`app-${folders.footer.toLowerCase()}`)

      // index.html script tag
      script.forEach(scriptElement => {
        if (scriptElement.file != null && !scriptElement.is_angular) {
          assetsFile.push({ filename: scriptElement.filename, file: scriptElement.file, type: 'script' });
        }
        this.indexScripts.push(scriptElement.src);
      })
      // index.html stylesheet tag
      // console.log('before stylesheet values ---- ', styleSheet);
      styleSheet.forEach(styleElement => {
        if (styleElement.file != null && !styleElement.is_angular) {
          assetsFile.push({ filename: styleElement.filename, file: styleElement.file, type: 'style' });
        }
        this.indexStyleSheets.push(styleElement.href);
      })
      template.header = templateHtml.match(expression.navRegExp);
      template.content = templateHtml.replace(expression.metaRegExp, '').replace(expression.titleRegExp, '')
        .replace(expression.linkRegExp, '').replace(expression.scriptRegExp, '').replace(expression.navRegExp, '')
        .replace(expression.footerRegExp, '').replace(expression.baseRegExp, '');
      template.footer = templateHtml.match(expression.footerRegExp);

      console.log('creat template com obj --- ', this.componentObj);
      // create template 
      serviceHelper.createTemplate(template, path, folders,
        assetsFile, this.componentObj, assetImage, (response) => {
          console.log(response);
          callback(response);
        })
    } else {
      callback('cannot able to find the template');
    }
  }

  // generate default files
  public generateDefaultFile(path, callback) {
    serviceHelper.e2eFile(path, (e2eResponse) => {
      serviceHelper.SrcFolder(path, (constResponse) => {
        callback(constResponse);
      })
    })
  }

  // generate dependencies file
  public generateDependency(path, folderName, callback) {
    serviceHelper.indexAndStyleFiles(path, this.indexScripts,
      this.indexStyleSheets, this.styleValue, folderName, (indexResponse) => {
        serviceHelper.routingAndModuleFiles(path, folderName, this.importRouteComponent,
          this.importAppComponent, this.importPath, this.importModuleDependency, (routingResponse) => {
            serviceHelper.angularAndPackageFile(path, folderName, this.angularStyle,
              this.angularScript, this.packageDependency, (angResponse) => {
                callback(angResponse);
              })
          })
      })
  }

  // generate app component files 
  public generateAppComponent(path, callback) {
    serviceHelper.createAppComponent(path, this.appFolderName, this.appHtml , null, (response) => {
      callback(response);
    })
  }

  // generate custom ts files
  public createTsFile(path, projectData, folderName, callback) {

    // let componentVariable = [];
    let componentConstructorParams = [];
    let gridOptionColumnDefs = [];
    // let componentOnInit = [];
    // let componentMethod = [];
    // this.importRouteComponent.push({ classname: folderName, foldername: folderName })
    // this.importAppComponent.push({ classname: folderName, foldername: folderName })
    // this.importPath.push({ path: folderName, component: folderName })

    this.importRouteComponent.push({
      classname: folderName.charAt(0).toUpperCase() + folderName.slice(1),
      foldername: folderName
    })
    this.importPath.push({
      path: folderName,
      component: folderName.charAt(0).toUpperCase() + folderName.slice(1)
    })
    this.importAppComponent.push({
      classname: folderName.charAt(0).toUpperCase() + folderName.slice(1),
      foldername: folderName
    })

    if (projectData.is_grid_present) {
      var foundAppDependencyIndex = this.importModuleDependency.findIndex(x => x.dependencyname == 'AgGridModule');
      if (foundAppDependencyIndex < 0) {
        this.importModuleDependency.push({
          dependencyname: 'AgGridModule',
          dependencypath: 'ag-grid-angular',
          modulename: 'AgGridModule.withComponents()'
        })
      }
      var foundComponentDependencyIndex = this.componentObj.importDependency.findIndex(x => x.dependencyname == 'GridOptions');
      if (foundComponentDependencyIndex < 0) {

        this.componentObj.importDependency.push({
          dependencyname: 'GridOptions',
          dependencyPath: 'ag-grid-community'
        })
      }

      this.angularStyle.push(`./node_modules/ag-grid-community/dist/styles/ag-grid.css`);
      this.angularStyle.push(`./node_modules/ag-grid-community/dist/styles/ag-theme-balham.css`);

      this.packageDependency.push({ dependencyname: 'ag-grid-angular', dependencyversion: '^20.1.0' })
      this.packageDependency.push({ dependencyname: 'ag-grid-community', dependencyversion: '^20.1.0' })

      this.componentObj.componentVariable.push(`gridOptions: GridOptions`);
      this.componentObj.componentVariable.push(`defaultColDef: { editable: boolean; sortable: boolean; filter: boolean; }`);
      this.componentObj.componentVariable.push(`gridApi: any`);
      this.componentObj.componentVariable.push(`gridColumnApi: any`);
      const gridColumnDefs = projectData.grid_fields.default_field;
      projectData.grid_fields.custom_field.forEach(customElement => {

        const foundIndex = projectData.grid_fields.default_field.findIndex(x => x.colId == customElement.columnid);
        if (foundIndex > -1) {
          gridColumnDefs[foundIndex].headerName = customElement.columnname;
          gridColumnDefs[foundIndex].field = customElement.entityfield;
        }
      });

      gridColumnDefs.forEach(columnElement => {
        let columnObj = {
          headerName: columnElement.headerName,
          field: columnElement.field,
          colId: columnElement.colId
        }
        gridOptionColumnDefs.push(columnObj);
      })

      this.componentObj.componentOnInit.push(`this.gridOptions = <GridOptions>{}`);
      this.componentObj.componentOnInit.push(`this.gridOptions.columnDefs = ${util.inspect(gridOptionColumnDefs, { showHidden: false, depth: null })}`);
      // componentOnInit.push(`this.gridOptions.columnDefs = ${util.inspect(gridColumnDefs, { showHidden: false, depth: null })}`);
      this.componentObj.componentOnInit.push(`this.gridOptions.defaultColDef = {
  editable: true,
  sortable: true,
  filter: true
}`);


      this.componentObj.componentOnInit.push(`this.gridOptions.rowData = [{
  firstname: 'ram',
  lastname: 'kumar',
  email: 'ram@gmail.com',
  phonenumber: '+91909345345'
}, {
  firstname: 'mani',
  lastname: 'kandan',
  email: 'mani@gmail.com',
  phonenumber: '+919092311111'
}]`);

      this.componentObj.componentMethod.push(`onGridReady(params) {
  this.gridApi = params.api;
  this.gridApi.sizeColumnsToFit();
  this.gridColumnApi = params.columnApi;
}`);
    }

    console.log('bbbbbbbefore generate an ts file -----  ', this.componentObj);

    serviceHelper.createTsComponent(path, folderName, this.componentObj, (response) => {
      callback(response);
    })
  }

  // generate custom Html files
  public createHtmlFile(path, projectData, folderName, callback) {
    const scriptRegExp = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    const htmlValue = projectData['gjs-html'].replace(`<body>`, '')
      .replace(`</body>`, '')
      .replace(scriptRegExp, '')
    console.log('createCustom Html are ---- ', htmlValue);
    // callback('success');
    serviceHelper.createHtmlComponent(path, folderName, htmlValue, (response) => {
      callback(response);
    })
  }

  // generate custom spec files
  public createSpecFile(path, projectData, folderName, callback) {
    serviceHelper.createSpecComponent(path, folderName, (response) => {
      callback(response);
    })
  }

  // generate custom css files
  public createCssFile(path, projectData, folderName, callback) {
    serviceHelper.createCssComponent(path, folderName, null, (response) => {
      callback(response);
    })
  }

  //   public createAng7Project(projectData, projectName, sourcePath, templatePath, callback) {
  //     const appPath = `${sourcePath}/${projectName}`;
  //     const ang7TemplatePath = `${templatePath}/angular7`;
  //     this.createFolder(appPath);
  //     screenWorker.generateE2E(appPath, ang7TemplatePath);
  //     screenWorker.generateConstant(appPath, ang7TemplatePath, projectName);
  //     //  screenWorker.generateEnvironment(appPath, ang7TemplatePath);
  //     screenWorker.generateSrcFile(appPath, ang7TemplatePath, projectName);
  //     screenWorker.generateAppFiles(appPath, ang7TemplatePath, projectName);
  //     // screenWorker.generatePackageJsonFile(appPath, ang7TemplatePath, projectName);
  //     callback('successfully generated')
  //   }

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

  //       this.packageJson.push({dependencyname: 'ag-grid-angular', dependencyversion: '^20.1.0'})
  //       this.packageJson.push({dependencyname: 'ag-grid-community', dependencyversion: '^20.1.0'})

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
  //   });

  //       gridColumnDefs.forEach(columnElement => {
  //         let columnObj = {
  //           headerName: columnElement.headerName,
  //           field: columnElement.field,
  //           colId: columnElement.colId
  //         }
  //         gridOptionColumnDefs.push(columnObj);
  //       })

  //       componentOnInit.push(`this.gridOptions = <GridOptions>{}`);
  //       componentOnInit.push(`this.gridOptions.columnDefs = ${util.inspect(gridOptionColumnDefs, {showHidden: false, depth: null })}`);
  //       // componentOnInit.push(`this.gridOptions.columnDefs = ${util.inspect(gridColumnDefs, { showHidden: false, depth: null })}`);
  //       componentOnInit.push(`this.gridOptions.defaultColDef = {
  //   editable: true,
  //   sortable: true,
  //   filter: true
  // }`);


  // componentOnInit.push(`this.gridOptions.rowData = [{
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

  // componentMethod.push(`onGridReady(params) {
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

  //   public createCustomSpecCss(projectData, projectName, folderName, sourcePath, templatePath, callback) {
  //     const appPath = `${sourcePath}/${projectName}/src/app/${folderName}`;
  //     const ang7TemplatePath = `${templatePath}/angular7/app`;
  //     screenWorker.generateCustomCssFile(appPath, ang7TemplatePath, folderName, null, (Cssresponse) => {
  //       screenWorker.generateCustomSpecFile(appPath, ang7TemplatePath, folderName, (specResponse) => {
  //         callback(specResponse);
  //       })
  //     })
  //   }

  //   public createRoutingFile(appPath, templatePath, projectName, callback) {
  //     const appSrcPath = `${appPath}/${projectName}/src/app`;
  //     const templateSrcPath = `${templatePath}/angular7/app`;
  //     screenWorker.generateRoutingFile(appSrcPath, templateSrcPath, this.importComponent, this.componentPath, (response) => {
  //       callback(response);
  //     })
  //   }

  //   public createAppModuleFile(appPath, templatePath, projectName,
  //     callback) {
  //     const appSrcPath = `${appPath}/${projectName}/src/app`;
  //     const templateSrcPath = `${templatePath}/angular7/app`;
  //     screenWorker.generateAppModuleFile(appSrcPath, templateSrcPath, projectName,
  //       this.importComponent, this.importAppDependency, (response) => {
  //         callback(response);
  //       })
  //   }

  //   public createAngularJsonFile(sourcePath, templatePath, projectName, callback) {
  //     const appPath = `${sourcePath}/${projectName}`;
  //     const ang7TemplatePath = `${templatePath}/angular7`;
  //     screenWorker.generateAngularJsonFile(appPath, ang7TemplatePath, projectName,
  //       this.angularCssJson, this.angularScriptJson, (response) => {
  //         callback(response);
  //       })
  //   }

  //   public createPackageJsonFile(sourcePath, templatePath, projectName, callback) {
  //     const appPath = `${sourcePath}/${projectName}`;
  //     const ang7TemplatePath = `${templatePath}/angular7`;
  //     screenWorker.generatePackageJsonFile(appPath, ang7TemplatePath, projectName,
  //       this.packageJson, (response) => {
  //         callback(response);
  //       })
  //   }






  createFolder(appPath) {
    if (!fs.existsSync(appPath.destination)) {
      fs.mkdirSync(appPath.destination)
    }
    return true;
  }

}