import { Resource }       from './../../../library/data/resource/resource';
import { RelationToMany } from './../../../library/data/relationship/relation-to-many';
import { RelationToOne }  from './../../../library/data/relationship/relation-to-one';
import { InstrumentType } from './../../instrument-type/shared/instrument-type';
import { Note }           from './../../theory/note/shared/note';
import { TuningCategory } from './tuning-category';

/**
 * Tuning definition
 */
export class Tuning extends Resource {
    /**
     * ID of the Tuning
     * @type {String}
     */
    public id: string;

    public type: string = 'tunings';

    public attributes: {
        name: string
    };

    public relationships: {
        category: RelationToOne<TuningCategory>
        instrumentType: RelationToOne<InstrumentType>
        notes: RelationToMany<Note>
    } = {
        category: new RelationToOne(TuningCategory),
        instrumentType: new RelationToOne(InstrumentType),
        notes: new RelationToMany(Note)
    };

    public toString(): string {
        var notes: string = '';
        for (var i = 0; i < this.relationships.notes.data.length; i++) {
            notes += ' ' + this.relationships.notes.data[i].attributes.flat_name;
        }

        return notes;
    }
}
