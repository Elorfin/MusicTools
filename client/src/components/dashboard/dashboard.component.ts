import {Component} from '@angular/core';
/*import {CanActivate} from '@angular/router';*/
import {Template} from '../../library/layout/template.service';
import {isAuthenticated} from "../../library/security/is-authenticated";

@Component({
    templateUrl: Template.getUrl('dashboard.component.html', 'dashboard')
})

/*@CanActivate(() => isAuthenticated())*/
export class DashboardComponent {

}
