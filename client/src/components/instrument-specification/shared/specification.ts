/**
 * Specification definition
 */
export abstract class AbstractSpecification {
    /**
     * ID of the Specification
     * @type {String}
     */
    public id: String;

    public type: String;

    public attributes: Object;

    public relationships: Object;
}
