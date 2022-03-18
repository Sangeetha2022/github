import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { SharedService } from 'src/shared/shared.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';

@Injectable
({
  providedIn: 'root'
})
export class TemplateScreenService 
{
  constructor(private api: ApiService, private restapi: SharedService) { }

  getAllTemplates(logId:any): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllTemplates}?log_id=${logId}`);
  }
  getTemplateByName(templatename:string, logId:string): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getTemplateByName}?template_name=${templatename}&log_id=${logId}`)
  }
  getTemplateParser(logId:string): Observable<any> 
  {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getTemplateParser}?log_id=${logId}`);
  }
}
