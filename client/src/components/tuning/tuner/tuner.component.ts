import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Template }      from './../../../library/layout/template.service';
import { TuningService } from './../shared/tuning.service';
import { TunerDraw }     from './../../../library/draw/tuning/tuner.draw';
import { Instrument }    from './../../instrument/index';

@Component({
    selector: 'tuner',
    templateUrl: Template.getUrl('tuner.component.html', 'tuning/tuner'),
    providers: [
        TuningService
    ]
})

/**
 * Display a Tuner for an Instrument
 * if no Instrument passed, will take the current selected instrument
 */
export class TunerComponent {
    private tunerDraw: TunerDraw;

    @Input() instrument: Instrument;

    // Get access to the canvas to draw on
    @ViewChild('tunerCanvas') tunerCanvas: ElementRef;

    constructor(private tuningService: TuningService) {}

    ngAfterViewInit() {
        // Draw tuner
        this.tunerDraw = new TunerDraw(this.tunerCanvas.nativeElement);
        this.tunerDraw.draw();
    }
}
