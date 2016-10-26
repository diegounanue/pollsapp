import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ResultService {
    constructor(private _http: Http) {
    }

    //returns an observable
    getPollResults(id: string) {
     
        return this._http.get('https://xq4kftam4k.execute-api.us-east-1.amazonaws.com/test/polls2/'+id+'/results')
            .map((res: Response) => res.json())
    }

    //returns an observable
    //getPollResults(id: string) {

    //    return this._http.get('https://xq4kftam4k.execute-api.us-east-1.amazonaws.com/test/polls2/' + id + '/results')
    //        .map((res: Response) => res.json().options)
    //}

}