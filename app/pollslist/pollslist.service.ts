import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
declare const AWS: any;
@Injectable()
export class PollsService {
    constructor(private _http: Http) {
    }

    //returns an observable
    getAllPolls() {
        return this._http.get('https://xq4kftam4k.execute-api.us-east-1.amazonaws.com/test/polls2')
            .map((res: Response) => res.json())

    }

    isAuthenicated() {
        if (localStorage.getItem('email'))
            return true;
        else {
            return false;
        }
    }



}