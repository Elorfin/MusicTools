import {Component} from '@angular/core'
import {Template}  from '../../../library/layout/template.service'
import {Guitar}    from './guitar'

@Component({
    selector: 'guitar-detail',
    templateUrl: Template.getUrl('view.component.html', 'instrument-type/guitar')
})

export class GuitarComponent {
    public guitar: Guitar;

    constructor () {}
}
