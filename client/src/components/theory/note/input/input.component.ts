import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Template }      from './../../../../library/layout/template.service';
import { NoteService }   from './../shared/note.service';
import { Note }          from './../shared/note';
import { Synthesizer }   from './../../../../library/synthesizer/synthesizer';
import { GuitarProfile } from './../../../../library/synthesizer/profile/guitar.profile';

@Component({
    selector: 'note-input',
    templateUrl: Template.getUrl('input.component.html', 'theory/note/input')
})

export class NoteInputComponent {
    /**
     * Current note.
     *
     * @type {Note}
     */
    @Input() note: Note;

    @Output() change = new EventEmitter();

    constructor(private noteService: NoteService) {}

    /**
     * Get the previous Note.
     */
    public previous(): void {
        const previous: Note = this.noteService.previous(this.note);
        if (previous) {
            this.note = previous;
            this.change.emit(this.note);
        }
    }

    /**
     * Get the next Note.
     */
    public next(): void {
        const next: Note = this.noteService.next(this.note);
        if (next) {
            this.note = next;
            this.change.emit(this.note);
        }
    }

    /**
     * Play the Note.
     */
    public play(): void {
        const synthesizer = new Synthesizer(new GuitarProfile());

        synthesizer.play(this.note.attributes.frequency);
    }
}
