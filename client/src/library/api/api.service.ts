import { Injectable }      from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable }      from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/cache';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

/**
 * Api Service
 * Communicates with the server through HTTP
 */
@Injectable()
export class ApiService {
    private serverUrl: String = 'http://localhost/MusicTools/api/web/api_dev.php';

    constructor(private http: Http) {}

    /**
     * Calls the API server through HTTP.
     *
     * @param   {String} url
     * @param   {RequestOptions} [options]
     *
     * @returns {Observable}
     */
    public call(url: string, options?: RequestOptions): Observable<any> {
        if (!options) {
            options = new RequestOptions({
                method: 'GET'
            });
        }

        return this.http
            .request(this.serverUrl + url, options)
            .cache()
            .share() // Share a single subscription with subscribers
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Grabs data from AJAX response.
     *
     * @param   {Response} res
     *
     * @returns {Object|Array}
     */
    protected extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }

        let body = res.json();

        return body.data || {};
    }

    /**
     * Handles AJAX errors.
     *
     * @param   {any} error
     *
     * @returns {ErrorObservable}
     */
    protected handleError (error: any): ErrorObservable {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead

        return Observable.throw(errMsg);
    }
}
