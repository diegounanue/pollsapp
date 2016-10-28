import { Component, OnInit } from '@angular/core';
import { Card, VotingCardsService, Vote, CardList} from './votingcards.service';
import { CanActivate, Router, ActivatedRoute,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TitleHeader } from '../common-services/titleheader/titleHeader.component';
import { SpinnerComponent } from '../common-services/spinner/spinner';
import { PollsApi } from '../common-services/polls-api/polls-api.service';

@Component({
    selector: 'voting-cards-list',
    templateUrl: 'app/votingcards/votingcards-list.component.html',
    providers: [VotingCardsService
    //, ToastsManager
    ]
})

export class VotingCardsListComponent implements OnInit {
    votingCards: any = [];
    votingCard: any;
    voteDate = null;
    isPollOpen;
    pollName;
    optionVoted = null;
    textAlreadyVoted = false

    showSpinner = false;

    constructor(
        private _votingCardsService: VotingCardsService,
        private route: ActivatedRoute,
        public toastr: ToastsManager,
        private _router: Router,
        private _pollsApi: PollsApi
    ) { }

    userId = localStorage.getItem('id');

    //we subscribe to the observable assign the returned object to this.voting Cards - GetAllPolls
    getVotingCards() {
        this._votingCardsService.getAllPolls()
            //the code below is the lambda shortcut to define functions in ts function(res) { return this.votingCards = res }
            .subscribe(res => this.votingCards = res,
            console.error,
            () => console.log('Completed!'))
    };

    col4number = '';
    calculateCol() {
        if (this.votingCards.length % 3 === 0) {
            this.col4number = '4'
        }
    }

    hasAlreadyVoted() {
        if (this.optionVoted) {
            var optionVoted = this.optionVoted.option;
            this.textAlreadyVoted = true;
            if (optionVoted) {
                this.votingCards.forEach(element => {
                    if (element.option === optionVoted) {
                        element.selected = true;
                    }
                });                
            }
        }
    };


    setPollById(res) {
        this.votingCards = res.options; this.voteDate = new Date(res.close_date); this.isPollOpen = res.open; this.pollName = res.poll_name; this.optionVoted = res.vote;
         this.hasAlreadyVoted();
    };
        

    selectedVote = null;
    onCardClick(item) {
        this.votingCards.forEach(element => {
            element.selected = false;
        });

        item.selected = true;
        this.selectedVote = item.option;
    };

    vote = <Vote>{};

    resultado = {
        errorMessage: ''
    };

    showdisplaybutton: boolean = true;
    
    isRequesting: boolean = false;

    submitVote() {
        this.showSpinner = true;
        this.isRequesting = true;
        this.vote.option = this.selectedVote;
        if (!this.vote.option) {
            //this.toastr.warning('Selecciona una opcion!', 'Oops!!')
            this.showdisplaybutton = true;
            return;
        }
        this.vote.userId = this.userId;
        this.vote.userName = localStorage.getItem('name');
        this.vote.userEmail = localStorage.getItem('email');
        if(localStorage.getItem('imageUrl') && localStorage.getItem('imageUrl') !== 'undefined')
        {
            this.vote.userImage = localStorage.getItem('imageUrl');
        }

        if (!this.isPollOpen) {
            this.toastr.error('No puedes votar, ya encuesta ya cerro!', 'Opps!!');
            this.isRequesting = false;
            return;
        }

        this._pollsApi.submitVote((res) => { this.submitCodeComplete(res) }, this.id, this.vote)
    };

    submitCodeComplete(res) {
        this.showSpinner = false;        
        if (!res) {
            this.toastr.error('There was an error trying to submit your vote. Please refresh the page and try again.', 'Error!')
        }
        else if (res.errorMessage) {
            this.toastr.error('You have already voted!', 'Error!')
        } else {
            this.showdisplaybutton = false;
            this.toastr.success('We have received your vote. You will be automatically redirected to Polls page in few seconds.', 'Thanks!')
            this._router.navigate(['polls']);
        }
    };

    id = '';
    votingCardsOptions = null;
    ngOnInit() {
        //get the route param by his name, the + cast it to int
        this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number            
        });               
        this._pollsApi.getPollById((result) => { this.setPollById(result) }, this.userId, this.id)
    };

}