import { Constant } from "../../config/Constant";
import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";
import * as path from 'path';
import { DependencySupportWorker } from "../../supportworker/dependencySupportWorker";
import { Common } from "../../config/Common";
import { translator } from '../../assets/translator';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';



const componentSupportWorker = new ComponentSupportWorker()
const dependencySupportWorker = new DependencySupportWorker();
const templatePath = path.resolve(__dirname, '../../../templates');

export class DependencyWorker {

  private startString: string;
  private scriptString: string

  //construct object 
  private indexHtmlObject = {
    tagData: [],
    scriptTagData: [],
  }

  generateIndexHtml(generationPath, projectName, templateName, indexHtmlDetails, callback) {
    this.indexHtmlObject.tagData = [];
    this.indexHtmlObject.scriptTagData = [];
    let metaData = JSON.parse(indexHtmlDetails)
    metaData.map(async tagData => {
      await this.setMetaTag(tagData, templateName)
    })
    const applicationPath = generationPath + `/${Constant.SRC_FOLDERNAME}`;
    componentSupportWorker.handleBarsFile(`${templatePath}/IndexHtml.handlebars`, this.indexHtmlObject, applicationPath, 'index.html');
    callback('Index.html file generated successf  ully')
  }

  private setMetaTag(meta, templateName) {
    new Promise(() => {
      this.startString = ''
      this.scriptString = ''
      if (meta.tagName === 'meta' || meta.tagName === 'title' || meta.tagName === 'link') {
        this.startString += `<${meta.tagName}`
        Object.keys(meta.attributes).map(key => {
          this.startString += ` ${key}='${meta.attributes[key]}'`
        })
        //set the title with template Name
        if (meta.tagName === 'title') {
          this.startString += `> ${templateName} </${meta.tagName}>`
        }
        else {
          this.startString += `/>`
        }
        this.indexHtmlObject.tagData.push({ data: this.startString })
      }
      else if (meta.tagName === 'script') {
        this.scriptString += `<${meta.tagName}`
        Object.keys(meta.attributes).map(key => {
          this.scriptString += ` ${key}='${meta.attributes[key]}'`
        })
        //added the js funtion 
        if (meta.content !== '') {
          this.scriptString += `> ${meta.content} </${meta.tagName}>`
        }
        else {
          this.scriptString += `> </${meta.tagName}>`
        }
        this.indexHtmlObject.scriptTagData.push({ data: this.scriptString })
      }
    })
  }

  generateSharedFile(generationPath, templatePath, sharedObj, callback) {
    // shared file path
    const filePath = `${generationPath}/${Constant.SRC_FOLDERNAME}/${Constant.SHARED_FOLDERNAME}`;
    componentSupportWorker.handleBarsFile(`${templatePath}/SharedService.handlebars`, sharedObj, filePath, 'shared.service.ts');
    callback("Shared service file generated")

  }

  public generateAppRoutingFile(generationPath, callback) {
    const routing = {
      importComponent: [],
      isAuthImport: false,
      componentPath: []
    }
    const folderName = Constant.TEMPLATE_FOLDERNAME;
    routing.importComponent.push({ classname: folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase(), foldername: folderName });
    routing.componentPath.push({ path: '', component: folderName.charAt(0).toUpperCase() + folderName.slice(1).toLowerCase(), isAuthProtected: false });
    // app routing file path
    console.log("App----Routing----->>>>>", routing)
    const filePath = `${generationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
    componentSupportWorker.handleBarsFile(`${templatePath}/AppRoutingModule.handlebars`, routing, filePath, Constant.APP_ROUTING_FILENAME);
    callback("App Routing Module file generated")
  }

  generateNginxFile(generationPath, templatePath, details, callback) {
    // shared file path
    const filePath = `${generationPath}/${Constant.NGINX_FOLDERNAME}`;
    const proxyArray = [{ ...Constant.proxyDesktop }, { ...Constant.proxyMobile }];
    console.log('proxyArray for nginx are --- ', proxyArray);
    const temp = {
      proxy: {
        projectName: details.project.name,
        components: proxyArray
      }
    }
    componentSupportWorker.handleBarsFile(`${templatePath}/NginxDefault.handlebars`, temp, filePath, Constant.NGINX_FILENAME);
    callback("Nginx file generated")

    // Modify the envoriments file
    let env = `${generationPath}/${Constant.ENV_FOLDERNAME}`
    let env_file_name = Constant.ENV_FILENAME
    this.modifyenvoriments(env, env_file_name);
    //  Modify the prod envoriments file
    let env_file_name_prod = Constant.ENV_PROD_FILENAME
    this.modifyenvoriments_prod(env, env_file_name_prod);
  }

  generateProxyFile(generationPath, templatePath, details, callback) {
    // shared file path
    const filePath = `${generationPath}/`;
    const temp = {
    }
    componentSupportWorker.handleBarsFile(`${templatePath}/ProxyConfig.handlebars`, temp, filePath, Constant.PROXY_CONFIG_FILENAME);
    callback("Nginx file generated")
  }

  generateDockerFile(generationPath, templatePath, details, callback) {
    // shared file path
    const filePath = `${generationPath}/`;
    const temp = {
    }
    componentSupportWorker.handleBarsFile(`${templatePath}/Dockerfile.handlebars`, temp, filePath, Constant.DOCKERFILE_FILENAME);
    callback("Nginx file generated")
  }

  generateTranslatorModuleFile(generationPath, templatePath, details, callback) {
    // shared file path
    const filePath = `${generationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}/${Constant.TRANSLATOR_FOLDERNAME}`;
    const temp = {
      lng: 'lng',
      ns: 'ns'
    }
    this.handleBarsFile(`${templatePath}/TranslatorModule.handlebars`, temp, filePath, Constant.TRANSLATOR_MODULE_FILENAME);
    callback("TranslatorModule file generated")
  }

  generateTranslatorJsonFile(generationPath, templatePath, sharedObj, callback) {
    const filePath = `${generationPath}/${Constant.SRC_FOLDERNAME}/${Constant.ASSETS_FOLDERNAME}/${Constant.LOCALES_FOLDERNAME}`;
    Common.createFolders(filePath)
    const langFolderName = translator.folderName;
    const fileName = translator.fileName[0];
    const source = translator.source;
    return dependencySupportWorker.generateTranslateJsonFiles(filePath, langFolderName, fileName, source, (response) => {
      callback();
    })
  }

  modifyenvoriments(applicationPath, fileName) {
    const environment = dependencySupportWorker.readFile(applicationPath, fileName);
    if (environment[5].replace(/\s/g, '') == "DESKTOP_API:'http://'+window.location.hostname+':8000/desktop',") {
      console.log("Already envoriments is upto date")
    } else {
      const serveIndex = environment.findIndex(x => /export const environment = {/.test(x));
      let temp = '';
      temp += `${environment[serveIndex]}`;
      temp += `\n  DESKTOP_API: 'http://'+window.location.hostname+':8000/desktop',`;
      temp += `\n  MOBILE_API: '/api/mobile',`;
      environment.splice(serveIndex, 1, temp);
      dependencySupportWorker.writeStaticFile(applicationPath, fileName, environment.join('\n'), (response) => {
        console.log('successfully write the environment file');
      });
    }
  }

  modifyenvoriments_prod(applicationPath, fileName) {
    const environment = dependencySupportWorker.readFile(applicationPath, fileName);
    if (environment[1].replace(/\s/g, '') == "DESKTOP_API:'http://<YourDomainNameorLiveIPaddress>',") {
      console.log("Already prods envoriments is upto date")
    } else {
      const serveIndex = environment.findIndex(x => /export const environment = {/.test(x));
      let temp = '';
      temp += `${environment[serveIndex]}`;
      temp += `\n  DESKTOP_API: 'http://<Your Domain Name or Live IP address>',`;
      temp += `\n  MOBILE_API: 'http://<Your Domain Name or Live IP address>',`;
      environment.splice(serveIndex, 1, temp);
      dependencySupportWorker.writeStaticFile(applicationPath, fileName, environment.join('\n'), (response) => {
        console.log('successfully write the prod environment file');
      });
    }
  }

  modifyTsConfig(generationPath, callback) {
    const filePath = `${generationPath}/${Constant.TS_CONFIG_JSON}`;
    componentSupportWorker.readFile(filePath, (res, err) => {
      if (!err) {
        const resArray = res.split('\n');
        resArray.forEach((element, index) => {
          if (element.includes(`"module":`)) {
            resArray[index] = `\t\t"module": "esNext",`
          }
        });
        componentSupportWorker.writeFile(filePath, resArray.join('\n'), (response) => {
          callback('tsconfig.json modified successfully');
        });
      } else {
        callback(err);
      }
    });
  }

  public handleBarsFile(filePath, fileData, screenGenerationPath, fileName) {
    return new Promise(resolve => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        Handlebars.registerHelper('surroundWithCurlyBraces', function (text) {
          var result = '{{' + text + '}}';
          return new Handlebars.SafeString(result);
        });
        const source = data;
        const template = Handlebars.compile(source);
        const result = template(fileData);
        Common.createFolders(screenGenerationPath);
        fs.writeFile(screenGenerationPath + `/${fileName}`, result, (response) => {
          resolve(response);
        })
      });
    })
  }
}



