import { Observable } from 'rxjs';
import axios from 'axios'
import React from 'react';

//import { SharedService } from '../../shared/shared.service';


  
export const signup = (user: any) => {
    //return this.http.post(this.sharedService.DESKTOP_API + '/signup', user);
    axios.post('http://localhost:8003/signup', user);
}