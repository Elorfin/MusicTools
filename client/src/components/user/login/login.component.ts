import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup } from '@angular/common'

import { Template } from './../../../library/layout/template.service';
import { AuthenticationService } from './../../../library/security/authentication.service';

@Component({
    selector: 'login',
    templateUrl: Template.getUrl('login.component.html', 'user/login'),
    directives:  [ FORM_DIRECTIVES ]
})

/**
 * Login
 */
export class LoginComponent {
    form: ControlGroup;
    error: boolean = false;
    constructor(fb: FormBuilder, public auth: AuthenticationService, public router: Router) {
        this.form = fb.group({
            username:  ['', Validators.required],
            password:  ['', Validators.required]
        });
    }

    onSubmit(value: any) {
        this.auth.login(value.username, value.password);
            /*.subscribe(
                (token: any) => this.router.navigate(['/dashboard']),
                () => { this.error = true; }
            );*/
    }
}