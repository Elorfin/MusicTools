import { ResourceData } from './resource-data';

/**
 * Resource
 */
export abstract class Resource implements ResourceData {
    /**
     * ID of the Resource
     *
     * @type {String}
     */
    public id: string;

    /**
     * Type of the Resource
     *
     * @type {String}
     */
    public type: string;

    /**
     * List of attributes of the Resource.
     *
     * @type {Object}
     */
    public attributes: {
        [x: string]: any;
    } = {};

    /**
     * List of relationships of the Resource.
     *
     * @type {Object}
     */
    public relationships: {
        [x: string]: any;
    } = {};

    /**
     * Create a new Resource instance filled with its data.
     *
     * @param {ResourceData} data
     */
    public load(data: ResourceData): Resource {
        // Set identifier
        this.id   = data.id;
        this.type = data.type;

        // Set attributes
        if (data.attributes) {
            for (let attribute in data.attributes) {
                if (data.attributes.hasOwnProperty(attribute)) {
                    this.attributes[attribute] = data.attributes[attribute];
                }
            }
        }

        // Set relationships
        if (data.relationships) {
            for (let relationship in data.relationships) {
                if (data.relationships.hasOwnProperty(relationship)) {
                    if (this.relationships[relationship]) {
                        if (data.relationships[relationship].data) {
                            this.relationships[relationship].load(data.relationships[relationship].data);
                        }
                    } else {
                        console.log(this);
                        console.error('Resource : Unknown relationship "' + relationship + '" found.');
                    }
                }
            }
        }

        return this;
    }
}
