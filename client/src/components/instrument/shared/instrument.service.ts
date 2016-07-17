import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
    protected current: Instrument;

    /**
     *
     */
    protected instruments: Array<Instrument>;

    /**
     * Class constructor.
     *
     * @param {ApiService} apiService
     */
    constructor (private apiService: ApiService) {}

    /**
     * Sets the current Instrument.
     *
     * @param {Instrument} current
     */
    public setCurrent(current: Instrument): void {
        this.current = current;
    }

    /**
     * Gets the current Instrument.
     *
     * @return {Instrument}
     */
    public getCurrent(): Instrument {
        return this.current;
    }

    /**
     * Get all Instruments.
     *
     * @returns {Promise}
     */
    public getAll(): Observable<Instrument[]> {
        const observable: Observable<Instrument[]> = this.apiService.call(this.url);

        observable.subscribe(instruments => {
            if (!this.current && instruments.length !== 0) {
                this.current = instruments[0];
            }
        });

        return observable;
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
