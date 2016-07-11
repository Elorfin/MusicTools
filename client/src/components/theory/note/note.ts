/**
 * Note
 */
export class Note {
    public type: string = 'notes';

    public id: string;

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
