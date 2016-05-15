import {Component} from '@angular/core';
import {Template} from '../../library/layout/template.service';
import {Message} from "./message";

@Component({
    templateUrl: Template.getUrl('list.component.html', 'message')
})

export class MessageListComponent {
    public messages: Message[];
}
