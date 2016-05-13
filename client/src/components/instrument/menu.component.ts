import {Component, OnInit} from '@angular/core';
import {Template} from '../../library/layout/template.service';
import {Instrument} from "./instrument";
import {InstrumentService} from "./instrument.service";

@Component({
    selector: 'instrument-menu',
    templateUrl: Template.getUrl('menu.component.html', 'instrument'),
    providers:  [
        InstrumentService
    ]
})

/**
 * Instrument menu
 */
export class InstrumentMenuComponent implements OnInit {
    instruments:Instrument[];

    constructor (private instrumentService: InstrumentService) {}

    ngOnInit() {
        this.getInstruments();
    }

    getInstruments() {
        console.log('test');
        this.instrumentService
            .getAll()
            .subscribe(
                instruments => this.instruments = instruments
            );
    }
}