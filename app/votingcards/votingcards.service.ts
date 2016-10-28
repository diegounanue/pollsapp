import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

//import { ExceptionService, SpinnerService } from '../blocks/blocks';
//import { CONFIG, MessageService } from '../shared/shared';

export interface Card {
    display_name: string;
    image: string;
    value: string;
}

export interface CardList {
    options: Card[]
}

export interface Vote {
    "option": string;
    "userId": string;
    "userName": string;
    "userEmail": string;
    "userImage": string;
}

@Injectable()
export class VotingCardsService {
    constructor(private _http:Http) {
    }

    //returns an observable
    getAllPolls() {
            return this._http.get('https://xq4kftam4k.execute-api.us-east-1.amazonaws.com/test/polls2/1458674735470')
                .map((res:Response) => res.json())
    };

    //getVehicle(id: number) {
    //    return this._http.get(`http://voting-app-api.azurewebsites.net/polls/${id}`)
    //        .map((response: Response) => response.json().data)
    //}

    getPollById(id: string) {
        var userId = localStorage.getItem('id');
        return this._http.get(`https://xq4kftam4k.execute-api.us-east-1.amazonaws.com/test/polls2/${id}?userId=` + userId)
            .map((response: Response) => response.json())
    };

    //POST - ADD
    addVote(vote: Vote, id) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = JSON.stringify(vote);
        return this._http
            .post(`https://xq4kftam4k.execute-api.us-east-1.amazonaws.com/test/polls2/`+ id +`/votes`, body, {headers : headers})
            .map(res => res.json())
    };


}