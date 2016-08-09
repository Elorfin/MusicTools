/**
 * Data of a Resource
 */
export interface ResourceData {
    /**
     * ID of the Resource
     * @type {String}
     */
    id: string;

    /**
     * Type of the Resource
     *
     * @type {String}
     */
    type: string;

    /**
     * List of attributes of the Resource.
     *
     * @type {Object}
     */
    attributes: {
        [x: string]: any;
    };

    /**
     * List of relationships of the Resource.
     *
     * @type {Object}
     */
    relationships: {
        [x: string]: any;
    };
}
