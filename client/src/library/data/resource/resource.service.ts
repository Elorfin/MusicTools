import { Injectable }      from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { ApiService } from '../../../library/api/api.service';
import { Resource } from './resource';
import { ResourceData } from './resource-data';

@Injectable()
export abstract class ResourceService {
    private _data: BehaviorSubject<Resource[]> = new BehaviorSubject([]);

    private loaded: boolean = false;

    /**
     * Class constructor.
     *
     * @param {ApiService} apiService
     */
    constructor (protected apiService: ApiService) {}

    /**
     * Get the URL to the resource.
     *
     * @returns {string}
     */
    public abstract getUrl(): string;

    public abstract getResource(): { new(): Resource};

    /**
     * Convert HTTP data into the correction Resource class instance.
     *
     * @param {ResourceData} data
     */
    /*public abstract dataToResource(data: ResourceData): Resource;*/

    /**
     * Access service data.
     *
     * @returns {Observable<Resource[]>}
     */
    public get data(): Observable<Resource[]> {
        if (!this.loaded) {
            this.load().subscribe(data => this._data.next(data));
            this.loaded = true;
        }

        return this._data.asObservable();
    }

    /**
     * Get all Resources.
     *
     * @returns {Observable<Resource[]>}
     */
    protected load(): Observable<Resource[]> {
        return this.apiService
            .call(this.getUrl())
            .map((results: Array<ResourceData>) => results.map(this.loadResource));
    }

    protected loadResource(data: ResourceData): Resource {
        const resourceName = this.getResource();

        return (new resourceName()).load(data);
    }

    /**
     * Get a Resource by its identifier.
     *
     * @param   {string} id
     *
     * @returns {Observable<Resource>}
     */
    public get(id: String): Observable<Resource> {
        const observable = this.apiService.call(this.getUrl() + '/' + id);

        // Convert HTTP data to Resource instances
        observable.map((result: ResourceData) => this.loadResource);

        return observable;
    }
}
