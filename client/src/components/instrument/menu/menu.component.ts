import {Component, OnInit} from '@angular/core';
import {Template}          from '../../../library/layout/template.service';
import {Instrument}        from "./../instrument";
import {InstrumentService} from "./../instrument.service";

/**
 * Instrument menu
 */
@Component({
    selector: 'instrument-menu',
    templateUrl: Template.getUrl('menu.component.html', 'instrument/menu')
})
export class InstrumentMenuComponent implements OnInit {
    public instruments: Instrument[];

    public opened: Boolean = false;

    constructor (private instrumentService: InstrumentService) {}

    ngOnInit() {
        this.getInstruments();
    }

    getInstruments() {
        this.instrumentService
            .getAll()
            .subscribe(
                instruments => this.instruments = instruments
            );
    }

    selectInstrument(instrument: Instrument) {
        this.instrumentService.setCurrent(instrument);
    }
}
