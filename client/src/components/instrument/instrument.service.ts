import {Injectable} from '@angular/core';
import {Instrument} from './instrument';
import {Observable} from 'rxjs/Observable';
import {ApiService} from "../../library/api/api-service";

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
    private url = 'http://localhost/MusicTools/api/web/api_dev.php/instruments';

    /**
     * Current selected Instrument.
     *
     * @type {Instrument}
     */
    protected current: Instrument;

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
