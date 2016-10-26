import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, Attribute } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService} from './../authentication/authentication.service';
import { DatePipe, Location } from '@angular/common';

@Component({
    selector: 'title-header',
    templateUrl: 'app/common-services/titleheader/titleHeader.component.html',
    providers: [AuthenticationService]
})



export class TitleHeader {
    backPoll = true;
    titlePage;
    displayBackButton: boolean = true;
    displayLogoutButton: boolean = true;
    location;

    constructor(
        @Attribute('title-page') titleAttr: string,
        @Attribute('display-backbutton') backButtonAttr: boolean,
        @Attribute('display-logoutbutton') backLogoutbutton: boolean,
        private _location: Location,
        private _router: Router,
        private _authentication: AuthenticationService) {
        this.titlePage = titleAttr;
        this.displayBackButton = this.parseStringToBool(backButtonAttr);
        this.displayLogoutButton = this.parseStringToBool(backLogoutbutton);
    }

    parseStringToBool(boolparam) {
        if (boolparam === "true") {
            return true;

        } else {

            return false;
        }
    }

    signOut = () => {
        this._authentication.logout();
        sessionStorage.clear();
    }

    backClicked() {
        this._location.back();
    }
}
