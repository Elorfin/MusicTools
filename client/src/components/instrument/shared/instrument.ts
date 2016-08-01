import { InstrumentType } from './../../instrument-type/index';
import { AbstractSpecification } from './../../instrument-specification/shared/specification';

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
        instrumentType: {
            data: InstrumentType
        },
        specification: {
            data: AbstractSpecification
        }
    };
}
