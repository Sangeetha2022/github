import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';
import { SharedService } from 'src/shared/shared.service';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private api: ApiService, private restapi: SharedService) { }
  getProjectByUserId(UserId:string, logId:string): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectByUserId}/${UserId}?log_id=${logId}`);
  }

  getProjectByAll(UserId:string, logId:string): Observable<any> {
    return this.api.get(`${this.restapi.Apigateway}${Constants.getProjectByAll}?log_id=${logId}`);
  }
  deleteProjectFlowByProjectId(projectId:string, logId:string): Observable<any> {
    return this.api.delete(`${this.restapi.Apigateway}${Constants.deleteProjectFlowByProjectId}/${projectId}?log_id=${logId}`);
  }

  deleteProject(id:string, logId:string): Observable<any> {
    return this.api.delete(this.restapi.Apigateway + Constants.deleteProject + id + `?log_id=${logId}`);
  }
  public cloneProject(projectgen:any, logId:string) {
    var data = this.http.get(`${this.restapi.Apigateway}${Constants.clonedApplication}/${projectgen.project_id}` + `/user/${projectgen.user_id}` + `?log_id=${logId}`);
    return data;
  }
}
