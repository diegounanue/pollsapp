import { Component, OnInit } from '@angular/core';
import { ResultService } from './result.service';
declare var moment: any;
import { TitleHeader } from '../common-services/titleheader/titleHeader.component';
import { PollsApi } from '../common-services/polls-api/polls-api.service';
import { CanActivate, Router, ActivatedRoute,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';

// import {View, NgFor, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'results-component',
    //styleUrls: ['app/results/results.component.css'],
    templateUrl: 'app/results/results.component.html',
    providers: [ResultService]
})

export class ResultsComponent implements OnInit {

    result = null;
    id = '';
    pollName;
    constructor(
        private _resultsService: ResultService,
        private _pollsApi: PollsApi,
        private route: ActivatedRoute
    ) { }

    winnerOption = null;
    winnerImg = null;
    winnerVotes = null;

    //we subscribe to the observable assign the returned object to this.voting Cards - GetAllPolls
    //getResults(id) {

    //    this._resultsService.getPollResults(id)
    //        .subscribe(res => this.result = res,
    //        console.error,
    //        () => this.orderPoll());

    //}

    winners = [];
    numberWinners: number = 1;

    orderPoll(res) {
        if (res) {
            this.pollName = res.poll_name;
            this.result = res.options;
            this.result.sort(function (a, b) {
                return parseFloat(b.votes) - parseFloat(a.votes);
            });

            this.winners.push(this.result[0])
            this.numberWinners = 1;

            for (var i = 0; i < this.result.length; i++) {
                if (this.result[i].votes === this.result[i + 1].votes) {
                    this.winners.push(this.result[i + 1]);
                    this.numberWinners++;
                } else {
                    break;
                }
            }

            this.result.splice(0, this.numberWinners);

        }

    }

    col4number = ''
    calculateCol() {
        if (this.result.length % 3 === 0) {
            this.col4number = '4'
        }
    }


    paramId;
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.paramId = +params['id']; // (+) converts string 'id' to a number            
        });
       
        this._pollsApi.getResultByPollId((result) => {
            this.orderPoll(result)
        }, this.paramId);
    }

}
