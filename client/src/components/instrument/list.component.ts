import {Component} from '@angular/core';
import {Template} from '../../library/layout/template.service';

@Component({
    templateUrl: Template.getUrl('list.component.html', 'instrument')
})

export class InstrumentListComponent {

}
