import {Component} from '@angular/core';
import {Template} from '../../library/layout/template.service';
import {TunerComponent} from "../tuning/tuner/tuner.component";

@Component({
    selector: 'dashboard',
    templateUrl: Template.getUrl('dashboard.component.html', 'dashboard'),
    directives:  [
        TunerComponent
    ],
})

export class DashboardComponent {

}
