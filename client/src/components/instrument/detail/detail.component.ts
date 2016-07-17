import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { Template }          from '../../../library/layout/template.service';
import { Instrument }        from './../shared/instrument';
import { InstrumentService } from './../shared/instrument.service';

@Component({
    selector: 'instrument-detail',
    templateUrl: Template.getUrl('detail.component.html', 'instrument/detail')
})

export class InstrumentDetailComponent implements OnInit {
    private sub: any;
    public instrument: Instrument;
    public errorMessage: any;

    constructor (private route: ActivatedRoute, private instrumentService: InstrumentService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.instrumentService
                .get(params['id'])
                .subscribe(
                    instrument => this.instrument = instrument,
                    error      => this.errorMessage = <any>error
                );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
