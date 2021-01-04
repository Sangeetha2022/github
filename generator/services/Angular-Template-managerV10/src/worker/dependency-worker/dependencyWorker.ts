import { Constant } from "../../config/Constant";
import { ComponentSupportWorker } from "../../supportworker/componentSupportWorker";
import * as path from 'path';


const componentSupportWorker = new ComponentSupportWorker()
export class DependencyWorker {

  public startString: string;
  public scriptString: string
  private constructPayLoad() {
    const indexHtmlObject = {
      tagData: [],
    }
    return indexHtmlObject;
  }


  generateIndexHtml(generationPath, tempatepath, tempateName, IndexHtmlDetails, callback) {
    let metaData = JSON.parse(IndexHtmlDetails)
    metaData.map(async tagData => {
      const applicationPath = generationPath + '/' + Constant.SRC_FOLDERNAME;
      const templatePath = path.resolve(__dirname, '../../../templates/indexHTML.handlebars');
      const res = await this.setMetaTag(tagData);
      // componentSupportWorker.handleBarsFile(templatePath, res, applicationPath, 'index.html')

    })
  }

  public setMetaTag(meta) {
    return new Promise((reslove, reject) => {
      const payLoad = this.constructPayLoad()
      this.startString = ''
      this.scriptString = ''
      const tagData = {
        tag: '',
        scriptTag: ''
      };
      if (meta.tagName === 'meta' || meta.tagName === 'title' || meta.tagName === 'base' || meta.tagName === 'link') {
        this.startString += `<${meta.tagName}`
        Object.keys(meta.attributes).map(key => {
          this.startString += ` ${key}='${meta.attributes[key]}'`
        })
        this.startString += `/>`
        tagData.tag = this.startString;
        payLoad.tagData.push(tagData);
      }
      else if (meta.tagName === 'script') {
        this.scriptString += `<${meta.tagName}`
        Object.keys(meta.attributes).map(key => {
          this.scriptString += ` ${key}='${meta.attributes[key]}'`
        })
        this.scriptString += `> </${meta.tagName}>`
        tagData.scriptTag = this.scriptString;
        payLoad.tagData.push(tagData)
      }
      reslove(payLoad)
    })





  }

}