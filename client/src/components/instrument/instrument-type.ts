/**
 * InstrumentType definition
 */
export class InstrumentType {
    /**
     * ID of the InstrumentType
     * @type {String}
     */
    public id: String;

    public type: String;

    public attributes: {
        name: String,
        icon: String,
        prefix: String,
        polyphonic: Boolean
    };

    public relationships: Object;
}
