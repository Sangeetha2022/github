import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  getVersion(name): Observable<any> {
    return this.http.get(this.sharedService.configUrl + `/generation_flow/getbyname/` + name);
  }

  getBuildVersion(name): Observable<any> {
    return this.http.get(this.sharedService.configUrl + `/generation_flow/getbyname/` + name);
  }
}
