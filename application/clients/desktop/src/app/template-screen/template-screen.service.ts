import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { SharedService } from 'src/shared/shared.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class TemplateScreenService {

  constructor(private api: ApiService, private restapi: SharedService) { }

  getAllTemplates(): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getAllTemplates}`);
  }

  getTemplateParser(): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getTemplateParser}`);
  }

  getTemplateByName(templatename): Observable<any>{
    return this.api.get(`${this.restapi.Apigateway}${Constants.getTemplateByName}?template_name=${templatename}`)
  }
  
}
