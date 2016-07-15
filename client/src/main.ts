// Angular dependencies
import {HTTP_PROVIDERS, RequestOptions} from '@angular/http';
import {provide}                        from '@angular/core';
import {bootstrap}                      from '@angular/platform-browser-dynamic';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

// Load root component
import {AppComponent}         from './components/app.component';
import {APP_ROUTER_PROVIDERS} from './components/app.routes';
import {ApiRequestOptions}    from "./library/api/api-request-options";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    // Override default RequestOptions by a custom class
    provide(RequestOptions, { useClass: ApiRequestOptions })
]).catch(err => console.error(err));
