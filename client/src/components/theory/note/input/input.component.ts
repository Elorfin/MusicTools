import { Component, Input, OnInit } from '@angular/core';

import { Template }      from './../../../../library/layout/template.service';
import { NoteService }   from './../shared/note.service';
import { Note }          from './../shared/note';
import { Synthesizer }   from './../../../../library/synthesizer/synthesizer';
import { GuitarProfile } from './../../../../library/synthesizer/profile/guitar.profile';

@Component({
    selector: 'note-input',
    templateUrl: Template.getUrl('input.component.html', 'theory/note/input')
})

export class NoteInputComponent implements OnInit {
    /**
     * Current note
     *
     * @type {Note}
     */
    @Input() note: Note;

    /**
     * List of notes.
     *
     * @type {Note[]}
     */
    public notes: Note[];

    constructor(private noteService: NoteService) {}

    ngOnInit() {
        this.noteService.notes.subscribe(notes => this.notes = notes);
    }

    public previous(): void {
        let note = NoteService.previous(this.notes, this.note)

        console.log(note);

        this.note = note;
    }

    public next(): void {
        this.note = NoteService.next(this.notes, this.note);
    }

    public play(): void {
        const synthesizer = new Synthesizer(new GuitarProfile());

        synthesizer.play(this.note.attributes.frequency);
    }
}
