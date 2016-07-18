import { Component, Input, OnInit } from '@angular/core';

import { Template }    from './../../../../library/layout/template.service';
import { NoteService } from './../note.service';
import { Note }        from './../note';

@Component({
    selector: 'note-input',
    templateUrl: Template.getUrl('input.component.html', 'theory/note'),
    providers: [
        NoteService
    ]
})

export class NoteInputComponent implements OnInit {
    @Input() note: Note;

    constructor(private noteService: NoteService) {}

    ngOnInit() {

    }
}
