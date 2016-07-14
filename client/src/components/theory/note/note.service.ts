import {Injectable} from '@angular/core';
import {Note}       from './note';
import {Observable} from 'rxjs/Observable';
import {ApiService} from "../../../library/api/api.service";

/**
 * Note Service
 */
@Injectable()
export class NoteService {
    /**
     * URL to access Note data.
     *
     * @type {string}
     */
    private url = '/notes';

    /**
     * Display alteration with flat instead of sharp
     * @type {boolean}
     */
    private displayFlat: boolean = false;

    /**
     * Class constructor.
     *
     * @param {ApiService} apiService
     */
    constructor (private apiService: ApiService) {}

    /**
     * Get all Notes.
     *
     * @returns {Promise}
     */
    public getAll(): Observable<Note[]> {
        return this.apiService.call(this.url);
    }

    /**
     * Get an Note by its identifier.
     *
     * @param   {string} id
     *
     * @returns {Promise}
     */
    public get(id: String): Observable<Note> {
        return this.apiService.call(this.url + '/' + id);
    }

    /**
     * Is the displayed name of the Note is flat (true) or sharp (false) ?
     *
     * @returns {boolean}
     */
    public isDisplayFlat(): boolean {
        return this.displayFlat;
    }

    /**
     * Change the way the Note names are displayed.
     *
     * @param {boolean} newValue
     */
    public setDisplayFlat(newValue: boolean): void {
        if (newValue !== this.displayFlat) {
            this.displayFlat = newValue;
        }
    }

    /**
     * Get the previous Note of current.
     *
     * @param   {Array} notes
     * @param   {Note}  current
     *
     * @returns {Note|null}
     */
    public static previous(notes: Array<Note>, current: Note): Note {
        let previous: Note = null;

        const pos: number = notes.indexOf(current);
        if (-1 !== pos && notes[pos - 1]) {
            previous = notes[pos - 1];
        }

        return previous;
    }

    /**
     * Get the next Note of current.
     *
     * @param   {Array}  notes
     * @param   {Object} current
     *
     * @returns {Object|null}
     */
    public static next(notes: Array<Note>, current: Note): Note {
        let next: Note = null;

        const pos: number = notes.indexOf(current);
        if (-1 !== pos && notes[pos + 1]) {
            next = notes[pos + 1];
        }

        return next;
    }
}
