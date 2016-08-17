import { Component, Input }  from '@angular/core';

import { Template }   from '../../../library/layout/template.service';
import { Tuning } from './../shared/tuning';

/**
 * Tuning item
 */
@Component({
    selector: 'tuning-item',
    templateUrl: Template.getUrl('item.component.html', 'tuning/item')
})

export class TuningItemComponent {
    /**
     * Tuning.
     *
     * @type {Tuning}
     */
    @Input() tuning: Tuning;
}
