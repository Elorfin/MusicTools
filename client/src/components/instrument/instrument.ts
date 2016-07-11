import {InstrumentType} from "./../instrument-type/instrument-type";

/**
 * Instrument definition
 */
export class Instrument {
    /**
     * ID of the Instrument
     * @type {String}
     */
    public id: String;

    public type: String;

    public attributes: Object;

    public relationships: {
        instrumentType: InstrumentType,
        specification: Object
    };
}
