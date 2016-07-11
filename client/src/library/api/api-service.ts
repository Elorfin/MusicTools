import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {RequestOptions} from '@angular/http';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/cache';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Api Service
 * Communicates with the server through HTTP
 */
@Injectable()
export class ApiService {
    constructor (private http: Http) {}

    /**
     * Calls the API server through HTTP.
     *
     * @param   {String} url
     * @param   {RequestOptions} [options]
     *
     * @returns {Promise}
     */
    public call(url: string, options?: RequestOptions) {
        if (!options) {
            options = new RequestOptions({
                method: 'GET'
            });
        }

        return this.http
            .request(url, options)
            .cache()
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Grabs data from AJAX response.
     *
     * @param   {Response} res
     *
     * @returns {Object}
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
    protected handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead

        return Observable.throw(errMsg);
    }
}
