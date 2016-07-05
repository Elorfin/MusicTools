import {Component} from '@angular/core'
import {Template}  from '../../../library/layout/template.service'
import {Piano}     from './piano'

@Component({
    selector: 'piano-detail',
    templateUrl: Template.getUrl('view.component.html', 'instrument-type/piano')
})

export class PianoComponent {
    public piano: Piano;

    constructor () {}
}
