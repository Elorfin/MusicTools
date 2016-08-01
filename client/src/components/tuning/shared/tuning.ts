import { InstrumentType } from '../../instrument-type/shared/instrument-type';
import { Note }           from '../../theory/note/shared/note';

/**
 * Tuning definition
 */
export class Tuning {
    /**
     * ID of the Tuning
     * @type {String}
     */
    public id: String;

    public type: String;

    public attributes: Object;

    public relationships: {
        instrumentType: {
            data: InstrumentType
        }

        notes: {
            data: Note[]
        }
    };
}
