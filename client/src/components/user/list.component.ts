import {Component} from '@angular/core';
import {Template} from '../../library/layout/template.service';

@Component({
    templateUrl: Template.getUrl('list.component.html', 'user')
})

export class UserListComponent {

}
