import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { Instrument } from './instrument';
import { ApiService } from "./../../../library/api/api.service";

/**
 * Instrument Service
 * Manages user's Instruments
 */
@Injectable()
export class InstrumentService {
    /**
     * URL to access Instrument data.
     *
     * @type {string}
     */
    private url = '/instruments';

    /**
     * Current selected Instrument.
     *
     * @type {Instrument}
     */
    private _current: BehaviorSubject<Instrument> = new BehaviorSubject(null);

    private _instruments: BehaviorSubject<Instrument[]> = new BehaviorSubject([]);

    /**
     * Class constructor.
     *
     * @param {ApiService} apiService
     */
    constructor (private apiService: ApiService) {
        this.getAll().subscribe(instruments => {
            this._instruments.next(instruments);

            if (null === this._current.getValue() && instruments.length > 0) {
                this._current.next(instruments[0]);
            }
        });
    }

    public get instruments() {
        return this._instruments.asObservable();
    }

    /**
     * Gets the current Instrument.
     *
     * @return {Instrument}
     */
    public get current(): Observable<Instrument> {
        return this._current.asObservable();
    }

    /**
     * Sets the current Instrument.
     *
     * @param {Instrument} current
     */
    public setCurrent(current: Instrument) {
        this._current.next(current);
    }

    /**
     * Get all Instruments.
     *
     * @returns {Promise}
     */
    public getAll(): Observable<Instrument[]> {
        return this.apiService.call(this.url);
    }

    /**
     * Get an Instrument by its identifier.
     *
     * @param   {string} id
     *
     * @returns {Promise}
     */
    public get(id: String): Observable<Instrument> {
        return this.apiService.call(this.url + '/' + id);
    }
}
