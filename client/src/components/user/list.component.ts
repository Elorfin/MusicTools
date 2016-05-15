import {Component} from '@angular/core';
import {Template} from '../../library/layout/template.service';
import {User} from "./user";

@Component({
    templateUrl: Template.getUrl('list.component.html', 'user')
})

export class UserListComponent {
    public users: User[];
}
