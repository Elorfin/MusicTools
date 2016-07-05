import {Component} from '@angular/core'
import {Template}  from '../../../library/layout/template.service'
import {Recorder}  from './recorder'

@Component({
    selector: 'recorder-detail',
    templateUrl: Template.getUrl('view.component.html', 'instrument-type/recorder')
})

export class RecorderComponent {
    public recorder: Recorder;

    constructor () {}
}
