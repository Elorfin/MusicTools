import { Component, OnInit } from '@angular/core';

import { OnClickOutDirective } from './../../../library/event/on-click-out.directive';
import { Template }            from './../../../library/layout/template.service';
import { TuningService }       from './../shared/tuning.service';
import { Tuning }              from './../shared/tuning';

@Component({
    selector: 'menu',
    templateUrl: Template.getUrl('menu.component.html', 'tuning/menu'),
    directives: [
        OnClickOutDirective
    ],
    providers: [
        TuningService
    ]
})

/**
 * Display a menu to select tuning
 */
export class MenuComponent implements OnInit {
    /**
     * Is the menu opened ?
     *
     * @type {boolean}
     */
    public opened: Boolean = false;

    public tuning: Tuning;

    public tunings: Tuning[];

    constructor(private tuningService: TuningService) {}

    ngOnInit() {
        
    }

    public selectTuning(tuning: Tuning) {
        this.tuning = tuning;
        this.opened = false;
    }
}
