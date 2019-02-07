import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IGenerateFlow } from './interface/generationFlow';
import { IFlow } from './interface/flow';
import { IFlowComponent } from './interface/flowComponent';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const flowUrl = 'http://localhost:3001/flow/getall';
const flowServiceURL = 'http://localhost:3001/flow/';
const compUrl = 'http://localhost:3001/flow_component/getall';
const addGenFlow = 'http://localhost:3001/generation_flow/add';
const getGenFlow = 'http://localhost:3001/generation_flow/getall';
const getCompByName = 'http://localhost:3001/generation_flow/getbyname';
const getMFByName = 'http://localhost:3002/microflow/getbycomp';

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
  constructor(private http: HttpClient) {
  }


  saveFlow(flowObject: IFlow): Observable<IFlow> {
    return this.http.post<IFlow>(flowServiceURL + 'save', flowObject)
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('getprojects', this.flow))
      );
  }

  deleteFlow(flowID: String): Observable<any> {
    return this.http.delete(flowServiceURL + `delete/${flowID}`)
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('getprojects', this.flow))
      );
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
    return this.http.get<IFlow[]>(flowUrl)
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('getprojects', []))
      );
  }
  getFlowComponents(): Observable<IFlowComponent[]> {
    return this.http.get<IFlowComponent[]>(compUrl)
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('getprojects', []))
      );
  }

  getGenFlow(): Observable<IGenerateFlow[]> {
    return this.http.get<IGenerateFlow[]>(getGenFlow)
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('IGenerateFlow', []))
      );
  }

  addGenFlow(flowObject): Observable<IGenerateFlow> {
    console.log('i am in service');
    return this.http.post<IGenerateFlow>(addGenFlow, flowObject, httpOptions).pipe(
      tap((tapFlowObject: IGenerateFlow) => console.log(`added project w/ id=${tapFlowObject}`)),
      catchError(this.handleError<IGenerateFlow>('addGenFlow'))
    );
  }

  getFlowComponentByName(name: string): Observable<IGenerateFlow> {

    const url = `${getCompByName}/${name}`;
    return this.http.get<IGenerateFlow>(url).pipe(
      tap(_ => console.log(`fetched project flow component=${name}`)),
      catchError(this.handleError<IGenerateFlow>(`getFlowComp name=${name}`))
    );
  }

  getMicroFlowByName(name: string): Observable<IGenerateFlow> {

    const url = `${getMFByName}/${name}`;
    return this.http.get<IGenerateFlow>(url).pipe(
      tap(_ => console.log(`fetched project flow component=${name}`)),
      catchError(this.handleError<IGenerateFlow>(`getFlowComp name=${name}`))
    );
  }
}
