import {Component, OnInit} from '@angular/core';

import {Template} from '../../../library/layout/template.service';
import {Alert} from "./alert";
import {AlertService} from "./alert.service";

@Component({
    selector: 'ui-alert',
    templateUrl: Template.getUrl('alert.component.html', 'common/alert'),
    providers: [AlertService]
})

/**
 * Alert messages of the application
 */
export class AlertComponent implements OnInit {
    public alerts: Alert[];

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alerts = this.alertService.getAlerts();
    }
}