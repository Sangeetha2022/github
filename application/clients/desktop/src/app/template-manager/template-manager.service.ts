import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { SharedService } from '../../shared/shared.service';
import { Constants } from '../config/Constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateManagerService {

  constructor(private api: ApiService, private restapi: SharedService) { }

  getProjectTemplate(projectId, logId): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectTemplate}/${projectId}?log_id=${logId}`);
  }
}
