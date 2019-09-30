login_service(object) ::= <<
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
$if(object.shared)$
import { SharedService } from '../../shared/shared.service';
$endif$

@Injectable({
  providedIn: 'root'
})
export class $object.className$Service {

  constructor(private http: HttpClient, private $object.shared.objectName$: $object.shared.className$) { }

  signup(user: any): Observable<any> {
    return this.http.post(this.$object.shared.objectName$.$object.shared.variableName$ + '/signup', user);
  }

  googlelogin(user: any): Observable<any> {
    return this.http.post(this.$object.shared.objectName$.$object.shared.variableName$ + '/googlesignin', user);
  }
  Login(user: any): Observable<any> {
    return this.http.post(this.$object.shared.objectName$.$object.shared.variableName$ + '/login', user);
  }

  Logout(user: any): Observable<any> {
    return this.http.put(this.$object.shared.objectName$.$object.shared.variableName$ + '/logout', user);
  }

  Consent(consent: any): Observable<any> {
    return this.http.put(this.$object.shared.objectName$.$object.shared.variableName$ + '/consent', consent);
  }

}

>>