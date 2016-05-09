import {Component} from '@angular/core';
import {NgClass}   from '@angular/common';

import {Template} from '../../../library/layout/template.service';
import {OnClickOutDirective} from '../../../library/event/on-click-out.directive';

import {UserMenuComponent}       from '../../user/menu.component';
import {InstrumentMenuComponent} from '../../instrument/menu.component';
import {NoteFormatMenuComponent} from '../../theory/note/format-menu.component';

@Component({
    selector: 'ui-header',
    templateUrl: Template.getUrl('header.component.html', 'common/header'),
    directives: [
        NgClass,
        OnClickOutDirective,
        UserMenuComponent,
        InstrumentMenuComponent,
        NoteFormatMenuComponent
    ]
})

/**
 * Header of the application
 */
export class HeaderComponent {
    public opened: Boolean;

    toggleMenuBlock() {
        console.log('toggle header menu');
        this.opened = !this.opened;
    }

    closeMenuBlock() {
        console.log('close header menu');
        console.log(this.opened);
        this.opened = false;
    }
}
