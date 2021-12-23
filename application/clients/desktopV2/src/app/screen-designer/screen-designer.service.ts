import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/shared/shared.service';
import { Observable } from 'rxjs';
import { Constants } from '../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class ScreenDesignerService {

  constructor(  private http: HttpClient,
    private sharedService: SharedService) { }
  getProjectTemplate(id:any, logId:any) {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getProjectTemplateById}/${id}?log_id=${logId}`);
  }
  getScreenById(screenId:any, logId:any): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenByID}/${screenId}?log_id=${logId}`);
  }

  updateScreen(screenId:any, screenData:any, logId:any): Observable<any> {
    return this.http.post(`${this.sharedService.Apigateway}${Constants.updateScreen}${screenId}?log_id=${logId}`, screenData);
  }

  saveScreen(screenData:any): Observable<any> {
    return this.http.post(`${this.sharedService.Apigateway}${Constants.addScreen}`, screenData);
  }
  getScreenByFeatureId(featureId:any, logId:any): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenByFeatureId}/${featureId}?log_id=${logId}`);
  }
  getScreenByProjectId(projectId:any, logId:any): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenByProjectId}/${projectId}?log_id=${logId}`);
  }
  deleteScreenById(screenId:any, logId:any): Observable<any> {
    return this.http.delete(`${this.sharedService.Apigateway}${Constants.deleteScreenById}/${screenId}?log_id=${logId}`);
  }
}
