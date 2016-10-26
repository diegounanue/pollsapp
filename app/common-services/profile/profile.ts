import { Router } from '@angular/router';
import {Component, OnInit, ElementRef, Injectable, OnChanges, SimpleChanges, Input} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';


@Component({
    selector: 'profile',
    templateUrl: 'app/common-services/profile/profile.html'
})

@Injectable()

export class Profile implements OnInit {
    adminUsers = ['felipe.martina@3xmgroup.com', 'ignacio.caceres@3xmgroup.com', 'diego.unanue@3xmgroup.com', 'pablo.bertetti@3xmgroup.com'];
    displayAdminBtn: boolean = false;
    constructor(private _location: Location,
        private _router: Router
    ) { }

    profileVerification() {
        for (var i = 0; i < this.adminUsers.length; i++) {
            var userEmail = localStorage.getItem('email')

            if (userEmail === this.adminUsers[i]) {
                 this.displayAdminBtn = true;
            }
        }
    }

    admPolls() {
        //window.location = '/#/pollsadmin/editaddpoll';
    }

    parseStringToBool(boolparam) {
        if (boolparam === "true") {
            return true;

        } else {

            return false;
        }
    }
    ngOnInit() {}

}
