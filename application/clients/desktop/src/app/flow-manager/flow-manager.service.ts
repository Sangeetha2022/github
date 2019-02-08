import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IGenerateFlow } from './interface/generationFlow';
import { IFlow } from './interface/flow';
import { IFlowComponent } from './interface/flowComponent';
import { SharedService } from 'src/shared/shared.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FlowManagerService {

  private messageSource = new BehaviorSubject('');

  flow: IFlow = {
    name: '',
    label: '',
    description: '',
    action_on_data: ''
  };

  currentMessage = this.messageSource.asObservable();
  constructor(private http: HttpClient, private restapi:SharedService) {
  }


  saveFlow(flowObject: IFlow): Observable<IFlow> {
    return this.http.post<IFlow>(this.restapi.flowbaseUrl + '/flow/save', flowObject)
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('getprojects', this.flow))
      );
  }

  deleteFlow(flowID: String): Observable<any> {
    return this.http.delete(this.restapi.flowbaseUrl + `/flow/delete/${flowID}`)
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('getprojects', this.flow))
      );
  }


  updateFlow(flowObject: IFlow): Observable<any> {
    return this.http.put(this.restapi.flowbaseUrl + '/flow/update', flowObject);
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getFlows(): Observable<IFlow[]> {
    return this.http.get<IFlow[]>(this.restapi.flowbaseUrl + '/flow/getall')
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('getprojects', []))
      );
  }
  getFlowComponents(): Observable<IFlowComponent[]> {
    return this.http.get<IFlowComponent[]>(this.restapi.flowbaseUrl+'/flow_component/getall')
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('getprojects', []))
      );
  }

  getGenFlow(): Observable<IGenerateFlow[]> {
    return this.http.get<IGenerateFlow[]>(this.restapi.flowbaseUrl+ '/generation_flow/getall')
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('IGenerateFlow', []))
      );
  }

  addGenFlow(flowObject): Observable<IGenerateFlow> {
    console.log('i am in service');
    return this.http.post<IGenerateFlow>(this.restapi.flowbaseUrl+'/generation_flow/add', flowObject, httpOptions).pipe(
      tap((tapFlowObject: IGenerateFlow) => console.log(`added project w/ id=${tapFlowObject}`)),
      catchError(this.handleError<IGenerateFlow>('addGenFlow'))
    );
  }

  getFlowComponentByName(name: string): Observable<IGenerateFlow> {

    const url = `${this.restapi.flowbaseUrl}/generation_flow/getbyname/${name}`;
    return this.http.get<IGenerateFlow>(url).pipe(
      tap(_ => console.log(`fetched project flow component=${name}`)),
      catchError(this.handleError<IGenerateFlow>(`getFlowComp name=${name}`))
    );
  }

  getMicroFlowByName(name: string): Observable<IGenerateFlow> {

    const url = `${this.restapi.mflowbaseUrl}/microflow/getbycomp/${name}`;
    return this.http.get<IGenerateFlow>(url).pipe(
      tap(_ => console.log(`fetched project flow component=${name}`)),
      catchError(this.handleError<IGenerateFlow>(`getFlowComp name=${name}`))
    );
  }
}
