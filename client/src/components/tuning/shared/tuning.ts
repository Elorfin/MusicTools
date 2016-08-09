import { InstrumentType } from '../../instrument-type/shared/instrument-type';
import { Note }           from '../../theory/note/shared/note';
import { RelationToMany } from "../../../library/data/relationship/relation-to-many";
import { RelationToOne }  from "../../../library/data/relationship/relation-to-one";
import {Resource} from "../../../library/data/resource/resource";

/**
 * Tuning definition
 */
export class Tuning extends Resource {
    /**
     * ID of the Tuning
     * @type {String}
     */
    public id: string;

    public type: string;

    public attributes: Object;

    public relationships: {
        instrumentType: RelationToOne<InstrumentType>
        notes: RelationToMany<Note>
    };

    public displayNotes(): string {
        var notes: string = '';
        for (var i = 0; i < this.relationships.notes.data.length; i++) {
            notes += ' ' + this.relationships.notes.data[0].attributes.flat_name;
        }

        console.log(notes);

        return notes;
    }
}
