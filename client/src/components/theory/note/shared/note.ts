import {Resource} from "../../../../library/data/resource/resource";

/**
 * Note
 */
export class Note extends Resource {
    public id: string;

    public type: string = 'notes';

    public attributes: {
        value: number,
        octave: number,
        frequency: number,
        midi: number,
        sharp_name: string,
        flat_name: string,
        accidental: boolean,
        color: string,
    };
}
