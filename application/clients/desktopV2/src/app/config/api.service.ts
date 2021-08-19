import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { throwError } from 'rxjs'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable()
export class ApiService {
    constructor( private http: HttpClient){}
    private formatErrors(httpresponse: any) {
       // return new ErrorObservable(httpresponse);
       return throwError(new Error(httpresponse));
    }
    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${path}`, { params }).pipe(catchError(this.formatErrors));
    }
    delete(path:string): Observable<any> {
        return this.http.delete(`${path}`).pipe(catchError(this.formatErrors));
    }
}