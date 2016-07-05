import {Component, ViewContainerRef, ReflectiveInjector}                from '@angular/core';
import {NgIf}                     from '@angular/common';
import {Template}                 from '../../library/layout/template.service';
import {Instrument}               from './instrument';
import {InstrumentService}        from "./instrument.service";
import {RouteSegment, OnActivate} from '@angular/router';
import {SpecificationFactory} from "../instrument-specification/factory";

@Component({
    selector: 'instrument-detail',
    templateUrl: Template.getUrl('detail.component.html', 'instrument'),
    directives: [NgIf],
    providers: [SpecificationFactory]
})

export class InstrumentDetailComponent implements OnActivate {
    public instrument: Instrument;
    public errorMessage: any;

    constructor (
        private vcRef: ViewContainerRef,
        private instrumentService: InstrumentService,
        private specificationFactory: SpecificationFactory) {}

    routerOnActivate(current: RouteSegment) {
        return this.instrumentService
            .get(current.getParam('id'))
            .subscribe(
                instrument => this.loadInstrument(instrument),
                error      => this.errorMessage = <any>error
            );
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
