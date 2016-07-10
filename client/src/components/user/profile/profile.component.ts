import {Component} from '@angular/core';
import {Template} from '../../../library/layout/template.service';
import {User} from "./../user";

@Component({
    templateUrl: Template.getUrl('profile.component.html', 'user/profile')
})

export class UserProfileComponent {
    public user: User;
}
