import {Component, ViewContainerRef, ReflectiveInjector, OnInit} from '@angular/core';
import {NgIf}                     from '@angular/common';
import {Template}                 from '../../../library/layout/template.service';
import {Instrument}               from './../instrument';
import {InstrumentService}        from "./../instrument.service";
import {ActivatedRoute} from '@angular/router';
import {SpecificationFactory} from "../../instrument-specification/factory";

@Component({
    selector: 'instrument-detail',
    templateUrl: Template.getUrl('detail.component.html', 'instrument/detail'),
    directives: [NgIf],
    providers: [SpecificationFactory]
})

export class InstrumentDetailComponent implements OnInit {
    private sub: any;
    public instrument: Instrument;
    public errorMessage: any;

    constructor (
        private route: ActivatedRoute,
        private vcRef: ViewContainerRef,
        private instrumentService: InstrumentService,
        private specificationFactory: SpecificationFactory) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.instrumentService
                .get(params['id'])
                .subscribe(
                    instrument => this.loadInstrument(instrument),
                    error      => this.errorMessage = <any>error
                );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    loadInstrument(instrument: Instrument) {
        this.instrument = instrument

        /*const instrumentType = this.instrument.relationships.instrumentType;*/

        this.specificationFactory.createComponent('').then(factory => {
            const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
            this.vcRef.createComponent(factory, 0, injector, []);
        });
    }
}
