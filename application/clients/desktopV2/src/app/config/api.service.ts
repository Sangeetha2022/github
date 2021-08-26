import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable()
export class ApiService {
    constructor( private http: HttpClient){}
    private setHeaders(): HttpHeaders {
        const headersconfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        return new HttpHeaders(headersconfig);
    }
    private formatErrors(httpresponse: any) {
       return throwError(new Error(httpresponse));
    }
    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${path}`, { params }).pipe(catchError(this.formatErrors));
    }
    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(`${path}`, JSON.stringify(body), { headers: this.setHeaders() }).pipe(catchError(this.formatErrors));
    }
    delete(path:string): Observable<any> {
        return this.http.delete(`${path}`).pipe(catchError(this.formatErrors));
    }
    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(`${path}`, JSON.stringify(body),{ headers: this.setHeaders() }).pipe(catchError(this.formatErrors));
    }
}