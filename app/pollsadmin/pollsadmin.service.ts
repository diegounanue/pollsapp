import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export interface Poll {
    "poll": {
        "poll_name": string;
        "open_date": Number;
        "close_date": Number;
        "options": PollOptions[];
        "open": boolean;
    }
}

export interface PollOptions {    
    "option": string;
    "image_url": string;
}

@Injectable()
export class PollsAdminService {
    constructor(private _http: Http) {
    }

    //POST - ADD
    addPoll(poll: Poll) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = JSON.stringify(poll);
        return this._http
            .post(`https://xq4kftam4k.execute-api.us-east-1.amazonaws.com/test/polls2/`, body, { headers: headers })
            .map(res => res.json())
    }


}