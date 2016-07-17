import { Component } from '@angular/core';

import { Template }  from './../../../library/layout/template.service';
import { Message }   from './../shared/message';

@Component({
    templateUrl: Template.getUrl('list.component.html', 'message/list')
})

export class MessageListComponent {
    public messages: Message[];
}
