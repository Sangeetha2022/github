import { Observable } from 'rxjs';
import axios from 'axios'
import React from 'react';

//import { SharedService } from '../../shared/shared.service';


  
export const signup = (user: any) => {
    //return this.http.post(this.sharedService.DESKTOP_API + '/signup', user);
    axios.post('http://'+window.location.hostname+':8000/desktop' + '/signup', user);
}

export const login = (user:any) => {
    console.log('data from services', user)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios.post('http://'+window.location.hostname+':8000/desktop' + '/login', user, config);
}
  