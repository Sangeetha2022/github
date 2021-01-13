import { Constant } from "../../config/Constant";
import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";
import * as path from 'path';
import { DependencySupportWorker } from "../../supportworker/dependencySupportWorker";
import { Common } from "../../config/Common";


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
      if (meta.tagName === 'meta' || meta.tagName === 'title' || meta.tagName === 'base' || meta.tagName === 'link') {
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

}