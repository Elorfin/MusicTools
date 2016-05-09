import {Component}                           from '@angular/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import {Template}                            from '../../../library/layout/template.service';
import {MenuGroup}                           from './menu-group';

@Component({
    selector:    'ui-menu',
    templateUrl: Template.getUrl('menu.component.html', 'common/menu'),
    directives:  [ ROUTER_DIRECTIVES ],
})

/**
 * Menu of the application
 * - Displayed as a sidebar on large screens
 * - Displayed as a bottom fixed bar for small screens
 */
export class MenuComponent {
    public groups: MenuGroup[] = [{
        icon: 'fa fa-folder',
        label: 'Library',
        items: [
            { icon: 'mu mu-guitar-headstock', label: 'Instruments', route: '/instruments' },
            { icon: 'mu mu-music-folder',     label: 'Songbook',    route: '/songs' }
        ]
    }, {
        icon: 'fa fa-graduation-cap',
        label: 'Theory',
        items: [
            { icon: 'fa fa-book',           label: 'References', route: '/references' },
            { icon: 'fa fa-graduation-cap', label: 'Lessons',    route: '/lessons' },
            { icon: 'fa fa-gamepad',        label: 'Games',      route: '/games' }
        ]
    }, {
        icon: 'fa fa-users',
        label: 'Community',
        items: [
            { icon: 'fa fa-users', label: 'Users', route: '/users' }
        ]
    }];
}