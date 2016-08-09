import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/find';

import { Note }       from './note';
import { ApiService } from './../../../../library/api/api.service';

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

    private _notes: BehaviorSubject<Note[]> = new BehaviorSubject([]);

    /**
     * Class constructor.
     *
     * @param {ApiService} apiService
     */
    constructor (private apiService: ApiService) {
        this.getAll().subscribe(notes => this._notes.next(notes));
    }

    public get notes() {
        return this._notes.asObservable();
    }

    /**
     * Get all Notes.
     *
     * @returns {Promise}
     */
    public getAll(): Observable<Note[]> {
        return this.apiService.call(this.url);
    }

    /**
     * Get a Note by its identifier.
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
     * @param {Note}   current
     * @param {Note[]} notes
     *
     * @returns {Note|null}
     */
    public previous(current: Note, notes: Note[] = null): Note {
        let previous: Note = null;

        if (null === notes) {
            notes = this._notes.getValue();
        }

        const pos: number = this.indexOf(current, notes);
        if (-1 !== pos && notes[pos - 1]) {
            previous = notes[pos - 1];
        }

        return previous;
    }

    /**
     * Get the next Note of current.
     *
     * @param {Note}   current
     * @param {Note[]} notes
     *
     * @returns {Note|null}
     */
    public next(current: Note, notes: Note[] = null): Note {
        let next: Note = null;

        if (null === notes) {
            notes = this._notes.getValue();
        }

        const pos: number = this.indexOf(current, notes);
        if (-1 !== pos && notes[pos + 1]) {
            next = notes[pos + 1];
        }

        return next;
    }

    private indexOf(search: Note, notes: Note[]): number {
        let index = -1;

        for (var i = 0; i < notes.length; i++) {
            if (search.id === notes[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }
}
