import { ResourceData } from './../resource/resource-data';

/**
 * Relation
 */
export abstract class Relation<Resource> {
    /**
     * Target Resource of the Relation.
     *
     * @type {Function}
     */
    protected targetResource: { new(): Resource };

    constructor(targetResource: { new(): Resource }) {
        this.targetResource = targetResource;
    }

    /**
     * Load relationship data.
     *
     * @param {Resource|Array<ResourceData>} data
     */
    public abstract load(data: ResourceData|Array<ResourceData>): void;
}
