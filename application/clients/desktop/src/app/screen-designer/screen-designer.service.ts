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

  getScreenById(screenId): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenByID}/${screenId}`);
  }

  updateScreen(screenId, screenData): Observable<any> {
    return this.http.post(`${this.sharedService.Apigateway}${Constants.updateScreen}/${screenId}`, screenData);
  }

  saveScreen(screenData): Observable<any> {
    return this.http.post(`${this.sharedService.Apigateway}${Constants.addScreen}`, screenData);
  }

  deleteScreen(screenId): Observable<any> {
    return this.http.delete(`${this.sharedService.Apigateway}${Constants.deleteScreen}/${screenId}`);
  }

  getScreenByProjectId(projectId): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenByProjectId}/${projectId}`);
  }

  getScreenByFeatureId(featureId): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenByFeatureId}/${featureId}`);
  }

  getScreenTemplateByProjectId(projectId): Observable<any> {
    return this.http.get(`${this.sharedService.Apigateway}${Constants.getScreenTemplateByProjectId}?projectId=${projectId}`);
  }

  // delete microservice

  deleteScreenById(screenId): Observable<any> {
    return this.http.delete(`${this.sharedService.Apigateway}${Constants.deleteScreenById}/${screenId}`);
  }

}
