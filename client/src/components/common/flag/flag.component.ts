import {Component} from '@angular/core';

import {Template} from '../../../library/layout/template.service';

@Component({
    selector: 'ui-flag',
    templateUrl: Template.getUrl('flag.component.html', 'common/flag')
})

/**
 * Togglable flags
 */
export class FlagComponent
{

}