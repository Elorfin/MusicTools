import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Template}          from '../../library/layout/template.service';
import {Instrument}        from './instrument';
import {InstrumentService} from './instrument.service';

@Component({
    selector: 'instrument-list',
    templateUrl: Template.getUrl('list.component.html', 'instrument'),
    directives:  [ ROUTER_DIRECTIVES ],
    providers:  [
        InstrumentService
    ]
})

export class InstrumentListComponent implements OnInit {
    public instruments: Instrument[];
    public errorMessage: any;

    constructor (private instrumentService: InstrumentService) {}

    ngOnInit() {
        this.instrumentService
            .getAll()
            .subscribe(
                instruments => this.instruments = instruments,
                error =>  this.errorMessage = <any>error
            );
    }
}
