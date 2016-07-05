/**
 * 
 */
export abstract class ApiResource {
    /**
     * ID of the Resource
     * @type {String}
     */
    public id: String;

    public type: String;

    public attributes: Object;

    public relationships: Object;
}