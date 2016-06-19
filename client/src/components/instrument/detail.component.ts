import {Component}                from '@angular/core';
import {NgIf}                     from '@angular/common';
import {Template}                 from '../../library/layout/template.service';
import {Instrument}               from './instrument';
import {InstrumentService}        from "./instrument.service";
import {RouteSegment, OnActivate} from '@angular/router';

@Component({
    selector: 'instrument-detail',
    templateUrl: Template.getUrl('detail.component.html', 'instrument'),
    directives: [NgIf]
})

export class InstrumentDetailComponent implements OnActivate {
    public instrument: Instrument;
    public errorMessage: any;

    constructor (private instrumentService: InstrumentService) {}

    routerOnActivate(current: RouteSegment) {
        return this.instrumentService
            .get(current.getParam('id'))
            .subscribe(
                instrument => this.instrument = instrument,
                error      => this.errorMessage = <any>error
            );
    }
}
