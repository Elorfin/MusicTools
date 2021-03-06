import { Component } from '@angular/core';

import { Template }  from './../../../library/layout/template.service';
import { User }      from './../shared/user';

@Component({
    templateUrl: Template.getUrl('list.component.html', 'user/list')
})

export class UserListComponent {
    public users: User[];
}
