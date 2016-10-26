import {Component, NgZone} from "@angular/core";
import {Router} from '@angular/router';
import {SpinnerComponent} from '../common-services/spinner/spinner';
import {TitleHeader} from '../common-services/titleheader/titleHeader.component';
import {Profile} from '../common-services/profile/profile';
import { PollsApi } from '../common-services/polls-api/polls-api.service';

// Google's login API namespace
declare var gapi: any;
declare const AWS: any;

@Component({
    selector: "sous-app",
    templateUrl: "app/login/login.html",
    providers: [Profile, TitleHeader, PollsApi],

})
export class Login {
    googleLoginButtonId = "google-login-button";
    userAuthToken = null;
    userDisplayName = "empty";
    public test: boolean = true;
    zoneImpl: NgZone;

    constructor(zone: NgZone, private _router: Router, private _profile: Profile, private _pollsApi: PollsApi) {
        this.zoneImpl = zone;
    }

    // Angular hook that allows for interaction with elements inserted by the
    // rendering of a view.
    ngAfterViewInit() {
        this.initAuth2((auth2) => {
            this.attachSignin(document.getElementById('customBtn'), auth2);
            if (this.getParameterByName('logout') === 'true') {
                this.signOut(auth2);
            } else {
                if (auth2.isSignedIn.get()) {
                    this.zoneImpl.run(() => this._router.navigate(['Polls']));
                }
                else {
                    // try forcing user signin
                    //auth2.signIn().then((googleUser) => this.onUserLoggedIn(auth2, googleUser));
                }
            }
        });
    };

    initAuth2 = (cb) => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        gapi.load('auth2', function () {
            var auth2 = gapi.auth2.getAuthInstance();
            if (auth2) {
                cb(auth2);
            }
            else {
                auth2 = gapi.auth2.init({
                    client_id: '718161509287-jdpqsuebcoteh847krjn0m1odnbo5i3q.apps.googleusercontent.com'
                });
                cb(auth2);
            }
        });
    };

    getParameterByName = (name) => {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    attachSignin = (element, auth2) => {
        var navigate = false;
        auth2.attachClickHandler(element, {},
            (googleUser) => this.onUserLoggedIn(auth2, googleUser),
            function (error) {
                console.log(JSON.stringify(error, undefined, 2));
            });
    };

    onUserLoggedIn = (auth2, googleUser) => {
        var profile = googleUser.getBasicProfile();
        var authResult = googleUser.getAuthResponse();
        console.log(authResult);
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        var emailDomain = profile.getEmail().split("@")[1];
        //Added Mauro to the email whitelist
        if (emailDomain === '3xmgroup.com' || profile.getEmail().toUpperCase() === 'MSBRIZUELA@GMAIL.COM') {
            localStorage.setItem('email', profile.getEmail());
            localStorage.setItem('name', profile.getName());
            localStorage.setItem('id', profile.getId());
            localStorage.setItem('imageUrl', profile.getImageUrl());

            //this._profile.profileVerification(profile.getEmail());
        }
        else {
            this.signOut(auth2);
            return;
        }
        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'us-east-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:4737dcd0-1a15-4fcc-a1be-de28b5825657',
            Logins: {
                'accounts.google.com': authResult.id_token
            }
        });
        // Get Cognito credentials
        AWS.config.credentials.get((err) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }

            localStorage.setItem('identityId', AWS.config.credentials.identityId);
            localStorage.setItem('region', 'us-east-1');
            localStorage.setItem('accessKeyId', AWS.config.credentials.accessKeyId);
            localStorage.setItem('secretAccessKey', AWS.config.credentials.secretAccessKey);
            localStorage.setItem('sessionToken', AWS.config.credentials.sessionToken);
            this.zoneImpl.run(() => this._router.navigate(['polls']));
        });
    };

    signOut = (auth2) => {
        auth2.signOut().then(() => {
            localStorage.removeItem('email');
            localStorage.removeItem('id');
            localStorage.removeItem('name');
            localStorage.removeItem('region');
            localStorage.removeItem('accessKeyId');
            localStorage.removeItem('secretAccessKey');
            localStorage.removeItem('sessionToken');
        });
    };

}