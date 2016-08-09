import { Relation } from './relation';
import { ResourceData } from './../resource/resource-data';

/**
 * Relation To Many
 */
export class RelationToMany<Resource> extends Relation<Resource> {
    /**
     * Data of the relationship
     *
     * @type {Array<Resource>}
     */
    public data: Array<Resource> = [];

    /**
     * Load relationship data.
     *
     * @param {Array<ResourceData>} data
     */
    public load(data: Array<ResourceData>): void {
        this.data = data.map((element: ResourceData) => (new this.targetResource()).load(element));
    }
}
