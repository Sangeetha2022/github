import * as fs from 'fs';
import * as util from 'util';
import * as asyncLoop from 'node-async-loop';
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
  private template = {
    header: '',
    content: '',
    footer: ''
  }
  private folders = {
    header: `header`,
    content: `template`,
    footer: `footer`
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
      
      // const path = {
      //   source: `${srcPath}/${folderName}/src/app`,
      //   destination: `${templatePath}/angular7/app`
      // }
      this.styleValue = templateData['gjs-css'];
      this.importRouteComponent.push({
        classname: this.folders.content.charAt(0).toUpperCase() + this.folders.content.slice(1),
        foldername: this.folders.content
      })
      this.importPath.push({
        path: '',
        component: this.folders.content.charAt(0).toUpperCase() + this.folders.content.slice(1)
      })
      this.importAppComponent.push({
        classname: this.folders.header.charAt(0).toUpperCase() + this.folders.header.slice(1),
        foldername: this.folders.header
      })
      this.importAppComponent.push({
        classname: this.folders.content.charAt(0).toUpperCase() + this.folders.content.slice(1),
        foldername: this.folders.content
      })
      this.importAppComponent.push({
        classname: this.folders.footer.charAt(0).toUpperCase() + this.folders.footer.slice(1),
        foldername: this.folders.footer
      })

      this.appHtml.push(`app-${this.folders.header.toLowerCase()}`)
      this.appHtml.push(`router-outlet`)
      this.appHtml.push(`app-${this.folders.footer.toLowerCase()}`)

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
      this.template.header = templateHtml.match(expression.navRegExp);
      this.template.content = templateHtml.replace(expression.metaRegExp, '').replace(expression.titleRegExp, '')
        .replace(expression.linkRegExp, '').replace(expression.scriptRegExp, '').replace(expression.navRegExp, '')
        .replace(expression.footerRegExp, '').replace(expression.baseRegExp, '');
        this.template.footer = templateHtml.match(expression.footerRegExp);

      console.log('creat template com obj --- ', this.componentObj);
      // create template 
      serviceHelper.createTemplate(this.template, path, this.folders,
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

      this.componentObj.componentMethod.push(`onGridReady(params:any) {
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

  // generate Header files

  public createHeader(path, folderNames, callback) {
    const linkRegex = /<\s*a\shref="#"[^>]*/g;
    const linkFullRegex = /<\s*a\shref="#"[^>]*>[A-Za-z]+<\/a>/g;
    let navLink;
    console.log('before match header --- ', this.template.header, folderNames);
    const navHeaderMatch = this.template.header[0].match(expression.navLinkRegExp);
    const fullMatchHeader = this.template.header[0].match(expression.navLinkFullRegExp);
    asyncLoop(folderNames, (folder, next) => {
const router = navHeaderMatch[0].replace(expression.hrefSingleRegExp, `routerLink='${folder}'`);
if(folderNames[0] === folder) {
  navLink = `${router}>${folder}</a>`
} else {
  navLink += `${router}>${folder}</a>`
}
console.log('asyncLoop testValues aer ----- ', router, navLink);
next();
    },(err) => { 
           if(err) {

      } else {
        console.log('working on else part')
        const headerObject = this.template.header[0].replace(fullMatchHeader[0], navLink)
        .replace(linkFullRegex, '').replace(expression.hrefHomeRegExp, `routerLink=''`);
        console.log('#$$ replacedHeader are ------ ', headerObject);
        serviceHelper.createHeader(headerObject, this.folders.header, path, this.componentObj, (response) => {
    callback(response);
        })

      }
    })
    // const replaceHeader = this.template.header[0].replace(linkRegex, '');
    // console.log('#$$ replacedHeader are ------ ', replaceHeader);
  }

  createFolder(path) {
      if (!fs.existsSync(path.destination)) {
        fs.mkdirSync(path.destination)
      }
  }

}