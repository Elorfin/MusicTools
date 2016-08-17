import { Resource }       from './../../../library/data/resource/resource';
import { RelationToOne }  from './../../../library/data/relationship/relation-to-one';
import { InstrumentType } from './../../instrument-type/index';
import { Tuning }         from './../../tuning/shared/tuning';

/**
 * Instrument definition
 */
export class Instrument extends Resource {
    /**
     * ID of the Instrument
     * @type {String}
     */
    public id: string;

    public type: string = 'instruments';

    public attributes: {
        name: string,
        model: string,
        manufacturer: string
    };

    public relationships: {
        instrumentType: RelationToOne<InstrumentType>,
        tuning: RelationToOne<Tuning>
    } = {
        instrumentType: new RelationToOne(InstrumentType),
        tuning: new RelationToOne(Tuning)
    };
}
