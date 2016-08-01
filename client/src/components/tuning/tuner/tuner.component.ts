import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { OnClickOutDirective }     from './../../../library/event/on-click-out.directive';
import { Template }           from './../../../library/layout/template.service';
import { TuningService }      from './../shared/tuning.service';
import { TunerDraw }          from './../../../library/draw/tuning/tuner.draw';
import { Instrument, InstrumentService } from './../../instrument/index';
import { NoteInputComponent } from './../../theory/note/input/input.component';
import { Tuning } from './../shared/tuning';

@Component({
    selector: 'tuner',
    templateUrl: Template.getUrl('tuner.component.html', 'tuning/tuner'),
    directives: [
        OnClickOutDirective,
        NoteInputComponent
    ],
    providers: [
        TuningService
    ]
})

/**
 * Display a Tuner for an Instrument
 * if no Instrument passed, will take the current selected instrument
 */
export class TunerComponent implements OnInit {
    /**
     * Is the menu opened ?
     *
     * @type {boolean}
     */
    public opened: Boolean = false;

    private tunerDraw: TunerDraw;

    @Input() instrument: Instrument;

    public tuning: Tuning;

    public tunings: Tuning[];

    // Get access to the canvas to draw on
    @ViewChild('tunerCanvas') tunerCanvas: ElementRef;

    constructor(private instrumentService: InstrumentService, private tuningService: TuningService) {}

    ngOnInit() {
        Observable.zip(
            this.instrumentService.current,
            this.tuningService.tunings
        ).subscribe(
            data => {
                this.instrument = data[0];
                this.tunings = data[1];

                this.tuning = this.tunings[0];
            }
        );
    }

    ngAfterViewInit() {
        // Draw tuner
        this.tunerDraw = new TunerDraw(this.tunerCanvas.nativeElement);
        this.tunerDraw.draw();
    }

    public selectTuning(tuning: Tuning) {
        this.tuning = tuning;
        this.opened = false;
    }
}
