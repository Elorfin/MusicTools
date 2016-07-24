import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { Tuning }     from './tuning';
import { ApiService } from '../../../library/api/api.service';

@Injectable()
export class TuningService {
    /**
     * URL to access Tuning data.
     *
     * @type {string}
     */
    private url = '/tunings';

    private _tunings: BehaviorSubject<Tuning[]> = new BehaviorSubject([]);

    /**
     * Class constructor.
     *
     * @param {ApiService} apiService
     */
    constructor (private apiService: ApiService) {
        this.getAll().subscribe(tunings => this._tunings.next(tunings));
    }

    public get tunings() {
        return this._tunings.asObservable();
    }

    /**
     * Get all Instruments.
     *
     * @returns {Promise}
     */
    public getAll(): Observable<Tuning[]> {
        return this.apiService.call(this.url);
    }
}
