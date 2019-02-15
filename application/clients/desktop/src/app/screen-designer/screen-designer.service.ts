import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}
