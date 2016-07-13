import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Template}          from '../../../library/layout/template.service';
import {Instrument}        from "./../instrument";
import {InstrumentService} from "./../instrument.service";
import {OnClickOutDirective} from "./../../../library/event/on-click-out.directive";

/**
 * Instrument menu
 */
@Component({
    selector: 'instrument-menu',
    templateUrl: Template.getUrl('menu.component.html', 'instrument/menu'),
    directives: [
        ROUTER_DIRECTIVES,
        OnClickOutDirective
    ]
})
export class InstrumentMenuComponent implements OnInit {
    public instruments: Instrument[];

    public current: Instrument;

    public opened: Boolean = false;

    constructor (private instrumentService: InstrumentService) {}

    ngOnInit() {
        this.getInstruments();
    }

    protected getInstruments(): void {
        this.instrumentService
            .getAll()
            .subscribe(instruments => {
                this.instruments = instruments;
                this.current     = instruments[0];
            });
    }

    public selectInstrument(instrument: Instrument): void {
        this.instrumentService.setCurrent(instrument);
    }
}
