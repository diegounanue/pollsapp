import { Component, OnInit  } from '@angular/core';
import {PollsAdminService, Poll, PollOptions} from './pollsadmin.service';
//import {ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TitleHeader } from '../common-services/titleheader/titleHeader.component';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { PollsApi } from '../common-services/polls-api/polls-api.service';


@Component({
    selector: 'polls-add-edit',
    //styleUrls: ['app/results/results.component.css'],
    templateUrl: 'app/pollsadmin/addeditpoll.component.html',
    providers: [PollsAdminService
    //, ToastsManager
    ]
})

export class AddEditPollComponent implements OnInit {

    updateParent(openDate) {
        console.log(openDate)
    }

    //poll
    pollNameProp = '';
    openDateProp = '';
    openDatePropTicks = new Number();
    closeDateProp = '';
    closeDatePropTicks = new Number();
    pollOptions = [];
    option: PollOptions = {
        "option": "",
        "image_url": ""
    }
    postResult = null;
    openDateTimeProp = new Date();
    openDateTimeTicks = new Number();
    public ismeridian: boolean = true;

    opendateNew = new Date();
    openDatePropString = "";
    closeDateTimeProp;
    closeDatePropString;

    constructor(private _pollsAdminService: PollsAdminService,
        //public toastr: ToastsManager,
        private _pollsApi: PollsApi

    ) { }


    //we subscribe to the observable assign the returned object to this.voting Cards - GetAllPolls
    addPoll() {


        this.openDatePropString = this.openDateProp + " " + this.openDateTimeProp.getHours() + ":" + this.openDateTimeProp.getMinutes();

        this.openDatePropTicks = new Date(this.openDatePropString).getTime();

        this.closeDatePropString = this.closeDateProp + " " + this.closeDateTimeProp.getHours() + ":" + this.closeDateTimeProp.getMinutes();

        this.closeDatePropTicks = new Date(this.closeDatePropString).getTime();
        //this.openDateTimeTicks = new Date(this.openDateTimeProp).getTime();

        var poll: Poll = {
            "poll":
            {
                "poll_name": this.pollNameProp,
                "open_date": this.openDatePropTicks,
                "close_date": this.closeDatePropTicks,
                "options": this.pollOptions,
                "open": true
            }
        }

        //this._pollsAdminService.addPoll(poll)
        //    .subscribe(res => this.postResult = res,
        //    console.error,
        //    () => this.postComplete());

        this._pollsApi.addPoll((result) => {
            if (result) this.postResult = result;
            this.postComplete();
        }, poll)
    }

    postComplete() {
        //this.toastr.success('Poll succesfully added!', 'Message!!')
        console.log("add poll complete!")
    }


    //Poll options
    options = [];
    optionNameProp = '';   
    optionImgSrcProp = ''; 

    addOption() {
        this.option = {
            "option": this.optionNameProp,
            "image_url": this.optionImgSrcProp
        }

        this.pollOptions.push(this.option)
    }



    ngOnInit() {
        //this.getPoll();
    }

}