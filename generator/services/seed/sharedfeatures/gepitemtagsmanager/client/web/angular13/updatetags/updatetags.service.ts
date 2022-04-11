import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class UpdatetagsService {

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
  ) { }

  GpGetAllValues(): Observable<any> {
    console.log();
    return this.http.get(this.sharedService.WEB_API + '/ItemTags');
  }

  GpGetNounById(tagsId: any): Observable<any> {
    console.log('id', tagsId);
    return this.http.get(this.sharedService.WEB_API + '/ItemTags/' + tagsId);
  }

  GpUpdate(ItemTags: any): Observable<any> {
    console.log('id update', ItemTags);
    return this.http.put(this.sharedService.WEB_API + '/ItemTags', ItemTags);
  }

  GpDelete(tagsId: any): Observable<any> {
    console.log('delete a item', tagsId);
    return this.http.delete(this.sharedService.WEB_API + '/ItemTags/' + tagsId);
  }
}
