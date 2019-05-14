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

  getProjectDetails(): Observable<any> {
    return this.http.get(this.sharedService.screenUrl + `project/get`).pipe(
      map(res => res[0])
    );
  }

  getScreenByProjectAndFeatureId(projectId, featureId): Observable<any> {
    return this.http.get(this.sharedService.screenUrl + Constants.getScreenByProjectAndFeatureId + projectId + '/' + featureId);
  }

  getScreenByProjectId(projectId): Observable<any> {
    return this.http.get(this.sharedService.screenUrl + Constants.getScreenByProjectId + projectId);
  }

  getScreenByFeature(featureId): Observable<any> {
    return this.http.get(this.sharedService.screenUrl + Constants.getScreenByFeatureId + featureId);
  }

}
