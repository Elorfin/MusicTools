import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Template}          from '../../../library/layout/template.service';
import {Instrument}        from "./../instrument";
import {InstrumentService} from "./../instrument.service";
import {OnClickOutDirective} from "./../../../library/event/on-click-out.directive";
import {InstrumentItemComponent} from "../item/item.component";

/**
 * Instrument menu
 */
@Component({
    selector: 'instrument-menu',
    templateUrl: Template.getUrl('menu.component.html', 'instrument/menu'),
    directives: [
        ROUTER_DIRECTIVES,
        OnClickOutDirective,
        InstrumentItemComponent
    ]
})

export class InstrumentMenuComponent implements OnInit {
    /**
     * List of available instruments.
     *
     * @type {Instrument[]}
     */
    public instruments: Instrument[];

    /**
     * Current selected Instrument.
     *
     * @type {Instrument}
     */
    public current: Instrument;

    /**
     * Is the menu opened ?
     *
     * @type {boolean}
     */
    public opened: Boolean = false;

    constructor (private instrumentService: InstrumentService) {}

    ngOnInit() {
        this.instrumentService
            .getAll()
            .subscribe(instruments => {
                this.instruments = instruments;
                this.current     = instruments[0];
            });
    }

    public selectInstrument(instrument: Instrument): void {
        this.current = instrument;
        this.instrumentService.setCurrent(instrument);
        this.opened = false;
    }

    public createInstrument(): void {

    }
}
