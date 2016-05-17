import {Component} from '@angular/core';
import {Template}          from '../../library/layout/template.service';
import {Instrument}        from './instrument';
import {InstrumentService} from "./instrument.service";
import {RouteSegment, OnActivate} from '@angular/router';
@Component({
    selector: 'instrument-detail',
    templateUrl: Template.getUrl('detail.component.html', 'instrument'),
    providers:  [
        InstrumentService
    ]
})

export class InstrumentDetailComponent implements OnActivate {
    public instrument: Instrument;
    public errorMessage: any;

    constructor (private instrumentService: InstrumentService) {}

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.instrumentService
            .get(id)
            .subscribe(
                instrument => this.instrument = instrument,
                error =>  this.errorMessage = <any>error
            );
    }
}
