import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Template } from './../../../library/layout/template.service';

@Component({
    selector: 'theory-summary',
    templateUrl: Template.getUrl('summary.component.html', 'theory'),
    directives:  [ ROUTER_DIRECTIVES ]
})

export class TheorySummaryComponent {

}
