import { Component} from '@angular/core'

import { Template } from '../../../library/layout/template.service'
import { Flute }    from './flute'

@Component({
    selector: 'recorder-detail',
    templateUrl: Template.getUrl('view.component.html', 'instrument-type/flute')
})

export class FluteComponent {
    public flute: Flute;
}
