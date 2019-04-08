import {Component,  Injectable} from '@angular/core';
 import {Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import {Router} from "@angular/router";
 import {Http, Headers} from "@angular/http";
import {NgClass} from '@angular/common';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import { from } from 'rxjs';
import 'core-js/es7/reflect'

 export class sessionTimeOutComponent {
    // nome :any = sessionStorage;
    // sessionStorage.getItem('email', logindetails.email);

 //@Injectable()
    constructor ( @Injectable()
        private router: Router,
        private http: Http,
        private idle: Idle) {

        idle.setIdle(2);
        idle.setTimeout(120);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        idle.onTimeoutWarning.subscribe((countdown: number) => {
            
            alert('Timeout Warning - ' + countdown);
        });

        idle.onTimeout.subscribe(() => {
          alert('Timeout');

           sessionStorage.clear();
           if(sessionStorage === null || sessionStorage === undefined){
            this.router.navigate(['/login'])
           }
        //   this.router.navigate(['/login', {sessionExpirate: 'true'}]);
        });

        idle.watch();
    }
 

      logout() {
        this.idle.stop();
        this.idle.ngOnDestroy(); //includes this.idle.stop() and this.clearInterrupts() both.
        sessionStorage.clear();
        this.router.navigate(['/login']);
                error => console.log(error)
            
    }  
 }