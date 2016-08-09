import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { Instrument } from './instrument';
import { ResourceService } from './../../../library/data/resource/resource.service';
import { ResourceData } from "../../../library/data/resource/resource-data";
import {ApiService} from "../../../library/api/api.service";

/**
 * Instrument Service
 * Manages user's Instruments
 */
@Injectable()
export class InstrumentService extends ResourceService {
    /**
     * Class constructor.
     *
     * @param {ApiService} apiService
     */
    constructor (protected apiService: ApiService) {
        super(apiService);
    }

    /**
     * URL to access Instrument data.
     *
     * @type {string}
     */
    public getUrl(): string {
        return '/instruments';
    }

    public getResource(): { new(): Instrument} {
        return Instrument;
    }

    /**
     * Current selected Instrument.
     *
     * @type {Instrument}
     */
    private _current: BehaviorSubject<Instrument> = new BehaviorSubject(null);

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

    /*public dataToResource(data: ResourceData): Instrument {
        return new Instrument(data);
    }*/
}
