import { Constant } from "../../config/Constant";
import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";
import * as path from 'path';


const componentSupportWorker = new ComponentSupportWorker()
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
    const templatePath = path.resolve(__dirname, '../../../templates/indexHtml.handlebars');
    componentSupportWorker.handleBarsFile(templatePath, this.indexHtmlObject, applicationPath, 'index.html');
    callback('Index.html file generated successfully')
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

}