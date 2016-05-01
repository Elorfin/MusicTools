import {Component} from 'angular2/core';
import {MenuGroup} from './menu-group';

@Component({
    selector: 'ui-menu',
    template: require('./menu.component.html')
})

/**
 * Menu of the application
 * - Displayed as a sidebar on large screens
 * - Displayed as a bottom fixed bar for small screens
 */
export class MenuComponent {
    public groups: MenuGroup[] = [{
        name: 'Library',
        items: [
            { icon: '', label: '', url: '' }
        ]
    }, {
        name: 'Theory',
        items: [
            { icon: '', label: '', url: '' }
        ]
    }, {
        name: 'Community',
        items: [
            { icon: '', label: '', url: '' }
        ]
    }];
}