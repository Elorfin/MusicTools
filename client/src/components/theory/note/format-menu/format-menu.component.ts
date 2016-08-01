import { Component, OnInit } from '@angular/core';

import { Template } from './../../../../library/layout/template.service';
import { NoteService } from './../shared/note.service';

@Component({
    selector: 'note-format-menu',
    templateUrl: Template.getUrl('format-menu.component.html', 'theory/note'),
    providers: [
        NoteService
    ]
})

export class NoteFormatMenuComponent implements OnInit {
    public displayFlat: boolean;
    
    constructor(private noteService: NoteService) {}

    ngOnInit() {
        this.displayFlat = this.noteService.isDisplayFlat();
    }

    public setDisplayFlat(flat: boolean) {
        this.displayFlat = flat;
        
        this.noteService.setDisplayFlat(flat);
    }
}