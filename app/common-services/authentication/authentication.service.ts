import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
@Injectable()
export class AuthenticationService {
    constructor(private _router: Router) {}
    
    isAuthenticated() {
        if (localStorage.getItem('id')) {
            return true;
        } else {
            return false;
        }

    }
    logout() {
        this._router.navigate(['Login', {logout: 'true'}]);
        //location.reload();
        //window.location = "#/login?logout=true";
    }
}