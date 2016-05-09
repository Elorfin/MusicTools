import {Component} from '@angular/core';

import {Template} from '../../../library/layout/template.service';

@Component({
    selector: 'ui-alert',
    templateUrl: Template.getUrl('alert.component.html', 'common/alert')
})

/**
 * Alert messages of the application
 */
export class AlertComponent {

}