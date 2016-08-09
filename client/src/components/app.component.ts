import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AlertComponent, HeaderComponent, MenuComponent } from './common/common';
import { Template }                                       from './../library/layout/template.service';
import { InstrumentService }                              from './instrument/index';
import { ApiService }                                     from './../library/api/api.service';
import { UserMenuComponent }                              from './user/menu/menu.component';
import { NoteService }                                    from './theory/note/shared/note.service';
import { TuningService }                                  from './tuning/shared/tuning.service';

@Component({
    selector: 'music-tools',
    templateUrl: Template.getUrl('app.component.html'),
    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent,
        MenuComponent,
        AlertComponent,
        UserMenuComponent
    ],
    providers: [
        ApiService,
        NoteService,
        InstrumentService,
        TuningService
    ]
})

export class AppComponent {
    public userMenuOpened: boolean = false;

    public toggleMenu(opened: boolean): void {
        this.userMenuOpened = opened;
    }
}
