import { Component, OnInit } from '@angular/core';

import { Template } from './../../library/layout/template.service';
import { TunerComponent } from "./../tuning/tuner/tuner.component";
import { Instrument } from "../instrument/shared/instrument";
import { InstrumentService } from "../instrument/shared/instrument.service";

@Component({
    selector: 'dashboard',
    templateUrl: Template.getUrl('dashboard.component.html', 'dashboard'),
    directives:  [
        TunerComponent
    ]
})

export class DashboardComponent implements OnInit {
    public instrument: Instrument;

    constructor(private instrumentService: InstrumentService) {}

    ngOnInit() {
        this.instrumentService.current.subscribe(current => {
            this.instrument = current;
        });
    }
}
