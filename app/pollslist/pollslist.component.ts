import { Component, OnInit, NgZone } from '@angular/core';
import {PollsService} from './pollslist.service';
import {Observable} from 'rxjs/Rx';
//import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';
import { PollsApi } from '../common-services/polls-api/polls-api.service';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'pollslist-component',
    templateUrl: 'app/pollslist/pollslist.component.html',
    providers: [PollsService, PollsApi]
})

export class PollsComponent implements OnInit {

    polls = null;
    diffDays;
    closeDate = '';
    i;
    today = Date.now();
    timer;
    diffMili;
    diffHrs;
    diffMin;
    mesg;
    public maxSize: number = 20;
    public directionLinks: boolean = true;
    public autoHide: boolean = false;
    zoneImpl: NgZone;
    constructor(private _pollsService: PollsService, private _pollsApi: PollsApi, private _router: Router, private _zone: NgZone) {

    }

    //we subscribe to the observable assign the returned object to this.voting Cards - GetAllPolls

    // getPoll() {
    //     this._pollsService.getAllPolls()
    //         .subscribe(res => this.polls = res,
    //         console.error,
    //         () => this.orderPoll());
    // }

    // isAuthenicated() {
    //     if (localStorage.getItem('email'))
    //         return true;
    //     else {
    //         return false;
    //     }
    // }



    orderPoll() {
        for (this.i = 0; this.i < this.polls.length; this.i++) {
            var time_components = [];
            var message = 'Closed';
            if (this.polls[this.i].open === true) {
                var pollStatus;
                if (this.polls[this.i].open_date < Date.now()) {
                    // calculate time until the poll closes
                    this.diffMili = 'Close ' + moment(this.polls[this.i].close_date).fromNow();
                    pollStatus = 'open';
                } else if (this.polls[this.i].open_date > Date.now()) {
                    // calculate time until the poll opens
                    this.diffMili = 'Opens ' + moment(this.polls[this.i].open_date).fromNow();
                    pollStatus = 'not-open';
                }

            }

            this.polls[this.i].timeMsg = this.diffMili;

        }
    }

    orderByDate() {
        this.polls.sort(function (a, b) { return b.open_date - a.open_date });
    }

    ngOnInit() {

        this._pollsApi.getAllPolls((result) => {
            if (result) this.polls = result;
            this.orderPoll();
            this.orderByDate()
        })

        this.timer = Observable.interval(5000).subscribe((x) => {
            this._pollsApi.getAllPolls((result) => {
                if (result) this.polls = result;
                this.orderPoll();
                this.orderByDate()
            })
        });
    }


    routerOnDeactivate() {
        this.timer.unsubscribe();
    }
}