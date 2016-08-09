import { Instrument } from "../../instrument/shared/instrument";
import { InstrumentType } from "../../instrument-type/shared/instrument-type";
import { RelationToOne } from "../../../library/data/relationship/relation-to-one";
import { Tuning } from '../../tuning/shared/tuning';

/**
 * Guitar definition
 */
export class Guitar extends Instrument {
    public relationships: {
        instrumentType: RelationToOne<InstrumentType>,
        tuning: RelationToOne<Tuning>
    };
}
