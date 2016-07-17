import { Component, Input }  from '@angular/core';

import { Template }   from '../../../library/layout/template.service';
import { Instrument } from './../shared/instrument';

/**
 * Instrument item
 */
@Component({
    selector: 'instrument-item',
    templateUrl: Template.getUrl('item.component.html', 'instrument/item')
})

export class InstrumentItemComponent {
    /**
     * Instrument.
     *
     * @type {Instrument}
     */
    @Input() instrument: Instrument;
}
