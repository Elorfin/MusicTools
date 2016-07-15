import {Component, Output, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Template}          from '../../../library/layout/template.service';
import {User}              from './../user';

@Component({
    selector: 'user-menu',
    templateUrl: Template.getUrl('menu.component.html', 'user/menu'),
    directives:  [ ROUTER_DIRECTIVES ]
})

/**
 * User menu
 */
export class UserMenuComponent {
    @Output() toggleMenu = new EventEmitter();

    public opened: Boolean = true;

    public user: User = {
        username: 'Elorfin',
        firstName: 'Axel',
        lastName: 'Penin',
        avatar: 'upload/avatar/Elorfin.jpg',
        description: '',
        status: '',
        location: 'Grenoble, FRANCE',
        birthDate: new Date(),
        gender: 'm',
        website: 'https://github.com/Elorfin',
        lastLogin: new Date()
    };

    public toggle(): void {
        this.opened = !this.opened;

        // Emit new menu state
        this.toggleMenu.emit({
            opened: this.opened
        })
    }
}