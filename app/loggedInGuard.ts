// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './common-services/authentication/authentication.service'

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private authService: AuthenticationService) { }

    canActivate() {
        return this.authService.isAuthenticated();
    };

}