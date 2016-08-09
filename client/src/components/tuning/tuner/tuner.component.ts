import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

import { OnClickOutDirective } from './../../../library/event/on-click-out.directive';
import { Template }            from './../../../library/layout/template.service';
import { TuningService }       from './../shared/tuning.service';
import { TunerDraw }           from './../../../library/draw/tuner/tuner.draw';
import { Instrument }          from './../../instrument/index';
import { NoteInputComponent }  from './../../theory/note/input/input.component';
import { Tuning }              from './../shared/tuning';

@Component({
    selector: 'tuner',
    templateUrl: Template.getUrl('tuner.component.html', 'tuning/tuner'),
    directives: [
        OnClickOutDirective,
        NoteInputComponent
    ]
})

/**
 * Display a Tuner for an Instrument
 * if no Instrument passed, will take the current selected instrument
 */
export class TunerComponent implements OnChanges {
    /**
     * Is the menu opened ?
     *
     * @type {boolean}
     */
    public opened: Boolean = false;

    @Input() instrument: Instrument;

    public tunings: Tuning[];

    // Get access to the canvas to draw on
    @ViewChild('tunerCanvas') tunerCanvas: ElementRef;

    constructor(private tuningService: TuningService) {}

    ngOnChanges() {
        if (this.instrument) {
            // Load Tunings
            this.tuningService.tunings.subscribe(tunings => {
                // Filter tunings be instrument type
                this.tunings = tunings.filter((tuning: Tuning) => {
                    return tuning.relationships.instrumentType.data.id === this.instrument.relationships.instrumentType.data.id;
                });
            });

            // Draw tuner
            const tunerDraw = new TunerDraw(this.tunerCanvas.nativeElement);

            tunerDraw.draw(this.instrument);
        }
    }

    public selectTuning(tuning: Tuning) {
        this.opened = false;
    }
}
