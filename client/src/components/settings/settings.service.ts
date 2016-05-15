import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Settings}       from './settings';
import {Observable}     from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SettingsService {
    constructor (private http: Http) {}

    private url = 'http://localhost/MusicTools/api/web/api_dev.php/settings';  // URL to web api

    public get(): Observable<Settings[]> {
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        return body.data || { };
    }

    private handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead

        return Observable.throw(errMsg);
    }
}