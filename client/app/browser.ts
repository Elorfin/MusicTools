// Polyfills
import 'es6-shim';
import 'es6-promise';
import 'zone.js/dist/zone';
import 'reflect-metadata';

import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './../src/components/app.component';

bootstrap(AppComponent);
