import { Injectable, NgZone } from '@angular/core';
declare const apigClientFactory: any;
import {Router} from '@angular/router';
declare const AWS: any;

@Injectable()
export class PollsApi {
    apigClient
    zoneImpl: NgZone;

    constructor(zone: NgZone, private _router: Router) {
        this.zoneImpl = zone;
    }
    //isInitialized = () => {
    //    return this.apigClient !== undefined && this.apigClient !== null;
    //}
    resetApi = () => {
        this.apigClient = null;
    }

    getApigClient = () => {
        if (!this.apigClient) {
            let credentialsParam = {
                region: localStorage.getItem('region'),
                accessKey: localStorage.getItem('accessKeyId'),
                secretKey: localStorage.getItem('secretAccessKey'),
                sessionToken: localStorage.getItem('sessionToken')
            };

            if (credentialsParam.region && credentialsParam.sessionToken && credentialsParam.accessKey && credentialsParam.secretKey) {
                this.apigClient = apigClientFactory.newClient(credentialsParam);
            } else {
                sessionStorage.clear();
                this.zoneImpl.run(() => this._router.navigate(['Login']));
                localStorage.removeItem('region');
                localStorage.removeItem('accessKeyId');
                localStorage.removeItem('secretAccessKey');
                localStorage.removeItem('sessionToken');
            }
        }
        return this.apigClient;
    }

    getAllPolls = (callback) => {
        if (this.getApigClient()) {
            this.getApigClient().polls2Get().then(function (result) {
                callback(result.data);
            }).catch(function (result) {
                console.log('Error: ', result);
                callback(null);
                });
        }
    }


    getPollById = (callback, idParam: String, pollId) => {
        var params = { userId: idParam, pollid: pollId }
        if (this.getApigClient()) {
            this.getApigClient().polls2PollidGet(params).then(function (result) {
                callback(result.data);
            }).catch(function (result) {
                console.log('Error: ', result);
                callback(null);
            });
        }
    }


    submitVote = (callback, pollId, vote) => {
        var params = { pollid: pollId };
        if (this.getApigClient()) {
            this.getApigClient().polls2PollidVotesPost(params, vote).then(function (result) {
                callback(result.data);
            }).catch(function (result) {
                console.log('Error: ', result);
                callback(null);
            });
        }
    }


    getResultByPollId = (callback, pollId) => {
        var params = { pollid: pollId }
        if (this.getApigClient()) {
            this.getApigClient().polls2PollidResultsGet(params).then(function (result) {
                callback(result.data);
            }).catch(function (result) {
                console.log('Error: ', result);
                callback(null);
            });
        }
    }

    addPoll = (callback, poll) => {
        if (this.getApigClient()) {
            this.getApigClient().polls2Post({}, poll).then(function (result) {
                callback(result.data);
            }).catch(function (result) {
                console.log('Error: ', result);
                callback(null);
            });
        }
    }

}