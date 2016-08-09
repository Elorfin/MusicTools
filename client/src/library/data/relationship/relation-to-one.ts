import { Relation } from './relation';
import { ResourceData } from './../resource/resource-data';

/**
 * Relation To One
 */
export class RelationToOne<Resource> extends Relation<Resource> {
    /**
     * Data of the relationship
     *
     * @type {Resource}
     */
    public data: Resource = null;

    /**
     * Load relationship data.
     *
     * @param {Array<ResourceData>} data
     */
    public load(data: ResourceData): void {
        const resource = new this.targetResource();
        
        this.data = resource.load(data);
    }
}
