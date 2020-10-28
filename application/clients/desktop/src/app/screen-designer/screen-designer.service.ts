import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class ScreenDesignerService {

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }


  getScreenByProjectAndFeatureId(projectId, featureId): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenByProjectAndFeatureId}/${projectId}/${featureId}`);
  }

  getScreenById(screenId, logId): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenByID}/${screenId}?log_id=${logId}`);
  }

  updateScreen(screenId, screenData, logId): Observable<any> {
    return this.http.post(`${this.sharedService.Apigateway}${Constants.updateScreen}${screenId}?log_id=${logId}`, screenData);
  }

  saveScreen(screenData): Observable<any> {
    return this.http.post(`${this.sharedService.Apigateway}${Constants.addScreen}`, screenData);
  }

  deleteScreen(screenId): Observable<any> {
    return this.http.delete(`${this.sharedService.Apigateway}${Constants.deleteScreen}/${screenId}`);
  }

  getScreenByProjectId(projectId, logId): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenByProjectId}/${projectId}?log_id=${logId}`);
  }

  getScreenByFeatureId(featureId, logId): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenByFeatureId}/${featureId}?log_id=${logId}`);
  }

  getScreenTemplateByProjectId(projectId): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenTemplateByProjectId}?projectId=${projectId}`);
  }

  // delete microservice

  deleteScreenById(screenId, logId): Observable<any> {
    return this.http.delete(`${this.sharedService.Apigateway}${Constants.deleteScreenById}/${screenId}?log_id=${logId}`);
  }

}
