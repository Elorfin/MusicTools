import { Injectable }      from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { ApiService } from '../../../library/api/api.service';
import { Resource } from './resource';
import { ResourceData } from './resource-data';

@Injectable()
export abstract class ResourceService {
    /**
     *
     * @type {BehaviorSubject<Resource[]>}
     * @private
     */
    private _data: BehaviorSubject<Resource[]> = new BehaviorSubject([]);

    /**
     * Are the service data already loaded ?
     *
     * @type {boolean}
     * @private
     */
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

    /**
     * Get the class of the Resource.
     *
     * @returns {function}
     */
    public abstract getResource(): { new(): Resource};

    /**
     * Access service data.
     *
     * @returns {Observable<Resource[]>}
     */
    public get data(): Observable<Resource[]> {
        if (!this.loaded) {
            this.load().subscribe((data: Resource[]) => this._data.next(data));
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
        const service = this;

        return <Observable<Resource[]>> this.apiService
            .call(this.getUrl())
            .map((results: Array<ResourceData>) => results.map(this.loadResource.bind(service)))
        ;
    }

    /**
     * Get a Resource by its identifier.
     *
     * @param   {string} id
     *
     * @returns {Observable<Resource>}
     */
    public get(id: String): Observable<Resource> {
        const service = this;

        return <Observable<Resource>> this.apiService
            .call(this.getUrl() + '/' + id)
            .map((result: ResourceData) => this.loadResource.bind(service))
        ;
    }

    /**
     * Loads API data into Resource instances.
     *
     * @param   {ResourceData} data
     *
     * @returns {Resource}
     */
    protected loadResource(data: ResourceData): Resource {
        const resourceName = this.getResource();
        const resource = new resourceName();

        return resource.load(data);
    }
}
