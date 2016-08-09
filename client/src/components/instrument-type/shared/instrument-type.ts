import {Resource} from "../../../library/data/resource/resource";

/**
 * InstrumentType definition
 */
export class InstrumentType extends Resource {
    /**
     * ID of the InstrumentType
     * @type {String}
     */
    public id: string;

    public type: string = 'instrument_types';

    public attributes: {
        name: string,
        icon: string,
        prefix: string,
        polyphonic: boolean
    };
}
