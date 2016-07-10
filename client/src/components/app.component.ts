import {Component}                              from '@angular/core';
import {ROUTER_DIRECTIVES}              from '@angular/router';
import {HeaderComponent, MenuComponent, AlertComponent} from './common/common';

import {Template} from '../library/layout/template.service';

import {InstrumentService}   from './instrument/instrument.service';
import {ApiService} from "../library/api/api-service";

@Component({
    selector  :  'music-tools',
    templateUrl: Template.getUrl('app.component.html'),
    directives:  [
        ROUTER_DIRECTIVES,
        HeaderComponent,
        MenuComponent,
        AlertComponent
    ],
    providers:  [
        ApiService,
        InstrumentService
    ]
})

export class AppComponent {
    public pushContent: Boolean = false;
}
