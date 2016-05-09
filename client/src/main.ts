// Angular dependencies
import {HTTP_PROVIDERS}   from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';
import {bootstrap}        from '@angular/platform-browser-dynamic';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

// Load root component
import {AppComponent}     from './components/app.component';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
