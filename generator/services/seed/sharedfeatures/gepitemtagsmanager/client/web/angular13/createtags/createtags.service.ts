import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';

@Injectable({
    providedIn: 'root'
})

export class CreatetagsService {
    constructor(
        private sharedService: SharedService,
        private http: HttpClient,
    ) { }

    GpCreate(ItemTags:any): Observable<any> {
        let jwt_token = sessionStorage.getItem('JwtToken');
        console.log('rowdata from data', ItemTags);
        return this.http.post(this.sharedService.WEB_API + '/ItemTags' + `?jwt_token=${jwt_token}`, ItemTags);
    }

    GpGetAllValues(): Observable<any> {
        return this.http.get(this.sharedService.WEB_API + '/ItemTags');
    }

    GpGetNounById(tagsId:any): Observable<any> {
        return this.http.get(this.sharedService.WEB_API + '/ItemTags/' + tagsId);
    }
}
