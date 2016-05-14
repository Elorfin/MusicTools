import {RequestOptions, Headers} from '@angular/http';

export class ApiRequestOptions extends RequestOptions {
    constructor() {
        super({
            headers: new Headers({
                'Content-Type': 'application/vnd.api+json'
            })
        });
    }
}