import {Component} from '@angular/core';
import {Template} from '../../library/layout/template.service';

@Component({
    selector: 'user-menu',
    templateUrl: Template.getUrl('menu.component.html', 'user')
})

/**
 * User menu
 */
export class UserMenuComponent {

}