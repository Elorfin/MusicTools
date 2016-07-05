import {Component}     from '@angular/core';
import {Template}      from '../../library/layout/template.service';
import {Tuning}        from './tuning';
import {TuningService} from "./tuning.service";

@Component({
    selector: 'tuning',
    templateUrl: Template.getUrl('widget.component.html', 'tuning')
})

export class InstrumentDetailComponent {
    public tuning: Tuning;
    public errorMessage: any;

    constructor (private tuningService: TuningService) {}
}
